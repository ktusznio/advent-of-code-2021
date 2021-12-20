const fs = require('fs');

const input = fs.readFileSync("./day-18/input.sample", "utf8").split("\n");

function magnitude(num) {
  if (typeof num === "number") return num;
  const [left, right] = num;
  return 3 * magnitude(left) + 2 * magnitude(right);
}

function add(left, right) {
  return reduce([left, right]);
}

function reduce(pair) {
  while (true) {
    if (explode(pair)) continue;
    if (!split(pair)) break;
  }

  return pair;
}

function pushRight(pair, n) {
  if (!n) return pair;
  if (typeof pair === "number") return pair + n;
  return [pushRight(pair[0], n), pair[1]];
}

function pushLeft(pair, n) {
  if (!n) return pair;
  if (typeof pair === "number") return pair + n;
  return [pair[0], pushLeft(pair[1], n)];
}

function explode(pair, depth = 0, lastLeft = null, lastRight = null) {
  if (typeof pair === "number") {
    return;
  }

  const [left, right] = pair;

  if (depth === 3) {
    if (typeof left === "object") {
      pair[0] = 0;
      pair[1] = pushRight(pair[1], left[1]);

      return { pushLeft: left[0], insert: lastRight };
    }

    if (typeof right === "object") {
      pair[1] = 0;
      pair[0] = pushLeft(pair[0], right[0]);

      return { pushRight: right[1], insert: lastLeft };
    }
  }

  let result = explode(left, depth + 1, depth, lastRight);

  if (!result) result = explode(right, depth + 1, lastLeft, depth);

  if (result && result.pushLeft && result.insert === depth) {
    pair[0] = pushLeft(pair[0], result.pushLeft);
    delete result.pushLeft;
  }

  if (result && result.pushRight && result.insert === depth) {
    pair[1] = pushRight(pair[1], result.pushRight);
    delete result.pushRight;
  }

  return result;
}

function split(pair) {
  if (typeof pair === "number") return;

  for (let i = 0; i < pair.length; i++) {
    let n = pair[i];
    if (typeof n === "number" && n >= 10) {
      q = n / 2;
      pair[i] = [Math.floor(q), Math.ceil(q)];
      return true;
    }
  }

  return split(pair[0]) || split(pair[1]);
}

let answer = 0;

for (let i = 0; i < input.length; i++) {
  for (let j = i+1; j < input.length; j++) {
    let pair1 = JSON.parse(input[i]);
    let pair2 = JSON.parse(input[j]);

    const mag1 = magnitude(add(pair1, pair2));

    pair1 = JSON.parse(input[i]);
    pair2 = JSON.parse(input[j]);

    const mag2 = magnitude(add(pair2, pair1));

    answer = Math.max(answer, mag1, mag2);
  }
}

console.log({ answer });