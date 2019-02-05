const fs = require('fs');

const getGuardId = (entry) => {
    return parseInt(entry.match(/#\d+/)[0].substring(1));
}

const getMinutes = (entry) => {
    return parseInt(entry.match(/:\d+/)[0].substring(1));
}

const secondStrategy = (input) => {
    let guardId = '';
    let sleepStartTime = 0;
    let sleepEndTime = 0;
    let maxGuardId = 0;
    let maxCount = 0;
    let maxMinute = 0;
    let guardsMap = new Map();
    let guardMap;

    input.forEach((entry) => {
        if (entry.includes('Guard')) {
            guardId = getGuardId(entry);
            sleepStartTime = 0;
            sleepEndTime = 0;
            guardMap = guardsMap.get(guardId) ? guardsMap.get(guardId) : new Map();
            guardsMap.set(guardId, guardMap);
        } else if (entry.includes('falls')) {
            sleepStartTime = getMinutes(entry);
        } else if (entry.includes('wakes')) {
            sleepEndTime = getMinutes(entry);

            for (let i = sleepStartTime; i < sleepEndTime; i++) {
                const count = guardMap.get(i) ? guardMap.get(i) + 1 : 1;
                guardMap.set(i, count);
                
                if (count > maxCount) {
                    maxCount = count;
                    maxMinute = i;
                    maxGuardId = guardId;
                }
            }
        }
    });

    return maxGuardId * maxMinute;
}

const input = fs.readFileSync('input.txt', 'utf-8').split('\n');

const result = secondStrategy(input.sort());

console.log(`${result} is the ID of the guard found multiplied by the minute found`);