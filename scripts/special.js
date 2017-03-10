// special data
var specInfo =
{
    "Aegis" : {
        "cooldown" : 3,
        "reduce_dmg" : {
            "range" : 2,
            "dmg_mod" : 0.5
        }
    },
    "Aether" : {
        "cooldown" : 5,
        "heal_dmg" : 0.5,
        "enemy_def_res_mod" : 0.5
    },
    "Astra" : {
        "cooldown" : 5,
        "dmg_mod" : 1.5
    },
    "Blazing Flame" : {
        "cooldown" : 5,
        "before_combat_aoe" : true,
        "aoe_dmg_mod" : 1.5
    },
    "Blazing Light" : {
        "cooldown" : 5,
        "before_combat_aoe" : true,
        "aoe_dmg_mod" : 1.5
    },
    "Blazing Thunder" : {
        "cooldown" : 5,
        "before_combat_aoe" : true,
        "aoe_dmg_mod" : 1.5
    },
    "Blazing Wind" : {
        "cooldown" : 5,
        "before_combat_aoe" : true,
        "aoe_dmg_mod" : 1.5
    },
    "Bonfire" : {
        "cooldown" : 3,
        "dmg_buff_by_stat" : {
            "stat" : "def",
            "buff" : 0.5
        }
    },
    "Buckler" : {
        "cooldown" : 3,
        "reduce_dmg" : {
            "range" : 1,
            "dmg_mod" : 0.3
        }
    },
    "Chilling Wind" : {
        "cooldown" : 4,
        "dmg_buff_by_stat" : {
            "stat" : "res",
            "buff" : 0.5
        }
    },
    "Daylight" : {
        "cooldown" : 4,
        "heal_dmg" : 0.3
    },
    "Draconic Aura" : {
        "cooldown" : 3,
		"dmg_buff_by_stat" : {
            "stat" : "atk",
            "buff" : 0.3
        }
    },
    "Dragon Fang" : {
        "cooldown" : 4,
		"dmg_buff_by_stat" : {
            "stat" : "atk",
            "buff" : 0.5
        }
    },
    "Dragon Gaze" : {
        "cooldown" : 4,
		"dmg_buff_by_stat" : {
            "stat" : "atk",
            "buff" : 0.3
        }
    },
    "Escutcheon" : {
        "cooldown" : 2,
        "reduce_dmg" : {
            "range" : 1,
            "dmg_mod" : 0.3
        }
    },
    "Galeforce" : {
        "cooldown" : 5,
        "non_combat" : true
    },
    "Glacies" : {
        "cooldown" : 4,
        "dmg_buff_by_stat" : {
            "stat" : "res",
            "buff" : 0.8
        }
    },
    "Glimmer" : {
        "cooldown" : 3,
        "dmg_mod" : 0.5
    },
    "Glowing Ember" : {
        "cooldown" : 4,
        "dmg_buff_by_stat" : {
            "stat" : "def",
            "buff" : 0.5
        }
    },
    "Growing Flame" : {
        "cooldown" : 5,
        "before_combat_aoe" : true
    },
    "Growing Light" : {
        "cooldown" : 5,
        "before_combat_aoe" : true
    },
	"Growing Thunder" : {
        "cooldown" : 5,
        "before_combat_aoe" : true
    },
    "Growing Wind" : {
        "cooldown" : 5,
        "before_combat_aoe" : true
    },
    "Heavenly Light" : {
        "cooldown" : 2,
        "non_combat": true
    },
    "Holy Vestments" : {
        "cooldown" : 3,
        "reduce_dmg" : {
            "range" : 2,
            "dmg_mod" : 0.3
        }
    },
    "Iceberg" : {
        "cooldown" : 3,
        "dmg_buff_by_stat" : {
            "stat" : "res",
            "buff" : 0.5
        }
    },
    "Ignis" : {
        "cooldown" : 4,
        "dmg_buff_by_stat" : {
            "stat" : "def",
            "buff" : 0.8
        }
    },
    "Imbue" : {
        "cooldown" : 1,
        "non_combat" : true
    },
    "Kindled-Fire Balm" : {
        "cooldown" : 1,
        "non_combat" : true
    },
    "Luna" : {
        "cooldown" : 4,
        "enemy_def_res_mod" : 0.5
    },
    "Miracle" : {
        "cooldown" : 5,
        "survive" : true
    },
    "Moonbow" : {
        "cooldown" : 2,
        "enemy_def_res_mod" : 0.3
    },
    "New Moon" : {
        "cooldown" : 3,
        "enemy_def_res_mod" : 0.3
    },
    "Night Sky" : {
        "cooldown" : 4,
        "dmg_mod" : 0.5
    },
    "Noontime" : {
        "cooldown" : 3,
        "heal_dmg" : 0.3
    },
    "Pavise" : {
        "cooldown" : 3,
        "reduce_dmg" : {
            "range" : 1,
            "dmg_mod" : 0.5
        }
    },
    "Reprisal" : {
        "cooldown" : 2,
        "dmg_suffer_buff" : 0.3
    },
    "Retribution" : {
        "cooldown" : 3,
        "dmg_suffer_buff" : 0.3
    },
    "Rising Flame" : {
        "cooldown" : 5,
        "before_combat_aoe" : true
    },
    "Rising Light" : {
        "cooldown" : 5,
        "before_combat_aoe" : true
    },
    "Rising Thunder" : {
        "cooldown" : 5,
        "before_combat_aoe" : true
    },
    "Rising Wind" : {
        "cooldown" : 5,
        "before_combat_aoe" : true
    },
    "Sacred Cowl" : {
        "cooldown" : 2,
        "reduce_dmg" : {
            "range" : 2,
            "dmg_mod" : 0.3
        }
    },
    "Sol" : {
        "cooldown" : 4,
        "heal_dmg" : 0.5
    },
    "Solid-Earth Balm" : {
        "cooldown" : 1,
        "non_combat" : true
    },
    "Still-Water Balm" : {
        "cooldown" : 1,
        "non_combat" : true
    },
    "Swift-Winds Balm" : {
        "cooldown" : 1,
        "non_combat" : true
    },
    "Vengeance" : {
        "cooldown" : 3,
        "dmg_suffer_buff" : 0.5
    }
};
