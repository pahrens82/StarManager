$(document).ready(function () {
    var abilities = $('#abilityScores');
    var ability_input = abilities.find('input');
    var point_counter = abilities.find('.points-remaining');
    var points = 0;
    var old_score = 0;
    var new_score = 0;

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
    });
});