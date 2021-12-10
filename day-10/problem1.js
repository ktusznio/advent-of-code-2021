const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf8');
const lines = input.split("\n");

const getErrorScore = (line) => {
  const stack = [];

  for (let i = 0; i < line.length; i++) {
    const c = line[i];

    if ("([{<".indexOf(c) >= 0) {
      stack.push(c);
      continue;
    }
    
    const last = stack[stack.length - 1];

    if (c === ")" && last !== "(") return 3;
    if (c === "]" && last !== "[") return 57;
    if (c === "}" && last !== "{") return 1197;
    if (c === ">" && last !== "<") return 25137;

    const popped = stack.pop();
  }

  return 0;
}

const answer = lines.reduce((sum, line, i) => {
  return sum + getErrorScore(line);
}, 0)

console.log({ answer });