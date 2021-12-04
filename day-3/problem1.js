const fs = require('fs')

let data;

try {
  data = fs.readFileSync('input.txt', 'utf8')
} catch (err) {
  console.error(err)
  return;
}

const lines = data.split("\n");
const counts = Array.from({ length: lines[0].length }).map(() => ({ zeros: 0, ones: 0 }));

lines.forEach((line) => {
  line.split("").forEach((digit, index) => {
    if (digit === "0") {
      counts[index].zeros += 1;
    } else {
      counts[index].ones += 1;
    }
  });
});

const gamma = counts.map(count => {
  return count.zeros >= count.ones ? "0" : "1";
}).join("");

const epsilon = gamma.split("").map(bit => {
  return bit === "0" ? "1" : "0";
}).join("");

console.log(parseInt(gamma, 2) * parseInt(epsilon, 2));
