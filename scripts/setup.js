// stat total upper limit
var HIGHESTSTAT = 99;

// index of the selected characters
var selectedAttacker = 0;
var selectedDefender = 0;

// character slots
var attackerTeam = [{}, {}, {}, {}, {}];
var defenderTeam = [{}, {}, {}, {}, {}];

// matchup table info
var previousTable = true; // true if one vs all, false if all vs one
var keepTable = false;	// true if we keep the matchup table currently displayed

// sorted matchup table column
var mTableSorted = -1;
var mSortDesc = true; // sort in descending order?

// true if battle log is open, false otherwise
var openLog = true;

// stat growth amounts from lvl 1 to lvl 40
var statGrowths = [[4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26],
				  [5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27],
				  [7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29],
				  [8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30],
				  [8, 10, 13, 15, 17, 19, 22, 24, 26, 28, 30, 33]];

// default states
var defaultAttacker = true;
var defaultDefender = true;

// prevent filterMatchups function from being called multiple times when resetting filters
var resetFilterLock = false;

// converts an array of strings to an object with the strings as fields
function arrayToObject(array) {
	"use strict";
	var obj = {};
	
	for (var i = 0; i < array.length; i++) {
		obj[array[i]] = true;
	}
	
	return obj;
}

// limits number inputs
// num is a number input, minNumber is the lower limit
function limit(num, minNumber) {
	"use strict";
	// check if value is outside of the limits
	if (!$.isNumeric(num.value) || num.value <= minNumber) {
		num.value = minNumber;
	} else if (num.id === "override-curr-hp") {
		if (num.value >= 100) {
			num.value = 100;
		} else if (Math.floor(num.value) !== num.value) {
			num.value = Math.floor(num.value);
		}
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

// given a weapon type, return its range
function weaponTypeRange(weaponType) {
	"use strict";
	var range = 1;
	if (weaponType === "Red Tome" || weaponType === "Green Tome" || weaponType === "Blue Tome" || weaponType === "Bow" || weaponType === "Dagger" || weaponType === "Staff") {
		range = 2;
	}
	
	return range;
}

// determines if the given skill is inheritable by the given character
function isInheritable(skill, charName) {
	"use strict";
	var moveType = charInfo[charName].move_type;
	var color = charInfo[charName].color;
	var weaponType = charInfo[charName].weapon_type;
	
	var range = weaponTypeRange(weaponType);
	
	var dragon = false;
	if (weaponType === "Red Breath" || weaponType === "Green Breath" || weaponType === "Blue Breath") {
		dragon = true;
	}
	
	return (!skill.hasOwnProperty("char_unique") && (!skill.hasOwnProperty("move_unique") || skill.move_unique === moveType) && 
			(!skill.hasOwnProperty("color_restrict") || skill.color_restrict !== color) && (!skill.hasOwnProperty("range_unique") || skill.range_unique === range) && 
			(!skill.hasOwnProperty("weapon_restrict") || skill.weapon_restrict !== weaponType) && (!skill.hasOwnProperty("weapon_unique") || skill.weapon_unique === weaponType) && 
			(!skill.hasOwnProperty("dragon_unique") || dragon) && (!skill.hasOwnProperty("move_restrict") || skill.move_restrict !== moveType));
}

// determines if the given weapon is inheritable by the given character
function isInheritableWeapon(weapon, charName) {
	"use strict";
	var weaponType = charInfo[charName].weapon_type;
	
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

// enables special cooldown input if there is a special selected, disables if not
// charNum determines the panel the special is in
function enableSpecCooldown(charNum) {
	"use strict";
	if ($("#special-" + charNum).val() !== "None") {
		if ($("#one-vs-one").is(":checked") || ($("#one-vs-all").is(":checked") && charNum === "1") || ($("#all-vs-one").is(":checked") && charNum === "2")) {
			$("#spec-cooldown-line-" + charNum).css("color", "white");
			$("#spec-cooldown-" + charNum).removeAttr("disabled");
		}
	} else { // no special
		$("#spec-cooldown-" + charNum).val("0");
		$("#spec-cooldown-" + charNum).attr("disabled", "disabled");
		$("#spec-cooldown-max-" + charNum).text("x");
		$("#spec-cooldown-line-" + charNum).css("color", "#5b5b5b");
	}
}

// enables stat variance selects depending on the character selected
// charNum determines the panel to look at
function enableCharBuild(charNum) {
	"use strict";
	if (charInfo[$("#char-" + charNum).val()].hasOwnProperty("base_stat")) {
		$("#char-build-info-" + charNum + " label").css("color", "white");
		$("#char-build-info-" + charNum + " select").removeAttr("disabled");
	} else {
		$("#char-build-info-" + charNum + " label").css("color", "#5b5b5b");
		$("#char-build-info-" + charNum + " select").attr("disabled", "disabled");
	}
}

// enables extra character info if the character in the given panel is Custom
// charNum determines the panel to look at
function enableExtraCharInfo(charNum) {
	"use strict";
	if ($("#char-" + charNum).val() === "Custom") {
		$("#extra-char-info-" + charNum).css("color", "white");
		$("#extra-char-info-" + charNum + " select").removeAttr("disabled");
	} else {
		$("#extra-char-info-" + charNum).css("color", "#5b5b5b");
		$("#extra-char-info-" + charNum + " select").attr("disabled", "disabled");
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
		if (isInheritable(skillInfo[type][key], $("#char-" + charNum).val()) && !defaultSkills.hasOwnProperty(key)) {
			skills += (type !== "s") ? "<option class='inherit' value=\"" + key + "\">" + key + "</option>" : "<option value=\"" + key + "\">" + key + "</option>";
		}
	}
	
	// set value
	$("#passive-" + type + "-" + charNum).html(skills);
	$("#passive-" + type + "-" + charNum).val(selectedSkill).trigger("change.select2");
	
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
// weaponType is the weapon type to load, selectID determines which select to load in, set inheritOnly to true if unique weapons should not be included
function loadWeapons(weaponType, selectID, inheritOnly) {
	"use strict";
	var options = "<option value='None'>None</option>";
	for (var key in weaponInfo) {
		if ((weaponType === "Any" || weaponInfo[key].type === weaponType) && (!inheritOnly || !weaponInfo[key].hasOwnProperty("char_unique"))) {
			options += "<option value=\"" + key + "\">" + key + "</option>";
		}
	}
	$(selectID).html(options);
}

// load all passive skills of the given letter
// letter is the passive skill letter, selectID determines which select to load in, unique is true if we load in unique passives
function loadPassives(letter, selectID, unique) {
	"use strict";
	var options = "<option value='None'>None</option>";
	for (var key in skillInfo[letter]) {
		if (unique || !skillInfo[letter][key].hasOwnProperty("char_unique")) {
			options += "<option value=\"" + key + "\">" + key + "</option>";
		}
	}
	$(selectID).html(options);
}

// load all assist skills
// selectID determines which select to load in, unique is true if we include unique assists
function loadAssists(selectID, unique) {
	"use strict";
	var assistOptions = "<option value='None'>None</option>";
	for (var assistName in assistInfo) {
		if (unique || !assistInfo[assistName].hasOwnProperty("char_unique")) {
			assistOptions += "<option value=\"" + assistName + "\">" + assistName + "</option>";
		}
	}
	$(selectID).html(assistOptions);
}

// load all special skills
// selectID determines which select to load in
function loadSpecials(selectID) {
	"use strict";
	var specOptions = "<option value='None'>None</option>";
	for (var specName in specInfo) {
		specOptions += "<option value=\"" + specName + "\">" + specName + "</option>";
	}
	$(selectID).html(specOptions);
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

// loads the given weapon type image into the given img
function getWeaponIcon(imgID, weaponType) {
	"use strict";
	$(imgID).attr("src", "img/WeaponType/" + weaponType + ".png").attr("alt", weaponType);
}

// loads the given move type image into the given img
function getMoveIcon(imgID, moveType) {
	"use strict";
	$(imgID).attr("src", "img/MoveType/" + moveType + ".png").attr("alt", moveType);
}

// applies any stat modifiers to the given stats and returns the resulting stats
// stats contain the character's stats, skillName is the skill to check for stat mods, dataInfo contains the info for the given skill
function applyStatMods(stats, skillName, dataInfo) {
	"use strict";
	if (skillName !== "None" && dataInfo[skillName].hasOwnProperty("stat_mod")) {
		for (var key in dataInfo[skillName].stat_mod) {
			stats[key] += dataInfo[skillName].stat_mod[key];
			if (stats[key] < 0) {
				stats[key] = 0;
			} else if (stats[key] > 99) {
				stats[key] = 99;
			}
		}
	}
	
	return stats;
}

// gets that stat totals given the data
// charName is the name of the character, weaponName is the equipped weapon, passiveA is the equipped passive a skill
// rarity is the rarity of the character, level is the level of the character, merge is the number of units merged with the given one
// boon is the boon stat, bane is the bane stat
function getStatTotals(charName, weaponName, passiveA, seal, rarity, level, merge, boon, bane) {
	"use strict";
	// base stats + boons/banes
	var stats = {};
	stats.hp = charInfo[charName].base_stat["star-" + rarity.toString()].hp + ((boon === "hp") ? 1 : 0) + ((bane === "hp") ? -1 : 0);
	stats.atk = charInfo[charName].base_stat["star-" + rarity.toString()].atk + ((boon === "atk") ? 1 : 0) + ((bane === "atk") ? -1 : 0);
	stats.spd = charInfo[charName].base_stat["star-" + rarity.toString()].spd + ((boon === "spd") ? 1 : 0) + ((bane === "spd") ? -1 : 0);
	stats.def = charInfo[charName].base_stat["star-" + rarity.toString()].def + ((boon === "def") ? 1 : 0) + ((bane === "def") ? -1 : 0);
	stats.res = charInfo[charName].base_stat["star-" + rarity.toString()].res + ((boon === "res") ? 1 : 0) + ((bane === "res") ? -1 : 0);
	
	// merged units
	if (merge > 0) {
		var statNames = ["hp", "atk", "spd", "def", "res"];
		var mergeBonusOrder = ["hp", "atk", "spd", "def", "res"];
		
		// sort stats from highest to lowest with insertion sort haha
		for (var statsIndex = 1; statsIndex < 5; statsIndex++) {
			var inserted = false;
			for (var orderIndex = 0; orderIndex < statsIndex; orderIndex++) {
				if (stats[statNames[statsIndex]] > stats[mergeBonusOrder[orderIndex]]) {
					// push back
					for (var pushIndex = statsIndex - 1; pushIndex >= orderIndex; pushIndex--) {
						mergeBonusOrder[pushIndex + 1] = mergeBonusOrder[pushIndex];
					}
					
					// insert
					mergeBonusOrder[orderIndex] = statNames[statsIndex];
					inserted = true;
					break;
				}
			}
			
			if (!inserted) {
				mergeBonusOrder[statsIndex] = statNames[statsIndex];
			}
		}
		
		// apply bonuses
		var bonusIndex = 0;
		for (var mergeCount = 0; mergeCount < merge; mergeCount++) {
			for (var i = 0; i < 2; i++) {
				stats[mergeBonusOrder[bonusIndex]] += 1;
				bonusIndex = (bonusIndex + 1) % 5;
			}
		}
	}
	
	// apply stat growths
	if (level === 40) {
		stats.hp += statGrowths[rarity-1][charInfo[charName].base_stat.growth.hp + ((boon === "hp") ? 1 : 0) + ((bane === "hp") ? -1 : 0)];
		stats.atk += statGrowths[rarity-1][charInfo[charName].base_stat.growth.atk + ((boon === "atk") ? 1 : 0) + ((bane === "atk") ? -1 : 0)];
		stats.spd += statGrowths[rarity-1][charInfo[charName].base_stat.growth.spd + ((boon === "spd") ? 1 : 0) + ((bane === "spd") ? -1 : 0)];
		stats.def += statGrowths[rarity-1][charInfo[charName].base_stat.growth.def + ((boon === "def") ? 1 : 0) + ((bane === "def") ? -1 : 0)];
		stats.res += statGrowths[rarity-1][charInfo[charName].base_stat.growth.res + ((boon === "res") ? 1 : 0) + ((bane === "res") ? -1 : 0)];
	}
	
	// add weapon might
	stats.atk += (weaponName !== "None") ? weaponInfo[weaponName].might : 0;
	
	// apply stat mods
	stats = applyStatMods(stats, weaponName, weaponInfo);
	stats = applyStatMods(stats, passiveA, skillInfo.a);
	stats = applyStatMods(stats, seal, skillInfo.s);
	
	return stats;
}

// displays stat totals given the current settings
// charNum determines the character panel
function displayStatTotals(charNum) {
	"use strict";
	
	// get info
	var charName = $("#char-" + charNum).val();
	var weaponName = $("#weapon-" + charNum).val();
	var passiveA = $("#passive-a-" + charNum).val();
	var seal = $("#passive-s-" + charNum).val();
	var rarity = parseInt($("#rarity-" + charNum).val());
	var level = parseInt($("#level-" + charNum).val());
	var merge = parseInt($("#merge-" + charNum).val());
	var boon = $("#boon-" + charNum).val();
	var bane = $("#bane-" + charNum).val();
	
	// get stats
	var stats = getStatTotals(charName, weaponName, passiveA, seal, rarity, level, merge, boon, bane);
	
	// display stats
	$("#hp-" + charNum + ", #curr-hp-" + charNum).val(stats.hp);
	$(".hp-" + charNum + "-read").text(stats.hp);
	$("#atk-" + charNum).val(stats.atk);
	$("#spd-" + charNum).val(stats.spd);
	$("#def-" + charNum).val(stats.def);
	$("#res-" + charNum).val(stats.res);
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
		getWeaponIcon((charNum === "1" ? "#attacker-weapon" : "#defender-weapon"), $("#weapon-type-" + charNum).val());
		getMoveIcon((charNum === "1" ? "#attacker-move" : "#defender-move"), $("#move-type-" + charNum).val());
		
		// enable inputs
		if ($("#one-vs-one").is(":checked") || ($("#one-vs-all").is(":checked") && charNum === "1") || ($("#all-vs-one").is(":checked") && charNum === "2")) {
			$("#extra-char-info-" + charNum).css("color", "white");
			$("#extra-char-info-" + charNum + " select").removeAttr("disabled");
		}
		
		// show collapsed section
		$("#extra-char-info-" + charNum).show(700);
		
		// hide stat variants
		$("#char-build-info-" + charNum).hide(700);
		
		// show all skills and weapons
		var weaponType = $("#weapon-type-" + charNum).val();
		var weapon = $("#weapon-" + charNum).val();
		var passiveA = $("#passive-a-" + charNum).val();
		var passiveB = $("#passive-b-" + charNum).val();
		var passiveC = $("#passive-c-" + charNum).val();
		var seal = $("#passive-s-" + charNum).val();
		var assist = $("#assist-" + charNum).val();
		var special = $("#special-" + charNum).val();
		
		// load in all weapons of the current weapon type
		loadWeapons(weaponType, "#weapon-" + charNum, false);
		$("#weapon-" + charNum).val(weapon).trigger("change.select2");
		if (weapon === "None") {
			$("#weapon-" + charNum).data("info", {});
		} else {
			$("#weapon-" + charNum).data("info", weaponInfo[weapon]);
		}
		
		// load in passive skills
		loadPassives("a", "#passive-a-" + charNum, true);
		$("#passive-a-" + charNum).val(passiveA).trigger("change.select2");
		getSkillData(charNum, "a", false);
		
		loadPassives("b", "#passive-b-" + charNum, true);
		$("#passive-b-" + charNum).val(passiveB).trigger("change.select2");
		getSkillData(charNum, "b", false);
		
		loadPassives("c", "#passive-c-" + charNum, true);
		$("#passive-c-" + charNum).val(passiveC).trigger("change.select2");
		getSkillData(charNum, "c", false);
		
		loadPassives("s", "#passive-s-" + charNum, true);
		$("#passive-s-" + charNum).val(seal).trigger("change.select2");
		getSkillData(charNum, "s", false);
		
		// load in assist skills
		loadAssists("#assist-" + charNum, true);
		$("#assist-" + charNum).val(assist).trigger("change.select2");
		getAssistData(charNum);
		
		// load in specials
		loadSpecials("#special-" + charNum);
		$("#special-" + charNum).val(special).trigger("change.select2");
		getSpecialData(charNum);
		
		return;
	}
	
	// display portrait
	getPortrait((charNum === "1" ? "#atk-tab-" + selectedAttacker.toString() : "#def-tab-" + selectedDefender.toString()), charName);
	getPortrait((charNum === "1" ? "#attacker-portrait" : "#defender-portrait"), charName);
	getWeaponIcon((charNum === "1" ? "#attacker-weapon" : "#defender-weapon"), singleChar.weapon_type);
	getMoveIcon((charNum === "1" ? "#attacker-move" : "#defender-move"), singleChar.move_type);
	
	// show stat variants
	$("#char-build-info-" + charNum).show(700);
	
	// grey out disabled input fields
	$("#extra-char-info-" + charNum).css("color", "#5b5b5b");
	$("#extra-char-info-" + charNum + " select").attr("disabled", "disabled");
	
	// hide extra info
	$("#extra-char-info-" + charNum).hide(700);
	
	// show general character info
	$("#color-" + charNum).val(singleChar.color);
	$("#weapon-type-" + charNum).val(singleChar.weapon_type);
	$("#move-type-" + charNum).val(singleChar.move_type);
	
	// reset buffs/debuffs
	$("#stats-" + charNum + " .stat-bonus, #stats-" + charNum + " .stat-penalty, #stats-" + charNum + " .stat-spur").val(0);
	
	// show passive skills
	showSkills(singleChar, charNum, "a");
	showSkills(singleChar, charNum, "b");
	showSkills(singleChar, charNum, "c");
	showSkills(singleChar, charNum, "s");
	
	// reset sacred seal
	$("#passive-s-" + charNum).val("None").trigger("change.select2");
	$("#passive-s-" + charNum).data("info", {});
	
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
		if (isInheritable(specInfo[specKey], charName) && !defaultSpecials.hasOwnProperty(specKey)) {
			specials += "<option class='inherit' value=\"" + specKey + "\">" + specKey + "</option>";
		}
	}
	
	// show cooldown values
	showSpecCooldown(selectedSpecial, charNum, true);
	
	// set values
	$("#special-" + charNum).html(specials);
	$("#special-" + charNum).val(selectedSpecial).trigger("change.select2");
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
		if (isInheritable(assistInfo[assistKey], charName) && !defaultAssists.hasOwnProperty(assistKey)) {
			assists += "<option class='inherit' value=\"" + assistKey + "\">" + assistKey + "</option>";
		}
	}
	
	// set values
	$("#assist-" + charNum).html(assists);
	$("#assist-" + charNum).val(selectedAssist).trigger("change.select2");
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
		if (isInheritableWeapon(weaponInfo[weaponKey], charName) && !defaultWeapons.hasOwnProperty(weaponKey)) {
			weapons += "<option class='inherit' value=\"" + weaponKey + "\">" + weaponKey + "</option>";
		}
	}
	
	$("#weapon-" + charNum).html(weapons);
	$("#weapon-" + charNum).val(selectedWeapon).trigger("change.select2");
	
	// show extra weapon info
	showWeapon(selectedWeapon, charNum, false);
	
	// set default stat variant
	$("#level-" + charNum).val(40);
	$("#merge-" + charNum).val(0);
	$("#boon-" + charNum).val("neutral");
	$("#bane-" + charNum).val("neutral");
	
	// set rarities
	var rarities = "<option value='5'>5 Stars</option>";
	if (singleChar.hasOwnProperty("base_stat")) {
		for (var starIndex = 4; starIndex >= 1; starIndex--) {
			if (singleChar.base_stat.hasOwnProperty("star-" + starIndex.toString())) {
				if (starIndex === 1) {
					rarities += "<option value='1'>1 Star</option>";
				} else {
					rarities += "<option value='" + starIndex.toString() + "'>" + starIndex.toString() + " Stars</option>";
				}
			}
		}
	}
	
	$("#rarity-" + charNum).html(rarities);
	
	// show stats
	if (singleChar.hasOwnProperty("base_stat")) {
		displayStatTotals(charNum);
		if ($("#one-vs-one").is(":checked") || ($("#one-vs-all").is(":checked") && charNum === "1") || ($("#all-vs-one").is(":checked") && charNum === "2")) {
			$("#char-build-info-" + charNum + " label").css("color", "white");
			$("#char-build-info-" + charNum + " select").removeAttr("disabled");
		}
	} else {
		$("#hp-" + charNum + ", #curr-hp-" + charNum).val(singleChar.hp);
		$(".hp-" + charNum + "-read").text(singleChar.hp);
		$("#atk-" + charNum).val(singleChar.atk);
		$("#spd-" + charNum).val(singleChar.spd);
		$("#def-" + charNum).val(singleChar.def);
		$("#res-" + charNum).val(singleChar.res);
		$("#char-build-info-" + charNum + " label").css("color", "#5b5b5b");
		$("#char-build-info-" + charNum + " select").attr("disabled", "disabled");
	}
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
	
	// stat variants
	infoToStore.rarityHTML = $("#rarity-" + charNum).html();
	infoToStore.rarity = $("#rarity-" + charNum).val();
	infoToStore.level = $("#level-" + charNum).val();
	infoToStore.merge = $("#merge-" + charNum).val();
	infoToStore.boon = $("#boon-" + charNum).val();
	infoToStore.bane = $("#bane-" + charNum).val();
	
	// weapon and skill info
	infoToStore.weapon = $("#weapon-" + charNum).val();
	infoToStore.passiveA = $("#passive-a-" + charNum).val();
	infoToStore.passiveB = $("#passive-b-" + charNum).val();
	infoToStore.passiveC = $("#passive-c-" + charNum).val();
	infoToStore.assist = $("#assist-" + charNum).val();
	infoToStore.special = $("#special-" + charNum).val();
	infoToStore.specCooldown = $("#spec-cooldown-" + charNum).val();
	infoToStore.seal = $("#passive-s-" + charNum).val();
	
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
			$("#char-1").val($("#char-1 option:eq(0)").val()).trigger("change.select2");
			displayChar($("#char-1").val(), "1");
		} else {
			$("#char-2").val($("#char-2 option:eq(1)").val()).trigger("change.select2");
			displayChar($("#char-2").val(), "2");
		}
	} else {  // display stored info
		// get and show default character info
		$("#char-" + charNum).val(charTabInfo.character).trigger("change.select2");
		displayChar(charTabInfo.character, charNum);
		
		// change extra character info if Custom unit was selected
		if (charTabInfo.character === "Custom") {
			$("#color-" + charNum).val(charTabInfo.color);
			$("#weapon-type-" + charNum).val(charTabInfo.weaponType);
			$("#move-type-" + charNum).val(charTabInfo.moveType);
		}
		
		// change stat variants
		$("#rarity-" + charNum).html(charTabInfo.rarityHTML);
		$("#rarity-" + charNum).val(charTabInfo.rarity);
		$("#level-" + charNum).val(charTabInfo.level);
		$("#merge-" + charNum).val(charTabInfo.merge);
		$("#boon-" + charNum).val(charTabInfo.boon);
		$("#bane-" + charNum).val(charTabInfo.bane);
		
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
		$("#passive-a-" + charNum).val(charTabInfo.passiveA).trigger("change.select2");
		$("#passive-b-" + charNum).val(charTabInfo.passiveB).trigger("change.select2");
		$("#passive-c-" + charNum).val(charTabInfo.passiveC).trigger("change.select2");
		$("#passive-s-" + charNum).val(charTabInfo.seal).trigger("change.select2");
		getSkillData(charNum, "a", false);
		getSkillData(charNum, "b", false);
		getSkillData(charNum, "c", false);
		getSkillData(charNum, "s", false);
		
		// change special
		$("#special-" + charNum).val(charTabInfo.special).trigger("change.select2");
		showSpecCooldown(charTabInfo.special, charNum, true);
		getSpecialData(charNum);
		
		// change assist
		$("#assist-" + charNum).val(charTabInfo.assist).trigger("change.select2");
		getAssistData(charNum);
		
		// if customer character, change weapon and fix combat icons
		if (charTabInfo.character === "Custom") {
			loadWeapons(charTabInfo.weaponType, "#weapon-" + charNum, false);
			getWeaponIcon((charNum === "1" ? "#attacker-weapon" : "#defender-weapon"), $("#weapon-type-" + charNum).val());
			getMoveIcon((charNum === "1" ? "#attacker-move" : "#defender-move"), $("#move-type-" + charNum).val());
		} 
		
		$("#weapon-" + charNum).val(charTabInfo.weapon).trigger("change.select2");
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
	"use strict";
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

// handles after combat damage and healing
// battleInfo contains information about the battle, charClass is 'attacker' or 'defender' depending on who the effects will be applied to
// poison is the amount of poison damage taken, poisonSource is the source of the poison damage
// recoil is the amount of recoil damage taken, recoilSource is the source of the recoil damage
// heal is the amount of health restored, healSource is the source of the healing
function afterCombatEffects(battleInfo, charClass, poison, poisonSource, recoil, recoilSource, heal, healSource) {
	"use strict";
	
	var oldHP = battleInfo[charClass].currHP;
	if (battleInfo[charClass].sealData.hasOwnProperty("null_dmg")) {
		battleInfo[charClass].currHP = Math.min(oldHP + heal, battleInfo[charClass].hp);
		
		if (poison > 0) {
			battleInfo.logMsg += "<li class='battle-interaction'><span class='" + charClass + "'><strong>" + battleInfo[charClass].name + "</strong></span> nullifies after-combat damage [" + poisonSource + ", " + battleInfo[charClass].seal + "]. ";
			battleInfo.logMsg += recoil > 0 ? "Self-inflicted damage is nullified [" + recoilSource + ", " + battleInfo[charClass].seal + "]. " : "";
			battleInfo.logMsg += heal > 0 ? "Health is restored [" + healSource + "]. " : "";
		} else if (recoil > 0) {
			battleInfo.logMsg += "<li class='battle-interaction'><span class='" + charClass + "'><strong>" + battleInfo[charClass].name + "</strong></span> nullifies self-inflicted damage [" + recoilSource + ", " + battleInfo[charClass].seal + "]. ";
			battleInfo.logMsg += heal > 0 ? "Health is restored [" + healSource + "]. " : "";
		} else if (heal > 0) {
			battleInfo.logMsg += "<li class='battle-interaction'><span class='" + charClass + "'><strong>" + battleInfo[charClass].name + "</strong></span> recovers HP after combat [" + healSource + "]. ";
		}
		
		if (heal > 0) {
			battleInfo.logMsg += "<span class='dmg'><strong>" + heal.toString() + " health restored.</strong></span><br><span class='" + charClass + "'><strong>" + battleInfo[charClass].name + " HP:</strong> " + oldHP.toString() + " → " + battleInfo[charClass].currHP.toString() + "</span></li>";
		} else if (poison + recoil > 0) {
			battleInfo.logMsg += "<span class='dmg'><strong>0 damage dealt.</strong></span><br><span class='" + charClass + "'><strong>" + battleInfo[charClass].name + " HP:</strong> " + oldHP.toString() + " → " + battleInfo[charClass].currHP.toString() + "</span></li>";
		}
	} else {
		var opponentClass = (charClass === "attacker") ? "defender" : "attacker";

		if (poison > 0 && (poison + recoil > heal)) {
			battleInfo[charClass].currHP = Math.max(oldHP - poison - recoil + heal, 1);
			battleInfo[opponentClass].damageDealt += poison - heal;
			battleInfo.logMsg += "<li class='battle-interaction'><span class='" + opponentClass + "'><strong>" + battleInfo[opponentClass].name + "</strong></span> inflicts after-combat damage [" + poisonSource + "]. ";
			battleInfo.logMsg += (recoil > 0) ? "Oppenent takes additional after-combat damage [" + recoilSource + "]. " : "";
			battleInfo.logMsg += (heal > 0) ? "Oppenent reduces damage taken due to healing effect [" + healSource + "]. " : "";
			battleInfo.logMsg += "<span class='dmg'><strong>" + (poison + recoil - heal).toString() + " damage dealt.</strong></span><br><span class='" + charClass + "'><strong>" + battleInfo[charClass].name + " HP:</strong> " + oldHP.toString() + " → " + battleInfo[charClass].currHP.toString() + "</span></li>";
		} else if (recoil > 0 && recoil > heal) {
			battleInfo[charClass].currHP = Math.max(oldHP - recoil + heal, 1);
			battleInfo.logMsg += "<li class='battle-interaction'><span class='" + charClass + "'><strong>" + battleInfo[charClass].name + "</strong></span> takes damage after combat [" + recoilSource + "]. ";
			battleInfo.logMsg += (heal > 0) ? "Damage taken is reduced due to healing effect [" + healSource + "]. " : "";
			battleInfo.logMsg += "<span class='dmg'><strong>" + (recoil - heal).toString() + " damage dealt.</strong></span><br><span class='" + charClass + "'><strong>" + battleInfo[charClass].name + " HP:</strong> " + oldHP.toString() + " → " + battleInfo[charClass].currHP.toString() + "</span></li>";
		} else if (heal > 0) {
			battleInfo[charClass].currHP = Math.min(oldHP + heal - poison - recoil, battleInfo[charClass].hp);
			battleInfo.logMsg += "<li class='battle-interaction'><span class='" + charClass + "'><strong>" + battleInfo[charClass].name + "</strong></span> recovers HP after combat [" + healSource + "]. ";
			battleInfo.logMsg += (poison > 0) ? "Opponent reduces health gained by inflicting after combat damage [" + poisonSource + "]. " : "";
			battleInfo.logMsg += (recoil > 0) ? "Health recovery reduced due to self-inflicted damage [" + recoilSource + "]. " : "";
			battleInfo.logMsg += "<span class='dmg'><strong>" + (heal - poison - recoil).toString() + " health restored.</strong></span><br><span class='" + charClass + "'><strong>" + battleInfo[charClass].name + " HP:</strong> " + oldHP.toString() + " → " + battleInfo[charClass].currHP.toString() + "</span></li>";
		}
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

// handles atk bonus from -blade tomes
// battleInfo contains all battle information, bonusAtk is the total amount of bonuses to add to atk, charToUse is either "attacker" or "defender"
function bladeTomeBonus(battleInfo, bonusAtk, charToUse) {
	"use strict";
	battleInfo[charToUse].atk += bonusAtk;
	battleInfo.logMsg += "<li class='battle-interaction'><span class='" + charToUse + "'><strong>" + battleInfo[charToUse].name + "</strong></span> adds total bonuses to attack, increasing attack by " + bonusAtk.toString() + " [" + battleInfo[charToUse].weaponName + "].</li>";
	return battleInfo;
}

// checks if the attack can activate windsweep
function canActivateSweep(container, atkSpd, defSpd, defWeapon) {
	"use strict";
	return container.hasOwnProperty("sweep") && (atkSpd - defSpd >= container.sweep.spd_adv) && container.sweep.weapon_type.hasOwnProperty(defWeapon);
}

// checks if the defender can counter
// battleInfo contains all battle information
function defCanCounter(battleInfo) {
	"use strict";
	return battleInfo.defender.weaponName !== "None" && (battleInfo.defender.weaponData.range === battleInfo.attacker.weaponData.range || battleInfo.defender.weaponData.hasOwnProperty("counter") || battleInfo.defender.passiveAData.hasOwnProperty("counter")) && !battleInfo.attacker.weaponData.hasOwnProperty("prevent_counter") && !battleInfo.defender.weaponData.hasOwnProperty("prevent_counter") && !canActivateSweep(battleInfo.attacker.passiveBData, battleInfo.attacker.spd, battleInfo.defender.spd, battleInfo.defender.weaponData.type);
}

// heals by damage dealt
// battleInfo contains all battle information, dmg is the damage dealt, healAmount is the fraction to heal, healSource is the source of the healing, multiple is true if unit has healed once already
function healDmg(battleInfo, dmg, healAmount, healSource, multiple) {
	"use strict";
	var heal = roundNum(dmg * healAmount, false);
	battleInfo.logMsg += "Healed by " + (multiple ? "another " : "")+ (healAmount * 100).toString() +"% of actual damage dealt [" + healSource + "]. ";
	battleInfo.healAmt += heal;
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
	charData.seal = $("#passive-s-" + charNum).val();
	charData.sealData = $("#passive-s-" + charNum).data("info");
	
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
	
	charData.damageDealt = 0;
	
	return charData;
}

// gets info of a default character, override if possible
// charName is the default character's name, charName must be a valid character and cannot be Custom
function getDefaultCharData(charName) {
	"use strict";
	var charData = {};
	
	// general char info
	charData.color = charInfo[charName].color;
	charData.moveType = charInfo[charName].move_type;
	charData.type = charInfo[charName].weapon_type;
	
	charData.name = charName;
	
	// indexes for weapons and skills
	var weaponIndex = 0;
	var passiveAIndex = 0;
	var passiveBIndex = 0;
	var passiveCIndex = 0;
	var assistIndex = 0;
	var specialIndex = 0;
	
	// get build info
	var rarity = 5;
	var level = parseInt($("#override-level").val());
	var merge = parseInt($("#override-merge").val());
	var boon = $("#override-boon").val();
	var bane = $("#override-bane").val();
	
	// override rarity
	var overrideRarity = parseInt($("#override-rarity").val());
	if (overrideRarity < 5 && charInfo[charName].hasOwnProperty("base_stat")) {
		if (charInfo[charName].base_stat.hasOwnProperty("star-" + overrideRarity.toString())) {
			rarity = overrideRarity;
		} else {
			for (var rarityIndex = 4; rarityIndex >= overrideRarity; rarityIndex--) {
				if (!charInfo[charName].base_stat.hasOwnProperty("star-" + rarityIndex.toString())) {
					break;
				}
				rarity = rarityIndex;
			}
		}
		
		// update indexes
		var starRating = "star-" + rarity.toString();
		if (charInfo[charName].hasOwnProperty("rarity_restrict") && charInfo[charName].rarity_restrict.hasOwnProperty(starRating)) {
			weaponIndex = charInfo[charName].rarity_restrict[starRating].hasOwnProperty("weapon") ? charInfo[charName].rarity_restrict[starRating].weapon : weaponIndex;
			passiveAIndex = charInfo[charName].rarity_restrict[starRating].hasOwnProperty("passive_a") ? charInfo[charName].rarity_restrict[starRating].passive_a : passiveAIndex;
			passiveBIndex = charInfo[charName].rarity_restrict[starRating].hasOwnProperty("passive_b") ? charInfo[charName].rarity_restrict[starRating].passive_b : passiveBIndex;
			passiveCIndex = charInfo[charName].rarity_restrict[starRating].hasOwnProperty("passive_c") ? charInfo[charName].rarity_restrict[starRating].passive_c : passiveCIndex;
			assistIndex = charInfo[charName].rarity_restrict[starRating].hasOwnProperty("assist") ? charInfo[charName].rarity_restrict[starRating].assist : assistIndex;
			specialIndex = charInfo[charName].rarity_restrict[starRating].hasOwnProperty("special") ? charInfo[charName].rarity_restrict[starRating].special : specialIndex;
		}
	}
	
	// default weapon info
	charData.weaponName = weaponIndex >= 0 ? charInfo[charName].weapon[weaponIndex] : "None";
	charData.weaponData = weaponIndex >= 0 ? weaponInfo[charData.weaponName] : {};
	
	// override weapon
	if ($("#override-weapon").val() !== "No Override") {
		if ($("#override-weapon").val() === "None") {
			charData.weaponName = "None";
			charData.weaponData = {};
		} else if (charData.type === weaponInfo[$("#override-weapon").val()].type) {
			charData.weaponName = $("#override-weapon").val();
			charData.weaponData = weaponInfo[$("#override-weapon").val()];
		}
	}
	
	// total bonuses
	if (charData.weaponData.hasOwnProperty("add_bonus")) {
		charData.addBonusAtk = parseInt($("#override-atk-bonus").val()) + parseInt($("#override-spd-bonus").val()) + parseInt($("#override-def-bonus").val()) + parseInt($("#override-res-bonus").val());
	}
	
	// get default passives, assist and special
	charData.passiveA = (charInfo[charName].hasOwnProperty("passive_a") && passiveAIndex >= 0) ? charInfo[charName].passive_a[passiveAIndex] : "None";
	charData.passiveB = (charInfo[charName].hasOwnProperty("passive_b") && passiveBIndex >= 0) ? charInfo[charName].passive_b[passiveBIndex] : "None";
	charData.passiveC = (charInfo[charName].hasOwnProperty("passive_c") && passiveCIndex >= 0) ? charInfo[charName].passive_c[passiveCIndex] : "None";
	charData.passiveAData = (charInfo[charName].hasOwnProperty("passive_a") && passiveAIndex >= 0) ? skillInfo.a[charData.passiveA] : {};
	charData.passiveBData = (charInfo[charName].hasOwnProperty("passive_b") && passiveBIndex >= 0) ? skillInfo.b[charData.passiveB] : {};
	charData.passiveCData = (charInfo[charName].hasOwnProperty("passive_c") && passiveCIndex >= 0) ? skillInfo.c[charData.passiveC] : {};
	charData.assistData = (charInfo[charName].hasOwnProperty("assist") && assistIndex >= 0) ? assistInfo[charInfo[charName].assist[assistIndex]] : {};
	charData.special = (charInfo[charName].hasOwnProperty("special") && specialIndex >= 0) ? charInfo[charName].special[specialIndex] : "None";
	charData.specialData = (charInfo[charName].hasOwnProperty("special") && specialIndex >= 0) ? specInfo[charData.special] : {};
	charData.seal = "None";
	charData.sealData = {};
	
	// override passives
	if ($("#override-passive-a").val() !== "No Override") {
		if ($("#override-passive-a").val() === "None") {
			charData.passiveA = "None";
			charData.passiveAData = {};
		} else if (isInheritable(skillInfo.a[$("#override-passive-a").val()], charName)) {
			charData.passiveA = $("#override-passive-a").val();
			charData.passiveAData = skillInfo.a[$("#override-passive-a").val()];
		}
	}
	if ($("#override-passive-b").val() !== "No Override") {
		if ($("#override-passive-b").val() === "None") {
			charData.passiveB = "None";
			charData.passiveBData = {};
		} else if (isInheritable(skillInfo.b[$("#override-passive-b").val()], charName)) {
			charData.passiveB = $("#override-passive-b").val();
			charData.passiveBData = skillInfo.b[$("#override-passive-b").val()];
		}
	}
	if ($("#override-passive-c").val() !== "No Override") {
		if ($("#override-passive-c").val() === "None") {
			charData.passiveC = "None";
			charData.passiveCData = {};
		} else if (isInheritable(skillInfo.c[$("#override-passive-c").val()], charName)) {
			charData.passiveC = $("#override-passive-c").val();
			charData.passiveCData = skillInfo.c[$("#override-passive-c").val()];
		}
	}
	
	// override seal
	if ($("#override-passive-s").val() !== "No Override" && $("#override-passive-s").val() !== "None") {
		charData.seal = $("#override-passive-s").val();
		charData.sealData = skillInfo.s[$("#override-passive-s").val()];
	}
	
	// override assist
	if ($("#override-assist").val() !== "No Override") {
		if ($("#override-assist").val() === "None") {
			charData.assistData = {};
		} else if (isInheritable(assistInfo[$("#override-assist").val()], charName)) {
			charData.assistData = assistInfo[$("#override-assist").val()];
		}
	}
	
	// override special
	if ($("#override-special").val() !== "No Override") {
		if ($("#override-special").val() === "None") {
			charData.special = "None";
			charData.specialData = {};
		} else if (isInheritable(specInfo[$("#override-special").val()], charName)) {
			charData.special = $("#override-special").val();
			charData.specialData = specInfo[$("#override-special").val()];
		}
	}
	
	// get special cooldown
	charData.specCurrCooldown = charData.special !== "None" ? getSpecialCooldown(charData.specialData, charData.weaponData, charData.assistData) : 0;
	
	// override special cooldown
	if ($("#override-spec-cooldown").val() !== "max") {
		charData.specCurrCooldown = Math.min(charData.specCurrCooldown, parseInt($("#override-spec-cooldown").val()));
	}
	
	// show stats
	if (charInfo[charName].hasOwnProperty("base_stat")) {
		var stats = getStatTotals(charName, charData.weaponName, charData.passiveA, charData.seal, rarity, level, merge, boon, bane);
		charData.currHP = stats.hp;
		charData.initHP = stats.hp;
		charData.startHP = stats.hp;
		charData.hp = stats.hp;
		charData.atk = stats.atk + parseInt($("#override-atk-bonus").val()) + parseInt($("#override-atk-penalty").val()) + parseInt($("#override-atk-spur").val());
		charData.spd = stats.spd + parseInt($("#override-spd-bonus").val()) + parseInt($("#override-spd-penalty").val()) + parseInt($("#override-spd-spur").val());
		charData.def = stats.def + parseInt($("#override-def-bonus").val()) + parseInt($("#override-def-penalty").val()) + parseInt($("#override-def-spur").val()); 
		charData.res = stats.res + parseInt($("#override-res-bonus").val()) + parseInt($("#override-res-penalty").val()) + parseInt($("#override-res-spur").val());
		charData.atkWS = stats.atk + parseInt($("#override-atk-bonus").val()) + parseInt($("#override-atk-penalty").val());
		charData.spdWS = stats.spd + parseInt($("#override-spd-bonus").val()) + parseInt($("#override-spd-penalty").val());
		charData.defWS = stats.def + parseInt($("#override-def-bonus").val()) + parseInt($("#override-def-penalty").val());
		charData.resWS = stats.res + parseInt($("#override-res-bonus").val()) + parseInt($("#override-res-penalty").val());
	} else {
		charData.currHP = charInfo[charName].hp;
		charData.initHP = charInfo[charName].hp;
		charData.startHP = charInfo[charName].hp;
		charData.hp = charInfo[charName].hp;
		charData.atk = charInfo[charName].atk + parseInt($("#override-atk-bonus").val()) + parseInt($("#override-atk-penalty").val()) + parseInt($("#override-atk-spur").val());
		charData.spd = charInfo[charName].spd + parseInt($("#override-spd-bonus").val()) + parseInt($("#override-spd-penalty").val()) + parseInt($("#override-spd-spur").val());
		charData.def = charInfo[charName].def + parseInt($("#override-def-bonus").val()) + parseInt($("#override-def-penalty").val()) + parseInt($("#override-def-spur").val()); 
		charData.res = charInfo[charName].res + parseInt($("#override-res-bonus").val()) + parseInt($("#override-res-penalty").val()) + parseInt($("#override-res-spur").val());
		charData.atkWS = charInfo[charName].atk + parseInt($("#override-atk-bonus").val()) + parseInt($("#override-atk-penalty").val());
		charData.spdWS = charInfo[charName].spd + parseInt($("#override-spd-bonus").val()) + parseInt($("#override-spd-penalty").val());
		charData.defWS = charInfo[charName].def + parseInt($("#override-def-bonus").val()) + parseInt($("#override-def-penalty").val());
		charData.resWS = charInfo[charName].res + parseInt($("#override-res-bonus").val()) + parseInt($("#override-res-penalty").val());
	}
	
	// override current hp
	if (parseInt($("#override-curr-hp").val()) < 100) {
		charData.currHP = roundNum(charData.currHP * (parseInt($("#override-curr-hp").val()) / 100), false);
		charData.currHP = Math.min(charData.currHP, charData.hp);
		charData.currHP = Math.max(charData.currHP, 1);
		charData.initHP = charData.currHP;
		charData.startHP = charData.currHP;
	}
	
	charData.damageDealt = 0;
	
	return charData;
}

// returns an object containing all the info in the attacker and defender panels needed to simulate a battle
function getBattleInfo() {
	"use strict";
	var battleInfo = {};
	battleInfo.attacker = getCharPanelData("1");
	battleInfo.defender = getCharPanelData("2");
	battleInfo.logMsg = "";
	battleInfo.atkRange = battleInfo.attacker.weaponName !== "None" ? weaponInfo[battleInfo.attacker.weaponName].range : 0;
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
		battleInfo.atkRange = battleInfo.attacker.weaponName !== "None" ? weaponInfo[battleInfo.attacker.weaponName].range : 0;
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

// checks if a unit can accelerate special cooldown
// battleInfo contains the needed info for battle, attacker is true if we are accelerating the attacker's special
function hasSpecAccel(battleInfo, attacker) {
	"use strict";
	var mainUnit = attacker ? battleInfo.attacker : battleInfo.defender;
	var otherUnit = attacker ? battleInfo.defender : battleInfo.attacker;
	
	return (mainUnit.passiveAData.hasOwnProperty("spec_accel") && (mainUnit[mainUnit.passiveAData.spec_accel.stat] - otherUnit[mainUnit.passiveAData.spec_accel.stat] >= mainUnit.passiveAData.spec_accel.adv));
}

// checks if a unit can activate guard ability
// battleInfo contains the needed info for battle, attacker is true if we look for the ability on the attacker
function canActivateGuard(battleInfo, attacker) {
	"use strict";
	var mainUnit = attacker ? battleInfo.attacker : battleInfo.defender;
	var otherUnit = attacker ? battleInfo.defender : battleInfo.attacker;
	
	return (mainUnit.passiveBData.hasOwnProperty("guard") && mainUnit.initHP >= mainUnit.hp * mainUnit.passiveBData.guard && otherUnit.special !== "None");
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
	var defSpec = false;	// set to true if special triggers
	
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
		dmg += roundNum(attacker.specialData.dmg_buff_by_stat.buff * attacker[attacker.specialData.dmg_buff_by_stat.stat], false);
		battleInfo.logMsg += "Damage boosted by " + (attacker.specialData.dmg_buff_by_stat.buff * 100).toString() + "% of " + statWord(attacker.specialData.dmg_buff_by_stat.stat) + " [" + attacker.special + "]. ";
		atkSpec = true;
	}
	
	// damage suffered buff
	if (attacker.specialData.hasOwnProperty("dmg_suffer_buff") && attacker.specCurrCooldown <= 0) {
		dmg += roundNum((attacker.hp - attacker.currHP) * attacker.specialData.dmg_suffer_buff, false);
		battleInfo.logMsg += "Damage boosted by " + (attacker.specialData.dmg_suffer_buff * 100).toString() + "% of damage suffered [" + attacker.special + "]. ";
		atkSpec = true;
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
	
	// check for bonus damage on special proc
	if (attacker.weaponData.hasOwnProperty("spec_damage_bonus") && (atkSpec || (attacker.specialData.hasOwnProperty("heal_dmg") && attacker.specCurrCooldown <= 0))) {
		dmg += attacker.weaponData.spec_damage_bonus;
		battleInfo.logMsg += "Damage boosted by " + attacker.weaponData.spec_damage_bonus.toString() + " on Special trigger [" + attacker.weaponName + "]. ";
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
	
	// damage nullifier
	if (defender.sealData.hasOwnProperty("null_dmg")) {
		dmg = 0;
		battleInfo.logMsg += "Opponent nullifies damage [" + defender.seal + "]. ";
	}
	
	// double check dmg
	dmg = Math.max(dmg, 0);
	
	// print damage dealt
	battleInfo.logMsg += "<span class='dmg'><strong>" + dmg.toString() + " damage dealt.</strong></span> ";
	
	// add to damage total counter
	attacker.damageDealt += dmg;
	
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
	battleInfo.healAmt = 0;
	
	// heal from damage dealt
	if (attacker.weaponData.hasOwnProperty("heal_dmg")) {
		battleInfo = healDmg(battleInfo, (defOldHP - defender.currHP), attacker.weaponData.heal_dmg, attacker.weaponName, didHeal);
		didHeal = true;
	} 
	if (attacker.specialData.hasOwnProperty("heal_dmg") && attacker.specCurrCooldown <= 0) {
		battleInfo = healDmg(battleInfo, (defOldHP - defender.currHP), attacker.specialData.heal_dmg, attacker.special, didHeal);
		didHeal = true;
		atkSpec = true;
	}
	
	if (didHeal) {
		attacker.currHP = Math.min(attacker.hp, attacker.currHP + battleInfo.healAmt);
		battleInfo.logMsg += "<span class='dmg'><strong>" + battleInfo.healAmt.toString() + " health restored. </strong></span>";
		healMsg = " <span class='heal-seperator'>|</span> <span class='" + atkClass + "'><strong>" + attacker.name + " HP:</strong> " + atkOldHP.toString() + " → " + attacker.currHP.toString() + "</span>";
	}
	
	// update cooldowns
	if (atkSpec) {
		attacker.specCurrCooldown = getSpecialCooldown(attacker.specialData, attacker.weaponData, attacker.assistData);
	} else if (attacker.specCurrCooldown > 0) {
		if (hasSpecAccel(battleInfo, initiator)) { // heavy blade
			attacker.specCurrCooldown -= 1;
			battleInfo.logMsg += "Gained an additional special cooldown charge [" + attacker.passiveA + "]. ";
		}
		if (canActivateGuard(battleInfo, !initiator)) { // guard effect
			attacker.specCurrCooldown += 1;
			battleInfo.logMsg += "Lost a special cooldown charge [" + defender.passiveB + "]. ";
		}
		attacker.specCurrCooldown -= 1;
	}
	
	if (defSpec) {
		defender.specCurrCooldown = getSpecialCooldown(defender.specialData, defender.weaponData, defender.assistData);
	} else if (defender.specCurrCooldown > 0) {
		if (canActivateGuard(battleInfo, initiator)) { // guard effect
			defender.specCurrCooldown += 1;
			battleInfo.logMsg += "Opponent loses a special cooldown charge [" + attacker.passiveB + "]. ";
		}
		defender.specCurrCooldown -= 1;
	}
	
	// print hp before and after
	battleInfo.logMsg += "<br><span class='" + defClass + "'><strong>" + defender.name + " HP:</strong> " + defOldHP.toString() + " → " + defender.currHP.toString() + "</span>" + healMsg + "</li>";
	
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
	if (battleInfo.attacker.weaponName === "None") {
		if (displayMsg) {
			$("#interaction-list").stop(true, true).hide().html("<li class='battle-interaction-only'><span class='attacker'><strong>" + $("#char-1").val() + "</strong></span> cannot attack without a weapon.</li>");
			$("#hp-remain-1").stop(true, true).hide().text($("#curr-hp-1").val().toString() + " → " + $("#curr-hp-1").val().toString());
			$("#hp-remain-2").stop(true, true).hide().text($("#curr-hp-2").val().toString() + " → " + $("#curr-hp-2").val().toString());
			$("#hp-remain-1").fadeIn("slow");
			$("#hp-remain-2").fadeIn("slow");
			$("#result-msg").text("Draw!").css("color", "white").fadeIn("slow");
			
			if (openLog) {
				$("#interaction-list").fadeIn("slow");
			}
		}
		
		return battleInfo;
	}
	
	// AOE damage before combat
	if (battleInfo.attacker.specialData.hasOwnProperty("before_combat_aoe") && battleInfo.attacker.specCurrCooldown <= 0) {
		// reset cooldown
		battleInfo.attacker.specCurrCooldown = getSpecialCooldown(battleInfo.attacker.specialData, battleInfo.attacker.weaponData, battleInfo.attacker.assistData);
		battleInfo.logMsg += "<li class='battle-interaction'><span class='attacker'><strong>" + battleInfo.attacker.name + "</strong></span> deals AOE damage before combat [" + battleInfo.attacker.special + "]. ";
		
		// calculate damage
		var aoeDmg = battleInfo.attacker.atkWS - (battleInfo.attacker.weaponData.magical ? battleInfo.defender.resWS : battleInfo.defender.defWS);
		
		// check for damage multiplier
		if (battleInfo.attacker.specialData.hasOwnProperty("aoe_dmg_mod")) {
			aoeDmg = roundNum(aoeDmg * battleInfo.attacker.specialData.aoe_dmg_mod, false);
		}
		
		// check for damage nullifier
		if (battleInfo.defender.sealData.hasOwnProperty("null_dmg")) {
			aoeDmg = 0;
			battleInfo.logMsg += "Damage is nullified [" + battleInfo.defender.seal + "]. ";
		}
		
		// cap dmg at 0
		aoeDmg = Math.max(aoeDmg, 0);
		
		// add to damage dealt counter
		battleInfo.attacker.damageDealt += aoeDmg;
		
		var oldHP = battleInfo.defender.currHP;
		battleInfo.defender.currHP = Math.max(battleInfo.defender.currHP - aoeDmg, 1);
		battleInfo.defender.initHP = battleInfo.defender.currHP;
		battleInfo.logMsg += "<span class='dmg'><strong>" + aoeDmg.toString() + " damage dealt.</strong></span><br><span class='defender'><strong>" + battleInfo.defender.name + " HP:</strong> " + oldHP.toString() + " → " + battleInfo.defender.currHP.toString() + "</span></li>";
	}
	
	// attacker initiate bonus
	if (battleInfo.attacker.weaponData.hasOwnProperty("initiate_mod")) {
		battleInfo = initiateBonus(battleInfo, battleInfo.attacker.weaponData.initiate_mod, battleInfo.attacker.weaponName);
	}
	if (battleInfo.attacker.passiveAData.hasOwnProperty("initiate_mod")) {
		battleInfo = initiateBonus(battleInfo, battleInfo.attacker.passiveAData.initiate_mod, battleInfo.attacker.passiveA);
	}
	
	// attacker below hp threshold bonus
	if (battleInfo.attacker.weaponData.hasOwnProperty("below_threshold_mod") && battleInfo.attacker.initHP <= checkRoundError(battleInfo.attacker.weaponData.below_threshold_mod.threshold * battleInfo.attacker.hp)) {
		battleInfo = belowThresholdBonus(battleInfo, battleInfo.attacker.weaponData.below_threshold_mod, battleInfo.attacker.weaponName, "attacker");
	} 
	
	// attacker blade tome bonuses
	if (battleInfo.attacker.hasOwnProperty("addBonusAtk") && battleInfo.attacker.addBonusAtk > 0) {
		battleInfo = bladeTomeBonus(battleInfo, battleInfo.attacker.addBonusAtk, "attacker");
	}
	
	// defending bonus
	if (battleInfo.defender.weaponData.hasOwnProperty("defend_mod")) {
		battleInfo = defendBonus(battleInfo, battleInfo.defender.weaponData.defend_mod, battleInfo.defender.weaponName);
	}
	
	// defender below hp threshold bonus
	if (battleInfo.defender.weaponData.hasOwnProperty("below_threshold_mod") && battleInfo.defender.initHP <= checkRoundError(battleInfo.defender.weaponData.below_threshold_mod.threshold * battleInfo.defender.hp)) {
		battleInfo = belowThresholdBonus(battleInfo, battleInfo.defender.weaponData.below_threshold_mod, battleInfo.defender.weaponName, "defender");
	}
	
	// defender blade tome bonuses
	if (battleInfo.defender.hasOwnProperty("addBonusAtk") && battleInfo.defender.addBonusAtk > 0) {
		battleInfo = bladeTomeBonus(battleInfo, battleInfo.defender.addBonusAtk, "defender");
	}
	
	// can defender counter
	var defCC = defCanCounter(battleInfo);
	var defAttacks = false;
	
	// can units make a follow-up
	var atkCF = !battleInfo.attacker.passiveBData.hasOwnProperty("no_follow");
	
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
	
	// outspeed info
	var atkOutspeed = battleInfo.attacker.spd >= battleInfo.defender.spd + 5;
	var defOutspeed = battleInfo.defender.spd >= battleInfo.attacker.spd + 5;
	
	// vantage
	if (((battleInfo.defender.weaponName !== "None" && vantagePassive) || vantageWeapon) && defCC) {
		if (battleInfo.defender.weaponData.range === battleInfo.attacker.weaponData.range) {
			battleInfo = singleCombat(battleInfo, false, "counter-attacks first [" + vantageSource + "]", false);
			defAttacks = true;
			vantage = true;
		} else if (battleInfo.defender.weaponData.hasOwnProperty("counter")) {
			battleInfo = singleCombat(battleInfo, false, "counter-attacks first, ignoring distance [" + vantageSource + ", " + battleInfo.defender.weaponName + "]", false);
			defAttacks = true;
			vantage = true;
		} else if (battleInfo.defender.passiveAData.hasOwnProperty("counter")) {
			battleInfo = singleCombat(battleInfo, false, "counter-attacks first, ignoring distance [" + vantageSource + ", " + battleInfo.defender.passiveA + "]", false);
			defAttacks = true;
			vantage = true;
		}
	}
	
	// attacker initiates
	if (battleInfo.attacker.currHP > 0) {
		battleInfo = singleCombat(battleInfo, true, "attacks", false);
	}
		
	// desperation follow up
	if ((desperationPassive || desperationWeapon) && battleInfo.attacker.currHP > 0 && battleInfo.defender.currHP > 0 && atkCF) {
		if (!defBreakerPassive && !defBreakerWeapon && !atkWary && !defWary) { // regular conditions
			if (atkBreakerPassive || atkBreakerWeapon) { // follow with breaker
				desperation = true;
				atkCF = false;
				if ((defRiposteWeapon || defRipostePassive) && defOutspeed) { // foe can follow-up
					battleInfo = singleCombat(battleInfo, true, "makes an immediate, automatic follow-up attack [" + desperationSource + ", " + atkBreakerSource + "]", false);
				} else {
					battleInfo = singleCombat(battleInfo, true, "makes an immediate follow-up attack, while canceling any follow-up attack from the opponent [" + desperationSource + ", " + atkBreakerSource + "]", false);
				}
			} else if (atkOutspeed) { // follow with speed
				desperation = true;
				atkCF = false;
				battleInfo = singleCombat(battleInfo, true, "makes an immediate follow-up attack [" + desperationSource + "]", false);
			} else if (atkBrash) { // follow with brash assault
				desperation = true;
				atkCF = false;
				battleInfo = singleCombat(battleInfo, true, "makes an immediate, automatic follow-up attack [" + desperationSource + ", " + battleInfo.attacker.passiveB + "]", false);
			}
		} else if ((defWary || defBreakerPassive || defBreakerWeapon) && !atkWary && atkOutspeed) { // defender cancels follow-up
			if (atkBreakerPassive || atkBreakerWeapon) {
				desperation = true;
				atkCF = false;
				battleInfo = singleCombat(battleInfo, true, "makes an immediate follow-up attack, while canceling any follow-up attack from the opponent [" + desperationSource + ", " + atkBreakerSource + "]", false);
			} else if (atkBrash) {
				desperation = true;
				atkCF = false;
				battleInfo = singleCombat(battleInfo, true, "makes an immediate, automatic follow-up attack [" + desperationSource + ", " + battleInfo.attacker.passiveB + "]", false);
			}
		}	
	}
	
	// defender will try to counter-attack if they haven't been ko'd
	if (battleInfo.attacker.currHP > 0 && battleInfo.defender.currHP > 0) {
		// defender must be in range to counter-attack or have a counter ability
		if (!vantage) {
			if (battleInfo.defender.weaponName !== "None" && battleInfo.defender.weaponData.range === battleInfo.attacker.weaponData.range && defCC) {
				battleInfo = singleCombat(battleInfo, false, "counter-attacks", false);
				defAttacks = true;
			} else if (battleInfo.defender.weaponName !== "None" && battleInfo.defender.weaponData.hasOwnProperty("counter") && defCC) {	
				battleInfo = singleCombat(battleInfo, false, "counter-attacks, ignoring distance [" + battleInfo.defender.weaponName + "]", false);
				defAttacks = true;
			} else if (battleInfo.defender.weaponName !== "None" && battleInfo.defender.passiveAData.hasOwnProperty("counter") && defCC) {	
				battleInfo = singleCombat(battleInfo, false, "counter-attacks, ignoring distance [" + battleInfo.defender.passiveA + "]", false);
				defAttacks = true;
			} else if (battleInfo.defender.weaponName !== "None" && battleInfo.attacker.weaponData.hasOwnProperty("prevent_counter")) {
				battleInfo.logMsg += "<li class='battle-interaction'><span class='defender'><strong>" + battleInfo.defender.name + "</strong></span> " + " is prevented from counter-attacking [" + battleInfo.attacker.weaponName + "].</li>";
			} else if (battleInfo.defender.weaponName !== "None" && battleInfo.defender.weaponData.hasOwnProperty("prevent_counter")) {
				battleInfo.logMsg += "<li class='battle-interaction'><span class='defender'><strong>" + battleInfo.defender.name + "</strong></span> " + " is prevented from counter-attacking [" + battleInfo.defender.weaponName + "].</li>";
			} else if (battleInfo.defender.weaponName !== "None" && canActivateSweep(battleInfo.attacker.passiveBData, battleInfo.attacker.spd, battleInfo.defender.spd, battleInfo.defender.weaponData.type)) {
				battleInfo.logMsg += "<li class='battle-interaction'><span class='defender'><strong>" + battleInfo.defender.name + "</strong></span> " + " is prevented from counter-attacking [" + battleInfo.attacker.passiveB + "].</li>";
			} else {
				battleInfo.logMsg += "<li class='battle-interaction'><span class='defender'><strong>" + battleInfo.defender.name + "</strong></span> " + " is unable to counter-attack.</li>";
			}
		}
		
		// print message if attacker cannot make a follow-up
		if (battleInfo.attacker.passiveBData.hasOwnProperty("no_follow") && battleInfo.attacker.currHP > 0) {
			battleInfo.logMsg += "<li class='battle-interaction'><span class='attacker'><strong>" + battleInfo.attacker.name + "</strong></span> " + " is prevented from making follow-up attacks [" + battleInfo.attacker.passiveB + "].</li>";
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
				if ((atkBreakerPassive || atkBreakerWeapon) && atkOutspeed && atkCF) {
					battleInfo = singleCombat(battleInfo, true, "makes a follow-up attack, while canceling any follow-up attack from the opponent [" + atkBreakerSource + "]", false);
				}
				
				// check if attacker can follow up with brash assault
				else if (atkBrash && atkOutspeed && atkCF) {
					battleInfo = singleCombat(battleInfo, true, "makes an automatic follow-up attack [" + battleInfo.attacker.passiveB + "]", false);
				} 
				
				// no follow ups
				else if (atkCF || defRiposteWeapon) {
					battleInfo.logMsg += "<li class='battle-interaction'><span class='defender'><strong>" + battleInfo.defender.name + "</strong></span> prevents any further follow-up attacks [" + battleInfo.defender.passiveB + "].</li>";	
				}
			}
			
			// breaker skills
			else if ((atkBreakerPassive || atkBreakerWeapon) && (defBreakerPassive || defBreakerWeapon)) {	// double breakers
				if (atkOutspeed && atkCF) { // regular attacker follow
					battleInfo = singleCombat(battleInfo, true, "makes a follow-up attack, while canceling any follow-up attack from the opponent [" + atkBreakerSource + "]", false);
				} else if (defOutspeed) { // regular defender follow
					if (defCC) { // defender attacks
						battleInfo = singleCombat(battleInfo, false, "makes a follow-up attack, while canceling any follow-up attack from the opponent [" + defBreakerSource + "]", false);
					} else if (atkCF) { // defender cannot attack
						battleInfo.logMsg += "<li class='battle-interaction'><span class='defender'><strong>" + battleInfo.defender.name + "</strong></span> cancels any follow-up attacks from the opponent [" + defBreakerSource + "].</li>";
					}
				} else if (atkCF) { // cancel all
					battleInfo.logMsg += "<li class='battle-interaction'>Breaker skills cancel follow-up attacks from either character [" + atkBreakerSource + ", " + defBreakerSource + "].</li>";
				}
			} else if ((atkBreakerPassive || atkBreakerWeapon)) {  // attacker has breaker
				// check if defender can activate quick riposte ability
				if ((defRiposteWeapon || defRipostePassive) && defOutspeed) {
					if (atkCF) {
						battleInfo = singleCombat(battleInfo, true, "makes an automatic follow-up attack [" + atkBreakerSource + "]", false);	
					}
					if (battleInfo.defender.currHP > 0) {
						battleInfo = singleCombat(battleInfo, false, "makes an automatic follow-up attack [" + defRiposteSource + "]", false);
					}
				} else if (atkCF) {
					battleInfo = singleCombat(battleInfo, true, "makes a follow-up attack, while canceling any follow-up attack from the opponent [" + atkBreakerSource + "]", false);
				}
			} else if (defBreakerPassive || defBreakerWeapon) {  // defender breaker passive
				// check if attacker can follow up with brash assault
				var brashAct = false;
				if (atkBrash && atkOutspeed && atkCF) {
					battleInfo = singleCombat(battleInfo, true, "makes an automatic follow-up attack [" + battleInfo.attacker.passiveB + "]", false);
					brashAct = true;
				} 
				
				if (defCC && battleInfo.defender.currHP > 0) {
					if (brashAct || desperation) {
						battleInfo = singleCombat(battleInfo, false, "makes an automatic follow-up attack [" + defBreakerSource + "]", false);
					} else {
						battleInfo = singleCombat(battleInfo, false, "makes a follow-up attack, while canceling any follow-up attack from the opponent [" + defBreakerSource + "]", false);
					}
				} else if (atkCF && battleInfo.defender.currHP > 0) {
					battleInfo.logMsg +=  "<li class='battle-interaction'><span class='defender'><strong>" + battleInfo.defender.name + "</strong></span> cancels any follow-up attacks from the opponent [" + defBreakerSource + "].</li>";
				}
			} 
			
			// regular follow ups
			else {
				var defendFollow = false;		// true if defender makes a follow up attack
				
				// check if defender activated vantage and can follow up
				if (vantage && (defOutspeed)) {
					battleInfo = singleCombat(battleInfo, false, "makes a follow-up attack", false);
					defendFollow = true;
				}
				
				// check for brash assault
				if (atkBrash && atkCF && battleInfo.attacker.currHP > 0) {
					battleInfo = singleCombat(battleInfo, true, "makes an automatic follow-up attack [" + battleInfo.attacker.passiveB + "]", false);
					atkCF = false;
				}
				
				// regular follow up attack
				if (atkCF && atkOutspeed && battleInfo.attacker.currHP > 0 && battleInfo.defender.currHP > 0) { // attacker
					battleInfo = singleCombat(battleInfo, true, "makes a follow-up attack", false);
					atkCF = false;
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
	}
	
	// after combat effects
	var atkAfterHeal = 0;
	var atkAfterHealSource = "";
	
	var atkPoison = 0;
	var atkPoisonSource = "";
	var defPoison = 0;
	var defPoisonSource = "";
	
	var atkRecoil = 0;
	var atkRecoilSource = "";
	var defRecoil = 0;
	var defRecoilSource = "";
	
	// check for after combat healing
	if (battleInfo.attacker.weaponData.hasOwnProperty("initiate_heal") && battleInfo.attacker.currHP > 0) {
		atkAfterHeal = battleInfo.attacker.weaponData.initiate_heal;
		atkAfterHealSource = battleInfo.attacker.weaponName;
	}
	
	// check for poison damage
	if (battleInfo.attacker.passiveBData.hasOwnProperty("poison") && battleInfo.attacker.currHP > 0 && battleInfo.defender.currHP > 0) {
		atkPoison = battleInfo.attacker.passiveBData.poison;
		atkPoisonSource = battleInfo.attacker.passiveB;
	}
	if (battleInfo.attacker.weaponData.hasOwnProperty("poison") && battleInfo.defender.currHP > 0) {
		atkPoison += battleInfo.attacker.weaponData.poison;
		atkPoisonSource += (atkPoisonSource.length > 0) ? ", " + battleInfo.attacker.weaponName : battleInfo.attacker.weaponName;
	}
	if (battleInfo.attacker.weaponData.hasOwnProperty("initiate_poison") && battleInfo.defender.currHP > 0) {
		atkPoison += battleInfo.attacker.weaponData.initiate_poison;
		atkPoisonSource += (atkPoisonSource.length > 0) ? ", " + battleInfo.attacker.weaponName : battleInfo.attacker.weaponName;
	}
	if (battleInfo.defender.weaponData.hasOwnProperty("poison") && battleInfo.attacker.currHP > 0 && defAttacks) {
		defPoison = battleInfo.defender.weaponData.poison;
		defPoisonSource = battleInfo.defender.weaponName;
	}
	
	// check for recoil damage
	if (battleInfo.attacker.currHP > 0 && battleInfo.attacker.passiveAData.hasOwnProperty("recoil_dmg")) {
		atkRecoil = battleInfo.attacker.passiveAData.recoil_dmg;
		atkRecoilSource = battleInfo.attacker.passiveA;
	}
	if (battleInfo.defender.currHP > 0 && battleInfo.defender.passiveAData.hasOwnProperty("recoil_dmg")) {
		defRecoil = battleInfo.defender.passiveAData.recoil_dmg;
		defRecoilSource = battleInfo.defender.passiveA;
	}
	
	// print after combat effects
	battleInfo = afterCombatEffects(battleInfo, "attacker", defPoison, defPoisonSource, atkRecoil, atkRecoilSource, atkAfterHeal, atkAfterHealSource);
	battleInfo = afterCombatEffects(battleInfo, "defender", atkPoison, atkPoisonSource, defRecoil, defRecoilSource, 0, "");
	
	
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

		// display battle log
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
	$("#char-1 option:eq(0)").attr("selected", "selected").trigger("change.select2");
	displayChar($("#char-1").val(), "1");
	$("#char-2 option:eq(1)").attr("selected", "selected").trigger("change.select2");
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
	oldAtkInfo.seal = $("#passive-s-1").html();
	oldAtkInfo.selectedSeal = $("#passive-s-1").val();
	oldAtkInfo.sealData = $("#passive-s-1").data("info");
	oldAtkInfo.sealDesc = $("#passive-s-desc-1").text();
	
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
	
	oldAtkInfo.rarityHTML = $("#rarity-1").html();
	oldAtkInfo.rarity = $("#rarity-1").val();
	oldAtkInfo.level = $("#level-1").val();
	oldAtkInfo.merge = $("#merge-1").val();
	oldAtkInfo.boon = $("#boon-1").val();
	oldAtkInfo.bane = $("#bane-1").val();
	
	oldAtkInfo.extraCharInfoDisabled = ($("#color-1").attr("disabled") === "disabled");
	
	oldAtkInfo.extraCharInfoVisible = $("#extra-char-info-1").stop(true, true).is(":visible");
	oldAtkInfo.extraWeaponInfoVisible = $("#extra-weapon-info-1").stop(true, true).is(":visible");
	oldAtkInfo.extraPassiveAInfoVisible = $("#extra-passive-a-info-1").stop(true, true).is(":visible");
	oldAtkInfo.extraPassiveBInfoVisible = $("#extra-passive-b-info-1").stop(true, true).is(":visible");
	oldAtkInfo.extraPassiveCInfoVisible = $("#extra-passive-c-info-1").stop(true, true).is(":visible");
	oldAtkInfo.extraSealInfoVisible = $("#extra-passive-s-info-1").stop(true, true).is(":visible");
	oldAtkInfo.extraAssistInfoVisible = $("#extra-assist-info-1").stop(true, true).is(":visible");
	oldAtkInfo.extraSpecialInfoVisible = $("#extra-special-info-1").stop(true, true).is(":visible");
	oldAtkInfo.buildInfoVisible = $("#char-build-info-1").stop(true, true).is(":visible");
	
	// place defender info in attacker panel
	setVisible("#extra-char-info-1", $("#extra-char-info-2").stop(true, true).is(":visible"), false);
	setVisible("#extra-weapon-info-1", $("#extra-weapon-info-2").stop(true, true).is(":visible"), false);
	setVisible("#extra-passive-a-info-1", $("#extra-passive-a-info-2").stop(true, true).is(":visible"), false);
	setVisible("#extra-passive-b-info-1", $("#extra-passive-b-info-2").stop(true, true).is(":visible"), false);
	setVisible("#extra-passive-c-info-1", $("#extra-passive-c-info-2").stop(true, true).is(":visible"), false);
	setVisible("#extra-passive-s-info-1", $("#extra-passive-s-info-2").stop(true, true).is(":visible"), false);
	setVisible("#extra-assist-info-1", $("#extra-assist-info-2").stop(true, true).is(":visible"), false);
	setVisible("#extra-special-info-1", $("#extra-special-info-2").stop(true, true).is(":visible"), false);
	setVisible("#char-build-info-1", $("#char-build-info-2").stop(true, true).is(":visible"), false);
	
	$("#char-1").val($("#char-2").val()).trigger("change.select2");
	$("#color-1").val($("#color-2").val());
	$("#weapon-type-1").val($("#weapon-type-2").val());
	$("#move-type-1").val($("#move-type-2").val());
	
	$("#weapon-1").html($("#weapon-2").html());
	$("#weapon-1").val($("#weapon-2").val()).trigger("change.select2");
	$("#weapon-1").data("info", $("#weapon-2").data("info"));
	$("#weapon-might-1").text($("#weapon-might-2").text());
	$("#weapon-range-1").text($("#weapon-range-2").text());
	$("#weapon-magical-1").text($("#weapon-magical-2").text());
	$("#weapon-desc-1").text($("#weapon-desc-2").text());
	
	$("#passive-a-1").html($("#passive-a-2").html());
	$("#passive-a-1").val($("#passive-a-2").val()).trigger("change.select2");
	$("#passive-a-1").data("info", $("#passive-a-2").data("info"));
	$("#passive-a-desc-1").text($("#passive-a-desc-2").text());
	$("#passive-b-1").html($("#passive-b-2").html());
	$("#passive-b-1").val($("#passive-b-2").val()).trigger("change.select2");
	$("#passive-b-1").data("info", $("#passive-b-2").data("info"));
	$("#passive-b-desc-1").text($("#passive-b-desc-2").text());
	$("#passive-c-1").html($("#passive-c-2").html());
	$("#passive-c-1").val($("#passive-c-2").val()).trigger("change.select2");
	$("#passive-c-1").data("info", $("#passive-c-2").data("info"));
	$("#passive-c-desc-1").text($("#passive-c-desc-2").text());
	$("#assist-1").html($("#assist-2").html());
	$("#assist-1").val($("#assist-2").val()).trigger("change.select2");
	$("#assist-1").data("info", $("#assist-2").data("info"));
	$("#assist-desc-1").text($("#assist-desc-2").text());
	$("#special-1").html($("#special-2").html());
	$("#special-1").val($("#special-2").val()).trigger("change.select2");
	$("#special-1").data("info", $("#special-2").data("info"));
	$("#special-desc-1").text($("#special-desc-2").text());
	$("#spec-cooldown-1").val($("#spec-cooldown-2").val());
	$("#spec-cooldown-max-1").text($("#spec-cooldown-max-2").text());
	$("#passive-s-1").html($("#passive-s-2").html());
	$("#passive-s-1").val($("#passive-s-2").val()).trigger("change.select2");
	$("#passive-s-1").data("info", $("#passive-s-2").data("info"));
	$("#passive-s-desc-1").text($("#passive-s-desc-2").text());
	
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
	
	$("#rarity-1").html($("#rarity-2").html());
	$("#rarity-1").val($("#rarity-2").val());
	$("#level-1").val($("#level-2").val());
	$("#merge-1").val($("#merge-2").val());
	$("#boon-1").val($("#boon-2").val());
	$("#bane-1").val($("#bane-2").val());
	
	setDisabled("#extra-char-info-1 select", "#extra-char-info-1", ($("#color-2").attr("disabled") === "disabled"));
	enableSpecCooldown("1");
	
	setVisible("#extra-char-info-1", $("#extra-char-info-2").stop(true, true).is(":visible"), true);
	setVisible("#extra-weapon-info-1", $("#extra-weapon-info-2").stop(true, true).is(":visible"), true);
	setVisible("#extra-passive-a-info-1", $("#extra-passive-a-info-2").stop(true, true).is(":visible"), true);
	setVisible("#extra-passive-b-info-1", $("#extra-passive-b-info-2").stop(true, true).is(":visible"), true);
	setVisible("#extra-passive-c-info-1", $("#extra-passive-c-info-2").stop(true, true).is(":visible"), true);
	setVisible("#extra-passive-s-info-1", $("#extra-passive-s-info-2").stop(true, true).is(":visible"), true);
	setVisible("#extra-assist-info-1", $("#extra-assist-info-2").stop(true, true).is(":visible"), true);
	setVisible("#extra-special-info-1", $("#extra-special-info-2").stop(true, true).is(":visible"), true);
	setVisible("#char-build-info-1", $("#char-build-info-2").stop(true, true).is(":visible"), true);
	
	// place attacker info in defender panel
	setVisible("#extra-char-info-2", oldAtkInfo.extraCharInfoVisible, false);
	setVisible("#extra-weapon-info-2", oldAtkInfo.extraWeaponInfoVisible, false);
	setVisible("#extra-passive-a-info-2", oldAtkInfo.extraPassiveAInfoVisible, false);
	setVisible("#extra-passive-b-info-2", oldAtkInfo.extraPassiveBInfoVisible, false);
	setVisible("#extra-passive-c-info-2", oldAtkInfo.extraPassiveCInfoVisible, false);
	setVisible("#extra-passive-s-info-2", oldAtkInfo.extraSealInfoVisible, false);
	setVisible("#extra-assist-info-2", oldAtkInfo.extraAssistInfoVisible, false);
	setVisible("#extra-special-info-2", oldAtkInfo.extraSpecialInfoVisible, false);
	setVisible("#char-build-info-2", oldAtkInfo.buildInfoVisible, false);
	
	$("#char-2").val(oldAtkInfo.name).trigger("change.select2");
	$("#color-2").val(oldAtkInfo.color);
	$("#weapon-type-2").val(oldAtkInfo.weaponType);
	$("#move-type-2").val(oldAtkInfo.moveType);
	
	$("#weapon-2").html(oldAtkInfo.weapon);
	$("#weapon-2").val(oldAtkInfo.selectedWeapon).trigger("change.select2");
	$("#weapon-2").data("info", oldAtkInfo.weaponData);
	$("#weapon-might-2").text(oldAtkInfo.weaponMight);
	$("#weapon-range-2").text(oldAtkInfo.weaponRange);
	$("#weapon-magical-2").text(oldAtkInfo.weaponMagical);
	$("#weapon-desc-2").text(oldAtkInfo.weaponDesc);
	
	$("#passive-a-2").html(oldAtkInfo.passiveA);
	$("#passive-a-2").val(oldAtkInfo.selectedPassiveA).trigger("change.select2");
	$("#passive-a-2").data("info", oldAtkInfo.passiveAData);
	$("#passive-a-desc-2").text(oldAtkInfo.passiveADesc);
	$("#passive-b-2").html(oldAtkInfo.passiveB);
	$("#passive-b-2").val(oldAtkInfo.selectedPassiveB).trigger("change.select2");
	$("#passive-b-2").data("info", oldAtkInfo.passiveBData);
	$("#passive-b-desc-2").text(oldAtkInfo.passiveBDesc);
	$("#passive-c-2").html(oldAtkInfo.passiveC);
	$("#passive-c-2").val(oldAtkInfo.selectedPassiveC).trigger("change.select2");
	$("#passive-c-2").data("info", oldAtkInfo.passiveCData);
	$("#passive-c-desc-2").text(oldAtkInfo.passiveCDesc);
	$("#assist-2").html(oldAtkInfo.assist);
	$("#assist-2").val(oldAtkInfo.selectedAssist).trigger("change.select2");
	$("#assist-2").data("info", oldAtkInfo.assistData);
	$("#assist-desc-2").text(oldAtkInfo.assistDesc);
	$("#special-2").html(oldAtkInfo.special);
	$("#special-2").val(oldAtkInfo.selectedSpecial).trigger("change.select2");
	$("#special-2").data("info", oldAtkInfo.specialData);
	$("#special-desc-2").text(oldAtkInfo.specialDesc);
	$("#spec-cooldown-2").val(oldAtkInfo.specCooldown);
	$("#spec-cooldown-max-2").text(oldAtkInfo.specCooldownMax);
	$("#passive-s-2").html(oldAtkInfo.seal);
	$("#passive-s-2").val(oldAtkInfo.selectedSeal).trigger("change.select2");
	$("#passive-s-2").data("info", oldAtkInfo.sealData);
	$("#passive-s-desc-2").text(oldAtkInfo.sealDesc);
	
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
	
	$("#rarity-2").html(oldAtkInfo.rarityHTML);
	$("#rarity-2").val(oldAtkInfo.rarity);
	$("#level-2").val(oldAtkInfo.level);
	$("#merge-2").val(oldAtkInfo.merge);
	$("#boon-2").val(oldAtkInfo.boon);
	$("#bane-2").val(oldAtkInfo.bane);
	
	setDisabled("#extra-char-info-2 select", "#extra-char-info-2", oldAtkInfo.extraCharInfoDisabled);
	enableSpecCooldown("2");
	
	setVisible("#extra-char-info-2", oldAtkInfo.extraCharInfoVisible, true);
	setVisible("#extra-weapon-info-2", oldAtkInfo.extraWeaponInfoVisible, true);
	setVisible("#extra-passive-a-info-2", oldAtkInfo.extraPassiveAInfoVisible, true);
	setVisible("#extra-passive-b-info-2", oldAtkInfo.extraPassiveBInfoVisible, true);
	setVisible("#extra-passive-c-info-2", oldAtkInfo.extraPassiveCInfoVisible, true);
	setVisible("#extra-passive-s-info-2", oldAtkInfo.extraSealInfoVisible, true);
	setVisible("#extra-assist-info-2", oldAtkInfo.extraAssistInfoVisible, true);
	setVisible("#extra-special-info-2", oldAtkInfo.extraSpecialInfoVisible, true);
	setVisible("#char-build-info-2", oldAtkInfo.buildInfoVisible, true);
	
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
	var atkWeaponIcon = $("#attacker-weapon").attr("src");
	var atkWeaponAlt = $("#attacker-weapon").attr("alt");
	var atkMoveIcon = $("#attacker-move").attr("src");
	var atkMoveAlt = $("#attacker-move").attr("alt");
	$("#attacker-portrait").attr("src", $("#defender-portrait").attr("src"));
	$("#attacker-weapon").attr("src", $("#defender-weapon").attr("src")).attr("alt", $("#defender-weapon").attr("alt"));
	$("#attacker-move").attr("src", $("#defender-move").attr("src")).attr("alt", $("#defender-move").attr("alt"));
	$("#defender-portrait").attr("src", atkPortrait);
	$("#defender-weapon").attr("src", atkWeaponIcon).attr("alt", atkWeaponAlt);
	$("#defender-move").attr("src", atkMoveIcon).attr("alt", atkMoveAlt);
}

// enables or disables a character panel
// charNum determines the panel, enable is true if we are enabling a panel
function enableCharPanel(charNum, enable) {
	"use strict";
	var textID = (charNum === "1") ? "#attack-panel .info-section, #attack-panel .info-section-bottom, #spec-cooldown-line-1, #char-build-info-1 label, #extra-char-info-1" : "#defend-panel .info-section, #defend-panel .info-section-bottom, #spec-cooldown-line-2, #char-build-info-2 label, #extra-char-info-2";
	var inputID = (charNum === "1") ? "#attack-panel select, #attack-panel input" : "#defend-panel select, #defend-panel input";
	
	if (enable) {
		$(textID).css("color", "white");
		$(inputID).removeAttr("disabled");
		enableSpecCooldown(charNum);
		enableCharBuild(charNum);
		enableExtraCharInfo(charNum);
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

// returns true if the given name contains one of the strings of the given list
function matchCharList(list, name) {
	"use strict";
	for (var i = 0; i < list.length; i++) {
		if (list[i].length > 0 && name.indexOf(list[i]) > -1) {
			return true;
		}
	}
	
	return false;
}

// checks if the matchup matches the given favorability, if any
// results are the selected results, rowResult is the result of the matchup, attacker is true if the attacker is our base character
function matchFavorability(results, rowResult, attacker) {
	"use strict";
	var contain = false;
	
	if (results.hasOwnProperty("Favorable")) {
		if (attacker) {
			contain = contain || rowResult === "Attacker Wins" || rowResult === "Draw (A)";
		} else {
			contain = contain || rowResult === "Defender Wins" || rowResult === "Draw (D)";
		}
	} 
	
	if (results.hasOwnProperty("Unfavorable")) {
		if (attacker) {
			contain = contain || rowResult === "Defender Wins" || rowResult === "Draw (D)";
		} else {
			contain = contain || rowResult === "Attacker Wins" || rowResult === "Draw (A)";
		}
	} 
	
	if (results.hasOwnProperty("Other")) {
		contain = contain || rowResult === "Draw";
	}
	
	return contain;
}

// filters the matchup table depending on the current filters
// set fadeIn to true to fade in results
function filterMatchupTable(fadeIn) {
	"use strict";
	var name = $("#matchup-filter-name").val().toLowerCase();
	var move = arrayToObject($("#matchup-filter-move").val());
	var color = arrayToObject($("#matchup-filter-color").val());
	var weapon = arrayToObject($("#matchup-filter-weapon").val());
	var range = arrayToObject($("#matchup-filter-range").val());
	var results = arrayToObject($("#matchup-filter-result").val());
	
	var winCount = 0;
	var lossCount = 0;
	var drawCount = 0;
	var favoredCount = 0;
	var unfavoredCount = 0;
	var otherCount = 0;
	var attacker = $("#one-vs-all").is(":checked");
	
	var filterCharNames = name.split(/ *[,;] */);
	
	$("#matchup-table tbody tr").each(function() {
		var rowName = this.childNodes[1].firstChild.firstChild.nodeValue;
		var rowMove = charInfo[rowName].move_type;
		var rowColor = charInfo[rowName].color;
		var rowWeapon = charInfo[rowName].weapon_type;
		var rowRange = weaponTypeRange(rowWeapon);
		var rowResult = this.childNodes[6].firstChild.firstChild.nodeValue;
		rowName = rowName.toLowerCase();
		
		if ((name === "" || matchCharList(filterCharNames, rowName)) && move.hasOwnProperty(rowMove) && color.hasOwnProperty(rowColor) && weapon.hasOwnProperty(rowWeapon) && range.hasOwnProperty(rowRange) && (results.hasOwnProperty(rowResult) || (results.hasOwnProperty("Draw") && (rowResult === "Draw (A)" || rowResult === "Draw (D)")) || matchFavorability(results, rowResult, attacker))) {
			$(this).show();
			
			// update counters
			var result = this.childNodes[6].firstChild.firstChild.nodeValue;
			if (result === "Attacker Wins") {
				if (attacker) {
					winCount += 1;
					favoredCount += 1;
				} else {
					lossCount += 1;
					unfavoredCount += 1;
				}
			} else if (result === "Defender Wins") {
				if (attacker) {
					lossCount += 1;
					unfavoredCount += 1;
				} else {
					winCount += 1;
					favoredCount += 1;
				}
			} else {
				if (attacker) {
					if (result === "Draw (A)") {
						favoredCount += 1;
					} else if (result === "Draw (D)") {
						unfavoredCount += 1;
					} else {
						otherCount += 1;
					}
				} else {
					if (result === "Draw (A)") {
						unfavoredCount += 1;
					} else if (result === "Draw (D)") {
						favoredCount += 1;
					} else {
						otherCount += 1;
					}
				}
				drawCount += 1;
			}
		} else {
			$(this).hide();
		}
	});
	
	recolorMatchupRows();
	$("#matchup-overview").html(winCount.toString() + " wins · " + lossCount.toString() + " losses · " + drawCount.toString() + " draws<br>" + favoredCount.toString() + " favorable · " + unfavoredCount.toString() + " unfavorable · " + otherCount.toString() + " other");
	
	if (fadeIn) {
		$("#matchup-table").stop(true, true).hide().fadeIn("slow");
		$("#matchup-overview").stop(true, true).hide().fadeIn("slow");
	}
}

// handles a change in displayed data
// charNum is the panel that the change originated from
function charChange(charNum) {
	"use strict";
	if (!($("#one-vs-one").is(":checked")) || (previousTable && charNum === "1") || (!previousTable && charNum === "2")) {
		keepTable = false;
	}
	
	if (charNum === "1") {
		defaultAttacker = false;
	} else {
		defaultDefender = false;
	}
}

// updates weapon on rarity change
// charNum determines the panel to look at, rarity is the rarity of the selected character
function rarityUpdateWeapon(charNum, rarity) {
	"use strict";
	var charName = $("#char-" + charNum).val();
	var selectedWeapon = "";
	
	if (charInfo[charName].hasOwnProperty("rarity_restrict") && rarity < 5) {
		var rarityRestrict = charInfo[charName].rarity_restrict["star-" + rarity.toString()];
		
		// change weapon
		if (rarityRestrict.hasOwnProperty("weapon") && $("#weapon-" + charNum).val() !== "None" && $("#weapon-" + charNum + " option:selected").index() <= charInfo[charName].weapon.length) {
			selectedWeapon = charInfo[charName].weapon[rarityRestrict.weapon];
			$("#weapon-" + charNum).val(selectedWeapon).trigger("change.select2");
			showWeapon(selectedWeapon, charNum, true);
		}
	} else if (rarity === 5) {
		if ($("#weapon-" + charNum).val() !== "None" && $("#weapon-" + charNum + " option:selected").index() <= charInfo[charName].weapon.length) {
			selectedWeapon = charInfo[charName].weapon[0];
			$("#weapon-" + charNum).val(selectedWeapon).trigger("change.select2");
			showWeapon(selectedWeapon, charNum, true);
		}
	}
}

// updates passive skill on rarity change
// charNum determines the panel to look at, rarity is the rarity of the selected character, type is the passive type
function rarityUpdatePassive(charNum, rarity, type) {
	"use strict";
	var charName = $("#char-" + charNum).val();
	var selectedPassive = "";
	
	if (charInfo[charName].hasOwnProperty("rarity_restrict") && rarity < 5) {
		var rarityRestrict = charInfo[charName].rarity_restrict["star-" + rarity.toString()];
		
		if (rarityRestrict.hasOwnProperty("passive_" + type) && charInfo[charName].hasOwnProperty("passive_" + type) && $("#passive-" + type + "-" + charNum + " option:selected").index() <= charInfo[charName]["passive_" + type].length) {
			selectedPassive = rarityRestrict["passive_" + type] < 0 ? "None" : charInfo[charName]["passive_" + type][rarityRestrict["passive_" + type]];
			$("#passive-" + type + "-" + charNum).val(selectedPassive).trigger("change.select2");
			getSkillData(charNum, type, true);
		}
		
	} else if (rarity === 5) {
		if (charInfo[charName].hasOwnProperty("passive_" + type) && $("#passive-" + type + "-" + charNum + " option:selected").index() <= charInfo[charName]["passive_" + type].length) {
			selectedPassive = charInfo[charName]["passive_" + type][0];
			$("#passive-" + type + "-" + charNum).val(selectedPassive).trigger("change.select2");
			getSkillData(charNum, type, true);
		}
	}
}

// updates special on rarity change
// charNum determines the panel to look at, rarity is the rarity of the selected character
function rarityUpdateSpecial(charNum, rarity) {
	"use strict";
	var charName = $("#char-" + charNum).val();
	var selectedSpecial = "";
	
	if (charInfo[charName].hasOwnProperty("rarity_restrict") && rarity < 5) {
		var rarityRestrict = charInfo[charName].rarity_restrict["star-" + rarity.toString()];
		
		if (rarityRestrict.hasOwnProperty("special") && $("#special-" + charNum + " option:selected").index() <= charInfo[charName].special.length) {
			selectedSpecial = rarityRestrict.special < 0 ? "None" : charInfo[charName].special[rarityRestrict.special];
			$("#special-" + charNum).val(selectedSpecial).trigger("change.select2");
			showSpecCooldown(selectedSpecial, charNum, false);
			getSpecialData(charNum);
		}
	} else if (rarity === 5) {
		if (charInfo[charName].hasOwnProperty("special") && $("#special-" + charNum + " option:selected").index() <= charInfo[charName].special.length) {
			selectedSpecial = charInfo[charName].special[0];
			$("#special-" + charNum).val(selectedSpecial).trigger("change.select2");
			showSpecCooldown(selectedSpecial, charNum, false);
			getSpecialData(charNum);
		}
	}
}

// updates assist on rarity change
// charNum determines the panel to look at, rarity is the rarity of the selected character
function rarityUpdateAssist(charNum, rarity) {
	"use strict";
	var charName = $("#char-" + charNum).val();
	var selectedAssist = "";
	
	if (charInfo[charName].hasOwnProperty("rarity_restrict") && rarity < 5) {
		var rarityRestrict = charInfo[charName].rarity_restrict["star-" + rarity.toString()];
		
		if (rarityRestrict.hasOwnProperty("assist") && $("#assist-" + charNum + " option:selected").index() <= charInfo[charName].assist.length) {
			selectedAssist = rarityRestrict.assist < 0 ? "None" : charInfo[charName].assist[rarityRestrict.assist];
			$("#assist-" + charNum).val(selectedAssist).trigger("change.select2");
			getAssistData(charNum);
			updateSpecCooldown(charNum);
		}
	} else if (rarity === 5) {
		if (charInfo[charName].hasOwnProperty("assist") && $("#assist-" + charNum + " option:selected").index() <= charInfo[charName].assist.length) {
			selectedAssist = charInfo[charName].assist[0];
			$("#assist-" + charNum).val(selectedAssist).trigger("change.select2");
			getAssistData(charNum);
			updateSpecCooldown(charNum);
		}
	}
}

// updates weapons and skills on rarity change
// charNum determines the panel to look at, rarity is the rarity of the selected character
function rarityUpdate(charNum, rarity) {
	"use strict";
	rarityUpdateSpecial(charNum, rarity);
	rarityUpdatePassive(charNum, rarity, "a");
	rarityUpdatePassive(charNum, rarity, "b");
	rarityUpdatePassive(charNum, rarity, "c");
	rarityUpdateAssist(charNum, rarity);
	rarityUpdateWeapon(charNum, rarity);
}

// applies overrides to the character in the given panel
function applyOverrides(charNum) {
	"use strict";
	
	var charName = $("#char-" + charNum).val();
	
	// get build info
	var rarity = 5;
	var level = parseInt($("#override-level").val());
	var merge = parseInt($("#override-merge").val());
	var boon = $("#override-boon").val();
	var bane = $("#override-bane").val();
	
	// display build info
	$("#level-" + charNum).val(level);
	$("#merge-" + charNum).val(merge);
	$("#boon-" + charNum).val(boon);
	$("#bane-" + charNum).val(bane);
	
	// override rarity
	var overrideRarity = parseInt($("#override-rarity").val());
	if (overrideRarity < 5 && charInfo[charName].hasOwnProperty("base_stat")) {
		if (charInfo[charName].base_stat.hasOwnProperty("star-" + overrideRarity.toString())) {
			rarity = overrideRarity;
		} else {
			for (var rarityIndex = 4; rarityIndex >= overrideRarity; rarityIndex--) {
				if (!charInfo[charName].base_stat.hasOwnProperty("star-" + rarityIndex.toString())) {
					break;
				}
				rarity = rarityIndex;
			}
		}
		
		// update data
		$("#rarity-" + charNum).val(rarity);
		rarityUpdate(charNum, rarity);
	}
	
	// override weapon
	if ($("#override-weapon").val() !== "No Override") {
		if ($("#override-weapon").val() === "None") {
			$("#weapon-" + charNum).val("None").trigger("change.select2");
			showWeapon("None", charNum, true);
		} else if (charInfo[charName].weapon_type === weaponInfo[$("#override-weapon").val()].type) {
			$("#weapon-" + charNum).val($("#override-weapon").val()).trigger("change.select2");
			showWeapon($("#override-weapon").val(), charNum, true);
		}
	}
	
	// override passives
	if ($("#override-passive-a").val() !== "No Override") {
		if ($("#override-passive-a").val() === "None") {
			$("#passive-a-" + charNum).val("None").trigger("change.select2");
			getSkillData(charNum, "a", true);
		} else if (isInheritable(skillInfo.a[$("#override-passive-a").val()], charName)) {
			$("#passive-a-" + charNum).val($("#override-passive-a").val()).trigger("change.select2");
			getSkillData(charNum, "a", true);
		}
	}
	if ($("#override-passive-b").val() !== "No Override") {
		if ($("#override-passive-b").val() === "None") {
			$("#passive-b-" + charNum).val("None").trigger("change.select2");
			getSkillData(charNum, "b", true);
		} else if (isInheritable(skillInfo.b[$("#override-passive-b").val()], charName)) {
			$("#passive-b-" + charNum).val($("#override-passive-b").val()).trigger("change.select2");
			getSkillData(charNum, "b", true);
		}
	}
	if ($("#override-passive-c").val() !== "No Override") {
		if ($("#override-passive-c").val() === "None") {
			$("#passive-c-" + charNum).val("None").trigger("change.select2");
			getSkillData(charNum, "c", true);
		} else if (isInheritable(skillInfo.c[$("#override-passive-c").val()], charName)) {
			$("#passive-c-" + charNum).val($("#override-passive-c").val()).trigger("change.select2");
			getSkillData(charNum, "c", true);
		}
	}
	
	// override seal
	if ($("#override-passive-s").val() !== "No Override") {
		$("#passive-s-" + charNum).val($("#override-passive-s").val()).trigger("change.select2");
		getSkillData(charNum, "s", true);
	}
	
	// override assist
	if ($("#override-assist").val() !== "No Override") {
		if ($("#override-assist").val() === "None") {
			$("#assist-" + charNum).val("None").trigger("change.select2");
			getAssistData(charNum);
			updateSpecCooldown(charNum);
		} else if (isInheritable(assistInfo[$("#override-assist").val()], charName)) {
			$("#assist-" + charNum).val($("#override-assist").val()).trigger("change.select2");
			getAssistData(charNum);
			updateSpecCooldown(charNum);
		}
	}
	
	// override special
	if ($("#override-special").val() !== "No Override") {
		if ($("#override-special").val() === "None") {
			$("#special-" + charNum).val("None").trigger("change.select2");
			getSpecialData(charNum);
			showSpecCooldown("None", charNum, false);
			updateSpecCooldown(charNum);
		} else if (isInheritable(specInfo[$("#override-special").val()], charName)) {
			$("#special-" + charNum).val($("#override-special").val()).trigger("change.select2");
			getSpecialData(charNum);
			showSpecCooldown($("#override-special").val(), charNum, false);
			updateSpecCooldown(charNum);
		}
	}
	
	// override special cooldown
	if ($("#override-spec-cooldown").val() !== "max") {
		$("#spec-cooldown-" + charNum).val(Math.min($("#spec-cooldown-" + charNum).val(), parseInt($("#override-spec-cooldown").val())));
	}
	
	// show stats
	if (charInfo[charName].hasOwnProperty("base_stat")) {
		displayStatTotals(charNum);
	}
	
	// override bonuses, penalties and spurs
	$("#atk-bonus-" + charNum).val($("#override-atk-bonus").val());
	$("#spd-bonus-" + charNum).val($("#override-spd-bonus").val());
	$("#def-bonus-" + charNum).val($("#override-def-bonus").val());
	$("#res-bonus-" + charNum).val($("#override-res-bonus").val());
	$("#atk-penalty-" + charNum).val($("#override-atk-penalty").val());
	$("#spd-penalty-" + charNum).val($("#override-spd-penalty").val());
	$("#def-penalty-" + charNum).val($("#override-def-penalty").val());
	$("#res-penalty-" + charNum).val($("#override-res-penalty").val());
	$("#atk-spur-" + charNum).val($("#override-atk-spur").val());
	$("#spd-spur-" + charNum).val($("#override-spd-spur").val());
	$("#def-spur-" + charNum).val($("#override-def-spur").val());
	$("#res-spur-" + charNum).val($("#override-res-spur").val());
	
	// override current hp
	if (parseInt($("#override-curr-hp").val()) < 100) {
		var overrideHP = roundNum(parseInt($("#hp-" + charNum).val()) * (parseInt($("#override-curr-hp").val()) / 100), false);
		overrideHP = Math.min(overrideHP, $("#hp-" + charNum).val());
		overrideHP = Math.max(overrideHP, 1);
		$("#curr-hp-" + charNum).val(overrideHP);
	}
}

// calculates and prints info of every battle matchup for one character
// attacker is true if we are using the attacker panel as our base character
function calculateMatchups(attacker) {
	"use strict";
	var battleInfo = {};
	var tableHTML = "";
	var charCount = 0;
	var foeClass = attacker ? "defender" : "attacker";
	keepTable = true;
	
	// add table headers
	if (attacker) {
		tableHTML += "<thead><tr class='matchup-header'><th data-tsorter='img' data-column='0'></th><th data-tsorter='link' data-column='1'>Defender</th>";
	} else {
		tableHTML += "<thead><tr class='matchup-header'><th data-tsorter='img' data-column='0'></th><th data-tsorter='link' data-column='1'>Attacker</th>";
	}
	
	tableHTML += "<th data-tsorter='numeric' data-column='2'>Attacker DMG</th><th data-tsorter='numeric' data-column='3'>Defender DMG</th><th data-tsorter='text-span-num' data-column='4'>Attacker HP</th><th data-tsorter='text-span-num' data-column='5'>Defender HP</th><th data-tsorter='link' data-column='6'>Result</th></tr></thead>";
	
	// start tbody
	tableHTML += "<tbody>";
	
	// add table rows
	for (var key in charInfo) {
		if (key !== "Custom" && charInfo[key].hasOwnProperty("base_stat")) {
			// sim battle
			battleInfo = simBattle(getBattleInfoWithDefault(attacker, key), false);
			
			// add to table
			tableHTML += (charCount % 2 === 1) ? "<tr class='matchup-row-offset'>" : "<tr>";
			tableHTML += "<td><img class='matchup-portrait' src=\"img/Portraits/" + key + ".png\"></div></td>";
			tableHTML += "<td><span class='matchup-char " + foeClass + "'>" + key + "</span></td>";
			tableHTML += "<td class='attacker'>" + battleInfo.attacker.damageDealt.toString() + "</td>";
			tableHTML += "<td class='defender'>" + battleInfo.defender.damageDealt.toString() + "</td>";
			tableHTML += "<td class='attacker'>" + battleInfo.attacker.startHP.toString() + " → <span>" + battleInfo.attacker.currHP.toString() + "</span></td>";
			tableHTML += "<td class='defender'>" + battleInfo.defender.startHP.toString() + " → <span>" + battleInfo.defender.currHP.toString() + "</span></td>";
			
			if (battleInfo.attacker.currHP <= 0) { // defender wins
				tableHTML += "<td class='defender'><strong>Defender Wins</strong></td>";
			} else if (battleInfo.defender.currHP <= 0) { // attacker wins
				tableHTML += "<td class='attacker'><strong>Attacker Wins</strong></td>";
			} else { // draw
				var strongAtkHit = battleInfo.defender.startHP - battleInfo.defender.currHP >= roundNum(battleInfo.defender.startHP * 0.5, true);
				var strongDefHit = battleInfo.attacker.startHP - battleInfo.attacker.currHP >= roundNum(battleInfo.attacker.startHP * 0.5, true);
				var decentAtkHit = battleInfo.defender.startHP - battleInfo.defender.currHP >= roundNum(battleInfo.defender.startHP * 0.35, true);
				var decentDefHit = battleInfo.attacker.startHP - battleInfo.attacker.currHP >= roundNum(battleInfo.attacker.startHP * 0.35, true);
				var weakAtkHit = battleInfo.defender.startHP - battleInfo.defender.currHP <= roundNum(battleInfo.defender.startHP * 0.35, false);
				var weakDefHit = battleInfo.attacker.startHP - battleInfo.attacker.currHP <= roundNum(battleInfo.attacker.startHP * 0.35, false);
				var atkOverDef = battleInfo.defender.startHP - battleInfo.defender.currHP >= roundNum((battleInfo.attacker.startHP - battleInfo.attacker.currHP) * 1.6, true);
				var defOverAtk = battleInfo.attacker.startHP - battleInfo.attacker.currHP >= roundNum((battleInfo.defender.startHP - battleInfo.defender.currHP) * 1.6, true);
				var defWithNC = battleInfo.defender.startHP - battleInfo.defender.currHP <= roundNum(battleInfo.defender.startHP * 0.2, false);
				var defCC = defCanCounter(battleInfo);
				
				if (attacker) {
					if ((strongAtkHit && weakDefHit) || (defCC && decentAtkHit && atkOverDef)) {
						tableHTML += "<td class='attacker'><strong>Draw (A)</strong></td>";
					} else if ((!defCC && defWithNC) || (weakAtkHit && strongDefHit)  || (decentDefHit && defOverAtk)) {
						tableHTML += "<td class='defender'><strong>Draw (D)</strong></td>";
					} else {
						tableHTML += "<td><strong>Draw</strong></td>";
					}
				} else {
					if ((!defCC && defWithNC) || (weakAtkHit && strongDefHit) || (decentDefHit && defOverAtk)) {
						tableHTML += "<td class='defender'><strong>Draw (D)</strong></td>";
					} else if ((strongAtkHit && weakDefHit) || (defCC && decentAtkHit && atkOverDef)) {
						tableHTML += "<td class='attacker'><strong>Draw (A)</strong></td>";
					} else {
						tableHTML += "<td><strong>Draw</strong></td>";
					}
				}
			}
			
			tableHTML += "</tr>";
			
			// increment counter
			charCount += 1;
		}
	}
	
	// end tbody
	tableHTML += "</tbody>";
	
	// create table
	$("#matchup-title, #matchup-overview, #matchup-table-container").stop(true, true).hide();
	$("#matchup-table").html(tableHTML);
	
	// make table sortable
	tsorter.create("matchup-table");
	
	if (mTableSorted >= 0) {
		$("#matchup-table thead th:eq(" + mTableSorted.toString() + ")").trigger("click");
		
		// sort again for ascending order
		if (!mSortDesc) {
			$("#matchup-table thead th:eq(" + mTableSorted.toString() + ")").trigger("click");
		}
	}
	
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
	$("#matchup-title, #matchup-overview, #matchup-table-container").fadeIn("slow");
	
	// recolor rows
	recolorMatchupRows();
	
	// setup events to view one vs one info
	$(".matchup-char").on("click", function() {
		var changeAttacker = ($("#one-vs-all").is(":checked")) ? false : true;
		var charName = $(this).text();
		
		// select empty tab if possible
		selectEmptyCharTab(changeAttacker);
		
		// check one vs one radio button
		$("input[type=radio][name=mode]").val(["one-vs-one"]);
		
		// show one vs one info
		$("#battle-result").stop(true, true).show(700);
		$("#battle-log").stop(true, true).show(700);
		$("#matchups").stop(true, true).hide(700);

		// enable all inputs
		enableCharPanel("1", true);
		enableCharPanel("2", true);
		
		// input data
		$("#char-" + (changeAttacker ? "1" : "2")).val(charName).trigger("change.select2");
		displayChar(charName, (changeAttacker ? "1" : "2"));
		applyOverrides(changeAttacker ? "1" : "2");
		simBattle(getBattleInfo(), true);
		keepTable = true;
	});
	
	// keep track of sorted column
	$("#matchup-table thead th").on("click", function() {
		var columnNum = parseInt($(this).data("column"));
		if (mTableSorted === columnNum) {
			mSortDesc = !mSortDesc;
		} else {
			mTableSorted = columnNum;
			mSortDesc = true;
		}
	});
	
	// recolor rows when sorting
	$("#matchup-table th").on("click", function() {
		recolorMatchupRows();
	});
}

// updates infomation depending on the mode selected
function updateDisplay() {
	"use strict";
	var scrollTop = $(window).scrollTop();
	if ($("#one-vs-one").is(":checked")) {
		simBattle(getBattleInfo(), true);
	} else if ($("#one-vs-all").is(":checked") && (!keepTable || !previousTable)) {
		calculateMatchups(true);
	} else if ($("#all-vs-one").is(":checked") && (!keepTable || previousTable)) {
		calculateMatchups(false);
	}
	$(window).scrollTop(scrollTop);
}

// sets up matchup overrides section
function setupOverrides() {
	"use strict";
	
	// load in options
	loadWeapons("Any", "#override-weapon", true);
	loadPassives("a", "#override-passive-a", false);
	loadPassives("b", "#override-passive-b", false);
	loadPassives("c", "#override-passive-c", false);
	loadPassives("s", "#override-passive-s", false);
	loadAssists("#override-assist", false);
	loadSpecials("#override-special");
	
	// add No override option
	$("#override-weapon").html("<option value='No Override'>No Override</option>" + $("#override-weapon").html());
	$("#override-passive-a").html("<option value='No Override'>No Override</option>" + $("#override-passive-a").html());
	$("#override-passive-b").html("<option value='No Override'>No Override</option>" + $("#override-passive-b").html());
	$("#override-passive-c").html("<option value='No Override'>No Override</option>" + $("#override-passive-c").html());
	$("#override-passive-s").html("<option value='No Override'>No Override</option>" + $("#override-passive-s").html());
	$("#override-assist").html("<option value='No Override'>No Override</option>" + $("#override-assist").html());
	$("#override-special").html("<option value='No Override'>No Override</option>" + $("#override-special").html());
}

// checks if the given unit is a custom unit
function isCustomName(name) {
	"use strict";
	var nameList = {"Sword Fighter": true, "Axe Fighter": true, "Lance Fighter": true,
				    "Red Mage": true, "Green Mage": true, "Blue Mage": true,
				    "Red Dragon": true, "Green Dragon": true, "Blue Dragon": true,
				    "Bow Fighter": true, "Thief": true, "Cleric": true,
				    "Sword Cavalier": true, "Axe Cavalier": true, "Lance Cavalier": true,
				    "Red Cavalier": true, "Green Cavalier": true, "Blue Cavalier": true,
				    "Red Dragon Cavalier": true, "Green Dragon Cavalier": true, "Blue Dragon Cavalier": true,
				    "Bow Cavalier": true, "Dagger Cavalier": true, "Troubadour": true,
				    "Sword Flier": true, "Axe Flier": true, "Lance Flier": true,
				    "Red Flier": true, "Green Flier": true, "Blue Flier": true,
				    "Red Dragon Flier": true, "Green Dragon Flier": true, "Blue Dragon Flier": true,
				    "Bow Flier": true, "Dagger Flier": true, "Staff Flier": true,
				    "Sword Knight": true, "Axe Knight": true, "Lance Knight": true,
				    "Red Knight": true, "Green Knight": true, "Blue Knight": true,
				    "Red Dragon Knight": true, "Green Dragon Knight": true, "Blue Dragon Knight": true,
				    "Bow Knight": true, "Dagger Knight": true, "Staff Knight": true};
	
	return nameList.hasOwnProperty(name);
}

// returns color, weapon type and move type given a valid custom unit name
function getCustomNameInfo(name) {
	"use strict";
	var nameMap = {
		"Sword Fighter": {color: "Red", weaponType: "Sword", moveType: "Infantry"},
		"Axe Fighter": {color: "Green", weaponType: "Axe", moveType: "Infantry"},
		"Lance Fighter": {color: "Blue", weaponType: "Lance", moveType: "Infantry"},
		"Red Mage": {color: "Red", weaponType: "Red Tome", moveType: "Infantry"},
		"Green Mage": {color: "Green", weaponType: "Green Tome", moveType: "Infantry"},
		"Blue Mage": {color: "Blue", weaponType: "Blue Tome", moveType: "Infantry"},
		"Red Dragon": {color: "Red", weaponType: "Red Breath", moveType: "Infantry"},
		"Green Dragon": {color: "Green", weaponType: "Green Breath", moveType: "Infantry"},
		"Blue Dragon": {color: "Blue", weaponType: "Blue Breath", moveType: "Infantry"},
		"Bow Fighter": {color: "Colorless", weaponType: "Bow", moveType: "Infantry"},
		"Thief": {color: "Colorless", weaponType: "Dagger", moveType: "Infantry"},
		"Cleric": {color: "Colorless", weaponType: "Staff", moveType: "Infantry"},
		"Sword Cavalier": {color: "Red", weaponType: "Sword", moveType: "Cavalry"},
		"Axe Cavalier": {color: "Green", weaponType: "Axe", moveType: "Cavalry"},
		"Lance Cavalier": {color: "Blue", weaponType: "Lance", moveType: "Cavalry"},
		"Red Cavalier": {color: "Red", weaponType: "Red Tome", moveType: "Cavalry"},
		"Green Cavalier": {color: "Green", weaponType: "Green Tome", moveType: "Cavalry"},
		"Blue Cavalier": {color: "Blue", weaponType: "Blue Tome", moveType: "Cavalry"},
		"Red Dragon Cavalier": {color: "Red", weaponType: "Red Breath", moveType: "Cavalry"},
		"Green Dragon Cavalier": {color: "Green", weaponType: "Green Breath", moveType: "Cavalry"},
		"Blue Dragon Cavalier": {color: "Blue", weaponType: "Blue Breath", moveType: "Cavalry"},
		"Bow Cavalier": {color: "Colorless", weaponType: "Bow", moveType: "Cavalry"},
		"Dagger Cavalier": {color: "Colorless", weaponType: "Dagger", moveType: "Cavalry"},
		"Troubadour": {color: "Colorless", weaponType: "Staff", moveType: "Cavalry"},
		"Sword Flier": {color: "Red", weaponType: "Sword", moveType: "Flying"},
		"Axe Flier": {color: "Green", weaponType: "Axe", moveType: "Flying"},
		"Lance Flier": {color: "Blue", weaponType: "Lance", moveType: "Flying"},
		"Red Flier": {color: "Red", weaponType: "Red Tome", moveType: "Flying"},
		"Green Flier": {color: "Green", weaponType: "Green Tome", moveType: "Flying"},
		"Blue Flier": {color: "Blue", weaponType: "Blue Tome", moveType: "Flying"},
		"Red Dragon Flier": {color: "Red", weaponType: "Red Breath", moveType: "Flying"},
		"Green Dragon Flier": {color: "Green", weaponType: "Green Breath", moveType: "Flying"},
		"Blue Dragon Flier": {color: "Blue", weaponType: "Blue Breath", moveType: "Flying"},
		"Bow Flier": {color: "Colorless", weaponType: "Bow", moveType: "Flying"},
		"Dagger Flier": {color: "Colorless", weaponType: "Dagger", moveType: "Flying"},
		"Staff Flier": {color: "Colorless", weaponType: "Staff", moveType: "Flying"},
		"Sword Knight": {color: "Red", weaponType: "Sword", moveType: "Armored"},
		"Axe Knight": {color: "Green", weaponType: "Axe", moveType: "Armored"},
		"Lance Knight": {color: "Blue", weaponType: "Lance", moveType: "Armored"},
		"Red Knight": {color: "Red", weaponType: "Red Tome", moveType: "Armored"},
		"Green Knight": {color: "Green", weaponType: "Green Tome", moveType: "Armored"},
		"Blue Knight": {color: "Blue", weaponType: "Blue Tome", moveType: "Armored"},
		"Red Dragon Knight": {color: "Red", weaponType: "Red Breath", moveType: "Armored"},
		"Green Dragon Knight": {color: "Green", weaponType: "Green Breath", moveType: "Armored"},
		"Blue Dragon Knight": {color: "Blue", weaponType: "Blue Breath", moveType: "Armored"},
		"Bow Knight": {color: "Colorless", weaponType: "Bow", moveType: "Armored"},
		"Dagger Knight": {color: "Colorless", weaponType: "Dagger", moveType: "Armored"},
		"Staff Knight": {color: "Colorless", weaponType: "Staff", moveType: "Armored"}
	};
	
	return nameMap[name];
}

// determines if the given string is a valid rarity
function isValidRarity(str) {
	"use strict";
	var substr = str.split(" ");
	return (substr.length === 2 && $.isNumeric(parseInt(substr[0])) && substr[1] === "Star(s)" && parseInt(substr[0]) >= 1 && parseInt(substr[0]) <= 5);
}

// determines if the given string is a valid level
function isValidLevel(str) {
	"use strict";
	var substr = str.split(" ");
	
	if (substr.length === 2) {
		var lvlSubstr = substr[1].split("+");
		return (substr[0] === "Lvl." && lvlSubstr.length === 2 && $.isNumeric(parseInt(lvlSubstr[0])) && $.isNumeric(parseInt(lvlSubstr[1])));
	}
	
	return false;
}

// given a number, represented as a string, return a valid level
function getValidLvl(str) {
	"use strict";
	if (parseInt(str) < 1) {
		return "1";
	} else if (str !== "1" && str !== "40") {
		return "40";
	}
	
	return str;
}

// given a number, represented as a string, return a valid merge level
function getValidMerge(str) {
	"use strict";
	if (parseInt(str) < 0) {
		return "0";
	} else if (parseInt(str) > 10) {
		return "10";
	}
	
	return parseInt(str).toString();
}

// imports team into a panel
// attacker is true if we import into the attacker panel
function importTeam(attacker) {
	"use strict";
	var importText = $("#import-area").val().split("\n");
	var importedChars = [];
	var error = false;
	
	for(var textLine = 0; textLine < importText.length; textLine++) {
		if (importText[textLine].length === 0) { // empty line
			continue;
		}
		
		var charCount = importedChars.length;   // index of next character
		var statsIncluded = false;              // true if stats are imported
		var customUnit = false;                 // true if unit is custom
		
		// get character name
		var line = importText[textLine].split(/ +\[/);
		
		if (line.length < 2) { // missing nature
			if (isCustomName(line[0])) { // check for custom unit
				var customCharInfo = getCustomNameInfo(line[0]);
				importedChars[charCount] = {};
				importedChars[charCount].character = "Custom";
				importedChars[charCount].color = customCharInfo.color;
				importedChars[charCount].weaponType = customCharInfo.weaponType;
				importedChars[charCount].moveType = customCharInfo.moveType;
				customUnit = true;
			} else { // error
				$("#import-error-msg").text("Import error: Missing nature (line " + (textLine + 1).toString() + ")").show();
				error = true;
				break;
			}
		} else if (charInfo.hasOwnProperty(line[0])) { // check for valid character name
			importedChars[charCount] = {};
			importedChars[charCount].character = line[0];
			importedChars[charCount].color = charInfo[line[0]].color;
			importedChars[charCount].weaponType = charInfo[line[0]].weapon_type;
			importedChars[charCount].moveType = charInfo[line[0]].move_type;
		} else { // invalid name
			$("#import-error-msg").text("Import error: Invalid name (line " + (textLine + 1).toString() + ")").show();
			error = true;
			break;
		}
		
		// set default values
		importedChars[charCount].level = "40";
		importedChars[charCount].merge = "0";
		importedChars[charCount].rarity = "5";
		importedChars[charCount].rarityHTML = "<option value='5'>5 Stars</option>";
		
		importedChars[charCount].weapon = "None";
		importedChars[charCount].passiveA = "None";
		importedChars[charCount].passiveB = "None";
		importedChars[charCount].passiveC = "None";
		importedChars[charCount].assist = "None";
		importedChars[charCount].special = "None";
		importedChars[charCount].specCooldown = "0";
		importedChars[charCount].seal = "None";
		
		importedChars[charCount].hp = "1";
		importedChars[charCount].currentHP = "1";
		
		importedChars[charCount].atk = "1";
		importedChars[charCount].atkBonus = "0";
		importedChars[charCount].atkPenalty = "0";
		importedChars[charCount].atkSpur = "0";

		importedChars[charCount].spd = "1";
		importedChars[charCount].spdBonus = "0";
		importedChars[charCount].spdPenalty = "0";
		importedChars[charCount].spdSpur = "0";

		importedChars[charCount].def = "1";
		importedChars[charCount].defBonus = "0";
		importedChars[charCount].defPenalty = "0";
		importedChars[charCount].defSpur = "0";

		importedChars[charCount].def = "1";
		importedChars[charCount].defBonus = "0";
		importedChars[charCount].defPenalty = "0";
		importedChars[charCount].defSpur = "0";

		importedChars[charCount].res = "1";
		importedChars[charCount].resBonus = "0";
		importedChars[charCount].resPenalty = "0";
		importedChars[charCount].resSpur = "0";
		
		// get other general info
		if (!customUnit) {
			// get nature
			line = line[1].split("]");

			if (line[0].toLowerCase() === "neutral") { // neutral nature
				importedChars[charCount].boon = "neutral";
				importedChars[charCount].bane = "neutral";
			} else { // check for bane and boon
				var statAbbr = {"hp": true, "atk": true, "spd": true, "def": true, "res": true, neutral: true};
				var nature = line[0].split("/");

				if (nature.length < 2 || (!statAbbr.hasOwnProperty(nature[0].toLowerCase()) && !statAbbr.hasOwnProperty(nature[0].toLowerCase().substr(1))) || (!statAbbr.hasOwnProperty(nature[1].toLowerCase()) && !statAbbr.hasOwnProperty(nature[1].toLowerCase().substr(1)))) {
					$("#import-error-msg").text("Import error: Invalid nature (line " + (textLine + 1).toString() + ")").show();
					error = true;
					break;
				} else {
					importedChars[charCount].boon = statAbbr.hasOwnProperty(nature[0].toLowerCase()) ? nature[0].toLowerCase() : nature[0].toLowerCase().substr(1);
					importedChars[charCount].bane = statAbbr.hasOwnProperty(nature[1].toLowerCase()) ? nature[1].toLowerCase() : nature[1].toLowerCase().substr(1);
					
					if (importedChars[charCount].boon === importedChars[charCount].bane && importedChars[charCount].boon !== "neutral") {
						$("#import-error-msg").text("Import error: Invalid nature (line " + (textLine + 1).toString() + ")").show();
						error = true;
						break;
					}
				}
			}
			
			// get rarity options
			if (charInfo[importedChars[charCount].character].hasOwnProperty("base_stat")) {
				for (var rarities = 4; rarities >= 1; rarities--) {
					if (!charInfo[importedChars[charCount].character].base_stat.hasOwnProperty("star-" + rarities.toString())) {
						break;
					}
					importedChars[charCount].rarityHTML += rarities !== 1 ? "<option value='" + rarities.toString() + "'>" + rarities.toString() + " Stars</option>" : "<option value='1'>1 Star</option>";
				}
			}
			
			// get rarity and level
			if (line.length > 1) {
				line = line[1].split(/ +-- +/);
				
				if (line.length === 3) { // get rarity and level
					if (isValidRarity(line[1])) {
						var rarityStr = line[1].split(" ");
						importedChars[charCount].rarity = rarityStr[0];
					} else {
						$("#import-error-msg").text("Import error: Invalid rarity (line " + (textLine + 1).toString() + ")").show();
						error = true;
						break;
					}
					
					if (isValidLevel(line[2])) {
						var levelStr = line[2].split(" ");
						var levelParts = levelStr[1].split("+");
						importedChars[charCount].level = getValidLvl(levelParts[0]);
						importedChars[charCount].merge = getValidMerge(levelParts[1]);
					} else {
						$("#import-error-msg").text("Import error: Invalid level (line " + (textLine + 1).toString() + ")").show();
						error = true;
						break;
					}
				} else if (line.length === 2) { // get rarity or level
					if (isValidRarity(line[1])) {
						var rarStr = line[1].split(" ");
						importedChars[charCount].rarity = rarStr[0];
					} else if (isValidLevel(line[1])) {
						var lvlStr = line[1].split(" ");
						var lvlParts = lvlStr[1].split("+");
						importedChars[charCount].level = getValidLvl(lvlParts[0]);
						importedChars[charCount].merge = getValidMerge(lvlParts[1]);
					} else {
						$("#import-error-msg").text("Import error: Invalid rarity or level (line " + (textLine + 1).toString() + ")").show();
						error = true;
						break;
					}
				}
			}
			
		} else {
			importedChars[charCount].boon = "neutral";
			importedChars[charCount].bane = "neutral";
		}
		
		// check stat line
		textLine += 1;
		
		if (textLine >= importText.length) { // no more lines to read
			if (customUnit) { // error - missing stats for custom unit
				$("#import-error-msg").text("Import error: Missing stats for custom unit (line " + (textLine + 1).toString() + ")").show();
				error = true;
			} else if (!charInfo[importedChars[charCount].character].hasOwnProperty("base_stat")) { // data mined character
				$("#import-error-msg").text("Import error: Missing stats for data-mined unit (line " + (textLine + 1).toString() + ")").show();
				error = true;
			} else { // get base stats for character
				var defaultStats = getStatTotals(importedChars[charCount].character, importedChars[charCount].weapon, importedChars[charCount].passiveA, importedChars[charCount].seal, parseInt(importedChars[charCount].rarity), parseInt(importedChars[charCount].level), parseInt(importedChars[charCount].merge), importedChars[charCount].boon, importedChars[charCount].bane);
				
				importedChars[charCount].hp = defaultStats.hp;
				importedChars[charCount].currentHP = defaultStats.hp;
				importedChars[charCount].atk = defaultStats.atk;
				importedChars[charCount].spd = defaultStats.spd;
				importedChars[charCount].def = defaultStats.def;
				importedChars[charCount].res = defaultStats.res;
			}
			console.log(importedChars[charCount]);
			break;
		} else {
			line = importText[textLine].split(/ *\/ */);
			
			if (line.length === 5) {
				statsIncluded = true;
				
				var statNames = ["hp", "atk", "spd", "def", "res"];
				for (var statIndex = 0; statIndex < 5; statIndex++) {
					var singleStat = line[statIndex].split(/ +/);
					if (((singleStat.length === 2 && singleStat[1].toLowerCase() === statNames[statIndex]) || singleStat.length === 1) && $.isNumeric(parseInt(singleStat[0]))) {
						var statVal = parseInt(singleStat[0]);
						statVal = (statIndex === 0) ? ((statVal < 1) ? 1 : ((statVal > 99) ? 99 : statVal)) : ((statVal < 0) ? 0 : ((statVal > 99) ? 99 : statVal));
						importedChars[charCount][statNames[statIndex]] = statVal.toString();
						
						if (statIndex === 0) {
							importedChars[charCount].currentHP = statVal.toString();
						}
					} else {
						$("#import-error-msg").text("Import error: Invalid stats (line " + (textLine + 1).toString() + ")").show();
						error = true;
						break;
					}
				}
				
				if (error) {
					break;
				}
			} else if (customUnit) {
				$("#import-error-msg").text("Import error: Missing stats on custom unit (line " + (textLine + 1).toString() + ")").show();
				error = true;
				break;
			} else if (!charInfo[importedChars[charCount].character].hasOwnProperty("base_stat")) {
				$("#import-error-msg").text("Import error: Missing stats on data-mined unit (line " + (textLine + 1).toString() + ")").show();
				error = true;
				break;
			}
		}
		
		// get equipped weapon and skills
		textLine += statsIncluded ? 1 : 0;
		var equips = {"weapon": false, "assist": false, "special": false, "passive a": false, "passive b": false, "passive c": false, "sacred seal": false};
		
		while (true) {
			if (textLine >= importText.length) {
				break;
			} else {
				line = importText[textLine].split(/: +/);
				var equipItem = line[0].toLowerCase();
				
				if (line.length === 2 && equips.hasOwnProperty(equipItem) && !equips[equipItem]) {
					equips[equipItem] = true;
					
					if (equipItem === "weapon") { // weapon
						var weaponWithColor = line[1] + " (" + importedChars[charCount].color + ")";
						var weaponName = weaponInfo.hasOwnProperty(weaponWithColor) ? weaponWithColor : line[1];
						if (weaponInfo.hasOwnProperty(weaponName) && ((importedChars[charCount].character === "Custom" && weaponInfo[weaponName].type === importedChars[charCount].weaponType) || (importedChars[charCount].character !== "Custom" && (charInfo[importedChars[charCount].character].weapon[0] === weaponName || isInheritableWeapon(weaponInfo[weaponName], importedChars[charCount].character))))) {
							importedChars[charCount].weapon = weaponName;
						} else {
							$("#import-error-msg").text("Import error: Invalid weapon (line " + (textLine + 1).toString() + ")").show();
							error = true;
							break;
						}
					} else if (equipItem === "assist") { // assist
						if (assistInfo.hasOwnProperty(line[1]) && ((importedChars[charCount].character === "Custom") || (isInheritable(assistInfo[line[1]], importedChars[charCount].character) || (charInfo[importedChars[charCount].character].hasOwnProperty("assist") && charInfo[importedChars[charCount].character].assist[0] === line[1])))) {
							importedChars[charCount].assist = line[1];
						} else {
							$("#import-error-msg").text("Import error: Invalid assist (line " + (textLine + 1).toString() + ")").show();
							error = true;
							break;
						}
					} else if (equipItem === "special") { // special
						if (specInfo.hasOwnProperty(line[1]) && (importedChars[charCount].character === "Custom" || isInheritable(specInfo[line[1]], importedChars[charCount].character))) {
							importedChars[charCount].special = line[1];
							var weaponData = importedChars[charCount].weapon === "None" ? {} : weaponInfo[importedChars[charCount].weapon];
							var assistData = importedChars[charCount].assist === "None" ? {} : assistInfo[importedChars[charCount].assist];
							importedChars[charCount].specCooldown = getSpecialCooldown(specInfo[line[1]], weaponData, assistData).toString();
						} else {
							$("#import-error-msg").text("Import error: Invalid special (line " + (textLine + 1).toString() + ")").show();
							error = true;
							break;
						}
					} else if (equipItem === "passive a") { // passive a
						if (skillInfo.a.hasOwnProperty(line[1]) && (importedChars[charCount].character === "Custom" || isInheritable(skillInfo.a[line[1]], importedChars[charCount].character))) {
							importedChars[charCount].passiveA = line[1];
						} else {
							$("#import-error-msg").text("Import error: Invalid passive A (line " + (textLine + 1).toString() + ")").show();
							error = true;
							break;
						}
					} else if (equipItem === "passive b") { // passive b
						if (skillInfo.b.hasOwnProperty(line[1]) && (importedChars[charCount].character === "Custom" || isInheritable(skillInfo.b[line[1]], importedChars[charCount].character))) {
							importedChars[charCount].passiveB = line[1];
						} else {
							$("#import-error-msg").text("Import error: Invalid passive B (line " + (textLine + 1).toString() + ")").show();
							error = true;
							break;
						}
					} else if (equipItem === "passive c") { // passive c
						if (skillInfo.c.hasOwnProperty(line[1]) && (importedChars[charCount].character === "Custom" || isInheritable(skillInfo.c[line[1]], importedChars[charCount].character))) {
							importedChars[charCount].passiveC = line[1];
						} else {
							$("#import-error-msg").text("Import error: Invalid passive C (line " + (textLine + 1).toString() + ")").show();
							error = true;
							break;
						}
					} else { // seal
						if (skillInfo.s.hasOwnProperty(line[1]) && (importedChars[charCount].character === "Custom" || isInheritable(skillInfo.s[line[1]], importedChars[charCount].character))) {
							importedChars[charCount].seal = line[1];
						} else {
							$("#import-error-msg").text("Import error: Invalid sacred seal (line " + (textLine + 1).toString() + ")").show();
							error = true;
							break;
						}
					}
					
					textLine += 1;
				} else if (equips.hasOwnProperty(equipItem) && equips[equipItem]) {
					$("#import-error-msg").text("Import error: Double equip (line " + (textLine + 1).toString() + ")").show();
					error = true;
					break;
				} else if (line.length === 2) {
					$("#import-error-msg").text("Import error: Invalid equip (line " + (textLine + 1).toString() + ")").show();
					error = true;
					break;
				} else {
					break;
				}
			}
		}
		
		if (error) {
			break;
		}
		
		// get stats if they were not included in the import
		if (!statsIncluded) {
			var stats = getStatTotals(importedChars[charCount].character, importedChars[charCount].weapon, importedChars[charCount].passiveA, importedChars[charCount].seal, parseInt(importedChars[charCount].rarity), parseInt(importedChars[charCount].level), parseInt(importedChars[charCount].merge), importedChars[charCount].boon, importedChars[charCount].bane);
			
			importedChars[charCount].hp = stats.hp;
			importedChars[charCount].currentHP = stats.hp;
			importedChars[charCount].atk = stats.atk;
			importedChars[charCount].spd = stats.spd;
			importedChars[charCount].def = stats.def;
			importedChars[charCount].res = stats.res;
		}
		
		// check if 5 units have been imported
		if (importedChars.length >= 5) {
			break;
		}
		
		// go back a line before looping again
		textLine -= 1;
	}
	
	// no units imported
	if (importedChars.length === 0 && !error) {
		$("#import-error-msg").text("Import error: No units to import").show();
		error = true;
	}
	
	if (!error) { // put imported characters into place
		$("#import-error-msg").text("Import successful!").show();
		var openSlots = 0;
		var slotIndex = 0;
		var team = attacker ? attackerTeam : defenderTeam;
		var selected = attacker ? selectedAttacker : selectedDefender;
		var tabName = attacker ? "#atk-tab-" : "#def-tab-";
		var defaultTeam = attacker ? defaultAttacker : defaultDefender;
		
		for (slotIndex = 0; slotIndex < 5; slotIndex++) {
			if (!team[slotIndex].hasOwnProperty("character") && slotIndex !== selected) {
				openSlots += 1;
			}
		}
		
		var slotsOverload = openSlots - importedChars.length;
		var numImported = 0;
		
		// insert characters
		for (slotIndex = 0; slotIndex < 5; slotIndex++) {
			if ((slotsOverload < 0 || (!team[slotIndex].hasOwnProperty("character") && slotIndex !== selected) || defaultTeam) && numImported < importedChars.length) {
				team[slotIndex] = importedChars[numImported];
				getPortrait(tabName + slotIndex.toString(), (importedChars[numImported].character === "Custom" ? "Other" : importedChars[numImported].character));
				
				if (slotIndex === selected) {
					if (attacker) {
						attackerTeam[slotIndex] = importedChars[numImported];
					} else {
						defenderTeam[slotIndex] = importedChars[numImported];
					}
					getCharTabInfo(attacker);
				} else {
					$(tabName + slotIndex.toString()).removeClass("char-tab-unselected").addClass("char-tab");
				}
				
				numImported += 1;
				slotsOverload += 1;
			}
			
			if (numImported >= importedChars.length) {
				break;
			}
		}
		
		// store team
		if (attacker) {
			attackerTeam = team;
		} else {
			defenderTeam = team;
		}
	}
	
	return !error;
}

// returns character info from a character panel as a string to be exported
// charNum determines the panel to take data from
function exportCharPanel(charNum) {
	"use strict";
	
	// first line - general info
	var exportText = "";
	if ($("#char-" + charNum).val() === "Custom") {
		exportText = customName($("#weapon-type-" + charNum).val(), $("#move-type-" + charNum).val());
	} else {
		exportText = $("#char-" + charNum).val();
		if ($("#boon-" + charNum).val() !== "neutral" || $("#bane-" + charNum).val() !== "neutral") {
			var boon = $("#boon-" + charNum).val();
			var bane = $("#bane-" + charNum).val();

			exportText += " [";
			exportText += (boon === "neutral") ? "Neutral/" : "+" + boon.toUpperCase() + "/";
			exportText += (bane === "neutral") ? "Neutral]" : "-" + bane.toUpperCase() + "]";
		} else {
			exportText += " [Neutral]";
		}

		exportText += parseInt($("#rarity-" + charNum).val()) !== 5 ? " -- " + $("#rarity-" + charNum).val().toString() + " Star(s)" : "";
		exportText += parseInt($("#merge-" + charNum).val()) > 0 ? " -- Lvl. " + $("#level-" + charNum).val().toString() + "+" + $("#merge-" + charNum).val().toString(): "";
	}
	
	exportText += "\r\n";
	
	// second line - stats
	exportText += $("#hp-" + charNum).val().toString() + " HP / " + $("#atk-" + charNum).val().toString() + " ATK / " + $("#spd-" + charNum).val().toString() + " SPD / " + $("#def-" + charNum).val().toString() + " DEF / " + $("#res-" + charNum).val().toString() + " RES" + "\r\n";
	
	// all other lines - equipped weapons and skills
	exportText += $("#weapon-" + charNum).val() !== "None" ? "Weapon: " + $("#weapon-" + charNum).val() + "\r\n" : "";
	exportText += $("#assist-" + charNum).val() !== "None" ? "Assist: " + $("#assist-" + charNum).val() + "\r\n" : "";
	exportText += $("#special-" + charNum).val() !== "None" ? "Special: " + $("#special-" + charNum).val() + "\r\n" : "";
	exportText += $("#passive-a-" + charNum).val() !== "None" ? "Passive A: " + $("#passive-a-" + charNum).val() + "\r\n" : "";
	exportText += $("#passive-b-" + charNum).val() !== "None" ? "Passive B: " + $("#passive-b-" + charNum).val() + "\r\n" : "";
	exportText += $("#passive-c-" + charNum).val() !== "None" ? "Passive C: " + $("#passive-c-" + charNum).val() + "\r\n" : "";
	exportText += $("#passive-s-" + charNum).val() !== "None" ? "Sacred Seal: " + $("#passive-s-" + charNum).val() + "\r\n" : "";
	exportText += "\r\n";
	
	return exportText;
}

// returns character info from a character tab as a string to be exported
// container contains the data from the tab
function exportCharTab(container) {
	"use strict";
	
	// first line - general info
	var exportText = "";
	if (container.character === "Custom") {
		exportText = customName(container.weaponType, container.moveType);
	} else {
		exportText = container.character;
		
		if (container.boon !== "neutral" || container.bane !== "neutral") {
			exportText += " [";
			exportText += (container.boon === "neutral") ? "Neutral/" : "+" + container.boon.toUpperCase() + "/";
			exportText += (container.bane === "neutral") ? "Neutral]" : "-" + container.bane.toUpperCase() + "]";
		} else {
			exportText += " [Neutral]";
		}

		exportText += parseInt(container.rarity) !== 5 ? " -- " + container.rarity.toString() + " Star(s)" : "";
		exportText += (parseInt(container.merge) > 0 || parseInt(container.level) !== 40) ? " -- Lvl. " + container.level.toString() + "+" + container.merge.toString(): "";
	}
	
	exportText += "\r\n";
	
	// second line - stats
	exportText += container.hp.toString() + " HP / " + container.atk.toString() + " ATK / " + container.spd.toString() + " SPD / " + container.def.toString() + " DEF / " + container.res.toString() + " RES" + "\r\n";
	
	// all other lines - equipped weapons and skills
	exportText += container.weapon !== "None" ? "Weapon: " + container.weapon + "\r\n" : "";
	exportText += container.assist !== "None" ? "Assist: " + container.assist + "\r\n" : "";
	exportText += container.special !== "None" ? "Special: " + container.special + "\r\n" : "";
	exportText += container.passiveA !== "None" ? "Passive A: " + container.passiveA + "\r\n" : "";
	exportText += container.passiveB !== "None" ? "Passive B: " + container.passiveB + "\r\n" : "";
	exportText += container.passiveC !== "None" ? "Passive C: " + container.passiveC + "\r\n" : "";
	exportText += container.seal !== "None" ? "Sacred Seal: " + container.seal + "\r\n" : "";
	exportText += "\r\n";
	
	return exportText;
}

// exports the given team
// attacker is true if we export the attackers
function exportTeam(attacker) {
	"use strict";
	var team = attacker ? attackerTeam : defenderTeam;
	var selected = attacker ? selectedAttacker : selectedDefender;
	var exportText = "";
	
	for (var index = 0; index < 5; index++) {
		if (index === selected) {
			exportText += exportCharPanel(attacker ? "1" : "2");
		} else if (team[index].hasOwnProperty("character")) {
			exportText += exportCharTab(team[index]);
		}
	}
	
	$("#import-area").val(exportText);
}

// exports the selected character on a team
// attacker is true if we export the attacker
function exportSingle(attacker) {
	"use strict";
	if (attacker) {
		$("#import-area").val(exportCharPanel("1"));
	} else {
		$("#import-area").val(exportCharPanel("2"));
	}
}

// clears the selected team
// attacker is true if we export the attacker team
function clearTeam(attacker) {
	"use strict";
	for (var index = 0; index < 5; index++) {
		$("#" + (attacker ? "atk" : "def") + "-tab-" + index.toString()).removeClass("char-tab char-tab-selected").addClass("char-tab-unselected").attr("src", "img/Portraits/Unselected.png");
		if (attacker) {
			attackerTeam[index] = {};
		} else {
			defenderTeam[index] = {};
		}
	}
	
	if (attacker) {
		selectedAttacker = 0;
		selectCharTab(true, 0);
		$("#char-1").val($("#char-1 option:eq(0)").val()).trigger("change.select2");
		displayChar($("#char-1").val(), "1");
	} else {
		selectedDefender = 0;
		selectCharTab(false, 0);
		$("#char-2").val($("#char-2 option:eq(1)").val()).trigger("change.select2");
		displayChar($("#char-2").val(), "2");
	}
}

// setup inital page
$(document).ready( function() {
	"use strict";	
	
	// setup show/hide buttons
	$(".collapse-button").on("click", function() {
		// toggle a section
		$("#" + $(this).data("section")).toggle(700);
	});

	// battle log header
	$("#interaction-list-header").on("click", function() {
		if ($(this).hasClass("legend-tab-unselected")) {
			openLog = true;
			$("#import-export-header").addClass("legend-tab-unselected");
			$("#import-export").stop(true, true).hide();
			$("#interaction-list").stop(true, true).fadeIn("slow");
			$(this).removeClass("legend-tab-unselected");
		}
	});
	
	// import export header
	$("#import-export-header").on("click", function() {
		if ($(this).hasClass("legend-tab-unselected")) {
			openLog = false;
			$("#import-error-msg").text("");
			$("#interaction-list").stop(true, true).hide();
			$("#interaction-list-header").addClass("legend-tab-unselected");
			$(this).removeClass("legend-tab-unselected");
			$("#import-export").stop(true, true).fadeIn("slow");
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
		// old value
		var oldHP = parseInt($("#" + this.id + "-denom").text());

		// update hp value in rest of the page
		$("." + this.id + "-read").text(this.value);

		// check if current hp needs to be updated as well
		if ((this.value < parseInt($("#curr-" + this.id).val())) || parseInt($("#curr-" + this.id).val()) === oldHP) {
			$("#curr-" + this.id).val(this.value);
		}
		
		charChange($(this).data("charnum").toString());
		updateDisplay();
	});
	$(".curr-hp-val").on("change", function() {
		var charNum = $(this).data("charnum").toString();
		
		// current hp cannot be greater than base hp
		var baseHP = parseInt($("#hp-" + charNum).val());
		if (this.value > baseHP) {
			this.value = baseHP;
		}
		
		charChange(charNum);
		updateDisplay();
	});
	
	// setup special cooldown updates
	$(".spec-cool").on("change", function() {
		var charNum = $(this).data("charnum").toString();
		
		var maxCooldown = parseInt($("#spec-cooldown-max-" + charNum).text());
		if (this.value > maxCooldown) {
			this.value = maxCooldown;
		}
		
		charChange(charNum);
		updateDisplay();
	});
	
	// make character tabs load default image on error
	$(".char-tab, .char-tab-selected, .char-tab-unselected, #attacker-portrait, #defender-portrait").on("error", function() {
		$(this).attr("src", "img/Portraits/Other.png");
	});
	
	// setup character tab changes
	$(".char-tab, .char-tab-unselected").on("click", function() {
		selectCharTab($(this).data("charnum") === 1, $(this).data("index"));
		charChange($(this).data("charnum").toString());
		updateDisplay();
	});
	
	// setup initial display
	setupStats();
	setupChars();
	setupOverrides();
	
	// setup select2
	$(".fancy-select").select2({
		templateResult: function format(state) {
			var originalOption = state.element;
			if ($(originalOption).hasClass("inherit")) {
				return $("<span class='inherit'>" + state.text + "</span>");
			}
			return state.text;
		}
	});
	
	// setup multiple select
	$("select.multi-select").multipleSelect({"placeholder" : "None selected"});
	$("select.multi-select").multipleSelect("checkAll");
	
	// setup character select
	$(".char-selector").on("change", function() {
		var charNum = $(this).data("charnum").toString();
		displayChar(this.value, charNum);
		charChange(charNum);
		updateDisplay();
	});
	
	// setup weapon select
	$(".weapon-selector").on("change", function (){
		var charNum = $(this).data("charnum").toString();
		showWeapon(this.value, charNum, true);
		charChange(charNum);
		updateDisplay();
	});
	
	// setup special select
	$(".special-selector").on("change", function (){
		var charNum = $(this).data("charnum").toString();
		getSpecialData(charNum);
		showSpecCooldown(this.value, charNum, false);
		updateSpecCooldown(charNum);
		charChange(charNum);
		updateDisplay();
	});
	
	// setup assist select
	$(".assist-selector").on("change", function (){
		var charNum = $(this).data("charnum").toString();
		getAssistData(charNum);
		updateSpecCooldown(charNum);
		charChange(charNum);
		updateDisplay();
	});
	
	// setup skill select
	$(".passive-selector").on("change", function (){
		var charNum = $(this).data("charnum").toString();
		var skillType = $(this).data("skilltype");
		getSkillData(charNum, skillType, true);
		charChange(charNum);
		updateDisplay();
	});
	
	// set up move type changes
	$(".move-type-selector").on("change", function() {
		var charNum = $(this).data("charnum").toString();
		getMoveIcon((charNum === "1" ? "#attacker-move" : "#defender-move"), this.value);
		charChange(charNum);
		updateDisplay();
	});
	
	// set up weapon type changes
	$(".weapon-type-selector").on("change", function (){
		var charNum = $(this).data("charnum").toString();
		loadWeapons(this.value, "#weapon-" + charNum, false);
		setColor(this.value, charNum);
		$("#weapon-" + charNum + " option:eq(1)").attr("selected", "selected").trigger("change.select2");
		getWeaponIcon((charNum === "1" ? "#attacker-weapon" : "#defender-weapon"), this.value);
		showWeapon($("#weapon-" + charNum).val(), charNum, true);
		charChange(charNum);
		updateDisplay();
	});
	
	// set up weapon type changes for overrides
	$("#override-weapon-type").on("change", function (){
		var selectedWeapon = $("#override-weapon").val();
		loadWeapons(this.value, "#override-weapon", true);
		$("#override-weapon").html("<option value='No Override'>No Override</option>" + $("#override-weapon").html());
		keepTable = false;
		
		if (selectedWeapon === "No Override" || selectedWeapon === "None" || this.value === "Any" || weaponInfo[selectedWeapon].type === this.value) {
			$("#override-weapon").val(selectedWeapon).trigger("change.select2");
		} else {
			$("#override-weapon option:eq(0)").attr("selected", "selected").trigger("change.select2");
		}
		
		updateDisplay();
	});
	
	// set up color changes
	$(".color-selector").on("change", function() {
		var charNum = $(this).data("charnum").toString();
		
		if (this.value === "Red") {
			loadWeapons("Sword", "#weapon-" + charNum, false);
			$("#weapon-type-" + charNum).val("Sword");
		} else if (this.value === "Green") {
			loadWeapons("Axe", "#weapon-" + charNum, false);
			$("#weapon-type-" + charNum).val("Axe");
		} else if (this.value === "Blue") {
			loadWeapons("Lance", "#weapon-" + charNum, false);
			$("#weapon-type-" + charNum).val("Lance");
		} else {
			loadWeapons("Bow", "#weapon-" + charNum, false);
			$("#weapon-type-" + charNum).val("Bow");
		}
		$("#weapon-" + charNum + " option:eq(1)").attr("selected", "selected").trigger("change.select2");
		getWeaponIcon((charNum === "1" ? "#attacker-weapon" : "#defender-weapon"), $("#weapon-type-" + charNum).val());
		showWeapon( $("#weapon-" + charNum).val(), charNum, true);
		charChange(charNum);
		updateDisplay();
	});
	
	// setup other battle value changes
	$(".battle-val").on("change", function() {
		charChange($(this).data("charnum").toString());
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
			recolorMatchupRows();
		} else {
			$("#battle-result").stop(true, true).hide(700);
			$("#battle-log").stop(true, true).hide(700);
			$("#matchups").stop(true, true).show(700);
			
			// disable attacker input, enable defender input
			enableCharPanel("1", false);
			enableCharPanel("2", true);
			
			// update info
			previousTable = false;
			recolorMatchupRows();
		}
	});
	
	// matchup button presses
	$(".matchup-button").on("click", function() {
		if ($(this).hasClass("matchup-button")) {
			$(this).removeClass("matchup-button");
			$(this).addClass("matchup-button-selected");
			
			if (this.id === "matchup-filter-button" && $("#matchup-override-button").hasClass("matchup-button-selected")) {
				$("#matchup-override-button").removeClass("matchup-button-selected");
				$("#matchup-override-button").addClass("matchup-button");
				$("#" + $("#matchup-override-button").data("section")).hide(700);
			} else if (this.id === "matchup-override-button" && $("#matchup-filter-button").hasClass("matchup-button-selected")) {
				$("#matchup-filter-button").removeClass("matchup-button-selected");
				$("#matchup-filter-button").addClass("matchup-button");
				$("#" + $("#matchup-filter-button").data("section")).hide(700);
			}
		} else {
			$(this).removeClass("matchup-button-selected");
			$(this).addClass("matchup-button");
		}
	});
	
	// update table when filters are changed
	$("select.matchup-filter-input, input.matchup-filter-input[type='text']").on("change keyup", function() {
		if (!resetFilterLock) {
			if (this.id === "matchup-filter-name") {
				filterMatchupTable(false);
			} else {
				filterMatchupTable(true);
			}
		}
	});
	
	// reset filters
	$("#matchup-filter-reset").on("click", function() {
		resetFilterLock = true;
		$("#matchup-filter-name").val("");
		$("select.multi-select").multipleSelect("checkAll");
		resetFilterLock = false;
		filterMatchupTable(true);
	});
	
	// override options
	$(".override-option").on("change", function() {
		// check if boon and bane match
		if (this.id === "override-boon" && this.value === $("#override-bane").val()) {
			$("#override-bane").val("neutral");
		}
		if (this.id === "override-bane" && this.value === $("#override-boon").val()) {
			$("#override-boon").val("neutral");
		}
		
		keepTable = false;
		updateDisplay();
	});
	
	// reset overrides
	$("#override-reset").on("click", function() {
		$("#override-rarity").val(5);
		$("#override-level").val(40);
		$("#override-merge").val(0);
		$("#override-boon").val("neutral");
		$("#override-bane").val("neutral");
		
		$("#override-weapon-type").val("Any");
		loadWeapons("Any", "#override-weapon", true);
		$("#override-weapon").html("<option value='No Override'>No Override</option>" + $("#override-weapon").html());
		$("#override-weapon").val("No Override").trigger("change.select2");
		
		$("#override-passive-a").val("No Override").trigger("change.select2");
		$("#override-passive-b").val("No Override").trigger("change.select2");
		$("#override-passive-c").val("No Override").trigger("change.select2");
		$("#override-assist").val("No Override").trigger("change.select2");
		$("#override-special").val("No Override").trigger("change.select2");
		$("#override-spec-cooldown").val("max");
		$("#override-passive-s").val("No Override").trigger("change.select2");
		
		$(".override-stat").val(0);
		$("#override-curr-hp").val(100);
		
		keepTable = false;
		updateDisplay();
	});
	
	// stat variants change
	$(".build-select").on("change", function() {
		var charNum = $(this).data("charnum").toString();
		
		// check if banes and boons match
		if ($(this).hasClass("boon-select") && this.value === $("#bane-" + charNum).val()) {
			$("#bane-" + charNum).val("neutral");
		}
		if ($(this).hasClass("bane-select") && this.value === $("#boon-" + charNum).val()) {
			$("#boon-" + charNum).val("neutral");
		}
		
		// check if skills need to change due to rarity change
		if ($(this).hasClass("rarity-select")) {
			rarityUpdate(charNum, parseInt(this.value));
		}
		
		if (charInfo[$("#char-" + charNum).val()].hasOwnProperty("base_stat")) {
			displayStatTotals(charNum);
		}
		charChange(charNum);
		updateDisplay();
	});
	
	// import team
	$(".import-btn").on("click", function() {
		var attacker = (this.id === "import-attacker");
		
		if (importTeam(attacker)) {
			charChange(attacker ? "1" : "2");
			updateDisplay();
		}
	});
	
	// export teams
	$(".export-btn").on("click", function() {
		exportTeam(this.id === "export-attacker");
		$("#import-error-msg").hide();
	});
	
	// export single character
	$(".export-single-btn").on("click", function() {
		exportSingle(this.id === "export-attacker-single");
		$("#import-error-msg").hide();
	});
	
	// clear team
	$(".clear-team-btn").on("click", function() {
		var attacker = (this.id === "clear-attacker");
		clearTeam(attacker);
		$("#import-error-msg").hide();
		charChange(attacker ? "1" : "2");
		
		if (attacker) {
			defaultAttacker = true;
		} else {
			defaultDefender = true;
		}
		
		updateDisplay();
	});
});
