
//Updates stats display for given char given stats
function updateStatFields(stats, charNum) {
    for (var b in s) {
        $('#' + b + '-' + charNum).val(s);
    }
}

//Adds specified support buff to stats object passed as parameter
function addSupportBuff(rank, type, stats) {

	var s = supportInfo[type][rank];

	for (var b in s) {
		stats[b] += s[b];
	}

    return stats;
}

//Subtracts specified support buff from stats object passed as parameter
function subtractSupportBuff(rank, type, stats) {

	var s = supportInfo[type][rank];

	for (var b in s) {
		stats[b] -= s[b];
	}

    return stats;
}

//Displays support buffs in base stats
function changeSupportBuff(rank, type, charNum) {

    var fieldID = '#' + type + '-support-' + charNum;
    var field = $(fieldID);
    if (!field.data('info')) {
        field.data('info', {});
    }

    var oldStatMod = field.data('info').stat_mod;
	var statMod = supportInfo[type][rank];

    //Remove old support buff
	updateStatTotal(fieldID, charNum, false);

    //Assign data to html element for new support buff
    field.data('info').stat_mod = statMod;

    //Add new support buff stats
    updateStatTotal(fieldID, charNum, true);
}

// updates a displayed stat if the given select has a stat_mod property
// selectID is the select's id, charNum determines which panel's stats to change, increment is true if we need to add to the stat total and false otherwise
function updateStatTotal(selectID, charNum, increment) {

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
