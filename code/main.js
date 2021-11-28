import * as Texts from './texts.js';
import * as Markov from './markov.js'

class PoliticalElement {
    constructor(_checkbox, _text) {
        this.checkbox = _checkbox;
        this.text = _text;
    }
}

const politicalElements = [
    new PoliticalElement(document.querySelector('#socialism-checkbox'), Texts.socialist),
    new PoliticalElement(document.querySelector('#capitalism-checkbox'), Texts.capitalist),
    new PoliticalElement(document.querySelector('#tolerance-checkbox'), Texts.tolerance),
    new PoliticalElement(document.querySelector('#nationalism-checkbox'), Texts.nationalist)];

$('#create-speech-btn').click(function () {

    $('#output-text').remove();
    const qualities = Texts.qualities.sort((a, b) => 0.5 - Math.random());
    const input = politicalElements.filter(el => el.checkbox.checked).map(el => el.text).join();

    if (!input) {
        alert("Check at least one box.");
        return;
    }
    // build a new output text with three random qualities and a markov chain made from the selected elements
    const speech = Markov.MakeRandomText(input);
    $('#output').append(MakeOutputHTML(qualities, speech));
    //   $('html, body').animate({scrollTop: $('#output').offset().top}, 2000);
});

function MakeOutputHTML(_qualities, _speech) {
    return `<div id="output-text" class="text-box"><h4 id="output-heading"> ${_qualities[0]}. ${_qualities[1]}. ${_qualities[2]}.</h4><p> ${_speech}</p></div>`;
}