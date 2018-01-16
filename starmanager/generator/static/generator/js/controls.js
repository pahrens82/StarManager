$(document).ready(function () {
    var abilities = $('#abilityScores');

    var race_selected = 0;
    var theme_selected = 0;
    var class_selected = 0;

    var ability_input = abilities.find('input[type="number"]');
    var human_ability = abilities.find('.human-ability');
    var theme_ability = abilities.find('.theme-ability');
    var point_counter = abilities.find('.points-remaining');
    var points = 0;
    var old_score = 0;
    var new_score = 0;
    var target = '';
    var target_id = '';
    var old_target = '';
    var old_target_id = '';
    var human_values = 10;
    var themeless_values = 10;

    ability_input
    .on('mousedown', function () {
        old_score = Number($(this).val());
    })
    .on('mouseup', function () {
        new_score = Number($(this).val());
        points = Number(point_counter.text()) + (old_score - new_score);

        if (points >= 0) {
            point_counter.text(points);
        } else {
            point_counter.text(0);
            $(this).val(new_score + points)
        }

        if (Number(point_counter.text()) === 0) {
            $('#save').attr('disabled', false);
        } else {
            $('#save').attr('disabled', true);
        }
    });

    human_ability.on('change', function () {
        target = $(this).parent('td').siblings('td').find('input[type="number"]');
        target_id = target.attr('id');
        var others = human_ability.not($(this));

        if (old_target_id == target_id) {
            if (old_target.length) {
                old_target.val(Number(old_target.val()) - 2).attr({'min': 10});
            }
            old_target = '';
            old_target_id = '';
        } else {
            others.prop('checked', false);
            target.val(Number(target.val()) + 2).attr({'min': 12});
            if (old_target.length) {
                old_target.val(Number(old_target.val()) - 2).attr({'min': 10});
            }
            old_target = target;
            old_target_id = target_id;
        }
    });

    theme_ability.on('change', function () {
        target = $(this).parent('td').siblings('td').find('input[type="number"]');
        target_id = target.attr('id');
        var others = theme_ability.not($(this));

        if (old_target_id == target_id) {
            if (old_target.length) {
                old_target.val(Number(old_target.val()) - 1).attr({'min': 10});
            }
            old_target = '';
            old_target_id = '';
        } else {
            others.prop('checked', false);
            target.val(Number(target.val()) + 1).attr({'min': 11});
            if (old_target.length) {
                old_target.val(Number(old_target.val()) - 1).attr({'min': 10});
            }
            old_target = target;
            old_target_id = target_id;
        }
    });


    var race = $('#raceSelector');
    var race_details = $('#raceDetails');
    var overview = $('#overview');

    var race_str_mod = 0;
    var race_dex_mod = 0;
    var race_con_mod = 0;
    var race_int_mod = 0;
    var race_wis_mod = 0;
    var race_cha_mod = 0;

    var theme_str_mod = 0;
    var theme_dex_mod = 0;
    var theme_con_mod = 0;
    var theme_int_mod = 0;
    var theme_wis_mod = 0;
    var theme_cha_mod = 0;
    var racial_hp = 0;
    var class_hp = 0;

    race.on('change', function () {
        var target = $(this);

        var option = target.find('option:selected');

        if (option.text() === 'Human') {
            human_ability.prop('hidden', false);
        } else {
            human_ability.prop('hidden', true).prop('checked', false);
        }

        var strength = Number($('#id_strength').val());
        var dexterity = Number($('#id_dexterity').val());
        var constitution = Number($('#id_constitution').val());
        var intelligence = Number($('#id_intelligence').val());
        var wisdom = Number($('#id_wisdom').val());
        var charisma = Number($('#id_charisma').val());

        if (option.val() !== '') {
            race_selected = 1;

            if (race_selected === 1 && theme_selected === 1 && class_selected ===1) {
                abilities.siblings('button').attr('disabled', false);
            } else {
                abilities.siblings('button').attr('disabled', true);
            }

            $.ajax({
                url: target.children().data('ajax-target'),
                method: "GET",
                data: {id: option.val()},
                dataType: 'json',
            }).done(function(data) {
                var race = data[0];
                race_details.find('.race-name').text(race.name);
                race_details.find('.description').text(race.initial_description);
                race_details.find('.size').text(race.size);
                race_details.find('.type').text('Type: ' + race.type + ', Subtype: ' + race.subtype);
                racial_hp = Number(race.hit_points);
                race_details.find('.race-hp').text('').text(racial_hp);

                race_details.find('.strength-modifier').text(race.strength);
                race_details.find('.dexterity-modifier').text(race.dexterity);
                race_details.find('.constitution-modifier').text(race.constitution);
                race_details.find('.intelligence-modifier').text(race.intelligence);
                race_details.find('.wisdom-modifier').text(race.wisdom);
                race_details.find('.charisma-modifier').text(race.charisma);

                race_str_mod = Number(race.strength);
                race_dex_mod = Number(race.dexterity);
                race_con_mod = Number(race.constitution);
                race_int_mod = Number(race.intelligence);
                race_wis_mod = Number(race.wisdom);
                race_cha_mod = Number(race.charisma);

                $('#id_strength').attr({'min': race_str_mod + theme_str_mod + 10}).val(race_str_mod + theme_str_mod + 10);
                $('#id_dexterity').attr({'min': race_dex_mod + theme_dex_mod + 10}).val(race_dex_mod + theme_dex_mod + 10);
                $('#id_constitution').attr({'min': race_con_mod + theme_con_mod + 10}).val(race_con_mod + theme_con_mod + 10);
                $('#id_intelligence').attr({'min': race_int_mod + theme_int_mod + 10}).val(race_int_mod + theme_int_mod + 10);
                $('#id_wisdom').attr({'min': race_wis_mod + theme_wis_mod + 10}).val(race_wis_mod + theme_wis_mod + 10);
                $('#id_charisma').attr({'min': race_cha_mod + theme_cha_mod + 10}).val(race_cha_mod + theme_cha_mod + 10);

                if (Number(data[1].level) <= 20) {
                    race_details.find('.first-racial-feature-name').text(data[1].name)
                    race_details.find('.first-racial-feature-description').text(data[1].description)
                }
                if (Number(data[2].level) <= 20) {
                    race_details.find('.second-racial-feature-name').text(data[2].name)
                    race_details.find('.second-racial-feature-description').text(data[2].description)
                }
                if (Number(data[3].level) <= 20) {
                    race_details.find('.third-racial-feature-name').text(data[3].name)
                    race_details.find('.third-racial-feature-description').text(data[3].description)
                }
                if (Number(data[4].level) <= 20) {
                    race_details.find('.fourth-racial-feature-name').text(data[4].name)
                    race_details.find('.fourth-racial-feature-description').text(data[4].description)
                }





                overview.find('.race-name').text(race.name);
                overview.find('.race-description').text(race.initial_description);
                overview.find('.hp').text('').text(racial_hp + class_hp);
                overview.find('.racial-features').text(data[1].name + ', ' + data[2].name + ', ' + data[3].name + ', ' + data[4].name)

                $('#raceDetails').find('.physical').text(race.physical_description);
                $('#raceDetails').find('.homeworld').text(race.homeworld);
                $('#raceDetails').find('.society-alignment').text(race.society_alignment);
            }).fail(function(jqXHR, textStatus, errorThrown) {
                console.warn(textStatus);
                console.warn(jqXHR);
                alert(errorThrown + "\n\nSorry, please try again!\n");
            });
        } else {
            race_selected = 0;
            race_details.find('.race-name').text('');
            race_details.find('.description').text('');
            race_details.find('.size').text('');
            race_details.find('.type').text('');
            racial_hp = 0;
            race_details.find('.race-hp').text('');

            race_details.find('.strength-modifier').text('0');
            race_details.find('.dexterity-modifier').text('0');
            race_details.find('.constitution-modifier').text('0');
            race_details.find('.intelligence-modifier').text('0');
            race_details.find('.wisdom-modifier').text('0');
            race_details.find('.charisma-modifier').text('0');

            $('#id_strength').attr({'min': theme_str_mod + 10}).val(theme_str_mod + 10);
            $('#id_dexterity').attr({'min': theme_dex_mod + 10}).val(theme_dex_mod + 10);
            $('#id_constitution').attr({'min': theme_con_mod + 10}).val(theme_con_mod + 10);
            $('#id_intelligence').attr({'min': theme_int_mod + 10}).val(theme_int_mod + 10);
            $('#id_wisdom').attr({'min': theme_wis_mod + 10}).val(theme_wis_mod + 10);
            $('#id_charisma').attr({'min': theme_cha_mod + 10}).val(theme_cha_mod + 10);

            race_details.find('.first-racial-feature-name').text('')
            race_details.find('.first-racial-feature-description').text('')
            race_details.find('.second-racial-feature-name').text('')
            race_details.find('.second-racial-feature-description').text('')
            race_details.find('.third-racial-feature-name').text('')
            race_details.find('.third-racial-feature-description').text('')
            race_details.find('.fourth-racial-feature-name').text('')
            race_details.find('.fourth-racial-feature-description').text('')

            overview.find('.race-name').text('');
            overview.find('.race-description').text('');
            overview.find('.hp').text('').text(class_hp);
            overview.find('.racial-features').text('')

            $('#raceDetails').find('.physical').text('');
            $('#raceDetails').find('.homeworld').text('');
            $('#raceDetails').find('.society-alignment').text('');
        }
    });

    var theme = $('#themeSelector');
    var theme_details = $('#themeDetails');

    theme.on('change', function () {
        var target = $(this);

        var option = target.find('option:selected');

        if (option.text() === 'Themeless') {
            theme_ability.prop('hidden', false);
        } else {
            theme_ability.prop('hidden', true).prop('checked', false);
        }

        if (option.val() !== '') {
            theme_selected = 1;

            if (race_selected === 1 && theme_selected === 1 && class_selected ===1) {
                abilities.siblings('button').attr('disabled', false);
            } else {
                abilities.siblings('button').attr('disabled', true);
            }

            $.ajax({
                url: target.children().data('ajax-target'),
                method: "GET",
                data: {id: option.val()},
                dataType: 'json',
            }).done(function(data) {
                var theme = data[0];

                theme_details.find('.theme-name').text(theme.name);

                theme_details.find('.description').text(theme.description);

                theme_details.find('.strength-modifier').text(theme.strength);
                theme_details.find('.dexterity-modifier').text(theme.dexterity);
                theme_details.find('.constitution-modifier').text(theme.constitution);
                theme_details.find('.intelligence-modifier').text(theme.intelligence);
                theme_details.find('.wisdom-modifier').text(theme.wisdom);
                theme_details.find('.charisma-modifier').text(theme.charisma);

                theme_str_mod = Number(theme.strength);
                theme_dex_mod = Number(theme.dexterity);
                theme_con_mod = Number(theme.constitution);
                theme_int_mod = Number(theme.intelligence);
                theme_wis_mod = Number(theme.wisdom);
                theme_cha_mod = Number(theme.charisma);

                $('#id_strength').attr({'min': race_str_mod + theme_str_mod + 10}).val(race_str_mod + theme_str_mod + 10);
                $('#id_dexterity').attr({'min': race_dex_mod + theme_dex_mod + 10}).val(race_dex_mod + theme_dex_mod + 10);
                $('#id_constitution').attr({'min': race_con_mod + theme_con_mod + 10}).val(race_con_mod + theme_con_mod + 10);
                $('#id_intelligence').attr({'min': race_int_mod + theme_int_mod + 10}).val(race_int_mod + theme_int_mod + 10);
                $('#id_wisdom').attr({'min': race_wis_mod + theme_wis_mod + 10}).val(race_wis_mod + theme_wis_mod + 10);
                $('#id_charisma').attr({'min': race_cha_mod + theme_cha_mod + 10}).val(race_cha_mod + theme_cha_mod + 10);

                theme_details.find('.first-theme-feature-name').text(data[1].name + ', Level ' + data[1].level)
                theme_details.find('.first-theme-feature-description').text(data[1].description)
                theme_details.find('.second-theme-feature-name').text(data[2].name + ', Level ' + data[2].level)
                theme_details.find('.second-theme-feature-description').text(data[2].description)
                theme_details.find('.third-theme-feature-name').text(data[3].name + ', Level ' + data[3].level)
                theme_details.find('.third-theme-feature-description').text(data[3].description)
                theme_details.find('.fourth-theme-feature-name').text(data[4].name + ', Level ' + data[4].level)
                theme_details.find('.fourth-theme-feature-description').text(data[4].description)

                overview.find('.theme-name').text(theme.name);
                overview.find('.theme-features').text(data[1].name + ', ' + data[2].name + ', ' + data[3].name + ', ' + data[4].name)

            }).fail(function(jqXHR, textStatus, errorThrown) {
                console.warn(textStatus);
                console.warn(jqXHR);
                alert(errorThrown + "\n\nSorry, please try again!\n");
            });
        } else {
            theme_selected = 0;
            theme_details.find('.theme-name').text('');

            theme_details.find('.description').text('');

            theme_details.find('.strength-modifier').text('0');
            theme_details.find('.dexterity-modifier').text('0');
            theme_details.find('.constitution-modifier').text('0');
            theme_details.find('.intelligence-modifier').text('0');
            theme_details.find('.wisdom-modifier').text('0');
            theme_details.find('.charisma-modifier').text('0');

            $('#id_strength').attr({'min': race_str_mod + theme_str_mod + 10}).val(race_str_mod + 10);
            $('#id_dexterity').attr({'min': race_dex_mod + 10}).val(race_dex_mod + 10);
            $('#id_constitution').attr({'min': race_con_mod + 10}).val(race_con_mod + 10);
            $('#id_intelligence').attr({'min': race_int_mod + 10}).val(race_int_mod + 10);
            $('#id_wisdom').attr({'min': race_wis_mod + 10}).val(race_wis_mod + 10);
            $('#id_charisma').attr({'min': race_cha_mod + 10}).val(race_cha_mod + 10);

            theme_details.find('.first-theme-feature-name').text('')
            theme_details.find('.first-theme-feature-description').text('')
            theme_details.find('.second-theme-feature-name').text('')
            theme_details.find('.second-theme-feature-description').text('')
            theme_details.find('.third-theme-feature-name').text('')
            theme_details.find('.third-theme-feature-description').text('')
            theme_details.find('.fourth-theme-feature-name').text('')
            theme_details.find('.fourth-theme-feature-description').text('')

            overview.find('.theme-name').text('');
            overview.find('.theme-features').text('')
        }
    });

    var role = $('#classSelector');
    var class_details = $('#classDetails');
    var overview = $('#overview');

    role.on('change', function () {
        var target = $(this);

        var option = target.find('option:selected');

        if (option.val() !== '') {
            class_selected = 1;

            if (race_selected === 1 && theme_selected === 1 && class_selected ===1) {
                abilities.siblings('button').attr('disabled', false);
            } else {
                abilities.siblings('button').attr('disabled', true);
            }

            $.ajax({
                url: target.children().data('ajax-target'),
                method: "GET",
                data: {id: option.val()},
                dataType: 'json',
            }).done(function(data) {
                class_details.find('.class-name').text(data.name);
                class_details.find('.description').text(data.description);
                class_hp = Number(data.hit_points);
                class_details.find('.class-hp').text('').text(class_hp);
                class_details.find('.stamina').text(data.stamina);
                class_details.find('.bab').text(data.bab);
                class_details.find('.fort').text(data.fort);
                class_details.find('.ref').text(data.ref);
                class_details.find('.will').text(data.will);
                class_details.find('.armor').text(data.armor);
                class_details.find('.weapon').text(data.weapon);
                class_details.find('.skills').text(data.skills);

                overview.find('.class-name').text(data.name);
                overview.find('.hp').text('').text(racial_hp + class_hp);
                overview.find('.stamina').text(data.stamina);
                overview.find('.bab').text(data.bab);
                overview.find('.fort').text(data.fort);
                overview.find('.ref').text(data.ref);
                overview.find('.will').text(data.will);
                overview.find('.armor').text(data.armor);
                overview.find('.weapon').text(data.weapon);
            }).fail(function(jqXHR, textStatus, errorThrown) {
                console.warn(textStatus);
                console.warn(jqXHR);
                alert(errorThrown + "\n\nSorry, please try again!\n");
            });
        } else {
            class_selected = 0;
            class_details.find('.class-name').text('');
            class_details.find('.description').text('');
            class_hp = 0;
            class_details.find('.class-hp').text('');
            class_details.find('.stamina').text('');
            class_details.find('.bab').text('');
            class_details.find('.fort').text('');
            class_details.find('.ref').text('');
            class_details.find('.will').text('');
            class_details.find('.armor').text('');
            class_details.find('.weapon').text('');

            overview.find('.class-name').text('');
            overview.find('.hp').text('').text(racial_hp + 0);
            overview.find('.stamina').text('');
            overview.find('.bab').text('');
            overview.find('.fort').text('');
            overview.find('.ref').text('');
            overview.find('.will').text('');
            overview.find('.armor').text('');
            overview.find('.weapon').text('');
        }
    });

    $('input,textarea,select').filter('[required]').parent().parent().find("label").append("*");
});