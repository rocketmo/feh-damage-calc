const checks = ['weaponData', 'passiveAData', 'passiveBData', 'passiveCData', 'sealData'];

function checkAffinity(mod, attacker, defender) {
    var atkAdept = 0;
    var defAdept = 0;

    var adv = false;
    if (mod > 1) {
        adv = true;
    }

    if (attacker.weaponData.hasOwnProperty("tri_advantage") || attacker.passiveAData.hasOwnProperty("tri_advantage")) {
        var adv = true;
        if (mod < 1) {
            adv = false;
        }
        atkAdept = cancelAffinity(attacker, defender, adv);
    }

    if (defender.weaponData.hasOwnProperty("tri_advantage") || defender.passiveAData.hasOwnProperty("tri_advantage")) {
        var adv = true;
        if (mod > 1) {
            adv = false;
        }
        defAdept = cancelAffinity(defender, attacker, adv);
    }

    if (Math.abs(atkAdept) > Math.abs(defAdept)) {
        return atkAdept;
    }
    return defAdept;



}

//Adjusts damage
function cancelAffinity(a, b, adv) {
    if (a.passiveBData.hasOwnProperty("cancel_skill_affinity")) {
        return -0.2;
    }

    if (b.passiveBData.hasOwnProperty("cancel_enemy_skill_affinity")) {
        return -0.2;
    }

    if (adv) {
        if (b.passiveBData.hasOwnProperty("cancel_negative_enemy_skill_affinity")) {
            return -0.2;
        }

        if (b.passiveBData.hasOwnProperty("reverse_negative_enemy_skill_affinity")) {
            return -0.4;
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

        if(source) {
            if (source.weapon_type && enemy.weaponData.type.includes(source.weapon_type)) {
                return true;
            }
        }

    return false;
    }
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


// handles any combat bonuses
// battleInfo contains all battle information, statMods contains the stats to modify and the amounts to increase, modSource is the source of the bonuses
// charClass is either 'attacker' or 'defender', srcMsg is a message to insert in the log
function combatBonus(battleInfo, statMods, modSource, charClass, srcMsg) {

	for (var stat in statMods) {
		battleInfo[charClass][stat] += statMods[stat];
		battleInfo.logMsg += "<li class='battle-interaction'><span class='" + charClass + "'><strong>" + battleInfo[charClass].display + "</strong></span> gains " + statMods[stat].toString() + " " + statWord(stat) + " " + srcMsg + " [" + modSource + "].</li>";
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
