const calculateDistance = (raceTime, holdingTime) => raceTime * holdingTime - (holdingTime ** 2);

const findHoldingTimeForMaxDistance = (raceTime) => Math.round(-raceTime / -2);

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
    return console.log(numberOfValidSolutions);
};

numberOfWaysToBeatRecord(40817772,219101213651089);

// console.log(calculateDistance(7, 2));
// console.log(findHoldingTimeForMaxDistance(7));
// 27 50 22 29
// 40817772 219101213651089

console.log(27*50*22*29)
