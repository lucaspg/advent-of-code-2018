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

const claimFabric = (fabric, parsedClaim) => {
    const { column, line, width, height } = parsedClaim;

    let squareInches = 0;

    for (let i = line; i < line + height; i++) {
        for (let j = column; j < column + width; j++) {
            fabric[i][j] += 1;
            if (fabric[i][j] === 2) {
                squareInches += 1;
            }
        }
    }

    return squareInches;
}

const getSquareInches = (input) => {
    let totalSquareInches = 0;
    const fabric = new Array(1000).fill(0).map(() => new Array(1000).fill(0));
    input.forEach((claim) => {
        const parsedClaim = parseClaim(claim);
        totalSquareInches += claimFabric(fabric, parsedClaim);
    })
    
    return totalSquareInches;
}

const input = fs.readFileSync('input.txt', 'utf-8').split('\n');

const result = getSquareInches(input);

console.log(`${result} square inches of fabric are within two or more claims`);