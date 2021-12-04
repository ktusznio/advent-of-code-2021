const fs = require('fs')

let input;

try {
  input = fs.readFileSync('input.txt', 'utf8')
  input = input.split("\n");
} catch (err) {
  console.error(err)
  return;
}

const isX = n => n === "x";

class Board {
  constructor(rows) {
    this.grid = rows.map(row => row.split(' ').filter(Boolean).map(Number));
    this.map = this.grid.reduce((map, row, rowIndex) => {
      row.forEach((n, columnIndex) => map[n] = [rowIndex, columnIndex]);
      return map;
    }, {});
  }

  mark(n) {
    if (!this.map[n]) return;

    const [row, col] = this.map[n];
    this.grid[row][col] = "x";
    return this.checkBingo(row, col);
  }

  checkBingo(row, col) {
    return this.grid[row].every(isX) ||
      this.grid.map(row => row[col]).every(isX);
  }

  getScore() {
    return this.grid.reduce((sum, row) => {
      const rowSum = row.reduce((sumR, n) => sumR + (n === "x" ? 0 : n), 0);
      return sum + rowSum;
    }, 0);
  }
}

const numbers = input[0].split(",").map(Number);
const boards = [];

for (let i = 2; i < input.length; i+= 6) {
  const boardRows = input.slice(i, i+5);
  boards.push(new Board(boardRows));
}

let board, boardIndex, n;
let bingo = false;

for (let i = 0; i < numbers.length; i++) {
  n = numbers[i];

  for (boardIndex = 0; boardIndex < boards.length; boardIndex++) {
    board = boards[boardIndex];
    bingo = board.mark(n);

    //console.log("marked: ", n);
    //console.log(board);
    //console.log({ bingo });

    if (bingo) break;
  }

  if (bingo) break;
}

console.log(board);
console.log({ n, boardIndex, answer: n * board.getScore() });
