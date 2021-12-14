const fs = require('fs')

const input = fs.readFileSync("input.txt", "utf8");
const lines = input.split("\n");

let polymer = lines[0];

const rules = lines.slice(2).reduce((rules, line) => {
  const [from, to] = line.split(" -> ");
  rules[from] = to;
  return rules;
}, {});

for (let step = 1; step <= 10; step++) {
  let newPolymer = "";

  for (let i = 0; i < polymer.length - 1; i++) {
    const pair = polymer.slice(i, i+2);
    newPolymer += pair[0];
    if (rules[pair]) newPolymer += rules[pair];
  }

  polymer = newPolymer + polymer[polymer.length - 1];
}

const occurrences = {};
for (let i = 0; i < polymer.length; i++) {
  const c = polymer[i];
  occurrences[c] = 1 + (occurrences[c] || 0);
}

let min = Number.MAX_SAFE_INTEGER;
let max = 0;

Object.entries(occurrences).forEach(([, count]) => {
  min = Math.min(min, count);
  max = Math.max(max, count);
})

console.log({ answer: max - min });