function markdownBuild(charNum) {
    var exportText = '';
    if ($('#char-' + charNum).val() === 'Custom') {
        exportText += '## ' + customName($('#weapon-type-' + charNum).val(), $('#move-type-' + charNum).val()) + '<br><br>';
    } else {
        var hero = $('#char-' + charNum).val();
        if (hero.indexOf('(') !== -1) {
            hero = hero.substr(0, hero.indexOf('('));
        }

        exportText += '## [' + hero + '](https://kagerochart.com/search/' + hero + ') ';
        if ($('#boon-' + charNum).val() !== 'neutral' || $('#bane-' + charNum).val() !== 'neutral') {
            var boon = $('#boon-' + charNum).val();
            var bane = $('#bane-' + charNum).val();

            exportText += '[+' + boon.toUpperCase() + '/';
            exportText += '-' + bane.toUpperCase() + ']<br>';
        } else {
            exportText += '[Neutral]<br>';
        }

        exportText += parseInt($('#rarity-' + charNum).val()) !== 5 ? ' -- ' + $('#rarity-' + charNum).val().toString() + ' Star(s)' : '';
        exportText += parseInt($('#merge-' + charNum).val()) > 0 || parseInt($('#level-' + charNum).val()) !== 40 ? ' -- Lvl. ' + $('#level-' + charNum).val().toString() + '+' + $('#merge-' + charNum).val().toString(): '';
    }

    exportText += '<br>';

    // second line - stats
    exportText += '### Stats<br>';
    exportText += $('#hp-' + charNum).val().toString() + ' HP / ' + $('#atk-' + charNum).val().toString() + ' ATK / ' + $('#spd-' + charNum).val().toString() + ' SPD / ' + $('#def-' + charNum).val().toString() + ' DEF / ' + $('#res-' + charNum).val().toString() + ' RES' + '<br><br>';

    // all other lines - equipped weapons and skills
    exportText += '### Skills<br>';
    if ($('#weapon-' + charNum).val() !== 'None') {
        exportText += '**Weapon:** [' + $('#weapon-' + charNum).val() + '](https://kagerochart.com/hero/weapons/' + $('#weapon-' + charNum).val().toLowerCase().replace(' ', '-').replace('+', '-plus').replace(/plus([1-9])/, 'plus-$1').replace('--', '-') + ')<br>';
    }

    if ($('#assist-' + charNum).val() !== 'None' ) {
        exportText += '**Assist:** [' + $('#assist-' + charNum).val() + '](https://kagerochart.com/hero/assists/' + $('#assist-' + charNum).val().toLowerCase().replace(' ', '-').replace('+', '-plus').replace(/plus([1-9])/, 'plus-$1').replace('--', '-') + ')<br>';
    }

    if ($('#special-' + charNum).val() !== 'None' ) {
        exportText += '**Special:** [' + $('#special-' + charNum).val() + '](https://kagerochart.com/hero/specials/' + $('#special-' + charNum).val().toLowerCase().replace(' ', '-').replace('+', '-plus').replace(/plus([1-9])/, 'plus-$1').replace('--', '-') + ')<br>';
    }

    if ($('#passive-a-' + charNum).val() !== 'None' ) {
        exportText += '**Passive A:** [' + $('#passive-a-' + charNum).val() + '](https://kagerochart.com/hero/passives/' + $('#passive-a-' + charNum).val().toLowerCase().replace(' ', '-').replace('+', '-plus').replace(/plus([1-9])/, 'plus-$1').replace('--', '-') + ')<br>';
    }

    if ($('#passive-b-' + charNum).val() !== 'None') {
            exportText += '**Passive B:** [' + $('#passive-b-' + charNum).val() + '](https://kagerochart.com/hero/passives/' + $('#passive-b-' + charNum).val().toLowerCase().replace(' ', '-').replace('+', '-plus').replace(/plus([1-9])/, 'plus-$1').replace('--', '-') + ')<br>';
    }

    if ($('#passive-c-' + charNum).val() !== 'None') {
        exportText += '**Passive C:** [' + $('#passive-c-' + charNum).val() + '](https://kagerochart.com/hero/passives/' + $('#passive-c-' + charNum).val().toLowerCase().replace(' ', '-').replace('+', '-plus').replace(/plus([1-9])/, 'plus-$1').replace('--', '-') + ')<br>';
    }

    if ($('#passive-s-' + charNum).val() != 'None') {
        exportText += '**Sacred Seal:** ' + $('#passive-s-' + charNum).val() + '<br>';
    }

    exportText += '<br>';
    return exportText;
}
