// resize stuff
var headerLogos = false;
var attackSelected = true;
var displaySingleChar = false;

// handles resizing the header
function resizeHeader() {
	"use strict";
	var headerWidth = $("#calc-header").width();

	if ($("#calc-title").width() + $("#reddit-link").width() + $("#github-link").width() + 50 > headerWidth) {
		if (!headerLogos) {
			$("#reddit-link").html("<img src='img/reddit_logo.png'>");
			$("#github-link").html("<img src='img/github_logo.png'>");
			headerLogos = true;
		}
	} else if (headerLogos) {
		$("#reddit-link").html("Contact on reddit");
		$("#github-link").html("GitHub repository");

		if ($("#calc-title").width() + $("#reddit-link").width() + $("#github-link").width() + 50 > headerWidth) {
			$("#reddit-link").html("<img src='img/reddit_logo.png'>");
			$("#github-link").html("<img src='img/github_logo.png'>");
		} else {
			headerLogos = false;
		}
	}

	$("#calc-title").text("Fire Emblem: Heroes Damage Calculator").css("width", "auto");
	if ($("#calc-title").width() > headerWidth - $("#reddit-link").width() - $("#github-link").width() - 50) {
		$("#calc-title").text("FEH Damage Calculator");
		if ($("#calc-title").width() > headerWidth - $("#reddit-link").width() - $("#github-link").width() - 50) {
			$("#calc-title").width(headerWidth - $("#reddit-link").width() - $("#github-link").width() - 50);
		}
	}
}

// handles resizing modes
function resizeModes() {
	"use strict";
	var shortenNames = false;
	$(".mode-button-label").css("width", "140px");

	if (($(".mode-button-label").width() * 3) + 50 > $("#modes-container").width()) {
		$(".mode-button-label").css("width", "115px");

		if (($(".mode-button-label").width() * 3) + 50 > $("#modes-container").width()) {
			$(".mode-button-label").css("width", "60px");
			shortenNames = true;
		}
	}
	
	if (!shortenNames) {
		$("#one-vs-one-label").text("One vs. One");
		$("#one-vs-all-label").text("One vs. All");
		$("#all-vs-one-label").text("All vs. One");
	} else {
		$("#one-vs-one-label").text("1v1");
		$("#one-vs-all-label").text("1vA");
		$("#all-vs-one-label").text("Av1");
	}
}

// resize results
function resizeResults() {
	"use strict";
	$(".combat-portrait").css("width", "75px").css("height", "75px");
	$("#result-table").css("font-size", "1em");
	$("#result-msg").css("font-size", "1.2em");
	$("#swap-button-small").css("width", "38px").css("height", "42px");
	
	if (displaySingleChar) {
		$(".combat-char-left").css("padding-right", "0");
		$(".combat-char-right").css("padding-left", "0");
	} else {
		$(".combat-char-left").css("padding-right", "1.5em");
		$(".combat-char-right").css("padding-left", "1.5em");
	}

	if ($("#result-table").width() > $(window).width()) {
		$(".combat-portrait").css("width", "60px").css("height", "60px");
		$("#result-table").css("font-size", "0.9em");
		$("#result-msg").css("font-size", "1em");
		$("#swap-button-small").css("width", "27px").css("height", "30px");
		
		if (!displaySingleChar) {
			$(".combat-char-left").css("padding-right", "1em");
			$(".combat-char-right").css("padding-left", "1em");
		}
	}
}

// resize char panels
function resizePanels() {
	"use strict";
	displaySingleChar = false;
	$(".char-panel-split").css("display", "inline-block");
	$(".split-left").css("margin-right", "1.5em");
	$(".skill-select").removeClass("info-section").addClass("info-section-bottom");
	$(".state-section label").css("width", "5em");
	$(".state-section select").css("width", "8.4em");
	console.log($("#terrain-1").width().toString());
	$(".state-section .status-select").css("width", $("#terrain-1").outerWidth().toString() + "px");
	$(".state-section .status-select > .ms-choice > span").css("width", "7em");
	$("#interaction-list").css("width", "auto");
	
	$("#swap-cell, #attack-cell, #defend-cell").css("display", "table-cell");
	$("#swap-cell-small, .char-pick").css("display", "none");
	$("legend").css("text-align", "left");
	
	if ((($("#left-1").width() + $("#right-1").width()) * 2) + $("#swap-button").width() + 210 > $(window).width()) {
		$(".char-panel-split").css("display", "block");
		$(".split-left").css("margin-right", "0");
		$(".skill-select").removeClass("info-section-bottom").addClass("info-section");
		$(".state-section label").css("width", "9.8em");
		$(".state-section select").css("width", "12.3em");
		console.log($("#terrain-1").width().toString());
		$(".state-section .status-select").css("width", $("#terrain-1").outerWidth().toString() + "px");
		$(".state-section .status-select > .ms-choice > span").css("width", "10em");
		$("#interaction-list").css("width", "700px");
		
		if ($("#calc").width() > $(window).width()) {
			displaySingleChar = true;
			$("#swap-cell, " + (attackSelected ? "#defend-cell" : "attack-cell")).css("display", "none");
			$("#interaction-list").css("width", "auto");
			$("#swap-cell-small").css("display", "table-cell");
			$(".char-pick").css("display", "inline");
			$("legend").css("text-align", "center");
		}
	}
}

// handles window resize
function resizeAll() {
	"use strict";
	resizeHeader();
	resizeModes();
	resizePanels();
	resizeResults();
}