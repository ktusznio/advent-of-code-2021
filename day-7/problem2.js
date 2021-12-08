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

const stepCosts = [1, 3, 6];

function getCost(d) {
  if (d === 0) return 0;
  if (stepCosts[d - 1]) return stepCosts[d - 1];

  for (let i = stepCosts.length; i < d; i++) {
    stepCosts.push(stepCosts[i - 1] + i + 1);
  }

  return stepCosts[d - 1];
}

for (let p = min; p <= max; p++) {
  let pAnswer = 0;

  for (let i = 0; i < positions.length; i++) {
    const distance = Math.abs(positions[i] - p);

    pAnswer += getCost(distance);

    if (pAnswer >= answer) break;
  }

  answer = Math.min(answer, pAnswer);
}

console.log({ answer });
