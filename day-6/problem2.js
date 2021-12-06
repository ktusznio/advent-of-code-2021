const fs = require('fs')

// const file = "input.sample";
const file = "input.txt";

let input;
try {
  input = fs.readFileSync(file, 'utf8')
  input = input.split("\n");
} catch (err) {
  console.error(err)
  return;
}

let map = {};

input[0].split(",").forEach(timer => {
  const t = Number(timer);
  map[t] ? map[t]++ : map[t] = 1;
});

for (let day = 1; day <= 256; day++) {
  const newMap = {};

  for (const [timer, count] of Object.entries(map)) {
    const t = Number(timer);

    if (t === 0) {
      newMap[6] = (newMap[6] || 0) + count;
      newMap[8] = count;
    } else {
      newMap[t - 1] = (newMap[t - 1] || 0) + count;
    }
  }

  map = newMap;
  console.log(`after day ${day}: `, map);
}

const answer = Object.values(map).reduce((acc, n) => acc + n, 0);

console.log({ answer });
