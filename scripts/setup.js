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

// displays character information in the character panels
// charInfo contains all the character info to display, charNum determines which panel to display on
function displayChar(charInfo, charNum) {
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
	$.getJSON("https://rocketmo.github.io/feh-damage-calc/data/weapon.json", function(weaponInfo) {
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
			console.log("Invalid weapon");
		}
	});
	
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
		$("#spec-cooldown-" + charNum).removeAttr("disabled");
		$("#skills-" + charNum + " .special-label").css("color", "white");
		$("#spec-cooldown-line-" + charNum).css("color", "white");
		
		var selectedSpecial = charInfo.special[0];
		var specials = "<option value='" + selectedSpecial + "'>" + selectedSpecial + "</option>";
		for (var specIndex = 1; specIndex < charInfo.special.length; specIndex++) {
			specials += "<option value='" + charInfo.special[specIndex] + "'>" + charInfo.special[specIndex] + "</option>";
		}
		specials += "<option value='None'>None</option>";
		$("#special-" + charNum).html(specials);
		$("#special-" + charNum + " option:eq(0)").attr("selected", "selected");
		
		// show cooldown values
		$.getJSON("https://rocketmo.github.io/feh-damage-calc/data/special.json", function(specInfo) {
			$("#spec-cooldown-" + charNum).val(specInfo[selectedSpecial].cooldown);
			$("#spec-cooldown-max-" + charNum).text(specInfo[selectedSpecial].cooldown);
		});
		
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

// put options in the character selects
function setupChars() {
	"use strict";
	
	// stores all character options
	var options = "";
	
	// retrieve characters and add them to the list of options
	$.getJSON("https://rocketmo.github.io/feh-damage-calc/data/char.json", function(info) {
		for (var key in info) {
			if (info.hasOwnProperty(key)) {
				options += "<option value='" + key + "'>" + key + "</option>";
			}
		}
		
		// add to html
		$(".char-selector").html(options);
		
		// set default characters
		$("#char-1 option:eq(0)").attr("selected", "selected");
		displayChar(info[$("#char-1").val()], "1");
		$("#char-2 option:eq(1)").attr("selected", "selected");
		displayChar(info[$("#char-2").val()], "2");
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
		$.getJSON("https://rocketmo.github.io/feh-damage-calc/data/char.json", function(info) {
			displayChar(info[$("#char-1").val()], "1");
		});
	});
	$("#char-2").on("change", function () {
		$.getJSON("https://rocketmo.github.io/feh-damage-calc/data/char.json", function(info) {
			displayChar(info[$("#char-2").val()], "2");
		});
	});
});
