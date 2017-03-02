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
	var options = "<option value='0'>0</option>";
	var negOptions = "<option value='0'>0</option>";
	
	for (var i = 2; i <= 7; i++) {
		options += "<option value='" + i.toString() + "'>" + i.toString() + "</option>";
		negOptions += "<option value='-" + i.toString() + "'>-" + i.toString() + "</option>";
	}
	$(".stat-bonus").html(options);
	$(".stat-penalty").html(negOptions);
	
	for (i = 8; i <= 12; i++) {
		options += "<option value='" + i.toString + "'>" + i.toString() + "</option>";
	}
	$(".stat-spur").html(options);
}

// gets special data and stores it
// specInfo contains all special data, charNum determines which panel to display it in
function getSpecialData (specInfo, charNum) {
	"use strict";
	if ($("#special-" + charNum).val() === "None") {
		$("#special-" + charNum).data("info", {});
	} else {
		$("#special-" + charNum).data("info", specInfo[$("#special-" + charNum).val()]);
	}
}

// updates a displayed stat if the given select has a stat_mod property
// selectID is the select's id, charNum determines which panel's stats to change, increment is true if we need to add to the stat total and false otherwise
function updateStatTotal(selectID, charNum, increment) {
	"use strict";
	if ($(selectID).data("info") !== undefined && $(selectID).data("info").hasOwnProperty("stat_mod")) {
		for (var stat in $(selectID).data("info").stat_mod) {
			var total = parseInt($("#" + stat + "-" + charNum).val());
			if (increment) {
				total += $(selectID).data("info").stat_mod[stat];
			} else {
				total -= $(selectID).data("info").stat_mod[stat];
			}
			$("#" + stat + "-" + charNum).val(total);
		}
	}
}

// updates the special cooldown max if the given select has a spec_cooldown_mod property
// selectID is the select's id, charNum determines which panel's stats to change, increment is true if we need to apply mod to the cooldown and false otherwise
function updateSpecCooldown(selectID, charNum, increment) {
	"use strict";
	if ($(selectID).data("info") !== undefined && $(selectID).data("info").hasOwnProperty("spec_cooldown_mod") && $.isNumeric($("#spec-cooldown-max-" + charNum).text())) {
		var max = parseInt($("#spec-cooldown-max-" + charNum).text());
		var oldMax = max;
		if (increment) {
			max += $(selectID).data("info").spec_cooldown_mod;
		} else {
			max -= $(selectID).data("info").spec_cooldown_mod;
		}
		
		// check if current cooldown needs to be fixed
		if ((parseInt($("#spec-cooldown-" + charNum).val()) > max) || (parseInt($("#spec-cooldown-" + charNum).val()) === oldMax)) {
			$("#spec-cooldown-" + charNum).val(max);
		}
		
		$("#spec-cooldown-max-" + charNum).text(max.toString());
	}
}

// gets skill data and stores it
// skillData contains all skill data, charNum determines which panel to display it in, skillType is the letter of the skill, update is true if stats need to be adjusted
function getSkillData (skillInfo, charNum, skillType, update) {
	"use strict";
	var selectID = "#passive-" + skillType + "-" + charNum;
	if ($(selectID).val() === "None") {	// no skill
		if (update) {
			updateStatTotal(selectID, charNum, false);
		}
		$(selectID).data("info", {});
	} else if (update) {
		updateStatTotal(selectID, charNum, false);
		$(selectID).data("info", skillInfo[skillType][$("#passive-" + skillType + "-" + charNum).val()]);
		updateStatTotal(selectID, charNum, true);
	} else {
		$(selectID).data("info", skillInfo[skillType][$("#passive-" + skillType + "-" + charNum).val()]);
	}
}

// displays passive skills
// charInfo contains the character info, skillInfo contains all skill information, charNum determines which panel to display on, type determines the skill type
function showSkills(charInfo, skillInfo, charNum, type) {
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
		$("#skills-" + charNum + " .passive-" + type + "-label").css("color", "#5b5b5b");
	}
	
	// store skill data
	getSkillData(skillInfo, charNum, type, false);
}

// shows extra weapon info
// selectedWeapon is the weapon to display, weaponInfo contains all weapon data, charNum determines the panel
// set update to true to update the character's atk value and remove previous weapon's special cooldown modifier
function showWeapon(selectedWeapon, weaponInfo, charNum, update) {
	"use strict";
	
	var mt = 0;
	if (weaponInfo.hasOwnProperty(selectedWeapon)) {
		// show weapon might
		mt = weaponInfo[selectedWeapon].might;
		$("#weapon-might-" + charNum).text(mt);

		// show weapon range
		$("#weapon-range-" + charNum).text(weaponInfo[selectedWeapon].range);

		// show magical data
		if (weaponInfo[selectedWeapon].magical) {
			$("#weapon-magical-" + charNum).text("Yes");
		} else {
			$("#weapon-magical-" + charNum).text("No");
		}
		
		// store weapon data
		if (update) {
			updateStatTotal("#weapon-" + charNum, charNum, false);
			updateSpecCooldown("#weapon-" + charNum, charNum, false);
			$("#weapon-" + charNum).data("info", weaponInfo[selectedWeapon]);
			updateStatTotal("#weapon-" + charNum, charNum, true);
		} else {
			$("#weapon-" + charNum).data("info", weaponInfo[selectedWeapon]);
		}
		updateSpecCooldown("#weapon-" + charNum, charNum, true);
	} else {	// weapon not found
		$("#weapon-might-" + charNum).text("n/a");
		$("#weapon-range-" + charNum).text("n/a");
		$("#weapon-magical-" + charNum).text("n/a");
		updateStatTotal("#weapon-" + charNum, charNum, false);
		if (update) {
			updateSpecCooldown("#weapon-" + charNum, charNum, false);
		}
		$("#weapon-" + charNum).data("info", {});
	}
	
	// update atk
	if (update) {
		var atk = parseInt($("#atk-" + charNum).val()) + mt - $("#weapon-might-" + charNum).data("oldmt");
		atk = Math.min(atk, HIGHESTSTAT);
		atk = Math.max(atk, 1);
		$("#atk-" + charNum).val(atk);
	}
	$("#weapon-might-" + charNum).data("oldmt", mt);
}

// show special cooldown values
// selectedSpecial is the special that is being displayed, specInfo contains all special data, charNum determines the panel, changeCurr is true if the current cooldown number needs to change
function showSpecCooldown (selectedSpecial, specInfo, charNum, changeCurr) {
	"use strict";
	if (specInfo.hasOwnProperty(selectedSpecial)) {
		var cool = specInfo[selectedSpecial].cooldown;
		var equalsOldCool = false;
		
		if ($.isNumeric($("#spec-cooldown-max-" + charNum).text()) && parseInt($("#spec-cooldown-max-" + charNum).text()) === parseInt($("#spec-cooldown-" + charNum).val())){
			equalsOldCool = true;
		}
		
		if (changeCurr || parseInt($("#spec-cooldown-" + charNum).val()) > cool || $("#spec-cooldown-" + charNum).attr("disabled") !== undefined || equalsOldCool) {
			$("#spec-cooldown-" + charNum).val(cool);
		}
		
		$("#spec-cooldown-" + charNum).removeAttr("disabled");
		$("#spec-cooldown-line-" + charNum).css("color", "white");
		$("#spec-cooldown-max-" + charNum).text(cool);
	} else { // special not found
		$("#spec-cooldown-" + charNum).val("0");
		$("#spec-cooldown-" + charNum).attr("disabled", "disabled");
		$("#spec-cooldown-max-" + charNum).text("x");
		$("#spec-cooldown-line-" + charNum).css("color", "#5b5b5b");
	}
}

// displays character information in the character panels
// charInfo contains only the character info to display, weaponInfo contains all weapon data
// specInfo contains all special data, skillInfo contains all skill data, charNum determines which panel to display on
function displayChar(charInfo, weaponInfo, specInfo, skillInfo, charNum) {
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
	$("#extra-char-info-" + charNum).css("color", "#5b5b5b");
	$("#extra-char-info-" + charNum + " select").attr("disabled", "disabled");
	
	// show color
	$("#color-" + charNum).val(charInfo.color);
	
	// show weapon type
	$("#weapon-type-" + charNum).val(charInfo.weapon_type);
	
	// show move type
	$("#move-type-" + charNum).val(charInfo.move_type);
	
	// show dragon attribute
	if (charInfo.hasOwnProperty("dragon")) {
		$("#dragon-" + charNum).val("Yes");
	} else {
		$("#dragon-" + charNum).val("No");
	}
	
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
	showSkills(charInfo, skillInfo, charNum, 'a');
	showSkills(charInfo, skillInfo, charNum, 'b');
	showSkills(charInfo, skillInfo, charNum, 'c');
	
	// show command skill
	if (charInfo.hasOwnProperty("command")) {
		$("#command-" + charNum).removeAttr("disabled");
		$("#skills-" + charNum + " .command-label").css("color", "white");
		
		var selectedCommand = charInfo.command[0];
		var commands = "<option value='" + selectedCommand + "'>" + selectedCommand + "</option>";
		for (var commandIndex = 1; commandIndex < charInfo.command.length; commandIndex++) {
			commands += "<option value='" + charInfo.command[commandIndex] + "'>" + charInfo.command[commandIndex] + "</option>";
		}
		commands += "<option value='None'>None</option>";
		$("#command-" + charNum).html(commands);
		$("#command-" + charNum + " option:eq(0)").attr("selected", "selected");
	} else {
		$("#command-" + charNum).html("<option value='None'>None<option>");
		$("#command-" + charNum).attr("disabled", "disabled");
		$("#skills-" + charNum + " .command-label").css("color", "#5b5b5b");
	}
	
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
		getSpecialData(specInfo, charNum);
		showSpecCooldown(selectedSpecial, specInfo, charNum, true);
		
	} else {
		$("#special-" + charNum).html("<option value='None'>None<option>");
		$("#special-" + charNum).attr("disabled", "disabled");
		$("#spec-cooldown-" + charNum).val("0");
		$("#spec-cooldown-" + charNum).attr("disabled", "disabled");
		$("#skills-" + charNum + " .special-label").css("color", "#5b5b5b");
		$("#spec-cooldown-max-" + charNum).text("x");
		$("#spec-cooldown-line-" + charNum).css("color", "#5b5b5b");
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
	showWeapon(selectedWeapon, weaponInfo, charNum, false);
}

// determines if the attacker has triangle advantage
// attackColor is the color of the attacker, defendColor is the color of the defender
// returns 1 if advantage, -1 if disadvantage, 0 if neither
function triAdvantage (attackColor, defendColor) {
	"use strict";
	if (attackColor === defendColor || attackColor === "Colorless" || defendColor === "Colorless") {
		return 0;
	} else if ((attackColor === "Red" && defendColor === "Green") || (attackColor === "Green" && defendColor === "Blue") || (attackColor === "Blue" && defendColor === "Red")) {
		return 1;
	}
	
	return -1;
}

// determines if the attacker has a weapon advantage/disadvantage against the other foe's color
// attackColor is the color of the attacker, defendColor is the color of the defender
// attackWeapon is the weapon of the attack, defendWeapon is the weapon of the defender
// returns 1 if advantage, -1 if disadvantage, 0 if neither
function weaponColorAdvantage (attackColor, defendColor, attackWeapon, defendWeapon) {
	"use strict";
	if (attackWeapon.hasOwnProperty("color_effective") && attackWeapon.color_effective === defendColor) {
		return 1;
	} else if (defendWeapon.hasOwnProperty("color_effective") && defendWeapon.color_effective === attackColor) {
		return -1;
	}
	
	return 0;
}

// handles after combat damage
// battleInfo contains all battle information, dmgAmount is the amount of damage to inflict, dmgSource is the source of the damage
function afterCombatDmg (battleInfo, dmgAmount, dmgSource) {
	"use strict";
	var oldHP = battleInfo.defender.currHP;
	battleInfo.defender.currHP = Math.max(oldHP - dmgAmount, 1);
	battleInfo.logMsg += "<li class='battle-interaction'><span class='attacker'><strong>" + battleInfo.attacker.name + "</strong></span> inflicts after-combat damage [" + dmgSource + "]. <span class='dmg'><strong>" + dmgAmount.toString() + " damage dealt.</strong></span><br><span class='defender'><strong>" + battleInfo.defender.name + " HP:</strong> " + oldHP.toString() + " → " + battleInfo.defender.currHP.toString() + "</span></li>";
	
	return battleInfo;
}

// converts a stat abbreviation to the full word
function statWord(stat) {
	"use strict";
	if (stat === "hp") {
		return "HP";
	} else if (stat === "atk") {
		return "attack";
	} else if (stat === "spd") {
		return "speed";
	} else if (stat === "def") {
		return "defense";
	}
	
	return "resistance";
}

// handles bonuses from initiating combat
// battleInfo contains all battle information, statMods contains the stats to modify and the amounts to increase, modSource is the source of the bonuses
function initiateBonus(battleInfo, statMods, modSource) {
	"use strict";
	for (var stat in statMods) {
		battleInfo.attacker[stat] += statMods[stat];
		battleInfo.logMsg += "<li class='battle-interaction'><span class='attacker'><strong>" + battleInfo.attacker.name + "</strong></span> gains " + statMods[stat].toString() + " " + statWord(stat) + " by initiating combat [" + modSource + "].</li>";
	}
	
	return battleInfo;
}

// handles bonuses from getting attacked
// battleInfo contains all battle information, statMods contains the stats to modify and the amounts to increase, modSource is the source of the bonuses
function defendBonus(battleInfo, statMods, modSource) {
	"use strict";
	for (var stat in statMods) {
		battleInfo.defender[stat] += statMods[stat];
		battleInfo.logMsg += "<li class='battle-interaction'><span class='defender'><strong>" + battleInfo.defender.name + "</strong></span> gains " + statMods[stat].toString() + " " + statWord(stat) + " by getting attacked [" + modSource + "].</li>";
	}
	
	return battleInfo;
}

// calculates how much damage the attacker will do to the defender in just one attack phase
// battleInfo contains all necessary info for calculation, initiator determines if the battle initiator is attacking or not
// logIntro describes the attack, brave is true if the attack is the second in a brave attack
// returns the results of the attack phase with an updated log message
function singleCombat(battleInfo, initiator, logIntro, brave) {
	"use strict";
	
	// log message
	battleInfo.logMsg += "<li class='battle-interaction'>";
	
	// attacker/defender info
	var atkClass;
	var defClass;
	var attacker;
	var defender;
	
	if (initiator) {
		atkClass = "attacker";
		defClass = "defender";
		attacker = battleInfo.attacker;
		defender = battleInfo.defender;
	} else {
		atkClass = "defender";
		defClass = "attacker";
		attacker = battleInfo.defender;
		defender = battleInfo.attacker;
	}
	
	battleInfo.logMsg += "<span class='" + atkClass + "'><strong>" + attacker.name + "</strong></span> " + logIntro +". ";
	
	// determine base attack
	var atkPower = attacker.atk;
	
	if (attacker.hasOwnProperty("addBonusAtk") && attacker.addBonusAtk > 0) {
		atkPower += attacker.addBonusAtk;
		battleInfo.logMsg += "Attack is boosted by " + attacker.addBonusAtk.toString() + " [" + attacker.weaponName + "]. ";
	}
	
	// determine attack modifier
	var weaponColorAdv = weaponColorAdvantage(attacker.color, defender.color, attacker.weaponData, defender.weaponData);
	var triAdv = triAdvantage(attacker.color, defender.color);
	var oldHP = defender.currHP;
	var atkMod = 1;
	var roundUp = false;
	
	// triangle advantage
	if (weaponColorAdv > 0) {
		atkMod = 1.2;
		battleInfo.logMsg += "Weapon advantage against " + defender.color + " boosts attack by 20% [" + attacker.weaponName + "]. ";		
	} else if (weaponColorAdv < 0) {
		atkMod = 0.8;
		roundUp = true;
		battleInfo.logMsg += "Weapon disadvantage reduces attack by 20% [" + defender.weaponName + "]. ";
	} else if (triAdv > 0) {
		atkMod = 1.2;
		battleInfo.logMsg += "Triangle advantage boosts attack by 20%. ";
		if (attacker.weaponData.hasOwnProperty("tri_advantage")) {
			atkMod += 0.2;
			battleInfo.logMsg += "Attack is boosted by another 20% [" + attacker.weaponName + "]. ";
		} 
		if (attacker.passiveAData.hasOwnProperty("triangle_boost")) {
			atkMod += attacker.passiveAData.triangle_boost;
			battleInfo.logMsg += "Attack is boosted by another " + (attacker.passiveAData.triangle_boost * 100).toString() + "% [" + attacker.passiveA + "]. ";
		}
	} else if (triAdv < 0) {
		atkMod = 0.8;
		roundUp = true;
		battleInfo.logMsg += "Triangle disadvantage reduces attack by 20%. ";
		if (attacker.weaponData.hasOwnProperty("tri_advantage")) {
			atkMod -= 0.2;
			battleInfo.logMsg += "Attack is reduced by another 20% [" + attacker.weaponName + "]. ";
		} 
		if (attacker.passiveAData.hasOwnProperty("triangle_boost")) {
			atkMod -= attacker.passiveAData.triangle_boost;
			battleInfo.logMsg += "Attack is reduced by another " + (attacker.passiveAData.triangle_boost * 100).toString() + "% [" + attacker.passiveA + "]. ";
		}
	}
	
	// super effectiveness against movement types
	if (attacker.weaponData.hasOwnProperty("move_effective") && attacker.weaponData.move_effective === defender.moveType) {
		atkMod *= 1.5;
		battleInfo.logMsg += "Effectiveness against " + defender.moveType + " boosts attack by 50% [" + attacker.weaponName + "]. ";
	}
	
	// super effectiveness against dragons
	if (attacker.weaponData.hasOwnProperty("dragon_effective") && defender.dragon) {
		atkMod *= 1.5;
		battleInfo.logMsg += "Effectiveness against dragons increases attack by 50% [" + attacker.weaponName + "]. ";
	}
	
	// calculate attack
	if (roundUp) {
		atkPower = Math.ceil(atkPower * atkMod);
	} else if (atkMod > 1) {
		atkPower = Math.floor(atkPower * atkMod);
	}
	
	// calculate damage
	var dmg = 0;
	if (attacker.weaponData.magical) {
		dmg = Math.max(atkPower - defender.res, 0);
		// halve staff damage
		if (attacker.type === "Staff") {
			dmg = Math.floor(dmg / 2);
		}
	} else {
		dmg = Math.max(atkPower - defender.def, 0);
	}
	
	defender.currHP = Math.max(defender.currHP - dmg, 0);
	battleInfo.logMsg += "<span class='dmg'><strong>" + dmg.toString() + " damage dealt.</strong></span> ";
	
	// check for healing
	var healMsg = "";
	if (attacker.weaponData.hasOwnProperty("heal_dmg")) {
		var heal = Math.floor((oldHP - defender.currHP) * attacker.weaponData.heal_dmg);
		var atkOldHP = attacker.currHP;
		attacker.currHP = Math.min(attacker.hp, attacker.currHP + heal);
		battleInfo.logMsg += "Healed by " + (attacker.weaponData.heal_dmg * 100).toString() +"% of damage dealt [" + attacker.weaponName + "]. <span class='dmg'><strong>" + heal.toString() + " health restored. </strong></span>";
		healMsg = " <span class='heal-seperator'>|</span> <span class='" + atkClass + "'><strong>" + attacker.name + " HP:</strong> " + atkOldHP.toString() + " → " + attacker.currHP.toString() + "</span>";
	}
	
	battleInfo.logMsg += "<br><span class='" + defClass + "'><strong>" + defender.name + " HP:</strong> " + oldHP.toString() + " → " + defender.currHP.toString() + "</span>" + healMsg + "</li>";
	
	// store info
	if (initiator) {
		battleInfo.attacker = attacker;
		battleInfo.defender = defender;
	} else {
		battleInfo.attacker = defender;
		battleInfo.defender = attacker;
	}
	
	// check for a brave weapon
	if (initiator && attacker.weaponData.hasOwnProperty("brave") && !brave && defender.currHP > 0) {
		battleInfo = singleCombat(battleInfo, initiator, "attacks again immediately [" + attacker.weaponName + "]", true);
	}
	
	return battleInfo;
}

// simulates a battle between the characters currently on display and outputs to the battle log and results section
function simBattle() {
	"use strict";
	
	// check if attacker has a weapon, if not no attack
	if ($("#weapon-1").val() === "None") {
		$("#interaction-list").hide().html("<li class='battle-interaction-final'><span class='attacker'><strong>" + $("#char-1").val() + "</strong></span> cannot attack without a weapon.</li>");
		$(".hp-remain-block").hide();
		$("#hp-remain-1").text($("#curr-hp-1").val().toString());
		$("#hp-remain-2").text($("#curr-hp-2").val().toString());
		$("#interaction-list").fadeIn("slow");
		$(".hp-remain-block").fadeIn("slow");
		return;
	}
	
	// contains both attacker, defender info and battle log messages
	var battleInfo = {};
	battleInfo.attacker = {};
	battleInfo.defender = {};
	battleInfo.logMsg = "";
	
	// get all attacker info
	battleInfo.attacker.name = $("#char-1").val();
	battleInfo.attacker.color = $("#color-1").val();
	battleInfo.attacker.moveType = $("#move-type-1").val();
	battleInfo.attacker.type = $("#weapon-type-1").val();
	battleInfo.attacker.weaponName = $("#weapon-1").val();
	battleInfo.attacker.weaponData = $("#weapon-1").data("info");
		
	if ($("#dragon-1").val() === "Yes") {
		battleInfo.attacker.dragon = true;
	} else {
		battleInfo.attacker.dragon = false;
	}
	
	if (battleInfo.attacker.weaponData.hasOwnProperty("add_bonus")) {
		battleInfo.attacker.addBonusAtk = parseInt($("#atk-bonus-1").val()) + parseInt($("#spd-bonus-1").val()) + parseInt($("#def-bonus-1").val()) + parseInt($("#res-bonus-1").val());
	}
	
	battleInfo.attacker.passiveA = $("#passive-a-1").val();
	battleInfo.attacker.passiveB = $("#passive-b-1").val();
	battleInfo.attacker.passiveC = $("#passive-c-1").val();
	battleInfo.attacker.passiveAData = $("#passive-a-1").data("info");
	battleInfo.attacker.passiveBData = $("#passive-b-1").data("info");
	battleInfo.attacker.passiveCData = $("#passive-c-1").data("info");
	
	battleInfo.attacker.currHP = parseInt($("#curr-hp-1").val());
	battleInfo.attacker.initHP = parseInt($("#curr-hp-1").val());
	battleInfo.attacker.hp = parseInt($("#hp-1").val());
	battleInfo.attacker.atk = parseInt($("#atk-1").val()) + parseInt($("#atk-bonus-1").val()) + parseInt($("#atk-penalty-1").val()) + parseInt($("#atk-spur-1").val());
	battleInfo.attacker.spd = parseInt($("#spd-1").val()) + parseInt($("#spd-bonus-1").val()) + parseInt($("#spd-penalty-1").val()) + parseInt($("#spd-spur-1").val());
	battleInfo.attacker.def = parseInt($("#def-1").val()) + parseInt($("#def-bonus-1").val()) + parseInt($("#def-penalty-1").val()) + parseInt($("#def-spur-1").val());
	battleInfo.attacker.res = parseInt($("#res-1").val()) + parseInt($("#res-bonus-1").val()) + parseInt($("#res-penalty-1").val()) + parseInt($("#res-spur-1").val());
	
	// get all defender info
	battleInfo.defender.name = $("#char-2").val();
	battleInfo.defender.color = $("#color-2").val();
	battleInfo.defender.moveType = $("#move-type-2").val();
	battleInfo.defender.type = $("#weapon-type-2").val();
	battleInfo.defender.weaponName = $("#weapon-2").val();
	battleInfo.defender.weaponData = $("#weapon-2").data("info");
	
	if ($("#dragon-2").val() === "Yes") {
		battleInfo.defender.dragon = true;
	} else {
		battleInfo.defender.dragon = false;
	}
	
	if (battleInfo.defender.weaponData.hasOwnProperty("add_bonus")) {
		battleInfo.defender.addBonusAtk = parseInt($("#atk-bonus-2").val()) + parseInt($("#spd-bonus-2").val()) + parseInt($("#def-bonus-2").val()) + parseInt($("#res-bonus-2").val());
	}
	
	battleInfo.defender.passiveA = $("#passive-a-2").val();
	battleInfo.defender.passiveB = $("#passive-b-2").val();
	battleInfo.defender.passiveC = $("#passive-c-2").val();
	battleInfo.defender.passiveAData = $("#passive-a-2").data("info");
	battleInfo.defender.passiveBData = $("#passive-b-2").data("info");
	battleInfo.defender.passiveCData = $("#passive-c-2").data("info");
	
	battleInfo.defender.currHP = parseInt($("#curr-hp-2").val());
	battleInfo.defender.initHP = parseInt($("#curr-hp-2").val());
	battleInfo.defender.hp = parseInt($("#hp-2").val());
	battleInfo.defender.atk = parseInt($("#atk-2").val()) + parseInt($("#atk-bonus-2").val()) + parseInt($("#atk-penalty-2").val()) + parseInt($("#atk-spur-2").val());
	battleInfo.defender.spd = parseInt($("#spd-2").val()) + parseInt($("#spd-bonus-2").val()) + parseInt($("#spd-penalty-2").val()) + parseInt($("#spd-spur-2").val());
	battleInfo.defender.def = parseInt($("#def-2").val()) + parseInt($("#def-bonus-2").val()) + parseInt($("#def-penalty-2").val()) + parseInt($("#def-spur-2").val());
	battleInfo.defender.res = parseInt($("#res-2").val()) + parseInt($("#res-bonus-2").val()) + parseInt($("#res-penalty-2").val()) + parseInt($("#res-spur-2").val());
	
	// attacker initate bonus
	if (battleInfo.attacker.weaponData.hasOwnProperty("initiate_mod")) {
		battleInfo = initiateBonus(battleInfo, battleInfo.attacker.weaponData.initiate_mod, battleInfo.attacker.weaponName);
	}
	if (battleInfo.attacker.passiveAData.hasOwnProperty("initiate_mod")) {
		battleInfo = initiateBonus(battleInfo, battleInfo.attacker.passiveAData.initiate_mod, battleInfo.attacker.passiveA);
	}
	
	// defending bonus
	if (battleInfo.defender.weaponData.hasOwnProperty("defend_mod")) {
		battleInfo = defendBonus(battleInfo, battleInfo.defender.weaponData.defend_mod, battleInfo.defender.weaponName);
	}
	
	// attacker initiates
	battleInfo = singleCombat(battleInfo, true, "attacks", false);
	
	// desperation follow up
	var desperation = false;
	if (battleInfo.attacker.weaponData.hasOwnProperty("desperation") && battleInfo.attacker.initHP <= battleInfo.attacker.weaponData.desperation.threshold * battleInfo.attacker.hp) {
		desperation = true;
		battleInfo = singleCombat(battleInfo, true, "makes an immediate follow-up attack [" + battleInfo.attacker.weaponName + "]", false);
	} else if (battleInfo.attacker.passiveBData.hasOwnProperty("desperation") && battleInfo.attacker.initHP <= battleInfo.attacker.passiveBData.desperation.threshold * battleInfo.attacker.hp) {
		desperation = true;
		battleInfo = singleCombat(battleInfo, true, "makes an immediate follow-up attack [" + battleInfo.attacker.passiveB + "]", false);
	}
	
	// defender will try to counter-attack if they haven't been ko'd
	if (battleInfo.defender.currHP > 0) {
		// defender must be in range to counter-attack or have a counter ability
		if (battleInfo.defender.weaponName !== "None" && battleInfo.defender.weaponData.range === battleInfo.attacker.weaponData.range) {
			battleInfo = singleCombat(battleInfo, false, "counter-attacks", false);
		} else if (battleInfo.defender.weaponName !== "None" && battleInfo.defender.weaponData.hasOwnProperty("counter")) {	
			battleInfo = singleCombat(battleInfo, false, "counter-attacks, ignoring distance [" + battleInfo.defender.weaponName + "]", false);
		} else if (battleInfo.defender.weaponName !== "None" && battleInfo.defender.passiveAData.hasOwnProperty("counter")) {	
			battleInfo = singleCombat(battleInfo, false, "counter-attacks, ignoring distance [" + battleInfo.defender.passiveA + "]", false);
		} else {
			battleInfo.logMsg += "<li class='battle-interaction'><span class='defender'><strong>" + battleInfo.defender.name + "</strong></span> " + " is unable to counter-attack.</li>";
		}
		
		// if attacker hasn't been ko'd, check for follow ups
		if (battleInfo.attacker.currHP > 0) {
			var defendFollow = false;
			if (battleInfo.attacker.spd >= battleInfo.defender.spd + 5 && !desperation) { // attacker follows up
				battleInfo = singleCombat(battleInfo, true, "makes a follow-up attack", false);
			} else if ((battleInfo.defender.weaponName !== "None") && (battleInfo.defender.spd >= battleInfo.attacker.spd + 5) && ((battleInfo.defender.weaponData.range === battleInfo.attacker.weaponData.range) || (battleInfo.defender.weaponData.hasOwnProperty("counter")))) { 
				// defender follows up
				battleInfo = singleCombat(battleInfo, false, "makes a follow-up attack", false);
				defendFollow = true;
			}
			
			// check for quick riposte ability
			if (battleInfo.defender.currHP > 0 && !defendFollow) {
				if (battleInfo.defender.weaponData.hasOwnProperty("riposte") && battleInfo.defender.initHP >= battleInfo.defender.weaponData.riposte.threshold * battleInfo.defender.hp) {
					battleInfo = singleCombat(battleInfo, false, "makes an automatic follow-up attack [" + battleInfo.defender.weaponName + "]", false);
				} else if (battleInfo.defender.passiveBData.hasOwnProperty("riposte") && battleInfo.defender.initHP >= battleInfo.defender.passiveBData.riposte.threshold * battleInfo.defender.hp) {
					battleInfo = singleCombat(battleInfo, false, "makes an automatic follow-up attack [" + battleInfo.defender.passiveB + "]", false);
				}
			}
		}
		
		// check for poison damage
		if (battleInfo.attacker.currHP > 0 && battleInfo.defender.currHP > 0) {
			if (battleInfo.attacker.weaponData.hasOwnProperty("poison")) {
				battleInfo = afterCombatDmg(battleInfo, battleInfo.attacker.weaponData.poison, battleInfo.attacker.weaponName);
			}
			if (battleInfo.attacker.passiveBData.hasOwnProperty("poison")) {
				battleInfo = afterCombatDmg(battleInfo, battleInfo.attacker.passiveBData.poison, battleInfo.attacker.passiveB);
			}
		}
	}
	
	// display results
	$("#interaction-list").hide().html(battleInfo.logMsg);
	$(".hp-remain-block").hide();
	$("#hp-remain-1").text(battleInfo.attacker.currHP.toString());
	$("#hp-remain-2").text(battleInfo.defender.currHP.toString());
	$("#interaction-list").children().last().removeClass("battle-interaction").addClass("battle-interaction-final");
	$("#interaction-list").fadeIn("slow");
	$(".hp-remain-block").fadeIn("slow");
}

// put options in the character selects
function setupChars() {
	"use strict";
	
	// stores all character options
	var options = "";
	
	// retrieve characters and add them to the list of options
	for (var key in charInfo) {
		if (charInfo.hasOwnProperty(key)) {
			options += "<option value=\"" + key + "\">" + key + "</option>";
		}
	}

	// add to html
	$(".char-selector").html(options);

	// set default characters
	$("#char-1 option:eq(0)").attr("selected", "selected");
	displayChar(charInfo[$("#char-1").val()], weaponInfo, specInfo, skillInfo, "1");
	$("#char-2 option:eq(1)").attr("selected", "selected");
	displayChar(charInfo[$("#char-2").val()], weaponInfo, specInfo, skillInfo, "2");

	// simulate initial battle
	simBattle();
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
		
		simBattle();
	});
	$(".curr-hp-val").on("change", function () {
		// current hp cannot be greater than base hp
		var baseHP = parseInt($("#hp-" + $(this).data("charnum")).val());
		if (this.value > baseHP) {
			this.value = baseHP;
		}
		
		simBattle();
	});
	
	// setup special cooldown updates
	$(".spec-cool").on("change", function () {
		var maxCooldown = parseInt($("#spec-cooldown-max-" + $(this).data("charnum")).text());
		if (this.value > maxCooldown) {
			this.value = maxCooldown;
		}
		
		simBattle();
	});
	
	// setup initial display
	setupStats();
	setupChars();
	
	// setup character select
	$("#char-1").on("change", function () {
		displayChar(charInfo[$("#char-1").val()], weaponInfo, specInfo, skillInfo, "1");
		simBattle();
	});
	$("#char-2").on("change", function () {
		displayChar(charInfo[$("#char-2").val()], weaponInfo, specInfo, skillInfo, "2");
		simBattle();
	});
	
	// setup weapon select
	$("#weapon-1").on("change", function () {
		showWeapon($("#weapon-1").val(), weaponInfo, "1", true);
		simBattle();
	});
	$("#weapon-2").on("change", function () {
		showWeapon($("#weapon-2").val(), weaponInfo, "2", true);
		simBattle();
	});
	
	// setup special select
	$("#special-1").on("change", function () {
		updateSpecCooldown("#weapon-1", '1', false);
		getSpecialData(specInfo, '1');
		showSpecCooldown($("#special-1").val(), specInfo, "1", false);
		updateSpecCooldown("#weapon-1", '1', true);
		simBattle();
	});
	$("#special-2").on("change", function () {
		updateSpecCooldown("#weapon-2", '2', false);
		getSpecialData(specInfo, '2');
		showSpecCooldown($("#special-2").val(), specInfo, "2", false);
		updateSpecCooldown("#weapon-2", '2', true);
		simBattle();
	});
	
	// setup skill select
	$(".passive-selector").on("change", function () {
		var charNum = $(this).data("charnum").toString();
		var skillType = $(this).data("skilltype");
		getSkillData(skillInfo, charNum, skillType, true);
		simBattle();
	});
	
	// setup other battle value changes
	$(".battle-val").on("change", function () {
		simBattle();
	});
});
