const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf8');

const lines = input.split("\n");
let answer = 0;

lines.forEach(line => {
  const [patterns, output] = line.split(" | ");
  const digits = output.split(" ");

  answer += digits.filter(digit => [2, 3, 4, 7].indexOf(digit.length) >= 0).length;
});

console.log({ answer });