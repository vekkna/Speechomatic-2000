/**
 * Makes a markov chain from the passed string and returns a new text made from that chain.
 * @param {string }input - The string from which the chain will be built
 * @returns {string} - The new, random text
 */
export function MakeRandomText(input) {

    let inputArray = input.split(' '),
        records = MakeMarkovChain(inputArray),

        // will contain the words of the final text.
        output = [],
        // get two words to start with and add them to output.
        startingWordsArr = GetStartingWords(inputArray),
        // length of output, approx. Will go a bit over this in order to end appropriately.
        numCount = 300,
        // counter to check when we've reached numCount;
        i = 0,
        // the current two words and the next word
        curr, next,
        // in case there is a problem and we need to try again. Not really needed, just in case.
        retry = false;

    output.push(' ' + startingWordsArr[0]);
    output.push(' ' + startingWordsArr[1]);

    while (true) {

        if (!output[i]) {
            retry = true;
            break;
        }
        // set curr to the most recent two words in the output
        curr = output[i].concat(output[i + 1]);
        i++;
        // get the next word based on the markov chain
        next = GetNextWord(curr, records);
        output.push(next);

        // If we have the needed word count AND the last word ended with a full stop end the process.
        // if we've gone far over the word count and still haven't found a full stop call it a day.
        if ((i > numCount && next.charAt(next.length - 1) === '.') || (i > numCount + 100)) {
            break;
        }
    }
    // If something has gone wrong try again.
    if (retry) {
        MakeRandomText(input);
    }
    return output.join(' ').trim();
}

/**
 * Makes a markov chain from an array of words. The chain contains all adjacent word pairs in the input array and a list of the words that follow them.
 * @param inputArray {Array}
 * @returns {{}} - The Markov chain is an object. Each word pair is a property name, and the list of following words that property's value.
 */
function MakeMarkovChain(inputArray) {

    // the output of this function is the records object described above.
    let records = {},
        // the two words currently being examined
        currentPair,
        // the word that follows the current pair
        currentFollow;

    for (let i = 0; i < inputArray.length - 1; i++) {
        currentPair = inputArray[i] + ' ' + inputArray[i + 1];
        currentFollow = inputArray[i + 2];
        if (currentFollow) {
            MakeEntry(currentPair, currentFollow, records);
        }
    }
    return records;
}

/**
 * Adds an entry to the chain
 * @param currPair {string} - The pair of words whose following word is to be recorded.
 * @param followingWord {string} - The word following the pair.
 * @param records {{}} - The chain object. Each pair is a property whose value is a list of words that follow that pair.
 */
function MakeEntry(currPair, followingWord, records) {
    // if those two words have already appeared, add the following word to their associated list
    if (records[currPair]) {
        records[currPair].push(followingWord);
    } else {
        // otherwise create such a list
        records[currPair] = [followingWord];
    }
}

/**
 * Finds two words to start the random text with by picking a words that comes after a full stop.
 * @param arr {Array} - The array of words the chain is made from.
 * @returns {*[]} - An array of two starting words.
 */
function GetStartingWords(arr) {
    // Find all words in the input array that end with a full stop.
    let endWords = arr.filter(word => {
        return word.charAt(word.length - 1) === '.';
    });
    // pick one of these at random.
    let word = endWords[GetRandomInt(endWords.length - 1)];
    let index = arr.indexOf(word);
    // The starting words will be the next two words.
    return [arr[index + 1], arr[index + 2]];
}

/**
 * Picks a words that can follow a preceding pair.
 * @param precedingPair {string} The two words whose following words we're picking from.
 * @param records {{}} - The markov chain object containing the words to pick from.
 * @returns {string} - The following word, picked at random from all words that can follow the preceding pair.
 */
function GetNextWord(precedingPair, records) {
    let followingWordArray = records[precedingPair.trim()];
    return ' ' + followingWordArray[GetRandomInt(followingWordArray.length)];
}

/**
 * Gets a random int
 * @param top {number} The maximum number returnable
 * @returns {number} - The random number
 */
function GetRandomInt(top) {
    return Math.floor(Math.random() * top);
}