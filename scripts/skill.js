// skill data
var skillInfo =
{
    "a" : {
        "Armored Blow 1" : {
            "description" : "Grants Def+2 if unit initiates combat.",
            "initiate_mod" : {
                "def" : 2
            },
            "weapon_restrict" : "Staff"
        },
        "Armored Blow 2" : {
            "description" : "Grants Def+4 if unit initiates combat.",
            "initiate_mod" : {
                "def" : 4
            },
            "weapon_restrict" : "Staff"
        },
        "Armored Blow 3" : {
            "description" : "Grants Def+6 if unit initiates combat.",
            "initiate_mod" : {
                "def" : 6
            },
            "weapon_restrict" : "Staff"
        },
        "Attack +1" : {
            "description" : "Grants Atk+1.",
            "stat_mod" : {
                "atk" : 1
            }
        },
        "Attack +2" : {
            "description" : "Grants Atk+2.",
            "stat_mod" : {
                "atk" : 2
            }
        },
        "Attack +3" : {
            "description" : "Grants Atk+3.",
            "stat_mod" : {
                "atk" : 3
            }
        },
        "Close Counter" : {
            "description" : "Enables unit to counter-attack regardless of distance to attacker.",
            "counter" : true,
            "range_unique" : 2
        },
        "Darting Blow 1" : {
            "description" : "Grants Spd+2 if unit initiates combat.",
            "initiate_mod" : {
                "spd" : 2
            },
            "weapon_restrict" : "Staff"
        },
        "Darting Blow 2" : {
            "description" : "Grants Spd+4 if unit initiates combat.",
            "initiate_mod" : {
                "spd" : 4
            },
            "weapon_restrict" : "Staff"
        },
        "Darting Blow 3" : {
            "description" : "Grants Spd+6 if unit initiates combat.",
            "initiate_mod" : {
                "spd" : 6
            },
            "weapon_restrict" : "Staff"
        },
        "Death Blow 1" : {
            "description" : "Grants Atk+2 if unit initiates combat.",
            "initiate_mod" : {
                "atk" : 2
            },
            "weapon_restrict" : "Staff"
        },
        "Death Blow 2" : {
            "description" : "Grants Atk+4 if unit initiates combat.",
            "initiate_mod" : {
                "atk" : 4
            },
            "weapon_restrict" : "Staff"
        },
        "Death Blow 3" : {
            "description" : "Grants Atk+6 if unit initiates combat.",
            "initiate_mod" : {
                "atk" : 6
            },
            "weapon_restrict" : "Staff"
        },
        "Defense +1" : {
            "description" : "Grants Def+1.",
            "stat_mod" : {
                "def" : 1
            }
        },
        "Defense +2" : {
            "description" : "Grants Def+2.",
            "stat_mod" : {
                "def" : 2
            }
        },
        "Defense +3" : {
            "description" : "Grants Def+3.",
            "stat_mod" : {
                "def" : 3
            }
        },
        "Defiant Atk 1" : {
            "description" : "Grants Atk+3 at start of turn if unit's HP ≤ 50%.",
            "defiant" : {
                "atk" : 3
            }
        },
        "Defiant Atk 2" : {
            "description" : "Grants Atk+5 at start of turn if unit's HP ≤ 50%.",
            "defiant" : {
                "atk" : 5
            }
        },
        "Defiant Atk 3" : {
            "description" : "Grants Atk+7 at start of turn if unit's HP ≤ 50%.",
            "defiant" : {
                "atk" : 7
            }
        },
        "Defiant Def 1" : {
            "description" : "Grants Def+3 at start of turn if unit's HP ≤ 50%.",
            "defiant" : {
                "def" : 3
            }
        },
        "Defiant Def 2" : {
            "description" : "Grants Def+5 at start of turn if unit's HP ≤ 50%.",
            "defiant" : {
                "def" : 5
            }
        },
        "Defiant Def 3" : {
            "description" : "Grants Def+7 at start of turn if unit's HP ≤ 50%.",
            "defiant" : {
                "def" : 7
            }
        },
        "Defiant Res 1" : {
            "description" : "Grants Res+3 at start of turn if unit's HP ≤ 50%.",
            "defiant" : {
                "res" : 3
            }
        },
        "Defiant Res 2" : {
            "description" : "Grants Res+5 at start of turn if unit's HP ≤ 50%.",
            "defiant" : {
                "res" : 5
            }
        },
        "Defiant Res 3" : {
            "description" : "Grants Res+7 at start of turn if unit's HP ≤ 50%.",
            "defiant" : {
                "res" : 7
            }
        },
        "Defiant Spd 1" : {
            "description" : "Grants Spd+3 at start of turn if unit's HP ≤ 50%.",
            "defiant" : {
                "spd" : 3
            }
        },
        "Defiant Spd 2" : {
            "description" : "Grants Spd+5 at start of turn if unit's HP ≤ 50%.",
            "defiant" : {
                "spd" : 5
            }
        },
        "Defiant Spd 3" : {
            "description" : "Grants Spd+7 at start of turn if unit's HP ≤ 50%.",
            "defiant" : {
                "spd" : 7
            }
        },
        "Distant Counter" : {
            "description" : "Enables unit to counter-attack regardless of distance to attacker.",
            "counter" : true,
            "range_unique" : 1
        },
        "Fury 1" : {
            "description" : "Grants Atk/Spd/Def/Res+1. Unit takes 2 damage after combat.",
            "stat_mod" : {
                "atk" : 1,
                "spd" : 1,
                "def" : 1,
                "res" : 1
            },
            "recoil_dmg" : 2,
            "weapon_restrict" : "Staff"
        },
        "Fury 2" : {
            "description" : "Grants Atk/Spd/Def/Res+2. Unit takes 4 damage after combat.",
            "stat_mod" : {
                "atk" : 2,
                "spd" : 2,
                "def" : 2,
                "res" : 2
            },
            "recoil_dmg" : 4,
            "weapon_restrict" : "Staff"
        },
        "Fury 3" : {
            "description" : "Grants Atk/Spd/Def/Res+3. Unit takes 6 damage after combat.",
            "stat_mod" : {
                "atk" : 3,
                "spd" : 3,
                "def" : 3,
                "res" : 3
            },
            "recoil_dmg" : 6,
            "weapon_restrict" : "Staff"
        },
        "Grani's Shield" : {
            "description" : "Neutralizes \"effective against\" bonuses.",
            "cancel_effective" : true,
            "move_unique" : "Cavalry"
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
            "cancel_effective" : true,
            "move_unique" : "Flying"
        },
        "Life and Death 1" : {
            "description" : "Grants Atk/Spd+3. Inflicts Def/Res-3.",
            "stat_mod" : {
                "atk" : 3,
                "spd" : 3,
                "def" : -3,
                "res" : -3
            },
            "weapon_restrict" : "Staff"
        },
        "Life and Death 2" : {
            "description" : "Grants Atk/Spd+4. Inflicts Def/Res-4.",
            "stat_mod" : {
                "atk" : 4,
                "spd" : 4,
                "def" : -4,
                "res" : -4
            },
            "weapon_restrict" : "Staff"
        },
        "Life and Death 3" : {
            "description" : "Grants Atk/Spd+5. Inflicts Def/Res-5.",
            "stat_mod" : {
                "atk" : 5,
                "spd" : 5,
                "def" : -5,
                "res" : -5
            },
            "weapon_restrict" : "Staff"
        },
        "Resistance +1" : {
            "description" : "Grants Res+1.",
            "stat_mod" : {
                "res" : 1
            }
        },
        "Resistance +2" : {
            "description" : "Grants Res+2.",
            "stat_mod" : {
                "res" : 2
            }
        },
        "Resistance +3" : {
            "description" : "Grants Res+3.",
            "stat_mod" : {
                "res" : 3
            }
        },
        "Speed +1" : {
            "description" : "Grants Spd+1.",
            "stat_mod" : {
                "spd" : 1
            }
        },
        "Speed +2" : {
            "description" : "Grants Spd+2.",
            "stat_mod" : {
                "spd" : 2
            }
        },
        "Speed +3" : {
            "description" : "Grants Spd+3.",
            "stat_mod" : {
                "spd" : 3
            }
        },
        "Svalinn Shield" : {
            "description" : "Neutralizes \"effective against\" bonuses.",
            "cancel_effective" : true,
            "move_unique" : "Armored"
        },
        "Triangle Adept 1" : {
            "description" : "Gives Atk+10% if unit has a weapon-triangle advantage, Atk-10% if disadvantage.",
            "tri_advantage" : 0.1,
            "color_restrict" : "Colorless"
        },
        "Triangle Adept 2" : {
            "description" : "Gives Atk+15% if unit has a weapon-triangle advantage, Atk-15% if disadvantage.",
            "tri_advantage" : 0.15,
            "color_restrict" : "Colorless"
        },
        "Triangle Adept 3" : {
            "description" : "Gives Atk+20% if unit has a weapon-triangle advantage, Atk-20% if disadvantage.",
            "tri_advantage" : 0.2,
            "color_restrict" : "Colorless"
        },
        "Warding Blow 1" : {
            "description" : "Grants Res+2 if unit initiates combat.",
            "initiate_mod" : {
                "res" : 2
            },
            "weapon_restrict" : "Staff"
        },
        "Warding Blow 2" : {
            "description" : "Grants Res+4 if unit initiates combat.",
            "initiate_mod" : {
                "res" : 4
            },
            "weapon_restrict" : "Staff"
        },
        "Warding Blow 3" : {
            "description" : "Grants Res+6 if unit initiates combat.",
            "initiate_mod" : {
                "res" : 6
            },
            "weapon_restrict" : "Staff"
        }
    },
    "b" : {
        "Axebreaker 1" : {
            "description" : "If unit's HP ≥ 90% in combat against an Axe user, unit makes a follow-up attack and foe cannot.",
            "breaker" : {
                "weapon_type" : "Axe",
                "threshold" : 0.9
            },
            "color_restrict" : "Blue"
        },
        "Axebreaker 2" : {
            "description" : "If unit's HP ≥ 70% in combat against an Axe user, unit makes a follow-up attack and foe cannot.",
            "breaker" : {
                "weapon_type" : "Axe",
                "threshold" : 0.7
            },
            "color_restrict" : "Blue"
        },
        "Axebreaker 3" : {
            "description" : "If unit's HP ≥ 50% in combat against an Axe user, unit makes a follow-up attack and foe cannot.",
            "breaker" : {
                "weapon_type" : "Axe",
                "threshold" : 0.5
            },
            "color_restrict" : "Blue"
        },
        "Bowbreaker 1" : {
            "description" : "If unit's HP ≥ 90% in combat against a Bow user, unit makes a follow-up attack and foe cannot.",
            "breaker" : {
                "weapon_type" : "Bow",
                "threshold" : 0.9
            }
        },
        "Bowbreaker 2" : {
            "description" : "If unit's HP ≥ 70% in combat against a Bow user, unit makes a follow-up attack and foe cannot.",
            "breaker" : {
                "weapon_type" : "Bow",
                "threshold" : 0.7
            }
        },
        "Bowbreaker 3" : {
            "description" : "If unit's HP ≥ 50% in combat against a Bow user, unit makes a follow-up attack and foe cannot.",
            "breaker" : {
                "weapon_type" : "Bow",
                "threshold" : 0.5
            }
        },
        "B Tomebreaker 1" : {
            "description" : "If unit's HP ≥ 90% in combat against a Blue Tome user, unit makes a follow-up attack and foe cannot.",
            "breaker" : {
                "weapon_type" : "Blue Tome",
                "threshold" : 0.9
            },
            "color_restrict" : "Red"
        },
        "B Tomebreaker 2" : {
            "description" : "If unit's HP ≥ 70% in combat against a Blue Tome user, unit makes a follow-up attack and foe cannot.",
            "breaker" : {
                "weapon_type" : "Blue Tome",
                "threshold" : 0.7
            },
            "color_restrict" : "Red"
        },
        "B Tomebreaker 3" : {
            "description" : "If unit's HP ≥ 50% in combat against a Blue Tome user, unit makes a follow-up attack and foe cannot.",
            "breaker" : {
                "weapon_type" : "Blue Tome",
                "threshold" : 0.5
            },
            "color_restrict" : "Red"
        },
        "Brash Assault 1" : {
            "description" : "Unit automatically makes a follow-up attack when at HP ≤ 30% and attacking a foe that can counter.",
            "brash" : {
                "threshold" : 0.3
            }
        },
        "Brash Assault 2" : {
            "description" : "Unit automatically makes a follow-up attack when at HP ≤ 40% and attacking a foe that can counter.",
            "brash" : {
                "threshold" : 0.4
            }
        },
        "Brash Assault 3" : {
            "description" : "Unit automatically makes a follow-up attack when at HP ≤ 50% and attacking a foe that can counter.",
            "brash" : {
                "threshold" : 0.5
            }
        },
        "Daggerbreaker 1" : {
            "description" : "If unit's HP ≥ 90% in combat against a Dagger user, unit makes a follow-up attack and foe cannot.",
            "breaker" : {
                "weapon_type" : "Dagger",
                "threshold" : 0.9
            }
        },
        "Daggerbreaker 2" : {
            "description" : "If unit's HP ≥ 70% in combat against a Dagger user, unit makes a follow-up attack and foe cannot.",
            "breaker" : {
                "weapon_type" : "Dagger",
                "threshold" : 0.7
            }
        },
        "Daggerbreaker 3" : {
            "description" : "If unit's HP ≥ 50% in combat against a Dagger user, unit makes a follow-up attack and foe cannot.",
            "breaker" : {
                "weapon_type" : "Dagger",
                "threshold" : 0.5
            }
        },
        "Desperation 1" : {
            "description" : "If unit initiates combat with HP ≤ 25%, any follow-up attack occurs immediately.",
            "desperation" : {
                "threshold" : 0.25
            }
        },
        "Desperation 2" : {
            "description" : "If unit initiates combat with HP ≤ 50%, any follow-up attack occurs immediately.",
            "desperation" : {
                "threshold" : 0.5
            }
        },
        "Desperation 3" : {
            "description" : "If unit initiates combat with HP ≤ 75%, any follow-up attack occurs immediately.",
            "desperation" : {
                "threshold" : 0.75
            }
        },
        "Drag Back" : {
            "description" : "If unit initiates attack, unit moves 1 space away after combat. Foe moves into unit's previous space.",
			"range_unique" : 1
        },
        "Escape Route 1" : {
            "description" : "Enables unit with HP ≤ 30% to warp adjacent to any ally."
        },
        "Escape Route 2" : {
            "description" : "Enables unit with HP ≤ 40% to warp adjacent to any ally."
        },
        "Escape Route 3" : {
            "description" : "Enables unit with HP ≤ 50% to warp adjacent to any ally."
        },
        "G Tomebreaker 1" : {
            "description" : "If unit's HP ≥ 90% in combat against a Green Tome user, unit makes a follow-up attack and foe cannot.",
            "breaker" : {
                "weapon_type" : "Green Tome",
                "threshold" : 0.9
            },
            "color_restrict" : "Blue"
        },
        "G Tomebreaker 2" : {
            "description" : "If unit's HP ≥ 70% in combat against a Blue Tome user, unit makes a follow-up attack and foe cannot.",
            "breaker" : {
                "weapon_type" : "Green Tome",
                "threshold" : 0.7
            },
            "color_restrict" : "Blue"
        },
        "G Tomebreaker 3" : {
            "description" : "If unit's HP ≥ 50% in combat against a Blue Tome user, unit makes a follow-up attack and foe cannot.",
            "breaker" : {
                "weapon_type" : "Green Tome",
                "threshold" : 0.5
            },
            "color_restrict" : "Blue"
        },
        "Knock Back" : {
            "description" : "If unit initiates attack, foe is moved 1 space away after combat.",
            "range_unique" : 1
        },
        "Lancebreaker 1" : {
            "description" : "If unit's HP ≥ 90% in combat against a Lance user, unit makes a follow-up attack and foe cannot.",
            "breaker" : {
                "weapon_type" : "Lance",
                "threshold" : 0.9
            },
            "color_restrict" : "Red"
        },
        "Lancebreaker 2" : {
            "description" : "If unit's HP ≥ 70% in combat against a Lance user, unit makes a follow-up attack and foe cannot.",
            "breaker" : {
                "weapon_type" : "Lance",
                "threshold" : 0.7
            },
            "color_restrict" : "Red"
        },
        "Lancebreaker 3" : {
            "description" : "If unit's HP ≥ 50% in combat against a Lance user, unit makes a follow-up attack and foe cannot.",
            "breaker" : {
                "weapon_type" : "Lance",
                "threshold" : 0.5
            },
            "color_restrict" : "Red"
        },
        "Live to Serve 1" : {
            "description" : "When healing allies with a staff, unit also recovers 50% of the HP restored.",
            "weapon_unique" : "Staff"
        },
        "Live to Serve 2" : {
            "description" : "When healing allies with a staff, unit also recovers 75% of the HP restored.",
            "weapon_unique" : "Staff"
        },
        "Live to Serve 3" : {
            "description" : "When healing allies with a staff, unit also recovers the same amount.",
            "weapon_unique" : "Staff"
        },
        "Lunge" : {
            "description" : "If unit initiates attack, after combat, unit and foe swap places.",
            "range_unique" : 1
        },
        "Obstruct 1" : {
            "description" : "Prevents foes from moving through adjacent spaces while this unit's HP ≥ 90%."
        },
        "Obstruct 2" : {
            "description" : "Prevents foes from moving through adjacent spaces while this unit's HP ≥ 70%."
        },
        "Obstruct 3" : {
            "description" : "Prevents foes from moving through adjacent spaces while this unit's HP ≥ 50%."
        },
        "Pass 1" : {
            "description" : "Unit can pass through foes if their own HP ≥ 75%."
        },
        "Pass 2" : {
            "description" : "Unit can pass through foes if their own HP ≥ 50%."
        },
        "Pass 3" : {
            "description" : "Unit can pass through foes if their own HP ≥ 25%."
        },
        "Poison Strike 1" : {
            "description" : "Inflicts 4 damage to foe after any combat this unit initiates.",
            "poison" : 4,
            "weapon_restrict" : "Staff"
        },
        "Poison Strike 2" : {
            "description" : "Inflicts 7 damage to foe after any combat this unit initiates.",
            "poison" : 7,
            "weapon_restrict" : "Staff"
        },
        "Poison Strike 3" : {
            "description" : "Inflicts 10 damage to foe after any combat this unit initiates.",
            "poison" : 10,
            "weapon_restrict" : "Staff"
        },
        "Quick Riposte 1" : {
            "description" : "Unit automatically makes a follow-up attack if attacked at HP ≥ 90%.",
            "riposte" : {
                "threshold" : 0.9
            }
        },
        "Quick Riposte 2" : {
            "description" : "Unit automatically makes a follow-up attack if attacked at HP ≥ 80%.",
            "riposte" : {
                "threshold" : 0.8
            }
        },
        "Quick Riposte 3" : {
            "description" : "Unit automatically makes a follow-up attack if attacked at HP ≥ 70%.",
            "riposte" : {
                "threshold" : 0.7
            }
        },
        "R Tomebreaker 1" : {
            "description" : "If unit's HP ≥ 90% in combat against a Red Tome user, unit makes a follow-up attack and foe cannot.",
            "breaker" : {
                "weapon_type" : "Red Tome",
                "threshold" : 0.9
            },
            "color_restrict" : "Green"
        },
        "R Tomebreaker 2" : {
            "description" : "If unit's HP ≥ 70% in combat against a Red Tome user, unit makes a follow-up attack and foe cannot.",
            "breaker" : {
                "weapon_type" : "Red Tome",
                "threshold" : 0.7
            },
            "color_restrict" : "Green"
        },
        "R Tomebreaker 3" : {
            "description" : "If unit's HP ≥ 50% in combat against a Red Tome user, unit makes a follow-up attack and foe cannot.",
            "breaker" : {
                "weapon_type" : "Red Tome",
                "threshold" : 0.5
            },
            "color_restrict" : "Green"
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
            "description" : "After combat, foe suffers Atk-3 through their next actions.",
            "seal" : {
                "atk" : -3
            }
        },
        "Seal Atk 2" : {
            "description" : "After combat, foe suffers Atk-5 through their next actions.",
            "seal" : {
                "atk" : -5
            }
        },
        "Seal Atk 3" : {
            "description" : "After combat, foe suffers Atk-7 through their next actions.",
            "seal" : {
                "atk" : -7
            }
        },
        "Seal Def 1" : {
            "description" : "After combat, foe suffers Def-3 through their next actions.",
            "seal" : {
                "def" : -3
            }
        },
        "Seal Def 2" : {
            "description" : "After combat, foe suffers Def-5 through their next actions.",
            "seal" : {
                "def" : -5
            }

        },
        "Seal Def 3" : {
            "description" : "After combat, foe suffers Def-7 through their next actions.",
            "seal" : {
                "def" : -7
            }
        },
        "Seal Res 1" : {
            "description" : "After combat, foe suffers Res-3 through their next actions.",
            "seal" : {
                "res" : -3
            }
        },
        "Seal Res 2" : {
            "description" : "After combat, foe suffers Res-5 through their next actions.",
            "seal" : {
                "res" : -5
            }
        },
        "Seal Res 3" : {
            "description" : "After combat, foe suffers Res-7 through their next actions.",
            "seal" : {
                "res" : -7
            }
        },
        "Seal Spd 1" : {
            "description" : "After combat, foe suffers Spd-3 through their next actions.",
            "seal" : {
                "spd" : -3
            }
        },
        "Seal Spd 2" : {
            "description" : "After combat, foe suffers Spd-5 through their next actions.",
            "seal" : {
                "spd" : -5
            }
        },
        "Seal Spd 3" : {
            "description" : "After combat, foe suffers Spd-7 through their next actions.",
            "seal" : {
                "spd" : -7
            }
        },
        "Swordbreaker 1" : {
            "description" : "If unit's HP ≥ 90% in combat against a Sword user, unit makes a follow-up attack and foe cannot.",
            "breaker" : {
                "weapon_type" : "Sword",
                "threshold" : 0.9
            },
            "color_restrict" : "Green"
        },
        "Swordbreaker 2" : {
            "description" : "If unit's HP ≥ 70% in combat against a Sword user, unit makes a follow-up attack and foe cannot.",
            "breaker" : {
                "weapon_type" : "Sword",
                "threshold" : 0.7
            },
            "color_restrict" : "Green"
        },
        "Swordbreaker 3" : {
            "description" : "If unit's HP ≥ 50% in combat against a Sword user, unit makes a follow-up attack and foe cannot.",
            "breaker" : {
                "weapon_type" : "Sword",
                "threshold" : 0.5
            },
            "color_restrict" : "Green"
        },
        "Vantage 1" : {
            "description" : "Unit counter-attacks first when attacked at HP ≤ 25%.",
            "vantage" : {
                "threshold" : 0.25
            }
        },
        "Vantage 2" : {
            "description" : "Unit counter-attacks first when attacked at HP ≤ 50%.",
            "vantage" : {
                "threshold" : 0.5
            }
        },
        "Vantage 3" : {
            "description" : "Unit counter-attacks first when attacked at HP ≤ 75%.",
            "vantage" : {
                "threshold" : 0.75
            }
        },
        "Wary Fighter 1" : {
            "description" : "Prevents follow up attack in combat from unit and foe if unit's HP ≤ 90%.",
            "wary" : {
                "threshold" : 0.9
            },
            "move_unique" : "Armored"
        },
        "Wary Fighter 2" : {
            "description" : "Prevents follow up attack in combat from unit and foe if unit's HP ≤ 70%.",
            "wary" : {
                "threshold" : 0.7
            },
            "move_unique" : "Armored"
        },
        "Wary Fighter 3" : {
            "description" : "Prevents follow up attack in combat from unit and foe if unit's HP ≤ 50%.",
            "wary" : {
                "threshold" : 0.5
            },
            "move_unique" : "Armored"
        },
        "Wings of Mercy 1" : {
            "description" : "Enables unit to warp adjacent to any ally with HP ≤ 30%."
        },
        "Wings of Mercy 2" : {
            "description" : "Enables unit to warp adjacent to any ally with HP ≤ 40%."
        },
        "Wings of Mercy 3" : {
            "description" : "Enables unit to warp adjacent to any ally with HP ≤ 50%."
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
        "Fortify Armor" : {
            "description" : "Grants adjacent armored allies Def/Res+6 through their next actions at the start of each turn.",
            "move_unique" : "Armored"
        },
        "Fortify Cavalry" : {
            "description" : "Grants adjacent cavalry allies Def/Res+6 through their next actions at the start of each turn.",
            "move_unique" : "Cavalry"
        },
        "Fortify Def 1" : {
            "description" : "Grants adjacent allies Def+2 through their next actions at the start of each turn."
        },
        "Fortify Def 2" : {
            "description" : "Grants adjacent allies Def+3 through their next actions at the start of each turn."
        },
        "Fortify Def 3" : {
            "description" : "Grants adjacent allies Def+4 through their next actions at the start of each turn."
        },
        "Fortify Dragons" : {
            "description" : "Grants adjacent dragon allies Def/Res+6 through their next actions at the start of each turn.",
            "dragon_unique" : true
        },
        "Fortify Fliers" : {
            "description" : "Grants adjacent flying allies Def/Res+6 through their next actions at the start of each turn.",
            "move_unique" : "Flying"
        },
        "Fortify Res 1" : {
            "description" : "Grants adjacent allies Res+2 through their next actions at the start of each turn."
        },
        "Fortify Res 2" : {
            "description" : "Grants adjacent allies Res+3 through their next actions at the start of each turn."
        },
        "Fortify Res 3" : {
            "description" : "Grants adjacent allies Res+4 through their next actions at the start of each turn."
        },
        "Goad Armor" : {
            "description" : "Grants armored allies within 2 spaces Atk/Spd+4 during combat.",
            "move_unique" : "Armored"
        },
        "Goad Cavalry" : {
            "description" : "Grants cavalry allies within 2 spaces Atk/Spd+4 during combat.",
            "move_unique" : "Cavalry"
        },
        "Goad Fliers" : {
            "description" : "Grants flying allies within 2 spaces Atk/Spd+4 during combat.",
            "move_unique" : "Flying"
        },
        "Hone Armor" : {
            "description" : "Grants adjacent armored allies Atk/Spd+6 through their next actions at the start of each turn.",
            "move_unique" : "Armored"
        },
        "Hone Atk 1" : {
            "description" : "Grants adjacent allies Atk+2 through their next actions at the start of each turn."
        },
        "Hone Atk 2" : {
            "description" : "Grants adjacent allies Atk+3 through their next actions at the start of each turn."
        },
        "Hone Atk 3" : {
            "description" : "Grants adjacent allies Atk+4 through their next actions at the start of each turn."
        },
        "Hone Cavalry" : {
            "description" : "Grants adjacent cavalry allies Atk/Spd+6 through their next actions at the start of each turn.",
            "move_unique" : "Cavalry"
        },
        "Hone Fliers" : {
            "description" : "Grants adjacent flying allies Atk/Spd+6 through their next actions at the start of each turn.",
            "move_unique" : "Flying"
        },
        "Hone Spd 1" : {
            "description" : "Grants adjacent allies Spd+2 through their next actions at the start of each turn."
        },
        "Hone Spd 2" : {
            "description" : "Grants adjacent allies Spd+3 through their next actions at the start of each turn."
        },
        "Hone Spd 3" : {
            "description" : "Grants adjacent allies Spd+4 through their next actions at the start of each turn."
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
            "description" : "Grants adjacent allies Atk+2 during combat."
        },
        "Spur Atk 2" : {
            "description" : "Grants adjacent allies Atk+3 during combat."
        },
        "Spur Atk 3" : {
            "description" : "Grants adjacent allies Atk+4 during combat."
        },
        "Spur Def 1" : {
            "description" : "Grants adjacent allies Def+2 during combat."
        },
        "Spur Def 2" : {
            "description" : "Grants adjacent allies Def+3 during combat."
        },
        "Spur Def 3" : {
            "description" : "Grants adjacent allies Def+4 during combat."
        },
        "Spur Res 1" : {
            "description" : "Grants adjacent allies Res+2 during combat."
        },
        "Spur Res 2" : {
            "description" : "Grants adjacent allies Res+3 during combat."
        },
        "Spur Res 3" : {
            "description" : "Grants adjacent allies Res+4 during combat."
        },
        "Spur Spd 1" : {
            "description" : "Grants adjacent allies Spd+2 during combat."
        },
        "Spur Spd 2" : {
            "description" : "Grants adjacent allies Spd+3 during combat."
        },
        "Spur Spd 3" : {
            "description" : "Grants adjacent allies Spd+4 during combat."
        },
        "Threaten Atk 1" : {
            "description" : "Inflicts Atk-3 on foes within 2 spaces through their next actions at the start of each turn.",
            "threaten" : {
                "atk" : -3
            }
        },
        "Threaten Atk 2" : {
            "description" : "Inflicts Atk-4 on foes within 2 spaces through their next actions at the start of each turn.",
            "threaten" : {
                "atk" : -4
            }
        },
        "Threaten Atk 3" : {
            "description" : "Inflicts Atk-5 on foes within 2 spaces through their next actions at the start of each turn.",
            "threaten" : {
                "atk" : -5
            }
        },
        "Threaten Def 1" : {
            "description" : "Inflicts Def-3 on foes within 2 spaces through their next actions at the start of each turn.",
            "threaten" : {
                "def" : -3
            }
        },
        "Threaten Def 2" : {
            "description" : "Inflicts Def-4 on foes within 2 spaces through their next actions at the start of each turn.",
            "threaten" : {
                "def" : -4
            }
        },
        "Threaten Def 3" : {
            "description" : "Inflicts Def-5 on foes within 2 spaces through their next actions at the start of each turn.",
            "threaten" : {
                "def" : -5
            }
        },
        "Threaten Res 1" : {
            "description" : "Inflicts Res-3 on foes within 2 spaces through their next actions at the start of each turn.",
            "threaten" : {
                "res" : -3
            }
        },
        "Threaten Res 2" : {
            "description" : "Inflicts Res-4 on foes within 2 spaces through their next actions at the start of each turn.",
            "threaten" : {
                "res" : -4
            }
        },
        "Threaten Res 3" : {
            "description" : "Inflicts Res-5 on foes within 2 spaces through their next actions at the start of each turn.",
            "threaten" : {
                "res" : -5
            }
        },
        "Threaten Spd 1" : {
            "description" : "Inflicts Spd-3 on foes within 2 spaces through their next actions at the start of each turn.",
            "threaten" : {
                "spd" : -3
            }
        },
        "Threaten Spd 2" : {
            "description" : "Inflicts Spd-4 on foes within 2 spaces through their next actions at the start of each turn.",
            "threaten" : {
                "res" : -4
            }
        },
        "Threaten Spd 3" : {
            "description" : "Inflicts Spd-5 on foes within 2 spaces through their next actions at the start of each turn.",
            "threaten" : {
                "res" : -5
            }
        },
        "Ward Armor" : {
            "description" : "Grants armored allies within 2 spaces Def/Res+4 during combat.",
            "move_unique" : "Armored"
        },
        "Ward Cavalry" : {
            "description" : "Grants cavalry allies within 2 spaces Def/Res+4 during combat.",
            "move_unique" : "Cavalry"
        },
        "Ward Fliers" : {
            "description" : "Grants flying allies within 2 spaces Def/Res+4 during combat.",
            "move_unique" : "Flying"
        }
    }
};
