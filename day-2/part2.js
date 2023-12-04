import {readFileSync} from "fs";

let text = readFileSync('./puzzle-input.txt', 'utf-8').toString().split('\n');
let games = [];

text.forEach((line) => {
    let splitting = line.split(/[:;,]+/)
    let removedElement = splitting.shift();
    games.push(splitting);
});

console.log(games[0]);

let sortedByColor = [];

games.forEach((game) => {
    let example = [];
    game.forEach((item) => {
        let order = item.split(/\s/);
        let remover = order.shift();
        example.push(order);
    });

    let redArray = [];
    let greenArray = [];
    let blueArray = [];

    example.forEach((item) => {
        if (item[1] == 'red') {
            redArray.push(parseInt(item[0]));
        }
        if (item[1] == 'green') {
            greenArray.push(parseInt(item[0]));
        }
        if (item[1] == 'blue') {
            blueArray.push(parseInt(item[0]));
        };
    });

    let redMax = Math.max(...redArray);
    let greenMax = Math.max(...greenArray);
    let blueMax = Math.max(...blueArray);
    
    sortedByColor.push(redMax * greenMax * blueMax);
});

console.log(sortedByColor);

const sum = sortedByColor.reduce((partialSum, a) => partialSum + a, 0);

console.log(sum);