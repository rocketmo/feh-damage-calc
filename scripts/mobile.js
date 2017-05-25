var headerLogos = false;

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
	$(".mode-button-label").css("width", "140px");

	if (($(".mode-button-label").width() * 3) + 50 > $("#modes-container").width()) {
		$(".mode-button-label").css("width", "60px");
		$("#one-vs-one-label").text("1v1");
		$("#one-vs-all-label").text("1vA");
		$("#all-vs-one-label").text("Av1");
	} else {
		$("#one-vs-one-label").text("One vs. One");
		$("#one-vs-all-label").text("One vs. All");
		$("#all-vs-one-label").text("All vs. One");
	}
}

// handles window resize
function resizeAll() {
	"use strict";
	resizeHeader();
	resizeModes();
}