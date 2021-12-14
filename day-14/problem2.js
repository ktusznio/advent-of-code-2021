const fs = require('fs')

const input = fs.readFileSync("input.txt", "utf8");
const lines = input.split("\n");

// Read inputs.
let polymer = lines[0];

const rules = lines.slice(2).reduce((rules, line) => {
  const [from, to] = line.split(" -> ");
  rules[from] = to;
  return rules;
}, {});

// Create pairs object.
let pairs = {};
for (let i = 0; i < polymer.length - 1; i++) {
  const pair = polymer.slice(i, i+2);
  pairs[pair] = 1 + (pairs[pair] || 0);
}

// Create occurrences object.
const occ = {};
for (let i = 0; i < polymer.length; i++) {
  const c = polymer[i];
  occ[c] = 1 + (occ[c] || 0);
}

for (let step = 1; step <= 40; step++) {
  // On each step, iterate over the pairs and their counts.
  Object.entries(pairs).forEach(([pair, count]) => {
    const newChar = rules[pair];
    if (!newChar) return;

    // Create new pairs.
    const np1 = pair[0] + newChar;
    const np2 = newChar + pair[1];

    // Increase counts of the new pairs & decrease count of the replaced pair.
    pairs[np1] = count + (pairs[np1] || 0);
    pairs[np2] = count + (pairs[np2] || 0);
    if (pairs[pair]) pairs[pair] -= count;

    // Increment count of the new character.
    occ[newChar] = count + (occ[newChar] || 0);
  });
}

let min = Number.MAX_SAFE_INTEGER;
let max = 0;

Object.entries(occ).forEach(([, count]) => {
  min = Math.min(min, count);
  max = Math.max(max, count);
})

console.log({ answer: max - min });