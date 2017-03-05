var HIGHESTSTAT = 99;
var openLog = true;

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
		options += "<option value='" + i.toString() + "'>" + i.toString() + "</option>";
	}
	$(".stat-spur").html(options);
}

// gets special data and stores it
// charNum determines which panel to display it in
function getSpecialData (charNum) {
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
			if ($("#" + stat + "-" + charNum).hasClass("more-than-zero")) {
				limit(document.getElementById(stat + "-" + charNum), 1);
			} else {
				limit(document.getElementById(stat + "-" + charNum), 0);
			}
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
// charNum determines which panel to display it in, skillType is the letter of the skill, update is true if stats need to be adjusted
function getSkillData (charNum, skillType, update) {
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
// singleChar contains the data for a single character, charNum determines which panel to display on, type determines the skill type
function showSkills(singleChar, charNum, type) {
	"use strict";
	if (singleChar.hasOwnProperty("passive_" + type)) {
		var skills = "";
		$("#passive-" + type + "-" + charNum).removeAttr("disabled");
		$("#skills-" + charNum + " .passive-" + type + "-label").css("color", "white");
		
		for (var i = 0; i < singleChar["passive_" + type].length; i++) {
			var skillName = singleChar["passive_" + type][i];
			skills += "<option value=\"" + skillName + "\">" + skillName + "</option>";
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
	getSkillData(charNum, type, false);
}

// shows extra weapon info
// selectedWeapon is the weapon to display, charNum determines the panel
// set update to true to update the character's atk value and remove previous weapon's special cooldown modifier
function showWeapon(selectedWeapon, charNum, update) {
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
// selectedSpecial is the special that is being displayed, charNum determines the panel, changeCurr is true if the current cooldown number needs to change
function showSpecCooldown (selectedSpecial, charNum, changeCurr) {
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

// loads all weapons of the given type
// weaponType is the weapon type to load, charNum determines which panel to load in
function loadWeapons(weaponType, charNum) {
	"use strict";
	var options = "";
	for (var key in weaponInfo) {
		if (weaponInfo[key].type === weaponType) {
			options += "<option value=\"" + key + "\">" + key + "</option>";
		}
	}
	options += "<option value='None'>None</option>";
	$("#weapon-" + charNum).html(options);
}

// load all passive skills of the given letter
// letter is the passive skill letter, charNum determines which panel to load in
function loadPassives(letter, charNum) {
	"use strict";
	var options = "";
	for (var key in skillInfo[letter]) {
		options += "<option value=\"" + key + "\">" + key + "</option>";
	}
	options += "<option value='None'>None</option>";
	$("#passive-" + letter + "-" + charNum).html(options);
}

// changes the color to match the given weapon type
// weaponType is the type of weapon, charNum determines which panel to display in
function setColor(weaponType, charNum) {
	"use strict";
	if (weaponType === "Sword" || weaponType === "Red Tome" || weaponType === "Red Breath") {
		$("#color-" + charNum).val("Red");
	} else if (weaponType === "Axe" || weaponType === "Green Tome" || weaponType === "Green Breath") {
		$("#color-" + charNum).val("Green");
	} else if (weaponType === "Lance" || weaponType === "Blue Tome" || weaponType === "Blue Breath") {
		$("#color-" + charNum).val("Blue");
	} else {
		$("#color-" + charNum).val("Colorless");
	}
}

// displays character information in the character panels
// singleChar contains only the character info to display, charNum determines which panel to display on
function displayChar(singleChar, charNum) {
	"use strict";
	if (!singleChar.hasOwnProperty("move_type")) { // no info -> custom option
		// enable inputs
		$("#extra-char-info-" + charNum).css("color", "white");
		$("#skills-" + charNum + " label").css("color", "white");
		$("#extra-char-info-" + charNum + " select").removeAttr("disabled");
		$("#skills-" + charNum + " select").removeAttr("disabled");
		
		// show collapsed section
		$("#extra-char-info-" + charNum).show(700);
		
		// show all skills and weapons
		var weaponType = $("#weapon-type-" + charNum).val();
		var weapon = $("#weapon-" + charNum).val();
		var passiveA = $("#passive-a-" + charNum).val();
		var passiveB = $("#passive-b-" + charNum).val();
		var passiveC = $("#passive-c-" + charNum).val();
		var assist = $("#assist-" + charNum).val();
		var special = $("#special-" + charNum).val();
		
		// load in all weapons of the current weapon type
		loadWeapons(weaponType, charNum);
		$("#weapon-" + charNum).val(weapon);
		if (weapon === "None") {
			$("#weapon-" + charNum).data("info", {});
		} else {
			$("#weapon-" + charNum).data("info", weaponInfo[weapon]);
		}
		
		// load in passive skills
		loadPassives('a', charNum);
		$("#passive-a-" + charNum).val(passiveA);
		getSkillData("#passive-a-" + charNum, 'a', false);
		
		loadPassives('b', charNum);
		$("#passive-b-" + charNum).val(passiveB);
		getSkillData("#passive-b-" + charNum, 'b', false);
		
		loadPassives('c', charNum);
		$("#passive-c-" + charNum).val(passiveC);
		getSkillData("#passive-c-" + charNum, 'c', false);
		
		// load in assist skills
		var assistOptions = "";
		for (var assistName in assistInfo) {
			assistOptions += "<option value=\"" + assistName + "\">" + assistName + "</option>";
		}
		assistOptions += "<option value='None'>None</option>";
		$("#assist-" + charNum).html(assistOptions);
		$("#assist-" + charNum).val(assist);
		
		// load in specials
		var specOptions = "";
		for (var specName in specInfo) {
			specOptions += "<option value=\"" + specName + "\">" + specName + "</option>";
		}
		specOptions += "<option value='None'>None</option>";
		$("#special-" + charNum).html(specOptions);
		$("#special-" + charNum).val(special);
		getSpecialData(charNum);
		
		return;
	}

	// grey out disabled input fields
	$("#extra-char-info-" + charNum).css("color", "#5b5b5b");
	$("#extra-char-info-" + charNum + " select").attr("disabled", "disabled");
	
	// show general character info
	$("#color-" + charNum).val(singleChar.color);
	$("#weapon-type-" + charNum).val(singleChar.weapon_type);
	$("#move-type-" + charNum).val(singleChar.move_type);
	
	// show dragon attribute
	if (singleChar.hasOwnProperty("dragon")) {
		$("#dragon-" + charNum).val("Yes");
	} else {
		$("#dragon-" + charNum).val("No");
	}
	
	// show stats
	$("#hp-" + charNum + ", #curr-hp-" + charNum).val(singleChar.hp);
	$(".hp-" + charNum + "-read").text(singleChar.hp);
	$("#atk-" + charNum).val(singleChar.atk);
	$("#spd-" + charNum).val(singleChar.spd);
	$("#def-" + charNum).val(singleChar.def);
	$("#res-" + charNum).val(singleChar.res);
	
	// reset buffs/debuffs
	$("#stats-" + charNum + " .stat-bonus, #stats-" + charNum + " .stat-penalty, #stats-" + charNum + " .stat-spur").val(0);
	
	// show passive skills
	showSkills(singleChar, charNum, 'a');
	showSkills(singleChar, charNum, 'b');
	showSkills(singleChar, charNum, 'c');
	
	// show assist skill
	if (singleChar.hasOwnProperty("assist")) {
		$("#assist-" + charNum).removeAttr("disabled");
		$("#skills-" + charNum + " .assist-label").css("color", "white");
		
		var selectedAssist = singleChar.assist[0];
		var assists = "<option value=\"" + selectedAssist + "\">" + selectedAssist + "</option>";
		for (var assistIndex = 1; assistIndex < singleChar.assist.length; assistIndex++) {
			assists += "<option value=\"" + singleChar.assist[assistIndex] + "\">" + singleChar.assist[assistIndex] + "</option>";
		}
		assists += "<option value='None'>None</option>";
		$("#assist-" + charNum).html(assists);
		$("#assist-" + charNum + " option:eq(0)").attr("selected", "selected");
	} else {
		$("#assist-" + charNum).html("<option value='None'>None<option>");
		$("#assist-" + charNum).attr("disabled", "disabled");
		$("#skills-" + charNum + " .assist-label").css("color", "#5b5b5b");
	}
	
	// show special skill
	if (singleChar.hasOwnProperty("special")) {
		$("#special-" + charNum).removeAttr("disabled");
		$("#skills-" + charNum + " .special-label").css("color", "white");
		
		var selectedSpecial = singleChar.special[0];
		var specials = "<option value=\"" + selectedSpecial + "\">" + selectedSpecial + "</option>";
		for (var specIndex = 1; specIndex < singleChar.special.length; specIndex++) {
			specials += "<option value=\"" + singleChar.special[specIndex] + "\">" + singleChar.special[specIndex] + "</option>";
		}
		specials += "<option value='None'>None</option>";
		$("#special-" + charNum).html(specials);
		$("#special-" + charNum + " option:eq(0)").attr("selected", "selected");
		
		// show cooldown values
		getSpecialData(charNum);
		showSpecCooldown(selectedSpecial, charNum, true);
		
	} else {
		$("#special-" + charNum).html("<option value='None'>None<option>");
		$("#special-" + charNum).attr("disabled", "disabled");
		$("#spec-cooldown-" + charNum).val("0");
		$("#spec-cooldown-" + charNum).attr("disabled", "disabled");
		$("#skills-" + charNum + " .special-label").css("color", "#5b5b5b");
		$("#spec-cooldown-max-" + charNum).text("x");
		$("#spec-cooldown-line-" + charNum).css("color", "#5b5b5b");
		getSpecialData(charNum);
	}
	
	// show weapon
	var selectedWeapon = singleChar.weapon[0];
	var weapons = "<option value=\"" + selectedWeapon + "\">" + selectedWeapon + "</option>";
	for (var weaponIndex = 1; weaponIndex < singleChar.weapon.length; weaponIndex++) {
		weapons += "<option value=\"" + singleChar.weapon[weaponIndex] + "\">" + singleChar.weapon[weaponIndex] + "</option>";
	}
	weapons += "<option value='None'>None</option>";
	$("#weapon-" + charNum).html(weapons);
	$("#weapon-" + charNum + " option:eq(0)").attr("selected", "selected");
	
	// show extra weapon info
	showWeapon(selectedWeapon, charNum, false);
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

// handles after combat damage (on the defender)
// battleInfo contains all battle information, dmgAmount is the amount of damage to inflict, dmgSource is the source of the damage
function afterCombatDmg (battleInfo, dmgAmount, dmgSource) {
	"use strict";
	var oldHP = battleInfo.defender.currHP;
	battleInfo.defender.currHP = Math.max(oldHP - dmgAmount, 1);
	battleInfo.logMsg += "<li class='battle-interaction'><span class='attacker'><strong>" + battleInfo.attacker.name + "</strong></span> inflicts after-combat damage [" + dmgSource + "]. <span class='dmg'><strong>" + dmgAmount.toString() + " damage dealt.</strong></span><br><span class='defender'><strong>" + battleInfo.defender.name + " HP:</strong> " + oldHP.toString() + " → " + battleInfo.defender.currHP.toString() + "</span></li>";
	
	return battleInfo;
}

// handles self-inflicted after combat damage
// battleInfo contains all battle information, dmgAmount is the amount of damage to inflict, dmgSource is the source of the damage, initiator is true if the attacker is damaged
function recoilDmg(battleInfo, dmgAmount, dmgSource, initiator) {
	"use strict";
	var oldHP = 0;
	if (initiator) {
		oldHP = battleInfo.attacker.currHP;
		battleInfo.attacker.currHP = Math.max(oldHP - dmgAmount, 1);
		battleInfo.logMsg += "<li class='battle-interaction'><span class='attacker'><strong>" + battleInfo.attacker.name + "</strong></span> takes damage after combat [" + dmgSource + "]. <span class='dmg'><strong>" + dmgAmount.toString() + " damage dealt.</strong></span><br><span class='attacker'><strong>" + battleInfo.attacker.name + " HP:</strong> " + oldHP.toString() + " → " + battleInfo.attacker.currHP.toString() + "</span></li>";
	} else {
		oldHP = battleInfo.defender.currHP;
		battleInfo.defender.currHP = Math.max(oldHP - dmgAmount, 1);
		battleInfo.logMsg += "<li class='battle-interaction'><span class='defender'><strong>" + battleInfo.defender.name + "</strong></span> takes damage after combat [" + dmgSource + "]. <span class='dmg'><strong>" + dmgAmount.toString() + " damage dealt.</strong></span><br><span class='defender'><strong>" + battleInfo.defender.name + " HP:</strong> " + oldHP.toString() + " → " + battleInfo.defender.currHP.toString() + "</span></li>";
	}
	
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

// checks if the defender can counter
// battleInfo contains all battle information
function defCanCounter(battleInfo) {
	"use strict";
	return battleInfo.defender.weaponName !== "None" && (battleInfo.defender.weaponData.range === battleInfo.attacker.weaponData.range || battleInfo.defender.weaponData.hasOwnProperty("counter") || battleInfo.defender.passiveAData.hasOwnProperty("counter"));
}

// rounds numbers up or down, rounds to closest int if the difference is less than 0.01
// unrounded is the number to round, roundUp is true if we need to round up
function roundNum (unrounded, roundUp) {
	"use strict";
	if (roundUp) {
		if (unrounded - Math.floor(unrounded) < 0.01) {
			return Math.floor(unrounded);
		} else {
			return Math.ceil(unrounded);
		}
	} else if (Math.ceil(unrounded) - unrounded < 0.01) {
		return Math.ceil(unrounded);
	}
	
	return Math.floor(unrounded);
}

// heals by damage dealt
// battleInfo contains all battle information, dmg is the damage dealt, healAmount is the fraction to heal, healSource is the source of the healing, initiator determines who to heal
function healDmg(battleInfo, dmg, healAmount, healSource, initiator) {
	"use strict";
	var heal = roundNum(dmg * healAmount, false);
	var oldHP = 0;
	var currHP = 0;
	if (initiator) {
		oldHP = battleInfo.attacker.currHP;
		battleInfo.attacker.currHP = Math.min(battleInfo.attacker.hp, battleInfo.attacker.currHP + heal);
		currHP = battleInfo.attacker.currHP;
	} else {
		oldHP = battleInfo.defender.currHP;
		battleInfo.defender.currHP = Math.min(battleInfo.defender.hp, battleInfo.defender.currHP + heal);
		currHP = battleInfo.defender.currHP;
	}
	battleInfo.logMsg += "Healed by " + (healAmount * 100).toString() +"% of actual damage dealt [" + healSource + "]. <span class='dmg'><strong>" + heal.toString() + " health restored. </strong></span>";
	return battleInfo;
}

// extracts all character information from a panel and returns it
// charNum determines which panel to take info from
function getCharPanelData (charNum) {
	"use strict";
	var charData = {};
	charData.name = $("#char-" + charNum).val();
	if (charData.name === "Custom") {
		if (charNum === '1') {
			charData.name = "Custom Attacker";
		} else {
			charData.name = "Custom Defender";
		}
	}
	
	charData.color = $("#color-" + charNum).val();
	charData.moveType = $("#move-type-" + charNum).val();
	charData.type = $("#weapon-type-" + charNum).val();
	charData.weaponName = $("#weapon-" + charNum).val();
	charData.weaponData = $("#weapon-" + charNum).data("info");
		
	if ($("#dragon-" + charNum).val() === "Yes") {
		charData.dragon = true;
	} else {
		charData.dragon = false;
	}
	
	if (charData.weaponData.hasOwnProperty("add_bonus")) {
		charData.addBonusAtk=parseInt($("#atk-bonus-"+charNum).val()) + parseInt($("#spd-bonus-"+charNum).val()) + parseInt($("#def-bonus-"+charNum).val()) + parseInt($("#res-bonus-"+charNum).val());
	}
	
	charData.passiveA = $("#passive-a-" + charNum).val();
	charData.passiveB = $("#passive-b-" + charNum).val();
	charData.passiveC = $("#passive-c-" + charNum).val();
	charData.passiveAData = $("#passive-a-" + charNum).data("info");
	charData.passiveBData = $("#passive-b-" + charNum).data("info");
	charData.passiveCData = $("#passive-c-" + charNum).data("info");
	charData.special = $("#special-" + charNum).val();
	charData.specCurrCooldown = parseInt($("#spec-cooldown-" + charNum).val());
	charData.specialData = $("#special-" + charNum).data("info");
	
	charData.currHP = parseInt($("#curr-hp-" + charNum).val());
	charData.initHP = parseInt($("#curr-hp-" + charNum).val());
	charData.hp = parseInt($("#hp-" + charNum).val());
	charData.atk = Math.max(0, parseInt($("#atk-"+charNum).val()) + parseInt($("#atk-bonus-"+charNum).val()) + parseInt($("#atk-penalty-"+charNum).val()) + parseInt($("#atk-spur-"+charNum).val()));
	charData.spd = Math.max(0, parseInt($("#spd-"+charNum).val()) + parseInt($("#spd-bonus-"+charNum).val()) + parseInt($("#spd-penalty-"+charNum).val()) + parseInt($("#spd-spur-"+charNum).val()));
	charData.def = Math.max(0, parseInt($("#def-"+charNum).val()) + parseInt($("#def-bonus-"+charNum).val()) + parseInt($("#def-penalty-"+charNum).val()) + parseInt($("#def-spur-"+charNum).val()));
	charData.res = Math.max(0, parseInt($("#res-"+charNum).val()) + parseInt($("#res-bonus-"+charNum).val()) + parseInt($("#res-penalty-"+charNum).val()) + parseInt($("#res-spur-"+charNum).val()));
	charData.atkWS = Math.max(0, parseInt($("#atk-"+charNum).val()) + parseInt($("#atk-bonus-"+charNum).val()) + parseInt($("#atk-penalty-"+charNum).val()));
	charData.spdWS = Math.max(0, parseInt($("#spd-"+charNum).val()) + parseInt($("#spd-bonus-"+charNum).val()) + parseInt($("#spd-penalty-"+charNum).val()));
	charData.defWS = Math.max(0, parseInt($("#def-"+charNum).val()) + parseInt($("#def-bonus-"+charNum).val()) + parseInt($("#def-penalty-"+charNum).val()));
	charData.resWS = Math.max(0, parseInt($("#res-"+charNum).val()) + parseInt($("#res-bonus-"+charNum).val()) + parseInt($("#res-penalty-"+charNum).val()));
	
	return charData;
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
	var atkSpec = false;	// set to true if special triggers
	var defSpec = false;	
	
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
		battleInfo.logMsg += "Opponent's weapon advantage reduces attack by 20% [" + defender.weaponName + "]. ";
	} else if (triAdv > 0) {
		atkMod = 1.2;
		battleInfo.logMsg += "Triangle advantage boosts attack by 20%. ";
		if (attacker.weaponData.hasOwnProperty("tri_advantage")) {
			atkMod += 0.2;
			battleInfo.logMsg += "Attack is boosted by another 20% [" + attacker.weaponName + "]. ";
		} else if (defender.weaponData.hasOwnProperty("tri_advantage")) {
			atkMod += 0.2;
			battleInfo.logMsg += "Opponent disadvantage boosts attack by another 20% [" + defender.weaponName + "]. ";
		} else if (attacker.passiveAData.hasOwnProperty("tri_advantage")) {
			atkMod += attacker.passiveAData.tri_advantage;
			battleInfo.logMsg += "Attack is boosted by another " + (attacker.passiveAData.tri_advantage * 100).toString() + "% [" + attacker.passiveA + "]. ";
		} else if (defender.passiveAData.hasOwnProperty("tri_advantage")) {
			atkMod += defender.passiveAData.tri_advantage;
			battleInfo.logMsg += "Opponent disadvantage boosts attack by another " + (defender.passiveAData.tri_advantage * 100).toString() + "% [" + defender.passiveA + "]. ";
		}
	} else if (triAdv < 0) {
		atkMod = 0.8;
		roundUp = true;
		battleInfo.logMsg += "Triangle disadvantage reduces attack by 20%. ";
		if (attacker.weaponData.hasOwnProperty("tri_advantage")) {
			atkMod -= 0.2;
			battleInfo.logMsg += "Attack is reduced by another 20% [" + attacker.weaponName + "]. ";
		} else if (defender.weaponData.hasOwnProperty("tri_advantage")) {
			atkMod -= 0.2;
			battleInfo.logMsg += "Opponent reduces attack by another 20% [" + defender.weaponName + "]. ";
		} else if (attacker.passiveAData.hasOwnProperty("tri_advantage")) {
			atkMod -= attacker.passiveAData.tri_advantage;
			battleInfo.logMsg += "Attack is reduced by another " + (attacker.passiveAData.tri_advantage * 100).toString() + "% [" + attacker.passiveA + "]. ";
		} else if (defender.passiveAData.hasOwnProperty("tri_advantage")) {
			atkMod -= defender.passiveAData.tri_advantage;
			battleInfo.logMsg += "Opponent reduces attack by another " + (defender.passiveAData.tri_advantage * 100).toString() + "% [" + defender.passiveA + "]. ";
		}
	}
	
	// super effectiveness against movement types
	if (attacker.weaponData.hasOwnProperty("move_effective") && attacker.weaponData.move_effective === defender.moveType) {
		if (defender.passiveAData.hasOwnProperty("cancel_effective")) {
			battleInfo.logMsg += "Effectiveness against " + defender.moveType + " neutralized by opponent [" + defender.passiveA + "]. ";
		} else {
			atkMod *= 1.5;
			battleInfo.logMsg += "Effectiveness against " + defender.moveType + " boosts attack by 50% [" + attacker.weaponName + "]. ";
		}
	}
	
	// super effectiveness against dragons
	if (attacker.weaponData.hasOwnProperty("dragon_effective") && defender.dragon) {
		atkMod *= 1.5;
		battleInfo.logMsg += "Effectiveness against dragons increases attack by 50% [" + attacker.weaponName + "]. ";
	}
	
	// calculate attack and round
	var unroundedAtk = atkPower * atkMod;
	if (roundUp) {
		atkPower = roundNum(unroundedAtk, true);
	} else if (atkMod > 1) {
		atkPower = roundNum(unroundedAtk, false);
	}
	
	// determine if magical or not
	var defReduct = 0;
	if (attacker.weaponData.magical) {
		defReduct = defender.res;
	} else {
		defReduct = defender.def;
	}
	
	// defense and resistance lowering special
	if (attacker.specialData.hasOwnProperty("enemy_def_res_mod") && attacker.specCurrCooldown <= 0) {
		defReduct -= roundNum(defReduct * attacker.specialData.enemy_def_res_mod, false);
		battleInfo.logMsg += "Opponent's defense and resistance lowered by " + (attacker.specialData.enemy_def_res_mod * 100).toString() + "% [" + attacker.special + "]. ";
		atkSpec = true;
	}
	
	// calculate damage
	var dmg = Math.max(atkPower - defReduct, 0);
	
	// halve staff damage
	if (attacker.type === "Staff") {
		dmg = roundNum(dmg / 2, false);
	}
	
	// damage buffs by stat
	if (attacker.specialData.hasOwnProperty("dmg_buff_by_stat") && attacker.specCurrCooldown <= 0) {
		dmg += roundNum(attacker.specialData.dmg_buff_by_stat.buff * attacker[attacker.specialData.dmg_buff_by_stat.stat + "WS"], false);
		battleInfo.logMsg += "Damage boosted by " + (attacker.specialData.dmg_buff_by_stat.buff * 100).toString() + "% of " + statWord(attacker.specialData.dmg_buff_by_stat.stat) + " [" + attacker.special + "]. ";
		atkSpec = true;
	}
	
	// damage suffered buff
	if (attacker.specialData.hasOwnProperty("dmg_suffer_buff") && attacker.specCurrCooldown <= 0) {
		dmg += roundNum((attacker.hp - attacker.currHP) * attacker.specialData.dmg_suffer_buff, false);
		battleInfo.logMsg += "Damage boosted by " + (attacker.specialData.dmg_suffer_buff * 100).toString() + "% of damage suffered [" + attacker.special + "]. ";
		atkSpec = true;
	}
	
	// check for damage multiplier
	if (attacker.specialData.hasOwnProperty("dmg_mod") && attacker.specCurrCooldown <= 0) {
		dmg += roundNum(dmg * attacker.specialData.dmg_mod, false);
		battleInfo.logMsg += "Damage boosted by " + (attacker.specialData.dmg_mod * 100).toString() + "% [" + attacker.special + "]. ";
		atkSpec = true;
	}
	
	// damage reduction from defender
	if (defender.specialData.hasOwnProperty("reduce_dmg") && defender.specCurrCooldown <= 0 && defender.specialData.reduce_dmg.range === battleInfo.atkRange) {
		dmg -= roundNum(dmg * defender.specialData.reduce_dmg.dmg_mod, false);
		battleInfo.logMsg += "Opponent reduces damage inflicted from ";
		if (battleInfo.atkRange === 1) {
			battleInfo.logMsg += "adjacent attacks ";
		} else {
			battleInfo.logMsg += battleInfo.atkRange.toString() + " spaces away ";
		}
		battleInfo.logMsg += "by " + (defender.specialData.reduce_dmg.dmg_mod * 100).toString() + "% [" + defender.special + "]. ";
		defSpec = true;
	}
	
	battleInfo.logMsg += "<span class='dmg'><strong>" + dmg.toString() + " damage dealt.</strong></span> ";
	
	// check for miracle
	if (defender.currHP - dmg <= 0 && defender.specialData.hasOwnProperty("survive") && defender.currHP > 1 && defender.specCurrCooldown <= 0) {
		defender.currHP = 1;
		battleInfo.logMsg += "Opponent survives lethal attack [" + defender.special + "]. ";
		defSpec = true;
	} else {
		defender.currHP = Math.max(defender.currHP - dmg, 0);
	}
	
	// check for healing
	var healMsg = "";
	var atkOldHP = attacker.currHP;
	var didHeal = false;
	if (attacker.weaponData.hasOwnProperty("heal_dmg") && attacker.specialData.hasOwnProperty("heal_dmg") && attacker.specCurrCooldown <= 0) {
		battleInfo = healDmg(battleInfo, (oldHP - defender.currHP), attacker.weaponData.heal_dmg + attacker.specialData.heal_dmg, attacker.weaponName + ", " + attacker.special, initiator);
		didHeal = true;
	} else if (attacker.weaponData.hasOwnProperty("heal_dmg")) {
		battleInfo = healDmg(battleInfo, (oldHP - defender.currHP), attacker.weaponData.heal_dmg, attacker.weaponName, initiator);
		didHeal = true;
	} else if (attacker.specialData.hasOwnProperty("heal_dmg") && attacker.specCurrCooldown <= 0) {
		battleInfo = healDmg(battleInfo, (oldHP - defender.currHP), attacker.specialData.heal_dmg, attacker.special, initiator);
		didHeal = true;
	}
	
	if (didHeal) {
		healMsg = " <span class='heal-seperator'>|</span> <span class='" + atkClass + "'><strong>" + attacker.name + " HP:</strong> " + atkOldHP.toString() + " → " + attacker.currHP.toString() + "</span>";
	}
	
	battleInfo.logMsg += "<br><span class='" + defClass + "'><strong>" + defender.name + " HP:</strong> " + oldHP.toString() + " → " + defender.currHP.toString() + "</span>" + healMsg + "</li>";
	
	// update cooldowns
	if (atkSpec) {
		attacker.specCurrCooldown = attacker.specialData.cooldown;
	} else if (attacker.specCurrCooldown > 0) {
		attacker.specCurrCooldown -= 1;
	}
	
	if (defSpec) {
		defender.specCurrCooldown = defender.specialData.cooldown;
	} else if (defender.specCurrCooldown > 0) {
		defender.specCurrCooldown -= 1;
	}
	
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
		if (openLog) {
			$("#interaction-list").fadeIn("slow");
		}
		$(".hp-remain-block").fadeIn("slow");
		
		return;
	}
	
	// contains both attacker, defender info and battle log messages
	var battleInfo = {};
	battleInfo.attacker = getCharPanelData('1');
	battleInfo.defender = getCharPanelData('2');
	battleInfo.logMsg = "";
	battleInfo.atkRange = $("#weapon-1").data("info").range;
	
	// AOE damage before combat
	if (battleInfo.attacker.specialData.hasOwnProperty("before_combat_aoe") && battleInfo.attacker.specCurrCooldown <= 0) {
		// reset cooldown
		battleInfo.attacker.specCurrCooldown = battleInfo.attacker.specialData.cooldown;
		
		// calculate damage
		var aoeDmg = battleInfo.attacker.atkWS ;
		
		// check for atk multiplier
		if (battleInfo.attacker.specialData.hasOwnProperty("aoe_dmg_mod")) {
			aoeDmg = roundNum(aoeDmg * battleInfo.attacker.specialData.aoe_dmg_mod, false);
		}
		
		if (battleInfo.attacker.weaponData.magical) {
			aoeDmg -= battleInfo.defender.res;
		} else {
			aoeDmg -= battleInfo.defender.def;
		}
		
		var oldHP = battleInfo.defender.currHP;
		battleInfo.defender.currHP = Math.max(battleInfo.defender.currHP - aoeDmg, 1);
		battleInfo.defender.initHP = battleInfo.defender.currHP;
		battleInfo.logMsg += "<li class='battle-interaction'><span class='attacker'><strong>" + battleInfo.attacker.name + "</strong></span> deals AOE damage before combat [" + battleInfo.attacker.special + "]. <span class='dmg'><strong>" + aoeDmg.toString() + " damage dealt.</strong></span><br><span class='defender'><strong>" + battleInfo.defender.name + " HP:</strong> " + oldHP.toString() + " → " + battleInfo.defender.currHP.toString() + "</span></li>";
	}
	
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
	
	// vantage
	var vantage = false;	// true if vantage activates
	var defCounter = false;	// true if defender counters
	if (battleInfo.defender.weaponName !== "None" && battleInfo.defender.weaponData.range === battleInfo.attacker.weaponData.range && battleInfo.defender.passiveBData.hasOwnProperty("vantage") && battleInfo.defender.initHP <= battleInfo.defender.passiveBData.vantage.threshold * battleInfo.defender.hp) {
		battleInfo = singleCombat(battleInfo, false, "counter-attacks first [" + battleInfo.defender.passiveB + "]", false);
		vantage = true;
		defCounter = true;
	} else if (battleInfo.defender.weaponName !== "None" && battleInfo.defender.weaponData.hasOwnProperty("counter") && battleInfo.defender.passiveBData.hasOwnProperty("vantage") && battleInfo.defender.initHP <= battleInfo.defender.passiveBData.vantage.threshold * battleInfo.defender.hp) {
		battleInfo = singleCombat(battleInfo, false, "counter-attacks first, ignoring distance [" + battleInfo.defender.passiveB + ", " + battleInfo.defender.weaponName + "]", false);
		vantage = true;
		defCounter = true;
	} else if (battleInfo.defender.weaponName !== "None" && battleInfo.defender.passiveAData.hasOwnProperty("counter") && battleInfo.defender.passiveBData.hasOwnProperty("vantage") && battleInfo.defender.initHP <= battleInfo.defender.passiveBData.vantage.threshold * battleInfo.defender.hp) {
		battleInfo = singleCombat(battleInfo, false, "counter-attacks first, ignoring distance [" + battleInfo.defender.passiveB + ", " + battleInfo.defender.passiveA + "]", false);
		vantage = true;
		defCounter = true;
	} 
	
	// attacker initiates
	if (battleInfo.attacker.currHP > 0) {
		battleInfo = singleCombat(battleInfo, true, "attacks", false);
	}
		
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
	if (battleInfo.attacker.currHP > 0 && battleInfo.defender.currHP > 0) {
		// defender must be in range to counter-attack or have a counter ability
		if (!vantage) {
			if (battleInfo.defender.weaponName !== "None" && battleInfo.defender.weaponData.range === battleInfo.attacker.weaponData.range) {
				battleInfo = singleCombat(battleInfo, false, "counter-attacks", false);
				defCounter = true;
			} else if (battleInfo.defender.weaponName !== "None" && battleInfo.defender.weaponData.hasOwnProperty("counter")) {	
				battleInfo = singleCombat(battleInfo, false, "counter-attacks, ignoring distance [" + battleInfo.defender.weaponName + "]", false);
				defCounter = true;
			} else if (battleInfo.defender.weaponName !== "None" && battleInfo.defender.passiveAData.hasOwnProperty("counter")) {	
				battleInfo = singleCombat(battleInfo, false, "counter-attacks, ignoring distance [" + battleInfo.defender.passiveA + "]", false);
				defCounter = true;
			} else {
				battleInfo.logMsg += "<li class='battle-interaction'><span class='defender'><strong>" + battleInfo.defender.name + "</strong></span> " + " is unable to counter-attack.</li>";
			}
		}
		
		// if attacker hasn't been ko'd, check for follow ups
		if (battleInfo.attacker.currHP > 0) {
			// breaker skill > wary fighter
			if (battleInfo.attacker.passiveBData.hasOwnProperty("breaker") && battleInfo.attacker.passiveBData.breaker.weapon_type === battleInfo.defender.type && battleInfo.attacker.initHP >= battleInfo.attacker.passiveBData.breaker.threshold * battleInfo.attacker.hp && battleInfo.defender.passiveBData.hasOwnProperty("breaker") && battleInfo.defender.passiveBData.breaker.weapon_type === battleInfo.attacker.type && battleInfo.defender.initHP >= battleInfo.defender.passiveBData.breaker.threshold * battleInfo.defender.hp && defCanCounter(battleInfo)) {
				battleInfo.logMsg += "<li class='battle-interaction'>Breaker skills cancel follow-up attacks from either character [" + battleInfo.attacker.passiveB + ", " + battleInfo.defender.passiveB + "].</li>";
			} else if (battleInfo.attacker.passiveBData.hasOwnProperty("breaker") && battleInfo.attacker.passiveBData.breaker.weapon_type === battleInfo.defender.type && battleInfo.attacker.initHP >= battleInfo.attacker.passiveBData.breaker.threshold * battleInfo.attacker.hp ) {
				battleInfo = singleCombat(battleInfo, true, "makes a follow-up attack, while nullifying any follow-up attack from the opponent [" + battleInfo.attacker.passiveB + "]", false);
			} else if (battleInfo.defender.passiveBData.hasOwnProperty("breaker") && battleInfo.defender.passiveBData.breaker.weapon_type === battleInfo.attacker.type && battleInfo.defender.initHP >= battleInfo.defender.passiveBData.breaker.threshold * battleInfo.defender.hp && defCanCounter(battleInfo)) {
				battleInfo = singleCombat(battleInfo, false, "makes a follow-up attack, while nullifying any follow-up attack from the opponent [" + battleInfo.defender.passiveB + "]", false);
			} else if (battleInfo.attacker.passiveBData.hasOwnProperty("wary") && battleInfo.attacker.initHP >= battleInfo.attacker.passiveBData.wary.threshold * battleInfo.attacker.hp) {
				battleInfo.logMsg += "<li class='battle-interaction'><span class='attacker'><strong>" + battleInfo.attacker.name + "</strong></span> prevents any further follow-up attacks [" + battleInfo.attacker.passiveB + "].</li>";
			} else if (battleInfo.defender.passiveBData.hasOwnProperty("wary") && battleInfo.defender.initHP >= battleInfo.defender.passiveBData.wary.threshold * battleInfo.defender.hp) {
				battleInfo.logMsg += "<li class='battle-interaction'><span class='defender'><strong>" + battleInfo.defender.name + "</strong></span> prevents any further follow-up attacks [" + battleInfo.defender.passiveB + "].</li>";
			} else {
				var defendFollow = false;	// true if defender makes a follow up attack
				var attackFollow = false;	// true if attacker makes a follow up attack
				
				// check for brash assault
				if (battleInfo.attacker.passiveBData.hasOwnProperty("brash") && defCounter && battleInfo.attacker.initHP <= battleInfo.attacker.passiveBData.brash.threshold * battleInfo.attacker.hp){
					battleInfo = singleCombat(battleInfo, true, "makes an automatic follow-up attack [" + battleInfo.attacker.passiveB + "]", false);
					attackFollow = true;
				}
				
				if (!attackFollow && battleInfo.attacker.spd >= battleInfo.defender.spd + 5 && !desperation) { // attacker follows up
					battleInfo = singleCombat(battleInfo, true, "makes a follow-up attack", false);
					attackFollow = true;
				} else if (!defendFollow && (battleInfo.defender.spd >= battleInfo.attacker.spd + 5) && defCanCounter(battleInfo)) { 
					// defender follows up
					battleInfo = singleCombat(battleInfo, false, "makes a follow-up attack", false);
					defendFollow = true;
				}

				// check for quick riposte ability
				if (battleInfo.defender.currHP > 0 && !defendFollow && defCanCounter(battleInfo)) {
					if (battleInfo.defender.weaponData.hasOwnProperty("riposte") && battleInfo.defender.initHP >= battleInfo.defender.weaponData.riposte.threshold * battleInfo.defender.hp) {
						battleInfo = singleCombat(battleInfo, false, "makes an automatic follow-up attack [" + battleInfo.defender.weaponName + "]", false);
					} else if (battleInfo.defender.passiveBData.hasOwnProperty("riposte") && battleInfo.defender.initHP >= battleInfo.defender.passiveBData.riposte.threshold * battleInfo.defender.hp) {
						battleInfo = singleCombat(battleInfo, false, "makes an automatic follow-up attack [" + battleInfo.defender.passiveB + "]", false);
					}
				}	
			}
		}
		
		// check for poison damage and recoil damage
		if (battleInfo.attacker.currHP > 0 && battleInfo.defender.currHP > 0) {
			if (battleInfo.attacker.weaponData.hasOwnProperty("poison")) {
				battleInfo = afterCombatDmg(battleInfo, battleInfo.attacker.weaponData.poison, battleInfo.attacker.weaponName);
			}
			if (battleInfo.attacker.passiveBData.hasOwnProperty("poison")) {
				battleInfo = afterCombatDmg(battleInfo, battleInfo.attacker.passiveBData.poison, battleInfo.attacker.passiveB);
			}
			
			if (battleInfo.attacker.passiveAData.hasOwnProperty("recoil_dmg")) {
				battleInfo = recoilDmg(battleInfo, battleInfo.attacker.passiveAData.recoil_dmg, battleInfo.attacker.passiveA, true);
			}
			if (battleInfo.defender.passiveAData.hasOwnProperty("recoil_dmg")) {
				battleInfo = recoilDmg(battleInfo, battleInfo.defender.passiveAData.recoil_dmg, battleInfo.defender.passiveA, false);
			}
		}
	}
	
	// display results
	$("#interaction-list").hide().html(battleInfo.logMsg);
	$(".hp-remain-block").hide();
	$("#hp-remain-1").text(battleInfo.attacker.currHP.toString());
	$("#hp-remain-2").text(battleInfo.defender.currHP.toString());
	$("#interaction-list").children().last().removeClass("battle-interaction").addClass("battle-interaction-final");
	
	if (openLog) {
		$("#interaction-list").fadeIn("slow");
	}
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
	displayChar(charInfo[$("#char-1").val()], "1");
	$("#char-2 option:eq(1)").attr("selected", "selected");
	displayChar(charInfo[$("#char-2").val()], "2");

	// simulate initial battle
	simBattle();
}

// sets the disabled attribute of an input
// inSel is the jQuery selector of the input to enable/disable, inLabel is the label text to change color, disabled determines if the select needs to be disabled
function setDisabled(inSel, inLabel, disabled) {
	"use strict";
	if (disabled) {
		$(inSel).attr("disabled", "disabled");
		$(inLabel).css("color", "#5b5b5b");
	} else {
		$(inSel).removeAttr("disabled");
		$(inLabel).css("color", "white");
	}
}

// shows or hides the given div
// divID is the id of the div to show/hide, visible is the visibility of the div
function setVisible(divID, visible) {
	"use strict";
	if (visible) {
		$(divID).show(700);
	} else {
		$(divID).hide(700);
	}
}

// swaps info from the two character panels
function swap() {
	"use strict";
	// store old attacker info
	var oldAtkInfo = {};
	oldAtkInfo.name = $("#char-1").val();
	oldAtkInfo.color = $("#color-1").val();
	oldAtkInfo.weaponType = $("#weapon-type-1").val();
	oldAtkInfo.moveType = $("#move-type-1").val();
	oldAtkInfo.dragon = $("#dragon-1").val();
	oldAtkInfo.weapon = $("#weapon-1").html();
	oldAtkInfo.selectedWeapon = $("#weapon-1").val();
	oldAtkInfo.weaponData = $("#weapon-1").data("info");
	oldAtkInfo.weaponMight = $("#weapon-might-1").text();
	oldAtkInfo.weaponRange = $("#weapon-range-1").text();
	oldAtkInfo.weaponMagical = $("#weapon-magical-1").text();
	oldAtkInfo.passiveA = $("#passive-a-1").html();
	oldAtkInfo.selectedPassiveA = $("#passive-a-1").val();
	oldAtkInfo.passiveAData = $("#passive-a-1").data("info");
	oldAtkInfo.passiveB = $("#passive-b-1").html();
	oldAtkInfo.selectedPassiveB = $("#passive-b-1").val();
	oldAtkInfo.passiveBData = $("#passive-b-1").data("info");
	oldAtkInfo.passiveC = $("#passive-c-1").html();
	oldAtkInfo.selectedPassiveC = $("#passive-c-1").val();
	oldAtkInfo.passiveCData = $("#passive-c-1").data("info");
	oldAtkInfo.assist = $("#assist-1").html();
	oldAtkInfo.selectedAssist = $("#assist-1").val();
	oldAtkInfo.special = $("#special-1").html();
	oldAtkInfo.selectedSpecial = $("#special-1").val();
	oldAtkInfo.specialData = $("#special-1").data("info");
	oldAtkInfo.specCooldown = $("#spec-cooldown-1").val();
	oldAtkInfo.specCooldownMax = $("#spec-cooldown-max-1").text();
	oldAtkInfo.hp = $("#hp-1").val();
	oldAtkInfo.atk = $("#atk-1").val();
	oldAtkInfo.atkBonus = $("#atk-bonus-1").val();
	oldAtkInfo.atkPenalty = $("#atk-penalty-1").val();
	oldAtkInfo.atkSpur = $("#atk-spur-1").val();
	oldAtkInfo.spd = $("#spd-1").val();
	oldAtkInfo.spdBonus = $("#spd-bonus-1").val();
	oldAtkInfo.spdPenalty = $("#spd-penalty-1").val();
	oldAtkInfo.spdSpur = $("#spd-spur-1").val();
	oldAtkInfo.def = $("#def-1").val();
	oldAtkInfo.defBonus = $("#def-bonus-1").val();
	oldAtkInfo.defPenalty = $("#def-penalty-1").val();
	oldAtkInfo.defSpur = $("#def-spur-1").val();
	oldAtkInfo.res = $("#res-1").val();
	oldAtkInfo.resBonus = $("#res-bonus-1").val();
	oldAtkInfo.resPenalty = $("#res-penalty-1").val();
	oldAtkInfo.resSpur = $("#res-spur-1").val();
	oldAtkInfo.currHP = $("#curr-hp-1").val();
	oldAtkInfo.extraCharInfoDisabled = ($("#color-1").attr("disabled") === "disabled");
	oldAtkInfo.passiveADisabled = ($("#passive-a-1").attr("disabled") === "disabled");
	oldAtkInfo.passiveBDisabled = ($("#passive-b-1").attr("disabled") === "disabled");
	oldAtkInfo.passiveCDisabled = ($("#passive-c-1").attr("disabled") === "disabled");
	oldAtkInfo.assistDisabled = ($("#assist-1").attr("disabled") === "disabled");
	oldAtkInfo.specialDisabled = ($("#special-1").attr("disabled") === "disabled");
	oldAtkInfo.specCooldownDisabled = ($("#spec-cooldown-1").attr("disabled") === "disabled");
	oldAtkInfo.extraCharInfoVisible = $("#extra-char-info-1").is(":visible");
	oldAtkInfo.extraCharInfoVisible = $("#extra-char-info-1").is(":visible");
	oldAtkInfo.extraWeaponInfoVisible = $("#extra-weapon-info-1").is(":visible");
	
	// place defender info in attacker panel
	$("#char-1").val($("#char-2").val());
	$("#color-1").val($("#color-2").val());
	$("#weapon-type-1").val($("#weapon-type-2").val());
	$("#move-type-1").val($("#move-type-2").val());
	$("#dragon-1").val($("#dragon-2").val());
	$("#weapon-1").html($("#weapon-2").html());
	$("#weapon-1").val($("#weapon-2").val());
	$("#weapon-1").data("info", $("#weapon-2").data("info"));
	$("#weapon-might-1").text($("#weapon-might-2").text());
	$("#weapon-range-1").text($("#weapon-range-2").text());
	$("#weapon-magical-1").text($("#weapon-magical-2").text());
	$("#passive-a-1").html($("#passive-a-2").html());
	$("#passive-a-1").val($("#passive-a-2").val());
	$("#passive-a-1").data("info", $("#passive-a-2").data("info"));
	$("#passive-b-1").html($("#passive-b-2").html());
	$("#passive-b-1").val($("#passive-b-2").val());
	$("#passive-b-1").data("info", $("#passive-b-2").data("info"));
	$("#passive-c-1").html($("#passive-c-2").html());
	$("#passive-c-1").val($("#passive-c-2").val());
	$("#passive-c-1").data("info", $("#passive-c-2").data("info"));
	$("#assist-1").html($("#assist-2").html());
	$("#assist-1").val($("#assist-2").val());
	$("#special-1").html($("#special-2").html());
	$("#special-1").val($("#special-2").val());
	$("#special-1").data("info", $("#special-2").data("info"));
	$("#spec-cooldown-1").val($("#spec-cooldown-2").val());
	$("#spec-cooldown-max-1").text($("#spec-cooldown-max-2").text());
	$("#hp-1").val($("#hp-2").val());
	$("#atk-1").val($("#atk-2").val());
	$("#atk-bonus-1").val($("#atk-bonus-2").val());
	$("#atk-penalty-1").val($("#atk-penalty-2").val());
	$("#atk-spur-1").val($("#atk-spur-2").val());
	$("#spd-1").val($("#spd-2").val());
	$("#spd-bonus-1").val($("#spd-bonus-2").val());
	$("#spd-penalty-1").val($("#spd-penalty-2").val());
	$("#spd-spur-1").val($("#spd-spur-2").val());
	$("#def-1").val($("#def-2").val());
	$("#def-bonus-1").val($("#def-bonus-2").val());
	$("#def-penalty-1").val($("#def-penalty-2").val());
	$("#def-spur-1").val($("#def-spur-2").val());
	$("#res-1").val($("#res-2").val());
	$("#res-bonus-1").val($("#res-bonus-2").val());
	$("#res-penalty-1").val($("#res-penalty-2").val());
	$("#res-spur-1").val($("#res-spur-2").val());
	$("#curr-hp-1").val($("#curr-hp-2").val());
	$(".hp-1-read").text($("#hp-2").val().toString());
	setDisabled("#extra-char-info-1 select", "#extra-char-info-1", ($("#color-2").attr("disabled") === "disabled"));
	setDisabled("#passive-a-1", "#skills-1 .passive-a-label", ($("#passive-a-2").attr("disabled") === "disabled"));
	setDisabled("#passive-b-1", "#skills-1 .passive-b-label", ($("#passive-b-2").attr("disabled") === "disabled"));
	setDisabled("#passive-c-1", "#skills-1 .passive-c-label", ($("#passive-c-2").attr("disabled") === "disabled"));
	setDisabled("#assist-1", "#skills-1 .assist-label", ($("#assist-2").attr("disabled") === "disabled"));
	setDisabled("#special-1", "#skills-1 .special-label", ($("#special-2").attr("disabled") === "disabled"));
	setDisabled("#spec-cooldown-1", "#spec-cooldown-line-1", ($("#spec-cooldown-2").attr("disabled") === "disabled"));
	setVisible("#extra-char-info-1", $("#extra-char-info-2").is(":visible"));
	setVisible("#extra-weapon-info-1", $("#extra-weapon-info-2").is(":visible"));
	
	// place attacker info in defender panel
	$("#char-2").val(oldAtkInfo.name);
	$("#color-2").val(oldAtkInfo.color);
	$("#weapon-type-2").val(oldAtkInfo.weaponType);
	$("#move-type-2").val(oldAtkInfo.moveType);
	$("#dragon-2").val(oldAtkInfo.dragon);
	$("#weapon-2").html(oldAtkInfo.weapon);
	$("#weapon-2").val(oldAtkInfo.selectedWeapon);
	$("#weapon-2").data("info", oldAtkInfo.weaponData);
	$("#weapon-might-2").text(oldAtkInfo.weaponMight);
	$("#weapon-range-2").text(oldAtkInfo.weaponRange);
	$("#weapon-magical-2").text(oldAtkInfo.weaponMagical);
	$("#passive-a-2").html(oldAtkInfo.passiveA);
	$("#passive-a-2").val(oldAtkInfo.selectedPassiveA);
	$("#passive-a-2").data("info", oldAtkInfo.passiveAData);
	$("#passive-b-2").html(oldAtkInfo.passiveB);
	$("#passive-b-2").val(oldAtkInfo.selectedPassiveB);
	$("#passive-b-2").data("info", oldAtkInfo.passiveAData);
	$("#passive-c-2").html(oldAtkInfo.passiveC);
	$("#passive-c-2").val(oldAtkInfo.selectedPassiveC);
	$("#passive-c-2").data("info", oldAtkInfo.passiveCData);
	$("#assist-2").html(oldAtkInfo.assist);
	$("#assist-2").val(oldAtkInfo.selectedAssist);
	$("#special-2").html(oldAtkInfo.special);
	$("#special-2").val(oldAtkInfo.selectedSpecial);
	$("#special-2").data("info", oldAtkInfo.specialData);
	$("#spec-cooldown-2").val(oldAtkInfo.specCooldown);
	$("#spec-cooldown-max-2").text(oldAtkInfo.specCooldownMax);
	$("#hp-2").val(oldAtkInfo.hp);
	$("#atk-2").val(oldAtkInfo.atk);
	$("#atk-bonus-2").val(oldAtkInfo.atkBonus);
	$("#atk-penalty-2").val(oldAtkInfo.atkPenalty);
	$("#atk-spur-2").val(oldAtkInfo.atkSpur);
	$("#spd-2").val(oldAtkInfo.spd);
	$("#spd-bonus-2").val(oldAtkInfo.spdBonus);
	$("#spd-penalty-2").val(oldAtkInfo.spdPenalty);
	$("#spd-spur-2").val(oldAtkInfo.spdSpur);
	$("#def-2").val(oldAtkInfo.def);
	$("#def-bonus-2").val(oldAtkInfo.defBonus);
	$("#def-penalty-2").val(oldAtkInfo.defPenalty);
	$("#def-spur-2").val(oldAtkInfo.defSpur);
	$("#res-2").val(oldAtkInfo.res);
	$("#res-bonus-2").val(oldAtkInfo.resBonus);
	$("#res-penalty-2").val(oldAtkInfo.resPenalty);
	$("#res-spur-2").val(oldAtkInfo.resSpur);
	$("#curr-hp-2").val(oldAtkInfo.currHP);
	$(".hp-2-read").text(oldAtkInfo.hp);
	setDisabled("#extra-char-info-2 select", "#extra-char-info-2", oldAtkInfo.extraCharInfoDisabled);
	setDisabled("#passive-a-2", "#skills-2 .passive-a-label", oldAtkInfo.passiveADisabled);
	setDisabled("#passive-b-2", "#skills-2 .passive-b-label", oldAtkInfo.passiveBDisabled);
	setDisabled("#passive-c-2", "#skills-2 .passive-c-label", oldAtkInfo.passiveCDisabled);
	setDisabled("#assist-2", "#skills-2 .assist-label", oldAtkInfo.assistDisabled);
	setDisabled("#special-2", "#skills-2 .special-label", oldAtkInfo.specialDisabled);
	setDisabled("#spec-cooldown-2", "#spec-cooldown-line-2", oldAtkInfo.specCooldownDisabled);
	setVisible("#extra-char-info-2", oldAtkInfo.extraCharInfoVisible);
	setVisible("#extra-weapon-info-2", oldAtkInfo.extraWeaponInfoVisible);
}

// setup inital page
$(document).ready( function () {
	"use strict";	
	
	// setup show/hide buttons
	$(".collapse-button").on("click", function() {
		// toggle a section
		$("#" + $(this).data("section")).toggle(700);
		if ($(this).data("section") === "interaction-list") {
			openLog = !openLog;
		}
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
	$(".char-selector").on("change", function () {
		var charNum = $(this).data("charnum").toString();
		displayChar(charInfo[this.value], charNum);
		simBattle();
	});
	
	// setup weapon select
	$(".weapon-selector").on("change", function () {
		var charNum = $(this).data("charnum").toString();
		showWeapon(this.value, charNum, true);
		simBattle();
	});
	
	// setup special select
	$(".special-selector").on("change", function () {
		var charNum = $(this).data("charnum").toString();
		updateSpecCooldown("#weapon-" + charNum, charNum, false);
		getSpecialData(charNum);
		showSpecCooldown(this.value, charNum, false);
		updateSpecCooldown("#weapon-" + charNum, charNum, true);
		simBattle();
	});
	
	// setup skill select
	$(".passive-selector").on("change", function () {
		var charNum = $(this).data("charnum").toString();
		var skillType = $(this).data("skilltype");
		getSkillData(charNum, skillType, true);
		simBattle();
	});
	
	// set up weapon type changes
	$(".weapon-type-selector").on("change", function () {
		var charNum = $(this).data("charnum").toString();
		loadWeapons(this.value, charNum);
		setColor(this.value, charNum);
		$("#weapon-" + charNum + " option:eq(0)").attr("selected", "selected");
		showWeapon( $("#weapon-" + charNum).val(), charNum, true);
		simBattle();
	});
	
	// set up color changes
	$(".color-selector").on("change", function () {
		var charNum = $(this).data("charnum").toString();
		if (this.value === "Red") {
			loadWeapons("Sword", charNum);
			$("#weapon-type-" + charNum).val("Sword");
		} else if (this.value === "Green") {
			loadWeapons("Axe", charNum);
			$("#weapon-type-" + charNum).val("Axe");
		} else if (this.value === "Blue") {
			loadWeapons("Lance", charNum);
			$("#weapon-type-" + charNum).val("Lance");
		} else {
			loadWeapons("Bow", charNum);
			$("#weapon-type-" + charNum).val("Bow");
		}
		$("#weapon-" + charNum + " option:eq(0)").attr("selected", "selected");
		showWeapon( $("#weapon-" + charNum).val(), charNum, true);
		simBattle();
	});
	
	// setup other battle value changes
	$(".battle-val").on("change", function () {
		simBattle();
	});
	
	// swap button
	$("#swap-button").on("click", function () {
		swap();
		simBattle();
	});
});
