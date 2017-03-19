// special data
var specInfo =
{
    "Aegis" : {
        "description" : "Reduces damage inflicted by attacks from foes 2 spaces away by 50%.",
        "cooldown" : 3,
        "reduce_dmg" : {
            "range" : 2,
            "dmg_mod" : 0.5
        },
        "range_unique" : 1
    },
    "Aether" : {
        "description" : "Resolve combat as if foe suffered Def/Res-50%. Recover 50% of damage dealt.",
        "cooldown" : 5,
        "heal_dmg" : 0.5,
        "enemy_def_res_mod" : 0.5,
        "weapon_restrict" : "Staff"
    },
    "Astra" : {
        "description" : "Grants +150% to damage dealt.",
        "cooldown" : 5,
        "dmg_mod" : 1.5,
        "weapon_restrict" : "Staff"
    },
    "Blazing Flame" : {
        "description" : "Before initiating combat, foes in an area near target take damage equal to 1.5 × (unit's Atk minus foe's Def or Res).",
        "cooldown" : 5,
        "before_combat_aoe" : true,
        "aoe_dmg_mod" : 1.5,
        "weapon_restrict" : "Staff"
    },
    "Blazing Light" : {
        "description" : "Before initiating combat, foes in an area near target take damage equal to 1.5 × (unit's Atk minus foe's Def or Res).",
        "cooldown" : 5,
        "before_combat_aoe" : true,
        "aoe_dmg_mod" : 1.5,
        "weapon_restrict" : "Staff"
    },
    "Blazing Thunder" : {
        "description" : "Before initiating combat, foes in an area near target take damage equal to 1.5 × (unit's Atk minus foe's Def or Res).",
        "cooldown" : 5,
        "before_combat_aoe" : true,
        "aoe_dmg_mod" : 1.5,
        "weapon_restrict" : "Staff"
    },
    "Blazing Wind" : {
        "description" : "Before initiating combat, foes in an area near target take damage equal to 1.5 × (unit's Atk minus foe's Def or Res).",
        "cooldown" : 5,
        "before_combat_aoe" : true,
        "aoe_dmg_mod" : 1.5,
        "weapon_restrict" : "Staff"
    },
    "Bonfire" : {
        "description" : "Boosts damage dealt by 50% of unit's Def.",
        "cooldown" : 3,
        "dmg_buff_by_stat" : {
            "stat" : "def",
            "buff" : 0.5
        },
        "weapon_restrict" : "Staff"
    },
    "Buckler" : {
        "description" : "Reduces damage inflicted by attacks from adjacent foes by 30%.",
        "cooldown" : 3,
        "reduce_dmg" : {
            "range" : 1,
            "dmg_mod" : 0.3
        },
        "range_unique" : 1
    },
    "Chilling Wind" : {
        "description" : "Boosts damage dealt by 50% of unit's Res.",
        "cooldown" : 4,
        "dmg_buff_by_stat" : {
            "stat" : "res",
            "buff" : 0.5
        },
        "weapon_restrict" : "Staff"
    },
    "Daylight" : {
        "description" : "Heal 30% of damage dealt.",
        "cooldown" : 4,
        "heal_dmg" : 0.3,
        "weapon_restrict" : "Staff"
    },
    "Draconic Aura" : {
        "description" : "Boosts damage dealt by 30% of unit's Atk.",
        "cooldown" : 3,
		"dmg_buff_by_stat" : {
            "stat" : "atk",
            "buff" : 0.3
        },
        "weapon_restrict" : "Staff"
    },
    "Dragon Fang" : {
        "description" : "Boosts damage dealt by 50% of unit's Atk.",
        "cooldown" : 4,
		"dmg_buff_by_stat" : {
            "stat" : "atk",
            "buff" : 0.5
        },
        "weapon_restrict" : "Staff"
    },
    "Dragon Gaze" : {
        "description" : "Boosts damage dealt by 30% of unit's Atk.",
        "cooldown" : 4,
		"dmg_buff_by_stat" : {
            "stat" : "atk",
            "buff" : 0.3
        },
        "weapon_restrict" : "Staff"
    },
    "Escutcheon" : {
        "description" : "Reduces damage inflicted by attacks from adjacent foes by 30%.",
        "cooldown" : 2,
        "reduce_dmg" : {
            "range" : 1,
            "dmg_mod" : 0.3
        },
        "range_unique" : 1
    },
    "Galeforce" : {
        "description" : "If this unit initiates an attack, it can take another action after combat.",
        "cooldown" : 5,
        "weapon_restrict" : "Staff"
    },
    "Glacies" : {
        "description" : "Boosts damage dealt by 80% of unit's Res.",
        "cooldown" : 4,
        "dmg_buff_by_stat" : {
            "stat" : "res",
            "buff" : 0.8
        },
        "weapon_restrict" : "Staff"
    },
    "Glimmer" : {
        "description" : "Grants +50% to damage dealt.",
        "cooldown" : 3,
        "dmg_mod" : 0.5,
        "weapon_restrict" : "Staff"
    },
    "Glowing Ember" : {
        "description" : "Boosts damage dealt by 50% of unit's Def.",
        "cooldown" : 4,
        "dmg_buff_by_stat" : {
            "stat" : "def",
            "buff" : 0.5
        },
        "weapon_restrict" : "Staff"
    },
    "Growing Flame" : {
        "description" : "Before initiating combat, foes in a wide area near target take damage equal to unit's Atk minus foe's Def or Res.",
        "cooldown" : 5,
        "before_combat_aoe" : true,
        "weapon_restrict" : "Staff"
    },
    "Growing Light" : {
        "description" : "Before initiating combat, foes in a wide area near target take damage equal to unit's Atk minus foe's Def or Res.",
        "cooldown" : 5,
        "before_combat_aoe" : true,
        "weapon_restrict" : "Staff"
    },
	"Growing Thunder" : {
	    "description" : "Before initiating combat, foes in a wide area near target take damage equal to unit's Atk minus foe's Def or Res.",
        "cooldown" : 5,
        "before_combat_aoe" : true,
        "weapon_restrict" : "Staff"
    },
    "Growing Wind" : {
        "description" : "Before initiating combat, foes in a wide area near target take damage equal to unit's Atk minus foe's Def or Res.",
        "cooldown" : 5,
        "before_combat_aoe" : true,
        "weapon_restrict" : "Staff"
    },
    "Heavenly Light" : {
        "description" : "When healing an ally with a staff, heal every ally's HP by 10.",
        "cooldown" : 2,
        "weapon_unique" : "Staff"
    },
    "Holy Vestments" : {
        "description" : "Reduces damage inflicted by attacks from foes 2 spaces away by 30%.",
        "cooldown" : 3,
        "reduce_dmg" : {
            "range" : 2,
            "dmg_mod" : 0.3
        },
        "range_unique" : 1
    },
    "Iceberg" : {
        "description" : "Boosts damage dealt by 50% of unit's Res.",
        "cooldown" : 3,
        "dmg_buff_by_stat" : {
            "stat" : "res",
            "buff" : 0.5
        },
        "weapon_restrict" : "Staff"
    },
    "Ignis" : {
        "description" : "Boosts damage dealt by 80% of unit's Def.",
        "cooldown" : 4,
        "dmg_buff_by_stat" : {
            "stat" : "def",
            "buff" : 0.8
        },
        "weapon_restrict" : "Staff"
    },
    "Imbue" : {
        "description" : "When healing an ally with a staff, increase recovered HP by 10.",
        "cooldown" : 1,
        "weapon_unique" : "Staff"
    },
    "Kindled-Fire Balm" : {
        "description" : "When healing an ally with a staff, grants all allies Atk+4 for 1 turn.",
        "cooldown" : 1,
        "weapon_unique" : "Staff"
    },
    "Luna" : {
        "description" : "Resolve combat as if foe suffered Def/Res-50%.",
        "cooldown" : 3,
        "enemy_def_res_mod" : 0.5,
        "weapon_restrict" : "Staff"
    },
    "Miracle" : {
        "description" : "If HP > 1, survive a lethal attack with 1 HP remaining.",
        "cooldown" : 5,
        "survive" : true
    },
    "Moonbow" : {
        "description" : "Resolve combat as if foe suffered Def/Res-30%.",
        "cooldown" : 2,
        "enemy_def_res_mod" : 0.3,
        "weapon_restrict" : "Staff"
    },
    "New Moon" : {
        "description" : "Resolve combat as if foe suffered Def/Res-30%.",
        "cooldown" : 3,
        "enemy_def_res_mod" : 0.3,
        "weapon_restrict" : "Staff"
    },
    "Night Sky" : {
        "description" : "Grants +50% to damage dealt.",
        "cooldown" : 4,
        "dmg_mod" : 0.5,
        "weapon_restrict" : "Staff"
    },
    "Noontime" : {
        "description" : "Heal 30% of damage dealt.",
        "cooldown" : 3,
        "heal_dmg" : 0.3,
        "weapon_restrict" : "Staff"
    },
    "Pavise" : {
        "description" : "Reduces damage inflicted by attacks from adjacent foes by 50%.",
        "cooldown" : 3,
        "reduce_dmg" : {
            "range" : 1,
            "dmg_mod" : 0.5
        },
        "range_unique" : 1
    },
    "Reprisal" : {
        "description" : "Grants bonus to damage dealt equal to 30% of damage suffered.",
        "cooldown" : 2,
        "dmg_suffer_buff" : 0.3,
        "weapon_restrict" : "Staff"
    },
    "Retribution" : {
        "description" : "Grants bonus to damage dealt equal to 30% of damage suffered.",
        "cooldown" : 3,
        "dmg_suffer_buff" : 0.3,
        "weapon_restrict" : "Staff"
    },
    "Rising Flame" : {
        "description" : "Before initiating combat, foes in an area near target take damage equal to unit's Atk minus foe's Def or Res.",
        "cooldown" : 5,
        "before_combat_aoe" : true,
        "weapon_restrict" : "Staff"
    },
    "Rising Light" : {
        "description" : "Before initiating combat, foes in an area near target take damage equal to unit's Atk minus foe's Def or Res.",
        "cooldown" : 5,
        "before_combat_aoe" : true,
        "weapon_restrict" : "Staff"
    },
    "Rising Thunder" : {
        "description" : "Before initiating combat, foes in an area near target take damage equal to unit's Atk minus foe's Def or Res.",
        "cooldown" : 5,
        "before_combat_aoe" : true,
        "weapon_restrict" : "Staff"
    },
    "Rising Wind" : {
        "description" : "Before initiating combat, foes in an area near target take damage equal to unit's Atk minus foe's Def or Res.",
        "cooldown" : 5,
        "before_combat_aoe" : true,
        "weapon_restrict" : "Staff"
    },
    "Sacred Cowl" : {
        "description" : "Reduces damage inflicted by attacks from foes 2 spaces away by 30%.",
        "cooldown" : 2,
        "reduce_dmg" : {
            "range" : 2,
            "dmg_mod" : 0.3
        },
        "range_unique" : 1
    },
    "Sol" : {
        "description" : "Heal 50% of damage dealt.",
        "cooldown" : 4,
        "heal_dmg" : 0.5,
        "weapon_restrict" : "Staff"
    },
    "Solid-Earth Balm" : {
        "description" : "When healing an ally with a staff, grants all allies Def+4 for 1 turn.",
        "cooldown" : 1,
        "weapon_unique" : "Staff"
    },
    "Still-Water Balm" : {
        "description" : "When healing an ally with a staff, grants all allies Res+4 for 1 turn.",
        "cooldown" : 1,
        "weapon_unique" : "Staff"
    },
    "Swift-Winds Balm" : {
        "description" : "When healing an ally with a staff, grants all allies Spd+4 for 1 turn.",
        "cooldown" : 1,
        "weapon_unique" : "Staff"
    },
    "Vengeance" : {
        "description" : "Grants bonus to damage dealt equal to 50% of damage suffered.",
        "cooldown" : 3,
        "dmg_suffer_buff" : 0.5,
        "weapon_restrict" : "Staff"
    }
};
