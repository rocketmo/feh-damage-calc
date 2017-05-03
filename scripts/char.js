// character data
var charInfo =
{
	"Abel": {
		"color" : "Blue",
		"weapon_type" : "Lance",
		"move_type": "Cavalry",
		"weapon": ["Brave Lance+", "Brave Lance", "Steel Lance", "Iron Lance"],
		"special": ["Aegis", "Holy Vestments"],
		"passive_a": ["HP +5", "HP +4", "HP +3"],
		"passive_b": ["Swordbreaker 3", "Swordbreaker 2", "Swordbreaker 1"],
		"base_stat" : {
			"star-5" : {"hp" : 17, "atk" : 7, "spd" : 8, "def" : 8, "res" : 6},
			"star-4" : {"hp" : 16, "atk" : 6, "spd" : 8, "def" : 8, "res" : 5},
			"growth" : {"hp" : 6, "atk" : 8, "spd" : 7, "def" : 4, "res" : 5}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "passive_a" : 1}
		}
	},
	"Alfonse": {
		"color" : "Red",
		"weapon_type" : "Sword",
		"move_type": "Infantry",
		"weapon": ["Fólkvangr", "Silver Sword", "Steel Sword", "Iron Sword"],
		"special": ["Sol", "Daylight"],
		"passive_a": ["Death Blow 3", "Death Blow 2", "Death Blow 1"],
		"passive_c": ["Spur Atk 3", "Spur Atk 2", "Spur Atk 1"],
		"base_stat" : {
			"star-5" : {"hp" : 19, "atk" : 9, "spd" : 6, "def" : 8, "res" : 5},
			"star-4" : {"hp" : 18, "atk" : 9, "spd" : 5, "def" : 8, "res" : 4},
			"star-3" : {"hp" : 18, "atk" : 8, "spd" : 5, "def" : 7, "res" : 4},
			"star-2" : {"hp" : 17, "atk" : 8, "spd" : 4, "def" : 7, "res" : 3},
			"growth" : {"hp" : 7, "atk" : 8, "spd" : 5, "def" : 7, "res" : 4}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "special" : 0, "passive_a" : 0, "passive_c" : 1},
			"star-3" : {"weapon" : 1, "special" : 1, "passive_a" : 1, "passive_c" : 2},
			"star-2" : {"weapon" : 2, "special" : 1, "passive_a" : 1, "passive_c" : -1}
		}
	},
	"Alm": {
		"color" : "Red",
		"weapon_type" : "Sword",
		"move_type": "Infantry",
		"weapon": ["Falchion", "Silver Sword", "Steel Sword", "Iron Sword"],
		"special": ["Draconic Aura", "Dragon Gaze"],
		"passive_a": ["Attack +3", "Attack +2", "Attack +1"],
		"passive_b": ["Windsweep 3", "Windsweep 2", "Windsweep 1"],
		"base_stat" : {
			"star-5" : {"hp" : 21, "atk" : 9, "spd" : 6, "def" : 6, "res" : 5},
			"growth" : {"hp" : 7, "atk" : 7, "spd" : 7, "def" : 6, "res" : 4}
		}
	},
	"Anna": {
		"color" : "Green",
		"weapon_type" : "Axe",
		"move_type": "Infantry",
		"weapon": ["Nóatún", "Silver Axe", "Steel Axe", "Iron Axe"],
		"special": ["Astra", "Night Sky"],
		"passive_b": ["Vantage 3", "Vantage 2", "Vantage 1"],
		"passive_c": ["Spur Res 3", "Spur Res 2", "Spur Res 1"],
		"base_stat" : {
			"star-5" : {"hp" : 19, "atk" : 7, "spd" : 10, "def" : 5, "res" : 6},
			"star-4" : {"hp" : 18, "atk" : 7, "spd" : 10, "def" : 4, "res" : 5},
			"star-3" : {"hp" : 18, "atk" : 6, "spd" : 9, "def" : 4, "res" : 5},
			"star-2" : {"hp" : 17, "atk" : 6, "spd" : 9, "def" : 3, "res" : 4},
			"growth" : {"hp" : 6, "atk" : 6, "spd" : 9, "def" : 4, "res" : 6}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "special" : 0, "passive_b" : 1, "passive_c" : 0},
			"star-3" : {"weapon" : 1, "special" : 1, "passive_b" : 2, "passive_c" : 1},
			"star-2" : {"weapon" : 2, "special" : 1, "passive_b" : -1, "passive_c" : 1}
		}
	},
	"Arthur": {
		"color" : "Green",
		"weapon_type" : "Axe",
		"move_type": "Infantry",
		"weapon": ["Emerald Axe+", "Emerald Axe", "Steel Axe", "Iron Axe"],
		"passive_a": ["HP +5", "HP +4", "HP +3"],
		"passive_b": ["Lancebreaker 3", "Lancebreaker 2", "Lancebreaker 1"],
		"assist" : ["Swap"],
		"base_stat" : {
			"star-5" : {"hp" : 19, "atk" : 8, "spd" : 7, "def" : 8, "res" : 5},
			"star-4" : {"hp" : 18, "atk" : 8, "spd" : 6, "def" : 8, "res" : 4},
			"star-3" : {"hp" : 18, "atk" : 7, "spd" : 6, "def" : 7, "res" : 4},
			"growth" : {"hp" : 7, "atk" : 7, "spd" : 6, "def" : 6, "res" : 5}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "assist" : 0, "passive_a" : 0, "passive_b" : 1},
			"star-3" : {"weapon" : 1, "assist" : 0, "passive_a" : 1, "passive_b" : 2}
		}
	},
	"Azama": {
		"color" : "Colorless",
		"weapon_type" : "Staff",
		"move_type": "Infantry",
		"weapon": ["Pain", "Assault"],
		"special": ["Solid-Earth Balm", "Imbue"],
		"passive_c": ["Threaten Atk 3", "Threaten Atk 2", "Threaten Atk 1"],
		"assist" : ["Martyr", "Reconcile", "Heal"],
		"base_stat" : {
			"star-5" : {"hp" : 19, "atk" : 4, "spd" : 7, "def" : 8, "res" : 6},
			"star-4" : {"hp" : 18, "atk" : 3, "spd" : 7, "def" : 8, "res" : 5},
			"star-3" : {"hp" : 18, "atk" : 3, "spd" : 6, "def" : 7, "res" : 5},
			"growth" : {"hp" : 7, "atk" : 4, "spd" : 5, "def" : 7, "res" : 5}
		},
		"rarity_restrict" : {
			"star-4" : {"assist" : 0, "passive_c" : 1},
			"star-3" : {"assist" : 1, "passive_c" : 2}
		}
	},
	"Azura": {
		"color" : "Blue",
		"weapon_type" : "Lance",
		"move_type": "Infantry",
		"weapon": ["Sapphire Lance+", "Sapphire Lance", "Steel Lance", "Iron Lance"],
		"passive_a": ["Speed +3", "Speed +2", "Speed +1"],
		"passive_c": ["Fortify Res 3", "Fortify Res 2", "Fortify Res 1"],
		"assist" : ["Sing"],
		"base_stat" : {
			"star-5" : {"hp" : 17, "atk" : 5, "spd" : 7, "def" : 4, "res" : 6},
			"growth" : {"hp" : 5, "atk" : 8, "spd" : 8, "def" : 4, "res" : 6}
		}
	},
	"Barst": {
		"color" : "Green",
		"weapon_type" : "Axe",
		"move_type": "Infantry",
		"weapon": ["Brave Axe+", "Brave Axe", "Steel Axe", "Iron Axe"],
		"passive_b": ["Knock Back"],
		"passive_c": ["Spur Atk 3", "Spur Atk 2", "Spur Atk 1"],
		"assist" : ["Reposition"],
		"base_stat" : {
			"star-5" : {"hp" : 20, "atk" : 9, "spd" : 8, "def" : 6, "res" : 4},
			"star-4" : {"hp" : 19, "atk" : 9, "spd" : 8, "def" : 5, "res" : 3},
			"star-3" : {"hp" : 19, "atk" : 8, "spd" : 7, "def" : 5, "res" : 3},
			"growth" : {"hp" : 8, "atk" : 7, "spd" : 7, "def" : 7, "res" : 2}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "passive_c" : 0},
			"star-3" : {"weapon" : 1, "passive_c" : 1}
		}
	},
	"Bartre": {
		"color" : "Green",
		"weapon_type" : "Axe",
		"move_type": "Infantry",
		"weapon": ["Hammer+", "Hammer", "Steel Axe", "Iron Axe"],
		"passive_a": ["Fury 3", "Fury 2", "Fury 1"],
		"passive_b": ["Brash Assault 3", "Brash Assault 2", "Brash Assault 1"],
		"assist" : ["Smite"],
		"base_stat" : {
			"star-5" : {"hp" : 21, "atk" : 10, "spd" : 6, "def" : 7, "res" : 3},
			"star-4" : {"hp" : 20, "atk" : 10, "spd" : 5, "def" : 7, "res" : 2},
			"star-3" : {"hp" : 20, "atk" : 9, "spd" : 5, "def" : 6, "res" : 2},
			"growth" : {"hp" : 9, "atk" : 8, "spd" : 5, "def" : 8, "res" : 1}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "passive_a" : 1, "passive_b" : 0},
			"star-3" : {"weapon" : 1, "passive_a" : 2, "passive_b" : 1}
		}
	},
	"Beruka": {
		"color" : "Green",
		"weapon_type" : "Axe",
		"move_type": "Flying",
		"weapon": ["Killer Axe+", "Killer Axe", "Steel Axe", "Iron Axe"],
		"special": ["Glimmer", "Night Sky"],
		"passive_a": ["Defiant Def 3", "Defiant Def 2", "Defiant Def 1"],
		"passive_b": ["Lunge"],
		"base_stat" : {
			"star-5" : {"hp" : 20, "atk" : 7, "spd" : 6, "def" : 9, "res" : 5},
			"star-4" : {"hp" : 19, "atk" : 7, "spd" : 5, "def" : 9, "res" : 4},
			"star-3" : {"hp" : 19, "atk" : 6, "spd" : 5, "def" : 8, "res" : 4},
			"growth" : {"hp" : 8, "atk" : 6, "spd" : 4, "def" : 9, "res" : 4}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "special" : 0, "passive_a" : 0},
			"star-3" : {"weapon" : 1, "special" : 1, "passive_a" : 1}
		}
	},
	"Caeda": {
		"color" : "Red",
		"weapon_type" : "Sword",
		"move_type": "Flying",
		"weapon": ["Armorslayer+", "Armorslayer", "Steel Sword", "Iron Sword"],
		"passive_a": ["Darting Blow 3", "Darting Blow 2", "Darting Blow 1"],
		"passive_c": ["Fortify Fliers", "Fortify Res 2", "Fortify Res 1"],
		"assist" : ["Rally Speed"],
		"base_stat" : {
			"star-5" : {"hp" : 17, "atk" : 6, "spd" : 9, "def" : 5, "res" : 10},
			"star-4" : {"hp" : 16, "atk" : 5, "spd" : 9, "def" : 4, "res" : 10},
			"growth" : {"hp" : 5, "atk" : 5, "spd" : 9, "def" : 5, "res" : 7}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "passive_a" : 1, "passive_c" : 1}
		}
	},
	"Cain": {
		"color" : "Red",
		"weapon_type" : "Sword",
		"move_type": "Cavalry",
		"weapon": ["Brave Sword+", "Brave Sword", "Steel Sword", "Iron Sword"],
		"special": ["Escutcheon", "Buckler"],
		"passive_b": ["Wings of Mercy 3", "Wings of Mercy 2", "Wings of Mercy 1"],
		"passive_c": ["Threaten Atk 3", "Threaten Atk 2", "Threaten Atk 1"],
		"base_stat" : {
			"star-5" : {"hp" : 18, "atk" : 8, "spd" : 6, "def" : 8, "res" : 6},
			"star-4" : {"hp" : 17, "atk" : 8, "spd" : 5, "def" : 8, "res" : 5},
			"growth" : {"hp" : 7, "atk" : 7, "spd" : 8, "def" : 5, "res" : 3}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "passive_c" : 1}
		}
	},
	"Camilla": {
		"color" : "Green",
		"weapon_type" : "Axe",
		"move_type": "Flying",
		"weapon": ["Brave Axe+", "Brave Axe", "Steel Axe", "Iron Axe"],
		"special": ["Draconic Aura", "Dragon Gaze"],
		"passive_a": ["Darting Blow 3", "Darting Blow 2", "Darting Blow 1"],
		"passive_c": ["Savage Blow 3", "Savage Blow 2", "Savage Blow 1"],
		"base_stat" : {
			"star-5" : {"hp" : 18, "atk" : 8, "spd" : 8, "def" : 6, "res" : 7},
			"star-4" : {"hp" : 17, "atk" : 8, "spd" : 8, "def" : 5, "res" : 6},
			"growth" : {"hp" : 5, "atk" : 6, "spd" : 7, "def" : 6, "res" : 7}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "passive_a" : 1}
		}
	},
	"Camilla (Spring)": {
		"color" : "Green",
		"weapon_type" : "Green Tome",
		"move_type": "Flying", 
		"weapon": ["Green Egg+", "Green Egg", "Elwind", "Wind"],
		"passive_a": ["Defiant Spd 3", "Defiant Spd 2", "Defiant Spd 1"],
		"passive_b": ["Live for Bounty"],
		"assist" : ["Rally Attack"],
		"base_stat" : {
			"star-5" : {"hp" : 17, "atk" : 9, "spd" : 6, "def" : 8, "res" : 4},
			"growth" : {"hp" : 6, "atk" : 8, "spd" : 5, "def" : 6, "res" : 3}
		}
	},
	"Camus": {
		"color" : "Blue",
		"weapon_type" : "Lance",
		"hp": 42,
		"atk": 48,
		"spd": 33,
		"def": 31,
		"res": 17,
		"move_type": "Cavalry",
		"weapon": ["Gradivus", "Silver Lance", "Steel Lance", "Iron Lance"],
		"special": ["Growing Thunder", "Rising Thunder"],
		"passive_a": ["Grani's Shield"],
		"passive_c": ["Goad Cavalry", "Spur Atk 2", "Spur Atk 1"]
	},
	"Catria": {
		"color" : "Blue",
		"weapon_type" : "Lance",
		"move_type": "Flying",
		"weapon": ["Killer Lance+", "Killer Lance", "Steel Lance", "Iron Lance"],
		"special": ["Luna", "New Moon"],
		"passive_a": ["Armored Blow 3", "Armored Blow 2", "Armored Blow 1"],
		"passive_b": ["Seal Atk 3", "Seal Atk 2", "Seal Atk 1"],
		"base_stat" : {
			"star-5" : {"hp" : 17, "atk" : 7, "spd" : 10, "def" : 7, "res" : 6},
			"star-4" : {"hp" : 16, "atk" : 7, "spd" : 10, "def" : 6, "res" : 5},
			"growth" : {"hp" : 6, "atk" : 7, "spd" : 7, "def" : 6, "res" : 5}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "passive_b" : 1}
		}
	},
	"Cecilia": {
		"color" : "Green",
		"weapon_type" : "Green Tome",
		"move_type": "Cavalry",
		"weapon": ["Gronnraven+", "Gronnraven", "Elwind", "Wind"],
		"passive_a": ["Attack +3", "Attack +2", "Attack +1"],
		"passive_b": ["Escape Route 3", "Escape Route 2", "Escape Route 1"],
		"assist" : ["Rally Resistance"],
		"base_stat" : {
			"star-5" : {"hp" : 17, "atk" : 8, "spd" : 6, "def" : 5, "res" : 7},
			"star-4" : {"hp" : 16, "atk" : 8, "spd" : 5, "def" : 4, "res" : 7},
			"star-3" : {"hp" : 16, "atk" : 7, "spd" : 5, "def" : 4, "res" : 6},
			"star-2" : {"hp" : 15, "atk" : 7, "spd" : 4, "def" : 3, "res" : 6},
			"star-1" : {"hp" : 15, "atk" : 6, "spd" : 4, "def" : 3, "res" : 5},
			"growth" : {"hp" : 5, "atk" : 7, "spd" : 5, "def" : 4, "res" : 6}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "assist" : 0, "passive_a" : 1, "passive_b" : 0},
			"star-3" : {"weapon" : 1, "assist" : 0, "passive_a" : 2, "passive_b" : 1},
			"star-2" : {"weapon" : 2, "assist" : -1, "passive_a" : -1, "passive_b" : 1},
			"star-1" : {"weapon" : 3, "assist" : -1, "passive_a" : -1, "passive_b" : 2}
		}
	},
	"Cherche": {
		"color" : "Green",
		"weapon_type" : "Axe",
		"move_type": "Flying",
		"weapon": ["Hammer+", "Hammer", "Steel Axe", "Iron Axe"],
		"passive_a": ["Attack +3", "Attack +2", "Attack +1"],
		"passive_c": ["Fortify Def 3", "Fortify Def 2", "Fortify Def 1"],
		"assist" : ["Pivot"],
		"base_stat" : {
			"star-5" : {"hp" : 20, "atk" : 10, "spd" : 6, "def" : 8, "res" : 3},
			"star-4" : {"hp" : 19, "atk" : 10, "spd" : 5, "def" : 8, "res" : 2},
			"star-3" : {"hp" : 19, "atk" : 9, "spd" : 5, "def" : 7, "res" : 2},
			"growth" : {"hp" : 8, "atk" : 9, "spd" : 5, "def" : 7, "res" : 2}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "passive_a" : 0, "passive_c" : 1},
			"star-3" : {"weapon" : 1, "passive_a" : 1, "passive_c" : 2}
		}
	},
	"Chrom": {
		"color" : "Red",
		"weapon_type" : "Sword",
		"move_type": "Infantry",
		"weapon": ["Falchion", "Silver Sword", "Steel Sword", "Iron Sword"],
		"special": ["Aether", "Sol", "Daylight"],
		"passive_a": ["Defiant Def 3", "Defiant Def 2", "Defiant Def 1"],
		"passive_c": ["Spur Def 3", "Spur Def 2", "Spur Def 1"],
		"base_stat" : {
			"star-5" : {"hp" : 21, "atk" : 9, "spd" : 6, "def" : 7, "res" : 4},
			"star-4" : {"hp" : 20, "atk" : 9, "spd" : 5, "def" : 7, "res" : 3},
			"growth" : {"hp" : 8, "atk" : 9, "spd" : 5, "def" : 7, "res" : 2}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "special" : 1, "passive_c" : 1}
		}
	},
	"Chrom (Spring)": {
		"color" : "Green",
		"weapon_type" : "Axe",
		"move_type": "Infantry",
		"weapon": ["Carrot Axe+", "Carrot Axe", "Steel Axe", "Iron Axe"],
		"passive_a": ["Attack/Def +2", "Attack/Def +1", "Defense +1"],
		"passive_c": ["Axe Experience 3", "Axe Experience 2", "Axe Experience 1"],
		"assist" : ["Shove"],
		"base_stat" : {
			"star-5" : {"hp" : 19, "atk" : 9, "spd" : 8, "def" : 6, "res" : 5},
			"growth" : {"hp" : 7, "atk" : 8, "spd" : 7, "def" : 6, "res" : 3}
		}
	},
	"Clair": {
		"color" : "Blue",
		"weapon_type" : "Lance",
		"move_type": "Flying",
		"weapon": ["Silver Lance+", "Silver Lance", "Steel Lance", "Iron Lance"],
		"passive_b": ["Hit and Run"],
		"passive_c": ["Spur Spd 3", "Spur Spd 2", "Spur Spd 1"],
		"assist" : ["Harsh Command"],
		"base_stat" : {
			"star-5" : {"hp" : 18, "atk" : 7, "spd" : 8, "def" : 5, "res" : 9},
			"star-4" : {"hp" : 17, "atk" : 6, "spd" : 8, "def" : 4, "res" : 9},
			"growth" : {"hp" : 5, "atk" : 5, "spd" : 9, "def" : 5, "res" : 7}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "passive_c" : 1}
		}
	},
	"Clarine": {
		"color" : "Colorless",
		"weapon_type" : "Staff",
		"move_type": "Cavalry",
		"weapon": ["Fear", "Assault"],
		"special": ["Swift-Winds Balm", "Imbue"],
		"passive_a": ["Resistance +3", "Resistance +2", "Resistance +1"],
		"assist" : ["Martyr", "Reconcile", "Heal"],
		"base_stat" : {
			"star-5" : {"hp" : 16, "atk" : 6, "spd" : 9, "def" : 5, "res" : 7},
			"star-4" : {"hp" : 15, "atk" : 5, "spd" : 9, "def" : 4, "res" : 7},
			"star-3" : {"hp" : 15, "atk" : 5, "spd" : 8, "def" : 4, "res" : 6},
			"growth" : {"hp" : 5, "atk" : 5, "spd" : 7, "def" : 4, "res" : 6}
		},
		"rarity_restrict" : {
			"star-4" : {"assist" : 0, "passive_a" : 1},
			"star-3" : {"assist" : 1, "passive_a" : 2}
		}
	},
	"Cordelia": {
		"color" : "Blue",
		"weapon_type" : "Lance",
		"move_type": "Flying",
		"weapon": ["Brave Lance+", "Brave Lance", "Steel Lance", "Iron Lance"],
		"special": ["Galeforce", "Astra", "Night Sky"],
		"passive_a": ["Triangle Adept 3", "Triangle Adept 2", "Triangle Adept 1"],
		"passive_b": ["Pass 3", "Pass 2", "Pass 1"],
		"base_stat" : {
			"star-5" : {"hp" : 18, "atk" : 9, "spd" : 9, "def" : 5, "res" : 6},
			"star-4" : {"hp" : 17, "atk" : 9, "spd" : 9, "def" : 4, "res" : 5},
			"growth" : {"hp" : 6, "atk" : 8, "spd" : 8, "def" : 4, "res" : 5}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "special" : 1, "passive_a" : 1}
		}
	},
	"Corrin (F)": {
		"color" : "Blue",
		"weapon_type" : "Blue Breath",
		"move_type": "Infantry",
		"weapon": ["Dark Breath+ (Blue)", "Dark Breath (Blue)", "Fire Breath+ (Blue)", "Fire Breath (Blue)"],
		"special": ["Draconic Aura", "Dragon Gaze"],
		"passive_b": ["Seal Res 3", "Seal Res 2", "Seal Res 1"],
		"passive_c": ["Hone Atk 3", "Hone Atk 2", "Hone Atk 1"],
		"base_stat" : {
			"star-5" : {"hp" : 19, "atk" : 8, "spd" : 6, "def" : 8, "res" : 6},
			"star-4" : {"hp" : 18, "atk" : 8, "spd" : 5, "def" : 8, "res" : 5},
			"star-3" : {"hp" : 18, "atk" : 7, "spd" : 5, "def" : 7, "res" : 5},
			"growth" : {"hp" : 6, "atk" : 5, "spd" : 9, "def" : 8, "res" : 3}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "special" : 0, "passive_b" : 1, "passive_c" : 0},
			"star-3" : {"weapon" : 1, "special" : 1, "passive_b" : 2, "passive_c" : 1}
		}
	},
	"Corrin (M)": {
		"color" : "Red",
		"weapon_type" : "Sword",
		"move_type": "Infantry",
		"weapon": ["Yato", "Silver Sword", "Steel Sword", "Iron Sword"],
		"special": ["Dragon Fang", "Dragon Gaze"],
		"passive_a": ["Defense +3", "Defense +2", "Defense +1"],
		"passive_b": ["Obstruct 3", "Obstruct 2", "Obstruct 1"],
		"base_stat" : {
			"star-5" : {"hp" : 20, "atk" : 8, "spd" : 8, "def" : 6, "res" : 5},
			"star-4" : {"hp" : 19, "atk" : 8, "spd" : 8, "def" : 5, "res" : 4},
			"growth" : {"hp" : 6, "atk" : 7, "spd" : 7, "def" : 6, "res" : 5}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "passive_b" : 1}
		}
	},
	"Custom": {	
	},
	"Donnel": {
		"color" : "Blue",
		"weapon_type" : "Lance",
		"move_type": "Infantry",
		"weapon": ["Brave Lance+", "Brave Lance", "Steel Lance", "Iron Lance"],
		"passive_a": ["HP +5", "HP +4", "HP +3"],
		"passive_b": ["Drag Back"],
		"assist" : ["Reciprocal Aid"],
		"base_stat" : {
			"star-5" : {"hp" : 17, "atk" : 7, "spd" : 5, "def" : 6, "res" : 4},
			"star-4" : {"hp" : 16, "atk" : 7, "spd" : 4, "def" : 6, "res" : 3},
			"star-3" : {"hp" : 16, "atk" : 6, "spd" : 4, "def" : 5, "res" : 3},
			"star-2" : {"hp" : 15, "atk" : 6, "spd" : 3, "def" : 5, "res" : 2},
			"star-1" : {"hp" : 15, "atk" : 5, "spd" : 3, "def" : 4, "res" : 2},
			"growth" : {"hp" : 8, "atk" : 9, "spd" : 7, "def" : 8, "res" : 5}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "assist" : 0, "passive_a" : 0, "passive_b" : 0},
			"star-3" : {"weapon" : 1, "assist" : 0, "passive_a" : 1, "passive_b" : 0},
			"star-2" : {"weapon" : 2, "assist" : -1, "passive_a" : 1, "passive_b" : -1},
			"star-1" : {"weapon" : 3, "assist" : -1, "passive_a" : 2, "passive_b" : -1}
		}
	},
	"Draug": {
		"color" : "Red",
		"weapon_type" : "Sword",
		"move_type": "Armored",
		"weapon": ["Brave Sword+", "Brave Sword", "Steel Sword", "Iron Sword"],
		"special": ["Pavise", "Buckler"],
		"passive_b": ["Lunge"],
		"passive_c": ["Ward Armor", "Spur Def 2", "Spur Def 1"],
		"base_stat" : {
			"star-5" : {"hp" : 24, "atk" : 8, "spd" : 6, "def" : 13, "res" : 3},
			"star-4" : {"hp" : 23, "atk" : 8, "spd" : 5, "def" : 13, "res" : 2},
			"star-3" : {"hp" : 23, "atk" : 7, "spd" : 5, "def" : 12, "res" : 2},
			"star-2" : {"hp" : 22, "atk" : 7, "spd" : 4, "def" : 12, "res" : 1},
			"growth" : {"hp" : 8, "atk" : 6, "spd" : 8, "def" : 8, "res" : 3}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "special" : 0, "passive_b" : 0, "passive_c" : 0},
			"star-3" : {"weapon" : 1, "special" : 1, "passive_b" : 0, "passive_c" : 1},
			"star-2" : {"weapon" : 2, "special" : -1, "passive_b" : -1, "passive_c" : 2}
		}
	},
	"Effie": {
		"color" : "Blue",
		"weapon_type" : "Lance",
		"move_type": "Armored",
		"weapon": ["Silver Lance+", "Silver Lance", "Steel Lance", "Iron Lance"],
		"passive_a": ["Death Blow 3", "Death Blow 2", "Death Blow 1"],
		"passive_b": ["Wary Fighter 3", "Wary Fighter 2", "Wary Fighter 1"],
		"assist" : ["Smite"],
		"base_stat" : {
			"star-5" : {"hp" : 22, "atk" : 12, "spd" : 5, "def" : 11, "res" : 4},
			"star-4" : {"hp" : 21, "atk" : 12, "spd" : 4, "def" : 11, "res" : 3},
			"growth" : {"hp" : 9, "atk" : 9, "spd" : 4, "def" : 6, "res" : 5}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "passive_a" : 1}
		}
	},
	"Eirika": {
		"color" : "Red",
		"weapon_type" : "Sword",
		"move_type": "Infantry",
		"weapon": ["Sieglinde", "Silver Sword", "Steel Sword", "Iron Sword"],
		"passive_b": ["Drag Back"],
		"passive_c": ["Hone Spd 3", "Hone Spd 2", "Hone Spd 1"],
		"assist" : ["Pivot"],
		"base_stat" : {
			"star-5" : {"hp" : 18, "atk" : 7, "spd" : 9, "def" : 7, "res" : 6},
			"star-4" : {"hp" : 17, "atk" : 7, "spd" : 9, "def" : 6, "res" : 5},
			"growth" : {"hp" : 7, "atk" : 5, "spd" : 8, "def" : 5, "res" : 6}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1}
		}
	},
	"Eldigan" : {
		"color" : "Red",
		"weapon_type" : "Sword",
		"move_type": "Cavalry",
		"weapon": ["Mystletainn", "Killing Edge", "Steel Sword", "Iron Sword"],
		"special": ["Growing Light", "Rising Light"],
		"passive_a": ["Fury 3", "Fury 2", "Fury 1"],
		"passive_b": ["Lunge"],
		"base_stat" : {
			"star-5" : {"hp" : 19, "atk" : 8, "spd" : 5, "def" : 8, "res" : 6},
			"growth" : {"hp" : 8, "atk" : 7, "spd" : 5, "def" : 8, "res" : 2}
		}
	},
	"Elise": {
		"color" : "Colorless",
		"weapon_type" : "Staff",
		"move_type": "Cavalry",
		"weapon": ["Gravity", "Assault"],
		"special": ["Kindled-Fire Balm", "Imbue"],
		"passive_b": ["Live to Serve 3", "Live to Serve 2", "Live to Serve 1"],
		"assist" : ["Recover", "Mend", "Heal"],
		"base_stat" : {
			"star-5" : {"hp" : 15, "atk" : 8, "spd" : 8, "def" : 4, "res" : 8},
			"growth" : {"hp" : 3, "atk" : 7, "spd" : 7, "def" : 3, "res" : 7}
		}
	},
	"Eliwood": {
		"color" : "Red",
		"weapon_type" : "Sword",
		"move_type": "Cavalry",
		"weapon": ["Durandal", "Silver Sword", "Steel Sword", "Iron Sword"],
		"special": ["Sacred Cowl", "Holy Vestments"],
		"passive_b": ["Axebreaker 3", "Axebreaker 2", "Axebreaker 1"],
		"passive_c": ["Ward Cavalry", "Spur Res 2", "Spur Res 1"],
		"base_stat" : {
			"star-5" : {"hp" : 17, "atk" : 7, "spd" : 8, "def" : 6, "res" : 8},
			"star-4" : {"hp" : 16, "atk" : 6, "spd" : 8, "def" : 5, "res" : 8},
			"star-3" : {"hp" : 16, "atk" : 6, "spd" : 7, "def" : 5, "res" : 7},
			"growth" : {"hp" : 6, "atk" : 7, "spd" : 6, "def" : 4, "res" : 7}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "special" : 0, "passive_b" : 1, "passive_c" : 0},
			"star-3" : {"weapon" : 1, "special" : 1, "passive_b" : 2, "passive_c" : 1}
		}
	},
	"Ephraim": {
		"color" : "Blue",
		"weapon_type" : "Lance",
		"move_type": "Infantry",
		"weapon": ["Siegmund", "Heavy Spear", "Steel Lance", "Iron Lance"],
		"special": ["Moonbow", "New Moon"],
		"passive_b": ["Seal Def 3", "Seal Def 2", "Seal Def 1"],
		"passive_c": ["Threaten Def 3", "Threaten Def 2", "Threaten Def 1"],
		"base_stat" : {
			"star-5" : {"hp" : 19, "atk" : 9, "spd" : 6, "def" : 8, "res" : 5},
			"growth" : {"hp" : 8, "atk" : 8, "spd" : 5, "def" : 7, "res" : 3}
		}
	},
	"Est": {
		"color" : "Blue",
		"weapon_type" : "Lance",
		"move_type": "Flying",
		"weapon": ["Heavy Spear+", "Heavy Spear", "Steel Lance", "Iron Lance"],
		"passive_a": ["Defiant Res 3", "Defiant Res 2", "Defiant Res 1"],
		"passive_b": ["Seal Spd 3", "Seal Spd 2", "Seal Spd 1"],
		"assist" : ["Shove"],
		"base_stat" : {
			"star-5" : {"hp" : 17, "atk" : 9, "spd" : 8, "def" : 5, "res" : 8},
			"star-4" : {"hp" : 16, "atk" : 9, "spd" : 8, "def" : 4, "res" : 7},
			"star-3" : {"hp" : 16, "atk" : 8, "spd" : 7, "def" : 4, "res" : 7},
			"growth" : {"hp" : 5, "atk" : 8, "spd" : 6, "def" : 5, "res" : 7}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "passive_a" : 0, "passive_b" : 1},
			"star-3" : {"weapon" : 1, "passive_a" : 1, "passive_b" : 2}
		}
	},
	"Fae": {
		"color" : "Green",
		"weapon_type" : "Green Breath",
		"move_type": "Infantry",
		"weapon": ["Light Breath+ (Green)", "Light Breath (Green)", "Fire Breath+ (Green)", "Fire Breath (Green)"],
		"passive_b": ["Renewal 3", "Renewal 2", "Renewal 1"],
		"passive_c": ["Threaten Atk 3", "Threaten Atk 2", "Threaten Atk 1"],
		"assist" : ["Draw Back"],
		"base_stat" : {
			"star-5" : {"hp" : 16, "atk" : 5, "spd" : 4, "def" : 6, "res" : 8},
			"star-4" : {"hp" : 15, "atk" : 4, "spd" : 3, "def" : 6, "res" : 8},
			"growth" : {"hp" : 10, "atk" : 9, "spd" : 7, "def" : 5, "res" : 6}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "passive_c" : 1}
		}
	},
	"Faye": {
		"color" : "Colorless",
		"weapon_type" : "Bow",
		"move_type": "Infantry",
		"weapon": ["Firesweep Bow+", "Firesweep Bow", "Steel Bow", "Iron Bow"],
		"special": ["Noontime", "Daylight"],
		"passive_b": ["Wings of Mercy 3", "Wings of Mercy 2", "Wings of Mercy 1"],
		"passive_c": ["Bow Experience 3", "Bow Experience 2", "Bow Experience 1"],
		"base_stat" : {
			"star-5" : {"hp" : 16, "atk" : 6, "spd" : 3, "def" : 4, "res" : 7},
			"growth" : {"hp" : 8, "atk" : 7, "spd" : 6, "def" : 6, "res" : 7}
		}
	},
	"Felicia": {
		"color" : "Colorless",
		"weapon_type" : "Dagger",
		"move_type": "Infantry",
		"weapon": ["Silver Dagger+", "Silver Dagger", "Steel Dagger", "Iron Dagger"],
		"special": ["Glacies", "Chilling Wind"],
		"passive_a": ["Resistance +3", "Resistance +2", "Resistance +1"],
		"passive_c": ["Breath of Life 3", "Breath of Life 2", "Breath of Life 1"],
		"base_stat" : {
			"star-5" : {"hp" : 15, "atk" : 6, "spd" : 11, "def" : 3, "res" : 9},
			"star-4" : {"hp" : 14, "atk" : 5, "spd" : 11, "def" : 2, "res" : 9},
			"star-3" : {"hp" : 14, "atk" : 5, "spd" : 10, "def" : 2, "res" : 8},
			"star-2" : {"hp" : 13, "atk" : 4, "spd" : 10, "def" : 1, "res" : 8},
			"star-1" : {"hp" : 13, "atk" : 4, "spd" : 9, "def" : 1, "res" : 7},
			"growth" : {"hp" : 5, "atk" : 4, "spd" : 8, "def" : 3, "res" : 8}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "special" : 0, "passive_a" : 1, "passive_c" : 0},
			"star-3" : {"weapon" : 1, "special" : 1, "passive_a" : 2, "passive_c" : 1},
			"star-2" : {"weapon" : 2, "special" : -1, "passive_a" : -1, "passive_c" : 1},
			"star-1" : {"weapon" : 3, "special" : -1, "passive_a" : -1, "passive_c" : 2}
		}
	},
	"Fir": {
		"color" : "Red",
		"weapon_type" : "Sword",
		"move_type": "Infantry",
		"weapon": ["Killing Edge+", "Killing Edge", "Steel Sword", "Iron Sword"],
		"special": ["Glacies", "Chilling Wind"],
		"passive_a": ["Speed +3", "Speed +2", "Speed +1"],
		"passive_b": ["Pass 3", "Pass 2", "Pass 1"],
		"base_stat" : {
			"star-5" : {"hp" : 19, "atk" : 6, "spd" : 10, "def" : 5, "res" : 7},
			"star-4" : {"hp" : 18, "atk" : 5, "spd" : 10, "def" : 4, "res" : 7},
			"star-3" : {"hp" : 18, "atk" : 5, "spd" : 9, "def" : 4, "res" : 6},
			"growth" : {"hp" : 6, "atk" : 5, "spd" : 8, "def" : 5, "res" : 7}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "special" : 0, "passive_a" : 0, "passive_b" : 1},
			"star-3" : {"weapon" : 1, "special" : 1, "passive_a" : 1, "passive_b" : 2}
		}
	},
	"Florina": {
		"color" : "Blue",
		"weapon_type" : "Lance",
		"move_type": "Flying",
		"weapon": ["Heavy Spear+", "Heavy Spear", "Steel Lance", "Iron Lance"],
		"passive_a": ["Darting Blow 3", "Darting Blow 2", "Darting Blow 1"],
		"passive_c": ["Breath of Life 3", "Breath of Life 2", "Breath of Life 1"],
		"assist" : ["Ardent Sacrifice"],
		"base_stat" : {
			"star-5" : {"hp" : 18, "atk" : 7, "spd" : 8, "def" : 6, "res" : 8},
			"star-4" : {"hp" : 17, "atk" : 6, "spd" : 8, "def" : 5, "res" : 8},
			"star-3" : {"hp" : 17, "atk" : 6, "spd" : 7, "def" : 5, "res" : 7},
			"growth" : {"hp" : 7, "atk" : 6, "spd" : 5, "def" : 5, "res" : 8}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "passive_a" : 0, "passive_c" : 1},
			"star-3" : {"weapon" : 1, "passive_a" : 1, "passive_c" : 2}
		}
	},
	"Frederick": {
		"color" : "Green",
		"weapon_type" : "Axe",
		"move_type": "Cavalry",
		"weapon": ["Hammer+", "Hammer", "Steel Axe", "Iron Axe"],
		"special": ["Luna", "New Moon"],
		"passive_b": ["Wings of Mercy 3", "Wings of Mercy 2", "Wings of Mercy 1"],
		"passive_c": ["Fortify Def 3", "Fortify Def 2", "Fortify Def 1"],
		"base_stat" : {
			"star-5" : {"hp" : 19, "atk" : 9, "spd" : 6, "def" : 8, "res" : 4},
			"star-4" : {"hp" : 18, "atk" : 9, "spd" : 5, "def" : 8, "res" : 3},
			"star-3" : {"hp" : 18, "atk" : 8, "spd" : 5, "def" : 7, "res" : 3},
			"growth" : {"hp" : 7, "atk" : 8, "spd" : 5, "def" : 9, "res" : 1}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "special" : 0, "passive_b" : 1, "passive_c" : 0},
			"star-3" : {"weapon" : 1, "special" : 1, "passive_b" : 2, "passive_c" : 1}
		}
	},
	"Gaius": {
		"color" : "Colorless",
		"weapon_type" : "Dagger",
		"move_type": "Infantry",
		"weapon": ["Rogue Dagger+", "Rogue Dagger", "Steel Dagger", "Iron Dagger"],
		"passive_a": ["Defiant Atk 3", "Defiant Atk 2", "Defiant Atk 1"],
		"passive_b": ["Pass 3", "Pass 2", "Pass 1"],
		"assist" : ["Rally Speed"],
		"base_stat" : {
			"star-5" : {"hp" : 18, "atk" : 7, "spd" : 10, "def" : 5, "res" : 4},
			"star-4" : {"hp" : 17, "atk" : 7, "spd" : 10, "def" : 4, "res" : 3},
			"star-3" : {"hp" : 17, "atk" : 6, "spd" : 9, "def" : 4, "res" : 3},
			"growth" : {"hp" : 7, "atk" : 6, "spd" : 8, "def" : 4, "res" : 3}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "passive_a" : 1, "passive_b" : 0},
			"star-3" : {"weapon" : 1, "passive_a" : 2, "passive_b" : 1}
		}
	},
	"Gordin": {
		"color" : "Colorless",
		"weapon_type" : "Bow",
		"move_type": "Infantry",
		"weapon": ["Brave Bow+", "Brave Bow", "Steel Bow", "Iron Bow"],
		"passive_a": ["Attack +3", "Attack +2", "Attack +1"],
		"passive_b": ["Vantage 3", "Vantage 2", "Vantage 1"],
		"assist" : ["Shove"],
		"base_stat" : {
			"star-5" : {"hp" : 19, "atk" : 7, "spd" : 6, "def" : 8, "res" : 4},
			"star-4" : {"hp" : 18, "atk" : 7, "spd" : 5, "def" : 8, "res" : 3},
			"star-3" : {"hp" : 18, "atk" : 6, "spd" : 5, "def" : 7, "res" : 3},
			"growth" : {"hp" : 7, "atk" : 7, "spd" : 5, "def" : 7, "res" : 2}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "passive_a" : 0, "passive_b" : 1},
			"star-3" : {"weapon" : 1, "passive_a" : 1, "passive_b" : 2}
		}
	},
	"Gunter": {
		"color" : "Green",
		"weapon_type" : "Axe",
		"move_type": "Cavalry",
		"weapon": ["Silver Axe+", "Silver Axe", "Steel Axe", "Iron Axe"],
		"passive_a": ["Armored Blow 3", "Armored Blow 2", "Armored Blow 1"],
		"passive_c": ["Hone Cavalry", "Hone Atk 2", "Hone Atk 1"],
		"assist" : ["Harsh Command"],
		"base_stat" : {
			"star-5" : {"hp" : 21, "atk" : 10, "spd" : 7, "def" : 11, "res" : 5},
			"star-4" : {"hp" : 20, "atk" : 10, "spd" : 6, "def" : 11, "res" : 4},
			"star-3" : {"hp" : 20, "atk" : 9, "spd" : 6, "def" : 10, "res" : 4},
			"star-2" : {"hp" : 19, "atk" : 9, "spd" : 5, "def" : 10, "res" : 3},
			"star-1" : {"hp" : 19, "atk" : 8, "spd" : 5, "def" : 9, "res" : 3},
			"growth" : {"hp" : 6, "atk" : 6, "spd" : 4, "def" : 6, "res" : 2}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "assist" : 0, "passive_a" : 1, "passive_c" : 0},
			"star-3" : {"weapon" : 1, "assist" : 0, "passive_a" : 2, "passive_c" : 1},
			"star-2" : {"weapon" : 2, "assist" : -1, "passive_a" : -1, "passive_c" : 1},
			"star-1" : {"weapon" : 3, "assist" : -1, "passive_a" : -1, "passive_c" : 2}
		}
	},
	"Gwendolyn": {
		"color" : "Blue",
		"weapon_type" : "Lance",
		"move_type": "Armored",
		"weapon": ["Killer Lance+", "Killer Lance", "Steel Lance", "Iron Lance"],
		"special": ["Escutcheon", "Buckler"],
		"passive_b": ["Drag Back"],
		"passive_c": ["Hone Atk 3", "Hone Atk 2", "Hone Atk 1"],
		"base_stat" : {
			"star-5" : {"hp" : 23, "atk" : 8, "spd" : 5, "def" : 12, "res" : 6},
			"star-4" : {"hp" : 22, "atk" : 8, "spd" : 4, "def" : 12, "res" : 5},
			"star-3" : {"hp" : 22, "atk" : 7, "spd" : 4, "def" : 11, "res" : 5},
			"growth" : {"hp" : 8, "atk" : 6, "spd" : 5, "def" : 8, "res" : 6}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "special" : 0, "passive_b" : 0, "passive_c" : 0},
			"star-3" : {"weapon" : 1, "special" : 1, "passive_b" : 0, "passive_c" : 1}
		}
	},
	"Hana": {
		"color" : "Red",
		"weapon_type" : "Sword",
		"move_type": "Infantry",
		"weapon": ["Armorslayer+", "Armorslayer", "Steel Sword", "Iron Sword"],
		"passive_a": ["Life and Death 3", "Life and Death 2", "Life and Death 1"],
		"passive_b": ["Obstruct 3", "Obstruct 2", "Obstruct 1"],
		"assist" : ["Rally Attack"],
		"base_stat" : {
			"star-5" : {"hp" : 18, "atk" : 9, "spd" : 10, "def" : 6, "res" : 4},
			"star-4" : {"hp" : 17, "atk" : 9, "spd" : 10, "def" : 5, "res" : 3},
			"star-3" : {"hp" : 17, "atk" : 8, "spd" : 9, "def" : 5, "res" : 3},
			"star-2" : {"hp" : 16, "atk" : 8, "spd" : 9, "def" : 4, "res" : 2},
			"star-1" : {"hp" : 16, "atk" : 7, "spd" : 8, "def" : 4, "res" : 2},
			"growth" : {"hp" : 5, "atk" : 8, "spd" : 8, "def" : 4, "res" : 6}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "assist" : 0, "passive_a" : 1, "passive_b" : 0},
			"star-3" : {"weapon" : 1, "assist" : 0, "passive_a" : 2, "passive_b" : 1},
			"star-2" : {"weapon" : 2, "assist" : -1, "passive_a" : -1, "passive_b" : 1},
			"star-1" : {"weapon" : 3, "assist" : -1, "passive_a" : -1, "passive_b" : 2}
		}
	},
	"Hawkeye": {
		"color" : "Green",
		"weapon_type" : "Axe",
		"move_type": "Infantry",
		"weapon": ["Killer Axe+", "Killer Axe", "Steel Axe", "Iron Axe"],
		"special": ["Growing Light", "Rising Light"],
		"passive_a": ["Death Blow 3", "Death Blow 2", "Death Blow 1"],
		"passive_c": ["Threaten Atk 3", "Threaten Atk 2", "Threaten Atk 1"],
		"base_stat" : {
			"star-5" : {"hp" : 21, "atk" : 9, "spd" : 5, "def" : 6, "res" : 6},
			"star-4" : {"hp" : 20, "atk" : 9, "spd" : 4, "def" : 6, "res" : 5},
			"growth" : {"hp" : 7, "atk" : 7, "spd" : 4, "def" : 6, "res" : 7}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "passive_a" : 1}
		}
	},
	"Hector": {
		"color" : "Green",
		"weapon_type" : "Axe",
		"move_type": "Armored",
		"weapon": ["Armads", "Silver Axe", "Steel Axe", "Iron Axe"],
		"special": ["Pavise", "Buckler"],
		"passive_a": ["Distant Counter"],
		"passive_c": ["Goad Armor", "Spur Attack 2", "Spur Attack 1"],
		"base_stat" : {
			"star-5" : {"hp" : 24, "atk" : 10, "spd" : 5, "def" : 11, "res" : 4},
			"growth" : {"hp" : 9, "atk" : 8, "spd" : 5, "def" : 8, "res" : 3}
		}
	},
	"Henry": {
		"color" : "Red",
		"weapon_type" : "Red Tome",
		"move_type": "Infantry",
		"weapon": ["Rauðrraven+", "Rauðrraven", "Ruin", "Flux"],
		"special": ["Ignis", "Glowing Ember"],
		"passive_a": ["Defiant Def 3", "Defiant Def 2", "Defiant Def 1"],
		"passive_b": ["G Tomebreaker 3", "G Tomebreaker 2", "G Tomebreaker 1"],
		"base_stat" : {
			"star-5" : {"hp" : 19, "atk" : 6, "spd" : 5, "def" : 8, "res" : 6},
			"star-4" : {"hp" : 18, "atk" : 6, "spd" : 4, "def" : 8, "res" : 5},
			"star-3" : {"hp" : 18, "atk" : 5, "spd" : 4, "def" : 7, "res" : 5},
			"growth" : {"hp" : 8, "atk" : 4, "spd" : 4, "def" : 7, "res" : 5}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "special" : 0, "passive_a" : 1, "passive_b" : 0},
			"star-3" : {"weapon" : 1, "special" : 1, "passive_a" : 2, "passive_b" : 1}
		}
	},
	"Hinata": {
		"color" : "Red",
		"weapon_type" : "Sword",
		"move_type": "Infantry",
		"weapon": ["Ruby Sword+", "Ruby Sword", "Steel Sword", "Iron Sword"],
		"special": ["Pavise", "Buckler"],
		"passive_a": ["Fury 3", "Fury 2", "Fury 1"],
		"passive_b": ["Brash Assault 3", "Brash Assault 2", "Brash Assault 1"],
		"base_stat" : {
			"star-5" : {"hp" : 21, "atk" : 8, "spd" : 5, "def" : 10, "res" : 3},
			"star-4" : {"hp" : 20, "atk" : 8, "spd" : 4, "def" : 10, "res" : 2},
			"star-3" : {"hp" : 20, "atk" : 7, "spd" : 4, "def" : 9, "res" : 2},
			"growth" : {"hp" : 8, "atk" : 7, "spd" : 5, "def" : 8, "res" : 3}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "special" : 0, "passive_a" : 0, "passive_b" : 1},
			"star-3" : {"weapon" : 1, "special" : 1, "passive_a" : 1, "passive_b" : 2}
		}
	},
	"Hinoka": {
		"color" : "Blue",
		"weapon_type" : "Lance",
		"move_type": "Flying",
		"weapon": ["Brave Lance+", "Brave Lance", "Steel Lance", "Iron Lance"],
		"special": ["Blazing Wind", "Rising Wind"],
		"passive_a": ["Defiant Def 3", "Defiant Def 2", "Defiant Def 1"],
		"passive_c": ["Hone Fliers", "Hone Spd 2", "Hone Spd 1"],
		"base_stat" : {
			"star-5" : {"hp" : 19, "atk" : 7, "spd" : 8, "def" : 6, "res" : 7},
			"growth" : {"hp" : 6, "atk" : 9, "spd" : 7, "def" : 5, "res" : 4}
		}
	},
	"Ike": {
		"color" : "Red",
		"weapon_type" : "Sword",
		"move_type": "Infantry",
		"weapon": ["Ragnell", "Silver Sword", "Steel Sword", "Iron Sword"],
		"special": ["Aether", "Luna", "New Moon"],
		"passive_a": ["Heavy Blade 3", "Heavy Blade 2", "Heavy Blade 1"],
		"passive_b": ["Swordbreaker 3", "Swordbreaker 2", "Swordbreaker 1"],
		"base_stat" : {
			"star-5" : {"hp" : 18, "atk" : 9, "spd" : 7, "def" : 8, "res" : 5},
			"growth" : {"hp" : 7, "atk" : 8, "spd" : 7, "def" : 7, "res" : 2}
		}
	},
	"Jaffar": {
		"color" : "Colorless",
		"weapon_type" : "Dagger",
		"move_type": "Infantry",
		"weapon": ["Deathly Dagger", "Silver Dagger", "Steel Dagger", "Iron Dagger"],
		"special": ["Glimmer", "Night Sky"],
		"passive_a": ["Life and Death 3", "Life and Death 2", "Life and Death 1"],
		"passive_c": ["Threaten Spd 3", "Threaten Spd 2", "Threaten Spd 1"],
		"base_stat" : {
			"star-5" : {"hp" : 17, "atk" : 7, "spd" : 9, "def" : 6, "res" : 5},
			"growth" : {"hp" : 7, "atk" : 5, "spd" : 7, "def" : 5, "res" : 4}
		}
	},
	"Jagen": {
		"color" : "Blue",
		"weapon_type" : "Lance",
		"move_type": "Cavalry",
		"weapon": ["Silver Lance+", "Silver Lance", "Steel Lance", "Iron Lance"],
		"special": ["Aegis", "Holy Vestments"],
		"passive_a": ["Fury 3", "Fury 2", "Fury 1"],
		"passive_c": ["Fortify Cavalry", "Fortify Res 2", "Fortify Res 1"],
		"base_stat" : {
			"star-5" : {"hp" : 20, "atk" : 8, "spd" : 7, "def" : 8, "res" : 11},
			"star-4" : {"hp" : 19, "atk" : 8, "spd" : 6, "def" : 7, "res" : 11},
			"star-3" : {"hp" : 19, "atk" : 7, "spd" : 6, "def" : 7, "res" : 10},
			"growth" : {"hp" : 4, "atk" : 5, "spd" : 4, "def" : 4, "res" : 7}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "special" : 0, "passive_a" : 1, "passive_c" : 0},
			"star-3" : {"weapon" : 1, "special" : 1, "passive_a" : 2, "passive_c" : 1}
		}
	},
	"Jakob": {
		"color" : "Colorless",
		"weapon_type" : "Dagger",
		"move_type": "Infantry",
		"weapon": ["Silver Dagger+", "Silver Dagger", "Steel Dagger", "Iron Dagger"],
		"passive_a": ["Defense +3", "Defense +2", "Defense +1"],
		"passive_b": ["Renewal 3", "Renewal 2", "Renewal 1"],
		"assist" : ["Rally Resistance"],
		"base_stat" : {
			"star-5" : {"hp" : 17, "atk" : 7, "spd" : 9, "def" : 6, "res" : 5},
			"star-4" : {"hp" : 16, "atk" : 7, "spd" : 9, "def" : 5, "res" : 4},
			"growth" : {"hp" : 6, "atk" : 6, "spd" : 6, "def" : 5, "res" : 5}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "passive_b" : 1}
		}
	},
	"Jeorge": {
		"color" : "Colorless",
		"weapon_type" : "Bow",
		"move_type": "Infantry",
		"weapon": ["Parthia", "Silver Bow", "Steel Bow", "Iron Bow"],
		"special": ["Blazing Flame", "Rising Flame"],
		"passive_b": ["Seal Atk 3", "Seal Atk 2", "Seal Atk 1"],
		"passive_c": ["Spur Spd 3", "Spur Spd 2", "Spur Spd 1"],
		"base_stat" : {
			"star-5" : {"hp" : 18, "atk" : 8, "spd" : 8, "def" : 5, "res" : 5},
			"star-4" : {"hp" : 17, "atk" : 8, "spd" : 8, "def" : 4, "res" : 4},
			"growth" : {"hp" : 5, "atk" : 7, "spd" : 7, "def" : 5, "res" : 4}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "passive_c" : 1}
		}
	},
	"Julia": {
		"color" : "Green",
		"weapon_type" : "Green Tome",
		"move_type": "Infantry",
		"weapon": ["Naga", "Rexcalibur", "Elwind", "Wind"],
		"special": ["Dragon Fang", "Dragon Gaze"],
		"passive_a": ["Resistance +3", "Resistance +2", "Resistance +1"],
		"passive_c": ["Breath of Life 3", "Breath of Life 2", "Breath of Life 1"],
		"base_stat" : {
			"star-5" : {"hp" : 16, "atk" : 9, "spd" : 7, "def" : 4, "res" : 8},
			"growth" : {"hp" : 6, "atk" : 8, "spd" : 5, "def" : 2, "res" : 7}
		}
	},
	"Kagero": {
		"color" : "Colorless",
		"weapon_type" : "Dagger",
		"move_type": "Infantry",
		"weapon": ["Poison Dagger+", "Poison Dagger", "Steel Dagger", "Iron Dagger"],
		"special": ["Reprisal", "Retribution"],
		"passive_a": ["Warding Blow 3", "Warding Blow 2", "Warding Blow 1"],
		"passive_b": ["Daggerbreaker 3", "Daggerbreaker 2", "Daggerbreaker 1"],
		"base_stat" : {
			"star-5" : {"hp" : 16, "atk" : 9, "spd" : 8, "def" : 5, "res" : 6},
			"star-4" : {"hp" : 15, "atk" : 9, "spd" : 8, "def" : 4, "res" : 5},
			"growth" : {"hp" : 3, "atk" : 8, "spd" : 7, "def" : 4, "res" : 6}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "passive_a" : 1}
		}
	},
	"Karel": {
		"color" : "Red",
		"weapon_type" : "Sword",
		"move_type": "Infantry",
		"weapon": ["Wo Dao+", "Wo Dao", "Steel Sword", "Iron Sword"],
		"special": ["Reprisal", "Retribution"],
		"passive_a": ["Defiant Atk 3", "Defiant Atk 2", "Defiant Atk 1"],
		"passive_b": ["Desperation 3", "Desperation 2", "Desperation 1"],
		"base_stat" : {
			"star-5" : {"hp" : 19, "atk" : 8, "spd" : 9, "def" : 6, "res" : 5},
			"growth" : {"hp" : 9, "atk" : 6, "spd" : 8, "def" : 5, "res" : 3}
		}
	},
	"Klein" : {
		"color" : "Colorless",
		"weapon_type" : "Bow",
		"move_type": "Infantry",
		"weapon": ["Brave Bow+", "Brave Bow", "Steel Bow", "Iron Bow"],
		"special": ["Glacies", "Chilling Wind"],
		"passive_a": ["Death Blow 3", "Death Blow 2", "Death Blow 1"],
		"passive_b": ["Quick Riposte 3", "Quick Riposte 2", "Quick Riposte 1"],
		"base_stat" : {
			"star-5" : {"hp" : 18, "atk" : 9, "spd" : 7, "def" : 5, "res" : 5},
			"star-4" : {"hp" : 17, "atk" : 9, "spd" : 7, "def" : 4, "res" : 4},
			"growth" : {"hp" : 6, "atk" : 6, "spd" : 8, "def" : 3, "res" : 5}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "passive_b" : 1}
		}
	},
	"Lachesis" : {
		"color" : "Colorless",
		"weapon_type" : "Staff",
		"move_type": "Infantry",
		"weapon": ["Absorb", "Assault"],
		"special": ["Solid-Earth Balm", "Imbue"],
		"passive_c": ["Spur Res 3", "Spur Res 2", "Spur Res 1"],
		"assist" : ["Physic", "Mend", "Heal"],
		"base_stat" : {
			"star-5" : {"hp" : 17, "atk" : 6, "spd" : 8, "def" : 5, "res" : 8},
			"star-4" : {"hp" : 16, "atk" : 5, "spd" : 8, "def" : 4, "res" : 8},
			"growth" : {"hp" : 6, "atk" : 8, "spd" : 4, "def" : 4, "res" : 6}
		},
		"rarity_restrict" : {
			"star-4" : {"passive_c" : 1}
		}
	},
	"Laslow": {
		"color" : "Red",
		"weapon_type" : "Sword",
		"move_type": "Infantry",
		"weapon": ["Silver Sword+", "Silver Sword", "Steel Sword", "Iron Sword"],
		"special": ["Noontime", "Daylight"],
		"passive_b": ["Axebreaker 3", "Axebreaker 2", "Axebreaker 1"],
		"passive_c": ["Hone Spd 3", "Hone Spd 2", "Hone Spd 1"],
		"base_stat" : {
			"star-5" : {"hp" : 20, "atk" : 9, "spd" : 7, "def" : 6, "res" : 5},
			"star-4" : {"hp" : 19, "atk" : 9, "spd" : 7, "def" : 5, "res" : 4},
			"star-3" : {"hp" : 19, "atk" : 8, "spd" : 6, "def" : 5, "res" : 4},
			"growth" : {"hp" : 7, "atk" : 8, "spd" : 5, "def" : 7, "res" : 4}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "special" : 0, "passive_b" : 0, "passive_c" : 1},
			"star-3" : {"weapon" : 1, "special" : 1, "passive_b" : 1, "passive_c" : 2}
		}
	},
	"Leo": {
		"color" : "Red",
		"weapon_type" : "Red Tome",
		"move_type": "Cavalry",
		"weapon": ["Brynhildr", "Fenrir", "Ruin", "Flux"],
		"special": ["Blazing Light", "Rising Light"],
		"passive_b": ["Quick Riposte 3", "Quick Riposte 2", "Quick Riposte 1"],
		"passive_c": ["Savage Blow 3", "Savage Blow 2", "Savage Blow 1"],
		"base_stat" : {
			"star-5" : {"hp" : 17, "atk" : 7, "spd" : 5, "def" : 6, "res" : 8},
			"growth" : {"hp" : 6, "atk" : 6, "spd" : 4, "def" : 5, "res" : 6}
		}
	},
	"Lilina": {
		"color" : "Red",
		"weapon_type" : "Red Tome",
		"move_type": "Infantry",
		"weapon": ["Bolganone+", "Bolganone", "Elfire", "Fire"],
		"special": ["Growing Flame", "Rising Flame"],
		"passive_a": ["Attack +3", "Attack +2", "Attack +1"],
		"passive_c": ["Spur Atk 3", "Spur Atk 2", "Spur Atk 1"],
		"base_stat" : {
			"star-5" : {"hp" : 16, "atk" : 9, "spd" : 6, "def" : 4, "res" : 9},
			"star-4" : {"hp" : 15, "atk" : 9, "spd" : 5, "def" : 3, "res" : 9},
			"growth" : {"hp" : 5, "atk" : 9, "spd" : 5, "def" : 3, "res" : 6}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "passive_a" : 1}
		}
	},
	"Linde": {
		"color" : "Blue",
		"weapon_type" : "Blue Tome",
		"move_type": "Infantry",
		"weapon": ["Aura", "Thoron", "Elthunder", "Thunder"],
		"passive_a": ["Speed +3", "Speed +2", "Speed +1"],
		"passive_c": ["Fortify Res 3", "Fortify Res 2", "Fortify Res 1"],
		"assist" : ["Ardent Sacrifice"],
		"base_stat" : {
			"star-5" : {"hp" : 16, "atk" : 9, "spd" : 10, "def" : 4, "res" : 5},
			"growth" : {"hp" : 5, "atk" : 8, "spd" : 8, "def" : 1, "res" : 6}
		}
	},
	"Lissa": {
		"color" : "Colorless",
		"weapon_type" : "Staff",
		"move_type": "Infantry",
		"weapon": ["Gravity", "Assault"],
		"special": ["Kindled-Fire Balm", "Imbue"],
		"passive_b": ["Renewal 3", "Renewal 2", "Renewal 1"],
		"assist" : ["Rehabilitate", "Reconcile", "Heal"],
		"base_stat" : {
			"star-5" : {"hp" : 17, "atk" : 7, "spd" : 6, "def" : 6, "res" : 8},
			"star-4" : {"hp" : 16, "atk" : 7, "spd" : 5, "def" : 5, "res" : 8},
			"star-3" : {"hp" : 16, "atk" : 6, "spd" : 5, "def" : 5, "res" : 7},
			"star-2" : {"hp" : 15, "atk" : 6, "spd" : 4, "def" : 4, "res" : 7},
			"star-1" : {"hp" : 15, "atk" : 5, "spd" : 4, "def" : 4, "res" : 6},
			"growth" : {"hp" : 6, "atk" : 5, "spd" : 5, "def" : 6, "res" : 6}
		},
		"rarity_restrict" : {
			"star-4" : {"special" : 0, "assist" : 0, "passive_b" : 1},
			"star-3" : {"special" : 0, "assist" : 1, "passive_b" : 2},
			"star-2" : {"special" : 1, "assist" : 1, "passive_b" : -1},
			"star-1" : {"special" : -1, "assist" : 2, "passive_b" : -1}
		}
	},
	"Lon'qu": {
		"color" : "Red",
		"weapon_type" : "Sword",
		"move_type": "Infantry",
		"weapon": ["Killing Edge+", "Killing Edge", "Steel Sword", "Iron Sword"],
		"special": ["Glimmer", "Night Sky"],
		"passive_a": ["Speed +3", "Speed +2", "Speed +1"],
		"passive_b": ["Vantage 3", "Vantage 2", "Vantage 1"],
		"base_stat" : {
			"star-5" : {"hp" : 19, "atk" : 7, "spd" : 11, "def" : 5, "res" : 5},
			"star-4" : {"hp" : 18, "atk" : 7, "spd" : 11, "def" : 4, "res" : 4},
			"star-3" : {"hp" : 18, "atk" : 6, "spd" : 10, "def" : 4, "res" : 4},
			"growth" : {"hp" : 8, "atk" : 6, "spd" : 9, "def" : 4, "res" : 4}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "special" : 0, "passive_a" : 1, "passive_b" : 0},
			"star-3" : {"weapon" : 1, "special" : 1, "passive_a" : 2, "passive_b" : 1}
		}
	},
	"Lucina": {
		"color" : "Red",
		"weapon_type" : "Sword",
		"move_type": "Infantry",
		"weapon": ["Falchion", "Silver Sword", "Steel Sword", "Iron Sword"],
		"special": ["Aether", "Luna", "New Moon"],
		"passive_a": ["Defiant Spd 3", "Defiant Spd 2", "Defiant Spd 1"],
		"passive_c": ["Spur Atk 3", "Spur Atk 2", "Spur Atk 1"],
		"base_stat" : {
			"star-5" : {"hp" : 19, "atk" : 8, "spd" : 10, "def" : 6, "res" : 4},
			"growth" : {"hp" : 7, "atk" : 8, "spd" : 8, "def" : 5, "res" : 3}
		}
	},
	"Lucina (Spring)": {
		"color" : "Blue",
		"weapon_type" : "Blue Tome",
		"move_type": "Infantry",
		"weapon": ["Blue Egg+", "Blue Egg", "Elthunder", "Thunder"],
		"passive_a": ["Swift Sparrow 2", "Swift Sparrow 1", "Darting Blow 1"],
		"passive_b": ["Seal Res 3", "Seal Res 2", "Seal Res 1"],
		"assist" : ["Rally Speed"],
		"base_stat" : {
			"star-5" : {"hp" : 16, "atk" : 7, "spd" : 10, "def" : 5, "res" : 6},
			"growth" : {"hp" : 5, "atk" : 6, "spd" : 8, "def" : 4, "res" : 5}
		}
	},
	"Lucius": {
		"color" : "Colorless",
		"weapon_type" : "Staff",
		"move_type": "Infantry",
		"weapon": ["Pain", "Assault"],
		"special": ["Miracle", "Imbue"],
		"passive_a": ["HP +5", "HP +4", "HP +3"],
		"assist" : ["Martyr", "Reconcile", "Heal"],
		"base_stat" : {
			"star-5" : {"hp" : 18, "atk" : 6, "spd" : 8, "def" : 3, "res" : 9},
			"star-4" : {"hp" : 17, "atk" : 5, "spd" : 8, "def" : 2, "res" : 9},
			"growth" : {"hp" : 5, "atk" : 8, "spd" : 6, "def" : 1, "res" : 8}
		},
		"rarity_restrict" : {
			"star-4" : {"passive_a" : 1}
		}
	},
	"Lukas": {
		"color" : "Blue",
		"weapon_type" : "Lance",
		"move_type": "Infantry",
		"weapon": ["Killer Lance+", "Killer Lance", "Steel Lance", "Iron Lance"],
		"special": ["Sacred Cowl", "Holy Vestments"],
		"passive_a": ["Fortress Def 3", "Fortress Def 2", "Fortress Def 1"],
		"passive_b": ["Obstruct 3", "Obstruct 2", "Obstruct 1"],
		"base_stat" : {
			"star-5" : {"hp" : 19, "atk" : 9, "spd" : 5, "def" : 10, "res" : 4},
			"star-4" : {"hp" : 18, "atk" : 9, "spd" : 4, "def" : 10, "res" : 3},
			"growth" : {"hp" : 8, "atk" : 8, "spd" : 4, "def" : 9, "res" : 2}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "passive_a" : 1}
		}
	},
	"Lyn": {
		"color" : "Red",
		"weapon_type" : "Sword",
		"move_type": "Infantry",
		"weapon": ["Sol Katti", "Silver Sword", "Steel Sword", "Iron Sword"],
		"special": ["Galeforce", "Astra", "Night Sky"],
		"passive_a": ["Defiant Atk 3", "Defiant Atk 2", "Defiant Atk 1"],
		"passive_c": ["Spur Spd 3", "Spur Spd 2", "Spur Spd 1"],
		"base_stat" : {
			"star-5" : {"hp" : 18, "atk" : 6, "spd" : 11, "def" : 7, "res" : 5},
			"growth" : {"hp" : 5, "atk" : 6, "spd" : 8, "def" : 5, "res" : 7}
		}
	},
	"Maria": {
		"color" : "Colorless",
		"weapon_type" : "Staff",
		"move_type": "Infantry",
		"weapon": ["Panic", "Assault"],
		"special": ["Miracle", "Imbue"],
		"passive_c": ["Fortify Res 3", "Fortify Res 2", "Fortify Res 1"],
		"assist" : ["Physic", "Mend", "Heal"],
		"base_stat" : {
			"star-5" : {"hp" : 17, "atk" : 5, "spd" : 8, "def" : 4, "res" : 10},
			"star-4" : {"hp" : 16, "atk" : 4, "spd" : 8, "def" : 3, "res" : 10},
			"growth" : {"hp" : 5, "atk" : 6, "spd" : 8, "def" : 3, "res" : 6}
		},
		"rarity_restrict" : {
			"star-4" : {"passive_c" : 1}
		}
	},
	"Marth": {
		"color" : "Red",
		"weapon_type" : "Sword",
		"move_type": "Infantry",
		"weapon": ["Falchion", "Silver Sword", "Steel Sword", "Iron Sword"],
		"passive_b": ["Escape Route 3", "Escape Route 2", "Escape Route 1"],
		"passive_c": ["Spur Spd 3", "Spur Spd 2", "Spur Spd 1"],
		"assist" : ["Pivot"],
		"base_stat" : {
			"star-5" : {"hp" : 19, "atk" : 7, "spd" : 8, "def" : 7, "res" : 6},
			"star-4" : {"hp" : 18, "atk" : 7, "spd" : 8, "def" : 6, "res" : 5},
			"growth" : {"hp" : 6, "atk" : 7, "spd" : 8, "def" : 6, "res" : 4}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "passive_b" : 1}
		}
	},
	"Matthew": {
		"color" : "Colorless",
		"weapon_type" : "Dagger",
		"move_type": "Infantry",
		"weapon": ["Rogue Dagger+", "Rogue Dagger", "Steel Dagger", "Iron Dagger"],
		"passive_b": ["Poison Strike 3", "Poison Strike 2", "Poison Strike 1"],
		"passive_c": ["Hone Spd 3", "Hone Spd 2", "Hone Spd 1"],
		"assist" : ["Reciprocal Aid"],
		"base_stat" : {
			"star-5" : {"hp" : 17, "atk" : 6, "spd" : 10, "def" : 6, "res" : 5},
			"star-4" : {"hp" : 16, "atk" : 6, "spd" : 10, "def" : 5, "res" : 4},
			"star-3" : {"hp" : 16, "atk" : 5, "spd" : 9, "def" : 5, "res" : 4},
			"star-2" : {"hp" : 15, "atk" : 5, "spd" : 9, "def" : 4, "res" : 3},
			"growth" : {"hp" : 7, "atk" : 5, "spd" : 7, "def" : 7, "res" : 2}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "assist" : 0, "passive_b" : 1, "passive_c" : 0},
			"star-3" : {"weapon" : 1, "assist" : 0, "passive_b" : 2, "passive_c" : 1},
			"star-2" : {"weapon" : 2, "assist" : -1, "passive_b" : -1, "passive_c" : 1}
		}
	},
	"Merric": {
		"color" : "Green",
		"weapon_type" : "Green Tome",
		"move_type": "Infantry",
		"weapon": ["Excalibur", "Rexcalibur", "Elwind", "Wind"],
		"special": ["Growing Wind", "Rising Wind"],
		"passive_a": ["HP +5", "HP +4", "HP +3"],
		"passive_c": ["Spur Res 3", "Spur Res 2", "Spur Res 1"],
		"base_stat" : {
			"star-5" : {"hp" : 19, "atk" : 7, "spd" : 8, "def" : 6, "res" : 4},
			"star-4" : {"hp" : 18, "atk" : 7, "spd" : 8, "def" : 5, "res" : 3},
			"growth" : {"hp" : 7, "atk" : 5, "spd" : 7, "def" : 6, "res" : 3}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "passive_a" : 1}
		}
	},
	"Michalis": {
		"color" : "Green",
		"weapon_type" : "Axe",
		"move_type": "Flying",
		"weapon": ["Hauteclere", "Silver Axe", "Steel Axe", "Iron Axe"],
		"special": ["Blazing Thunder", "Rising Thunder"],
		"passive_a": ["Iote's Shield"],
		"passive_c": ["Threaten Def 3", "Threaten Def 2", "Threaten Def 1"],
		"base_stat" : {
			"star-5" : {"hp" : 19, "atk" : 8, "spd" : 7, "def" : 9, "res" : 4},
			"star-4" : {"hp" : 18, "atk" : 8, "spd" : 6, "def" : 9, "res" : 3},
			"star-3" : {"hp" : 18, "atk" : 7, "spd" : 6, "def" : 8, "res" : 3},
			"growth" : {"hp" : 7, "atk" : 8, "spd" : 5, "def" : 8, "res" : 3}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "special" : 0, "passive_a" : 0, "passive_c" : 0},
			"star-3" : {"weapon" : 1, "special" : 1, "passive_a" : -1, "passive_c" : 1}
		}
	},
	"Minerva": {
		"color" : "Green",
		"weapon_type" : "Axe",
		"move_type": "Flying",
		"weapon": ["Hauteclere", "Silver Axe", "Steel Axe", "Iron Axe"],
		"special": ["Sacred Cowl", "Holy Vestments"],
		"passive_a": ["Life and Death 3", "Life and Death 2", "Life and Death 1"],
		"passive_c": ["Ward Fliers", "Spur Def 2", "Spur Def 1"],
		"base_stat" : {
			"star-5" : {"hp" : 18, "atk" : 7, "spd" : 9, "def" : 8, "res" : 5},
			"growth" : {"hp" : 6, "atk" : 7, "spd" : 7, "def" : 7, "res" : 4}
		}
	},
	"Mist": {
		"color" : "Colorless",
		"weapon_type" : "Staff",
		"move_type": "Infantry",
		"weapon": ["Slow", "Assault"],
		"special": ["Miracle", "Imbue"],
		"passive_c": ["Spur Def/Res 2", "Spur Def/Res 1", "Spur Res 1"],
		"assist" : ["Recover", "Mend", "Heal"],
		"base_stat" : {
			"star-5" : {"hp" : 17, "atk" : 8, "spd" : 6, "def" : 5, "res" : 8},
			"growth" : {"hp" : 6, "atk" : 5, "spd" : 6, "def" : 3, "res" : 8}
		}
	},
	"Narcian": {
		"color" : "Green",
		"weapon_type" : "Axe",
		"move_type": "Flying",
		"weapon": ["Emerald Axe+", "Emerald Axe", "Steel Axe", "Iron Axe"],
		"special": ["Vengeance", "Retribution"],
		"passive_b": ["Lancebreaker 3", "Lancebreaker 2", "Lancebreaker 1"],
		"passive_c": ["Savage Blow 3", "Savage Blow 2", "Savage Blow 1"],
		"base_stat" : {
			"star-5" : {"hp" : 18, "atk" : 7, "spd" : 7, "def" : 8, "res" : 7},
			"star-4" : {"hp" : 17, "atk" : 7, "spd" : 6, "def" : 8, "res" : 6},
			"star-3" : {"hp" : 17, "atk" : 6, "spd" : 6, "def" : 7, "res" : 6},
			"star-2" : {"hp" : 16, "atk" : 6, "spd" : 5, "def" : 7, "res" : 5},
			"growth" : {"hp" : 7, "atk" : 6, "spd" : 6, "def" : 7, "res" : 5}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "special" : 0, "passive_b" : 0, "passive_c" : 1},
			"star-3" : {"weapon" : 1, "special" : 1, "passive_b" : 1, "passive_c" : 2},
			"star-2" : {"weapon" : 2, "special" : -1, "passive_b" : 2, "passive_c" : -1}
		}
	},
	"Navarre": {
		"color" : "Red",
		"weapon_type" : "Sword",
		"move_type": "Infantry",
		"weapon": ["Killing Edge+", "Killing Edge", "Steel Sword", "Iron Sword"],
		"special": ["Blazing Wind", "Rising Wind"],
		"passive_b": ["Desperation 3", "Desperation 2", "Desperation 1"],
		"passive_c": ["Threaten Spd 3", "Threaten Spd 2", "Threaten Spd 1"],
		"base_stat" : {
			"star-5" : {"hp" : 18, "atk" : 7, "spd" : 11, "def" : 6, "res" : 5},
			"star-4" : {"hp" : 17, "atk" : 7, "spd" : 11, "def" : 5, "res" : 4},
			"star-3" : {"hp" : 17, "atk" : 6, "spd" : 10, "def" : 5, "res" : 4},
			"growth" : {"hp" : 7, "atk" : 7, "spd" : 8, "def" : 4, "res" : 5}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "special" : 0, "passive_b" : 1, "passive_c" : 0},
			"star-3" : {"weapon" : 1, "special" : 1, "passive_b" : 2, "passive_c" : 1}
		}
	},
	"Niles": {
		"color" : "Colorless",
		"weapon_type" : "Bow",
		"move_type": "Infantry",
		"weapon": ["Killer Bow+", "Killer Bow", "Steel Bow", "Iron Bow"],
		"special": ["Iceberg", "Chilling Wind"],
		"passive_a": ["Warding Blow 3", "Warding Blow 2", "Warding Blow 1"],
		"passive_c": ["Spur Res 3", "Spur Res 2", "Spur Res 1"],
		"base_stat" : {
			"star-5" : {"hp" : 18, "atk" : 6, "spd" : 8, "def" : 4, "res" : 8},
			"star-4" : {"hp" : 17, "atk" : 5, "spd" : 8, "def" : 3, "res" : 8},
			"star-3" : {"hp" : 17, "atk" : 5, "spd" : 7, "def" : 3, "res" : 7},
			"growth" : {"hp" : 5, "atk" : 5, "spd" : 8, "def" : 2, "res" : 8}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "special" : 0, "passive_a" : 0, "passive_c" : 1},
			"star-3" : {"weapon" : 1, "special" : 1, "passive_a" : 1, "passive_c" : 2}
		}
	},
	"Ninian": {
		"color" : "Blue",
		"weapon_type" : "Blue Breath",
		"move_type": "Infantry",
		"weapon": ["Light Breath+ (Blue)", "Light Breath (Blue)", "Fire Breath+ (Blue)", "Fire Breath (Blue)"],
		"passive_b": ["Escape Route 3", "Escape Route 2", "Escape Route 1"],
		"passive_c": ["Fortify Dragons", "Fortify Def 2", "Fortify Def 1"],
		"assist" : ["Dance"],
		"base_stat" : {
			"star-5" : {"hp" : 16, "atk" : 5, "spd" : 7, "def" : 6, "res" : 5},
			"growth" : {"hp" : 8, "atk" : 5, "spd" : 8, "def" : 4, "res" : 6}
		}
	},
	"Nino": {
		"color" : "Green",
		"weapon_type" : "Green Tome",
		"move_type": "Infantry",
		"weapon": ["Gronnblade+", "Gronnblade", "Elwind", "Wind"],
		"passive_a": ["Resistance +3", "Resistance +2", "Resistance +1"],
		"passive_c": ["Hone Atk 3", "Hone Atk 2", "Hone Atk 1"],
		"assist" : ["Draw Back"],
		"base_stat" : {
			"star-5" : {"hp" : 16, "atk" : 7, "spd" : 10, "def" : 4, "res" : 7},
			"star-4" : {"hp" : 15, "atk" : 7, "spd" : 10, "def" : 3, "res" : 6},
			"star-3" : {"hp" : 15, "atk" : 6, "spd" : 9, "def" : 3, "res" : 6},
			"growth" : {"hp" : 4, "atk" : 8, "spd" : 8, "def" : 3, "res" : 5}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "passive_a" : 0, "passive_c" : 1},
			"star-3" : {"weapon" : 1, "passive_a" : 1, "passive_c" : 2}
		}
	},
	"Nowi": {
		"color" : "Blue",
		"weapon_type" : "Blue Breath",
		"move_type": "Infantry",
		"weapon": ["Lightning Breath+ (Blue)", "Lightning Breath (Blue)", "Fire Breath+ (Blue)", "Fire Breath (Blue)"],
		"passive_a": ["Defense +3", "Defense +2", "Defense +1"],
		"passive_c": ["Threaten Res 3", "Threaten Res 2", "Threaten Res 1"],
		"assist" : ["Rally Defense"],
		"base_stat" : {
			"star-5" : {"hp" : 17, "atk" : 6, "spd" : 5, "def" : 6, "res" : 5},
			"star-4" : {"hp" : 16, "atk" : 6, "spd" : 4, "def" : 6, "res" : 4},
			"growth" : {"hp" : 9, "atk" : 9, "spd" : 6, "def" : 7, "res" : 6}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "passive_a" : 1}
		}
	},
	"Oboro": {
		"color" : "Blue",
		"weapon_type" : "Lance",
		"move_type": "Infantry",
		"weapon": ["Heavy Spear+", "Heavy Spear", "Steel Lance", "Iron Lance"],
		"passive_b": ["Seal Def 3", "Seal Def 2", "Seal Def 1"],
		"passive_c": ["Threaten Res 3", "Threaten Res 2", "Threaten Res 1"],
		"assist" : ["Rally Defense"],
		"base_stat" : {
			"star-5" : {"hp" : 18, "atk" : 8, "spd" : 7, "def" : 9, "res" : 5},
			"star-4" : {"hp" : 17, "atk" : 8, "spd" : 6, "def" : 9, "res" : 4},
			"star-3" : {"hp" : 17, "atk" : 7, "spd" : 6, "def" : 8, "res" : 4},
			"growth" : {"hp" : 6, "atk" : 7, "spd" : 5, "def" : 8, "res" : 5}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "passive_b" : 0, "passive_c" : 1},
			"star-3" : {"weapon" : 1, "passive_b" : 1, "passive_c" : 2}
		}
	},
	"Odin": {
		"color" : "Blue",
		"weapon_type" : "Blue Tome",
		"move_type": "Infantry",
		"weapon": ["Blárblade+", "Blárblade", "Elthunder", "Thunder"],
		"special": ["Moonbow", "New Moon"],
		"passive_a": ["Defiant Atk 3", "Defiant Atk 2", "Defiant Atk 1"],
		"passive_b": ["R Tomebreaker 3", "R Tomebreaker 2", "R Tomebreaker 1"],
		"base_stat" : {
			"star-5" : {"hp" : 19, "atk" : 5, "spd" : 8, "def" : 6, "res" : 6},
			"star-4" : {"hp" : 18, "atk" : 4, "spd" : 8, "def" : 6, "res" : 5},
			"star-3" : {"hp" : 18, "atk" : 4, "spd" : 7, "def" : 5, "res" : 5},
			"growth" : {"hp" : 7, "atk" : 4, "spd" : 7, "def" : 5, "res" : 5}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "special" : 0, "passive_a" : 1, "passive_b" : 0},
			"star-3" : {"weapon" : 1, "special" : 1, "passive_a" : 2, "passive_b" : 1}
		}
	},
	"Ogma": {
		"color" : "Red",
		"weapon_type" : "Sword",
		"move_type": "Infantry",
		"weapon": ["Brave Sword+", "Brave Sword", "Steel Sword", "Iron Sword"],
		"special": ["Noontime", "Daylight"],
		"passive_a": ["Defiant Atk 3", "Defiant Atk 2", "Defiant Atk 1"],
		"passive_c": ["Spur Atk 3", "Spur Atk 2", "Spur Atk 1"],
		"base_stat" : {
			"star-5" : {"hp" : 21, "atk" : 7, "spd" : 10, "def" : 6, "res" : 3},
			"star-4" : {"hp" : 20, "atk" : 7, "spd" : 10, "def" : 5, "res" : 2},
			"growth" : {"hp" : 8, "atk" : 9, "spd" : 7, "def" : 6, "res" : 1}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "special" : 1, "passive_c" : 1}
		}
	},
	"Olivia": {
		"color" : "Red",
		"weapon_type" : "Sword",
		"move_type": "Infantry",
		"weapon": ["Silver Sword+", "Silver Sword", "Steel Sword", "Iron Sword"],
		"passive_b": ["Knock Back"],
		"passive_c": ["Hone Atk 3", "Hone Atk 2", "Hone Atk 1"],
		"assist" : ["Dance"],
		"base_stat" : {
			"star-5" : {"hp" : 17, "atk" : 6, "spd" : 7, "def" : 5, "res" : 4},
			"star-4" : {"hp" : 16, "atk" : 6, "spd" : 7, "def" : 4, "res" : 3},
			"star-3" : {"hp" : 16, "atk" : 5, "spd" : 6, "def" : 4, "res" : 3},
			"star-2" : {"hp" : 15, "atk" : 5, "spd" : 6, "def" : 3, "res" : 2},
			"star-1" : {"hp" : 15, "atk" : 4, "spd" : 5, "def" : 3, "res" : 2},
			"growth" : {"hp" : 5, "atk" : 6, "spd" : 8, "def" : 6, "res" : 6}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "assist" : 0, "passive_b" : 0, "passive_c" : 0},
			"star-3" : {"weapon" : 1, "assist" : 0, "passive_b" : 0, "passive_c" : 1},
			"star-2" : {"weapon" : 2, "assist" : -1, "passive_b" : -1, "passive_c" : 1},
			"star-1" : {"weapon" : 3, "assist" : -1, "passive_b" : -1, "passive_c" : 2}
		}
	},
	"Olwen": {
		"color" : "Blue",
		"weapon_type" : "Blue Tome",
		"move_type": "Cavalry",
		"weapon": ["Dire Thunder", "Thoron", "Elthunder", "Thunder"],
		"passive_a": ["Warding Blow 3", "Warding Blow 2", "Warding Blow 1"],
		"passive_c": ["Ward Cavalry", "Spur Res 2", "Spur Res 1"],
		"assist" : ["Reposition"],
		"base_stat" : {
			"star-5" : {"hp" : 17, "atk" : 7, "spd" : 8, "def" : 5, "res" : 6},
			"growth" : {"hp" : 4, "atk" : 5, "spd" : 8, "def" : 3, "res" : 7}
		}
	},
	"Palla": {
		"color" : "Red",
		"weapon_type" : "Sword",
		"move_type": "Flying",
		"weapon": ["Ruby Sword+", "Ruby Sword", "Steel Sword", "Iron Sword"],
		"special": ["Moonbow", "New Moon"],
		"passive_b": ["Wings of Mercy 3", "Wings of Mercy 2", "Wings of Mercy 1"],
		"passive_c": ["Goad Fliers", "Spur Spd 2", "Spur Spd 1"],
		"base_stat" : {
			"star-5" : {"hp" : 18, "atk" : 7, "spd" : 9, "def" : 6, "res" : 7},
			"star-4" : {"hp" : 17, "atk" : 7, "spd" : 9, "def" : 5, "res" : 6},
			"star-3" : {"hp" : 17, "atk" : 6, "spd" : 8, "def" : 5, "res" : 6},
			"growth" : {"hp" : 7, "atk" : 7, "spd" : 6, "def" : 6, "res" : 5}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "special" : 0, "passive_b" : 1, "passive_c" : 0},
			"star-3" : {"weapon" : 1, "special" : 1, "passive_b" : 2, "passive_c" : 1}
		}
	},
	"Peri": {
		"color" : "Blue",
		"weapon_type" : "Lance",
		"move_type": "Cavalry",
		"weapon": ["Killer Lance+", "Killer Lance", "Steel Lance", "Iron Lance"],
		"special": ["Glimmer", "Night Sky"],
		"passive_a": ["Resistance +3", "Resistance +2", "Resistance +1"],
		"passive_c": ["Threaten Def 3", "Threaten Def 2", "Threaten Def 1"],
		"base_stat" : {
			"star-5" : {"hp" : 16, "atk" : 9, "spd" : 9, "def" : 6, "res" : 6},
			"star-4" : {"hp" : 15, "atk" : 9, "spd" : 9, "def" : 5, "res" : 5},
			"growth" : {"hp" : 5, "atk" : 7, "spd" : 7, "def" : 4, "res" : 7}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "passive_a" : 1}
		}
	},
	"Priscilla": {
		"color" : "Colorless",
		"weapon_type" : "Staff",
		"move_type": "Cavalry",
		"weapon": ["Panic", "Assault"],
		"special": ["Still-Water Balm", "Imbue"],
		"passive_c": ["Spur Def 3", "Spur Def 2", "Spur Def 1"],
		"assist" : ["Rehabilitate", "Reconcile", "Heal"],
		"base_stat" : {
			"star-5" : {"hp" : 17, "atk" : 7, "spd" : 7, "def" : 4, "res" : 8},
			"star-4" : {"hp" : 16, "atk" : 7, "spd" : 6, "def" : 3, "res" : 8},
			"growth" : {"hp" : 5, "atk" : 6, "spd" : 6, "def" : 3, "res" : 7}
		},
		"rarity_restrict" : {
			"star-4" : {"passive_c" : 1}
		}
	},
	"Raigh": {
		"color" : "Red",
		"weapon_type" : "Red Tome",
		"move_type": "Infantry",
		"weapon": ["Rauðrwolf+", "Rauðrwolf", "Ruin", "Flux"],
		"passive_a": ["HP +5", "HP +4", "HP +3"],
		"passive_b": ["Seal Res 3", "Seal Res 2", "Seal Res 1"],
		"assist" : ["Rally Attack"],
		"base_stat" : {
			"star-5" : {"hp" : 17, "atk" : 8, "spd" : 7, "def" : 5, "res" : 7},
			"star-4" : {"hp" : 16, "atk" : 8, "spd" : 7, "def" : 4, "res" : 6},
			"star-3" : {"hp" : 16, "atk" : 7, "spd" : 6, "def" : 4, "res" : 6},
			"star-2" : {"hp" : 15, "atk" : 7, "spd" : 6, "def" : 3, "res" : 5},
			"growth" : {"hp" : 5, "atk" : 7, "spd" : 6, "def" : 4, "res" : 6}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "assist" : 0, "passive_a" : 1, "passive_b" : 0},
			"star-3" : {"weapon" : 1, "assist" : 0, "passive_a" : 2, "passive_b" : 1},
			"star-2" : {"weapon" : 2, "assist" : -1, "passive_a" : -1, "passive_b" : 1}
		}
	},
	"Raven": {
		"color" : "Green",
		"weapon_type" : "Axe",
		"move_type": "Infantry",
		"weapon": ["Brave Axe+", "Brave Axe", "Steel Axe", "Iron Axe"],
		"special": ["Sol", "Daylight"],
		"passive_a": ["Defiant Spd 3", "Defiant Spd 2", "Defiant Spd 1"],
		"passive_c": ["Threaten Def 3", "Threaten Def 2", "Threaten Def 1"],
		"base_stat" : {
			"star-5" : {"hp" : 19, "atk" : 8, "spd" : 9, "def" : 6, "res" : 5},
			"star-4" : {"hp" : 18, "atk" : 8, "spd" : 9, "def" : 5, "res" : 4},
			"growth" : {"hp" : 6, "atk" : 8, "spd" : 8, "def" : 5, "res" : 4}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "passive_c" : 1}
		}
	},
	"Rebecca": {
		"color" : "Colorless",
		"weapon_type" : "Bow",
		"move_type": "Infantry",
		"weapon": ["Silver Bow+", "Silver Bow", "Steel Bow", "Iron Bow"],
		"passive_a": ["Darting Blow 3", "Darting Blow 2", "Darting Blow 1"],
		"passive_b": ["Seal Atk 3", "Seal Atk 2", "Seal Atk 1"],
		"assist" : ["Ardent Sacrifice"],
		"base_stat" : {
			"star-5" : {"hp" : 18, "atk" : 7, "spd" : 8, "def" : 6, "res" : 5},
			"star-4" : {"hp" : 17, "atk" : 7, "spd" : 8, "def" : 5, "res" : 4},
			"growth" : {"hp" : 5, "atk" : 6, "spd" : 8, "def" : 3, "res" : 6}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "passive_b" : 1}
		}
	},
	"Reinhardt": {
		"color" : "Blue",
		"weapon_type" : "Blue Tome",
		"move_type": "Cavalry",
		"weapon": ["Dire Thunder", "Thoron", "Elthunder", "Thunder"],
		"special": ["Blazing Thunder", "Rising Thunder"],
		"passive_b": ["Vantage 3", "Vantage 2", "Vantage 1"],
		"passive_c": ["Goad Cavalry", "Spur Atk 2", "Spur Atk 1"],
		"base_stat" : {
			"star-5" : {"hp" : 16, "atk" : 8, "spd" : 6, "def" : 5, "res" : 8},
			"star-4" : {"hp" : 15, "atk" : 8, "spd" : 5, "def" : 4, "res" : 8},
			"growth" : {"hp" : 6, "atk" : 7, "spd" : 4, "def" : 6, "res" : 4}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "passive_c" : 1}
		}
	},
	"Robin (F)": {
		"color" : "Green",
		"weapon_type" : "Green Tome",
		"move_type": "Infantry",
		"weapon": ["Gronnwolf+", "Gronnwolf", "Elwind", "Wind"],
		"special": ["Ignis", "Glowing Ember"],
		"passive_a": ["Defiant Res 3", "Defiant Res 2", "Defiant Res 1"],
		"passive_b": ["B Tomebreaker 3", "B Tomebreaker 2", "B Tomebreaker 1"],
		"base_stat" : {
			"star-5" : {"hp" : 18, "atk" : 7, "spd" : 7, "def" : 7, "res" : 5},
			"star-4" : {"hp" : 17, "atk" : 7, "spd" : 7, "def" : 6, "res" : 4},
			"star-3" : {"hp" : 17, "atk" : 6, "spd" : 6, "def" : 6, "res" : 4},
			"star-2" : {"hp" : 16, "atk" : 6, "spd" : 6, "def" : 5, "res" : 3},
			"growth" : {"hp" : 6, "atk" : 6, "spd" : 6, "def" : 6, "res" : 4}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "special" : 0, "passive_a" : 1, "passive_b" : 0},
			"star-3" : {"weapon" : 1, "special" : 1, "passive_a" : 2, "passive_b" : 1},
			"star-2" : {"weapon" : 2, "special" : -1, "passive_a" : -1, "passive_b" : 2}
		}
	},
	"Robin (M)": {
		"color" : "Blue",
		"weapon_type" : "Blue Tome",
		"move_type": "Infantry",
		"weapon": ["Blárraven+", "Blárraven", "Elthunder", "Thunder"],
		"special": ["Bonfire", "Glowing Ember"],
		"passive_a": ["Defiant Spd 3", "Defiant Spd 2", "Defiant Spd 1"],
		"passive_c": ["Spur Def 3", "Spur Def 2", "Spur Def 1"],
		"base_stat" : {
			"star-5" : {"hp" : 18, "atk" : 7, "spd" : 7, "def" : 7, "res" : 5},
			"star-4" : {"hp" : 17, "atk" : 7, "spd" : 7, "def" : 6, "res" : 4},
			"star-3" : {"hp" : 17, "atk" : 6, "spd" : 6, "def" : 6, "res" : 4},
			"growth" : {"hp" : 6, "atk" : 6, "spd" : 6, "def" : 6, "res" : 4}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "special" : 0, "passive_a" : 1, "passive_c" : 0},
			"star-3" : {"weapon" : 1, "special" : 1, "passive_a" : 2, "passive_c" : 1}
		}
	},
	"Roy": {
		"color" : "Red",
		"weapon_type" : "Sword",
		"move_type": "Infantry",
		"weapon": ["Binding Blade", "Silver Sword", "Steel Sword", "Iron Sword"],
		"passive_a": ["Triangle Adept 3", "Triangle Adept 2", "Triangle Adept 1"],
		"passive_b": ["Seal Def 3", "Seal Def 2", "Seal Def 1"],
		"assist" : ["Shove"],
		"base_stat" : {
			"star-5" : {"hp" : 20, "atk" : 8, "spd" : 9, "def" : 6, "res" : 4},
			"star-4" : {"hp" : 19, "atk" : 8, "spd" : 9, "def" : 5, "res" : 3},
			"growth" : {"hp" : 7, "atk" : 6, "spd" : 6, "def" : 5, "res" : 7}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "passive_b" : 1}
		}
	},
	"Ryoma": {
		"color" : "Red",
		"weapon_type" : "Sword",
		"move_type": "Infantry",
		"weapon": ["Raijinto", "Silver Sword", "Steel Sword", "Iron Sword"],
		"special": ["Astra", "Night Sky"],
		"passive_a": ["Defiant Atk 3", "Defiant Atk 2", "Defiant Atk 1"],
		"passive_c": ["Hone Spd 3", "Hone Spd 2", "Hone Spd 1"],
		"base_stat" : {
			"star-5" : {"hp" : 19, "atk" : 8, "spd" : 11, "def" : 5, "res" : 4},
			"growth" : {"hp" : 6, "atk" : 8, "spd" : 7, "def" : 6, "res" : 4}
		}
	},
	"Saizo": {
		"color" : "Colorless",
		"weapon_type" : "Dagger",
		"move_type": "Infantry",
		"weapon": ["Smoke Dagger+", "Smoke Dagger", "Steel Dagger", "Iron Dagger"],
		"passive_b": ["Poison Strike 3", "Poison Strike 2", "Poison Strike 1"],
		"passive_c": ["Spur Spd 3", "Spur Spd 2", "Spur Spd 1"],
		"assist" : ["Harsh Command"],
		"base_stat" : {
			"star-5" : {"hp" : 17, "atk" : 7, "spd" : 8, "def" : 9, "res" : 3},
			"star-4" : {"hp" : 16, "atk" : 6, "spd" : 8, "def" : 9, "res" : 2},
			"star-3" : {"hp" : 16, "atk" : 6, "spd" : 7, "def" : 8, "res" : 2},
			"growth" : {"hp" : 5, "atk" : 6, "spd" : 8, "def" : 7, "res" : 2}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "passive_b" : 0, "passive_c" : 1},
			"star-3" : {"weapon" : 1, "passive_b" : 1, "passive_c" : 2}
		}
	},
	"Sakura": {
		"color" : "Colorless",
		"weapon_type" : "Staff",
		"move_type": "Infantry",
		"weapon": ["Fear", "Assault"],
		"special": ["Still-Water Balm", "Imbue"],
		"passive_c": ["Fortify Def 3", "Fortify Def 2", "Fortify Def 1"],
		"assist" : ["Physic", "Mend", "Heal"],
		"base_stat" : {
			"star-5" : {"hp" : 17, "atk" : 6, "spd" : 8, "def" : 5, "res" : 8},
			"star-4" : {"hp" : 16, "atk" : 5, "spd" : 8, "def" : 4, "res" : 8},
			"growth" : {"hp" : 5, "atk" : 6, "spd" : 6, "def" : 5, "res" : 6}
		},
		"rarity_restrict" : {
			"star-4" : {"passive_c" : 1}
		}
	}, 
	"Sanaki" : {
		"color" : "Red",
		"weapon_type" : "Red Tome",
		"move_type": "Infantry",
		"weapon": ["Cymbeline", "Bolganone", "Elfire", "Fire"],
		"passive_a": ["Triangle Adept 3", "Triangle Adept 2", "Triangle Adept 1"],
		"passive_c": ["Hone Atk 3", "Hone Atk 2", "Hone Atk 1"],
		"assist" : ["Harsh Command"],
		"base_stat" : {
			"star-5" : {"hp" : 16, "atk" : 9, "spd" : 7, "def" : 4, "res" : 8},
			"growth" : {"hp" : 4, "atk" : 9, "spd" : 5, "def" : 2, "res" : 8}
		}
	},
	"Selena": {
		"color" : "Red",
		"weapon_type" : "Sword",
		"move_type": "Infantry",
		"weapon": ["Armorslayer+", "Armorslayer", "Steel Sword", "Iron Sword"],
		"passive_a": ["Triangle Adept 3", "Triangle Adept 2", "Triangle Adept 1"],
		"passive_c": ["Threaten Spd 3", "Threaten Spd 2", "Threaten Spd 1"],
		"assist" : ["Reposition"],
		"base_stat" : {
			"star-5" : {"hp" : 18, "atk" : 6, "spd" : 9, "def" : 8, "res" : 6},
			"star-4" : {"hp" : 17, "atk" : 5, "spd" : 9, "def" : 8, "res" : 5},
			"star-3" : {"hp" : 17, "atk" : 5, "spd" : 8, "def" : 7, "res" : 5},
			"growth" : {"hp" : 5, "atk" : 5, "spd" : 8, "def" : 7, "res" : 6}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "passive_a" : 1, "passive_c" : 0},
			"star-3" : {"weapon" : 1, "passive_a" : 2, "passive_c" : 1}
		}
	},
	"Seliph": {
		"color" : "Red",
		"weapon_type" : "Sword",
		"move_type": "Infantry",
		"weapon": ["Tyrfing", "Silver Sword", "Steel Sword", "Iron Sword"],
		"passive_a": ["HP +5", "HP +4", "HP +3"],
		"passive_b": ["Brash Assault 3", "Brash Assault 2", "Brash Assault 1"],
		"assist" : ["Rally Speed"],
		"base_stat" : {
			"star-5" : {"hp" : 19, "atk" : 8, "spd" : 7, "def" : 8, "res" : 5},
			"star-4" : {"hp" : 18, "atk" : 8, "spd" : 6, "def" : 8, "res" : 4},
			"growth" : {"hp" : 9, "atk" : 8, "spd" : 4, "def" : 6, "res" : 4}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "passive_b" : 1}
		}
	},
	"Serra": {
		"color" : "Colorless",
		"weapon_type" : "Staff",
		"move_type": "Infantry",
		"weapon": ["Absorb", "Assault"],
		"special": ["Swift-Winds Balm", "Imbue"],
		"passive_c": ["Hone Atk 3", "Hone Atk 2", "Hone Atk 1"],
		"assist" : ["Recover", "Mend", "Heal"],
		"base_stat" : {
			"star-5" : {"hp" : 16, "atk" : 6, "spd" : 9, "def" : 4, "res" : 9},
			"star-4" : {"hp" : 15, "atk" : 5, "spd" : 9, "def" : 3, "res" : 9},
			"star-3" : {"hp" : 15, "atk" : 5, "spd" : 8, "def" : 3, "res" : 8},
			"growth" : {"hp" : 4, "atk" : 7, "spd" : 6, "def" : 4, "res" : 7}
		},
		"rarity_restrict" : {
			"star-4" : {"passive_c" : 1},
			"star-3" : {"passive_c" : 2}
		}
	},
	"Setsuna": {
		"color" : "Colorless",
		"weapon_type" : "Bow",
		"move_type": "Infantry",
		"weapon": ["Assassin's Bow+", "Assassin's Bow", "Steel Bow", "Iron Bow"],
		"passive_a": ["HP +5", "HP +4", "HP +3"],
		"passive_b": ["Bowbreaker 3", "Bowbreaker 2", "Bowbreaker 1"],
		"assist" : ["Reciprocal Aid"],
		"base_stat" : {
			"star-5" : {"hp" : 18, "atk" : 6, "spd" : 9, "def" : 5, "res" : 6},
			"star-4" : {"hp" : 17, "atk" : 6, "spd" : 9, "def" : 4, "res" : 5},
			"star-3" : {"hp" : 17, "atk" : 5, "spd" : 8, "def" : 4, "res" : 5},
			"growth" : {"hp" : 5, "atk" : 6, "spd" : 9, "def" : 4, "res" : 4}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "passive_a" : 1, "passive_b" : 0},
			"star-3" : {"weapon" : 1, "passive_a" : 2, "passive_b" : 1}
		}
	},
	"Shanna": {
		"color" : "Blue",
		"weapon_type" : "Lance",
		"move_type": "Flying",
		"weapon": ["Killer Lance+", "Killer Lance", "Steel Lance", "Iron Lance"],
		"special": ["Iceberg", "Chilling Wind"],
		"passive_b": ["Desperation 3", "Desperation 2", "Desperation 1"],
		"passive_c": ["Threaten Spd 3", "Threaten Spd 2", "Threaten Spd 1"],
		"base_stat" : {
			"star-5" : {"hp" : 17, "atk" : 8, "spd" : 9, "def" : 6, "res" : 7},
			"star-4" : {"hp" : 16, "atk" : 8, "spd" : 9, "def" : 5, "res" : 6},
			"star-3" : {"hp" : 16, "atk" : 7, "spd" : 8, "def" : 5, "res" : 6},
			"growth" : {"hp" : 6, "atk" : 6, "spd" : 8, "def" : 5, "res" : 6}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "special" : 0, "passive_b" : 0, "passive_c" : 1},
			"star-3" : {"weapon" : 1, "special" : 1, "passive_b" : 1, "passive_c" : 2}
		}
	},
	"Sharena": {
		"color" : "Blue",
		"weapon_type" : "Lance",
		"move_type": "Infantry",
		"weapon": ["Fensalir", "Silver Lance", "Steel Lance", "Iron Lance"],
		"passive_a": ["Speed +3", "Speed +2", "Speed +1"],
		"passive_c": ["Fortify Def 3", "Fortify Def 2", "Fortify Def 1"],
		"assist" : ["Rally Attack"],
		"base_stat" : {
			"star-5" : {"hp" : 19, "atk" : 8, "spd" : 8, "def" : 7, "res" : 5},
			"star-4" : {"hp" : 18, "atk" : 8, "spd" : 8, "def" : 6, "res" : 4},
			"star-3" : {"hp" : 18, "atk" : 7, "spd" : 7, "def" : 6, "res" : 4},
			"star-2" : {"hp" : 17, "atk" : 7, "spd" : 7, "def" : 5, "res" : 3},
			"growth" : {"hp" : 7, "atk" : 7, "spd" : 7, "def" : 6, "res" : 4}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "passive_a" : 0, "passive_c" : 1},
			"star-3" : {"weapon" : 1, "passive_a" : 1, "passive_c" : 2},
			"star-2" : {"weapon" : 2, "passive_a" : 1, "passive_c" : -1}
		}
	},
	"Sheena": {
		"color" : "Green",
		"weapon_type" : "Axe",
		"move_type": "Armored",
		"weapon": ["Killer Axe+", "Killer Axe", "Steel Axe", "Iron Axe"],
		"special": ["Escutcheon", "Buckler"],
		"passive_a": ["Svalinn Shield"],
		"passive_c": ["Fortify Armor", "Fortify Def 2", "Fortify Def 1"],
		"base_stat" : {
			"star-5" : {"hp" : 21, "atk" : 8, "spd" : 6, "def" : 12, "res" : 7},
			"star-4" : {"hp" : 20, "atk" : 8, "spd" : 5, "def" : 12, "res" : 6},
			"growth" : {"hp" : 7, "atk" : 6, "spd" : 5, "def" : 7, "res" : 8}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1}
		}
	},
	"Sophia": {
		"color" : "Red",
		"weapon_type" : "Red Tome",
		"move_type": "Infantry",
		"weapon": ["Fenrir+", "Fenrir", "Ruin", "Flux"],
		"special": ["Dragon Fang", "Dragon Gaze"],
		"passive_a": ["Warding Blow 3", "Warding Blow 2", "Warding Blow 1"],
		"passive_c": ["Fortify Res 3", "Fortify Res 2", "Fortify Res 1"],
		"base_stat" : {
			"star-5" : {"hp" : 18, "atk" : 9, "spd" : 4, "def" : 6, "res" : 7},
			"star-4" : {"hp" : 17, "atk" : 9, "spd" : 3, "def" : 5, "res" : 7},
			"star-3" : {"hp" : 17, "atk" : 8, "spd" : 3, "def" : 5, "res" : 6},
			"star-2" : {"hp" : 16, "atk" : 8, "spd" : 2, "def" : 4, "res" : 6},
			"star-1" : {"hp" : 16, "atk" : 7, "spd" : 2, "def" : 4, "res" : 5},
			"growth" : {"hp" : 6, "atk" : 7, "spd" : 3, "def" : 6, "res" : 6}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "special" : 0, "passive_a" : 1, "passive_c" : 0},
			"star-3" : {"weapon" : 1, "special" : 1, "passive_a" : 2, "passive_c" : 1},
			"star-2" : {"weapon" : 2, "special" : -1, "passive_a" : -1, "passive_c" : 1},
			"star-1" : {"weapon" : 3, "special" : -1, "passive_a" : -1, "passive_c" : 2}
		}
	},
	"Soren": {
		"color" : "Green",
		"weapon_type" : "Green Tome",
		"move_type": "Infantry",
		"weapon": ["Rexcalibur+", "Rexcalibur", "Elwind", "Wind"],
		"special": ["Growing Wind", "Rising Wind"],
		"passive_b": ["Watersweep 3", "Watersweep 2", "Watersweep 1"],
		"passive_c": ["Fortify Res 3", "Fortify Res 2", "Fortify Res 1"],
		"base_stat" : {
			"star-5" : {"hp" : 17, "atk" : 7, "spd" : 9, "def" : 4, "res" : 7},
			"growth" : {"hp" : 5, "atk" : 8, "spd" : 7, "def" : 2, "res" : 6}
		}
	},
	"Stahl": {
		"color" : "Red",
		"weapon_type" : "Sword",
		"move_type": "Cavalry",
		"weapon": ["Ruby Sword+", "Ruby Sword", "Steel Sword", "Iron Sword"],
		"passive_a": ["Defense +3", "Defense +2", "Defense +1"],
		"passive_b": ["Obstruct 3", "Obstruct 2", "Obstruct 1"],
		"assist" : ["Swap"],
		"base_stat" : {
			"star-5" : {"hp" : 19, "atk" : 7, "spd" : 7, "def" : 8, "res" : 5},
			"star-4" : {"hp" : 18, "atk" : 7, "spd" : 6, "def" : 8, "res" : 4},
			"star-3" : {"hp" : 18, "atk" : 6, "spd" : 6, "def" : 7, "res" : 4},
			"star-2" : {"hp" : 17, "atk" : 6, "spd" : 5, "def" : 7, "res" : 3},
			"star-1" : {"hp" : 17, "atk" : 5, "spd" : 5, "def" : 6, "res" : 3},
			"growth" : {"hp" : 8, "atk" : 7, "spd" : 5, "def" : 6, "res" : 4}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "assist" : 0, "passive_a" : 0, "passive_b" : 1},
			"star-3" : {"weapon" : 1, "assist" : 0, "passive_a" : 1, "passive_b" : 2},
			"star-2" : {"weapon" : 2, "assist" : -1, "passive_a" : 1, "passive_b" : -1},
			"star-1" : {"weapon" : 3, "assist" : -1, "passive_a" : 2, "passive_b" : -1}
		}
	},
	"Subaki": {
		"color" : "Blue",
		"weapon_type" : "Lance",
		"move_type": "Flying",
		"weapon": ["Sapphire Lance+", "Sapphire Lance", "Steel Lance", "Iron Lance"],
		"passive_a": ["Resistance +3", "Resistance +2", "Resistance +1"],
		"passive_b": ["Quick Riposte 3", "Quick Riposte 2", "Quick Riposte 1"],
		"assist" : ["Swap"],
		"base_stat" : {
			"star-5" : {"hp" : 18, "atk" : 6, "spd" : 9, "def" : 9, "res" : 5},
			"star-4" : {"hp" : 17, "atk" : 5, "spd" : 9, "def" : 9, "res" : 4},
			"star-3" : {"hp" : 17, "atk" : 5, "spd" : 8, "def" : 8, "res" : 4},
			"star-2" : {"hp" : 16, "atk" : 4, "spd" : 8, "def" : 8, "res" : 3},
			"star-1" : {"hp" : 16, "atk" : 4, "spd" : 7, "def" : 7, "res" : 3},
			"growth" : {"hp" : 6, "atk" : 5, "spd" : 8, "def" : 8, "res" : 4}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "assist" : 0, "passive_a" : 0, "passive_b" : 1},
			"star-3" : {"weapon" : 1, "assist" : 0, "passive_a" : 1, "passive_b" : 2},
			"star-2" : {"weapon" : 2, "assist" : -1, "passive_a" : 1, "passive_b" : -1},
			"star-1" : {"weapon" : 3, "assist" : -1, "passive_a" : 2, "passive_b" : -1}
		}
	},
	"Sully": {
		"color" : "Blue",
		"weapon_type" : "Lance",
		"move_type": "Cavalry",
		"weapon": ["Sapphire Lance+", "Sapphire Lance", "Steel Lance", "Iron Lance"],
		"passive_b": ["Swordbreaker 3", "Swordbreaker 2", "Swordbreaker 1"],
		"passive_c": ["Spur Def 3", "Spur Def 2", "Spur Def 1"],
		"assist" : ["Draw Back"],
		"base_stat" : {
			"star-5" : {"hp" : 18, "atk" : 7, "spd" : 8, "def" : 7, "res" : 6},
			"star-4" : {"hp" : 17, "atk" : 7, "spd" : 8, "def" : 6, "res" : 5},
			"star-3" : {"hp" : 17, "atk" : 6, "spd" : 7, "def" : 6, "res" : 5},
			"growth" : {"hp" : 7, "atk" : 5, "spd" : 8, "def" : 4, "res" : 6}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "passive_b" : 1, "passive_c" : 0},
			"star-3" : {"weapon" : 1, "passive_b" : 2, "passive_c" : 1}
		}
	},
	"Takumi": {
		"color" : "Colorless",
		"weapon_type" : "Bow",
		"move_type": "Infantry",
		"weapon": ["Fujin Yumi", "Silver Bow", "Steel Bow", "Iron Bow"],
		"special": ["Vengeance", "Retribution"],
		"passive_a": ["Close Counter"],
		"passive_c": ["Threaten Spd 3", "Threaten Spd 2", "Threaten Spd 1"],
		"base_stat" : {
			"star-5" : {"hp" : 18, "atk" : 8, "spd" : 7, "def" : 6, "res" : 5},
			"growth" : {"hp" : 6, "atk" : 7, "spd" : 8, "def" : 5, "res" : 2}
		}
	},
	"Tharja": {
		"color" : "Red",
		"weapon_type" : "Red Tome",
		"move_type": "Infantry",
		"weapon": ["Rauðrblade+", "Rauðrblade", "Ruin", "Flux"],
		"special": ["Vengeance", "Retribution"],
		"passive_a": ["Darting Blow 3", "Darting Blow 2", "Darting Blow 1"],
		"passive_c": ["Spur Res 3", "Spur Res 2", "Spur Res 1"],
		"base_stat" : {
			"star-5" : {"hp" : 17, "atk" : 8, "spd" : 8, "def" : 6, "res" : 5},
			"star-4" : {"hp" : 16, "atk" : 8, "spd" : 8, "def" : 5, "res" : 4},
			"growth" : {"hp" : 6, "atk" : 7, "spd" : 8, "def" : 4, "res" : 3}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "passive_c" : 1}
		}
	},
	"Tiki (Adult)": {
		"color" : "Red",
		"weapon_type" : "Red Breath",
		"move_type": "Infantry",
		"weapon": ["Lightning Breath+ (Red)", "Lightning Breath (Red)", "Fire Breath+ (Red)", "Fire Breath (Red)"],
		"special": ["Bonfire", "Glowing Ember"],
		"passive_a": ["Defiant Atk 3", "Defiant Atk 2", "Defiant Atk 1"],
		"passive_c": ["Spur Res 3", "Spur Res 2", "Spur Res 1"],
		"base_stat" : {
			"star-5" : {"hp" : 18, "atk" : 7, "spd" : 6, "def" : 9, "res" : 7},
			"star-4" : {"hp" : 17, "atk" : 7, "spd" : 5, "def" : 9, "res" : 6},
			"star-3" : {"hp" : 17, "atk" : 6, "spd" : 5, "def" : 8, "res" : 6},
			"growth" : {"hp" : 6, "atk" : 9, "spd" : 4, "def" : 8, "res" : 4}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "special" : 0, "passive_a" : 0, "passive_c" : 1},
			"star-3" : {"weapon" : 1, "special" : 1, "passive_a" : 1, "passive_c" : 2}
		}
	},
	"Tiki (Young)": {
		"color" : "Red",
		"weapon_type" : "Red Breath",
		"move_type": "Infantry",
		"weapon": ["Flametongue+ (Red)", "Flametongue (Red)", "Fire Breath+ (Red)", "Fire Breath (Red)"],
		"special": ["Growing Flame", "Rising Flame"],
		"passive_a": ["Armored Blow 3", "Armored Blow 2", "Armored Blow 1"],
		"passive_c": ["Breath of Life 3", "Breath of Life 2", "Breath of Life 1"],
		"base_stat" : {
			"star-5" : {"hp" : 15, "atk" : 5, "spd" : 4, "def" : 8, "res" : 7},
			"growth" : {"hp" : 8, "atk" : 8, "spd" : 8, "def" : 7, "res" : 6}
		}
	},
	"Titania": {
		"color" : "Green",
		"weapon_type" : "Axe",
		"move_type": "Cavalry",
		"weapon": ["Emerald Axe+", "Emerald Axe", "Steel Axe", "Iron Axe"],
		"passive_a": ["Armored Blow 3", "Armored Blow 2", "Armored Blow 1"],
		"passive_b": ["Guard 3", "Guard 2", "Guard 1"],
		"assist" : ["Reciprocal Aid"],
		"base_stat" : {
			"star-5" : {"hp" : 18, "atk" : 6, "spd" : 8, "def" : 6, "res" : 8},
			"growth" : {"hp" : 5, "atk" : 6, "spd" : 8, "def" : 5, "res" : 6}
		}
	},
	"Ursula": {
		"color" : "Blue",
		"weapon_type" : "Blue Tome",
		"move_type": "Cavalry",
		"weapon": ["Blárwolf+", "Blárwolf", "Elthunder", "Thunder"],
		"special": ["Growing Thunder", "Rising Thunder"],
		"passive_a": ["Death Blow 3", "Death Blow 2", "Death Blow 1"],
		"passive_c": ["Threaten Res 3", "Threaten Res 2", "Threaten Res 1"],
		"base_stat" : {
			"star-5" : {"hp" : 16, "atk" : 7, "spd" : 8, "def" : 4, "res" : 8},
			"star-4" : {"hp" : 15, "atk" : 6, "spd" : 8, "def" : 3, "res" : 8},
			"star-3" : {"hp" : 15, "atk" : 6, "spd" : 7, "def" : 3, "res" : 7},
			"growth" : {"hp" : 5, "atk" : 6, "spd" : 7, "def" : 3, "res" : 6}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "special" : 0, "passive_a" : 1, "passive_c" : 0},
			"star-3" : {"weapon" : 1, "special" : 1, "passive_a" : 2, "passive_c" : 1}
		}
	},
	"Virion": {
		"color" : "Colorless",
		"weapon_type" : "Bow",
		"move_type": "Infantry",
		"weapon": ["Silver Bow+", "Silver Bow", "Steel Bow", "Iron Bow"],
		"special": ["Astra", "Night Sky"],
		"passive_a": ["Defiant Res 3", "Defiant Res 2", "Defiant Res 1"],
		"passive_b": ["Seal Spd 3", "Seal Spd 2", "Seal Spd 1"],
		"base_stat" : {
			"star-5" : {"hp" : 20, "atk" : 7, "spd" : 7, "def" : 7, "res" : 3},
			"star-4" : {"hp" : 19, "atk" : 7, "spd" : 7, "def" : 6, "res" : 2},
			"star-3" : {"hp" : 19, "atk" : 6, "spd" : 6, "def" : 6, "res" : 2},
			"star-2" : {"hp" : 18, "atk" : 6, "spd" : 6, "def" : 5, "res" : 1},
			"star-1" : {"hp" : 18, "atk" : 5, "spd" : 5, "def" : 5, "res" : 1},
			"growth" : {"hp" : 8, "atk" : 7, "spd" : 7, "def" : 5, "res" : 1}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "special" : 0, "passive_a" : 1, "passive_b" : 0},
			"star-3" : {"weapon" : 1, "special" : 1, "passive_a" : 2, "passive_b" : 1},
			"star-2" : {"weapon" : 2, "special" : -1, "passive_a" : -1, "passive_b" : 1},
			"star-1" : {"weapon" : 3, "special" : -1, "passive_a" : -1, "passive_b" : 2}
		}
	},
	"Wrys": {
		"color" : "Colorless",
		"weapon_type" : "Staff",
		"move_type": "Infantry",
		"weapon": ["Slow", "Assault"],
		"special": ["Heavenly Light", "Imbue"],
		"passive_b": ["Live to Serve 3", "Live to Serve 2", "Live to Serve 1"],
		"assist" : ["Rehabilitate", "Reconcile", "Heal"],
		"base_stat" : {
			"star-5" : {"hp" : 18, "atk" : 5, "spd" : 6, "def" : 5, "res" : 10},
			"star-4" : {"hp" : 17, "atk" : 4, "spd" : 6, "def" : 4, "res" : 10},
			"star-3" : {"hp" : 17, "atk" : 4, "spd" : 5, "def" : 4, "res" : 9},
			"star-2" : {"hp" : 16, "atk" : 3, "spd" : 5, "def" : 3, "res" : 9},
			"star-1" : {"hp" : 16, "atk" : 3, "spd" : 4, "def" : 3, "res" : 8},
			"growth" : {"hp" : 7, "atk" : 5, "spd" : 4, "def" : 4, "res" : 8}
		},
		"rarity_restrict" : {
			"star-4" : {"special" : 0, "assist" : 0, "passive_b" : 1},
			"star-3" : {"special" : 0, "assist" : 1, "passive_b" : 2},
			"star-2" : {"special" : 1, "assist" : 1, "passive_b" : -1},
			"star-1" : {"special" : -1, "assist" : 2, "passive_b" : -1}
		}
	},
	"Xander": {
		"color" : "Red",
		"weapon_type" : "Sword",
		"move_type": "Cavalry",
		"weapon": ["Siegfried", "Silver Sword", "Steel Sword", "Iron Sword"],
		"special": ["Blazing Light", "Rising Light"],
		"passive_a": ["Armored Blow 3", "Armored Blow 2", "Armored Blow 1"],
		"passive_c": ["Spur Def 3", "Spur Def 2", "Spur Def 1"],
		"base_stat" : {
			"star-5" : {"hp" : 20, "atk" : 8, "spd" : 5, "def" : 9, "res" : 4},
			"star-4" : {"hp" : 19, "atk" : 8, "spd" : 4, "def" : 9, "res" : 3},
			"star-3" : {"hp" : 19, "atk" : 7, "spd" : 4, "def" : 8, "res" : 3},
			"growth" : {"hp" : 7, "atk" : 7, "spd" : 5, "def" : 9, "res" : 2}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "special" : 0, "passive_a" : 1, "passive_c" : 1},
			"star-3" : {"weapon" : 1, "special" : 1, "passive_a" : 2, "passive_c" : 1}
		}
	},
	"Xander (Spring)": {
		"color" : "Blue",
		"weapon_type" : "Lance",
		"move_type": "Cavalry",
		"weapon": ["Carrot Lance+", "Carrot Lance", "Steel Lance", "Iron Lance"],
		"passive_b": ["Live for Honor"],
		"passive_c": ["Fortify Def 3", "Fortify Def 2", "Fortify Def 1"],
		"assist" : ["Swap"],
		"base_stat" : {
			"star-5" : {"hp" : 18, "atk" : 6, "spd" : 6, "def" : 9, "res" : 7},
			"growth" : {"hp" : 6, "atk" : 5, "spd" : 6, "def" : 8, "res" : 5}
		}
	},
	"Zephiel": {
		"color" : "Red",
		"weapon_type" : "Sword",
		"move_type": "Armored",
		"weapon": ["Eckesachs", "Silver Sword", "Steel Sword", "Iron Sword"],
		"special": ["Reprisal", "Retribution"],
		"passive_a": ["Life and Death 3", "Life and Death 2", "Life and Death 1"],
		"passive_b": ["Wary Fighter 3", "Wary Fighter 2", "Wary Fighter 1"],
		"base_stat" : {
			"star-5" : {"hp" : 25, "atk" : 9, "spd" : 3, "def" : 12, "res" : 5},
			"star-4" : {"hp" : 24, "atk" : 9, "spd" : 2, "def" : 12, "res" : 4},
			"star-3" : {"hp" : 24, "atk" : 8, "spd" : 2, "def" : 11, "res" : 4},
			"growth" : {"hp" : 10, "atk" : 8, "spd" : 2, "def" : 8, "res" : 5}
		},
		"rarity_restrict" : {
			"star-4" : {"weapon" : 1, "special" : 0, "passive_a" : 1, "passive_b" : 0},
			"star-3" : {"weapon" : 1, "special" : 1, "passive_a" : 2, "passive_b" : 1}
		}
	}
};
