const fs = require('fs');

const input = fs.readFileSync("./day-18/input.sample", "utf8").split("\n");

function magnitude(num) {
  if (typeof num === "number") return num;
  const [left, right] = num;
  return 3 * magnitude(left) + 2 * magnitude(right);
}

function add(left, right) {
  const sum = [left, right];
  return reduce(sum);
}

function reduce(num) {
  let notDone = true;
  while (notDone) {
    const result = explode(num);
    if (result && result.exploded) continue;

    notDone = split(num);
  }

  return num;
}

function applyExplosionLeft(pair, result) {
  if (typeof pair[0] === "number") {
    pair[0] += result.left;
    delete result.left;
    return;
  }

  applyExplosionLeft(pair[0], result);
}

function explode(num, depth = 0) {
  if (depth === 4 && typeof num === "object") {
    return { exploded: true, left: num[0], right: num[1] };
  }

  let result, explodedLeft;

  // Explode left.
  if (typeof num[0] === "object") {
    result = explode(num[0], depth + 1);
    explodedLeft = !!result;

    if (result && depth === 3) {
      num[0] = 0;
      if (typeof num[1] === "number") {
        num[1] += result.right;
        delete result.right;
      }
    }
  }

  // Explode right.
  if (!result && typeof num[1] === "object") {
    result = explode(num[1], depth + 1);

    if (result && depth === 3) {
      num[1] = 0;
      if (typeof num[0] === "number") {
        num[0] += result.left;
        delete result.left;
      }
    }
  }

  if (depth < 3 && result && result.left && typeof num[0] === "number") {
    num[0] += result.left;
    delete result.left;
  }

  if (depth < 3 && result && result.right && typeof num[1] === "number") {
    num[1] += result.right;
    delete result.right;
  }

  if (depth === 0 && result) {
    if (result.right && explodedLeft) {
      applyExplosionLeft(num[1], { left: result.right });
    }
  }

  if (depth === 0 && !result) {
    return explode(num[1], 1);
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

let sum = JSON.parse(input[0]);

for (let i = 1; i < input.length; i++) {
  const toAdd = JSON.parse(input[i]);
  sum = add(sum, toAdd);
}

console.log({ sum: JSON.stringify(sum) });
console.log({ answer: magnitude(sum) });

// explode() test cases:
// ---------------------
// let arr = [[[[[9,8],1],2],3],4];
// explode(arr);
// let expected = '[[[[0,9],2],3],4]';
// let actual = JSON.stringify(arr);
// console.log({ success: expected === actual, actual });
// arr = [7,[6,[5,[4,[3,2]]]]];
// explode(arr);
// expected = '[7,[6,[5,[7,0]]]]';
// actual = JSON.stringify(arr);
// console.log({ success: expected === actual, actual });
// arr = [[6,[5,[4,[3,2]]]],1];
// explode(arr);
// expected = '[[6,[5,[7,0]]],3]';
// actual = JSON.stringify(arr);
// console.log({ success: expected === actual, actual });
// arr = [[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]];
// explode(arr);
// expected = '[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]';
// actual = JSON.stringify(arr);
// console.log({ success: expected === actual, actual });
// arr = [[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]];
// explode(arr);
// expected = '[[3,[2,[8,0]]],[9,[5,[7,0]]]]';
// actual = JSON.stringify(arr);
// console.log({ success: expected === actual, actual });
// arr = [[3,[2,[1,[7,3]]]],[[[[3,2],4],5],9]];
// explode(arr);
// expected = JSON.stringify([[3,[2,[8,0]]],[[[[6,2],4],5],9]]);
// actual = JSON.stringify(arr);
// console.log({ success: expected === actual, actual });