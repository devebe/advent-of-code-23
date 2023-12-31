import {readFileSync} from "fs";

let cardValues = "J23456789TQKA";
let text = readFileSync('./input.txt', 'utf-8').toString().split('\n');

const binaryMapOf = (string) => {
    let array = string.split('');
    let map = [];
    for (let i = 0; i < array.length; i++) {
        map.push([array[i], (2 ** i)]);
    };
    return map;
};

const valueMapof = (string) => {
    let array = string.split('');
    let map = [];
    for (let i = 0; i < array.length; i++) {
        map.push([array[i], (i + 1)]);
    };
    return map;
};

const cardsToAdjustedTypeConverter = (string) => {
    let map = valueMapof(cardValues);
    let array = string.split('');
    let conversion = [];
    for (let i = 0; i < array.length; i++) {
        convertSourceValueToMapValue(array[i], map, conversion);
    };
    let uniqueElements = [...new Set(conversion)];
    const counts = uniqueElements.map(value => [value, conversion.filter(str => str === value).length]);
    return transformTheJokers(counts);
};

const transformTheJokers = (array) => {
    let newarray = [];
    array.forEach(el => {
        newarray.push(el[0]);
    });
    let outcome = Math.max(...newarray);
    let amount = 0;
    let index = 0;
    array.forEach(el => {
        if (el[0] == 1) {
            amount = el[1];
            index = array.indexOf(el);
            let transformedArray = array.splice(index, 1);
        };
    });
    array.forEach(el => {
        if (el[0] == outcome) {
            el[1] += amount;
        };
    });
    if (array.length == 5) {
        return 1; // high card
    }
    if (array.length == 4) {
        return 2; // one pair
    }
    if (array.length == 3) {
        for (let i = 0; i < array.length; i++) {
            if (array[i][1] == 2) {
                return 3; // two pair
            };
            if (array[i][1] == 3) {
                return 4; // three of a kind
            };
        };
    }
    if (array.length == 2) {
        for (let i = 0; i < array.length; i++) {
            if (array[i][1] == 3) {
                return 5; // full house
            };
            if (array[i][1] == 4) {
                return 6; // four of a kind
            };
        };
    };
    if (array.length == 1) {
        return 7; // five of a kind
    };
};

const isValidCardValue = (string) => {
    let regex = /[\dTJKQA]/;
    if (regex.test(string)) return true; 
    else return false;
};

const binaryToScoreConverter = (array) => {
    let result = BigInt(0);
    for (let i = 0; i < array.length; i++) {
        result += BigInt(array[array.length - i - 1] * (10 ** (4 * i)));
    };
    return result;
};

const convertSourceValueToMapValue = (sourceValue, map, destination) => {
    if (isValidCardValue(sourceValue)) {
        map.forEach(el => {
            if (el[0] == sourceValue) {
                destination.push(el[1]);
            };
        });
    };
};

const cardsToScoreConverter = (string) => {
    let map = binaryMapOf(cardValues);
    let array = string.split('');
    let conversion = [];
    for (let i = 0; i < array.length; i++) {
        convertSourceValueToMapValue(array[i], map, conversion);
    };
    let score = binaryToScoreConverter(conversion);
    return score;
};

const textProcessor = (text) => {
    let processedText = [];
    text.forEach(line => processedText.push(line.split(" ")));
    return processedText;
}

const typeOfHand = (string) => {
    let array = string.split('');
    let set = new Set(array);
    let uniqueElements = [...new Set(array)];
    const counts = uniqueElements.map(value => [value, array.filter(str => str === value).length]);
    if (set.size == 5) {
        return 1; // high card
    }
    if (set.size == 4) {
        return 2; // one pair
    }
    if (set.size == 3) {
        for (let i = 0; i < counts.length; i++) {
            if (counts[i][1] == 2) {
                return 3; // two pair
            };
            if (counts[i][1] == 3) {
                return 4; // three of a kind
            };
        };
    }
    if (set.size == 2) {
        for (let i = 0; i < counts.length; i++) {
            if (counts[i][1] == 3) {
                return 5; // full house
            };
            if (counts[i][1] == 4) {
                return 6; // four of a kind
            };
        };
    };
    if (set.size == 1) {
        return 7; // five of a kind
    };
};

class SortableObject {
    constructor (array) {
        this.cards = array[0];
        this.bid = parseInt(array[1]);
        this.score = cardsToScoreConverter(array[0]);
        this.type = this.getType(array[0]);
    }

    getType(string) {
        if (typeOfHand(string) > cardsToAdjustedTypeConverter(string)) {
            return typeOfHand(string);
        }
        if (typeOfHand(string) < cardsToAdjustedTypeConverter(string)) {
            return cardsToAdjustedTypeConverter(string);
        }
        if (typeOfHand(string) == cardsToAdjustedTypeConverter(string)) {
            return typeOfHand(string);
        };
    };
};

const convertToSortedObjectArray = (array, newarray) => {
    createSortableObject(array, newarray);
    sortObjects(newarray);
}

const createSortableObject = (array, newarray) => {
    array.forEach(subarray => {
        let obj = new SortableObject(subarray);
        newarray.push(obj);
    });
};

const sortObjects = (array) => {
    array.sort((a, b) => b.type - a.type || (b.score < a.score ? -1 : b.score > a.score ? 1 : 0));
};

const calculateWinnings = (array, newarray) => {
    for (let i = 0; i < array.length; i++) {
        let score = array[i].bid * (array.length - i);
        newarray.push(score);
    };
};

let camelCards = textProcessor(text);
let sortedArray = [];
convertToSortedObjectArray(camelCards, sortedArray);
console.log(sortedArray[100]);

let scoresArray = [];
calculateWinnings(sortedArray, scoresArray);

// console.log(scoresArray);

let sum = scoresArray.reduce((a, b) => a + b);

console.log(sum);
// console.log(cardsToAdjustedTypeConverter(sortedArray[100][0]));
// console.log(typeOfHand(sortedArray[100][0]));