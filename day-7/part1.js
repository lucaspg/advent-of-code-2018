const fs = require('fs');

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

const findStepsOrder = (instructions) => {
    const stepsMap = getStepsMap(instructions);

    let initialSteps = findInitialSteps(stepsMap);
    let initialStep = initialSteps.sort()[0];

    const nextSteps = new Set();
    const visitedSteps = new Set();

    let currentStep = initialStep;

    addElements(nextSteps, initialSteps);
    visitedSteps.add(currentStep);

    while (nextSteps.size > 0) {
        addElements(nextSteps, stepsMap.get(currentStep).nextSteps);

        const sortedNextSteps = Array.from(nextSteps).sort();

        for (let i = 0; i < sortedNextSteps.length; i++) {
            const step = sortedNextSteps[i];

            if (isValidStep(step, stepsMap, visitedSteps)) {
                currentStep = step;
                visitedSteps.add(currentStep);
                nextSteps.delete(currentStep);
                break;
            }
        };
    }

    return Array.from(visitedSteps).join('');
}

const input = fs.readFileSync('input.txt', 'utf-8').split('\n');

const result = findStepsOrder(input);

console.log(`${result} is the order of steps`);