// put options in the character selects
function setupChars() {

    setupHeroOptions();
    randomizeStartingHeroes();
    loadHeroesFromUrl();

    selectCharTab(true, 0);
    selectCharTab(false, 0);

    updateAllAttributeLinks()

    // simulate initial battle
    simBattle(getBattleInfo(), true);
}

function randomizeStartingHeroes() {
    //Number of characters contained in data.charInfo object
    var charCount = Object.keys(charInfo).length;

    //Subtracting 1 for custom char option at end of list (causes errors)
    charCount--;

    //Randomize default characters
    var charOne = Math.floor(Math.random() * charCount);
    var charTwo = Math.floor(Math.random() * charCount);

    // set default characters
    $('#char-1 option:eq(' + charOne + ')').attr('selected', 'selected');
    $('#char-2 option:eq(' + charTwo + ')').attr('selected', 'selected');

    //Display portrait and load default data
    displayChar($('#char-1').val(), 1, false);

    //Display portrait and load default data
    displayChar($('#char-2').val(), 2, false);
}

function setupHeroOptions() {
    // stores all character options
    var options = '';

    // retrieve characters and add them to the list of options
    for (var key in charInfo) {
        options += '<option value=\'' + key + '\'>' + charInfo[key].display + '</option>';
    }

    // add to html
    $('.char-selector').html(options);
}

function loadHeroesFromUrl() {
    var urlStr = window.location.href;
    var url = new URL(urlStr);

    url.searchParams.forEach(function(p, key) {
        var option = document.querySelector('#' + key + ' [value="' + p + '"]');

        var charNum = 1;
        if (key.indexOf('-2') !== -1) {
            charNum = 2;
        }

        if (option) {
            option.selected = true;
        }

        if (!isNaN(p)) {
            document.querySelector('#' + key).value = p;
        }

        switch (key) {
            case 'char-1':
                displayChar($('#char-1').val(), 1, false);
                break;
            case 'char-2':
                displayChar($('#char-2').val(), 2, false);
                break;
            case 'weapon-1':
            case 'weapon-2':
                showWeapon(p, charNum, true, false);
                break;
            case 'passive-a-1':
            case 'passive-a-2':
            case 'passive-b-1':
            case 'passive-b-2':
            case 'passive-c-1':
            case 'passive-c-2':
            case 'passive-s-1':
            case 'passive-s-2':
                var skillType = key.charAt(8);
                getSkillData(charNum, skillType, true);
                break;
            case 'rarity-1':
            case 'rarity-2':
                rarityUpdate(charNum, parseInt(p));
            case 'level-1':
            case 'level-2':
                displayStatTotals(charNum);
                break;
            case 'special-1':
            case 'special-2':
                getSpecialData(charNum);
            default:
                updateSpecCooldown(charNum);
                break;
        }

    });
}
