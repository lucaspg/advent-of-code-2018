const fs = require('fs');

const countCharacters = (boxId) => {
    const characterMap = new Map();

    boxId.split("").forEach((character) => {
        const oldCount = characterMap.get(character);
        const newCount = oldCount ? oldCount + 1 : 1;
        characterMap.set(character, newCount);
    });

    return characterMap;
}

const getChecksum = (input) => {
    let wordsWithtwoIdenticalLetters = 0;
    let wordsWithThreeIdenticalLetters = 0;

    input.forEach((boxId) => {
        const characterOccurences = Array.from(countCharacters(boxId).values());

        if (characterOccurences.includes(2)) { 
            wordsWithtwoIdenticalLetters += 1;
        }

        if (characterOccurences.includes(3)) { 
            wordsWithThreeIdenticalLetters += 1;
        }
    });

    return wordsWithtwoIdenticalLetters * wordsWithThreeIdenticalLetters;
}

const input = fs.readFileSync('input.txt', 'utf-8').split('\n');

const result = getChecksum(input);

console.log(`The checksum is: ${result}`);