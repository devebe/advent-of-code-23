// calculateDistance evaluates quadratic function to return distance.
const calculateDistance = 
    (raceTime, holdingTime) => raceTime * holdingTime - (holdingTime ** 2);

// findHoldingTimeForMaxDistance uses quadratic rule -b / 2a to 
// find holdingTime with max distance and rounds it off to the nearest integer.
const findHoldingTimeForMaxDistance = (raceTime) => Math.round(-raceTime / -2);

// numberOfWaysToBeatRecord evaluates values left and right from holdingTime 
// that resulted in max distance. Variable numberOfValidSolutions gets 
// incremented for each time the holdingtime is resulting in a distance higher 
// than raceDistance.
const numberOfWaysToBeatRecord = (raceTime, raceDistance) => {
    let holdingTime = findHoldingTimeForMaxDistance(raceTime);
    let left = holdingTime - 1;
    let right = holdingTime;
    let numberOfValidSolutions = 0;
    do {
        numberOfValidSolutions++;
        left--;
    } while (calculateDistance(raceTime, left) > raceDistance);
    do {
        numberOfValidSolutions++;
        right++;
    } while (calculateDistance(raceTime, right) > raceDistance);
    return numberOfValidSolutions;
};

// evaluatePuzzleInput multiplies the possible ways to beat the record 
// for each subarray with raceTime and raceDistance in the array
const evaluatePuzzleInput = (array) => {
    let outcomes = [];
    array.forEach((subarray) => {
        outcomes.push(numberOfWaysToBeatRecord(subarray[0], subarray[1]));
    });
    let answer = outcomes.reduce( (a,b) => a * b )
    return console.log(answer);
};

let puzzleInputPart1 = [[40, 219],[81, 1012],[77,1365],[72,1089]];
evaluatePuzzleInput(puzzleInputPart1);

console.log(numberOfWaysToBeatRecord(40817772,219101213651089));