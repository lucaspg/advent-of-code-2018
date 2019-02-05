const fs = require('fs');

const displayGrid = (grid, minX, maxX, minY, maxY) => {
    const startX = minX + Math.abs(minX);
    const endX = maxX + Math.abs(minX);

    const startY = minY + Math.abs(minY);
    const endY = maxY + Math.abs(minY);

    for (let i = startY; i <= endY; i++) {
        let string = '';

        for (let j = startX; j < endX; j++) {
            string += grid[i][j];
        }
        
        console.log(string);
    }
}


const alignStars = (positions, velocities) => {
    let second = 0;

    while (true) {
        second++;

        let maxX = Number.NEGATIVE_INFINITY;
        let minX = Number.POSITIVE_INFINITY;

        let maxY = Number.NEGATIVE_INFINITY;
        let minY = Number.POSITIVE_INFINITY;

        for (let i = 0; i < positions.length; i++) {
            const x = positions[i][0] + velocities[i][0];
            positions[i][0] = x;
            
            if (x > maxX) {
                maxX = x;
            }
            if (x < minX) {
                minX = x;
            }
            
            const y = positions[i][1] + velocities[i][1];
            positions[i][1] = y;

            if (y > maxY) {
                maxY = y;
            }
            if (y < minY) {
                minY = y;
            }
        }

        if (maxY - minY < 70 && maxX - minX < 70) {
            const width = Math.abs(maxX) + Math.abs(minX) + 1;
            const height = Math.abs(maxY) + Math.abs(minY) + 1;
            const grid = new Array(height).fill('.').map(() => new Array(width).fill('.'));

            positions.forEach((position) => {
                const x = position[0] + Math.abs(minX);
                const y = position[1] + Math.abs(minY);

                grid[y][x] = '#';
            });

            displayGrid(grid, minX, maxX, minY, maxY);

            return second;
        }
    }
}

const positions = new Array();
const velocities = new Array();

const input = fs.readFileSync('input.txt', 'utf-8').split('\n').forEach((line) => {
    const array = line.match(/-\d+|\d+/g).map((number) => parseInt(number));
    positions.push([array[0], array[1]]);
    velocities.push([array[2], array[3]]);
});

const result = alignStars(positions, velocities);

console.log(`${result} seconds`);