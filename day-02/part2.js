const fs = require('fs');

const getCommonLetters = (firstBoxId, secondBoxId) => {
    let result = "";

    for (let i = 0; i < firstBoxId.length; i++) {
        if (firstBoxId.charAt(i) === secondBoxId.charAt(i)) {
            result += firstBoxId.charAt(i);
        }
    }

    return result;
}

const isSimilar = (firstBoxId, secondBoxId) => {
    let differences = 0;

    for (let i = 0; i < firstBoxId.length; i++) {
        if (firstBoxId.charAt(i) !== secondBoxId.charAt(i)) {
            differences += 1;
        }

        if (differences > 1) {
            return false;
        }
    }

    return true;
}

const getSimilarBoxIds = (input) => {
    for (let i = 0; i < input.length; i++) {
        const firstBoxId = input[i];

        for (let j = i + 1; j < input.length; j++) {
            const secondBoxId = input[j];
            
            if (isSimilar(firstBoxId, secondBoxId)) {
                return getCommonLetters(firstBoxId, secondBoxId);
            };
        }
    }
}

const input = fs.readFileSync('input.txt', 'utf-8').split('\n');

const result = getSimilarBoxIds(input);

console.log(`The boxId is: ${result}`);