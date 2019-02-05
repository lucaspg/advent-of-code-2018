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

const input = fs.readFileSync('input.txt', 'utf-8').split('');

const result = getRemainingUnits(input);

console.log(`${result} units remain after fully reacting the polymer scanned`);