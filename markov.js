/* Breaks an input string into a markov chain and generates a random text from it*/

// Adds an entry to the markov chain. The chain in an object, each entry is a property: value pair, the property being the two adjacent words in the text, the value being the array of words that follow them.
function MakeEntry(currPair, followingWord, records) {
    if (records[currPair]) {
        records[currPair].push(followingWord);
    } else {
        records[currPair] = [followingWord];
    }
}

// Helper function used to get random elements from lists
function GetRandomInt(top) {
    return Math.floor(Math.random() * top);
}

// Function to make the chain. Takes an array of words that was made by splitting a long text string.
function MakeMarkovChain(inputArray) {

    // the output of this function is the records object described above.
    var records = {},
        // the two words currently being examined
        currentPair,
        // the word that follows the current pair
        currentFollow,
        // a bool recording whether or not the current pair has already occured in the input array
        pairExists,
        i, j, len;

    // start the examination of the input with the first three elements.
    currentPair = inputArray[0] + ' ' + inputArray[1];
    currentFollow = inputArray[2];
    MakeEntry(currentPair, currentFollow, records);
    len = inputArray.length-1;
    for (i = 1; i < len; i++) {
        currentPair = inputArray[i] + ' ' + inputArray[i + 1];
        currentFollow = inputArray[i + 2];
        if (currentFollow) {
            MakeEntry(currentPair, currentFollow, records);
        }
    }
    return records;
}

// This is called by the button click in input.js
function MakeRandomText(input) {

    var inputArray = input.split(' '),
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
        // should never happen because of how I've structured the texts in texts.js but just in case
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
        if (i > numCount && next.charAt(next.length - 1) === '.') {
            break;
            // if we've gone far over the word count and still havne't found a full stop call it a day.
        } else if (i > numCount + 100) break;
    }
    // If something has gone wrong try again. This hasn't been needed since development but you never know.
    if (retry) {
        MakeRandomText(input);
    }
    return output.join(' ').trim();
}

// Given an markov chain and a two-word pair in it, returns an appropriate next word.
function GetNextWord(preceedingPair, records) {
    var followingWordArray = records[preceedingPair.trim()];
    return ' ' + followingWordArray[GetRandomInt(followingWordArray.length)];
}

// Finds two appropriate words to start the output text with.
function GetStartingWords(arr) {
    // Find all words in the input array that end with a full stop.
    var endWords = arr.filter(word => {
        return word.charAt(word.length - 1) === '.';
    });
    // pick one of these at random.
    var word = endWords[GetRandomInt(endWords.length - 1)];
    var index = arr.indexOf(word);
    // The starting words will be the next two words.
    return [arr[index + 1], arr[index + 2]];
}