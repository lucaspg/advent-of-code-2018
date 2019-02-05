const fs = require('fs');

const getGuardId = (entry) => {
    return parseInt(entry.match(/#\d+/)[0].substring(1));
}

const getMinutes = (entry) => {
    return parseInt(entry.match(/:\d+/)[0].substring(1));
}

const setGuardMinutesAsleep = (guardId, sleepMap, sleepStartTime, sleepEndTime) => {
    let minutesAsleep = sleepMap.get(guardId);

    if (!minutesAsleep) {
        minutesAsleep = new Array();
    }
    
    for (let i = sleepStartTime; i < sleepEndTime; i++) {
        minutesAsleep.push(i);
    }

    sleepMap.set(guardId, minutesAsleep);
}

const getMaxAsleepGuardId = (input, sleepMap) => {
    let sleepStartTime = 0;
    let sleepEndTime = 0;
    let totalTimeSleeped = 0;
    let guardId = '';

    let maxAsleepGuardId = 0;
    let maxSleepTime = 0;
    

    input.forEach((entry) => {
        if (entry.includes('Guard')) {
            guardId = getGuardId(entry);
            sleepStartTime = 0;
            sleepEndTime = 0;
            totalTimeSleeped = 0;
        }

        if (entry.includes('falls')) {
            sleepStartTime = getMinutes(entry);
        }

        if (entry.includes('wakes')) {
            sleepEndTime = getMinutes(entry);

            const timeSleeped = sleepEndTime - sleepStartTime;
            totalTimeSleeped += timeSleeped;

            if (totalTimeSleeped > maxSleepTime) {
                maxAsleepGuardId = guardId;
                maxSleepTime = totalTimeSleeped;
            }

            setGuardMinutesAsleep(guardId, sleepMap, sleepStartTime, sleepEndTime);
        }
    });

    return maxAsleepGuardId;
}

const getMaxMinuteAsleep = (minutes) => {
    const minutesMap = new Map();
    let maxCount = 0;
    let maxMinute = 0;

    minutes.forEach((minute) => {
        const count = minutesMap.get(minute) ? minutesMap.get(minute) + 1 : 1;
        minutesMap.set(minute, count);

        if (count > maxCount) {
            maxCount = count;
            maxMinute = minute;
        }
    });

    return maxMinute;
}

const firstStrategy = (input) => {
    const sleepMap = new Map();
    const guardId = getMaxAsleepGuardId(input.sort(), sleepMap);
    const minutesAsleep = sleepMap.get(guardId);
    const maxMinuteAsleep = getMaxMinuteAsleep(minutesAsleep);
    return guardId * maxMinuteAsleep;
} 

const input = fs.readFileSync('input.txt', 'utf-8').split('\n');

const result = firstStrategy(input);

console.log(`${result} is the ID of the guard found multiplied by the minute found`);