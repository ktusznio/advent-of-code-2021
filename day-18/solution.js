const fs = require('fs');

const input = fs.readFileSync("./day-18/input.txt", "utf8").split("\n");

function magnitude(pair) {
  if (typeof(pair) === "string") return magnitude(JSON.parse(pair));
  if (typeof pair === "number") return pair;
  const [left, right] = pair;
  return 3 * magnitude(left) + 2 * magnitude(right);
}

function add(left, right) {
  return reduce(`[${left},${right}]`);
}

function reduce(pair) {
  while (true) {
    let curr = pair;

    pair = explode(pair);
    if (pair !== curr) continue;

    curr = pair;
    pair = split(pair);
    if (curr === pair) break;
  }

  return pair;
}

function explode(s) {
  let depth = 0;
  let i = 0;

  for (; i < s.length; i++) {
    if (s[i] === "[") depth++;
    else if (s[i] === "]") depth--;

    if (depth === 5) break;
  }

  if (depth !== 5) return s;

  // Find first numerical pair.
  let j = i + 1;
  while (s[j] !== "]") j++;
  i = j - 1;
  while (s[i] !== "[") i--;

  let pair = s.slice(i, j + 1);
  const [n1, n2] = JSON.parse(pair);

  const before = pushEnd(s.slice(0, i), n1);
  const after = pushStart(s.slice(j + 1), n2);

  const result = before + "0" + after;
  return result;
}

function pushEnd(s, n) {
  for (let i = s.length - 1; i >= 0; i--) {
    if (isNaN(parseInt(s[i]))) continue;

    let j = i - 1;
    while (!isNaN(parseInt(s[j]))) j--;

    const n0 = parseInt(s.slice(j+1, i+1));
    s = s.slice(0, j+1) + (n0 + n) + s.slice(i+1);
    break;
  }

  return s;
}

function pushStart(s, n) {
  for (let i = 0; i < s.length; i++) {
    if (isNaN(parseInt(s[i]))) continue;

    let j = i + 1;
    while (!isNaN(parseInt(s[j]))) j++;

    const n0 = parseInt(s.slice(i, j));
    s = s.slice(0, i) + (n0 + n) + s.slice(j);
    break;
  }

  return s;
}

function split(s) {
  for (let i = 0; i < s.length; i++) {
    if (isNaN(parseInt(s[i]))) continue;

    let j = i + 1;
    while (!isNaN(parseInt(s[j]))) j++

    let n = parseInt(s.slice(i, j));

    if (n >= 10) {
      q = n / 2;
      let n1 = Math.floor(q);
      let n2 = Math.ceil(q);

      s = s.slice(0, i) + `[${n1},${n2}]` + s.slice(j);

      return s;
    } else {
      i = j;
    }
  }
  
  return s;
}

// run against input

let sum = input[0];

for (let i = 1; i < input.length; i++) {
  const result = add(sum, input[i]);

  console.log(`  ${sum}`)
  console.log(`+ ${input[i]}`);
  console.log(`= ${result}`);
  console.log("");

  sum = result;
}

console.log(`answer part 1: `, magnitude(sum));

let maxMagnitude = 0;

for (let i = 0; i < input.length; i++) {
  for (let j = i+1; j < input.length; j++) {
    const mag1 = magnitude(add(input[i], input[j]));
    const mag2 = magnitude(add(input[j], input[i]));

    maxMagnitude = Math.max(maxMagnitude, mag1, mag2);
  }
}

console.log(`answer part 2: `, maxMagnitude);

return;

// test cases

let actual, expected;

// add() tests

actual = add("[[[[4,3],4],4],[7,[[8,4],9]]]", "[1,1]");
expected = "[[[[0,7],4],[[7,8],[6,0]]],[8,1]]";
console.log({ success: actual === expected, actual });

// explode() tests

actual = explode("[[[[[9,8],1],2],3],4]");
expected = "[[[[0,9],2],3],4]";
console.log({ success: expected === actual, actual });

actual = explode("[7,[6,[5,[4,[3,2]]]]]");
expected = "[7,[6,[5,[7,0]]]]";
console.log({ success: expected === actual, actual });

actual = explode("[[6,[5,[4,[3,2]]]],1]");
expected = "[[6,[5,[7,0]]],3]";
console.log({ success: expected === actual, actual });

actual = explode("[[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]]");
expected = "[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]";
console.log({ success: expected === actual, actual });

actual = explode("[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]");
expected = "[[3,[2,[8,0]]],[9,[5,[7,0]]]]";
console.log({ success: expected === actual, actual });

actual = explode("[[3,[2,[1,[7,3]]]],[[[[3,2],4],5],9]]");
expected = "[[3,[2,[8,0]]],[[[[6,2],4],5],9]]";
console.log({ success: expected === actual, actual });