import fiveLetterBank from './wordle-5.txt'
import sixLetterBank from './wordle-6.txt'
import sevenLetterBank from './wordle-7.txt'

// above needs to be changed to a dynamic import based on word size

/* Words to be used*/

let boardDefault = [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
];

if(window.wordSize == 5){
    boardDefault = [
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
    ];
}

if(window.wordSize == 6){
    boardDefault = [
        ["", "", "", "", "", ""],
        ["", "", "", "", "", ""],
        ["", "", "", "", "", ""],
        ["", "", "", "", "", ""],
        ["", "", "", "", "", ""],
        ["", "", "", "", "", ""],
    ];
}
if(window.wordSize == 7){
    boardDefault = [
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
    ];
}

export { boardDefault };
    // array for board has empty arrays for when the game starts for 6 attempts

export const generateWordSet = async () => {
    let wordBank;
    if(window.wordSize == 5){
        wordBank = fiveLetterBank;
    }
    if(window.wordSize == 6){
        wordBank = sixLetterBank;
    }
    if(window.wordSize == 7){
        wordBank = sevenLetterBank;
    }
    let wordSet;
    let todaysWord;
    await fetch(wordBank)
    .then((response) => response.text())
    .then((result) => {
        const wordArr = result.split("\n");
        wordArr.forEach(function(item, index, array){
            array[index] = item.trim();
        });
        todaysWord = wordArr[Math.floor(Math.random() * wordArr.length)];
        wordSet = new Set(wordArr);
    });
    return{ wordSet, todaysWord };
}