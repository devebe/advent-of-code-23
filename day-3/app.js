import {readFileSync} from "fs";

let text = readFileSync('./test.txt', 'utf-8').toString().split('\n');

let matrix = [];
text.forEach((line) => {
    let xCoordinates = line.split('');
    matrix.push(xCoordinates);
});

let specialChars = [];
let numbers = [];
for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
        const char = /[^\d\w\.]/;
        const num = /[\d]/;
        if (char.test(matrix[i][j])) {
            specialChars.push([i,j]);
        };
        if (num.test(matrix[i][j])) {
            numbers.push([i,j]);
        };
    };  
};

// if matches are consecutive, they need to be removed.


let validNumberPositions = []
for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < specialChars.length; j++) {
        if ((numbers[i][0] + 1) == specialChars[j][0] && (numbers[i][1] + 1) == specialChars[j][1]) {
            validNumberPositions.push([numbers[i][0], numbers[i][1], "right-down"]);
        }
        if ((numbers[i][0] - 1) == specialChars[j][0] && (numbers[i][1] - 1) == specialChars[j][1]) {
            validNumberPositions.push([numbers[i][0], numbers[i][1], "left-up"]);
        }
        if ((numbers[i][0] + 1) == specialChars[j][0] && (numbers[i][1] - 1) == specialChars[j][1]) {
            validNumberPositions.push([numbers[i][0], numbers[i][1], "left-down"]);
        }
        if ((numbers[i][0] - 1) == specialChars[j][0] && (numbers[i][1] + 1) == specialChars[j][1]) {
            validNumberPositions.push([numbers[i][0], numbers[i][1], "right-up"]);
        }
        if (numbers[i][0] == specialChars[j][0] && (numbers[i][1] - 1) == specialChars[j][1]) {
            validNumberPositions.push([numbers[i][0], numbers[i][1], "left"]);
        }
        if (numbers[i][0] == specialChars[j][0] && (numbers[i][1] + 1) == specialChars[j][1]) {
            validNumberPositions.push([numbers[i][0], numbers[i][1], "right"]);
        }
        if ((numbers[i][0] + 1) == specialChars[j][0] && numbers[i][1] == specialChars[j][1]) {
            validNumberPositions.push([numbers[i][0], numbers[i][1], "down"]);
        }
        if ((numbers[i][0] - 1) == specialChars[j][0] && numbers[i][1] == specialChars[j][1]) {
            validNumberPositions.push([numbers[i][0], numbers[i][1], "up"]);
        };
    };
};

console.log(validNumberPositions);

let duplicateMatchesRemoved = []

// let i = 0
// while (i < validNumberPositions.length) {

// }

// for (let i = 0; i < validNumberPositions.length; i++) {
//     let first = validNumberPositions[i]
//     console.log(validNumberPositions[(i + 1)][0]);
//     if (validNumberPositions[i][0] == validNumberPositions[(i - 1)][0]) {
//         if (validNumberPositions[i][1] != validNumberPositions[(i - 1)][1]) {
//             duplicateMatchesRemoved.push(validNumberPositions[i])
//         }
//     }
// }

// console.log(duplicateMatchesRemoved);

let foundNumbers = [];

for (let i = 0; i < validNumberPositions.length; i++) {   
    foundNumbers.push(
        matrix[validNumberPositions[i][0]][validNumberPositions[i][1] - 2] +
        matrix[validNumberPositions[i][0]][validNumberPositions[i][1] - 1] +
        matrix[validNumberPositions[i][0]][validNumberPositions[i][1]] +
        matrix[validNumberPositions[i][0]][validNumberPositions[i][1] + 1] +
        matrix[validNumberPositions[i][0]][validNumberPositions[i][1] + 2]
    );
};

console.log(foundNumbers);

let resultNumbers = [];
for (let i = 0; i < foundNumbers.length; i++) {
    let thing = foundNumbers[i].split(/[^\d]/g);
    thing.forEach((item) => {
        if (item.length >= 2) {
            resultNumbers.push(parseInt(item));
        }
    });
};

console.log(resultNumbers);

let yetAnotherArray = [];
for (let i = 0; i < resultNumbers.length; i++) {
    if (resultNumbers[i] != resultNumbers[i + 1]) {
        yetAnotherArray.push(resultNumbers[i]);
    };  
};

console.log(yetAnotherArray);

const sum = resultNumbers.reduce((partialSum, a) => partialSum + a, 0);
console.log(sum);

// if right-down - go left 2 times or until dot.
// if left-up - go right 2 times or until dot.
// if right-up - go left 2 times or until dot.
// if left-down - go right 2 times or until dot.
// if right - go left 2 times or until dot.
// if left - go right 2 times or until dot.
// if down - go left or right until dot.
// if up - go left or right until dot.