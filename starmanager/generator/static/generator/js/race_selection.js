$(document).ready(function () {
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

    race.on('change', function () {
        var target = $(this);

        var option = target.find('option:selected');

        var strength = Number($('#id_strength').val());
        var dexterity = Number($('#id_dexterity').val());
        var constitution = Number($('#id_constitution').val());
        var intelligence = Number($('#id_intelligence').val());
        var wisdom = Number($('#id_wisdom').val());
        var charisma = Number($('#id_charisma').val());

        if (option.val() !== '') {
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
                race_details.find('.race-hp').text(race.hit_points);

                overview.find('.race-name').text(race.name);
                overview.find('.race-description').text(race.initial_description);
                overview.find('.race-hp').text('Racial: ' + race.hit_points);

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

                race_details.find('.first-racial-ability-name').text(data[1].name)
                race_details.find('.first-racial-ability-description').text(data[1].description)
                race_details.find('.second-racial-ability-name').text(data[2].name)
                race_details.find('.second-racial-ability-description').text(data[2].description)
                race_details.find('.third-racial-ability-name').text(data[3].name)
                race_details.find('.third-racial-ability-description').text(data[3].description)
                race_details.find('.fourth-racial-ability-name').text(data[4].name)
                race_details.find('.fourth-racial-ability-description').text(data[4].description)

                overview.find('.racial-abilities').text(data[1].name + ', ' + data[2].name + ', ' + data[3].name + ', ' + data[4].name)

                $('#raceDetails').find('.physical').text(race.physical_description);
                $('#raceDetails').find('.homeworld').text(race.homeworld);
                $('#raceDetails').find('.society-alignment').text(race.society_alignment);
            }).fail(function(jqXHR, textStatus, errorThrown) {
                console.warn(textStatus);
                console.warn(jqXHR);
                alert(errorThrown + "\n\nSorry, please try again!\n");
            });
        } else {
            $('#id_strength').attr({'min': theme_str_mod + 10}).val(theme_str_mod + 10);
            $('#id_dexterity').attr({'min': theme_dex_mod + 10}).val(theme_dex_mod + 10);
            $('#id_constitution').attr({'min': theme_con_mod + 10}).val(theme_con_mod + 10);
            $('#id_intelligence').attr({'min': theme_int_mod + 10}).val(theme_int_mod + 10);
            $('#id_wisdom').attr({'min': theme_wis_mod + 10}).val(theme_wis_mod + 10);
            $('#id_charisma').attr({'min': theme_cha_mod + 10}).val(theme_cha_mod + 10);
        }
    });
});