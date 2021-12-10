const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf8');
const lines = input.split("\n");

const getAutocompleteScore = (line) => {
  const stack = [];

  for (let i = 0; i < line.length; i++) {
    const c = line[i];

    if ("([{<".indexOf(c) >= 0) {
      stack.push(c);
      continue;
    }
    
    const last = stack[stack.length - 1];

    if (c === ")" && last !== "(") return -1;
    if (c === "]" && last !== "[") return -1;
    if (c === "}" && last !== "{") return -1;
    if (c === ">" && last !== "<") return -1;

    const popped = stack.pop();
  }

  stack.reverse();

  const score = stack.reduce((sum, c) => {
    let score = 0;

    if (c === "(") score = 1;
    if (c === "[") score = 2;
    if (c === "{") score = 3;
    if (c === "<") score = 4;

    return (sum * 5) + score;
  }, 0);

  return score;
}

const nonErrorScores = lines
  .map(getAutocompleteScore)
  .filter(s => s > -1)
  .sort((a, b) => a - b);
const mid = Math.floor(nonErrorScores.length / 2);
const answer = nonErrorScores[mid];

console.log({ answer });