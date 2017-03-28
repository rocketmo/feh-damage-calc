// stat total upper limit
var HIGHESTSTAT = 99;

// true if battle log is open, false otherwise
var openLog = true;

// index of the selected characters
var selectedAttacker = 0;
var selectedDefender = 0;

// character slots
var attackerTeam = [{}, {}, {}, {}, {}];
var defenderTeam = [{}, {}, {}, {}, {}];

// matchup table info
var previousTable = true; // true if one vs all, false if all vs one
var keepTable = false;	// true if we keep the matchup table currently displayed

// limits number inputs
// num is a number input, minNumber is the lower limit
function limit(num, minNumber) {
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

// rounds numbers up or down, rounds to closest int if the difference is less than 0.01
// unrounded is the number to round, roundUp is true if we need to round up
function roundNum(unrounded, roundUp) {
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

// checks if the given number is within 0.01 of an integer, if it is, return that integer; otherwise just return the given number
function checkRoundError(num) {
	"use strict";
	if (Math.ceil(num) - num < 0.01) {
		return Math.ceil(num);
	} else if (num - Math.floor(num) < 0.01) {
		return Math.floor(num);
	}
	
	return num;
}

// generates the name for a custom unit based on the given weapon type and move type
function customName(weaponType, moveType) {
	"use strict";
	var name = "";
	
	// name prefix
	if (weaponType === "Sword" || weaponType === "Axe" || weaponType === "Lance" || weaponType === "Bow") {
		name = weaponType;
	} else if (weaponType === "Red Tome") {
		if (moveType === "Infantry") {
			return "Red Mage";
		}
		name = "Red";
	} else if (weaponType === "Green Tome") {
		if (moveType === "Infantry") {
			return "Green Mage";
		} 
		name = "Green";
	} else if (weaponType === "Blue Tome") {
		if (moveType === "Infantry") {
			return "Blue Mage";
		} 
		name = "Blue";
	} else if (weaponType === "Staff") {
		if (moveType === "Infantry") {
			return "Cleric";
		} else if (moveType === "Cavalry") {
			return "Troubadour";
		} 
		name = "Staff";
	} else if (weaponType === "Dagger") {
		if (moveType === "Infantry") {
			return "Thief";
		}
		name = "Dagger";
	} else if (weaponType === "Red Breath") {
		if (moveType === "Infantry") {
			return "Red Dragon";
		}
		name = "Red Dragon";
	} else if (weaponType === "Green Breath") {
		if (moveType === "Infantry") {
			return "Green Dragon";
		}
		name = "Green Dragon";
	} else {
		if (moveType === "Infantry") {
			return "Blue Dragon";
		}
		name = "Blue Dragon";
	}
	
	if (moveType === "Infantry") {
		name += " Fighter";
	} else if (moveType === "Cavalry") {
		name += " Cavalier";
	} else if (moveType === "Armored") {
		name += " Knight";
	} else {
		name += " Flier";
	}
			
	return name;
}

// given a weapon type, return its color
function weaponToColor(weaponType) {
	"use strict";
	if (weaponType === "Sword" || weaponType === "Red Tome" || weaponType === "Red Breath") {
		return "Red";
	} else if (weaponType === "Axe" || weaponType === "Green Tome" || weaponType === "Green Breath") {
		return "Green";
	} else if (weaponType === "Lance" || weaponType === "Blue Tome" || weaponType === "Blue Breath") {
		return "Blue";
	} 
	
	return "Colorless";
}


// determines if the given skill is inheritable by the character in the given panel
function isInheritable(skill, charNum) {
	"use strict";
	var moveType = $("#move-type-" + charNum).val();
	var color = $("#color-" + charNum).val();
	var weaponType = $("#weapon-type-" + charNum).val();
	
	var range = 1;
	if (weaponType === "Red Tome" || weaponType === "Green Tome" || weaponType === "Blue Tome" || weaponType === "Bow" || weaponType === "Dagger" || weaponType === "Staff") {
		range = 2;
	}
	
	var dragon = false;
	if (weaponType === "Red Breath" || weaponType === "Green Breath" || weaponType === "Blue Breath") {
		dragon = true;
	}
	
	return (!skill.hasOwnProperty("char_unique") && (!skill.hasOwnProperty("move_unique") || skill.move_unique === moveType) && (!skill.hasOwnProperty("color_restrict") || skill.color_restrict !== color) && (!skill.hasOwnProperty("range_unique") || skill.range_unique === range) && (!skill.hasOwnProperty("weapon_restrict") || skill.weapon_restrict !== weaponType) && (!skill.hasOwnProperty("weapon_unique") || skill.weapon_unique === weaponType) && (!skill.hasOwnProperty("dragon_unique") || dragon));
}

// determines if the given weapon is inheritable by the character in the given panel
function isInheritableWeapon(weapon, charNum) {
	"use strict";
	var weaponType = $("#weapon-type-" + charNum).val();
	
	return !weapon.hasOwnProperty("char_unique") && (weapon.type === weaponType);
}

// put options in the stat selects
function setupStats() {
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
function getSpecialData(charNum) {
	"use strict";
	if (specInfo.hasOwnProperty($("#special-" + charNum).val())) {
		$("#special-" + charNum).data("info", specInfo[$("#special-" + charNum).val()]);
		if (specInfo[$("#special-" + charNum).val()].hasOwnProperty("description")) {
			$("#special-desc-" + charNum).text(specInfo[$("#special-" + charNum).val()].description);
		} else {
			$("#special-desc-" + charNum).text("No effect.");
		}
	} else {	// no special
		$("#special-" + charNum).data("info", {});
		$("#special-desc-" + charNum).text("No effect.");
	} 
}

// gets assist data and stores it
// charNum determines which panel to display it in
function getAssistData(charNum) {
	"use strict";
	if (assistInfo.hasOwnProperty($("#assist-" + charNum).val())) {
		$("#assist-" + charNum).data("info", assistInfo[$("#assist-" + charNum).val()]);
		if (assistInfo[$("#assist-" + charNum).val()].hasOwnProperty("description")) {
			$("#assist-desc-" + charNum).text(assistInfo[$("#assist-" + charNum).val()].description);
		} else {
			$("#assist-desc-" + charNum).text("No effect.");
		}
	} else {	// no assist
		$("#assist-" + charNum).data("info", {});
		$("#assist-desc-" + charNum).text("No effect.");
	}
}

// gets the cooldown given special info and weapon info
function getSpecialCooldown(specialData, weaponData, assistData) {
	"use strict";
	var cool = 0;
	
	if (specialData.hasOwnProperty("cooldown")) {
		cool = specialData.cooldown;

		if (weaponData.hasOwnProperty("spec_cooldown_mod")) {
			cool += weaponData.spec_cooldown_mod;
		}

		if (assistData.hasOwnProperty("spec_cooldown_mod")) {
			cool += assistData.spec_cooldown_mod;
		}	
	}
	
	return Math.max(cool, 0);
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
			
			// keep stats within limits
			$("#" + stat + "-" + charNum).val(total);
			if ($("#" + stat + "-" + charNum).hasClass("more-than-zero")) {
				limit(document.getElementById(stat + "-" + charNum), 1);
			} else {
				limit(document.getElementById(stat + "-" + charNum), 0);
			}
			
			// check if displayed hp needs to change
			if (stat === "hp") {
				var oldHP = parseInt($("#hp-" + charNum + "-denom").text());

				// update hp value in rest of the page
				$(".hp-" + charNum + "-read").text(total.toString());

				// check if current hp needs to be updated as well
				if ((total < parseInt($("#curr-hp-" + charNum).val())) || parseInt($("#curr-hp-" + charNum).val()) === oldHP) {
					$("#curr-hp-" + charNum).val(total);
				}
			}
		}
	}
}

// updates the special cooldown max
// charNum determines which panel's stats to change
function updateSpecCooldown(charNum) {
	"use strict";
	if ($.isNumeric($("#spec-cooldown-max-" + charNum).text())) {
		var oldMax = parseInt($("#spec-cooldown-max-" + charNum).text());
		var max = getSpecialCooldown($("#special-" + charNum).data("info"), $("#weapon-" + charNum).data("info"), $("#assist-" + charNum).data("info"));
		
		// check if current cooldown needs to be fixed
		if ((parseInt($("#spec-cooldown-" + charNum).val()) > max) || (parseInt($("#spec-cooldown-" + charNum).val()) === oldMax)) {
			$("#spec-cooldown-" + charNum).val(max);
		}
		
		$("#spec-cooldown-max-" + charNum).text(max.toString());
	}
}

// gets skill data and stores it
// charNum determines which panel to display it in, skillType is the letter of the skill, update is true if stats need to be adjusted
function getSkillData(charNum, skillType, update) {
	"use strict";
	var selectID = "#passive-" + skillType + "-" + charNum;
	var skillName = $(selectID).val();
	
	if (skillInfo[skillType].hasOwnProperty(skillName)) {
		if (update) {
			updateStatTotal(selectID, charNum, false);
			$(selectID).data("info", skillInfo[skillType][skillName]);
			updateStatTotal(selectID, charNum, true);
		} else {
			$(selectID).data("info", skillInfo[skillType][skillName]);
		}
		
		if (skillInfo[skillType][skillName].hasOwnProperty("description")) {
			$("#passive-" + skillType + "-desc-" + charNum).text(skillInfo[skillType][skillName].description);
		} else {
			$("#passive-" + skillType + "-desc-" + charNum).text("No effect.");
		}
	} else {	// no skill
		if (update) {
			updateStatTotal(selectID, charNum, false);
		}
		
		$(selectID).data("info", {});
		$("#passive-" + skillType + "-desc-" + charNum).text("No effect.");
	} 
}

// displays passive skills
// singleChar contains the data for a single character, charNum determines which panel to display on, type determines the skill type
function showSkills(singleChar, charNum, type) {
	"use strict";
	var skills = "";
	var selectedSkill = "";
	var defaultSkills = {};
	
	if (singleChar.hasOwnProperty("passive_" + type)) {
		selectedSkill = singleChar["passive_" + type][0];
		
		for (var i = 0; i < singleChar["passive_" + type].length; i++) {
			var skillName = singleChar["passive_" + type][i];
			skills = "<option value=\"" + skillName + "\">" + skillName + "</option>" + skills;
			defaultSkills[skillName] = true;
		}
		skills = "<option value='None'>None</option>" + skills;
	} else { // no passive skill of the given type
		skills = "<option value='None'>None</option>";
		selectedSkill = "None";
	}
	
	// get inherited skills
	for (var key in skillInfo[type]) {
		if (isInheritable(skillInfo[type][key], charNum) && !defaultSkills.hasOwnProperty(key)) {
			skills += "<option class='inherit' value=\"" + key + "\">" + key + "</option>";
		}
	}
	
	// set value
	$("#passive-" + type + "-" + charNum).html(skills);
	$("#passive-" + type + "-" + charNum).val(selectedSkill);
	
	// store skill data
	getSkillData(charNum, type, false);
}

// shows extra weapon info
// selectedWeapon is the weapon to display, charNum determines the panel
// set update to true to update the character's atk value
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
		
		// show description
		if (weaponInfo[selectedWeapon].hasOwnProperty("description")) {
			$("#weapon-desc-" + charNum).text(weaponInfo[selectedWeapon].description);
		} else {
			$("#weapon-desc-" + charNum).text("No additional effects.");
		}
		
		// store weapon data
		if (update) {
			updateStatTotal("#weapon-" + charNum, charNum, false);
			$("#weapon-" + charNum).data("info", weaponInfo[selectedWeapon]);
			updateStatTotal("#weapon-" + charNum, charNum, true);
		} else {
			$("#weapon-" + charNum).data("info", weaponInfo[selectedWeapon]);
		}
		updateSpecCooldown(charNum);
	} else {	// weapon not found
		$("#weapon-might-" + charNum).text("n/a");
		$("#weapon-range-" + charNum).text("n/a");
		$("#weapon-magical-" + charNum).text("n/a");
		$("#weapon-desc-" + charNum).text("No additional effects.");
		updateStatTotal("#weapon-" + charNum, charNum, false);
		$("#weapon-" + charNum).data("info", {});
		updateSpecCooldown(charNum);
	}
	
	// update atk
	if (update) {
		var atk = parseInt($("#atk-" + charNum).val()) + mt - $("#weapon-might-" + charNum).data("oldmt");
		atk = Math.min(atk, HIGHESTSTAT);
		atk = Math.max(atk, 0);
		$("#atk-" + charNum).val(atk);
	}
	$("#weapon-might-" + charNum).data("oldmt", mt);
}

// show special cooldown values
// selectedSpecial is the special that is being displayed, charNum determines the panel, changeCurr is true if the current cooldown number needs to change
function showSpecCooldown(selectedSpecial, charNum, changeCurr) {
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
		
		$("#spec-cooldown-max-" + charNum).text(cool);
		
		if ($("#one-vs-one").is(":checked") || ($("#one-vs-all").is(":checked") && charNum === "1") || ($("#all-vs-one").is(":checked") && charNum === "2")) {
			$("#spec-cooldown-line-" + charNum).css("color", "white");
			$("#spec-cooldown-" + charNum).removeAttr("disabled");
		}
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
	var options = "<option value='None'>None</option>";
	for (var key in weaponInfo) {
		if (weaponInfo[key].type === weaponType) {
			options += "<option value=\"" + key + "\">" + key + "</option>";
		}
	}
	$("#weapon-" + charNum).html(options);
}

// load all passive skills of the given letter
// letter is the passive skill letter, charNum determines which panel to load in
function loadPassives(letter, charNum) {
	"use strict";
	var options = "<option value='None'>None</option>";
	for (var key in skillInfo[letter]) {
		options += "<option value=\"" + key + "\">" + key + "</option>";
	}
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

// loads the given character portrait into the given img
function getPortrait(imgID, portraitName) {
	"use strict";
	$(imgID).attr("src", "img/Portraits/" + portraitName + ".png");
}

// displays character information in the character panels
// singleChar contains only the character info to display, charNum determines which panel to display on
function displayChar(charName, charNum) {
	"use strict";
	var singleChar = charInfo[charName];
	if (!singleChar.hasOwnProperty("move_type")) { // no info -> custom option
		// display portrait
		getPortrait((charNum === "1" ? "#atk-tab-" + selectedAttacker.toString() : "#def-tab-" + selectedDefender.toString()), "Other");
		getPortrait((charNum === "1" ? "#attacker-portrait" : "#defender-portrait"), "Other");
		
		// enable inputs
		$("#extra-char-info-" + charNum).css("color", "white");
		$("#extra-char-info-" + charNum + " select").removeAttr("disabled");
		
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
		loadPassives("a", charNum);
		$("#passive-a-" + charNum).val(passiveA);
		getSkillData("#passive-a-" + charNum, "a", false);
		
		loadPassives("b", charNum);
		$("#passive-b-" + charNum).val(passiveB);
		getSkillData("#passive-b-" + charNum, "b", false);
		
		loadPassives("c", charNum);
		$("#passive-c-" + charNum).val(passiveC);
		getSkillData("#passive-c-" + charNum, "c", false);
		
		// load in assist skills
		var assistOptions = "<option value='None'>None</option>";
		for (var assistName in assistInfo) {
			assistOptions += "<option value=\"" + assistName + "\">" + assistName + "</option>";
		}
		$("#assist-" + charNum).html(assistOptions);
		$("#assist-" + charNum).val(assist);
		getAssistData(charNum);
		
		// load in specials
		var specOptions = "<option value='None'>None</option>";
		for (var specName in specInfo) {
			specOptions += "<option value=\"" + specName + "\">" + specName + "</option>";
		}
		$("#special-" + charNum).html(specOptions);
		$("#special-" + charNum).val(special);
		getSpecialData(charNum);
		
		return;
	}
	
	// display portrait
	getPortrait((charNum === "1" ? "#atk-tab-" + selectedAttacker.toString() : "#def-tab-" + selectedDefender.toString()), charName);
	getPortrait((charNum === "1" ? "#attacker-portrait" : "#defender-portrait"), charName);

	// grey out disabled input fields
	$("#extra-char-info-" + charNum).css("color", "#5b5b5b");
	$("#extra-char-info-" + charNum + " select").attr("disabled", "disabled");
	
	// show general character info
	$("#color-" + charNum).val(singleChar.color);
	$("#weapon-type-" + charNum).val(singleChar.weapon_type);
	$("#move-type-" + charNum).val(singleChar.move_type);
	
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
	showSkills(singleChar, charNum, "a");
	showSkills(singleChar, charNum, "b");
	showSkills(singleChar, charNum, "c");
	
	// show special skill	
	var specials = "";
	var selectedSpecial = "";
	var defaultSpecials = {};
	
	if (singleChar.hasOwnProperty("special")) {
		selectedSpecial = singleChar.special[0];
		for (var specIndex = 0; specIndex < singleChar.special.length; specIndex++) {
			var specName = singleChar.special[specIndex];
			specials = "<option value=\"" + specName + "\">" + specName + "</option>" + specials;
			defaultSpecials[specName] = true;
		}
		specials = "<option value='None'>None</option>" + specials;
	} else {
		specials = "<option value='None'>None</option>";
		selectedSpecial = "None";
	}
	
	// get inherited specials
	for (var specKey in specInfo) {
		if (isInheritable(specInfo[specKey], charNum) && !defaultSpecials.hasOwnProperty(specKey)) {
			specials += "<option class='inherit' value=\"" + specKey + "\">" + specKey + "</option>";
		}
	}
	
	// show cooldown values
	showSpecCooldown(selectedSpecial, charNum, true);
	
	// set values
	$("#special-" + charNum).html(specials);
	$("#special-" + charNum).val(selectedSpecial);
	getSpecialData(charNum);
	
	// show assist skill
	var assists = "";
	var selectedAssist = "";
	var defaultAssists = {};
	
	if (singleChar.hasOwnProperty("assist")) {
		selectedAssist = singleChar.assist[0];
		for (var assistIndex = 0; assistIndex < singleChar.assist.length; assistIndex++) {
			var assistName = singleChar.assist[assistIndex];
			assists = "<option value=\"" + assistName + "\">" + assistName + "</option>" + assists;
			defaultAssists[assistName] = true;
		}
		assists = "<option value='None'>None</option>" + assists;
	} else {
		assists = "<option value='None'>None</option>";
		selectedAssist = "None";
	}
	
	// get inherited assists
	for (var assistKey in assistInfo) {
		if (isInheritable(assistInfo[assistKey], charNum) && !defaultAssists.hasOwnProperty(assistKey)) {
			assists += "<option class='inherit' value=\"" + assistKey + "\">" + assistKey + "</option>";
		}
	}
	
	// set values
	$("#assist-" + charNum).html(assists);
	$("#assist-" + charNum).val(selectedAssist);
	getAssistData(charNum);
	
	// show weapon
	var weapons = "";
	var selectedWeapon = singleChar.weapon[0];
	var defaultWeapons = {};
	
	for (var weaponIndex = 0; weaponIndex < singleChar.weapon.length; weaponIndex++) {
		var weaponName = singleChar.weapon[weaponIndex];
		weapons = "<option value=\"" + weaponName + "\">" + weaponName + "</option>" + weapons;
		defaultWeapons[weaponName] = true;
	}
	weapons = "<option value='None'>None</option>" + weapons;
	
	// get inherited weapons
	for (var weaponKey in weaponInfo) {
		if (isInheritableWeapon(weaponInfo[weaponKey], charNum) && !defaultWeapons.hasOwnProperty(weaponKey)) {
			weapons += "<option class='inherit' value=\"" + weaponKey + "\">" + weaponKey + "</option>";
		}
	}
	
	$("#weapon-" + charNum).html(weapons);
	$("#weapon-" + charNum).val(selectedWeapon);
	
	// show extra weapon info
	showWeapon(selectedWeapon, charNum, false);
}

// stores the currently selected character for later
// attacker is true if the character is in the attacker panel
function storeCharTabInfo(attacker) {
	"use strict";
	var charNum = attacker ? "1" : "2";
	var infoToStore = {};
	
	// char info
	infoToStore.character = $("#char-" + charNum).val();
	infoToStore.color = $("#color-" + charNum).val();
	infoToStore.weaponType = $("#weapon-type-" + charNum).val();
	infoToStore.moveType = $("#move-type-" + charNum).val();
	
	// weapon and skill info
	infoToStore.weapon = $("#weapon-" + charNum).val();
	infoToStore.passiveA = $("#passive-a-" + charNum).val();
	infoToStore.passiveB = $("#passive-b-" + charNum).val();
	infoToStore.passiveC = $("#passive-c-" + charNum).val();
	infoToStore.assist = $("#assist-" + charNum).val();
	infoToStore.special = $("#special-" + charNum).val();
	infoToStore.specCooldown = $("#spec-cooldown-" + charNum).val();
	
	// hp and current hp
	infoToStore.hp = $("#hp-" + charNum).val();
	infoToStore.currentHP = $("#curr-hp-" + charNum).val();
	
	// attack
	infoToStore.atk = $("#atk-" + charNum).val();
	infoToStore.atkBonus = $("#atk-bonus-" + charNum).val();
	infoToStore.atkPenalty = $("#atk-penalty-" + charNum).val();
	infoToStore.atkSpur = $("#atk-spur-" + charNum).val();
	
	// speed
	infoToStore.spd = $("#spd-" + charNum).val();
	infoToStore.spdBonus = $("#spd-bonus-" + charNum).val();
	infoToStore.spdPenalty = $("#spd-penalty-" + charNum).val();
	infoToStore.spdSpur = $("#spd-spur-" + charNum).val();
	
	// defense
	infoToStore.def = $("#def-" + charNum).val();
	infoToStore.defBonus = $("#def-bonus-" + charNum).val();
	infoToStore.defPenalty = $("#def-penalty-" + charNum).val();
	infoToStore.defSpur = $("#def-spur-" + charNum).val();
	
	// resistance
	infoToStore.res = $("#res-" + charNum).val();
	infoToStore.resBonus = $("#res-bonus-" + charNum).val();
	infoToStore.resPenalty = $("#res-penalty-" + charNum).val();
	infoToStore.resSpur = $("#res-spur-" + charNum).val();
	
	// store info
	if (attacker) {
		attackerTeam[selectedAttacker] = infoToStore;
	} else {
		defenderTeam[selectedDefender] = infoToStore;
	}
}

// gets the currently selected character and displays their info
// attacker is true if the character is in the attacker panel
function getCharTabInfo(attacker) {
	"use strict";
	var charNum = attacker ? "1" : "2";
	var charTabInfo = attacker ? attackerTeam[selectedAttacker] : defenderTeam[selectedDefender];
	
	if (!charTabInfo.hasOwnProperty("character")) { // no character stored, display default
		if (attacker) {
			$("#char-1").val($("#char-1 option:eq(0)").val());
			displayChar($("#char-1").val(), "1");
		} else {
			$("#char-2").val($("#char-2 option:eq(1)").val());
			displayChar($("#char-2").val(), "2");
		}
	} else {  // display stored info
		// get and show default character info
		$("#char-" + charNum).val(charTabInfo.character);
		displayChar(charTabInfo.character, charNum);
		
		// change extra character info if Custom unit was selected
		if (charTabInfo.character === "Custom") {
			$("#color-" + charNum).val(charTabInfo.color);
			$("#weapon-type-" + charNum).val(charTabInfo.weaponType);
			$("#move-type-" + charNum).val(charTabInfo.moveType);
		}
		
		// change hp values
		$("#hp-" + charNum).val(charTabInfo.hp);
		$(".hp-" + charNum + "-read").text(charTabInfo.hp);
		$("#curr-hp-" + charNum).val(charTabInfo.currentHP);
		
		// change attack values
		$("#atk-" + charNum).val(charTabInfo.atk);
		$("#atk-bonus-" + charNum).val(charTabInfo.atkBonus);
		$("#atk-penalty-" + charNum).val(charTabInfo.atkPenalty);
		$("#atk-spur-" + charNum).val(charTabInfo.atkSpur);
		
		// change speed values
		$("#spd-" + charNum).val(charTabInfo.spd);
		$("#spd-bonus-" + charNum).val(charTabInfo.spdBonus);
		$("#spd-penalty-" + charNum).val(charTabInfo.spdPenalty);
		$("#spd-spur-" + charNum).val(charTabInfo.spdSpur);
		
		// change defense values
		$("#def-" + charNum).val(charTabInfo.def);
		$("#def-bonus-" + charNum).val(charTabInfo.defBonus);
		$("#def-penalty-" + charNum).val(charTabInfo.defPenalty);
		$("#def-spur-" + charNum).val(charTabInfo.defSpur);
		
		// change resistance values
		$("#res-" + charNum).val(charTabInfo.res);
		$("#res-bonus-" + charNum).val(charTabInfo.resBonus);
		$("#res-penalty-" + charNum).val(charTabInfo.resPenalty);
		$("#res-spur-" + charNum).val(charTabInfo.resSpur);
		
		// change passives
		$("#passive-a-" + charNum).val(charTabInfo.passiveA);
		$("#passive-b-" + charNum).val(charTabInfo.passiveB);
		$("#passive-c-" + charNum).val(charTabInfo.passiveC);
		getSkillData(charNum, "a", false);
		getSkillData(charNum, "b", false);
		getSkillData(charNum, "c", false);
		
		// change special
		$("#special-" + charNum).val(charTabInfo.special);
		showSpecCooldown(charTabInfo.special, charNum, true);
		getSpecialData(charNum);
		
		// change assist
		$("#assist-" + charNum).val(charTabInfo.assist);
		getAssistData(charNum);
		
		// change weapon
		if (charTabInfo.character === "Custom") {
			loadWeapons(charTabInfo.weaponType, charNum);
		} 
		
		$("#weapon-" + charNum).val(charTabInfo.weapon);
		showWeapon(charTabInfo.weapon, charNum, false);
		
		// change special cooldown
		$("#spec-cooldown-" + charNum).val(charTabInfo.specCooldown);
	}
}

// marks a character tab as selected and deselects the previous
// attacker is true if we are selecting from the attacker panel, newIndex is the index of the tab to select
function selectCharTab(attacker, newIndex) {
	"use strict";
	var oldTabID = attacker ? "#atk-tab-" + selectedAttacker.toString() : "#def-tab-" + selectedDefender.toString();
	var newTabID = (attacker ? "#atk-tab-" : "#def-tab-") + newIndex.toString();
	$(oldTabID).removeClass("char-tab-selected").addClass("char-tab");
	
	var newTab = false;
	if ($(newTabID).hasClass("char-tab-unselected") && (oldTabID !== newTabID)) {
		$(newTabID).hide().removeClass("char-tab-unselected").addClass("char-tab-selected");
		newTab = true;
	} else {
		$(newTabID).removeClass("char-tab-unselected").removeClass("char-tab").addClass("char-tab-selected");
	}
	
	// store current character info
	storeCharTabInfo(attacker);
	
	// change index
	if (attacker) {
		selectedAttacker = newIndex;
	} else {
		selectedDefender = newIndex;
	}
	
	// retrieve selected character info
	getCharTabInfo(attacker);
	
	// fade in new tab
	if (newTab) {
		$(newTabID).fadeIn();
	}
}

// selects the first empty tab in a character panel, if all are take stay on the current tab
// attacker is true if we are selecting from the attacker panel
function selectEmptyCharTab(attacker) {
	var team = attacker ? attackerTeam : defenderTeam;
	var selected = attacker ? selectedAttacker : selectedDefender;
	
	for (var i = 0; i < 5; i++) {
		if (!team[i].hasOwnProperty("character") && i !== selected) {
			selectCharTab(attacker, i);
			return;
		}
	}
}

// determines if the attacker has triangle advantage
// attackColor is the color of the attacker, defendColor is the color of the defender
// returns 1 if advantage, -1 if disadvantage, 0 if neither
function triAdvantage(attackColor, defendColor) {
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
function weaponColorAdvantage(attackColor, defendColor, attackWeapon, defendWeapon) {
	"use strict";
	if (attackWeapon.hasOwnProperty("color_effective") && attackWeapon.color_effective === defendColor) {
		return 1;
	} else if (defendWeapon.hasOwnProperty("color_effective") && defendWeapon.color_effective === attackColor) {
		return -1;
	}
	
	return 0;
}

// handles after combat damage (on the defender)
// battleInfo contains all battle information, dmgAmount is the amount of damage to inflict, dmgSource is the source of the damage, victim is either 'attacker' or 'defender'
function afterCombatDmg(battleInfo, dmgAmount, dmgSource, victim) {
	"use strict";
	var inflictor = "";
	if (victim === "defender") {
		inflictor = "attacker";
	} else {
		inflictor = "defender";
	}
	
	var oldHP = battleInfo[victim].currHP;
	battleInfo[victim].currHP = Math.max(oldHP - dmgAmount, 1);
	battleInfo.logMsg += "<li class='battle-interaction'><span class='" + inflictor + "'><strong>" + battleInfo[inflictor].name + "</strong></span> inflicts after-combat damage [" + dmgSource + "]. <span class='dmg'><strong>" + dmgAmount.toString() + " damage dealt.</strong></span><br><span class='" + victim + "'><strong>" + battleInfo[victim].name + " HP:</strong> " + oldHP.toString() + " → " + battleInfo[victim].currHP.toString() + "</span></li>";
	
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
		battleInfo.logMsg += "<li class='battle-interaction'><span class='attacker'><strong>" + battleInfo.attacker.name + "</strong></span> takes damage after combat [" + dmgSource + "]. <span class='dmg'><strong>" + dmgAmount.toString() + " damage dealt.</strong></span><br><span class='attacker'><strong>" + battleInfo.attacker.name + " HP:</strong> " + oldHP.toString() + " → " + battleInfo.attacker.currHP.toString() + "</span></li>";
	} else {
		oldHP = battleInfo.defender.currHP;
		battleInfo.defender.currHP = Math.max(oldHP - dmgAmount, 1);
		battleInfo.logMsg += "<li class='battle-interaction'><span class='defender'><strong>" + battleInfo.defender.name + "</strong></span> takes damage after combat [" + dmgSource + "]. <span class='dmg'><strong>" + dmgAmount.toString() + " damage dealt.</strong></span><br><span class='defender'><strong>" + battleInfo.defender.name + " HP:</strong> " + oldHP.toString() + " → " + battleInfo.defender.currHP.toString() + "</span></li>";
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

// handles bonuses by being under a certain hp threshold
// battleInfo contains all battle information, belowThresholdMod contains all information for the bonuses, modSource is the source of the bonuses, charToUse is either "attacker" or "defender"
function belowThresholdBonus(battleInfo, belowThresholdMod, modSource, charToUse) {
	"use strict";
	for (var stat in belowThresholdMod.stat_mod) {
		battleInfo[charToUse][stat] += belowThresholdMod.stat_mod[stat];
		battleInfo.logMsg += "<li class='battle-interaction'><span class='" + charToUse + "'><strong>" + battleInfo[charToUse].name + "</strong></span> gains " + belowThresholdMod.stat_mod[stat].toString() + " " + statWord(stat) + " for having HP ≤ " + (belowThresholdMod.threshold * 100).toString() +"% [" + modSource + "].</li>";
	}
	
	return battleInfo;
}

// checks if the defender can counter
// battleInfo contains all battle information
function defCanCounter(battleInfo) {
	"use strict";
	return battleInfo.defender.weaponName !== "None" && (battleInfo.defender.weaponData.range === battleInfo.attacker.weaponData.range || battleInfo.defender.weaponData.hasOwnProperty("counter") || battleInfo.defender.passiveAData.hasOwnProperty("counter"));
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
function getCharPanelData(charNum) {
	"use strict";
	var charData = {};
	
	charData.color = $("#color-" + charNum).val();
	charData.moveType = $("#move-type-" + charNum).val();
	charData.type = $("#weapon-type-" + charNum).val();
	
	charData.name = $("#char-" + charNum).val();
	if (charData.name === "Custom") {
		charData.name = customName(charData.type, charData.moveType);
	}
	
	charData.weaponName = $("#weapon-" + charNum).val();
	charData.weaponData = $("#weapon-" + charNum).data("info");
	
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
	charData.assistData = $("#assist-" + charNum).data("info");
	
	charData.currHP = parseInt($("#curr-hp-" + charNum).val());
	charData.initHP = parseInt($("#curr-hp-" + charNum).val());
	charData.startHP = parseInt($("#curr-hp-" + charNum).val());
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

// gets info of a default character
// charName is the default character's name, charName must be a valid character and cannot be Custom
function getDefaultCharData(charName) {
	"use strict";
	var charData = {};
	
	charData.color = charInfo[charName].color;
	charData.moveType = charInfo[charName].move_type;
	charData.type = charInfo[charName].weapon_type;
	
	charData.name = charName;
	
	charData.weaponName = charInfo[charName].weapon[0];
	charData.weaponData = weaponInfo[charData.weaponName];
	
	if (charData.weaponData.hasOwnProperty("add_bonus")) {
		charData.addBonusAtk = 0;
	}
	
	charData.passiveA = charInfo[charName].hasOwnProperty("passive_a") ? charInfo[charName].passive_a[0] : "None";
	charData.passiveB = charInfo[charName].hasOwnProperty("passive_b") ? charInfo[charName].passive_b[0] : "None";
	charData.passiveC = charInfo[charName].hasOwnProperty("passive_c") ? charInfo[charName].passive_c[0] : "None";
	charData.passiveAData = charInfo[charName].hasOwnProperty("passive_a") ? skillInfo.a[charData.passiveA] : {};
	charData.passiveBData = charInfo[charName].hasOwnProperty("passive_b") ? skillInfo.b[charData.passiveB] : {};
	charData.passiveCData = charInfo[charName].hasOwnProperty("passive_c") ? skillInfo.c[charData.passiveC] : {};
	charData.special = charInfo[charName].hasOwnProperty("special") ? charInfo[charName].special[0] : "None";
	charData.specCurrCooldown = charInfo[charName].hasOwnProperty("special") ? specInfo[charData.special].cooldown : 0;
	charData.specialData = charInfo[charName].hasOwnProperty("special") ? specInfo[charData.special] : {};
	charData.assistData = charInfo[charName].hasOwnProperty("assist") ? assistInfo[charInfo[charName].assist[0]] : {};
	
	charData.currHP = charInfo[charName].hp;
	charData.initHP = charInfo[charName].hp;
	charData.startHP = charInfo[charName].hp;
	charData.hp = charInfo[charName].hp;
	charData.atk = charInfo[charName].atk;
	charData.spd = charInfo[charName].spd;
	charData.def = charInfo[charName].def;
	charData.res = charInfo[charName].res;
	charData.atkWS = charInfo[charName].atk;
	charData.spdWS = charInfo[charName].spd;
	charData.defWS = charInfo[charName].def;
	charData.resWS = charInfo[charName].res;
	
	return charData;
}

// returns an object containing all the info in the attacker and defender panels needed to simulate a battle
function getBattleInfo() {
	"use strict";
	var battleInfo = {};
	battleInfo.attacker = getCharPanelData("1");
	battleInfo.defender = getCharPanelData("2");
	battleInfo.logMsg = "";
	battleInfo.atkRange = $("#weapon-1").data("info").range;
	return battleInfo;
}

// returns an object containing all the info needed to simulate a battle between one character from one the character panels and a default character from the data
// attacker is true if we take info from the the attacker panel, charName is the name of the default character
function getBattleInfoWithDefault(attacker, charName) {
	"use strict";
	var battleInfo = {};
	
	if (attacker) {
		battleInfo.attacker = getCharPanelData("1");
		battleInfo.defender = getDefaultCharData(charName);
		battleInfo.atkRange = $("#weapon-1").data("info").range;
	} else {
		battleInfo.attacker = getDefaultCharData(charName);
		battleInfo.defender = getCharPanelData("2");
		battleInfo.atkRange = weaponInfo[battleInfo.attacker.weaponName].range;
	}
	
	battleInfo.logMsg = "";
	return battleInfo;
}

// checks if the given passive skill is a breaker skill that will activate
// passiveData contains the data for a passive skill, oppWeapon is the opponent's weapon type, initHP is the initial hp of the character with the passive, maxHP is the max hp of the character
function hasBreakerPassive(passiveData, oppWeapon, initHP, maxHP) {
	"use strict";
	return (passiveData.hasOwnProperty("breaker") && passiveData.breaker.weapon_type === oppWeapon && initHP >= checkRoundError(passiveData.breaker.threshold * maxHP));
}

// checks if the given weapon has a breaker effect that will activate
// weaponData contains the data for a weapon, oppWeapon is the opponent's weapon type
function hasBreakerWeapon(weaponData, oppWeapon) {
	"use strict";
	return (weaponData.hasOwnProperty("breaker") && weaponData.breaker.weapon_type === oppWeapon);
}

// checks if the defender can activate a riposte effect
// container contains weapon or passive skill info, initHP is the hp the defender started combat with, maxHP is the max hp of the defender, canCounter is true if the defender can counter
function canActivateRiposte(container, initHP, maxHP, canCounter) {
	"use strict";
	return (container.hasOwnProperty("riposte") && initHP >= checkRoundError(container.riposte.threshold * maxHP) && canCounter);
}

// checks if the attacker can activate brash assault
// container contains the skill info, initHP is the hp of the attacker at combat initiation, maxHP is the max hp of the attacker, defCanCounter is true if the defender can counter
function canActivateBrash(container, initHP, maxHP, canCounter) {
	"use strict";
	return container.hasOwnProperty("brash") && canCounter && initHP <= checkRoundError(container.brash.threshold * maxHP);
}

// checks if character can activate wary fighter ability
// container contains the skill info, initHP is the hp of the character, maxHP is the max hp of the character
function canActivateWary(container, initHP, maxHP) {
	"use strict";
	return container.hasOwnProperty("wary") && initHP >= checkRoundError(container.wary.threshold * maxHP);
}

// checks if defender can activate vantage ability
// container contains the skill info, initHP is the hp of the character, maxHP is the max hp of the character
function canActivateVantage(container, initHP, maxHP) {
	"use strict";
	return container.hasOwnProperty("vantage") && initHP <= checkRoundError(container.vantage.threshold * maxHP);
}

// checks if attacker can activate desperation
// container contains the skill info, initHP is the hp of the character, maxHP is the max hp of the character
function canActivateDesperation(container, initHP, maxHP) {
	"use strict";
	return container.hasOwnProperty("desperation") && initHP <= checkRoundError(container.desperation.threshold * maxHP);
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
	
	var defOldHP = defender.currHP;
	battleInfo.logMsg += "<span class='" + atkClass + "'><strong>" + attacker.name + "</strong></span> " + logIntro +". ";
	
	// determine base attack
	var atkPower = attacker.atk;
	
	if (attacker.hasOwnProperty("addBonusAtk") && attacker.addBonusAtk > 0) {
		atkPower += attacker.addBonusAtk;
		battleInfo.logMsg += "Attack is boosted by " + attacker.addBonusAtk.toString() + " [" + attacker.weaponName + "]. ";
	}
	
	// super effectiveness against movement types
	if (attacker.weaponData.hasOwnProperty("move_effective") && attacker.weaponData.move_effective === defender.moveType) {
		if (defender.passiveAData.hasOwnProperty("cancel_effective")) {
			battleInfo.logMsg += "Effectiveness against " + defender.moveType + " neutralized by opponent [" + defender.passiveA + "]. ";
		} else {
			atkPower = roundNum(atkPower * 1.5, false);
			battleInfo.logMsg += "Effectiveness against " + defender.moveType + " boosts attack by 50% [" + attacker.weaponName + "]. ";
		}
	}
	
	// super effectiveness against dragons
	if (attacker.weaponData.hasOwnProperty("dragon_effective") && (defender.type === "Red Breath" || defender.type === "Green Breath" || defender.type === "Blue Breath")) {
		if (defender.passiveAData.hasOwnProperty("cancel_effective")) {
			battleInfo.logMsg += "Effectiveness against dragons neutralized by opponent [" + defender.passiveA + "]. ";
		} else {
			atkPower = roundNum(atkPower * 1.5, false);
			battleInfo.logMsg += "Effectiveness against dragons increases attack by 50% [" + attacker.weaponName + "]. ";
		}
	}
	
	// triangle advantage attack modifier
	var weaponColorAdv = weaponColorAdvantage(attacker.color, defender.color, attacker.weaponData, defender.weaponData);
	var triAdv = triAdvantage(attacker.color, defender.color);
	var atkMod = 1;
	
	// get base triangle advantage
	if (weaponColorAdv > 0) {
		atkMod = 1.2;
		battleInfo.logMsg += "Weapon advantage against " + defender.color + " boosts attack by 20% [" + attacker.weaponName + "]. ";
	} else if (weaponColorAdv < 0) {
		atkMod = 0.8;
		battleInfo.logMsg += "Opponent's weapon advantage reduces attack by 20% [" + defender.weaponName + "]. ";
	} else if (triAdv > 0) {
		atkMod = 1.2;
		battleInfo.logMsg += "Triangle advantage boosts attack by 20%. ";
	} else if (triAdv < 0) {
		atkMod = 0.8;
		battleInfo.logMsg += "Triangle disadvantage reduces attack by 20%. ";
	}
	
	// check for any additional triangle advantage boost, then calculate if needed
	if (atkMod > 1) {
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
		atkPower = roundNum(atkPower * atkMod, false);
	} else if (atkMod < 1) {
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
		atkPower = roundNum(atkPower * atkMod, true);
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
	
	// calculate base damage
	var dmg = atkPower - defReduct;
	
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
	
	// check for bonus damage on special proc
	if (attacker.weaponData.hasOwnProperty("spec_damage_bonus") && (atkSpec || ((attacker.specialData.hasOwnProperty("dmg_mod") || attacker.specialData.hasOwnProperty("heal_dmg")) && attacker.specCurrCooldown <= 0))) {
		dmg += attacker.weaponData.spec_damage_bonus;
		battleInfo.logMsg += "Damage boosted by " + attacker.weaponData.spec_damage_bonus.toString() + " on Special trigger [" + attacker.weaponName + "]. ";
	}
	
	// cap damage at 0 if negative
	dmg = Math.max(dmg, 0);
	
	// halve staff damage
	if (attacker.type === "Staff") {
		dmg = roundNum(dmg / 2, false);
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
	
	// double check dmg
	dmg = Math.max(dmg, 0);
	
	// print damage dealt
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
		battleInfo = healDmg(battleInfo, (defOldHP - defender.currHP), attacker.weaponData.heal_dmg + attacker.specialData.heal_dmg, attacker.weaponName + ", " + attacker.special, initiator);
		didHeal = true;
		atkSpec = true;
	} else if (attacker.weaponData.hasOwnProperty("heal_dmg")) {
		battleInfo = healDmg(battleInfo, (defOldHP - defender.currHP), attacker.weaponData.heal_dmg, attacker.weaponName, initiator);
		didHeal = true;
	} else if (attacker.specialData.hasOwnProperty("heal_dmg") && attacker.specCurrCooldown <= 0) {
		battleInfo = healDmg(battleInfo, (defOldHP - defender.currHP), attacker.specialData.heal_dmg, attacker.special, initiator);
		didHeal = true;
		atkSpec = true;
	}
	
	if (didHeal) {
		healMsg = " <span class='heal-seperator'>|</span> <span class='" + atkClass + "'><strong>" + attacker.name + " HP:</strong> " + atkOldHP.toString() + " → " + attacker.currHP.toString() + "</span>";
	}
	
	// print hp before and after
	battleInfo.logMsg += "<br><span class='" + defClass + "'><strong>" + defender.name + " HP:</strong> " + defOldHP.toString() + " → " + defender.currHP.toString() + "</span>" + healMsg + "</li>";
	
	// update cooldowns
	if (atkSpec) {
		attacker.specCurrCooldown = getSpecialCooldown(attacker.specialData, attacker.weaponData, attacker.assistData);
	} else if (attacker.specCurrCooldown > 0) {
		attacker.specCurrCooldown -= 1;
	}
	
	if (defSpec) {
		defender.specCurrCooldown = getSpecialCooldown(defender.specialData, defender.weaponData, defender.assistData);
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
// battleInfo contains all the inital combat data before the combat starts, displayMsg is true if we need to print the battle log
// returns battleInfo
function simBattle(battleInfo, displayMsg) {
	"use strict";
	
	// check if attacker has a weapon, if not no attack
	if ($("#weapon-1").val() === "None") {
		$("#interaction-list").stop(true, true).hide().html("<li class='battle-interaction-only'><span class='attacker'><strong>" + $("#char-1").val() + "</strong></span> cannot attack without a weapon.</li>");
		$("#hp-remain-1").stop(true, true).hide().text($("#curr-hp-1").val().toString());
		$("#hp-remain-2").stop(true, true).hide().text($("#curr-hp-2").val().toString());
		if (openLog) {
			$("#interaction-list").fadeIn("slow");
		}
		$("#hp-remain-1").fadeIn("slow");
		$("#hp-remain-2").fadeIn("slow");
		
		return;
	}
	
	// can defender counter
	var defCC = defCanCounter(battleInfo);
	
	// AOE damage before combat
	if (battleInfo.attacker.specialData.hasOwnProperty("before_combat_aoe") && battleInfo.attacker.specCurrCooldown <= 0) {
		// reset cooldown
		battleInfo.attacker.specCurrCooldown = getSpecialCooldown(battleInfo.attacker.specialData, battleInfo.attacker.weaponData, battleInfo.attacker.assistData);
		
		// calculate damage
		var aoeDmg = battleInfo.attacker.atkWS ;
		if (battleInfo.attacker.weaponData.magical) {
			aoeDmg -= battleInfo.defender.resWS;
		} else {
			aoeDmg -= battleInfo.defender.defWS;
		}
		
		// check for damage multiplier
		if (battleInfo.attacker.specialData.hasOwnProperty("aoe_dmg_mod")) {
			aoeDmg = roundNum(aoeDmg * battleInfo.attacker.specialData.aoe_dmg_mod, false);
		}
		
		// cap dmg at 0
		aoeDmg = Math.max(aoeDmg, 0);
		
		var oldHP = battleInfo.defender.currHP;
		battleInfo.defender.currHP = Math.max(battleInfo.defender.currHP - aoeDmg, 1);
		battleInfo.defender.initHP = battleInfo.defender.currHP;
		battleInfo.logMsg += "<li class='battle-interaction'><span class='attacker'><strong>" + battleInfo.attacker.name + "</strong></span> deals AOE damage before combat [" + battleInfo.attacker.special + "]. <span class='dmg'><strong>" + aoeDmg.toString() + " damage dealt.</strong></span><br><span class='defender'><strong>" + battleInfo.defender.name + " HP:</strong> " + oldHP.toString() + " → " + battleInfo.defender.currHP.toString() + "</span></li>";
	}
	
	// breaker info
	var atkBreakerPassive = hasBreakerPassive(battleInfo.attacker.passiveBData, battleInfo.defender.type, battleInfo.attacker.initHP, battleInfo.attacker.hp);
	var atkBreakerWeapon = hasBreakerWeapon(battleInfo.attacker.weaponData, battleInfo.defender.type);
	var defBreakerPassive = hasBreakerPassive(battleInfo.defender.passiveBData, battleInfo.attacker.type, battleInfo.defender.initHP, battleInfo.defender.hp);
	var defBreakerWeapon = hasBreakerWeapon(battleInfo.defender.weaponData, battleInfo.attacker.type);
	var atkBreakerSource = atkBreakerPassive ? battleInfo.attacker.passiveB : battleInfo.attacker.weaponName;
	var defBreakerSource = defBreakerPassive ? battleInfo.defender.passiveB : battleInfo.defender.weaponName;
	
	// quick riposte info
	var defRipostePassive = canActivateRiposte(battleInfo.defender.passiveBData, battleInfo.defender.initHP, battleInfo.defender.hp, defCC);
	var defRiposteWeapon = canActivateRiposte(battleInfo.defender.weaponData, battleInfo.defender.initHP, battleInfo.defender.hp, defCC);
	var defRiposteSource = defRipostePassive ? battleInfo.defender.passiveB : battleInfo.defender.weaponName;
	
	// other follow-up info
	var atkWary = canActivateWary(battleInfo.attacker.passiveBData, battleInfo.attacker.initHP, battleInfo.attacker.hp);
	var defWary = canActivateWary(battleInfo.defender.passiveBData, battleInfo.defender.initHP, battleInfo.defender.hp);
	var atkBrash = canActivateBrash(battleInfo.attacker.passiveBData, battleInfo.attacker.initHP, battleInfo.attacker.hp, defCC);
	
	// vantage info
	var vantage = false;
	var vantagePassive = canActivateVantage(battleInfo.defender.passiveBData, battleInfo.defender.initHP, battleInfo.defender.hp);
	var vantageWeapon = canActivateVantage(battleInfo.defender.weaponData, battleInfo.defender.initHP, battleInfo.defender.hp);
	var vantageSource = vantagePassive ? battleInfo.defender.passiveB : battleInfo.defender.weaponName;
	
	// desperation info
	var desperation = false;
	var desperationPassive = canActivateDesperation(battleInfo.attacker.passiveBData, battleInfo.attacker.initHP, battleInfo.attacker.hp);
	var desperationWeapon = canActivateDesperation(battleInfo.attacker.weaponData, battleInfo.attacker.initHP, battleInfo.attacker.hp);
	var desperationSource = desperationPassive ? battleInfo.attacker.passiveB : battleInfo.attacker.weaponName;
	
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
	
	// below hp threshold bonus
	if (battleInfo.attacker.weaponData.hasOwnProperty("below_threshold_mod") && battleInfo.attacker.initHP <= checkRoundError(battleInfo.attacker.weaponData.below_threshold_mod.threshold * battleInfo.attacker.hp)) {
		battleInfo = belowThresholdBonus(battleInfo, battleInfo.attacker.weaponData.below_threshold_mod, battleInfo.attacker.weaponName, "attacker");
	} 
	if (battleInfo.defender.weaponData.hasOwnProperty("below_threshold_mod") && battleInfo.defender.initHP <= checkRoundError(battleInfo.defender.weaponData.below_threshold_mod.threshold * battleInfo.defender.hp)) {
		battleInfo = belowThresholdBonus(battleInfo, battleInfo.defender.weaponData.below_threshold_mod, battleInfo.defender.weaponName, "defender");
	}
	
	// outspeed info
	var atkOutspeed = battleInfo.attacker.spd >= battleInfo.defender.spd + 5;
	var defOutspeed = battleInfo.defender.spd >= battleInfo.attacker.spd + 5;
	
	// vantage
	if ((battleInfo.defender.weaponName !== "None" && vantagePassive) || vantageWeapon) {
		if (battleInfo.defender.weaponData.range === battleInfo.attacker.weaponData.range) {
			battleInfo = singleCombat(battleInfo, false, "counter-attacks first [" + vantageSource + "]", false);
			vantage = true;
		} else if (battleInfo.defender.weaponData.hasOwnProperty("counter")) {
			battleInfo = singleCombat(battleInfo, false, "counter-attacks first, ignoring distance [" + vantageSource + ", " + battleInfo.defender.weaponName + "]", false);
			vantage = true;
		} else if (battleInfo.defender.passiveAData.hasOwnProperty("counter")) {
			battleInfo = singleCombat(battleInfo, false, "counter-attacks first, ignoring distance [" + vantageSource + ", " + battleInfo.defender.passiveA + "]", false);
			vantage = true;
		}
	}
	
	// attacker initiates
	if (battleInfo.attacker.currHP > 0) {
		battleInfo = singleCombat(battleInfo, true, "attacks", false);
	}
		
	// desperation follow up
	if ((desperationPassive || desperationWeapon) && battleInfo.attacker.currHP > 0 && battleInfo.defender.currHP > 0) {
		if (!defBreakerPassive && !defBreakerWeapon && !atkWary && !defWary) { // regular conditions
			if (atkBreakerPassive || atkBreakerWeapon) { // follow with breaker
				desperation = true;
				if ((defRiposteWeapon || defRipostePassive) && defOutspeed) { // foe can follow-up
					battleInfo = singleCombat(battleInfo, true, "makes an immediate, automatic follow-up attack [" + desperationSource + ", " + atkBreakerSource + "]", false);
				} else {
					battleInfo = singleCombat(battleInfo, true, "makes an immediate follow-up attack, while canceling any follow-up attack from the opponent [" + desperationSource + ", " + atkBreakerSource + "]", false);
				}
			} else if (atkOutspeed) { // follow with speed
				desperation = true;
				battleInfo = singleCombat(battleInfo, true, "makes an immediate follow-up attack [" + desperationSource + "]", false);
			} else if (atkBrash) { // follow with brash assault
				desperation = true;
				battleInfo = singleCombat(battleInfo, true, "makes an immediate, automatic follow-up attack [" + desperationSource + ", " + battleInfo.attacker.passiveB + "]", false);
			}
		} else if ((defWary || defBreakerPassive || defBreakerWeapon) && !atkWary && atkOutspeed) { // defender cancels follow-up
			if (atkBreakerPassive || atkBreakerWeapon) {
				desperation = true;
				battleInfo = singleCombat(battleInfo, true, "makes an immediate follow-up attack, while canceling any follow-up attack from the opponent [" + desperationSource + ", " + atkBreakerSource + "]", false);
			} else if (atkBrash) {
				desperation = true;
				battleInfo = singleCombat(battleInfo, true, "makes an immediate, automatic follow-up attack [" + desperationSource + ", " + battleInfo.attacker.passiveB + "]", false);
			}
		}	
	}
	
	// defender will try to counter-attack if they haven't been ko'd
	if (battleInfo.attacker.currHP > 0 && battleInfo.defender.currHP > 0) {
		// defender must be in range to counter-attack or have a counter ability
		if (!vantage) {
			if (battleInfo.defender.weaponName !== "None" && battleInfo.defender.weaponData.range === battleInfo.attacker.weaponData.range) {
				battleInfo = singleCombat(battleInfo, false, "counter-attacks", false);
			} else if (battleInfo.defender.weaponName !== "None" && battleInfo.defender.weaponData.hasOwnProperty("counter")) {	
				battleInfo = singleCombat(battleInfo, false, "counter-attacks, ignoring distance [" + battleInfo.defender.weaponName + "]", false);
			} else if (battleInfo.defender.weaponName !== "None" && battleInfo.defender.passiveAData.hasOwnProperty("counter")) {	
				battleInfo = singleCombat(battleInfo, false, "counter-attacks, ignoring distance [" + battleInfo.defender.passiveA + "]", false);
			} else {
				battleInfo.logMsg += "<li class='battle-interaction'><span class='defender'><strong>" + battleInfo.defender.name + "</strong></span> " + " is unable to counter-attack.</li>";
			}
		}
		
		// if attacker hasn't been ko'd, check for follow ups
		if (battleInfo.attacker.currHP > 0) {
			
			// wary fighter
			if (atkWary) { // attacker wary fighter
				// check if defender can follow up with breaker
				if ((defBreakerPassive || defBreakerWeapon) && defCC && defOutspeed) {
					battleInfo = singleCombat(battleInfo, false, "makes a follow-up attack, while canceling any follow-up attack from the opponent [" + defBreakerSource + "]", false);
				} 
				
				// check if defender can follow up with quick riposte ability
				else if ((defRiposteWeapon || defRipostePassive) && defOutspeed) {
					battleInfo = singleCombat(battleInfo, false, "makes an automatic follow-up attack [" + defRiposteSource + "]", false);
				} 
				
				// no follow ups
				else {
					battleInfo.logMsg += "<li class='battle-interaction'><span class='attacker'><strong>" + battleInfo.attacker.name + "</strong></span> prevents any further follow-up attacks [" + battleInfo.attacker.passiveB + "].</li>";
				}
			} else if (defWary) { // defender wary fighter
				// check if attacker can follow up with breaker
				if ((atkBreakerPassive || atkBreakerWeapon) && atkOutspeed && !desperation) {
					battleInfo = singleCombat(battleInfo, true, "makes a follow-up attack, while canceling any follow-up attack from the opponent [" + atkBreakerSource + "]", false);
				}
				
				// check if attacker can follow up with brash assault
				else if (atkBrash && atkOutspeed && !desperation) {
					battleInfo = singleCombat(battleInfo, true, "makes an automatic follow-up attack [" + battleInfo.attacker.passiveB + "]", false);
				} 
				
				// no follow ups
				else if (!desperation || defRiposteWeapon) {
					battleInfo.logMsg += "<li class='battle-interaction'><span class='defender'><strong>" + battleInfo.defender.name + "</strong></span> prevents any further follow-up attacks [" + battleInfo.defender.passiveB + "].</li>";	
				}
			}
			
			// breaker skills
			else if ((atkBreakerPassive || atkBreakerWeapon) && (defBreakerPassive || defBreakerWeapon)) {	// double breakers
				if (atkOutspeed && !desperation) { // regular attacker follow
					battleInfo = singleCombat(battleInfo, true, "makes a follow-up attack, while canceling any follow-up attack from the opponent [" + atkBreakerSource + "]", false);
				} else if (defOutspeed) { // regular defender follow
					if (defCC) { // defender cannot attack
						battleInfo = singleCombat(battleInfo, false, "makes a follow-up attack, while canceling any follow-up attack from the opponent [" + defBreakerSource + "]", false);
					} else { // defender attacks
						battleInfo.logMsg += "<li class='battle-interaction'><span class='defender'><strong>" + battleInfo.defender.name + "</strong></span> cancels any follow-up attacks from the opponent [" + defBreakerSource + "].</li>";
					}
				} else if (!desperation) { // cancel all
					battleInfo.logMsg += "<li class='battle-interaction'>Breaker skills cancel follow-up attacks from either character [" + atkBreakerSource + ", " + defBreakerSource + "].</li>";
				}
			} else if ((atkBreakerPassive || atkBreakerWeapon)) {  // attacker has breaker
				// check if defender can activate quick riposte ability
				if ((defRiposteWeapon || defRipostePassive) && defOutspeed) {
					if (!desperation) {
						battleInfo = singleCombat(battleInfo, true, "makes an automatic follow-up attack [" + atkBreakerSource + "]", false);	
					}
					if (battleInfo.defender.currHP > 0) {
						battleInfo = singleCombat(battleInfo, false, "makes an automatic follow-up attack [" + defRiposteSource + "]", false);
					}
				} else if (!desperation) {
					battleInfo = singleCombat(battleInfo, true, "makes a follow-up attack, while canceling any follow-up attack from the opponent [" + atkBreakerSource + "]", false);
				}
			} else if (defBreakerPassive || defBreakerWeapon) {  // defender breaker passive
				// check if attacker can follow up with brash assault
				var brashAct = false;
				if (atkBrash && atkOutspeed && !desperation) {
					battleInfo = singleCombat(battleInfo, true, "makes an automatic follow-up attack [" + battleInfo.attacker.passiveB + "]", false);
					brashAct = true;
				} 
				
				if (defCC && battleInfo.defender.currHP > 0) {
					if (brashAct || desperation) {
						battleInfo = singleCombat(battleInfo, false, "makes an automatic follow-up attack [" + defBreakerSource + "]", false);
					} else {
						battleInfo = singleCombat(battleInfo, false, "makes a follow-up attack, while canceling any follow-up attack from the opponent [" + defBreakerSource + "]", false);
					}
				} else if (!brashAct && !desperation && battleInfo.defender.currHP > 0) {
					battleInfo.logMsg +=  "<li class='battle-interaction'><span class='defender'><strong>" + battleInfo.defender.name + "</strong></span> cancels any follow-up attacks from the opponent [" + defBreakerSource + "].</li>";
				}
			} 
			
			// regular follow ups
			else {
				var defendFollow = false;		// true if defender makes a follow up attack
				var attackFollow = desperation;	// true if attacker makes a follow up attack
				
				// check if defender activated vantage and can follow up
				if (vantage && (defOutspeed)) {
					battleInfo = singleCombat(battleInfo, false, "makes a follow-up attack", false);
					defendFollow = true;
				}
				
				// check for brash assault
				if (atkBrash && !attackFollow && battleInfo.attacker.currHP > 0) {
					battleInfo = singleCombat(battleInfo, true, "makes an automatic follow-up attack [" + battleInfo.attacker.passiveB + "]", false);
					attackFollow = true;
				}
				
				// regular follow up attack
				if (!attackFollow && atkOutspeed && battleInfo.attacker.currHP > 0 && battleInfo.defender.currHP > 0) { // attacker
					battleInfo = singleCombat(battleInfo, true, "makes a follow-up attack", false);
					attackFollow = true;
				} else if (!defendFollow && defOutspeed && defCC && battleInfo.attacker.currHP > 0 && battleInfo.defender.currHP > 0) { // defender
					battleInfo = singleCombat(battleInfo, false, "makes a follow-up attack", false);
					defendFollow = true;
				}

				// check for quick riposte ability
				if ((defRiposteWeapon || defRipostePassive) && battleInfo.defender.currHP > 0 && !defendFollow) {
					battleInfo = singleCombat(battleInfo, false, "makes an automatic follow-up attack [" + defRiposteSource + "]", false);
				}
			}
		}
		
		// check for poison damage
		if (battleInfo.attacker.passiveBData.hasOwnProperty("poison") && battleInfo.attacker.currHP > 0 && battleInfo.defender.currHP > 0) {
			battleInfo = afterCombatDmg(battleInfo, battleInfo.attacker.passiveBData.poison, battleInfo.attacker.passiveB, "defender");
		}
		if (battleInfo.attacker.weaponData.hasOwnProperty("poison") && battleInfo.defender.currHP > 0) {
			battleInfo = afterCombatDmg(battleInfo, battleInfo.attacker.weaponData.poison, battleInfo.attacker.weaponName, "defender");
		}
		if (battleInfo.defender.weaponData.hasOwnProperty("poison") && battleInfo.attacker.currHP > 0 && defCC) {
			battleInfo = afterCombatDmg(battleInfo, battleInfo.defender.weaponData.poison, battleInfo.defender.weaponName, "attacker");
		}
		if (battleInfo.attacker.weaponData.hasOwnProperty("initiate_poison") && battleInfo.defender.currHP > 0) {
			battleInfo = afterCombatDmg(battleInfo, battleInfo.attacker.weaponData.initiate_poison, battleInfo.attacker.weaponName, "defender");
		}
	}

	// check for recoil damage
	if (battleInfo.attacker.currHP > 0 && battleInfo.attacker.passiveAData.hasOwnProperty("recoil_dmg")) {
		battleInfo = recoilDmg(battleInfo, battleInfo.attacker.passiveAData.recoil_dmg, battleInfo.attacker.passiveA, true);
	}
	if (battleInfo.defender.currHP > 0 && battleInfo.defender.passiveAData.hasOwnProperty("recoil_dmg")) {
		battleInfo = recoilDmg(battleInfo, battleInfo.defender.passiveAData.recoil_dmg, battleInfo.defender.passiveA, false);
	}
	
	// display results
	if (displayMsg) {
		$("#interaction-list").stop(true, true).hide().html(battleInfo.logMsg);
		$("#result-msg").stop(true, true).hide();
		$("#hp-remain-1").stop(true, true).hide().text(battleInfo.attacker.startHP.toString() + " → " + battleInfo.attacker.currHP.toString());
		$("#hp-remain-2").stop(true, true).hide().text(battleInfo.defender.startHP.toString() + " → " + battleInfo.defender.currHP.toString());
		$("#interaction-list").children().first().removeClass("battle-interaction").addClass("battle-interaction-first");
		$("#interaction-list").children().last().removeClass("battle-interaction").addClass("battle-interaction-final");

		// victory message
		if (battleInfo.attacker.currHP === 0) {
			$("#result-msg").text("Defender is victorious!");
			$("#result-msg").css("color", "#e34262");
		} else if (battleInfo.defender.currHP === 0) {
			$("#result-msg").text("Attacker is victorious!");
			$("#result-msg").css("color", "deepskyblue");
		} else {
			$("#result-msg").text("Draw!");
			$("#result-msg").css("color", "white");
		}

		if (openLog) {
			$("#interaction-list").fadeIn("slow");
		}
		$("#hp-remain-1").fadeIn("slow");
		$("#hp-remain-2").fadeIn("slow");
		$("#result-msg").fadeIn("slow");
	}
	
	return battleInfo;
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
	
	// select character slot in each panel
	selectCharTab(true, 0);
	selectCharTab(false, 0);
	
	// set default characters
	$("#char-1 option:eq(0)").attr("selected", "selected");
	displayChar($("#char-1").val(), "1");
	$("#char-2 option:eq(1)").attr("selected", "selected");
	displayChar($("#char-2").val(), "2");

	// simulate initial battle
	simBattle(getBattleInfo(), true);
}

// sets the class for the given character tab
// attacker is true if the tab is in the attacker panel, charIndex is the index of the character in the panel
function setCharTabClass(attacker, charIndex) {
	"use strict";
	var tabID = attacker ? "#atk-tab-" + charIndex.toString() : "#def-tab-" + charIndex.toString();
	var tabSelected = attacker ? selectedAttacker : selectedDefender;
	var tabInfo = attacker ? attackerTeam[charIndex] : defenderTeam[charIndex];
	
	if (charIndex === tabSelected) {
		$(tabID).removeClass("char-tab-unselected").removeClass("char-tab").addClass("char-tab-selected");
	} else if (tabInfo.hasOwnProperty("character")) {
		$(tabID).removeClass("char-tab-unselected").removeClass("char-tab-selected").addClass("char-tab");
	} else {
		$(tabID).removeClass("char-tab").removeClass("char-tab-selected").addClass("char-tab-unselected");
	}
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

// shows or hides the given div (used with the swap function)
// divID is the id of the div to show/hide, visible is the visibility of the div, hasSwapped is true if the data has been swapped
function setVisible(divID, visible, hasSwapped) {
	"use strict";
	if (visible && hasSwapped) {
		$(divID).stop(true, true).show(700);
	} else if (!visible && !hasSwapped) {
		$(divID).stop(true, true).hide(700);
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
	
	oldAtkInfo.weapon = $("#weapon-1").html();
	oldAtkInfo.selectedWeapon = $("#weapon-1").val();
	oldAtkInfo.weaponData = $("#weapon-1").data("info");
	oldAtkInfo.weaponMight = $("#weapon-might-1").text();
	oldAtkInfo.weaponRange = $("#weapon-range-1").text();
	oldAtkInfo.weaponMagical = $("#weapon-magical-1").text();
	oldAtkInfo.weaponDesc = $("#weapon-desc-1").text();
	
	oldAtkInfo.passiveA = $("#passive-a-1").html();
	oldAtkInfo.selectedPassiveA = $("#passive-a-1").val();
	oldAtkInfo.passiveAData = $("#passive-a-1").data("info");
	oldAtkInfo.passiveADesc = $("#passive-a-desc-1").text();
	oldAtkInfo.passiveB = $("#passive-b-1").html();
	oldAtkInfo.selectedPassiveB = $("#passive-b-1").val();
	oldAtkInfo.passiveBData = $("#passive-b-1").data("info");
	oldAtkInfo.passiveBDesc = $("#passive-b-desc-1").text();
	oldAtkInfo.passiveC = $("#passive-c-1").html();
	oldAtkInfo.selectedPassiveC = $("#passive-c-1").val();
	oldAtkInfo.passiveCData = $("#passive-c-1").data("info");
	oldAtkInfo.passiveCDesc = $("#passive-c-desc-1").text();
	oldAtkInfo.assist = $("#assist-1").html();
	oldAtkInfo.selectedAssist = $("#assist-1").val();
	oldAtkInfo.assistData = $("#assist-1").data("info");
	oldAtkInfo.assistDesc = $("#assist-desc-1").text();
	oldAtkInfo.special = $("#special-1").html();
	oldAtkInfo.selectedSpecial = $("#special-1").val();
	oldAtkInfo.specialData = $("#special-1").data("info");
	oldAtkInfo.specialDesc = $("#special-desc-1").text();
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
	
	oldAtkInfo.extraCharInfoVisible = $("#extra-char-info-1").stop(true, true).is(":visible");
	oldAtkInfo.extraWeaponInfoVisible = $("#extra-weapon-info-1").stop(true, true).is(":visible");
	oldAtkInfo.extraPassiveAInfoVisible = $("#extra-passive-a-info-1").stop(true, true).is(":visible");
	oldAtkInfo.extraPassiveBInfoVisible = $("#extra-passive-b-info-1").stop(true, true).is(":visible");
	oldAtkInfo.extraPassiveCInfoVisible = $("#extra-passive-c-info-1").stop(true, true).is(":visible");
	oldAtkInfo.extraAssistInfoVisible = $("#extra-assist-info-1").stop(true, true).is(":visible");
	oldAtkInfo.extraSpecialInfoVisible = $("#extra-special-info-1").stop(true, true).is(":visible");
	
	// place defender info in attacker panel
	setVisible("#extra-char-info-1", $("#extra-char-info-2").stop(true, true).is(":visible"), false);
	setVisible("#extra-weapon-info-1", $("#extra-weapon-info-2").stop(true, true).is(":visible"), false);
	setVisible("#extra-passive-a-info-1", $("#extra-passive-a-info-2").stop(true, true).is(":visible"), false);
	setVisible("#extra-passive-b-info-1", $("#extra-passive-b-info-2").stop(true, true).is(":visible"), false);
	setVisible("#extra-passive-c-info-1", $("#extra-passive-c-info-2").stop(true, true).is(":visible"), false);
	setVisible("#extra-assist-info-1", $("#extra-assist-info-2").stop(true, true).is(":visible"), false);
	setVisible("#extra-special-info-1", $("#extra-special-info-2").stop(true, true).is(":visible"), false);
	
	$("#char-1").val($("#char-2").val());
	$("#color-1").val($("#color-2").val());
	$("#weapon-type-1").val($("#weapon-type-2").val());
	$("#move-type-1").val($("#move-type-2").val());
	
	$("#weapon-1").html($("#weapon-2").html());
	$("#weapon-1").val($("#weapon-2").val());
	$("#weapon-1").data("info", $("#weapon-2").data("info"));
	$("#weapon-might-1").text($("#weapon-might-2").text());
	$("#weapon-range-1").text($("#weapon-range-2").text());
	$("#weapon-magical-1").text($("#weapon-magical-2").text());
	$("#weapon-desc-1").text($("#weapon-desc-2").text());
	
	$("#passive-a-1").html($("#passive-a-2").html());
	$("#passive-a-1").val($("#passive-a-2").val());
	$("#passive-a-1").data("info", $("#passive-a-2").data("info"));
	$("#passive-a-desc-1").text($("#passive-a-desc-2").text());
	$("#passive-b-1").html($("#passive-b-2").html());
	$("#passive-b-1").val($("#passive-b-2").val());
	$("#passive-b-1").data("info", $("#passive-b-2").data("info"));
	$("#passive-b-desc-1").text($("#passive-b-desc-2").text());
	$("#passive-c-1").html($("#passive-c-2").html());
	$("#passive-c-1").val($("#passive-c-2").val());
	$("#passive-c-1").data("info", $("#passive-c-2").data("info"));
	$("#passive-c-desc-1").text($("#passive-c-desc-2").text());
	$("#assist-1").html($("#assist-2").html());
	$("#assist-1").val($("#assist-2").val());
	$("#assist-1").data("info", $("#assist-2").data("info"));
	$("#assist-desc-1").text($("#assist-desc-2").text());
	$("#special-1").html($("#special-2").html());
	$("#special-1").val($("#special-2").val());
	$("#special-1").data("info", $("#special-2").data("info"));
	$("#special-desc-1").text($("#special-desc-2").text());
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
	showSpecCooldown($("#special-1").val(), "1", false);
	updateSpecCooldown("1");
	
	setVisible("#extra-char-info-1", $("#extra-char-info-2").stop(true, true).is(":visible"), true);
	setVisible("#extra-weapon-info-1", $("#extra-weapon-info-2").stop(true, true).is(":visible"), true);
	setVisible("#extra-passive-a-info-1", $("#extra-passive-a-info-2").stop(true, true).is(":visible"), true);
	setVisible("#extra-passive-b-info-1", $("#extra-passive-b-info-2").stop(true, true).is(":visible"), true);
	setVisible("#extra-passive-c-info-1", $("#extra-passive-c-info-2").stop(true, true).is(":visible"), true);
	setVisible("#extra-assist-info-1", $("#extra-assist-info-2").stop(true, true).is(":visible"), true);
	setVisible("#extra-special-info-1", $("#extra-special-info-2").stop(true, true).is(":visible"), true);
	
	// place attacker info in defender panel
	setVisible("#extra-char-info-2", oldAtkInfo.extraCharInfoVisible, false);
	setVisible("#extra-weapon-info-2", oldAtkInfo.extraWeaponInfoVisible, false);
	setVisible("#extra-passive-a-info-2", oldAtkInfo.extraPassiveAInfoVisible, false);
	setVisible("#extra-passive-b-info-2", oldAtkInfo.extraPassiveBInfoVisible, false);
	setVisible("#extra-passive-c-info-2", oldAtkInfo.extraPassiveCInfoVisible, false);
	setVisible("#extra-assist-info-2", oldAtkInfo.extraAssistInfoVisible, false);
	setVisible("#extra-special-info-2", oldAtkInfo.extraSpecialInfoVisible, false);
	
	$("#char-2").val(oldAtkInfo.name);
	$("#color-2").val(oldAtkInfo.color);
	$("#weapon-type-2").val(oldAtkInfo.weaponType);
	$("#move-type-2").val(oldAtkInfo.moveType);
	
	$("#weapon-2").html(oldAtkInfo.weapon);
	$("#weapon-2").val(oldAtkInfo.selectedWeapon);
	$("#weapon-2").data("info", oldAtkInfo.weaponData);
	$("#weapon-might-2").text(oldAtkInfo.weaponMight);
	$("#weapon-range-2").text(oldAtkInfo.weaponRange);
	$("#weapon-magical-2").text(oldAtkInfo.weaponMagical);
	$("#weapon-desc-2").text(oldAtkInfo.weaponDesc);
	
	$("#passive-a-2").html(oldAtkInfo.passiveA);
	$("#passive-a-2").val(oldAtkInfo.selectedPassiveA);
	$("#passive-a-2").data("info", oldAtkInfo.passiveAData);
	$("#passive-a-desc-2").text(oldAtkInfo.passiveADesc);
	$("#passive-b-2").html(oldAtkInfo.passiveB);
	$("#passive-b-2").val(oldAtkInfo.selectedPassiveB);
	$("#passive-b-2").data("info", oldAtkInfo.passiveBData);
	$("#passive-b-desc-2").text(oldAtkInfo.passiveBDesc);
	$("#passive-c-2").html(oldAtkInfo.passiveC);
	$("#passive-c-2").val(oldAtkInfo.selectedPassiveC);
	$("#passive-c-2").data("info", oldAtkInfo.passiveCData);
	$("#passive-c-desc-2").text(oldAtkInfo.passiveCDesc);
	$("#assist-2").html(oldAtkInfo.assist);
	$("#assist-2").val(oldAtkInfo.selectedAssist);
	$("#assist-2").data("info", oldAtkInfo.assistData);
	$("#assist-desc-2").text(oldAtkInfo.assistDesc);
	$("#special-2").html(oldAtkInfo.special);
	$("#special-2").val(oldAtkInfo.selectedSpecial);
	$("#special-2").data("info", oldAtkInfo.specialData);
	$("#special-desc-2").text(oldAtkInfo.specialDesc);
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
	showSpecCooldown($("#special-2").val(), "2", false);
	updateSpecCooldown("2");
	
	setVisible("#extra-char-info-2", oldAtkInfo.extraCharInfoVisible, true);
	setVisible("#extra-weapon-info-2", oldAtkInfo.extraWeaponInfoVisible, true);
	setVisible("#extra-passive-a-info-2", oldAtkInfo.extraPassiveAInfoVisible, true);
	setVisible("#extra-passive-b-info-2", oldAtkInfo.extraPassiveBInfoVisible, true);
	setVisible("#extra-passive-c-info-2", oldAtkInfo.extraPassiveCInfoVisible, true);
	setVisible("#extra-assist-info-2", oldAtkInfo.extraAssistInfoVisible, true);
	setVisible("#extra-special-info-2", oldAtkInfo.extraSpecialInfoVisible, true);
	
	// swap teams
	var tempTeam = attackerTeam;
	var tempSelected = selectedAttacker;
	attackerTeam = defenderTeam;
	selectedAttacker = selectedDefender;
	defenderTeam = tempTeam;
	selectedDefender = tempSelected;
	
	// swap portraits
	for (var charIndex = 0; charIndex < 5; charIndex++) {
		var atkSrc = $("#atk-tab-" + charIndex.toString()).attr("src");
		$("#atk-tab-" + charIndex.toString()).attr("src", $("#def-tab-" + charIndex.toString()).attr("src"));
		$("#def-tab-" + charIndex.toString()).attr("src", atkSrc);
		
		// set classes
		setCharTabClass(true, charIndex);
		setCharTabClass(false, charIndex);
	}
	
	// swap results portraits
	var atkPortrait = $("#attacker-portrait").attr("src");
	$("#attacker-portrait").attr("src", $("#defender-portrait").attr("src"));
	$("#defender-portrait").attr("src", atkPortrait);
}

// enables or disables a character panel
// charNum determines the panel, enable is true if we are enabling a panel
function enableCharPanel(charNum, enable) {
	"use strict";
	var textID = (charNum === "1") ? "#attack-panel .info-section, #attack-panel .info-section-bottom, #spec-cooldown-line-1" : "#defend-panel .info-section, #defend-panel .info-section-bottom, #spec-cooldown-line-2";
	var inputID = (charNum === "1") ? "#attack-panel select, #attack-panel input" : "#defend-panel select, #defend-panel input";
	
	if (enable) {
		$(textID).css("color", "white");
		$(inputID).removeAttr("disabled");
		showSpecCooldown($("#special-" + charNum).val(), charNum, false);
		updateSpecCooldown(charNum);
	} else {
		$(textID).css("color", "#5b5b5b");
		$(inputID).attr("disabled", "disabled");
	}
}

// recolors matchup table rows
function recolorMatchupRows() {
	"use strict";
	var rowCount = 0;
	$("#matchup-table > tbody > tr").each(function() {
		if($(this).is(":visible")) {
			if (rowCount % 2 === 1) {
				$(this).addClass("matchup-row-offset");
			} else {
				$(this).removeClass("matchup-row-offset");
			}

			rowCount += 1;
		}
	});
}

// filters the matchup table depending on the current filters
// set fadeIn to true to fade in results
function filterMatchupTable(fadeIn) {
	"use strict";
	var name = $("#matchup-filter-name").val().toLowerCase();
	var move = $("#matchup-filter-move").val();
	var color = $("#matchup-filter-color").val();
	var weapon = $("#matchup-filter-weapon").val();
	
	var winCount = 0;
	var lossCount = 0;
	var drawCount = 0;
	var attacker = $("#one-vs-all").is(":checked");
	
	$("#matchup-table tbody tr").each(function() {
		var rowName = this.childNodes[1].firstChild.firstChild.nodeValue;
		var rowMove = charInfo[rowName].move_type;
		var rowColor = charInfo[rowName].color;
		var rowWeapon = charInfo[rowName].weapon_type;
		rowName = rowName.toLowerCase();
		
		if ((name === "" || rowName.indexOf(name) > -1) && (move === "Any" || rowMove === move) && (color === "Any" || rowColor === color) && (weapon === "Any" || rowWeapon === weapon)) {
			$(this).show();
			
			// update counters
			var result = this.childNodes[6].firstChild.firstChild.nodeValue;
			if (result === "Draw") {
				drawCount += 1;
			} else if (result === "Attacker Wins") {
				if (attacker) {
					winCount += 1;
				} else {
					lossCount += 1;
				}
			} else {
				if (attacker) {
					lossCount += 1;
				} else {
					winCount += 1;
				}
			}
		} else {
			$(this).hide();
		}
	});
	
	recolorMatchupRows();
	$("#matchup-overview").html(winCount.toString() + " wins · " + lossCount.toString() + " losses · " + drawCount.toString() + " draws");
	
	if (fadeIn) {
		$("#matchup-table").hide().fadeIn("slow");
		$("#matchup-overview").hide().fadeIn("slow");
	}
}

// calculates and prints info of every battle matchup for one character
// attacker is true if we are using the attacker panel as our base character
function calculateMatchups(attacker) {
	"use strict";
	var battleInfo = {};
	var winCount = 0;
	var lossCount = 0;
	var drawCount = 0;
	var tableHTML = "";
	var charCount = 0;
	var foeClass = attacker ? "defender" : "attacker";
	keepTable = true;
	
	// add table headers
	if (attacker) {
		tableHTML += "<thead><tr class='matchup-header'><th data-tsorter='img'></th><th data-tsorter='link'>Defender</th>";
	} else {
		tableHTML += "<thead><tr class='matchup-header'><th data-tsorter='img'></th><th data-tsorter='link'>Attacker</th>";
	}
	
	tableHTML += "<th data-tsorter='numeric'>Attacker DMG</th><th data-tsorter='numeric'>Defender DMG</th><th data-tsorter='text-span-num'>Attacker HP</th><th data-tsorter='text-span-num'>Defender HP</th><th data-tsorter='link'>Result</th></tr></thead>";
	
	// start tbody
	tableHTML += "<tbody>";
	
	// add table rows
	for (var key in charInfo) {
		if (key !== "Custom") {
			// sim battle
			battleInfo = simBattle(getBattleInfoWithDefault(attacker, key), false);
			
			// add to table
			tableHTML += (charCount % 2 === 1) ? "<tr class='matchup-row-offset'>" : "<tr>";
			tableHTML += "<td><img src=\"img/Portraits/" + key + ".png\"></td>";
			tableHTML += "<td><span class='matchup-char " + foeClass + "'>" + key + "</span></td>";
			tableHTML += "<td class='attacker'>" + (battleInfo.defender.startHP - battleInfo.defender.currHP).toString() + "</td>";
			tableHTML += "<td class='defender'>" + (battleInfo.attacker.startHP - battleInfo.attacker.currHP).toString() + "</td>";
			tableHTML += "<td class='attacker'>" + battleInfo.attacker.startHP.toString() + " → <span>" + battleInfo.attacker.currHP.toString() + "</span></td>";
			tableHTML += "<td class='defender'>" + battleInfo.defender.startHP.toString() + " → <span>" + battleInfo.defender.currHP.toString() + "</span></td>";
			
			if (battleInfo.attacker.currHP <= 0) {
				tableHTML += "<td class='defender'><strong>Defender Wins</strong></td>";
				
				if (attacker) {
					lossCount += 1;
				} else {
					winCount += 1;
				}
			} else if (battleInfo.defender.currHP <= 0) {
				tableHTML += "<td class='attacker'><strong>Attacker Wins</strong></td>";
				
				if (attacker) {
					winCount += 1;
				} else {
					lossCount += 1;
				}
			} else {
				tableHTML += "<td><strong>Draw</strong></td>";
				drawCount += 1;
			}
			
			tableHTML += "</tr>";
			
			// increment counter
			charCount += 1;
		}
	}
	
	// end tbody
	tableHTML += "</tbody>";
	
	// create table
	$("#matchup-display").stop(true, true).hide();
	$("#matchup-table").html(tableHTML);
	
	// make table sortable
	tsorter.create("matchup-table");
	
	// add table title
	var mainCharName = "";
	if (attacker) {
		mainCharName = ($("#char-1").val() === "Custom") ? customName($("#weapon-type-1").val(), $("#move-type-1").val()) : $("#char-1").val();
		$("#matchup-title").text(mainCharName + " vs. All").removeClass("defender").addClass("attacker");
	} else {
		mainCharName = ($("#char-2").val() === "Custom") ? customName($("#weapon-type-2").val(), $("#move-type-2").val()) : $("#char-2").val();
		$("#matchup-title").text("All vs. " + mainCharName).removeClass("attacker").addClass("defender");
	}
	
	// filter and show overview
	filterMatchupTable(false);
	
	// display results
	$("#matchup-display").fadeIn("slow");
	
	// setup events to view one vs one info
	$(".matchup-char").on("click", function() {
		var attacker = ($("#one-vs-all").is(":checked")) ? false : true;
		var charName = $(this).text();
		
		// select empty tab if possible
		selectEmptyCharTab(attacker);
		
		// check one vs one radio button
		$("input[type=radio][name=mode]").val(["one-vs-one"]);
		
		// show one vs one info
		$("#battle-result").stop(true, true).show(700);
		$("#battle-log").stop(true, true).show(700);
		$("#matchups").stop(true, true).hide(700);

		// enable all inputs
		enableCharPanel("1", true);
		enableCharPanel("2", true);
		
		$("#char-" + (attacker ? "1" : "2")).val(charName);
		displayChar(charName, (attacker ? "1" : "2"));
		simBattle(getBattleInfo(), true);
		keepTable = true;
	});
	
	// recolor rows when sorting
	$("#matchup-table th").on("click", function() {
		recolorMatchupRows();
	});
}

// updates infomation depending on the mode selected
function updateDisplay() {
	if ($("#one-vs-one").is(":checked")) {
		simBattle(getBattleInfo(), true);
	} else if ($("#one-vs-all").is(":checked") && (!keepTable || !previousTable)) {
		calculateMatchups(true);
	} else if ($("#all-vs-one").is(":checked") && (!keepTable || previousTable)) {
		calculateMatchups(false);
	}
}

// setup inital page
$(document).ready( function() {
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
	$(".more-than-zero").on("change", function() {
		limit(this, 1);	
	});
	$(".zero-or-more").on("change", function() {
		limit(this, 0);	
	});

	// setup hp value updates
	$(".hp-stat").on("change", function() {
		var charNum = $(this).data("charnum").toString();
		
		// old value
		var oldHP = parseInt($("#" + this.id + "-denom").text());

		// update hp value in rest of the page
		$("." + this.id + "-read").text(this.value);

		// check if current hp needs to be updated as well
		if ((this.value < parseInt($("#curr-" + this.id).val())) || parseInt($("#curr-" + this.id).val()) === oldHP) {
			$("#curr-" + this.id).val(this.value);
		}
		
		keepTable = false;
		updateDisplay();
	});
	$(".curr-hp-val").on("change", function() {
		var charNum = $(this).data("charnum").toString();
		
		// current hp cannot be greater than base hp
		var baseHP = parseInt($("#hp-" + charNum).val());
		if (this.value > baseHP) {
			this.value = baseHP;
		}
		
		keepTable = false;
		updateDisplay();
	});
	
	// setup special cooldown updates
	$(".spec-cool").on("change", function() {
		var charNum = $(this).data("charnum").toString();
		
		var maxCooldown = parseInt($("#spec-cooldown-max-" + charNum).text());
		if (this.value > maxCooldown) {
			this.value = maxCooldown;
		}
		
		keepTable = false;
		updateDisplay();
	});
	
	// make character tabs load default image on error
	$(".char-tab, .char-tab-selected, .char-tab-unselected").on("error", function() {
		$(this).attr("src", "img/Portraits/Other.png");
	});
	
	// setup character tab changes
	$(".char-tab, .char-tab-unselected").on("click", function() {
		selectCharTab($(this).data("charnum") === 1, $(this).data("index"));
		keepTable = false;
		updateDisplay();
	});
	
	// setup initial display
	setupStats();
	setupChars();
	
	// setup character select
	$(".char-selector").on("change", function() {
		var charNum = $(this).data("charnum").toString();
		displayChar(this.value, charNum);
		keepTable = false;
		updateDisplay();
	});
	
	// setup weapon select
	$(".weapon-selector").on("change", function (){
		var charNum = $(this).data("charnum").toString();
		showWeapon(this.value, charNum, true);
		keepTable = false;
		updateDisplay();
	});
	
	// setup special select
	$(".special-selector").on("change", function (){
		var charNum = $(this).data("charnum").toString();
		getSpecialData(charNum);
		showSpecCooldown(this.value, charNum, false);
		updateSpecCooldown(charNum);
		keepTable = false;
		updateDisplay();
	});
	
	// setup assist select
	$(".assist-selector").on("change", function (){
		var charNum = $(this).data("charnum").toString();
		getAssistData(charNum);
		updateSpecCooldown(charNum);
		keepTable = false;
		updateDisplay();
	});
	
	// setup skill select
	$(".passive-selector").on("change", function (){
		var charNum = $(this).data("charnum").toString();
		var skillType = $(this).data("skilltype");
		getSkillData(charNum, skillType, true);
		keepTable = false;
		updateDisplay();
	});
	
	// set up weapon type changes
	$(".weapon-type-selector").on("change", function (){
		var charNum = $(this).data("charnum").toString();
		loadWeapons(this.value, charNum);
		setColor(this.value, charNum);
		$("#weapon-" + charNum + " option:eq(1)").attr("selected", "selected");
		showWeapon( $("#weapon-" + charNum).val(), charNum, true);
		keepTable = false;
		updateDisplay();
	});
	
	// set up color changes
	$(".color-selector").on("change", function() {
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
		$("#weapon-" + charNum + " option:eq(1)").attr("selected", "selected");
		showWeapon( $("#weapon-" + charNum).val(), charNum, true);
		keepTable = false;
		updateDisplay();
	});
	
	// setup other battle value changes
	$(".battle-val").on("change", function() {
		keepTable = false;
		updateDisplay();
	});
	
	// swap button
	$("#swap-button").on("click", function() {
		swap();
		keepTable = false;
		updateDisplay();
	});
	
	// change mode
	$("input[type=radio][name=mode]").on("change", function() {
		updateDisplay();
		if (this.id === "one-vs-one") {
			$("#battle-result").stop(true, true).show(700);
			$("#battle-log").stop(true, true).show(700);
			$("#matchups").stop(true, true).hide(700);
			
			// enable all inputs
			enableCharPanel("1", true);
			enableCharPanel("2", true);
		} else if (this.id === "one-vs-all") {
			$("#battle-result").stop(true, true).hide(700);
			$("#battle-log").stop(true, true).hide(700);
			$("#matchups").stop(true, true).show(700);
			
			// disable defender input, enable attacker input
			enableCharPanel("1", true);
			enableCharPanel("2", false);
			
			// update info
			previousTable = true;
		} else {
			$("#battle-result").stop(true, true).hide(700);
			$("#battle-log").stop(true, true).hide(700);
			$("#matchups").stop(true, true).show(700);
			
			// disable attacker input, enable defender input
			enableCharPanel("1", false);
			enableCharPanel("2", true);
			
			// update info
			previousTable = false;
		}
	});
	
	// change filter title when pressed 
	$("#matchup-filter-button").on("click", function() {
		if ($(this).text() === "Open Filters") {
			$(this).text("Close Filters");
		} else {
			$(this).text("Open Filters");
		}
	});
	
	// update table when filters are changed
	$(".matchup-filter-input").on("change", function() {
		// make sure weapons and colors are correct
		if (this.id === "matchup-filter-color" && this.value !== "Any" && $("#matchup-filter-weapon").val() !== "Any" && this.value !== weaponToColor($("#matchup-filter-weapon").val())) {
			$("#matchup-filter-weapon").val("Any");
		} else if (this.id === "matchup-filter-weapon" && this.value !== "Any" && $("#matchup-filter-color").val() !== "Any" && weaponToColor(this.value) !== $("#matchup-filter-color").val()) {
			$("#matchup-filter-color").val(weaponToColor(this.value));
		}
		
		filterMatchupTable(true);
	});
	
	// reset filters
	$("#matchup-filter-reset").on("click", function() {
		$("#matchup-filter-name").val("");
		$("#matchup-filter-move").val("Any");
		$("#matchup-filter-color").val("Any");
		$("#matchup-filter-weapon").val("Any");
		filterMatchupTable(true);
	});
});
