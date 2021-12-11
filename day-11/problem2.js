const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf8');
const lines = input.split("\n");
const grid = lines.map(line => line.split("").map(Number));

const getAdjacents = (grid, point) => {
  const [i, j] = point;
  const points = [];

  const north = i > 0;
  const east = j < grid[0].length - 1;
  const south = i < grid.length - 1;
  const west = j > 0;
  
  if (north) points.push([i-1, j]);
  if (north && east) points.push([i-1, j+1]);

  if (east) points.push([i, j+1]);
  if (south && east) points.push([i+1, j+1]);

  if (south) points.push([i+1, j]);
  if (south && west) points.push([i+1, j-1]);

  if (west) points.push([i, j-1]);
  if (north && west) points.push([i-1, j-1]);

  return points;
}

const step = (grid) => {
  const flashed = {};

  // Increase energy levels.
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) grid[i][j]++;
  }

  // Do flashes.
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] > 9) flash(grid, i, j, flashed);
    }
  }

  // Check whether all flashed.
  let allFlashed = true;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] <= 9) {
        allFlashed = false;
        break;
      }
    }
    if (!allFlashed) break;
  }

  // Reset flashed octopuses.
  // See also: https://www.grammarly.com/blog/octopi-octopuses/
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] > 9) grid[i][j] = 0;
    }
  }

  return allFlashed;
}

const flash = (grid, i, j, flashed) => {
  if (grid[i][j] <= 9) return;

  const key = [i, j].join(",");
  if (flashed[key]) return;
  flashed[key] = true;

  const adjacents = getAdjacents(grid, [i, j]);
  adjacents.forEach(([i, j]) => grid[i][j]++);
  adjacents.forEach(([i, j]) => {
    if (grid[i][j] > 9) flash(grid, i, j, flashed);
  });
}

let answer = 1;
while (true) {
  const allFlashed = step(grid);
  if (allFlashed) break;
  answer++;
};

console.log({ answer });