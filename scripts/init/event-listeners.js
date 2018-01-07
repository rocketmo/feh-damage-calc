//Calc link snackbars
var snackbar = new mdc.snackbar.MDCSnackbar(document.getElementById('clipboard-snackbar'));

document.querySelectorAll('.calc-link').forEach(function(e, key) {
    var clipboard = new Clipboard(e, {
        text: function() {

            var fields;
            if (e.id === 'link-build-1') {
                fields = document.querySelectorAll('#attack-panel .link-field');
            }
            else if (e.id === 'link-build-2') {
                fields = document.querySelectorAll('#defend-panel .link-field');
            }
            else {
                fields = document.querySelectorAll('.char-info .tab-panel input, .char-selector');

            }

            url = window.location.href;
            if (url.includes('?')) {
                url = url.substring(0, url.indexOf('?'));
            }

            url += '?';

            fields.forEach(function(el, key) {
                url += el.id + '=' + el.value + '&';
            });

            url = url.substring(0, url.length-1);

            return url;
        }
    });
})

$('.calc-link').on('click', function(e, key) {

    var data =  {
        message: 'Link Copied to Clipboard',
        actionOnBottom: false,
        multiline: false,
        timeout: 2750
    };
    snackbar.show(data);
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
    $(this).attr("src", "/images/damage-calc/Portraits/Other.png");
});

// setup character tab changes
$(".char-tab, .char-tab-unselected").on("click", function() {
    selectCharTab($(this).data("charnum") === 1, $(this).data("index"));
    charChange($(this).data("charnum").toString());
    updateDisplay();
});

// setup character select
$(".char-selector").on("change", function() {
    var charNum = $(this).data("charnum").toString();
    displayChar(this.value, charNum, true);
    charChange(charNum);
    updateDisplay();
});

// setup weapon select
$(".weapon-selector").on("change", function (){
    var charNum = $(this).data("charnum").toString();
    showWeapon(this.value, charNum, true, true);
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
    getMoveIcon((charNum === "1" ? "#move-1" : "#move-2"), this.value);
    charChange(charNum);
    updateDisplay();
});

// set up weapon type changes
$(".weapon-type-selector").on("change", function (){
    var charNum = $(this).data("charnum").toString();
    loadWeapons(this.value, "#weapon-" + charNum, false);
    setColor(this.value, charNum);
    $("#weapon-" + charNum + " option:eq(1)").attr("selected", "selected").attr('selected', 'selected'); //.trigger("change.select2");
    getWeaponIcon((charNum === "1" ? "#weapon-1" : "#weapon-2"), this.value);
    showWeapon($("#weapon-" + charNum).val(), charNum, true, true);
    charChange(charNum);
    updateDisplay();
});

// summoner/ally support buffs
['#summoner-support-1, #summoner-support-2, #ally-support-1, #ally-support-2'].forEach(function(s) {
    $(s).on('change', function() {
        var charNum = $(this).data("charnum").toString();
        var type = this.id.includes('summoner') ? 'summoner' : 'ally';
        changeSupportBuff(this.value, type, charNum);
        charChange(charNum);
        updateDisplay();
    });
});


// set up weapon type changes for overrides
$("#override-weapon-type").on("change", function (){
    var selectedWeapon = $("#override-weapon").val();
    loadWeapons(this.value, "#override-weapon", true);
    $("#override-weapon").html("<option value='No Override'>No Override</option>" + $("#override-weapon").html());
    keepTable = false;

    if (selectedWeapon === "No Override" || selectedWeapon === "None" || this.value === "Any" || weaponInfo[selectedWeapon].type === this.value) {
        $("#override-weapon").val(selectedWeapon).attr('selected', 'selected'); //.trigger("change.select2");
    } else {
        $("#override-weapon option:eq(0)").attr("selected", "selected").attr('selected', 'selected'); //.trigger("change.select2");
        $("#override-adjacent-block").hide(500);
        $("#override-adjacent").val("0");
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
    $("#weapon-" + charNum + " option:eq(1)").attr("selected", "selected").attr('selected', 'selected'); //.trigger("change.select2");
    getWeaponIcon((charNum === "1" ? "#weapon-1" : "#weapon-2"), $("#weapon-type-" + charNum).val());
    showWeapon($("#weapon-" + charNum).val(), charNum, true, true);
    charChange(charNum);
    updateDisplay();
});

// setup other battle value changes
var miscFields = ["adjacent-select", "battle-val"];
miscFields.forEach(function(field) {
    $("." + field + ", .mdc-switch__native-control").on("change", function() {
        if ($(this).data("charnum") !== undefined) {
            charChange($(this).data("charnum").toString());
            updateDisplay();
        }
    });
});

// swap button
$(".swap-btn").on("click", function() {
    swap();
    keepTable = false;
    updateDisplay();
});

// change mode
$("input[type=radio][name=mode]").on("change", function() {
    if (initFilters) {
        $("#matchup-filter-name").val("");
        //$("select.multi-select").multipleSelect("checkAll");
        initFilters = false;
    }

    updateDisplay();
    if (this.id === "one-vs-one") {
        $("#battle-log").stop(true, true).show(200);
        $("#matchups").stop(true, true).hide(200);
        $("#matchup-panel").stop(true, true).hide(200);

        // enable all inputs
        enableCharPanel("1", true);
        enableCharPanel("2", true);

        $("#matchup-buttons").hide();
    }
    else {
        $("#matchup-buttons").show();
    }

    if (this.id === "one-vs-all") {
        $("#battle-log").stop(true, true).hide(200);
    //    $("#single-combat").stop(true, true).hide(200);
        $("#matchups").stop(true, true).show(200);
        $("#matchup-panel").stop(true, true).show(200);

        // disable defender input, enable attacker input
        enableCharPanel("1", true);
        enableCharPanel("2", false);

        // update info
        previousTable = true;
        recolorMatchupRows();
    }
    if (this.id === "all-vs-one") {
        $("#battle-log").stop(true, true).hide(200);
        $("#matchups").stop(true, true).show(200);
        $("#matchup-panel").stop(true, true).show(200);

        // disable attacker input, enable defender input
        enableCharPanel("1", false);
        enableCharPanel("2", true);

        // update info
        previousTable = false;
        recolorMatchupRows();
    }
});

// update table when filters are changed
$("#matchup-filters input").on("change", function() {
    if (!resetFilterLock) {
        if (this.id === "matchup-filter-name") {
            filterMatchupTable(false);
        } else {
            filterMatchupTable(true);
        }
    }
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
    $("#override-weapon").val("No Override").attr('selected', 'selected'); //.trigger("change.select2");

    $("#override-passive-a").val("No Override").attr('selected', 'selected'); //.trigger("change.select2");
    $("#override-passive-b").val("No Override").attr('selected', 'selected'); //.trigger("change.select2");
    $("#override-passive-c").val("No Override").attr('selected', 'selected'); //.trigger("change.select2");
    $("#override-assist").val("No Override").attr('selected', 'selected'); //.trigger("change.select2");
    $("#override-special").val("No Override").attr('selected', 'selected'); //.trigger("change.select2");
    $("#override-spec-cooldown").val("max");
    $("#override-passive-s").val("No Override").attr('selected', 'selected'); //.trigger("change.select2");

    $(".override-stat").val(0);
    $("#override-curr-hp").val(100);

    $("#override-terrain").val("Default");

    $("#override-adjacent-block").hide(500);
    $("#override-adjacent").val("0");

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
    var attacker = (this.id === "clear-1");
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

//matchup-filter-dismiss
$('button#matchup-filter-dismiss').on('click', function() {
    $('#matchup-filters').stop(true, true).hide(200)
});

//matchup-filter-dismiss
$('button#overrides-dismiss').on('click', function() {
    $('#overrides').stop(true, true).hide(200)
});

//Reset HP
$('button.refresh-hp').on('click', function() {
    $('#curr-hp-1').val($('#hp-1').val());
    $('#curr-hp-2').val($('#hp-2').val());
    charChange(1);
    charChange(2);
    updateDisplay();
});

// reset filters
$('#matchup-filter-reset').on('click', function() {
    resetFilterLock = true;
    $('#matchup-filter-name').val('');
    var boxes = document.querySelectorAll('#matchup-filters input[type=\'checkbox\']');
    boxes.forEach(function(b) {
        b.checked = true;
    });
    resetFilterLock = false;
    filterMatchupTable(true);
});

$("#matchup-override-button").on('click', function() {
    $("#matchup-overrides").toggle(200);
    $("#matchup-filters").hide(200);
});

$("#matchup-filter-button").on('click', function() {
    $("#matchup-filters").toggle(200);
        $("#matchup-overrides").hide(200);
});

// update button
$(".draw-update").on("click", function() {
    var oldBA = simBattle(getBattleInfo(), false);

    // update attacker
    if (oldBA.attacker.currHP <= 0) {
        $("#curr-hp-1").val(1);
        $("#spec-cooldown-1").val(getSpecialCooldown(oldBA.attacker.specialData, oldBA.attacker.weaponData, oldBA.attacker.assistData));
        $("#attack-panel .stat-bonus, #attack-panel .stat-penalty, #attack-panel .stat-spur").val(0);
        $("#panic-status-1").prop("checked", false);
        $("#candlelight-status-1").prop("checked", false);
        $("#defensive-terrain-1").prop("checked", false);
    } else {
        $("#curr-hp-1").val(Math.max(oldBA.attacker.currHP, 1));
        $("#spec-cooldown-1").val(Math.max(oldBA.attacker.specCurrCooldown, 0));
        $("#atk-penalty-1").val(oldBA.attacker.atkPenalty);
        $("#spd-penalty-1").val(oldBA.attacker.spdPenalty);
        $("#def-penalty-1").val(oldBA.attacker.defPenalty);
        $("#res-penalty-1").val(oldBA.attacker.resPenalty);
        $("#atk-bonus-1").val(oldBA.attacker.atkBonus);
        $("#spd-bonus-1").val(oldBA.attacker.spdBonus);
        $("#def-bonus-1").val(oldBA.attacker.defBonus);
        $("#res-bonus-1").val(oldBA.attacker.resBonus);
        $("#panic-status-1").prop("checked", oldBA.attacker.status.panic);
        $("#candlelight-status-1").prop("checked", oldBA.attacker.status.candlelight);
    }

    // update defender
    if (oldBA.defender.currHP <= 0) {
        $("#curr-hp-2").val(1);
        $("#spec-cooldown-2").val(getSpecialCooldown(oldBA.defender.specialData, oldBA.defender.weaponData, oldBA.defender.assistData));
        $("#defend-panel .stat-bonus, #defend-panel .stat-penalty, #defend-panel .stat-spur").val(0);
        $("#panic-status-2").prop("checked", false);
        $("#candlelight-status-2").prop("checked", false);
        $("#defensive-terrain-2").prop("checked", false);
    } else {
        $("#curr-hp-2").val(Math.max(oldBA.defender.currHP, 1));
        $("#spec-cooldown-2").val(Math.max(oldBA.defender.specCurrCooldown, 0));
        $("#atk-penalty-2").val(oldBA.defender.atkPenalty);
        $("#spd-penalty-2").val(oldBA.defender.spdPenalty);
        $("#def-penalty-2").val(oldBA.defender.defPenalty);
        $("#res-penalty-2").val(oldBA.defender.resPenalty);
        $("#atk-bonus-2").val(oldBA.defender.atkBonus);
        $("#spd-bonus-2").val(oldBA.defender.spdBonus);
        $("#def-bonus-2").val(oldBA.defender.defBonus);
        $("#res-bonus-2").val(oldBA.defender.resBonus);
        $("#panic-status-2").prop("checked", oldBA.defender.status.panic);
        $("#candlelight-status-2").prop("checked", oldBA.defender.status.candlelight);
    }

    // sim battle again
    simBattle(getBattleInfo(), true);
});
