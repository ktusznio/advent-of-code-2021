const fs = require('fs')

let data;

try {
  data = fs.readFileSync('input.txt', 'utf8')
} catch (err) {
  console.error(err)
  return;
}

const lines = data.split("\n");
const threeSums = [];

for (let i = 0; i < lines.length - 2; i++) {
  const x = Number(lines[i]);
  const y = Number(lines[i + 1]);
  const z = Number(lines[i + 2]);

  threeSums.push(x + y + z);
}

let count = 0;

for (let i = 1; i < threeSums.length; i++) {
  const prev = threeSums[i - 1];
  const curr = threeSums[i];

  if (curr > prev) count++;
}

console.log({ count });
