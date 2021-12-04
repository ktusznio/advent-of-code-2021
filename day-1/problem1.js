const fs = require('fs')

let data;

try {
  data = fs.readFileSync('input.txt', 'utf8')
} catch (err) {
  console.error(err)
  return;
}

const lines = data.split("\n");
let count = 0;

for (let i = 1; i < lines.length; i++) {
  const prev = Number(lines[i - 1]);
  const curr = Number(lines[i]);

  if (curr > prev) count++;
}

console.log({ count });
