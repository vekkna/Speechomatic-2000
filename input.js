$(document).ready(function () {

    const checkboxes = [$('#socialism-checkbox'), $('#capitalism-checkbox'), $('#tolerance-checkbox'), $('#nationalism-checkbox')];
    const texts = [socialist, capitalist, tolerance, nationalist];
    
    $('#create-speech-btn').click(function () {
        var input = '';
        checkboxes.forEach(box => {
            if (box.prop('checked')) {
                input += texts[checkboxes.indexOf(box)] + ' ';
            }
        });
        if (!input) {
            alert("Check at least one box.");
            return;
        }

        var q = shuffle(qualities);
        $('#output-text').remove();
        $('body').append('<div id="output-text" class="top-pad container centre-contents fade-in"><h4 id="output-heading">' + q[0] + '. ' + q[1] + '. ' + q[2] + '.</h4><p>' + MakeRandomText(input) + '</p></div>');
        
        $('html, body').animate({scrollTop: $("#output-text").offset().top}, 2000);

    });
});

function shuffle(o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}