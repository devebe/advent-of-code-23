import {readFileSync} from "fs";

let text = readFileSync('./test.txt', 'utf-8').toString().split('\n');

let matrix = [];
text.forEach((line) => {
    let xCoordinates = line.split('');
    matrix.push(xCoordinates);
});

function isNumber(string) {
    const num = /[\d]/;
    return num.test(string);
};

function isSpecChar(string) {
    const char = /[^\d\w\.]/;
    return char.test(string);
};

let ind = []
for (let y = 0; y < matrix.length; y++) {
    let str = {
        num: '',
        pos: [],
    };
    for (let x = 0; x < matrix[y].length; x++) {
        if (isNumber(matrix[y][x])) {
            str.num += matrix[y][x];
            str.pos.push([y,x]);
            if (!isNumber(matrix[y][x + 1])) {
                str.num += ','
            };
        };
    };
    ind.push(str);
};

console.log(ind);