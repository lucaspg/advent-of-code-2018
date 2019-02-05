const fs = require('fs');

const buildClaim = (parsedClaim) => {
    const claim = {};

    claim.claimId = parseInt(parsedClaim[0]);
    claim.column = parseInt(parsedClaim[1]);
    claim.line = parseInt(parsedClaim[2]);
    claim.width = parseInt(parsedClaim[3]);
    claim.height = parseInt(parsedClaim[4]);

    return claim;
}

const parseClaim = (claim) => {
    const parsedClaim = claim.split(/[#,x]| @ |: /);
    parsedClaim.shift();
    return buildClaim(parsedClaim);
}

const claimFabric = (fabric, parsedClaim, overlapMap) => {
    const { claimId: newClaimId, column, line, width, height } = parsedClaim;

    overlapMap.set(newClaimId, false);

    for (let i = line; i < line + height; i++) {
        for (let j = column; j < column + width; j++) {
            const oldClaimId = fabric[i][j];
            if (oldClaimId !== 0) {
                overlapMap.set(oldClaimId, true);
                overlapMap.set(newClaimId, true);
            }
            fabric[i][j] = newClaimId;
        }
    }
}

const getKeyFromValue = (map, searchValue) => {
    for (let [key, value] of map.entries()) {
        if (value === searchValue) {
            return key;
        }
    }
}

const getNonOverlappedClaimId = (input) => {
    const fabric = new Array(1000).fill(0).map(() => new Array(1000).fill(0));
    const overlapMap = new Map();

    input.forEach((claim) => {
        const parsedClaim = parseClaim(claim);
        claimFabric(fabric, parsedClaim, overlapMap);
    })

    return getKeyFromValue(overlapMap, false);
}

const input = fs.readFileSync('input.txt', 'utf-8').split('\n');

const result = getNonOverlappedClaimId(input);

console.log(`${result} is the ID of the only claim that doesn't overlap`);