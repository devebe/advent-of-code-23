import { readFileSync } from "fs";
let text = readFileSync("./day1text.txt", "utf-8" ).toString().split('\n');
let processedText = [];
let extractedNumbers = [];
let codeValues = [];

const numberObj = {
    oneight: '18',
    twone: '21',
    threeight: '38',
    fiveight: '58',
    sevenine: '79',
    eightwo: '82',
    eighthree: '83',
    nineight: '98',
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9'
};

const re = new RegExp(Object.keys(numberObj).join("|"),"gi");

function replaceWithNumber(string) {
    let matches = string.replace(re, (matched) => {
        return numberObj[matched];
    })
    if (matches) return matches;
};

for (let i = 0; i < text.length; i++) {
    processedText.push(replaceWithNumber(text[i]));
};

function digitExtractor(string) {
    let matches = string.replace(/[^0-9]/g, "");
    if (matches) return matches;
};

for (let i = 0; i < processedText.length; i++) {
    extractedNumbers.push(digitExtractor(processedText[i]));
};

extractedNumbers.forEach((string) => { 
    let numbers = string.split('');
    if (numbers.length == 1) {
        let extractedValues = numbers[0].concat(numbers[0]);
        codeValues.push(parseInt(extractedValues));
    };
    if (numbers.length >= 2) {
        let extractedValues = numbers[0].concat(numbers[numbers.length - 1]);
        codeValues.push(parseInt(extractedValues));
    };
});

const sum = codeValues.reduce((partialSum, a) => partialSum + a, 0);

console.log(sum);