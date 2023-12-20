import { readFileSync } from "fs";

const createMatrix = (array) => {
    let newArray = [];
    array.forEach(el => newArray.push(el.split('')));
    return newArray;
};

const generateDuplicateCoordinates = (array) => {
    let newArray = [];
    array.forEach(coordinate => {
        newArray.push(coordinate[0] + ',' + coordinate[1]);
    });
    return newArray;
};

const generateAdjacentCoordinates = (array, destinationArray) => {
    array.forEach(coordinate => {
        let y = coordinate[0];
        let x = coordinate[1];
        for (let i = -1; i < 2; i++) {
            let yResult = y + i;
            for (let j = -1; j < 2; j++) {
                let xResult = x + j;
                if (xResult >= 0 && yResult >= 0) {
                    destinationArray.push(yResult + ',' + xResult);
                };
            };
        };
    });
};

const deduplicateCoordinates = (set, duplicatesArray) => {
    duplicatesArray.forEach(el => set.delete(el));
}

const getAllNeighbours = (array) => {
    let newArray = [];
    let duplicates = generateDuplicateCoordinates(array);
    generateAdjacentCoordinates(array, newArray);
    let set = new Set(newArray);
    deduplicateCoordinates(set, duplicates);
    return [...set];
}

const findNumbers = (array) => {
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

const findSpecialChars = (array) => {
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

const findAsterisks = (array) => {
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
    return result;
}

const main = () => {
    let input = readFileSync('./input.txt', 'utf-8').toString().split('\n');
    let matrix = createMatrix(input);
    let numbers = findNumbers(matrix);
    let asts = findAsterisks(matrix);
    let chars = findSpecialChars(matrix);

    return console.log(sumUpValidNumbers(numbers, chars), sumUpProductsOfValidNumbers(asts, numbers));
};

main();