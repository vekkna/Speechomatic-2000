const checkboxes = [$('#socialism-checkbox'), $('#capitalism-checkbox'), $('#tolerance-checkbox'), $('#nationalism-checkbox')];
const texts = [socialist, capitalist, tolerance, nationalist]; // found in texts.js


$('#create-speech-btn').click(function () {

    //create a big string of the selected elements, which will be passed to MakeRandomSpeech(), below.
    let input = '';
    checkboxes.forEach(box => {
        if (box.prop('checked')) {
            input += texts[checkboxes.indexOf(box)] + ' ';
        }
    });

    if (!input) {
        alert("Check at least one box.");
        return;
    }
// shuffle the qualities, which are found in text.js
    const q = qualities.sort((a, b) => 0.5 - Math.random());
    $('#output-text').remove();

    // build a new output text with three random qualities and a markov chain made from the selected elements

    $('#output').append('<div id="output-text" class="text-box"><h4 id="output-heading">' + q[0] + '. ' + q[1] + '. ' + q[2] + '.</h4><p>' + MakeRandomText(input) + '</p></div>');

  //  $('html, body').animate({scrollTop: $("#output-text").offset().top}, 2000);

});