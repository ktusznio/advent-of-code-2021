const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf8');
const lines = input.split("\n");

const grid = lines.map(line => line.split("").map(Number));

let answer = 0;

for (let i = 0; i < grid.length; i++) {
  const row = grid[i];

  for (let j = 0; j < row.length; j++) {
    const n = row[j];

    if (
      (i === 0 || n < grid[i-1][j]) && // above
      (j === row.length - 1 || n < grid[i][j+1]) && // right
      (i === grid.length - 1 || n < grid[i+1][j]) && // below
      (j === 0 || n < grid[i][j-1]) // right
    ) {
      answer += n + 1;
    }
  }
}

console.log({ answer });