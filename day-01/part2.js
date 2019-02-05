const fs = require('fs');

const countFrequency = (frequencyMap, frequency) => {
    const oldCount = frequencyMap.get(frequency);
    const newCount = oldCount ? oldCount + 1 : 1;
    frequencyMap.set(frequency, newCount);
    return newCount;
}

const getTwiceReachedFrequency = (input) => {
    let counter = 0;
    let frequencySum = 0;
    const frequencyMap = new Map();

    while (true) {
        const index = counter % input.length;
        const frequency = input[index];
        frequencySum += parseInt(frequency);
        const count = countFrequency(frequencyMap, frequencySum);
        if (count >= 2) {
            return frequencySum;
        }
        counter += 1;
    }
}

const input = fs.readFileSync('input.txt', 'utf-8').split('\n');

const result = getTwiceReachedFrequency(input);

console.log(`Frequency reached twice: ${result}`);