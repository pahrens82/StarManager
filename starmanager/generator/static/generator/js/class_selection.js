$(document).ready(function () {
    var role = $('#classSelector');
    var class_details = $('#classDetails');
    var overview = $('#overview');

    role.on('change', function () {
        var target = $(this);

        var option = target.find('option:selected');

        if (option.val() !== '') {
            $.ajax({
                url: target.children().data('ajax-target'),
                method: "GET",
                data: {id: option.val()},
                dataType: 'json',
            }).done(function(data) {
                overview.find('.class-name').text(data.name);
                var current_hp = Number(overview.find('.hp').text());
                var new_hp = current_hp + Number(data.hit_points);
                overview.find('.hp').text(new_hp);
            }).fail(function(jqXHR, textStatus, errorThrown) {
                console.warn(textStatus);
                console.warn(jqXHR);
                alert(errorThrown + "\n\nSorry, please try again!\n");
            });
        }
    });
});