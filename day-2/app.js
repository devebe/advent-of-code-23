import {readFileSync} from "fs";

let text = readFileSync('./puzzle-input.txt', 'utf-8').toString().split('\n');
let games = [];
let validGames = [];

text.forEach((line) => {
    let splitting = line.split(/[:;,]+/)
    let removedElement = splitting.shift();
    let outcomes = [];
    splitting.forEach((cube) => {
        let outcome = cube.split(' ');
        let obj = {
            [outcome[2]]: parseInt(outcome[1]),
        };
        outcomes.push(obj);
    })
    games.push(outcomes);
});

function isValidGame(array) {
    const redTest = array.filter((obj) => obj.red > 12);
    const greenTest = array.filter((obj) => obj.green > 13);
    const blueTest = array.filter((obj) => obj.blue > 14);
    if (redTest.length > 0 || greenTest.length > 0 || blueTest.length > 0) {
        return false;
    }
    else return true;
};

games.forEach((game) => {
    if (isValidGame(game)) {
        validGames.push(games.indexOf(game) + 1);
    };
});

const sum = validGames.reduce((partialSum, a) => partialSum + a, 0);

console.log(sum);