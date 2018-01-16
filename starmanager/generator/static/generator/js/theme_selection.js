$(document).ready(function () {
    var theme = $('#themeSelector');
    var theme_details = $('#themeDetails');

    theme.on('change', function () {
        var target = $(this);

        var option = target.find('option:selected');

        if (option.val() !== '') {
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

                theme_details.find('.first-theme-ability-name').text(data[1].name + ', Level ' + data[1].level)
                theme_details.find('.first-theme-ability-description').text(data[1].description)
                theme_details.find('.second-theme-ability-name').text(data[2].name + ', Level ' + data[2].level)
                theme_details.find('.second-theme-ability-description').text(data[2].description)
                theme_details.find('.third-theme-ability-name').text(data[3].name + ', Level ' + data[3].level)
                theme_details.find('.third-theme-ability-description').text(data[3].description)
                theme_details.find('.fourth-theme-ability-name').text(data[4].name + ', Level ' + data[4].level)
                theme_details.find('.fourth-theme-ability-description').text(data[4].description)
            }).fail(function(jqXHR, textStatus, errorThrown) {
                console.warn(textStatus);
                console.warn(jqXHR);
                alert(errorThrown + "\n\nSorry, please try again!\n");
            });
        } else {
            $('#id_strength').attr({'min': race_str_mod + theme_str_mod + 10}).val(race_str_mod + 10);
            $('#id_dexterity').attr({'min': race_dex_mod + 10}).val(race_dex_mod + 10);
            $('#id_constitution').attr({'min': race_con_mod + 10}).val(race_con_mod + 10);
            $('#id_intelligence').attr({'min': race_int_mod + 10}).val(race_int_mod + 10);
            $('#id_wisdom').attr({'min': race_wis_mod + 10}).val(race_wis_mod + 10);
            $('#id_charisma').attr({'min': race_cha_mod + 10}).val(race_cha_mod + 10);
        }
    });
});