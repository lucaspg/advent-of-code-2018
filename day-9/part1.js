const fs = require('fs');

const getHighestScore = (numPlayers, numMarbles) => {

    let currentMarble = { value: 0 };
    currentMarble.next = currentMarble;
    currentMarble.prev = currentMarble;

    let currentPlayer = 0;

    const pointsMap = new Map();
    let maxPoints = 0;

    for (let marble = 1; marble <= numMarbles; marble++) {
        
        currentPlayer = (currentPlayer + 1) % numPlayers;

        if (marble % 23 === 0) {
            let nextMarble = currentMarble;

            for (let i = 0; i < 7; i++) {
                nextMarble = nextMarble.prev;
            }

            const marblePoints = nextMarble.value;
            nextMarble.prev.next = nextMarble.next;
            nextMarble.next.prev = nextMarble.prev;
            currentMarble = nextMarble.next;

            const oldPlayerPoints = pointsMap.get(currentPlayer) ? pointsMap.get(currentPlayer) : 0;
            const newPlayerPoints = oldPlayerPoints + marblePoints + marble;

            if (newPlayerPoints > maxPoints) {
                maxPoints = newPlayerPoints;
            }

            pointsMap.set(currentPlayer, newPlayerPoints);
        } else {
            const nextMarble = currentMarble.next;
            const newMarble = { value: marble, next: nextMarble.next, prev: nextMarble };
            
            nextMarble.next.prev = newMarble;
            nextMarble.next = newMarble;
            currentMarble = newMarble;
        }
    }

    return maxPoints;
}

const input = fs.readFileSync('input.txt', 'utf-8').match(/\d+/g).map((number) => parseInt(number));

const result = getHighestScore(input[0], input[1]);

console.log(`${result} is the highest score`);