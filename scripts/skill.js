// skill data
var skillInfo =
{
    "a" : {
        "Armored Blow 1" : {
            "description" : "Grants DEF+2 if unit initiates combat.",
            "initiate_mod" : {
                "def" : 2
            }
        },
        "Armored Blow 2" : {
            "description" : "Grants DEF+4 if unit initiates combat.",
            "initiate_mod" : {
                "def" : 4
            }
        },
        "Armored Blow 3" : {
            "description" : "Grants DEF+6 if unit initiates combat.",
            "initiate_mod" : {
                "def" : 6
            }
        },
        "Attack +1" : {
            "description" : "Grants ATK+1.",
            "stat_mod" : {
                "atk" : 1
            }
        },
        "Attack +2" : {
            "description" : "Grants ATK+2.",
            "stat_mod" : {
                "atk" : 2
            }
        },
        "Attack +3" : {
            "description" : "Grants ATK+3.",
            "stat_mod" : {
                "atk" : 3
            }
        },
        "Close Counter" : {
            "description" : "Enables unit to counter-attack regardless of distance to attacker.",
            "counter" : true
        },
        "Darting Blow 1" : {
            "description" : "Grants SPD+2 if unit initiates combat.",
            "initiate_mod" : {
                "spd" : 2
            }
        },
        "Darting Blow 2" : {
            "description" : "Grants SPD+4 if unit initiates combat.",
            "initiate_mod" : {
                "spd" : 4
            }
        },
        "Darting Blow 3" : {
            "description" : "Grants SPD+6 if unit initiates combat.",
            "initiate_mod" : {
                "spd" : 6
            }
        },
        "Death Blow 1" : {
            "description" : "Grants ATK+2 if unit initiates combat.",
            "initiate_mod" : {
                "atk" : 2
            }
        },
        "Death Blow 2" : {
            "description" : "Grants ATK+4 if unit initiates combat.",
            "initiate_mod" : {
                "atk" : 4
            }
        },
        "Death Blow 3" : {
            "description" : "Grants ATK+6 if unit initiates combat.",
            "initiate_mod" : {
                "atk" : 6
            }
        },
        "Defense +1" : {
            "description" : "Grants DEF+1.",
            "stat_mod" : {
                "def" : 1
            }
        },
        "Defense +2" : {
            "description" : "Grants DEF+2.",
            "stat_mod" : {
                "def" : 2
            }
        },
        "Defense +3" : {
            "description" : "Grants DEF+3.",
            "stat_mod" : {
                "def" : 3
            }
        },
        "Defiant Atk 1" : {
            "description" : "Grants ATK+3 at start of turn if unit's HP ≤ 50%.",
            "defiant" : {
                "atk" : 3
            }
        },
        "Defiant Atk 2" : {
            "description" : "Grants ATK+5 at start of turn if unit's HP ≤ 50%.",
            "defiant" : {
                "atk" : 5
            }
        },
        "Defiant Atk 3" : {
            "description" : "Grants ATK+7 at start of turn if unit's HP ≤ 50%.",
            "defiant" : {
                "atk" : 7
            }
        },
        "Defiant Def 1" : {
            "description" : "Grants DEF+3 at start of turn if unit's HP ≤ 50%.",
            "defiant" : {
                "def" : 3
            }
        },
        "Defiant Def 2" : {
            "description" : "Grants DEF+5 at start of turn if unit's HP ≤ 50%.",
            "defiant" : {
                "def" : 5
            }
        },
        "Defiant Def 3" : {
            "description" : "Grants DEF+7 at start of turn if unit's HP ≤ 50%.",
            "defiant" : {
                "def" : 7
            }
        },
        "Defiant Res 1" : {
            "description" : "Grants RES+3 at start of turn if unit's HP ≤ 50%.",
            "defiant" : {
                "res" : 3
            }
        },
        "Defiant Res 2" : {
            "description" : "Grants RES+5 at start of turn if unit's HP ≤ 50%.",
            "defiant" : {
                "res" : 5
            }
        },
        "Defiant Res 3" : {
            "description" : "Grants RES+7 at start of turn if unit's HP ≤ 50%.",
            "defiant" : {
                "res" : 7
            }
        },
        "Defiant Spd 1" : {
            "description" : "Grants SPD+3 at start of turn if unit's HP ≤ 50%.",
            "defiant" : {
                "spd" : 3
            }
        },
        "Defiant Spd 2" : {
            "description" : "Grants SPD+5 at start of turn if unit's HP ≤ 50%.",
            "defiant" : {
                "spd" : 5
            }
        },
        "Defiant Spd 3" : {
            "description" : "Grants SPD+7 at start of turn if unit's HP ≤ 50%.",
            "defiant" : {
                "spd" : 7
            }
        },
        "Distant Counter" : {
            "description" : "Enables unit to counter-attack regardless of distance to attacker.",
            "counter" : true
        },
        "Fury 1" : {
            "description" : "Grants ATK/SPD/DEF/RES+1. Unit takes 2 damage after combat.",
            "stat_mod" : {
                "atk" : 1,
                "spd" : 1,
                "def" : 1,
                "res" : 1
            },
            "recoil_dmg" : 2
        },
        "Fury 2" : {
            "description" : "Grants ATK/SPD/DEF/RES+2. Unit takes 4 damage after combat.",
            "stat_mod" : {
                "atk" : 2,
                "spd" : 2,
                "def" : 2,
                "res" : 2
            },
            "recoil_dmg" : 4
        },
        "Fury 3" : {
            "description" : "Grants ATK/SPD/DEF/RES+3. Unit takes 6 damage after combat.",
            "stat_mod" : {
                "atk" : 3,
                "spd" : 3,
                "def" : 3,
                "res" : 3
            },
            "recoil_dmg" : 6
        },
        "Grani's Shield" : {
            "description" : "Neutralizes \"effective against\" bonuses.",
            "cancel_effective" : true
        },
        "HP +3" : {
            "description" : "Grants HP+3.",
            "stat_mod" : {
                "hp" : 3
            }
        },
        "HP +4" : {
            "description" : "Grants HP+4.",
            "stat_mod" : {
                "hp" : 4
            }
        },
        "HP +5" : {
            "description" : "Grants HP+5.",
            "stat_mod" : {
                "hp" : 5
            }
        },
        "Iote's Shield" : {
            "description" : "Neutralizes \"effective against\" bonuses.",
            "cancel_effective" : true
        },
        "Life and Death 1" : {
            "description" : "Grants ATK/SPD+3. Inflicts DEF/RES-3.",
            "stat_mod" : {
                "atk" : 3,
                "spd" : 3,
                "def" : -3,
                "res" : -3
            }
        },
        "Life and Death 2" : {
            "description" : "Grants ATK/SPD+4. Inflicts DEF/RES-4.",
            "stat_mod" : {
                "atk" : 4,
                "spd" : 4,
                "def" : -4,
                "res" : -4
            }
        },
        "Life and Death 3" : {
            "description" : "Grants ATK/SPD+5. Inflicts DEF/RES-5.",
            "stat_mod" : {
                "atk" : 5,
                "spd" : 5,
                "def" : -5,
                "res" : -5
            }
        },
        "Resistance +1" : {
            "description" : "Grants RES+1.",
            "stat_mod" : {
                "res" : 1
            }
        },
        "Resistance +2" : {
            "description" : "Grants RES+2.",
            "stat_mod" : {
                "res" : 2
            }
        },
        "Resistance +3" : {
            "description" : "Grants RES+3.",
            "stat_mod" : {
                "res" : 3
            }
        },
        "Speed +1" : {
            "description" : "Grants SPD+1.",
            "stat_mod" : {
                "spd" : 1
            }
        },
        "Speed +2" : {
            "description" : "Grants SPD+2.",
            "stat_mod" : {
                "spd" : 2
            }
        },
        "Speed +3" : {
            "description" : "Grants SPD+3.",
            "stat_mod" : {
                "spd" : 3
            }
        },
        "Svalinn Shield" : {
            "description" : "Neutralizes \"effective against\" bonuses.",
            "cancel_effective" : true
        },
        "Triangle Adept 1" : {
            "description" : "Gives ATK+10% if unit has a weapon-triangle advantage, ATK-10% if disadvantage.",
            "tri_advantage" : 0.1
        },
        "Triangle Adept 2" : {
            "description" : "Gives ATK+15% if unit has a weapon-triangle advantage, ATK-15% if disadvantage.",
            "tri_advantage" : 0.15
        },
        "Triangle Adept 3" : {
            "description" : "Gives ATK+20% if unit has a weapon-triangle advantage, ATK-20% if disadvantage.",
            "tri_advantage" : 0.2
        },
        "Warding Blow 1" : {
            "description" : "Grants RES+2 if unit initiates combat.",
            "initiate_mod" : {
                "res" : 2
            }
        },
        "Warding Blow 2" : {
            "description" : "Grants RES+4 if unit initiates combat.",
            "initiate_mod" : {
                "res" : 4
            }
        },
        "Warding Blow 3" : {
            "description" : "Grants RES+6 if unit initiates combat.",
            "initiate_mod" : {
                "res" : 6
            }
        }
    },
    "b" : {
        "Axebreaker 1" : {
            "description" : "If unit's HP ≥ 90% in combat against an Axe user, unit makes a follow-up attack and foe cannot.",
            "breaker" : {
                "weapon_type" : "Axe",
                "threshold" : 0.9
            }
        },
        "Axebreaker 2" : {
            "description" : "If unit's HP ≥ 70% in combat against an Axe user, unit makes a follow-up attack and foe cannot.",
            "breaker" : {
                "weapon_type" : "Axe",
                "threshold" : 0.7
            }
        },
        "Axebreaker 3" : {
            "description" : "If unit's HP ≥ 50% in combat against an Axe user, unit makes a follow-up attack and foe cannot.",
            "breaker" : {
                "weapon_type" : "Axe",
                "threshold" : 0.5
            }
        },
        "Bowbreaker 1" : {
            "description" : "If unit's HP ≥ 90% in combat against a Bow user, unit makes a follow-up attack and foe cannot.",
            "breaker" : {
                "weapon_type" : "Bow",
                "threshold" : 0.9
            }
        },
        "Bowbreaker 2" : {
            "description" : "If unit's HP ≥ 70% in combat against a Bow user, unit makes a follow-up attack and foe cannot.",
            "breaker" : {
                "weapon_type" : "Bow",
                "threshold" : 0.7
            }
        },
        "Bowbreaker 3" : {
            "description" : "If unit's HP ≥ 50% in combat against a Bow user, unit makes a follow-up attack and foe cannot.",
            "breaker" : {
                "weapon_type" : "Bow",
                "threshold" : 0.5
            }
        },
        "B Tomebreaker 1" : {
            "description" : "If unit's HP ≥ 90% in combat against a Blue Tome user, unit makes a follow-up attack and foe cannot.",
            "breaker" : {
                "weapon_type" : "Blue Tome",
                "threshold" : 0.9
            }
        },
        "B Tomebreaker 2" : {
            "description" : "If unit's HP ≥ 70% in combat against a Blue Tome user, unit makes a follow-up attack and foe cannot.",
            "breaker" : {
                "weapon_type" : "Blue Tome",
                "threshold" : 0.7
            }
        },
        "B Tomebreaker 3" : {
            "description" : "If unit's HP ≥ 50% in combat against a Blue Tome user, unit makes a follow-up attack and foe cannot.",
            "breaker" : {
                "weapon_type" : "Blue Tome",
                "threshold" : 0.5
            }
        },
        "Brash Assault 1" : {
            "description" : "Unit automatically makes a follow-up attack when at HP ≤ 30% and attacking a foe that can counter.",
            "brash" : {
                "threshold" : 0.3
            }
        },
        "Brash Assault 2" : {
            "description" : "Unit automatically makes a follow-up attack when at HP ≤ 40% and attacking a foe that can counter.",
            "brash" : {
                "threshold" : 0.4
            }
        },
        "Brash Assault 3" : {
            "description" : "Unit automatically makes a follow-up attack when at HP ≤ 50% and attacking a foe that can counter.",
            "brash" : {
                "threshold" : 0.5
            }
        },
        "Daggerbreaker 1" : {
            "description" : "If unit's HP ≥ 90% in combat against a Dagger user, unit makes a follow-up attack and foe cannot.",
            "breaker" : {
                "weapon_type" : "Dagger",
                "threshold" : 0.9
            }
        },
        "Daggerbreaker 2" : {
            "description" : "If unit's HP ≥ 70% in combat against a Dagger user, unit makes a follow-up attack and foe cannot.",
            "breaker" : {
                "weapon_type" : "Dagger",
                "threshold" : 0.7
            }
        },
        "Daggerbreaker 3" : {
            "description" : "If unit's HP ≥ 50% in combat against a Dagger user, unit makes a follow-up attack and foe cannot.",
            "breaker" : {
                "weapon_type" : "Dagger",
                "threshold" : 0.5
            }
        },
        "Desperation 1" : {
            "description" : "If unit initiates combat with HP ≤ 25%, any follow-up attack occurs immediately.",
            "desperation" : {
                "threshold" : 0.25
            }
        },
        "Desperation 2" : {
            "description" : "If unit initiates combat with HP ≤ 50%, any follow-up attack occurs immediately.",
            "desperation" : {
                "threshold" : 0.5
            }
        },
        "Desperation 3" : {
            "description" : "If unit initiates combat with HP ≤ 75%, any follow-up attack occurs immediately.",
            "desperation" : {
                "threshold" : 0.75
            }
        },
        "Drag Back" : {
            "description" : "If unit initiates attack, unit moves 1 space away after combat. Foe moves into unit's previous space."
        },
        "Escape Route 1" : {
            "description" : "Enables unit with HP ≤ 30% to warp adjacent to any ally."
        },
        "Escape Route 2" : {
            "description" : "Enables unit with HP ≤ 40% to warp adjacent to any ally."
        },
        "Escape Route 3" : {
            "description" : "Enables unit with HP ≤ 50% to warp adjacent to any ally."
        },
        "G Tomebreaker 1" : {
            "description" : "If unit's HP ≥ 90% in combat against a Green Tome user, unit makes a follow-up attack and foe cannot.",
            "breaker" : {
                "weapon_type" : "Green Tome",
                "threshold" : 0.9
            }
        },
        "G Tomebreaker 2" : {
            "description" : "If unit's HP ≥ 70% in combat against a Blue Tome user, unit makes a follow-up attack and foe cannot.",
            "breaker" : {
                "weapon_type" : "Green Tome",
                "threshold" : 0.7
            }
        },
        "G Tomebreaker 3" : {
            "description" : "If unit's HP ≥ 50% in combat against a Blue Tome user, unit makes a follow-up attack and foe cannot.",
            "breaker" : {
                "weapon_type" : "Green Tome",
                "threshold" : 0.5
            }
        },
        "Knock Back" : {
            "description" : "If unit initiates attack, foe is moved 1 space away after combat."
        },
        "Lancebreaker 1" : {
            "description" : "If unit's HP ≥ 90% in combat against a Lance user, unit makes a follow-up attack and foe cannot.",
            "breaker" : {
                "weapon_type" : "Lance",
                "threshold" : 0.9
            }
        },
        "Lancebreaker 2" : {
            "description" : "If unit's HP ≥ 70% in combat against a Lance user, unit makes a follow-up attack and foe cannot.",
            "breaker" : {
                "weapon_type" : "Lance",
                "threshold" : 0.7
            }
        },
        "Lancebreaker 3" : {
            "description" : "If unit's HP ≥ 50% in combat against a Lance user, unit makes a follow-up attack and foe cannot.",
            "breaker" : {
                "weapon_type" : "Lance",
                "threshold" : 0.5
            }
        },
        "Live to Serve 1" : {
            "description" : "When healing allies with a staff, unit also recovers 50% of the HP restored."
        },
        "Live to Serve 2" : {
            "description" : "When healing allies with a staff, unit also recovers 75% of the HP restored."
        },
        "Live to Serve 3" : {
            "description" : "When healing allies with a staff, unit also recovers the same amount."
        },
        "Lunge" : {
            "description" : "If unit initiates attack, after combat, unit and foe swap places."
        },
        "Obstruct 1" : {
            "description" : "Prevents foes from moving through adjacent spaces while this unit's HP ≥ 90%."
        },
        "Obstruct 2" : {
            "description" : "Prevents foes from moving through adjacent spaces while this unit's HP ≥ 70%."
        },
        "Obstruct 3" : {
            "description" : "Prevents foes from moving through adjacent spaces while this unit's HP ≥ 50%."
        },
        "Pass 1" : {
            "description" : "Unit can pass through foes if their own HP ≥ 75%."
        },
        "Pass 2" : {
            "description" : "Unit can pass through foes if their own HP ≥ 50%."
        },
        "Pass 3" : {
            "description" : "Unit can pass through foes if their own HP ≥ 25%."
        },
        "Poison Strike 1" : {
            "description" : "Inflicts 4 damage to foe after any combat this unit initiates.",
            "poison" : 4
        },
        "Poison Strike 2" : {
            "description" : "Inflicts 7 damage to foe after any combat this unit initiates.",
            "poison" : 7
        },
        "Poison Strike 3" : {
            "description" : "Inflicts 10 damage to foe after any combat this unit initiates.",
            "poison" : 10
        },
        "Quick Riposte 1" : {
            "description" : "Unit automatically makes a follow-up attack if attacked at HP ≥ 90%.",
            "riposte" : {
                "threshold" : 0.9
            }
        },
        "Quick Riposte 2" : {
            "description" : "Unit automatically makes a follow-up attack if attacked at HP ≥ 80%.",
            "riposte" : {
                "threshold" : 0.8
            }
        },
        "Quick Riposte 3" : {
            "description" : "Unit automatically makes a follow-up attack if attacked at HP ≥ 70%.",
            "riposte" : {
                "threshold" : 0.7
            }
        },
        "R Tomebreaker 1" : {
            "description" : "If unit's HP ≥ 90% in combat against a Red Tome user, unit makes a follow-up attack and foe cannot.",
            "breaker" : {
                "weapon_type" : "Red Tome",
                "threshold" : 0.9
            }
        },
        "R Tomebreaker 2" : {
            "description" : "If unit's HP ≥ 70% in combat against a Red Tome user, unit makes a follow-up attack and foe cannot.",
            "breaker" : {
                "weapon_type" : "Red Tome",
                "threshold" : 0.7
            }
        },
        "R Tomebreaker 3" : {
            "description" : "If unit's HP ≥ 50% in combat against a Red Tome user, unit makes a follow-up attack and foe cannot.",
            "breaker" : {
                "weapon_type" : "Red Tome",
                "threshold" : 0.5
            }
        },
        "Renewal 1" : {
            "description" : "At the start of every fourth turn, restores 10 HP.",
            "heal" : {
                "amount" : 10,
                "turn_counter" : 4
            }
        },
        "Renewal 2" : {
            "description" : "At the start of every third turn, restores 10 HP.",
            "heal" : {
                "amount" : 10,
                "turn_counter" : 3
            }
        },
        "Renewal 3" : {
            "description" : "At the start of every second turn, restores 10 HP.",
            "heal" : {
                "amount" : 10,
                "turn_counter" : 2
            }
        },
        "Seal Atk 1" : {
            "description" : "After combat, foe suffers ATK-3 through their next actions.",
            "seal" : {
                "atk" : -3
            }
        },
        "Seal Atk 2" : {
            "description" : "After combat, foe suffers ATK-5 through their next actions.",
            "seal" : {
                "atk" : -5
            }
        },
        "Seal Atk 3" : {
            "description" : "After combat, foe suffers ATK-7 through their next actions.",
            "seal" : {
                "atk" : -7
            }
        },
        "Seal Def 1" : {
            "description" : "After combat, foe suffers DEF-3 through their next actions.",
            "seal" : {
                "def" : -3
            }
        },
        "Seal Def 2" : {
            "description" : "After combat, foe suffers DEF-5 through their next actions.",
            "seal" : {
                "def" : -5
            }

        },
        "Seal Def 3" : {
            "description" : "After combat, foe suffers DEF-7 through their next actions.",
            "seal" : {
                "def" : -7
            }
        },
        "Seal Res 1" : {
            "description" : "After combat, foe suffers RES-3 through their next actions.",
            "seal" : {
                "res" : -3
            }
        },
        "Seal Res 2" : {
            "description" : "After combat, foe suffers RES-5 through their next actions.",
            "seal" : {
                "res" : -5
            }
        },
        "Seal Res 3" : {
            "description" : "After combat, foe suffers RES-7 through their next actions.",
            "seal" : {
                "res" : -7
            }
        },
        "Seal Spd 1" : {
            "description" : "After combat, foe suffers SPD-3 through their next actions.",
            "seal" : {
                "spd" : -3
            }
        },
        "Seal Spd 2" : {
            "description" : "After combat, foe suffers SPD-5 through their next actions.",
            "seal" : {
                "spd" : -5
            }
        },
        "Seal Spd 3" : {
            "description" : "After combat, foe suffers SPD-7 through their next actions.",
            "seal" : {
                "spd" : -7
            }
        },
        "Swordbreaker 1" : {
            "description" : "If unit's HP ≥ 90% in combat against a Sword user, unit makes a follow-up attack and foe cannot.",
            "breaker" : {
                "weapon_type" : "Sword",
                "threshold" : 0.9
            }
        },
        "Swordbreaker 2" : {
            "description" : "If unit's HP ≥ 70% in combat against a Sword user, unit makes a follow-up attack and foe cannot.",
            "breaker" : {
                "weapon_type" : "Sword",
                "threshold" : 0.7
            }
        },
        "Swordbreaker 3" : {
            "description" : "If unit's HP ≥ 50% in combat against a Sword user, unit makes a follow-up attack and foe cannot.",
            "breaker" : {
                "weapon_type" : "Sword",
                "threshold" : 0.5
            }
        },
        "Vantage 1" : {
            "description" : "Unit counter-attacks first when attacked at HP ≤ 25%.",
            "vantage" : {
                "threshold" : 0.25
            }
        },
        "Vantage 2" : {
            "description" : "Unit counter-attacks first when attacked at HP ≤ 50%.",
            "vantage" : {
                "threshold" : 0.5
            }
        },
        "Vantage 3" : {
            "description" : "Unit counter-attacks first when attacked at HP ≤ 75%.",
            "vantage" : {
                "threshold" : 0.75
            }
        },
        "Wary Fighter 1" : {
            "description" : "Prevents follow up attack in combat from unit and foe if unit's HP ≤ 90%.",
            "wary" : {
                "threshold" : 0.9
            }
        },
        "Wary Fighter 2" : {
            "description" : "Prevents follow up attack in combat from unit and foe if unit's HP ≤ 70%.",
            "wary" : {
                "threshold" : 0.7
            }
        },
        "Wary Fighter 3" : {
            "description" : "Prevents follow up attack in combat from unit and foe if unit's HP ≤ 50%.",
            "wary" : {
                "threshold" : 0.5
            }
        },
        "Wings of Mercy 1" : {
            "description" : "Enables unit to warp adjacent to any ally with HP ≤ 30%."
        },
        "Wings of Mercy 2" : {
            "description" : "Enables unit to warp adjacent to any ally with HP ≤ 40%."
        },
        "Wings of Mercy 3" : {
            "description" : "Enables unit to warp adjacent to any ally with HP ≤ 50%."
        }
    },
    "c" : {
        "Breath of Life 1" : {
            "description" : "If unit initiates attack, adjacent allies recover 3 HP after combat."
        },
        "Breath of Life 2" : {
            "description" : "If unit initiates attack, adjacent allies recover 5 HP after combat."
        },
        "Breath of Life 3" : {
            "description" : "If unit initiates attack, adjacent allies recover 7 HP after combat."
        },
        "Fortify Def 1" : {
            "description" : "Grants adjacent allies DEF+2 through their next actions at the start of each turn."
        },
        "Fortify Def 2" : {
            "description" : "Grants adjacent allies DEF+3 through their next actions at the start of each turn."
        },
        "Fortify Def 3" : {
            "description" : "Grants adjacent allies DEF+4 through their next actions at the start of each turn."
        },
        "Fortify Res 1" : {
            "description" : "Grants adjacent allies RES+2 through their next actions at the start of each turn."
        },
        "Fortify Res 2" : {
            "description" : "Grants adjacent allies RES+3 through their next actions at the start of each turn."
        },
        "Fortify Res 3" : {
            "description" : "Grants adjacent allies RES+4 through their next actions at the start of each turn."
        },
        "Fortify Armor" : {
            "description" : "Grants adjacent armored allies DEF/RES+6 through their next actions at the start of each turn."
        },
        "Fortify Cavalry" : {
            "description" : "Grants adjacent cavalry allies DEF/RES+6 through their next actions at the start of each turn."
        },
        "Fortify Fliers" : {
            "description" : "Grants adjacent flying allies DEF/RES+6 through their next actions at the start of each turn."
        },
        "Goad Armor" : {
            "description" : "Grants armored allies within 2 spaces ATK/SPD+4 during combat."
        },
        "Goad Cavalry" : {
            "description" : "Grants cavalry allies within 2 spaces ATK/SPD+4 during combat."
        },
        "Goad Fliers" : {
            "description" : "Grants flying allies within 2 spaces ATK/SPD+4 during combat."
        },
        "Hone Atk 1" : {
            "description" : "Grants adjacent allies ATK+2 through their next actions at the start of each turn."
        },
        "Hone Atk 2" : {
            "description" : "Grants adjacent allies ATK+3 through their next actions at the start of each turn."
        },
        "Hone Atk 3" : {
            "description" : "Grants adjacent allies ATK+4 through their next actions at the start of each turn."
        },
        "Hone Spd 1" : {
            "description" : "Grants adjacent allies SPD+2 through their next actions at the start of each turn."
        },
        "Hone Spd 2" : {
            "description" : "Grants adjacent allies SPD+3 through their next actions at the start of each turn."
        },
        "Hone Spd 3" : {
            "description" : "Grants adjacent allies SPD+4 through their next actions at the start of each turn."
        },
        "Hone Armor" : {
            "description" : "Grants adjacent armored allies ATK/SPD+6 through their next actions at the start of each turn."
        },
        "Hone Cavalry" : {
            "description" : "Grants adjacent cavalry allies ATK/SPD+6 through their next actions at the start of each turn."
        },
        "Hone Fliers" : {
            "description" : "Grants adjacent flying allies ATK/SPD+6 through their next actions at the start of each turn."
        },
        "Savage Blow 1" : {
            "description" : "If unit initiates attack, foes within 2 spaces of target take 3 damage after combat."
        },
        "Savage Blow 2" : {
            "description" : "If unit initiates attack, foes within 2 spaces of target take 5 damage after combat."
        },
        "Savage Blow 3" : {
            "description" : "If unit initiates attack, foes within 2 spaces of target take 7 damage after combat."
        },
        "Spur Atk 1" : {
            "description" : "Grants adjacent allies ATK+2 during combat."
        },
        "Spur Atk 2" : {
            "description" : "Grants adjacent allies ATK+3 during combat."
        },
        "Spur Atk 3" : {
            "description" : "Grants adjacent allies ATK+4 during combat."
        },
        "Spur Def 1" : {
            "description" : "Grants adjacent allies DEF+2 during combat."
        },
        "Spur Def 2" : {
            "description" : "Grants adjacent allies DEF+3 during combat."
        },
        "Spur Def 3" : {
            "description" : "Grants adjacent allies DEF+4 during combat."
        },
        "Spur Res 1" : {
            "description" : "Grants adjacent allies RES+2 during combat."
        },
        "Spur Res 2" : {
            "description" : "Grants adjacent allies RES+3 during combat."
        },
        "Spur Res 3" : {
            "description" : "Grants adjacent allies RES+4 during combat."
        },
        "Spur Spd 1" : {
            "description" : "Grants adjacent allies SPD+2 during combat."
        },
        "Spur Spd 2" : {
            "description" : "Grants adjacent allies SPD+3 during combat."
        },
        "Spur Spd 3" : {
            "description" : "Grants adjacent allies SPD+4 during combat."
        },
        "Threaten Atk 1" : {
            "description" : "Inflicts ATK-3 on foes within 2 spaces through their next actions at the start of each turn.",
            "threaten" : {
                "atk" : -3
            }
        },
        "Threaten Atk 2" : {
            "description" : "Inflicts ATK-4 on foes within 2 spaces through their next actions at the start of each turn.",
            "threaten" : {
                "atk" : -4
            }
        },
        "Threaten Atk 3" : {
            "description" : "Inflicts ATK-5 on foes within 2 spaces through their next actions at the start of each turn.",
            "threaten" : {
                "atk" : -5
            }
        },
        "Threaten Def 1" : {
            "description" : "Inflicts DEF-3 on foes within 2 spaces through their next actions at the start of each turn.",
            "threaten" : {
                "def" : -3
            }
        },
        "Threaten Def 2" : {
            "description" : "Inflicts DEF-4 on foes within 2 spaces through their next actions at the start of each turn.",
            "threaten" : {
                "def" : -4
            }
        },
        "Threaten Def 3" : {
            "description" : "Inflicts DEF-5 on foes within 2 spaces through their next actions at the start of each turn.",
            "threaten" : {
                "def" : -5
            }
        },
        "Threaten Res 1" : {
            "description" : "Inflicts RES-3 on foes within 2 spaces through their next actions at the start of each turn.",
            "threaten" : {
                "res" : -3
            }
        },
        "Threaten Res 2" : {
            "description" : "Inflicts RES-4 on foes within 2 spaces through their next actions at the start of each turn.",
            "threaten" : {
                "res" : -4
            }
        },
        "Threaten Res 3" : {
            "description" : "Inflicts RES-5 on foes within 2 spaces through their next actions at the start of each turn.",
            "threaten" : {
                "res" : -5
            }
        },
        "Threaten Spd 1" : {
            "description" : "Inflicts SPD-3 on foes within 2 spaces through their next actions at the start of each turn.",
            "threaten" : {
                "spd" : -3
            }
        },
        "Threaten Spd 2" : {
            "description" : "Inflicts SPD-4 on foes within 2 spaces through their next actions at the start of each turn.",
            "threaten" : {
                "res" : -4
            }
        },
        "Threaten Spd 3" : {
            "description" : "Inflicts SPD-5 on foes within 2 spaces through their next actions at the start of each turn.",
            "threaten" : {
                "res" : -5
            }
        },
        "Ward Armor" : {
            "description" : "Grants armored allies within 2 spaces DEF/RES+4 during combat."
        },
        "Ward Cavalry" : {
            "description" : "Grants cavalry allies within 2 spaces DEF/RES+4 during combat."
        },
        "Ward Fliers" : {
            "description" : "Grants flying allies within 2 spaces DEF/RES+4 during combat."
        }
    }
};
