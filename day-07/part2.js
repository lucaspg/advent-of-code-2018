const fs = require('fs');

const NUMBER_OF_STEPS = 26;

const createNewStepInfo = () => {
    const stepInfo = {};

    stepInfo.requiredSteps = new Array();
    stepInfo.nextSteps = new Array();

    return stepInfo;
}

const getStepsMap = (instructions) => {
    const stepsMap = new Map();

    instructions.forEach((instruction) => {
        const requiredStep = instruction.charAt(5);
        const step = instruction.charAt(36);

        const stepInfo = stepsMap.get(step) ? stepsMap.get(step) : createNewStepInfo();
        stepInfo.requiredSteps.push(requiredStep);
        stepsMap.set(step, stepInfo);

        const requiredStepInfo = stepsMap.get(requiredStep) ? stepsMap.get(requiredStep) : createNewStepInfo();
        requiredStepInfo.nextSteps.push(step);
        stepsMap.set(requiredStep, requiredStepInfo);
    });

    return stepsMap;
}

const addElements = (set, array) => {
    array.forEach((value) => {
        set.add(value);
    });
}

const contains = (firstArray, secondArray) => {
    if (firstArray.length === 0) {
        return true;
    }
    return firstArray.every(elem => secondArray.indexOf(elem) > -1);
}

const isValidStep = (step, stepsMap, visitedSteps) => {
    return contains(stepsMap.get(step).requiredSteps, Array.from(visitedSteps));
}

const findInitialSteps = (stepsMap) => {
    let initialSteps = new Array();
    stepsMap.forEach((value, key) => {
        if (value.requiredSteps.length === 0) {
            initialSteps.push(key);
        }
    });
    return initialSteps;
}

const getTotalDuration = (instructions) => {
    const stepsMap = getStepsMap(instructions);

    let initialSteps = findInitialSteps(stepsMap);

    const nextSteps = new Set();
    const visitedSteps = new Set();

    addElements(nextSteps, initialSteps);

    const workers = new Array(5).fill('.');
    const startMap = new Map();

    let currentSecond = 0;

    while(visitedSteps.size < NUMBER_OF_STEPS) {
        for (let i = 0; i < workers.length; i++) {
            if (workers[i] !== '.') {
                if (startMap.get(workers[i]) + (parseInt(workers[i], 36) - 9 + 60) === currentSecond) {
                    addElements(nextSteps, stepsMap.get(workers[i]).nextSteps);
                    visitedSteps.add(workers[i]);
                    workers[i] = '.';
                    i = -1;
                }
            } else {
                const sortedNextSteps = Array.from(nextSteps).sort();

                for (let j = 0; j < sortedNextSteps.length; j++) {
                    const step = sortedNextSteps[j];

                    if (isValidStep(step, stepsMap, visitedSteps)) {
                        startMap.set(step, currentSecond);
                        workers[i] = step;
                        nextSteps.delete(workers[i]);
                        break;
                    }
                };
            }
        };

        currentSecond = currentSecond + 1;
    }

    return currentSecond - 1;
}

const input = fs.readFileSync('input.txt', 'utf-8').split('\n');

const result = getTotalDuration(input);

console.log(`${result} seconds`);