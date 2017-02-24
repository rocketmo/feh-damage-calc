var HIGHESTSTAT = 99;

// limits number inputs
function limit (num, minNumber) {
	"use strict";
	// check if value is outside of the limits
	if (!$.isNumeric(num.value) || num.value < minNumber) {
		num.value = minNumber;
	} else if (num.value > HIGHESTSTAT) {
		num.value = HIGHESTSTAT;
	} else if (Math.floor(num.value) !== num.value) {
		num.value = Math.floor(num.value);
	}
}

// put options in the stat selects
function setupStats () {
	"use strict";
	$(".stat-bonus").html("<option>0</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option>");
	$(".stat-penalty").html("<option>0</option><option>-3</option><option>-4</option><option>-5</option><option>-6</option><option>-7</option>");
	$(".stat-spur").html("<option>0</option><option>2</option><option>3</option><option>4</option>");
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
				options += "<option>" + key + "</option>";	
			}
		}
		
		// add to html
		$(".char-selector").html(options);
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
	$(".hp-stat").on("change", function() {
		// update hp value in rest of the page
		$("." + this.id + "-read").text(this.value);	
	});
	$(".curr-hp-val").on("change", function () {
		// current hp cannot be greater than base hp
		var baseHP = $("#hp-" + $(this).data("charnum"))[0].value;
		if (this.value > baseHP) {
			this.value = baseHP;
		}
	});
	
	setupStats();
	setupChars();	
});
