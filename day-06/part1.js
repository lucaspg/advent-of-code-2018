const fs = require('fs');

const getMaxCoordinate = (coordinates) => {
    let maxX = 0;
    let maxY = 0;

    coordinates.forEach((coordinate) => {
        const arrayCoordinate = coordinate.split(', ');

        const x = parseInt(arrayCoordinate[0]);
        if (x > maxX) {
            maxX = x;
        }

        const y = parseInt(arrayCoordinate[1]);
        if (y > maxY) {
            maxY = y;
        }
    });
    
    const maxCoordinate = [maxX, maxY];
    return maxCoordinate;
}

const populateGrid = (grid, coordinates) => {    
    coordinates.forEach((coordinate, index) => {
        const array = coordinate.split(', ');
        const x = parseInt(array[0]);
        const y = parseInt(array[1]);

        grid[y][x] = index;
    });
}

const computeManhattanDistance = (xA, yA, xB, yB) => {
    return Math.abs(xA - xB) + Math.abs(yA - yB);
}

const findClosestCoordinate = (i, j, coordinates) => {
    let minDistance = Number.POSITIVE_INFINITY;
    let closestCoordinate;
    const distanceMap = new Map();

    coordinates.forEach((coordinate, index) => {
        const array = coordinate.split(', ');
        const x = parseInt(array[0]);
        const y = parseInt(array[1]);

        const distance = computeManhattanDistance(x, y, j, i);

        const count = distanceMap.get(distance) ? distanceMap.get(distance) + 1 : 1;
        distanceMap.set(distance, count);

        if (distance < minDistance) {
            minDistance = distance;
            closestCoordinate = index;
        }
    });

    return distanceMap.get(minDistance) > 1 ? '.' : closestCoordinate;
}

const isInvalidCoordinate = (x, y, value, grid) => {
    return (x === 0 || x === grid.length - 1 || y === 0 || y === grid[0].length - 1
        || value === '.')
}

const getMaxArea = (grid, coordinates) => {
    let maxArea = 0;
    const areaMap = new Map();
    const invalidCoordinates = [];

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            const closestCoordinate = findClosestCoordinate(i, j, coordinates);
            grid[i][j] = closestCoordinate;

            if (isInvalidCoordinate(i, j, closestCoordinate, grid)) {
                invalidCoordinates.push(closestCoordinate);
            }

            if (!invalidCoordinates.includes(closestCoordinate)) {
                const count = areaMap.get(closestCoordinate) ? areaMap.get(closestCoordinate) + 1 : 1;
                
                areaMap.set(closestCoordinate, count);

                if (count > maxArea) {
                    maxArea = count;
                }
            }
        }
    }

    return maxArea;
}

const findLargestArea = (input) => {
    const maxCoordinate = getMaxCoordinate(input);
    const width = maxCoordinate[0];
    const height = maxCoordinate[1];
    const grid = new Array(height + 1).fill('.').map(() => new Array(width + 1).fill('.'));
    
    populateGrid(grid, input);

    return getMaxArea(grid, input)
}

const input = fs.readFileSync('input.txt', 'utf-8').split('\n');

const result = findLargestArea(input);

console.log(`${result} is the size of the largest area`);