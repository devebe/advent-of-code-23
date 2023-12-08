import {readFileSync} from "fs";

let text = readFileSync('./test.txt', 'utf-8').toString().split('\n');
let winningNumbers = [];
let scratchNumbers = [];

text.forEach((line) => {
    let scores = line.split(':');
    let newscores = scores[1].split('|');
    let winNumbers = newscores[0].trimEnd();
    let scrNumbers = newscores[1];
    winningNumbers.push(winNumbers);
    scratchNumbers.push(scrNumbers);
});

let scratchScore = [];
let formattedWinNumbers = [];

for (let i = 0; i < winningNumbers.length; i++) {
    let first = 1;
    let last = 2;
    let array = []
    for (let j = 0; j < (winningNumbers[1].length / 3); j++) { 
        let number = parseInt(winningNumbers[i][first] + winningNumbers[i][last]);
        array.push(number);
        first += 3;
        last += 3;
    };
    formattedWinNumbers.push(array);
};

let formattedScrNumbers = [];

for (let i = 0; i < scratchNumbers.length; i++) {
    let first = 1;
    let last = 2;
    let array = []
    for (let j = 0; j < (scratchNumbers[1].length / 3); j++) { 
        let number = parseInt(scratchNumbers[i][first] + scratchNumbers[i][last]);
        array.push(number);
        first += 3;
        last += 3;
    };
    formattedScrNumbers.push(array);
};

let numberOfMatches = [];

for (let i = 0; i < formattedWinNumbers.length; i++) {
    let intersection = formattedWinNumbers[i].filter(el => formattedScrNumbers[i].includes(el));
    numberOfMatches.push([i , intersection.length]);
    if (intersection.length >= 1) {
        let score = 2 ** (intersection.length - 1);
        scratchScore.push(score);
    };
    if (intersection.length == 0) {
        let score = 0;
        scratchScore.push(score);
    }
};

console.log(numberOfMatches);

let scratchCards = [];



const sum = scratchScore.reduce((partialSum, a) => partialSum + a, 0);

console.log(sum);