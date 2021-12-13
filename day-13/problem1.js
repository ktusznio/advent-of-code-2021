const fs = require('fs')

const input = fs.readFileSync("input.txt", "utf8");
const lines = input.split("\n");

// Parse list of dots, tracking grid dimensions.
const dots = [];
let maxX = 0, maxY = 0;
let i;
for (i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (!line) break;
  const [x, y] = line.split(",").map(Number);
  dots.push([x, y]);
  maxX = Math.max(x, maxX);
  maxY = Math.max(y, maxY);
}

// Create grid.
let grid = Array.from({ length: maxY + 1 }).map(row => Array.from({ length: maxX + 1 }));
dots.forEach(([ x, y ]) => grid[y][x] = true);

// Follow fold instructions.
for (i++; i < lines.length; i++) {
  const instruction = lines[i];

  let [foldAxis, foldLine] = instruction.split("=");
  foldAxis = foldAxis[foldAxis.length - 1];
  foldLine = Number(foldLine);

  const foldFn = foldAxis === "y" ? foldY : foldX;
  foldFn(grid, foldLine);
}

function foldY(grid, foldY) {
  // Remove rows after fold.
  const rowsAfterFold = grid.splice(foldY);
  // Remove folded row.
  rowsAfterFold.splice(0, 1);

  // Create dots in remaining grid.
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const invI = grid.length - 1 - i;
      grid[i][j] = grid[i][j] || rowsAfterFold[invI][j];
    }
  }
}

function foldX(grid, foldX) {
  // Remove columns after fold.
  let colsAfterFold = [];
  grid.forEach(row => {
    // Remove folded column with splice(1).
    colsAfterFold.push(row.splice(foldX).splice(1));
  });

  // Create dots in remaining grid.
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const invJ = grid[i].length - 1 - j;
      grid[i][j] = grid[i][j] || colsAfterFold[i][invJ];
    }
  }
}

// For part 1.
const dotCount = grid.reduce((count, row) => {
  return count + row.filter(x => !!x).length;
}, 0)
console.log({ dotCount });

// For part 2.
grid.forEach(row => {
  console.log(row.map(x => x ? "#" : ".").join(""));
})