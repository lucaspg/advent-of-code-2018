const fs = require('fs');

const shouldReact = (currentUnit, leftUnit) => {
    if (currentUnit.toUpperCase() === leftUnit.toUpperCase() &&
    currentUnit !== leftUnit) {
        return true;
    }
    
    return false;
}

const getRemainingUnits = (input) => {
    let i = 1;

    while (i < input.length) {
        if (i === 0) {
            i = 1;
        }

        const currentUnit = input[i];
        const leftUnit = input[i - 1];

        if (shouldReact(currentUnit, leftUnit)) {
            input.splice(i - 1, 2);
            i = i - 1;
        } else {
            i = i + 1;
        }
    };

    return input.length;
}

const removeUnit = (polymer, unit) => {
    const newPolymer = polymer.slice();

    let i = 0;
    while (i < newPolymer.length) {
        if (i < 0) {
            i = 0;
        }

        if (newPolymer[i].toUpperCase() === unit) {
            newPolymer.splice(i, 1);
            i = i - 1;
        } else {
            i = i + 1;
        }
    }
    
    return newPolymer;
}

const findMinPolymerSize = (input) => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split("");
    let minPolymerSize = Number.POSITIVE_INFINITY;

    alphabet.forEach((unit) => {
        const modifiedPolymer = removeUnit(input, unit);
        const reactedPolymerSize = getRemainingUnits(modifiedPolymer);

        if (reactedPolymerSize < minPolymerSize) {
            minPolymerSize = reactedPolymerSize;
        }
    });

    return minPolymerSize;
}

const input = fs.readFileSync('input.txt', 'utf-8').split('');

const result = findMinPolymerSize(input);

console.log(`${result} is the length of the shortest polymer`);