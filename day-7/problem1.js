const fs = require('fs')

let input;

try {
  input = fs.readFileSync('input.txt', 'utf8')
} catch (err) {
  console.error(err)
  return;
}

const positions = input.split(",").map(Number);
const min = Math.min(...positions);
const max = Math.max(...positions);
let answer = Number.MAX_SAFE_INTEGER;

for (let p = min; p <= max; p++) {
  let pAnswer = 0;

  for (let i = 0; i < positions.length; i++) {
    pAnswer += Math.abs(positions[i] - p);

    if (pAnswer >= answer) break;
  }

  answer = Math.min(answer, pAnswer);
}

console.log({ answer });
