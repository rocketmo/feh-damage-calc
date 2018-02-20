// gets the currently selected character and displays their info
// attacker is true if the character is in the attacker panel
function getCharTabInfo(attacker) {

    var charNum = attacker ? '1' : '2';
    var charTabInfo = attacker ? attackerTeam[selectedAttacker] : defenderTeam[selectedDefender];

    if (!charTabInfo.hasOwnProperty('character')) { // no character stored, display default

        if (attacker) {
            $('#char-1').val($('#char-1 option:eq(0)').val()).prop('selected', 'selected');; //.trigger('change.select2');
            displayChar($('#char-1').val(), '1', true);
        } else {
            $('#char-2').val($('#char-2 option:eq(1)').val()).prop('selected', 'selected');; //.trigger('change.select2');
            displayChar($('#char-2').val(), '2', true);
        }
    } else {  // display stored info
        // get and show default character info
        $('#char-' + charNum).val(charTabInfo.character).prop('selected', 'selected');
        displayChar(charTabInfo.character, charNum, false);

        // change extra character info if Custom unit was selected
        if (charTabInfo.character === 'Custom') {
            $('#color-' + charNum).val(charTabInfo.color);
            $('#weapon-type-' + charNum).prop('value', charTabInfo.weaponType);
            $('#move-type-' + charNum).val(charTabInfo.moveType);
        }

        // change stat variants
        $('#rarity-' + charNum).html(charTabInfo.rarityHTML);
        $('#rarity-' + charNum).val(charTabInfo.rarity);
        $('#level-' + charNum).val(charTabInfo.level);
        $('#merge-' + charNum).val(charTabInfo.merge);
        $('#boon-' + charNum).val(charTabInfo.boon);
        $('#bane-' + charNum).val(charTabInfo.bane);
        $('#summoner-support-' + charNum).val(charTabInfo.summonerSupport);
        $('#ally-support-' + charNum).val(charTabInfo.allySupport);

        // change hp values
        $('#hp-' + charNum).val(charTabInfo.hp);
        $('.hp-' + charNum + '-read').text(charTabInfo.hp);
        $('#curr-hp-' + charNum).val(charTabInfo.currentHP);

        // change attack values
        $('#atk-' + charNum).val(charTabInfo.atk);
        $('#atk-bonus-' + charNum).val(charTabInfo.atkBonus);
        $('#atk-penalty-' + charNum).val(charTabInfo.atkPenalty);
        $('#atk-spur-' + charNum).val(charTabInfo.atkSpur);

        // change speed values
        $('#spd-' + charNum).val(charTabInfo.spd);
        $('#spd-bonus-' + charNum).val(charTabInfo.spdBonus);
        $('#spd-penalty-' + charNum).val(charTabInfo.spdPenalty);
        $('#spd-spur-' + charNum).val(charTabInfo.spdSpur);

        // change defense values
        $('#def-' + charNum).val(charTabInfo.def);
        $('#def-bonus-' + charNum).val(charTabInfo.defBonus);
        $('#def-penalty-' + charNum).val(charTabInfo.defPenalty);
        $('#def-spur-' + charNum).val(charTabInfo.defSpur);

        // change resistance values
        $('#res-' + charNum).val(charTabInfo.res);
        $('#res-bonus-' + charNum).val(charTabInfo.resBonus);
        $('#res-penalty-' + charNum).val(charTabInfo.resPenalty);
        $('#res-spur-' + charNum).val(charTabInfo.resSpur);

        // change passives
        $('#passive-a-' + charNum).val(charTabInfo.passiveA).prop('selected', 'selected'); //.trigger('change.select2');
        $('#passive-b-' + charNum).val(charTabInfo.passiveB).prop('selected', 'selected'); //.trigger('change.select2');
        $('#passive-c-' + charNum).val(charTabInfo.passiveC).prop('selected', 'selected'); //.trigger('change.select2');
        $('#passive-s-' + charNum).val(charTabInfo.seal).prop('selected', 'selected'); //.trigger('change.select2');
        getSkillData(charNum, 'a', false);
        getSkillData(charNum, 'b', false);
        getSkillData(charNum, 'c', false);
        getSkillData(charNum, 's', false);

        // change special
        $('#special-' + charNum).val(charTabInfo.special).prop('selected', 'selected'); //.trigger('change.select2');
        showSpecCooldown(charTabInfo.special, charNum, true);
        getSpecialData(charNum);

        // change assist
        $('#assist-' + charNum).val(charTabInfo.assist).prop('selected', 'selected'); //.trigger('change.select2');
        getAssistData(charNum);

        // if customer character, change weapon and fix combat icons
        if (charTabInfo.character === 'Custom') {
            loadWeapons(charTabInfo.weaponType, '#weapon-' + charNum, false);
            getWeaponIcon((charNum === '1' ? '#attacker-weapon' : '#defender-weapon'), $('#weapon-type-' + charNum).val());
            getMoveIcon((charNum === '1' ? '#attacker-move' : '#defender-move'), $('#move-type-' + charNum).val());
        }

        $('#weapon-' + charNum).val(charTabInfo.weapon).prop('selected', 'selected'); //.trigger('change.select2');
        showWeapon(charTabInfo.weapon, charNum, false, true);

        // change special cooldown
        $('#spec-cooldown-' + charNum).val(charTabInfo.specCooldown);

        // change state
        $('#candlelight-status-' + charNum).prop("checked", charTabInfo.status.candlelight);
        $('#panic-status-' + charNum).prop("checked", charTabInfo.status.panic);
        if (charTabInfo.terrain === 'Defensive') {
            $('#defensive-terrain-' + charNum).prop("checked", true);
        }
        else {
            $('#defensive-terrain-' + charNum).prop("checked", false);
        }

        $('#adjacent-' + charNum).val(charTabInfo.adjacent);
    }
}

// marks a character tab as selected and deselects the previous
// attacker is true if we are selecting from the attacker panel, newIndex is the index of the tab to select
function selectCharTab(attacker, newIndex) {

    var charNum = 1;
    if (!attacker) {
        charNum = 2;
    }

    var oldTabID = attacker ? '#tab-' + selectedAttacker.toString() + '-1 ': 'tab-' + selectedDefender.toString() + '-2';
    var newTabID = attacker ? '#tab-' + newIndex.toString() + '-1' : '#tab-' + newIndex.toString() + '-2';
    if (oldTabID === newTabID) {
        return;
    }
    $(oldTabID).removeClass('char-tab-selected').addClass('char-tab');

    var newTab = false;
    if ($(newTabID).hasClass('char-tab-unselected') && (oldTabID !== newTabID)) {
        $(newTabID).hide().removeClass('char-tab-unselected').addClass('char-tab-selected');
        newTab = true;
    } else {
        $(newTabID).removeClass('char-tab-unselected').removeClass('char-tab').addClass('char-tab-selected');
    }

    // store current character info
    storeCharTabInfo(attacker);

    // change index
    if (attacker) {
        selectedAttacker = newIndex;
    } else {
        selectedDefender = newIndex;
    }

    // fade in new tab
    if (newTab) {
        $('#candlelight-status-' + charNum).prop("checked", false);
        $('#panic-status-' + charNum).prop("checked", false);
        $('#defensive-terrain-' + charNum).prop("checked", false);

    }

    // retrieve selected character info
    getCharTabInfo(attacker);

    if (newTab) {
        $(newTabID).fadeIn();
    }
}

// selects the first empty tab in a character panel, if all are take stay on the current tab
// attacker is true if we are selecting from the attacker panel
function selectEmptyCharTab(attacker) {
    'use strict';
    var team = attacker ? attackerTeam : defenderTeam;
    var selected = attacker ? selectedAttacker : selectedDefender;

    for (var i = 0; i < 5; i++) {
        if (!team[i].hasOwnProperty('character') && i !== selected) {
            selectCharTab(attacker, i);
            return;
        }
    }
}

// stores the currently selected character for later
// attacker is true if the character is in the attacker panel
function storeCharTabInfo(attacker) {

    var charNum = attacker ? '1' : '2';
    var infoToStore = {};

    // char info
    infoToStore.character = $('#char-' + charNum).val();
    infoToStore.color = $('#color-' + charNum).val();
    infoToStore.weaponType = $('#weapon-type-' + charNum).val();
    infoToStore.moveType = $('#move-type-' + charNum).val();

    // stat variants
    infoToStore.rarityHTML = $('#rarity-' + charNum).html();
    infoToStore.rarity = $('#rarity-' + charNum).val();
    infoToStore.level = $('#level-' + charNum).val();
    infoToStore.merge = $('#merge-' + charNum).val();
    infoToStore.boon = $('#boon-' + charNum).val();
    infoToStore.bane = $('#bane-' + charNum).val();
    infoToStore.summonerSupport = $('#summoner-support-' + charNum).val();
    infoToStore.allySupport = $('#ally-support-' + charNum).val();

    // weapon and skill info
    infoToStore.weapon = $('#weapon-' + charNum).val();
    infoToStore.passiveA = $('#passive-a-' + charNum).val();
    infoToStore.passiveB = $('#passive-b-' + charNum).val();
    infoToStore.passiveC = $('#passive-c-' + charNum).val();
    infoToStore.assist = $('#assist-' + charNum).val();
    infoToStore.special = $('#special-' + charNum).val();
    infoToStore.specCooldown = $('#spec-cooldown-' + charNum).val();
    infoToStore.seal = $('#passive-s-' + charNum).val();

    // state
    infoToStore.status = {
        "candlelight": $("#candlelight-status-" + charNum).is(":checked"),
        "panic": $("#panic-status-" + charNum).is(":checked")
    };

    if ($("#defensive-terrain-" + charNum).is(":checked")) {
        infoToStore.terrain = "Defensive";
    }
    else {
        infoToStore.terrain = "Default";
    }

    infoToStore.adjacent = $('#adjacent-' + charNum).val();

    // hp and current hp
    infoToStore.hp = $('#hp-' + charNum).val();
    infoToStore.currentHP = $('#curr-hp-' + charNum).val();

    // attack
    infoToStore.atk = $('#atk-' + charNum).val();
    infoToStore.atkBonus = $('#atk-bonus-' + charNum).val();
    infoToStore.atkPenalty = $('#atk-penalty-' + charNum).val();
    infoToStore.atkSpur = $('#atk-spur-' + charNum).val();

    // speed
    infoToStore.spd = $('#spd-' + charNum).val();
    infoToStore.spdBonus = $('#spd-bonus-' + charNum).val();
    infoToStore.spdPenalty = $('#spd-penalty-' + charNum).val();
    infoToStore.spdSpur = $('#spd-spur-' + charNum).val();

    // defense
    infoToStore.def = $('#def-' + charNum).val();
    infoToStore.defBonus = $('#def-bonus-' + charNum).val();
    infoToStore.defPenalty = $('#def-penalty-' + charNum).val();
    infoToStore.defSpur = $('#def-spur-' + charNum).val();

    // resistance
    infoToStore.res = $('#res-' + charNum).val();
    infoToStore.resBonus = $('#res-bonus-' + charNum).val();
    infoToStore.resPenalty = $('#res-penalty-' + charNum).val();
    infoToStore.resSpur = $('#res-spur-' + charNum).val();

    // store info
    if (attacker) {
        attackerTeam[selectedAttacker] = infoToStore;
    } else {
        defenderTeam[selectedDefender] = infoToStore;
    }
}

// displays character information in the character panels
// singleChar contains only the character info to display, charNum determines which panel to display on, showHidden is true if we need to show or hide anything
function displayChar(charName, charNum, showHidden) {
    charNum = charNum.toString();

    var singleChar = charInfo[charName];

    if (!singleChar.hasOwnProperty("move_type")) { // no info -> custom option
        displayCustomChar(charName, charNum, showHidden);
        return;
    }

    // display portrait
    getPortrait((charNum === "1" ? "#tab-" + selectedAttacker.toString() + "-1" : "#tab-" + selectedDefender.toString() + "-2"), charName);
    getPortrait((charNum === "1" ? "#portrait-1" : "#portrait-2"), charName);
    getWeaponIcon((charNum === "1" ? "#weapon-icon-1" : "#weapon-icon-2"), singleChar.weapon_type);
    getMoveIcon((charNum === "1" ? "#move-icon-1" : "#move-icon-2"), singleChar.move_type);

    // show stat variants
    $("#char-build-info-" + charNum).show(200);

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
    $("#passive-s-" + charNum).val("None").attr('selected', 'selected');
    $("#passive-s-" + charNum).data("info", {});

    // show special skill
    var specials = "";
    var selectedSpecial = "";
    var defaultSpecials = {};

    if (singleChar.hasOwnProperty("special")) {
        selectedSpecial = singleChar.special[0];
        for (var specIndex = 0; specIndex < singleChar.special.length; specIndex++) {
            var specName = singleChar.special[specIndex];
            specials = "<option value=\"" + specName + "\">" + specialInfo[specName].name + "</option>" + specials;
            defaultSpecials[specName] = true;
        }
        specials = "<option value='None'>None</option>" + specials;
    } else {
        specials = "<option value='None'>None</option>";
        selectedSpecial = "None";
    }

    // get inherited specials
    for (var specKey in specialInfo) {
        if (isInheritable(specialInfo[specKey], charName) && !defaultSpecials.hasOwnProperty(specKey)) {
            specials += "<option class='inherit' value=\"" + specKey + "\">" + specialInfo[specKey].name + "</option>";
        }
    }

    // show cooldown values
    showSpecCooldown(selectedSpecial, charNum, true);

    // set values
    $("#special-" + charNum).html(specials);
    $("#special-" + charNum).val(selectedSpecial).attr('selected', 'selected'); //.trigger("change.select2");
    getSpecialData(charNum);

    // show assist skill
    var assists = "";
    var selectedAssist = "";
    var defaultAssists = {};

    if (singleChar.hasOwnProperty("assist")) {
        selectedAssist = singleChar.assist[0];
        for (var assistIndex = 0; assistIndex < singleChar.assist.length; assistIndex++) {
            var assistName = singleChar.assist[assistIndex];
            assists = "<option value=\"" + assistName + "\">" + assistInfo[assistName].name + "</option>" + assists;
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
            assists += "<option class='inherit' value=\"" + assistKey + "\">" + assistInfo[assistKey].name + "</option>";
        }
    }

    // set values
    $("#assist-" + charNum).html(assists);
    $("#assist-" + charNum).val(selectedAssist).attr('selected', 'selected'); //.trigger("change.select2");
    getAssistData(charNum);

    // show weapon
    var weapons = "";
    var selectedWeapon = singleChar.weapon[0];
    var defaultWeapons = {};

    for (var weaponIndex = 0; weaponIndex < singleChar.weapon.length; weaponIndex++) {
        var weaponName = singleChar.weapon[weaponIndex];
        weapons = "<option value=\"" + weaponName + "\">" + weaponInfo[weaponName].name + "</option>" + weapons;
        defaultWeapons[weaponName] = true;
    }
    weapons = "<option value='None'>None</option>" + weapons;

    // get inherited weapons
    for (var weaponKey in weaponInfo) {
        if (isInheritableWeapon(weaponInfo[weaponKey], charName) && !defaultWeapons.hasOwnProperty(weaponKey)) {
            weapons += "<option class='inherit' value=\"" + weaponKey + "\">" + weaponInfo[weaponKey].name + "</option>";
        }
    }

    $("#weapon-" + charNum).html(weapons);
    $("#weapon-" + charNum).val(selectedWeapon).attr('selected', 'selected'); //.trigger("change.select2");

    // show extra weapon info
    showWeapon(selectedWeapon, charNum, false, showHidden);
    $("#adjacent-" + charNum).val("0");

    // set default stat variant
    $("#level-" + charNum).val(40);
    $("#merge-" + charNum).val(0);
    $("#boon-" + charNum).val("neutral");
    $("#bane-" + charNum).val("neutral");

    // set rarities
    var rarities = "<option value='5'>5 Stars</option>";
    if (singleChar.hasOwnProperty("base_stat")) {
        for (var starIndex = 4; starIndex >= 1; starIndex--) {
            if (singleChar.base_stat.hasOwnProperty("star_" + starIndex.toString())) {
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

    // default state
    $("#status-section" + charNum).find(".mdc-switch__native-control").attr("checked", false);

    // show collapsed section
    $("#extra-char-info-" + charNum).hide(200);
}

function displayCustomChar(charName, charNum, showHidden) {
    // display portrait

    getPortrait((charNum === "1" ? "#tab-" + selectedAttacker.toString() + "-1" : "#tab-" + selectedDefender.toString() + "-2"), "Other");
    getPortrait((charNum === "1" ? "#portrait-1" : "#portrait-2"), "Other");
    getWeaponIcon((charNum === "1" ? "#weapon-1" : "#weapon-2"), $("#weapon-type-" + charNum).val());
    getMoveIcon((charNum === "1" ? "#move-1" : "#move-2"), $("#move-type-" + charNum).val());

    // enable inputs
    if ($("#one-vs-one").is(":checked") || ($("#one-vs-all").is(":checked") && charNum === "1") || ($("#all-vs-one").is(":checked") && charNum === "2")) {
        $("#extra-char-info-" + charNum).css("color", "white");
        $("#extra-char-info-" + charNum + " select").removeAttr("disabled");
    }

    // show collapsed section
    $("#extra-char-info-" + charNum).show(200);

    // hide stat variants
    $("#char-build-info-" + charNum).hide(200);

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
    $("#weapon-" + charNum).val(weapon).attr('selected', 'selected');
    if (weapon === "None") {
        $("#weapon-" + charNum).data("info", {});
    } else {
        $("#weapon-" + charNum).data("info", weaponInfo[weapon]);
    }

    // load in passive skills
    loadPassives("a", "#passive-a-" + charNum, true);
    $("#passive-a-" + charNum).val(passiveA).attr('selected', 'selected'); //.trigger("change.select2");
    getSkillData(charNum, "a", false);

    loadPassives("b", "#passive-b-" + charNum, true);
    $("#passive-b-" + charNum).val(passiveB).attr('selected', 'selected'); //.trigger("change.select2");
    getSkillData(charNum, "b", false);

    loadPassives("c", "#passive-c-" + charNum, true);
    $("#passive-c-" + charNum).val(passiveC).attr('selected', 'selected'); //.trigger("change.select2");
    getSkillData(charNum, "c", false);

    loadPassives("s", "#passive-s-" + charNum, true);
    $("#passive-s-" + charNum).val(seal).attr('selected', 'selected'); //.trigger("change.select2");
    getSkillData(charNum, "s", false);

    // load in assist skills
    loadAssists("#assist-" + charNum, true);
    $("#assist-" + charNum).val(assist).attr('selected', 'selected'); //.trigger("change.select2");
    getAssistData(charNum);

    // load in specials
    loadSpecials("#special-" + charNum);
    $("#special-" + charNum).val(special).attr('selected', 'selected'); //.trigger("change.select2");
    getSpecialData(charNum);

}
