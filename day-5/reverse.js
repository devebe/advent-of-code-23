function findSeed(num, array) { 
    let result1 = applyMap(num, array[6]);
    let result2 = applyMap(result1, array[5]);
    let result3 = applyMap(result2, array[4]);
    let result4 = applyMap(result3, array[3]);
    let result5 = applyMap(result4, array[2]);
    let result6 = applyMap(result5, array[1]);
    let result7 = applyMap(result6, array[0]);
    return result7;
}

function applyMap(num, array) {
    let result = num;
    for (let i = 0; i < array.length; i++) {
        let source = parseInt(array[i][1]);
        let range = parseInt(array[i][2]);
        if (isInRange(num, source, range)) {
            result = applyMapping(num, array[i]);
        };
    };
    return result;
};

function applyMapping(num, conditionsArray) {
    let source = parseInt(conditionsArray[1]);
    let destination = parseInt(conditionsArray[0]);
    let range = parseInt(conditionsArray[2]);
    let result = num;
    if (isInRange(num, source, range)) {
        result = destination + (num - source);
    };
    return result;
};

function isInRange(num, rangeStart, rangeLength) {
    if (num >= rangeStart && num < (rangeStart + rangeLength)) {
        return true;
    };
    return false;
};

import { readFileSync } from "fs";

let text = readFileSync('./input.txt', 'utf-8').toString();
let lines = text.split('\n\n');
let inputNumbers = lines.shift().split(':')[1].trimStart().split(" ");
let inputs = [];
inputNumbers.forEach(number => inputs.push(parseInt(number)));
let mappings = [];

lines.forEach(line => {
    let array = line.split('\n');
    let remove = array.shift();
    mappings.push(array);
});

let conditions = []
for (let i = 0; i < mappings.length; i++) {
    let array = [];
    for (let j = 0; j < mappings[i].length; j++) {
        let secondArray = mappings[i][j].split(" ");
        array.push(secondArray);
    };
    conditions.push(array);
};

console.log(findSeed(265018614,conditions));