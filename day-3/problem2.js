const fs = require('fs')

let data;

try {
  data = fs.readFileSync('input.txt', 'utf8')
} catch (err) {
  console.error(err)
  return;
}

const lines = data.split("\n");

function mostCommonBit(numbers, index) {
  let zeros = 0, ones = 0;

  numbers.forEach((number) => {
    number[index] === "0" ? zeros++ : ones++;
  });

  return ones >= zeros ? "1" : "0";
}

function leastCommonBit(numbers, index) {
  let zeros = 0, ones = 0;

  numbers.forEach((number) => {
    number[index] === "0" ? zeros++ : ones++;
  });

  return zeros <= ones ? "0" : "1";
}

let candidates = [...lines];
let index = 0;

while (candidates.length > 1 && index < lines[0].length) {
  const bit = mostCommonBit(candidates, index);

  candidates = candidates.filter(candidate => candidate[index] === bit);

  index++;
}

const ogRating = candidates[0];

candidates = [...lines];
index = 0;

while (candidates.length > 1 && index < lines[0].length) {
  const bit = leastCommonBit(candidates, index);

  candidates = candidates.filter(candidate => candidate[index] === bit);

  index++;
}

const csRating = candidates[0];

console.log(ogRating, csRating, parseInt(ogRating, 2) * parseInt(csRating, 2));
