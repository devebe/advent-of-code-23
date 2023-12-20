import { readFileSync } from "fs";

const createMatrix = (array) => {
    let newArray = [];
    array.forEach(el => {
        newArray.push(el.split(''));
    });
    return newArray;
};

const getAllNeighbours = (array) => {
    let newArray = [];
    let duplicates = [];
    array.forEach(subarray => {
        duplicates.push(subarray[0] + ',' + subarray[1]);
    });
    for (let h = 0; h < array.length; h++) {
        for (let i = -1; i <= 1;) {
            let x = array[h][1]
            let y = array[h][0] + i;
            if (x >= 0 && y >= 0 && x <= 139 && y <= 139) {
                newArray.push(y + ',' + x);
                
            };
            i = i + 2;
        }
        for (let i = -1; i <= 1;) {
            let y = array[h][0]
            let x = array[h][1] + i;
            if (x >= 0 && y >= 0 && x <= 139 && y <= 139) {
                newArray.push(y + ',' + x);
            };
            i = i + 2;
        }
        for (let i = -1; i <= 1;) {
            let y = array[h][0] + i
            let x = array[h][1] + i;
            if (x >= 0 && y >= 0 && x <= 139 && y <= 139) {
                newArray.push(y + ',' + x);
            };
            i = i + 2;
        }
        for (let i = -1; i <= 1;) {
            let y = array[h][0] + i
            let x = array[h][1] - i;
            if (x >= 0 && y >= 0 && x <= 139 && y <= 139) {
                newArray.push(y + ',' + x);
            };
            i = i + 2;
        }
    }
    let set = new Set(newArray);
    duplicates.forEach(el => {
        set.delete(el);
    })
    return [...set];
}

const collectNumbers = (array) => {
    const num = /[\d]/;
    let newArray = [];
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length;) {
            if(num.test(array[i][j]) && num.test(array[i][j + 1]) && num.test(array[i][j + 2])) {
                let value = array[i][j] + array[i][j + 1] + array[i][j + 2];
                let coordinates = [(i + ',' + j) , (i + ',' + (j + 1)) , (i + ',' + (j + 2))];
                let neighbours = getAllNeighbours([[i,j],[i,(j + 1)],[i,(j + 2)]]);
                newArray.push([value, coordinates, neighbours]);
                j = j + 3;
            }
            if(num.test(array[i][j]) && num.test(array[i][j + 1]) && !num.test(array[i][j + 2])) {
                let value = array[i][j] + array[i][j + 1];
                let coordinates = [(i + ',' + j) , (i + ',' + (j + 1))];
                let neighbours = getAllNeighbours([[i,j],[i,(j + 1)]]);
                newArray.push([value, coordinates, neighbours]);
                j = j + 2;
            }
            if(num.test(array[i][j]) && !num.test(array[i][j + 1])) {
                let value = array[i][j];
                let coordinates = [(i + ',' + j)];
                let neighbours = getAllNeighbours([[i,j]]);
                newArray.push([value, coordinates, neighbours]);
                j = j + 1;
            }
            j++;
        };
    };
    return newArray;
};

const collectSpecialChars = (array) => {
    let spChar = /[^\d\w\.]/;
    let newArray = [];
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length; j++) {
            if (spChar.test(array[i][j])) {
                let coordinate = i + ',' + j;
                newArray.push(coordinate);
            }
        };
    };
    return newArray;
};

const collectAsterisks = (array) => {
    let asterisk = /[*]/;
    let newArray = [];
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length; j++) {
            if (asterisk.test(array[i][j])) {
                let coordinate = i + ',' + j;
                let neighbours = getAllNeighbours([[i,j]]);
                let matches = 0;
                let numbers = [];
                newArray.push([coordinate, neighbours, matches, numbers]);
            };
        };
    };
    return newArray;
}

const sumUpValidNumbers = (numbers, chars) => {
    let result = 0;
    numbers.forEach(number => {
        let intersection = number[2].filter(element => chars.includes(element));
        if (intersection.length > 0) {
            result += parseInt(number[0]);
        };
    });
    return result;
};

const sumUpProductsOfValidNumbers = (asterisks, numbers) => {
    let result = 0;
    let newArray = [];
    asterisks.forEach(asterisk => {
        numbers.forEach(number => {
            let intersection = asterisk[1].filter(element => number[1].includes(element));
            if (intersection.length > 0) {
                asterisk[2] += 1;
                asterisk[3].push(number[0]);
            };
        });
        newArray.push(asterisk);
    });
    let arr2 = newArray.filter(el => el[2] == 2);
    arr2.forEach(el => {
        result += el[3].reduce((a,b) => a * b);
    })
    return console.log(result);
}

let input = readFileSync('./input.txt', 'utf-8').toString().split('\n');
let matrix = createMatrix(input);
let numbers = collectNumbers(matrix);
let asts = collectAsterisks(matrix);
let chars = collectSpecialChars(matrix);

sumUpProductsOfValidNumbers(asts, numbers);
console.log(sumUpValidNumbers(numbers, chars));