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

const isSafeLocation = (i, j, coordinates) => {
    let distanceSum = 0;

    coordinates.forEach((coordinate) => {
        const arrayCoordinate = coordinate.split(', ');
        const x = parseInt(arrayCoordinate[0]);
        const y = parseInt(arrayCoordinate[1]);
        
        const distance = computeManhattanDistance(x, y, j, i);

        distanceSum += distance;
    });

    return distanceSum < 10000;
}

const getRegionArea = (grid, coordinates) => {
    let regionArea = 0;

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (isSafeLocation(i, j, coordinates)) {
                regionArea += 1;
            };
        }
    }

    return regionArea;
}

const findRegionArea = (input) => {
    const maxCoordinate = getMaxCoordinate(input);
    const width = maxCoordinate[0];
    const height = maxCoordinate[1];
    const grid = new Array(height + 1).fill('.').map(() => new Array(width + 1).fill('.'));
    
    populateGrid(grid, input);

    return getRegionArea(grid, input)
}

const input = fs.readFileSync('input.txt', 'utf-8').split('\n');

const result = findRegionArea(input);

console.log(`${result} is the size of the region`);