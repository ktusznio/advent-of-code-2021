const fs = require('fs')

let input;

try {
  input = fs.readFileSync('input.txt', 'utf8')
  // input = input.split("\n");
} catch (err) {
  console.error(err)
  return;
}

let fish = input.split(",").map(Number);

for (let day = 1; day <= 80; day++) {
  console.log({ day, fish: fish.length });
  const newFish = [];

  fish = fish.map(f => {
    if (f === 0) {
      newFish.push(8);
      return 6;
    }
    return f - 1;
  });

  fish = fish.concat(newFish);
}

console.log({ answer: fish.length });
