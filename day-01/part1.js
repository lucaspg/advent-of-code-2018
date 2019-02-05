const fs = require('fs');

const getFrequencySum = (input) => {
    let frequencySum = 0;

    input.forEach((frequency) => {
        frequencySum += parseInt(frequency);
    });

    return frequencySum;
}

const input = fs.readFileSync('input.txt', 'utf-8').split('\n');

const result = getFrequencySum(input);

console.log(`Resulting frequency is: ${result}`);
