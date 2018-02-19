const checks = ['weaponData', 'passiveAData', 'passiveBData', 'passiveCData', 'sealData'];

function checkAffinity(mod, attacker, defender) {
    var atkAdept = 0;
    var defAdept = 0;

    // A better hero engine would really help here to not do this horrible line
    atkAdept=Math.min(CheckTriAdvPerPossibility(attacker, defender, mod, attacker.passiveAData), CheckTriAdvPerPossibility(attacker, defender, mod, attacker.weaponData));
    // The "2-" part is required to change the disequation from < to > (mod <1 "->" 2-mod<1 "->" -mod<-1 "->" mod>1)
    defAdept=Math.min(CheckTriAdvPerPossibility(defender, attacker, 2-mod, defender.passiveAData), CheckTriAdvPerPossibility(defender, attacker, 2-mod, defender.weaponData));

    return Math.min(atkAdept,defAdept);
}

//Let's separate the checks for weaponData and passiveAData, so we can get the correct number to check for cancel affinity
function CheckTriAdvPerPossibility(agent, other, mod, tocheck) {
    if (tocheck.hasOwnProperty("tri_advantage")) {
        var adv = true;
        if (mod < 1) {
            adv = false;
        }
        return cancelAffinity(agent, other, adv, tocheck);
    }
    return 0;
}

//Adjusts damage
function cancelAffinity(a, b, adv, checking) {
    if (a.passiveBData.hasOwnProperty("cancel_skill_affinity")) {
        return -checking.tri_advantage;
    }

    if (b.passiveBData.hasOwnProperty("cancel_enemy_skill_affinity")) {
        return -checking.tri_advantage;
    }

    if (adv) {
        if (b.passiveBData.hasOwnProperty("cancel_negative_enemy_skill_affinity")) {
            return -checking.tri_advantage;
        }

        if (b.passiveBData.hasOwnProperty("reverse_negative_enemy_skill_affinity")) {
            return -(2*checking.tri_advantage);
        }
    }

    return 0;
}

//Checks if bonuses of character b need to be nullifed
function canNullifyEnemyBonuses(a, b) {

    //Panic takes precedence over nullification
    if (b.status.panic) {
        return false;
    }

    var validTarget = false;

    checks.forEach(function(key) {
        var nullify = a[key].nullify_enemy_bonuses;
        if (nullify) {
            //Move type
            if (nullify.move_type && nullify.move_type[b.moveType]) {
                validTarget = true;
            }
            //Weapon type
            if (nullify.weapon_type && nullify.weapon_type[b.type]) {
                validTarget = true;
            }

            if (nullify.all) {
                validTarget = true;
            }
        }
    });

    if (validTarget) {
        return true;
    }
    return false;
}

//Function to add updated dragonstones
function checkDefRes(hero) {
    if(hero[def]>=hero[res])
        return hero[def];
    return hero[res];
}

//Subtracts bonuses from stats
function removeStatBonuses(hero) {
    var stats = ['atk', 'spd', 'def', 'res'];

    stats.forEach(function(stat) {
        hero[stat] -= hero[stat + 'Bonus'];
        hero[stat + 'WS'] -= hero[stat + 'Bonus'];
        hero[stat + 'Bonus'] = 0;
    });

    delete hero.addBonusAtk;
}

// checks if the defender can counter
// battleInfo contains all battle information
function defCanCounter(battleInfo) {
    var attacker = battleInfo.attacker;
    var defender = battleInfo.defender;

    //Weapon check
    if (defender.weaponName === "None") {
        return false;
    }

    //Range and counter check
    if (defender.weaponData.range !== attacker.weaponData.range && !defender.weaponData.counter && !defender.passiveAData.counter) {
        return false;
    }

    //Counter prevention
    if (attacker.weaponData.prevent_counter || defender.weaponData.prevent_counter || canActivateSweep(attacker.passiveBData, attacker.spd, defender.spd, defender.weaponData.type)) {
        return false;
    }

    //Not sure why original author separate this out
    if (canPreventEnemyCounter(attacker.passiveBData, attacker.hp, attacker.currHP)) {
        return false;
    }

    //Weapon specific counter prevention
    if (attacker.passiveBData.prevent_weapon_counter && attacker.passiveBData.prevent_weapon_counter.type.includes(defender.weaponData.type)) {
        return false;
    }

    //Candlelight status
    if (defender.status.candlelight) {
        return false;
    }

    return true;
}

function consecutiveDamageReduction(dmg, defender, attacker) {
    var multiplier = 1;

    checks.forEach(function(key) {
        var red = defender[key].consecutive_dmg_reduction;
        if (red && red.multiplier) {

            if (red.enemy_range && red.enemy_range !== attacker.weaponData.range) {
                return;
            }

            if (red.weapon_type) {

                for (var i = 0; i < red.weapon_type.length; i++) {

                    if (attacker.weaponData.type.toLowerCase().includes(red.weapon_type[i].toLowerCase())) {
                        multiplier = defender[key].consecutive_dmg_reduction.multiplier;
                    }
                }

                if (multiplier === 1) {
                    return;
                }
            }

            multiplier = defender[key].consecutive_dmg_reduction.multiplier;

        }
    });

    return multiplier;
}

// checks if the attacker can activate windsweep
function canActivateSweep(container, atkSpd, defSpd, defWeapon) {

    return container.hasOwnProperty("sweep") && (atkSpd - defSpd >= container.sweep.spd_adv) && container.sweep.weapon_type.hasOwnProperty(defWeapon);
}

// checks if the attacker can prevent enemy counterattacks
function canPreventEnemyCounter(container, hp, currHP) {
    return container.hasOwnProperty("prevent_enemy_counter") && currHP >= roundNum(container.prevent_enemy_counter * hp, true);
}

//Checks if unit gets a bonus follow-up (initially creaeted for follow-up ring)
function bonusFollowUp(char) {
    for (var i = 0; i < checks.length; i++) {
        var bfup = char[checks[i]].bonus_follow_up;
        if (bfup) {
            //healthy
            if (bfup.trigger === 'healthy' && roundNum(char.currHP / char.hp >= bfup.threshold)) {
                return true;
            }
        }
    }

    return false;

}

//Reduce damage from first attack
function firstDmgReduction(char, enemy) {
    for (var i = 0; i < checks.length; i++) {
        var source = char[checks[i]].first_dmg_reduction;

        if(!source) {
            continue;
        }

        if (Array.isArray(source.weapon_type) && !source.weapon_type.includes(enemy.type)) {
            continue;
        }

        if (Array.isArray(source.move_type) && !source.move_type.includes(enemy.moveType)) {
            continue;
        }

        return true;
    }
    return false;
}

//Bonus for adjacency to allies
function adjacentStatBonus(battleInfo, char, charToUse) {
    checks.forEach(function(key) {
        var bonus = char[key].adjacent_stat_bonus
        if (!bonus) {
            return;
        }

        if (char.adjacent < 1) {
            return;
        }

        if (bonus.target === 'self' && bonus.adjacent === 'ally') {
            for (b in bonus.mod) {
                battleInfo[charToUse][b] += bonus.mod[b];
                    battleInfo.logMsg += "<li class='battle-interaction'><span class='" + charToUse + "'><strong>" + battleInfo[charToUse].display + "</strong></span> raises " + b + " by " + bonus.mod[b] + "</li>";
            };
        }
    })
    return battleInfo;
}

function enemyPhaseCharge(battleInfo, attacker, defender) {
    checks.forEach(function(key) {
        var effect = battleInfo.defender[key].enemy_phase_charge;

        if (effect) {
            if (effect.attack && Object.is(attacker, battleInfo.defender)) {
                battleInfo.logMsg += battleInfo.defender.display + " gained an additional special cooldown charge [" + battleInfo.defender[key].name + "]! ";
                attacker.specCurrCooldown--;
            }
            else if (effect.defend && Object.is(defender, battleInfo.defender)) {
                battleInfo.logMsg += battleInfo.defender.display + " gained an additional special cooldown charge [" + battleInfo.defender[key].name + "]! ";
                defender.specCurrCooldown--;

            }
        }
    })
}

function hardy_bearing_msg(battleInfo, agent) {
		if(agent.sealData.hasOwnProperty("remove_prio_hp")
		{
			battleInfo.logMsg += battleInfo.agent.display + " can't alter the turn's order ["+agent.seal+"]! ";
			if(agent.initHP >= agent.hp*agent.sealData.remove_prio_hp)
				battleInfo.logMsg += battleInfo.agent.display + " avoids the opponent changes the turn's order too ["+agent.seal+"]! ";
		}
		return battleInfo;
}

//This is redundant, separating this makes it easier to maintain
function giveBonuses(battleInfo, agent, other){

    // below hp threshold bonus
    if (agent.weaponData.hasOwnProperty("below_threshold_mod") && agent.initHP <= checkRoundError(agent.weaponData.below_threshold_mod.threshold * agent.hp)) {
        battleInfo = combatBonus(battleInfo, agent.weaponData.below_threshold_mod.stat_mod, weaponInfo[agent.weaponName].name, agent.agentClass, "for having HP ≤ " + (agent.weaponData.below_threshold_mod.threshold * 100).toString() + "%");
    }

    // below hp threshold bonus
    if (agent.passiveAData.hasOwnProperty("below_threshold_mod") && agent.initHP <= checkRoundError(agent.passiveAData.below_threshold_mod.threshold * agent.hp)) {
        battleInfo = combatBonus(battleInfo, agent.passiveAData.below_threshold_mod.stat_mod, skillInfo['a'][agent.passiveA].name, agent.agentClass, "for having HP ≤ " + (agent.passiveAData.below_threshold_mod.threshold * 100).toString() + "%");
    }

    // hp advantage boost
    if (agent.passiveAData.hasOwnProperty("hp_adv_mod") && agent.currHP - other.currHP >= agent.passiveAData.hp_adv_mod.hp_adv) {
        battleInfo = combatBonus(battleInfo, agent.passiveAData.hp_adv_mod.stat_mod, skillInfo['a'][agent.passiveA].name, agent.agentClass, "for having at least " + agent.passiveAData.hp_adv_mod.hp_adv.toString() + " more HP than the opponent");
    }

    // full hp bonus
    if (agent.weaponData.hasOwnProperty("full_hp_mod") && agent.currHP >= agent.hp) {
        battleInfo = combatBonus(battleInfo, agent.weaponData.full_hp_mod, weaponInfo[agent.weaponName].name, agent.agentClass, "for having full HP");
    }

    // opponent full hp bonus
    if (agent.weaponData.hasOwnProperty("foe_full_hp_mod") && other.currHP >= other.hp) {
        battleInfo = combatBonus(battleInfo, agent.weaponData.foe_full_hp_mod, weaponInfo[agent.weaponName].name, agent.agentClass, "for battling an opponent with full HP");
    }

    // blade tome bonuses
    if (agent.hasOwnProperty("addBonusAtk") && agent.addBonusAtk > 0) {
        battleInfo = bladeTomeBonus(battleInfo, agent.addBonusAtk, agent.agentClass);
    }

    // owl tome bonuses
    if (agent.weaponData.hasOwnProperty("adjacent_ally_bonus") && agent.adjacent > 0) {
        battleInfo = owlTomeBonus(battleInfo, agent.adjacent, agent.agentClass);
    }

    //adjacent stat bonus
    adjacentStatBonus(battleInfo, agent, agent.agentClass);

    return battleInfo;
}


// handles any combat bonuses
// battleInfo contains all battle information, statMods contains the stats to modify and the amounts to increase, modSource is the source of the bonuses
// charClass is either 'attacker' or 'defender', srcMsg is a message to insert in the log
function combatBonus(battleInfo, statMods, modSource, agentClass, srcMsg) {

    for (var stat in statMods) {
        battleInfo[agentClass][stat] += statMods[stat];
        battleInfo.logMsg += "<li class='battle-interaction'><span class='" + agentClass + "'><strong>" + battleInfo[agentClass].display + "</strong></span> gains " + statMods[stat].toString() + " " + statWord(stat) + " " + srcMsg + " [" + modSource + "].</li>";
    }

    return battleInfo;
}


// checks if a unit can accelerate special cooldown
// battleInfo contains the needed info for battle, attacker is true if we are accelerating the attacker's special
function hasSpecAccel(battleInfo, attacker) {

    var mainUnit = attacker ? battleInfo.attacker : battleInfo.defender;
    var otherUnit = attacker ? battleInfo.defender : battleInfo.attacker;

    //Check every hero ability for spec_accel data
    for (var i = 0; i < checks.length; i++) {
        var key = checks[i];

        //If no spec_accel data, continue to next ability
        if (!mainUnit[key].spec_accel) {
            continue;
        }

        var stat = mainUnit[key].spec_accel.stat;
        var reqStatAdvantage = mainUnit[key].spec_accel.adv;

        //If spec_accel data does not have stat information, there are no requirements
        if (!stat) {
            return true;
        }
        //Otherwise we need to compare stats
        else {

            //Account for bonuses to comparisons like phantom speed
            var pStat = phantomStat(mainUnit, stat);

            if (pStat - otherUnit[stat] >= reqStatAdvantage) {
                return true;
            }

        }
    }

    return false
}

//Returns a specific hero's stat with phantom stats included
function phantomStat(hero, stat) {

    var pStat = hero[stat];

    checks.forEach(function(key) {
        if (hero[key].phantom_stat_mod && hero[key].phantom_stat_mod[stat]) {
            pstat += hero[key].phantom_stat_mod[stat];
        }
    });

    return pStat;
}
