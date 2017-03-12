// weapon data
var weaponInfo =
{
	"Absorb" : {
		"color"   : "Colorless",
		"type"    : "Staff",
		"might"   : 4,
		"range"   : 2,
		"magical" : true,
		"heal_dmg" : 0.5,
		"description" : "Recover 50% of damage dealt."
	},
	"Armads" : {
		"color"   : "Green",
		"type"    : "Axe",
		"might"   : 16,
		"range"   : 1,
		"magical" : false,
		"description" : "Unit makes a guaranteed follow-up attack when attacked at HP ≥ 80%.",
		"riposte" : {
			"threshold" : 0.8
		}
	},
	"Armorslayer" : {
		"color"   : "Red",
		"type"    : "Sword",
		"might"   : 8,
		"range"   : 1,
		"magical" : false,
		"description" : "Effective against armored units.",
		"move_effective" : "Armored"
	},
	"Armorslayer+" : {
		"color"   : "Red",
		"type"    : "Sword",
		"might"   : 12,
		"range"   : 1,
		"magical" : false,
		"description" : "Effective against armored units.",
		"move_effective" : "Armored"
	},
	"Assassin's Bow" : {
		"color"   : "Colorless",
		"type"    : "Bow",
		"might"   : 7,
		"range"   : 2,
		"magical" : false,
		"move_effective" : "Flying",
		"description" : "Effective against flying units. If target has a dagger, it cannot make a follow-up attack and this unit will.",
		"breaker" : {
            "weapon_type" : "Dagger"
        }
	},
	"Assassin's Bow+" : {
		"color"   : "Colorless",
		"type"    : "Bow",
		"might"   : 11,
		"range"   : 2,
		"magical" : false,
		"description" : "Effective against flying units. If target has a dagger, it cannot make a follow-up attack and this unit will.",
		"move_effective" : "Flying",
		"breaker" : {
            "weapon_type" : "Dagger"
        }
	},
	"Assault" : {
		"color"   : "Colorless",
		"type"    : "Staff",
		"might"   : 10,
		"range"   : 2,
		"magical" : true
	},
	"Aura" : {
		"color"   : "Blue",
		"type"    : "Blue Tome",
		"might"   : 14,
		"range"   : 2,
		"magical" : true,
		"description" : "Restores 5 HP to adjacent allies after any combat this unit initiates."
	},
	"Binding Blade" : {
		"color"   : "Red",
		"type"    : "Sword",
		"might"   : 16,
		"range"   : 1,
		"magical" : false,
		"defend_mod" : {
			"def" : 2,
			"res" : 2
		},
		"description" : "Grants +2 DEF/RES when this unit is attacked."
	},
	"Blárblade" : {
		"color"   : "Blue",
		"type"    : "Blue Tome",
		"might"   : 9,
		"range"   : 2,
		"magical" : true,
		"description" : "Slows Special trigger (cooldown count+1). Adds total bonuses on unit to attack.",
		"spec_cooldown_mod" : 1,
		"add_bonus": true
	},
	"Blárblade+" : {
		"color"   : "Blue",
		"type"    : "Blue Tome",
		"might"   : 13,
		"range"   : 2,
		"magical" : true,
		"description" : "Slows Special trigger (cooldown count+1). Adds total bonuses on unit to attack.",
		"spec_cooldown_mod" : 1,
		"add_bonus" : true
	},
	"Blárraven" : {
		"color"   : "Blue",
		"type"    : "Blue Tome",
		"might"   : 7,
		"range"   : 2,
		"magical" : true,
		"description" : "Grants weapon advantage vs. colorless foes.",
		"color_effective" : "Colorless"
	},
	"Blárraven+" : {
		"color"   : "Blue",
		"type"    : "Blue Tome",
		"might"   : 11,
		"range"   : 2,
		"magical" : true,
		"description" : "Grants weapon advantage vs. colorless foes.",
		"color_effective" : "Colorless"
	},
	"Blárwolf" : {
		"color"   : "Blue",
		"type"    : "Blue Tome",
		"might"   : 6,
		"range"   : 2,
		"magical" : true,
		"description" : "Effective against cavalry units.",
		"move_effective" : "Cavalry"
	},
	"Blárwolf+" : {
		"color"   : "Blue",
		"type"    : "Blue Tome",
		"might"   : 10,
		"range"   : 2,
		"magical" : true,
		"description" : "Effective against cavalry units.",
		"move_effective" : "Cavalry"
	},
	"Bolganone" : {
		"color"   : "Red",
		"type"    : "Red Tome",
		"might"   : 9,
		"range"   : 2,
		"magical" : true
	},
	"Bolganone+" : {
		"color"   : "Red",
		"type"    : "Red Tome",
		"might"   : 13,
		"range"   : 2,
		"magical" : true
	},
	"Brave Axe" : {
		"color"   : "Green",
		"type"    : "Axe",
		"might"   : 5,
		"range"   : 1,
		"magical" : false,
		"description" : "SPD-5. Attack twice when initiating combat.",
		"brave"   : true,
		"stat_mod" : {
			"spd" : -5
		}
	},
	"Brave Axe+" : {
		"color"   : "Green",
		"type"    : "Axe",
		"might"   : 8,
		"range"   : 1,
		"magical" : false,
		"description" : "SPD-5. Attack twice when initiating combat.",
		"brave"   : true,
		"stat_mod" : {
			"spd" : -5
		}
	},
	"Brave Bow" : {
		"color"   : "Colorless",
		"type"    : "Bow",
		"might"   : 4,
		"range"   : 2,
		"magical" : false,
		"description" : "SPD-5. Effective against flying units. Attack twice when initiating combat.",
		"brave"   : true,
		"move_effective" : "Flying",
		"stat_mod" : {
			"spd" : -5
		}
	},
	"Brave Bow+" : {
		"color"   : "Colorless",
		"type"    : "Bow",
		"might"   : 7,
		"range"   : 2,
		"magical" : false,
		"description" : "SPD-5. Effective against flying units. Attack twice when initiating combat.",
		"brave"   : true,
		"move_effective" : "Flying",
		"stat_mod" : {
			"spd" : -5
		}
	},
	"Brave Lance" : {
		"color"   : "Blue",
		"type"    : "Lance",
		"might"   : 5,
		"range"   : 1,
		"magical" : false,
		"description" : "SPD-5. Attack twice when initiating combat.",
		"brave"   : true,
		"stat_mod" : {
			"spd" : -5
		}
	},
	"Brave Lance+" : {
		"color"   : "Blue",
		"type"    : "Lance",
		"might"   : 8,
		"range"   : 1,
		"magical" : false,
		"description" : "SPD-5. Attack twice when initiating combat.",
		"brave"   : true,
		"stat_mod" : {
			"spd" : -5
		}
	},
	"Brave Sword" : {
		"color"   : "Red",
		"type"    : "Sword",
		"might"   : 5,
		"range"   : 1,
		"magical" : false,
		"description" : "SPD-5. Attack twice when initiating combat.",
		"brave"   : true,
		"stat_mod" : {
			"spd" : -5
		}
	},
	"Brave Sword+" : {
		"color"   : "Red",
		"type"    : "Sword",
		"might"   : 8,
		"range"   : 1,
		"magical" : false,
		"description" : "SPD-5. Attack twice when initiating combat.",
		"brave"   : true,
		"stat_mod" : {
			"spd" : -5
		}
	},
	"Brynhildr" : {
		"color"   : "Red",
		"type"    : "Red Tome",
		"might"   : 14,
		"range"   : 2,
		"magical" : true,
		"description" : "If unit initiates attack, restrict foe from moving more than 1 space through their next actions."
	},
	"Cymbeline" : {
		"color" : "Red",
		"type" : "Red Tome",
		"might" : 14,
		"range" : 2,
		"magical" : true,
		"description" : "Grants adjacent allies ATK+4 through their next actions after any combat this unit initiates."
	},
	"Dark Breath" : {
		"color"   : "Blue",
		"type"    : "Blue Breath",
		"might"   : 9,
		"range"   : 1,
		"magical" : true,
		"description" : "After this unit attacks, foes within 2 spaces of target suffer ATK/SPD-5 through their next actions."
	},
	"Dark Breath+" : {
		"color"   : "Blue",
		"type"    : "Blue Breath",
		"might"   : 13,
		"range"   : 1,
		"magical" : true,
		"description" : "After this unit attacks, foes within 2 spaces of target suffer ATK/SPD-5 through their next actions."
	},
	"Dire Thunder" : {
		"color"   : "Blue",
		"type"    : "Blue Tome",
		"might"   : 9,
		"range"   : 2,
		"magical" : true,
		"description" : "SPD-5. Attack twice when initiating combat.",
		"brave"   : true,
		"stat_mod" : {
			"spd" : -5
		}
	},
	"Durandal" : {
		"color"   : "Red",
		"type"    : "Sword",
		"might"   : 16,
		"range"   : 1,
		"magical" : false,
		"description" : "Grants ATK+5 when unit initiates combat.",
		"initiate_mod" : {
			"atk" : 4
		}
	},
	"Elfire" : {
		"color"   : "Red",
		"type"    : "Red Tome",
		"might"   : 6,
		"range"   : 2,
		"magical" : true
	},
	"Elthunder" : {
		"color"   : "Blue",
		"type"    : "Blue Tome",
		"might"   : 6,
		"range"   : 2,
		"magical" : true
	},
	"Elwind" : {
		"color"   : "Green",
		"type"    : "Green Tome",
		"might"   : 6,
		"range"   : 2,
		"magical" : true
	},
	"Emerald Axe" : {
		"color"   : "Green",
		"type"    : "Axe",
		"might"   : 8,
		"range"   : 1,
		"magical" : false,
		"description" : "Gives ATK+20% if weapon triangle advantage, ATK-20% if disadvantage.",
		"tri_advantage" : true
	},
	"Emerald Axe+" : {
		"color"   : "Green",
		"type"    : "Axe",
		"might"   : 12,
		"range"   : 1,
		"magical" : false,
		"description" : "Gives ATK+20% if weapon triangle advantage, ATK-20% if disadvantage.",
		"tri_advantage" : true
	},
	"Excalibur" : {
		"color"   : "Green",
		"type"    : "Green Tome",
		"might"   : 14,
		"range"   : 2,
		"magical" : true,
		"description" : "Effective against flying units.",
		"move_effective": "Flying"
	},
	"Falchion" : {
		"color"   : "Red",
		"type"    : "Sword",
		"might"   : 16,
		"range"   : 1,
		"magical" : false,
		"description" : "Effective against dragons. At the start of every third turn, unit recovers 10 HP.",
		"dragon_effective" : true
	},
	"Fear" : {
		"color"   : "Colorless",
		"type"    : "Staff",
		"might"   : 5,
		"range"   : 2,
		"magical" : true,
		"description" : "After combat, inflicts ATK-6 on foe through their next actions.",
		"seal" : {
			"atk" : -6
		}
	},
	"Fenrir" : {
		"color"   : "Red",
		"type"    : "Red Tome",
		"might"   : 9,
		"range"   : 2,
		"magical" : true
	},
	"Fenrir+" : {
		"color"   : "Red",
		"type"    : "Red Tome",
		"might"   : 13,
		"range"   : 2,
		"magical" : true
	},
	"Fensalir" : {
		"color"   : "Blue",
		"type"    : "Lance",
		"might"   : 16,
		"range"   : 1,
		"magical" : false,
		"description" : "Inflicts ATK-4 on foes within 2 spaces through their next actions at the start of each turn.",
		"threaten" : {
			"atk" : -4
		}
	},
	"Fire" : {
		"color"   : "Red",
		"type"    : "Red Tome",
		"might"   : 4,
		"range"   : 2,
		"magical" : true
	},
	"Fire Breath (Red)" : {
		"color"   : "Red",
		"type"    : "Red Breath",
		"might"   : 6,
		"range"   : 1,
		"magical" : true
	},
	"Fire Breath (Green)" : {
		"color"   : "Green",
		"type"    : "Green Breath",
		"might"   : 6,
		"range"   : 1,
		"magical" : true
	},
	"Fire Breath (Blue)" : {
		"color"   : "Blue",
		"type"    : "Blue Breath",
		"might"   : 6,
		"range"   : 1,
		"magical" : true
	},
	"Fire Breath+ (Red)" : {
		"color"   : "Red",
		"type"    : "Red Breath",
		"might"   : 8,
		"range"   : 1,
		"magical" : true
	},
	"Fire Breath+ (Green)" : {
		"color"   : "Green",
		"type"    : "Green Breath",
		"might"   : 8,
		"range"   : 1,
		"magical" : true
	},
	"Fire Breath+ (Blue)" : {
		"color"   : "Blue",
		"type"    : "Blue Breath",
		"might"   : 8,
		"range"   : 1,
		"magical" : true
	},
	"Flametongue" : {
		"color"   : "Red",
		"type"    : "Red Breath",
		"might"   : 11,
		"range"   : 1,
		"magical" : true
	},
	"Flametongue+" : {
		"color"   : "Red",
		"type"    : "Red Breath",
		"might"   : 15,
		"range"   : 1,
		"magical" : true
	},
	"Flux" : {
		"color"   : "Red",
		"type"    : "Red Tome",
		"might"   : 4,
		"range"   : 2,
		"magical" : true
	},
	"Fujin Yumi" : {
		"color"   : "Colorless",
		"type"    : "Bow",
		"might"   : 14,
		"range"   : 2,
		"magical" : false,
		"description" : "Effective against flying units. Unit can pass through foes if own HP ≥ 50%.",
		"move_effective" : "Flying"
	},
	"Fólkvangr" : {
		"color"   : "Red",
		"type"    : "Sword",
		"might"   : 16,
		"range"   : 1,
		"magical" : false,
		"description" : "Grants ATK+5 at start of turn if HP ≤ 50%.",
		"defiant" : {
			"atk" : 5
		}
	},
	"Gravity" : {
		"color"   : "Colorless",
		"type"    : "Staff",
		"might"   : 6,
		"range"   : 2,
		"magical" : true,
		"description" : "After any combat, restrict foe from moving more than 1 space through their next actions."
	},
	"Gronnblade" : {
		"color"   : "Green",
		"type"    : "Green Tome",
		"might"   : 9,
		"range"   : 2,
		"magical" : true,
		"description" : "Slows Special trigger (cooldown count+1). Adds total bonuses on unit to attack.",
		"spec_cooldown_mod" : 1,
		"add_bonus" : true
	},
	"Gronnblade+" : {
		"color"   : "Green",
		"type"    : "Green Tome",
		"might"   : 13,
		"range"   : 2,
		"magical" : true,
		"description" : "Slows Special trigger (cooldown count+1). Adds total bonuses on unit to attack.",
		"spec_cooldown_mod" : 1,
		"add_bonus" : true
	},
	"Gronnraven" : {
		"color"   : "Green",
		"type"    : "Green Tome",
		"might"   : 7,
		"range"   : 2,
		"magical" : true,
		"description" : "Grants weapon advantage vs. colorless foes.",
		"color_effective" : "Colorless"
	},
	"Gronnraven+" : {
		"color"   : "Green",
		"type"    : "Green Tome",
		"might"   : 11,
		"range"   : 2,
		"magical" : true,
		"description" : "Grants weapon advantage vs. colorless foes.",
		"color_effective" : "Colorless"
	},
	"Gronnwolf" : {
		"color"   : "Green",
		"type"    : "Green Tome",
		"might"   : 6,
		"range"   : 2,
		"magical" : true,
		"description" : "Effective against cavalry units.",
		"move_effective" : "Cavalry"
	},
	"Gronnwolf+" : {
		"color"   : "Green",
		"type"    : "Green Tome",
		"might"   : 10,
		"range"   : 2,
		"magical" : true,
		"description" : "Effective against cavalry units.",
		"move_effective" : "Cavalry"
	},
	"Hammer" : {
		"color"   : "Green",
		"type"    : "Axe",
		"might"   : 8,
		"range"   : 1,
		"magical" : false,
		"description" : "Effective against armored units.",
		"move_effective" : "Armored"
	},
	"Hammer+" : {
		"color"   : "Green",
		"type"    : "Axe",
		"might"   : 12,
		"range"   : 1,
		"magical" : false,
		"description" : "Effective against armored units.",
		"move_effective" : "Armored"
	},
	"Hauteclere" : {
		"color"   : "Green",
		"type"    : "Axe",
		"might"   : 16,
		"range"   : 1,
		"magical" : false,
		"description" : "Accelerates Special trigger (cooldown count-1).",
		"spec_cooldown_mod" : -1
	},
	"Heavy Spear" : {
		"color"   : "Blue",
		"type"    : "Lance",
		"might"   : 8,
		"range"   : 1,
		"magical" : false,
		"description" : "Effective against armored units.",
		"move_effective" : "Armored"
	},
	"Heavy Spear+" : {
		"color"   : "Blue",
		"type"    : "Lance",
		"might"   : 12,
		"range"   : 1,
		"magical" : false,
		"description" : "Effective against armored units.",
		"move_effective" : "Armored"
	},
	"Iron Axe" : {
		"color"   : "Green",
		"type"    : "Axe",
		"might"   : 6,
		"range"   : 1,
		"magical" : false
	},
	"Iron Bow" : {
		"color"   : "Colorless",
		"type"    : "Bow",
		"might"   : 4,
		"range"   : 2,
		"magical" : false,
		"description" : "Effective against flying units.",
		"move_effective" : "Flying"
	},
	"Iron Dagger" : {
		"color"   : "Colorless",
		"type"    : "Dagger",
		"might"   : 3,
		"range"   : 2,
		"magical" : false,
		"description" : "After combat, inflict DEF/RES-3 on foe through their next actions.",
		"seal" : {
			"def" : -3,
			"res" : -3
		}
	},
	"Iron Lance" : {
		"color"   : "Blue",
		"type"    : "Lance",
		"might"   : 6,
		"range"   : 1,
		"magical" : false
	},
	"Iron Spear" : {
		"color"   : "Blue",
		"type"    : "Lance",
		"might"   : 6,
		"range"   : 1,
		"magical" : false
	},
	"Iron Sword" : {
		"color"   : "Red",
		"type"    : "Sword",
		"might"   : 6,
		"range"   : 1,
		"magical" : false
	},
	"Killer Axe" : {
		"color"   : "Green",
		"type"    : "Axe",
		"might"   : 7,
		"range"   : 1,
		"magical" : false,
		"description" : "Accelerates Special trigger (cooldown count-1).",
		"spec_cooldown_mod" : -1
	},
	"Killer Axe+" : {
		"color"   : "Green",
		"type"    : "Axe",
		"might"   : 11,
		"range"   : 1,
		"magical" : false,
		"description" : "Accelerates Special trigger (cooldown count-1).",
		"spec_cooldown_mod" : -1
	},
	"Killer Bow" : {
		"color"   : "Colorless",
		"type"    : "Bow",
		"might"   : 5,
		"range"   : 2,
		"magical" : false,
		"description" : "Effective against flying units. Accelerates Special trigger (cooldown count-1).",
		"spec_cooldown_mod" : -1,
		"move_effective" : "Flying"
	},
	"Killer Bow+" : {
		"color"   : "Colorless",
		"type"    : "Bow",
		"might"   : 9,
		"range"   : 2,
		"magical" : false,
		"description" : "Effective against flying units. Accelerates Special trigger (cooldown count-1).",
		"spec_cooldown_mod" : -1,
		"move_effective" : "Flying"
	},
	"Killer Lance" : {
		"color"   : "Blue",
		"type"    : "Lance",
		"might"   : 7,
		"range"   : 1,
		"magical" : false,
		"description" : "Accelerates Special trigger (cooldown count-1).",
		"spec_cooldown_mod" : -1
	},
	"Killer Lance+" : {
		"color"   : "Blue",
		"type"    : "Lance",
		"might"   : 11,
		"range"   : 1,
		"magical" : false,
		"description" : "Accelerates Special trigger (cooldown count-1).",
		"spec_cooldown_mod" : -1
	},
	"Killing Edge" : {
		"color"   : "Red",
		"type"    : "Sword",
		"might"   : 7,
		"range"   : 1,
		"magical" : false,
		"description" : "Accelerates Special trigger (cooldown count-1).",
		"spec_cooldown_mod" : -1
	},
	"Killing Edge+" : {
		"color"   : "Red",
		"type"    : "Sword",
		"might"   : 11,
		"range"   : 1,
		"magical" : false,
		"description" : "Accelerates Special trigger (cooldown count-1).",
		"spec_cooldown_mod" : -1
	},
	"Light Breath" : {
		"color"   : "Green",
		"type"    : "Green Breath",
		"might"   : 9,
		"range"   : 1,
		"magical" : true,
		"description" : "Grants adjacent allies DEF/RES+4 through their next actions after any combat this unit initiates."
	},
	"Light Breath+" : {
		"color"   : "Green",
		"type"    : "Green Breath",
		"might"   : 13,
		"range"   : 1,
		"magical" : true,
		"description" : "Grants adjacent allies DEF/RES+4 through their next actions after any combat this unit initiates."
	},
	"Lightning Breath (Blue)" : {
		"color"   : "Blue",
		"type"    : "Blue Breath",
		"might"   : 7,
		"range"   : 1,
		"magical" : true,
		"description" : "Enables counter-attacker regardless of attacker's range. Slows Special trigger (cooldown count+1).",
		"spec_cooldown_mod" : 1,
		"counter" : true
	},
	"Lightning Breath+ (Blue)" : {
		"color"   : "Blue",
		"type"    : "Blue Breath",
		"might"   : 11,
		"range"   : 1,
		"magical" : true,
		"description" : "Enables counter-attacker regardless of attacker's range. Slows Special trigger (cooldown count+1).",
		"spec_cooldown_mod" : 1,
		"counter" : true
	},
	"Lightning Breath (Green)" : {
		"color"   : "Green",
		"type"    : "Green Breath",
		"might"   : 7,
		"range"   : 1,
		"magical" : true,
		"description" : "Enables counter-attacker regardless of attacker's range. Slows Special trigger (cooldown count+1).",
		"spec_cooldown_mod" : 1,
		"counter" : true
	},
	"Lightning Breath+ (Green)" : {
		"color"   : "Green",
		"type"    : "Green Breath",
		"might"   : 11,
		"range"   : 1,
		"magical" : true,
		"description" : "Enables counter-attacker regardless of attacker's range. Slows Special trigger (cooldown count+1).",
		"spec_cooldown_mod" : 1,
		"counter" : true
	},
	"Lightning Breath (Red)" : {
		"color"   : "Red",
		"type"    : "Red Breath",
		"might"   : 7,
		"range"   : 1,
		"magical" : true,
		"description" : "Enables counter-attacker regardless of attacker's range. Slows Special trigger (cooldown count+1).",
		"spec_cooldown_mod" : 1,
		"counter" : true
	},
	"Lightning Breath+ (Red)" : {
		"color"   : "Red",
		"type"    : "Red Breath",
		"might"   : 11,
		"range"   : 1,
		"magical" : true,
		"description" : "Enables counter-attacker regardless of attacker's range. Slows Special trigger (cooldown count+1).",
		"spec_cooldown_mod" : 1,
		"counter" : true
	},
	"Mystletainn" : {
		"color" : "Red",
		"type" : "Sword",
		"might" : 16,
		"range" : 1,
		"magical" : false,
		"description" : "Accelerates Special trigger (cooldown count-1).",
		"spec_cooldown_mod" : -1
	},
	"Naga" : {
		"color"   : "Green",
		"type"    : "Green Tome",
		"might"   : 14,
		"range"   : 2,
		"magical" : true,
		"description" : "Effective against dragons. Grants DEF/RES+2 when this unit is attacked.",
		"dragon_effective" : true,
		"defend_mod" : {
			"def" : 2,
			"res" : 2
		}
	},
	"Nóatún" : {
		"color"   : "Green",
		"type"    : "Axe",
		"might"   : 16,
		"range"   : 1,
		"magical" : false,
		"description" : "Unit may move adjacent to any ally when HP ≤ 40%."
	},
	"Pain" : {
		"color"   : "Colorless",
		"type"    : "Staff",
		"might"   : 3,
		"range"   : 2,
		"magical" : true,
		"poison" : 10,
		"description" : "Inflicts 10 damage on foe after combat."
	},
	"Panic" : {
		"color"   : "Colorless",
		"type"    : "Staff",
		"might"   : 7,
		"range"   : 2,
		"magical" : true,
		"convert_penalties" : true,
		"description" : "After combat, bonuses on foe become penalties through their next action."
	},
	"Parthia" : {
		"color"   : "Colorless",
		"type"    : "Bow",
		"might"   : 14,
		"range"   : 2,
		"magical" : false,
		"description" : "Effective against flying units. Grants RES+4 when unit initiates combat.",
		"move_effective" : "Flying",
		"initiate_mod" : {
			"res" : 4
		}
	},
	"Poison Dagger" : {
		"color"   : "Colorless",
		"type"    : "Dagger",
		"might"   : 2,
		"range"   : 2,
		"magical" : false,
		"description" : "Effective against infantry units. Infantry foes suffer DEF/RES-4 after combat through their next actions.",
		"move_effective" : "Infantry",
		"target_seal" : {
			"target" : "Infantry",
			"def" : -4,
			"res" : -4
		}
	},
	"Poison Dagger+" : {
		"color"   : "Colorless",
		"type"    : "Dagger",
		"might"   : 5,
		"range"   : 2,
		"magical" : false,
		"description" : "Effective against infantry units. Infantry foes suffer DEF/RES-6 after combat through their next actions.",
		"move_effective" : "Infantry",
		"target_seal" : {
			"target" : "Infantry",
			"def" : -6,
			"res" : -6
		}
	},
	"Raijinto" : {
		"color"   : "Red",
		"type"    : "Sword",
		"might"   : 16,
		"range"   : 1,
		"magical" : false,
		"description" : "Enables counter-attacker regardless of attacker's range.",
		"counter" : true
	},
	"Rauðrblade" : {
		"color"   : "Red",
		"type"    : "Red Tome",
		"might"   : 9,
		"range"   : 2,
		"magical" : true,
		"description" : "Slows Special trigger (cooldown count+1). Adds total bonuses on unit to attack.",
		"spec_cooldown_mod" : 1,
		"add_bonus" : true
	},
	"Rauðrblade+" : {
		"color"   : "Red",
		"type"    : "Red Tome",
		"might"   : 13,
		"range"   : 2,
		"magical" : true,
		"description" : "Slows Special trigger (cooldown count+1). Adds total bonuses on unit to attack.",
		"spec_cooldown_mod" : 1,
		"add_bonus" : true
	},
	"Rauðrraven" : {
		"color"   : "Red",
		"type"    : "Red Tome",
		"might"   : 7,
		"range"   : 2,
		"magical" : true,
		"description" : "Grants weapon advantage vs. colorless foes.",
		"color_effective" : "Colorless"
	},
	"Rauðrraven+" : {
		"color"   : "Red",
		"type"    : "Red Tome",
		"might"   : 11,
		"range"   : 2,
		"magical" : true,
		"description" : "Grants weapon advantage vs. colorless foes.",
		"color_effective" : "Colorless"
	},
	"Rauðrwolf" : {
		"color"   : "Red",
		"type"    : "Red Tome",
		"might"   : 6,
		"range"   : 2,
		"magical" : true,
		"description" : "Effective against cavalry units.",
		"move_effective" : "Cavalry"
	},
	"Rauðrwolf+" : {
		"color"   : "Red",
		"type"    : "Red Tome",
		"might"   : 10,
		"range"   : 2,
		"magical" : true,
		"description" : "Effective against cavalry units.",
		"move_effective" : "Cavalry"
	},
	"Rexcalibur" : {
		"color"   : "Green",
		"type"    : "Green Tome",
		"might"   : 9,
		"range"   : 2,
		"magical" : true
	},
	"Rogue Dagger" : {
		"color"   : "Colorless",
		"type"    : "Dagger",
		"might"   : 4,
		"range"   : 2,
		"magical" : false,
		"description" : "After combat, inflict DEF/RES-3 on foe through their next actions. Grants unit DEF/RES+3 for 1 turn.",
		"seal" : {
			"def" : -3,
			"res" : -3
		},
		"after_mod" : {
			"def" : 3,
			"res" : 3
		}
	},
	"Rogue Dagger+" : {
		"color"   : "Colorless",
		"type"    : "Dagger",
		"might"   : 7,
		"range"   : 2,
		"magical" : false,
		"description" : "After combat, inflict DEF/RES-3 on foe through their next actions. Grants unit DEF/RES+5 for 1 turn.",
		"seal" : {
			"def" : -5,
			"res" : -5
		},
		"after_mod" : {
			"def" : 5,
			"res" : 5
		}
	},
	"Ruby Sword" : {
		"color"   : "Red",
		"type"    : "Sword",
		"might"   : 8,
		"range"   : 1,
		"magical" : false,
		"description" : "Gives ATK+20% if weapon triangle advantage, ATK-20% if disadvantage.",
		"tri_advantage" : true
	},
	"Ruby Sword+" : {
		"color"   : "Red",
		"type"    : "Sword",
		"might"   : 12,
		"range"   : 1,
		"magical" : false,
		"description" : "Gives ATK+20% if weapon triangle advantage, ATK-20% if disadvantage.",
		"tri_advantage" : true
	},
	"Ruin" : {
		"color"   : "Red",
		"type"    : "Tome",
		"might"   : 6,
		"range"   : 2,
		"magical" : true
	},
	"Sapphire Lance" : {
		"color"   : "Blue",
		"type"    : "Lance",
		"might"   : 8,
		"range"   : 1,
		"magical" : false,
		"description" : "Gives ATK+20% if weapon triangle advantage, ATK-20% if disadvantage.",
		"tri_advantage" : true
	},
	"Sapphire Lance+" : {
		"color"   : "Blue",
		"type"    : "Lance",
		"might"   : 12,
		"range"   : 1,
		"magical" : false,
		"description" : "Gives ATK+20% if weapon triangle advantage, ATK-20% if disadvantage.",
		"tri_advantage" : true
	},
	"Sieglinde" : {
		"color"   : "Red",
		"type"    : "Sword",
		"might"   : 16,
		"range"   : 1,
		"magical" : false,
		"description" : "Grants adjacent allies ATK+3 through their next actions at the start of each turn."
	},
	"Siegmund" : {
		"color"   : "Blue",
		"type"    : "Lance",
		"might"   : 16,
		"range"   : 1,
		"magical" : false,
		"description" : "Grants adjacent allies ATK+3 through their next actions at the start of each turn."
	},
	"Silver Axe" : {
		"color"   : "Green",
		"type"    : "Axe",
		"might"   : 11,
		"range"   : 1,
		"magical" : false
	},
	"Silver Axe+" : {
		"color"   : "Green",
		"type"    : "Axe",
		"might"   : 15,
		"range"   : 1,
		"magical" : false
	},
	"Silver Bow" : {
		"color"   : "Colorless",
		"type"    : "Bow",
		"might"   : 9,
		"range"   : 2,
		"magical" : false,
		"description" : "Effective against flying units.",
		"move_effective" : "Flying"
	},
	"Silver Bow+" : {
		"color"   : "Colorless",
		"type"    : "Bow",
		"might"   : 13,
		"range"   : 2,
		"magical" : false,
		"description" : "Effective against flying units.",
		"move_effective" : "Flying"
	},
	"Silver Dagger" : {
		"color"   : "Colorless",
		"type"    : "Dagger",
		"might"   : 7,
		"range"   : 2,
		"magical" : false,
		"description" : "After combat, inflict DEF/RES-5 on foe through their next actions."
	},
	"Silver Dagger+" : {
		"color"   : "Colorless",
		"type"    : "Dagger",
		"might"   : 10,
		"range"   : 2,
		"magical" : false,
		"description" : "After combat, inflict DEF/RES-7 on foe through their next actions."
	},
	"Silver Lance" : {
		"color"   : "Blue",
		"type"    : "Lance",
		"might"   : 11,
		"range"   : 1,
		"magical" : false
	},
	"Silver Lance+" : {
		"color"   : "Blue",
		"type"    : "Lance",
		"might"   : 15,
		"range"   : 1,
		"magical" : false
	},
	"Silver Sword" : {
		"color"   : "Red",
		"type"    : "Sword",
		"might"   : 11,
		"range"   : 1,
		"magical" : false
	},
	"Silver Sword+" : {
		"color"   : "Red",
		"type"    : "Sword",
		"might"   : 15,
		"range"   : 1,
		"magical" : false
	},
	"Slow" : {
		"color"   : "Colorless",
		"type"    : "Staff",
		"might"   : 5,
		"range"   : 2,
		"magical" : true,
		"description" : "After combat, inflicts SPD-6 on foe through their next actions.",
		"seal" : {
			"spd" : -6
		}
	},
	"Smoke Dagger" : {
		"color"   : "Colorless",
		"type"    : "Dagger",
		"might"   : 6,
		"range"   : 2,
		"magical" : false,
		"description" : "After combat, inflict DEF/RES-4 on foes within 2 spaces of target through their next actions."
	},
	"Smoke Dagger+" : {
		"color"   : "Colorless",
		"type"    : "Dagger",
		"might"   : 9,
		"range"   : 2,
		"magical" : false,
		"description" : "After combat, inflict DEF/RES-4 on foes within 2 spaces of target through their next actions."
	},
	"Sol Katti" : {
		"color"   : "Red",
		"type"    : "Sword",
		"might"   : 16,
		"range"   : 1,
		"magical" : false,
		"description" : "If unit initiates combat at HP ≤ 50%, any follow-up attack occurs immediately.",
		"desperation" : {
			"threshold" : 0.5
		}
	},
	"Steel Axe" : {
		"color"   : "Green",
		"type"    : "Axe",
		"might"   : 8,
		"range"   : 1,
		"magical" : false
	},
	"Steel Bow" : {
		"color"   : "Colorless",
		"type"    : "Bow",
		"might"   : 6,
		"range"   : 2,
		"magical" : false,
		"description" : "Effective against flying units.",
		"move_effective" : "Flying"
	},
	"Steel Dagger" : {
		"color"   : "Colorless",
		"type"    : "Dagger",
		"might"   : 5,
		"range"   : 2,
		"magical" : false,
		"description" : "After combat, inflict DEF/RES-3 on foe through their next actions.",
		"seal" : {
			"def" : -3,
			"res" : -3
		}
	},
	"Steel Lance" : {
		"color"   : "Blue",
		"type"    : "Lance",
		"might"   : 8,
		"range"   : 1,
		"magical" : false
	},
	"Steel Spear" : {
		"color"   : "Blue",
		"type"    : "Lance",
		"might"   : 8,
		"range"   : 1,
		"magical" : false
	},
	"Steel Sword" : {
		"color"   : "Red",
		"type"    : "Sword",
		"might"   : 8,
		"range"   : 1,
		"magical" : false
	},
	"Thoron" : {
		"color"   : "Blue",
		"type"    : "Blue Tome",
		"might"   : 9,
		"range"   : 2,
		"magical" : true
	},
	"Thunder" : {
		"color"   : "Blue",
		"type"    : "Blue Tome",
		"might"   : 4,
		"range"   : 2,
		"magical" : true
	},
	"Tyrfing" : {
		"color"   : "Red",
		"type"    : "Sword",
		"might"   : 16,
		"range"   : 1,
		"magical" : false,
		"description" : "Grants DEF+4 if unit's HP ≤ 50%.",
		"below_threshold_mod" : {
			"threshold" : 0.5,
			"stat_mod" : {
				"def" : 4
			}
		}
	},
	"Wind" : {
		"color"   : "Green",
		"type"    : "Green Tome",
		"might"   : 4,
		"range"   : 2,
		"magical" : false
	},
	"Yato" : {
		"color"   : "Red",
		"type"    : "Sword",
		"might"   : 16,
		"range"   : 1,
		"magical" : false,
		"description" : "Grants SPD+4 when unit initiates combat.",
		"initiate_mod" : {
			"spd" : 4
		}
	}
};
