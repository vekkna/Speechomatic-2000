This site makes random but real-ish looking politcal speeches.

1. texts.js contains the speeches, divided into four strings.

2. input.js controls the button that starts the work. Bases on what checkboxes the user has checked, it concatenates the texts in texts.js into a long string, which it feeds to MakeRandomText in markov.js

3. markov.js does the work. See comments for details.