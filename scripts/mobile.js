var headerLogos = false;

// handles resizing the header
function resizeHeader() {
	"use strict";
	var windowWidth = $(window).width();

	if ($("#calc-title").width() + $("#reddit-link").width() + $("#github-link").width() + 50 > windowWidth) {
		if (!headerLogos) {
			$("#reddit-link").html("<img src='img/reddit_logo.png'>");
			$("#github-link").html("<img src='img/github_logo.png'>");
			headerLogos = true;
		}
	} else if (headerLogos) {
		$("#reddit-link").html("Contact on reddit");
		$("#github-link").html("GitHub repository");

		if ($("#calc-title").width() + $("#reddit-link").width() + $("#github-link").width() + 50 > windowWidth) {
			$("#reddit-link").html("<img src='img/reddit_logo.png'>");
			$("#github-link").html("<img src='img/github_logo.png'>");
		} else {
			headerLogos = false;
		}
	}

	$("#calc-title").text("Fire Emblem: Heroes Damage Calculator").css("width", "auto");
	if ($("#calc-title").width() > $("#calc-header").width() - $("#reddit-link").width() - $("#github-link").width() - 50) {
		$("#calc-title").text("FEH Damage Calculator");
		if ($("#calc-title").width() > $("#calc-header").width() - $("#reddit-link").width() - $("#github-link").width() - 50) {
			$("#calc-title").width($("#calc-header").width() - $("#reddit-link").width() - $("#github-link").width() - 50);
		}
	}
}