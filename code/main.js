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
// Remove any previous speech
    $('#output-text').remove();
// combine the texts of any political elements whose checkboxes are checked
    const input = politicalElements.filter(el => el.checkbox.checked).map(el => el.text).join();

    if (!input) {
        alert("Check at least one box.");
        return;
    }

    const speech = Markov.MakeRandomText(input);
    $('#output').append(MakeOutputHTML(speech));
    $('html, body').animate({scrollTop: $('#output').offset().top}, 2000);
});

function MakeOutputHTML(_speech) {
    // Shuffle the the politician's qualities
    const qualities = Texts.qualities.sort((a, b) => 0.5 - Math.random());
    return `<article id="output-text" class="text-box">
                <h4 id="output-heading"> ${qualities[0]}. ${qualities[1]}. ${qualities[2]}.</h4>
                    <p> ${_speech}</p>
                        </article>`;
}