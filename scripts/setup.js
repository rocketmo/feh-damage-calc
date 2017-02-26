var HIGHESTSTAT = 99;

// limits number inputs
function limit (num, minNumber) {
	"use strict";
	// check if value is outside of the limits
	if (!$.isNumeric(num.value) || num.value <= minNumber) {
		num.value = minNumber;
	} else if (num.value >= HIGHESTSTAT) {
		num.value = HIGHESTSTAT;
	} else if (Math.floor(num.value) !== num.value) {
		num.value = Math.floor(num.value);
	}
}

// put options in the stat selects
function setupStats () {
	"use strict";
	var options = "<option>0</option>";
	var negOptions = "<option>0</option>";
	
	for (var i = 2; i <= 7; i++) {
		options += "<option value='" + i.toString + "'>" + i.toString() + "</option>";
		negOptions += "<option value=-'" + i.toString + ">-" + i.toString() + "</option>";
	}
	$(".stat-bonus").html(options);
	$(".stat-penalty").html(negOptions);
	
	for (i = 8; i <= 12; i++) {
		options += "<option value='" + i.toString + ">" + i.toString() + "</option>";
	}
	$(".stat-spur").html(options);
}

// displays passive skills
// charInfo contains the character info, charNum determines which panel to display on, type determines the skill type
function showSkills(charInfo, charNum, type) {
	"use strict";
	if (charInfo.hasOwnProperty("passive_" + type)) {
		var skills = "";
		$("#passive-" + type + "-" + charNum).removeAttr("disabled");
		$("#skills-" + charNum + " .passive-" + type + "-label").css("color", "white");
		
		for (var i = 0; i < charInfo["passive_" + type].length; i++) {
			var skillName = charInfo["passive_" + type][i];
			skills += "<option value='" + skillName + "'>" + skillName + "</option>";
		}
		skills += "<option value='None'>None</option>";
		$("#passive-" + type + "-" + charNum).html(skills);
		$("#passive-" + type + "-" + charNum + " option:eq(0)").attr("selected", "selected");
	} else { // no passive skill of the given type
		$("#passive-" + type + "-" + charNum).html("<option value='None'>None</option>");
		$("#passive-" + type + "-" + charNum).attr("disabled", "disabled");
		$("#skills-" + charNum + " .passive-" + type + "-label").css("color", "darkgray");
	}
}

// shows extra weapon info
// selectedWeapon is the weapon to display, weaponInfo contains all weapon data, charNum determines the panel
function showWeapon(selectedWeapon, weaponInfo, charNum) {
	"use strict";
	if (weaponInfo.hasOwnProperty(selectedWeapon)) {
		// show weapon color
		$("#weapon-color-" + charNum).val(weaponInfo[selectedWeapon].color);

		// show weapon type
		$("#weapon-type-" + charNum).val(weaponInfo[selectedWeapon].type);

		// show weapon might
		$("#weapon-might-" + charNum).val(weaponInfo[selectedWeapon].might);

		// show weapon range
		$("#weapon-range-" + charNum).val(weaponInfo[selectedWeapon].range);

		// show magical data
		if (weaponInfo[selectedWeapon].magical) {
			$("#weapon-magical-" + charNum).val("Yes");
		} else {
			$("#weapon-magical-" + charNum).val("No");
		}
	} else {	// weapon not found
		$("#weapon-color-" + charNum).prop("selectedIndex", -1);
		$("#weapon-type-" + charNum).prop("selectedIndex", -1);
		$("#weapon-might-" + charNum).val("");
		$("#weapon-range-" + charNum).prop("selectedIndex", -1);
		$("#weapon-magical-" + charNum).prop("selectedIndex", -1);
	}
}

// show special cooldown values
// selectedSpecial is the special that is being displayed, specInfo contains all special data, charNum determines the panel
function showSpecCooldown (selectedSpecial, specInfo, charNum) {
	"use strict";
	if (specInfo.hasOwnProperty(selectedSpecial)) {
		$("#spec-cooldown-" + charNum).removeAttr("disabled");
		$("#spec-cooldown-line-" + charNum).css("color", "white");
		$("#spec-cooldown-" + charNum).val(specInfo[selectedSpecial].cooldown);
		$("#spec-cooldown-max-" + charNum).text(specInfo[selectedSpecial].cooldown);
	} else { // special not found
		$("#spec-cooldown-" + charNum).val("0");
		$("#spec-cooldown-" + charNum).attr("disabled", "disabled");
		$("#spec-cooldown-max-" + charNum).text("x");
		$("#spec-cooldown-line-" + charNum).css("color", "darkgray");
	}
}

// displays character information in the character panels
// charInfo contains only the character info to display, weaponInfo contains all weapon data, specInfo contains all special data, charNum determines which panel to display on
function displayChar(charInfo, weaponInfo, specInfo, charNum) {
	"use strict";
	if (!charInfo.hasOwnProperty("move_type")) { // no info -> custom option
		// enable inputs
		$("#extra-char-info-" + charNum).css("color", "white");
		$("#skills-" + charNum + " label").css("color", "white");
		$("#extra-char-info-" + charNum + " select").removeAttr("disabled");
		$("#skills-" + charNum + " select").removeAttr("disabled");
		
		// show collapsed section
		$("#extra-char-info-" + charNum).show(700);
		
		// show all skills and weapons
		return;
	}
	
	
	// grey out disabled input fields
	$("#extra-char-info-" + charNum).css("color", "darkgray");
	$("#extra-weapon-info-" + charNum).css("color", "darkgray");
	$("#extra-char-info-" + charNum + " select").attr("disabled", "disabled");
	$("#extra-weapon-info-" + charNum + " select").attr("disabled", "disabled");
	$("#extra-weapon-info-" + charNum + " input").attr("disabled", "disabled");
	
	// show move type
	$("#move-type-" + charNum).val(charInfo.move_type);
	
	// show dragon attribute
	if (charInfo.hasOwnProperty("dragon")) {
		$("#dragon-" + charNum).val("Yes");
	} else {
		$("#dragon-" + charNum).val("No");
	}
	
	// show weapon
	var selectedWeapon = charInfo.weapon[0];
	var weapons = "<option value='" + selectedWeapon + "'>" + selectedWeapon + "</option>";
	for (var weaponIndex = 1; weaponIndex < charInfo.weapon.length; weaponIndex++) {
		weapons += "<option value='" + charInfo.weapon[weaponIndex] + "'>" + charInfo.weapon[weaponIndex] + "</option>";
	}
	weapons += "<option value='None'>None</option>";
	$("#weapon-" + charNum).html(weapons);
	$("#weapon-" + charNum + " option:eq(0)").attr("selected", "selected");
	
	// show extra weapon info
	showWeapon(selectedWeapon, weaponInfo, charNum);
	
	// show stats
	$("#hp-" + charNum + ", #curr-hp-" + charNum).val(charInfo.hp);
	$(".hp-" + charNum + "-read").text(charInfo.hp);
	$("#atk-" + charNum).val(charInfo.atk);
	$("#spd-" + charNum).val(charInfo.spd);
	$("#def-" + charNum).val(charInfo.def);
	$("#res-" + charNum).val(charInfo.res);
	
	// reset buffs/debuffs
	$("#stats-" + charNum + " .stat-bonus, #stats-" + charNum + " .stat-penalty, #stats-" + charNum + " .stat-spur").val(0);
	
	// show passive skills
	showSkills(charInfo, charNum, 'a');
	showSkills(charInfo, charNum, 'b');
	showSkills(charInfo, charNum, 'c');
	
	// show special skill
	if (charInfo.hasOwnProperty("special")) {
		$("#special-" + charNum).removeAttr("disabled");
		$("#skills-" + charNum + " .special-label").css("color", "white");
		
		var selectedSpecial = charInfo.special[0];
		var specials = "<option value='" + selectedSpecial + "'>" + selectedSpecial + "</option>";
		for (var specIndex = 1; specIndex < charInfo.special.length; specIndex++) {
			specials += "<option value='" + charInfo.special[specIndex] + "'>" + charInfo.special[specIndex] + "</option>";
		}
		specials += "<option value='None'>None</option>";
		$("#special-" + charNum).html(specials);
		$("#special-" + charNum + " option:eq(0)").attr("selected", "selected");
		
		// show cooldown values
		showSpecCooldown(selectedSpecial, specInfo, charNum);
		
	} else {
		$("#special-" + charNum).html("<option value='None'>None<option>");
		$("#special-" + charNum).attr("disabled", "disabled");
		$("#spec-cooldown-" + charNum).val("0");
		$("#spec-cooldown-" + charNum).attr("disabled", "disabled");
		$("#skills-" + charNum + " .special-label").css("color", "darkgray");
		$("#spec-cooldown-max-" + charNum).text("x");
		$("#spec-cooldown-line-" + charNum).css("color", "darkgray");
	}
}

// determines if the attacker has triangle advantage
// returns 1 if advamtage, -1 if disadvantage, 0 if neither
function triAdvantage (attackColor, defendColor) {
	"use strict";
	if (attackColor === defendColor || attackColor === "Colorless" || defendColor === "Colorless") {
		return 0;
	} else if ((attackColor === "Red" && defendColor === "Green") || (attackColor === "Green" && defendColor === "Blue") || (attackColor === "Blue" && defendColor === "Red")) {
		return 1;
	}
	
	return -1;
}

// calculates how much damage the attacker will do to the defender in just one attack phase
// battleInfo contains all necessary info for calculation, initiator determines if the battle initiator is attacking or not
// returns the results of the attack phase with an updated log message
function singleCombat(battleInfo, initiator) {
	"use strict";
	
	// log message
	battleInfo.logMsg += "<li class='battle-interaction'>";
	
	// attacker/defender info
	var defClass;
	var attacker;
	var defender;
	
	if (initiator) {
		defClass = "defender";
		attacker = battleInfo.attacker;
		defender = battleInfo.defender;
	} else {
		defClass = "attacker";
		attacker = battleInfo.defender;
		defender = battleInfo.attacker;
	}
	
	battleInfo.logMsg += "<span><strong>" + attacker.name + "</strong> attacks. ";
	
	// determine attack modifier
	var atkPower = attacker.atk;
	var triAdv = triAdvantage(battleInfo.attacker.color, battleInfo.defender.color);
	if (triAdv > 0) {
		atkPower = Math.floor(attacker.atk * 1.2);
		battleInfo.logMsg += "Triangle advantage boosts attack by 1.2. ";
	} else if (triAdv < 0) {
		atkPower = Math.ceil(attacker.atk * 0.8);
		battleInfo.logMsg += "Triangle disadvantage reduces attack by 0.8. ";
	}
	
	// calculate damage
	var dmg = 0;
	if (attacker.magical) {
		dmg = Math.max(atkPower - defender.res, 0);
		// halve staff damage
		if (attacker.type === "Staff") {
			dmg = Math.floor(dmg / 2);
		}
	} else {
		dmg = Math.max(atkPower - defender.def, 0);
	}
	
	var oldHP = defender.currHP;
	defender.currHP = Math.max(defender.currHP - dmg, 0);
	
	battleInfo.logMsg += "<strong>" + dmg.toString() + " damage dealt.</strong><br>";
	battleInfo.logMsg += "<span class='" + defClass + "'><strong>" + defender.name + " HP:</strong> " + oldHP.toString() + " → " + defender.currHP.toString() + "</span></li>";
	
	// store info
	if (initiator) {
		battleInfo.attacker = attacker;
		battleInfo.defender = defender;
	} else {
		battleInfo.attacker = defender;
		battleInfo.defender = attacker;
	}
	
	return battleInfo;
}

// simulates a battle between the characters currently on display and outputs to the battle log and results section
// charInfo contains all character data, weaponInfo contains all weapon data, specInfo contains all special data
function simBattle(charInfo, weaponInfo, specInfo) {
	"use strict";
	
	// contains both attacker, defender info and battle log messages
	var battleInfo = {};
	battleInfo.attacker = {};
	battleInfo.defender = {};
	battleInfo.logMsg = "";
	
	// get all attacker info
	battleInfo.attacker.name = $("#char-1").val();
	battleInfo.attacker.color = $("#weapon-color-1").val();
	battleInfo.attacker.type = $("#weapon-type-1").val();
	battleInfo.attacker.range = parseInt($("#weapon-range-1").val());
	
	if ($("#weapon-magical-1").val() === "Yes") {
		battleInfo.attacker.magical = true;
	} else {
		battleInfo.attacker.magical = false;
	}
	
	battleInfo.attacker.currHP = parseInt($("#curr-hp-1").val());
	battleInfo.attacker.atk = parseInt($("#atk-1").val());
	battleInfo.attacker.spd = parseInt($("#spd-1").val());
	battleInfo.attacker.def = parseInt($("#def-1").val());
	battleInfo.attacker.res = parseInt($("#res-1").val());
	
	// get all defender info
	battleInfo.defender.name = $("#char-2").val();
	battleInfo.defender.color = $("#weapon-color-2").val();
	battleInfo.defender.type = $("#weapon-type-2").val();
	battleInfo.defender.range = parseInt($("#weapon-range-2").val());
	
	if ($("#weapon-magical-2").val() === "Yes") {
		battleInfo.defender.magical = true;
	} else {
		battleInfo.defender.magical = false;
	}
	
	battleInfo.defender.currHP = parseInt($("#curr-hp-2").val());
	battleInfo.defender.atk = parseInt($("#atk-2").val());
	battleInfo.defender.spd = parseInt($("#spd-2").val());
	battleInfo.defender.def = parseInt($("#def-2").val());
	battleInfo.defender.res = parseInt($("#res-2").val());
	
	// attacker initiates
	battleInfo = singleCombat(battleInfo, true);
	
	// defender retaliates
	battleInfo = singleCombat(battleInfo, false);
	
	// display results
	$("#interaction-list").hide().html(battleInfo.logMsg).fadeIn("slow");
	$("#interaction-list").children().last().removeClass("battle-interaction").addClass("battle-interaction-final");
	$("#hp-remain-1").text(battleInfo.attacker.currHP.toString());
	$("#hp-remain-2").text(battleInfo.defender.currHP.toString());
}

// put options in the character selects
function setupChars() {
	"use strict";
	
	// stores all character options
	var options = "";
	
	// retrieve characters and add them to the list of options
	$.getJSON("https://rocketmo.github.io/feh-damage-calc/data/char.json", function(charInfo) {
		$.getJSON("https://rocketmo.github.io/feh-damage-calc/data/weapon.json", function(weaponInfo) {
			$.getJSON("https://rocketmo.github.io/feh-damage-calc/data/special.json", function(specInfo) {
				for (var key in charInfo) {
					if (charInfo.hasOwnProperty(key)) {
						options += "<option value=\"" + key + "\">" + key + "</option>";
					}
				}

				// add to html
				$(".char-selector").html(options);

				// set default characters
				$("#char-1 option:eq(0)").attr("selected", "selected");
				displayChar(charInfo[$("#char-1").val()], weaponInfo, specInfo, "1");
				$("#char-2 option:eq(1)").attr("selected", "selected");
				displayChar(charInfo[$("#char-2").val()], weaponInfo, specInfo, "2");
				
				// simulate initial battle
				simBattle(charInfo, weaponInfo, specInfo);
			});
		});
	});
}

// setup inital page
$(document).ready( function () {
	"use strict";	
	
	// setup show/hide buttons
	$(".collapse-button").on("click", function() {
		// toggle a section
		$("#" + $(this).data("section")).toggle(700);
	});

	// setup number input changes
	$(".more-than-zero").on("change", function () {
		limit(this, 1);	
	});
	$(".zero-or-more").on("change", function () {
		limit(this, 0);	
	});

	// setup hp value updates
	$(".hp-stat").on("change", function () {
		// old value
		var oldHP = parseInt($("#" + this.id + "-denom").text());
		
		// update hp value in rest of the page
		$("." + this.id + "-read").text(this.value);
		
		// check if current hp needs to be updated as well
		if ((this.value < parseInt($("#curr-" + this.id).val())) || parseInt($("#curr-" + this.id).val()) === oldHP) {
			$("#curr-" + this.id).val(this.value);
		}
	});
	$(".curr-hp-val").on("change", function () {
		// current hp cannot be greater than base hp
		var baseHP = parseInt($("#hp-" + $(this).data("charnum")).val());
		if (this.value > baseHP) {
			this.value = baseHP;
		}
	});
	
	// setup special cooldown updates
	$(".spec-cool").on("change", function () {
		var maxCooldown = parseInt($("#spec-cooldown-max-" + $(this).data("charnum")).text());
		if (this.value > maxCooldown) {
			this.value = maxCooldown;
		}
	});
	
	// setup initial display
	setupStats();
	setupChars();
	
	// setup character select
	$("#char-1").on("change", function () {
		$.getJSON("https://rocketmo.github.io/feh-damage-calc/data/char.json", function(charInfo) {
			$.getJSON("https://rocketmo.github.io/feh-damage-calc/data/weapon.json", function(weaponInfo) {
				$.getJSON("https://rocketmo.github.io/feh-damage-calc/data/special.json", function(specInfo) {
					displayChar(charInfo[$("#char-1").val()], weaponInfo, specInfo, "1");
					simBattle(charInfo, weaponInfo, specInfo);
				});
			});
		});
	});
	$("#char-2").on("change", function () {
		$.getJSON("https://rocketmo.github.io/feh-damage-calc/data/char.json", function(charInfo) {
			$.getJSON("https://rocketmo.github.io/feh-damage-calc/data/weapon.json", function(weaponInfo) {
				$.getJSON("https://rocketmo.github.io/feh-damage-calc/data/special.json", function(specInfo) {
					displayChar(charInfo[$("#char-2").val()], weaponInfo, specInfo, "2");
					simBattle(charInfo, weaponInfo, specInfo);
				});
			});
		});
	});
	
	// setup weapon select
	$("#weapon-1").on("change", function () {
		$.getJSON("https://rocketmo.github.io/feh-damage-calc/data/weapon.json", function(weaponInfo) {
			showWeapon($("#weapon-1").val(), weaponInfo, "1");
		});
	});
	$("#weapon-2").on("change", function () {
		$.getJSON("https://rocketmo.github.io/feh-damage-calc/data/weapon.json", function(weaponInfo) {
			showWeapon($("#weapon-2").val(), weaponInfo, "2");
		});
	});
	
	// setup special select
	$("#special-1").on("change", function () {
		$.getJSON("https://rocketmo.github.io/feh-damage-calc/data/special.json", function(specInfo) {
			showSpecCooldown($("#special-1").val(), specInfo, "1");
		});
	});
	$("#special-2").on("change", function () {
		$.getJSON("https://rocketmo.github.io/feh-damage-calc/data/special.json", function(specInfo) {
			showSpecCooldown($("#special-2").val(), specInfo, "2");
		});
	});
});
