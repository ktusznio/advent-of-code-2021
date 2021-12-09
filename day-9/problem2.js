const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf8');
const lines = input.split("\n");

const getAdjacents = (grid, point) => {
  const [i, j] = point;
  const points = [];
  
  if (i > 0) points.push([i-1, j]); // above
  if (j < grid[0].length - 1) points.push([i, j+1]); // right
  if (i < grid.length - 1) points.push([i+1, j]); // below
  if (j > 0) points.push([i, j-1]); // left

  return points;
}

const getLowpoints = (grid) => {
  const lowpoints = [];

  for (let i = 0; i < grid.length; i++) {
    const row = grid[i];

    for (let j = 0; j < row.length; j++) {
      const adjacents = getAdjacents(grid, [i, j]);
      const n = row[j];
      const isLowpoint = adjacents.every(([i, j]) => n < grid[i][j]);
      if (isLowpoint) lowpoints.push([i, j]);
    }
  }

  return lowpoints;
}

const getBasinSize = (grid, lowpoint) => {
  const queue = [];
  queue.push(lowpoint);

  const visited = {};
  while (queue.length > 0) {
    const [i, j] = queue.pop();
    if (visited[i + "," + j]) continue;

    const n = grid[i][j];
    visited[i + "," + j] = n;

    getAdjacents(grid, [i, j])
      .filter(([i, j]) => grid[i][j] < 9)
      .forEach(p => queue.push(p));
  }

  const size = Object.keys(visited).filter(key => visited[key] < 9).length;

  return size;
}

const grid = lines.map(line => line.split("").map(Number));
const lowpoints = getLowpoints(grid);
const sizes = lowpoints.map(([i, j]) => getBasinSize(grid, [i, j]));
const top3 = sizes.sort((a, b) => b - a).slice(0, 3);
const answer = top3[0] * top3[1] * top3[2];

console.log({ answer });