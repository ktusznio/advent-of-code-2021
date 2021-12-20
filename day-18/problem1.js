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
    console.log(JSON.stringify(pair));
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

for (let i = 1; i < input.length; i++) {
  const pair2 = JSON.parse(input[i]);
  pair = add(pair, pair2);
}

console.log("problem 1");
console.log( JSON.stringify(pair) );
console.log({ answer: magnitude(pair) });

// let arr = [[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]];
// explode(arr)
// console.log(JSON.stringify(arr) === "[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]")
// 
// arr = [[3,[[1,[7,3]],2]],[6,[5,[4,[3,2]]]]];
// explode(arr)
// console.log(JSON.stringify(arr));
// console.log(JSON.stringify(arr) === "[[3,[[8,0],5]],[6,[5,[4,[3,2]]]]]")

// let pair = [
//   [[[[7,0],[7,7]],[[7,7],[7,8]]],[[[7,7],[8,8]],[[7,7],[8,7]]]],
//   [7,[5,[[3,8],[1,4]]]]
// ];
// reduce(pair);

// explode() test cases:
// ---------------------
// let arr = [[[[[9,8],1],2],3],4];
// explode(arr);
// let expected = '[[[[0,9],2],3],4]';
// let actual = JSON.stringify(arr);
// console.log({ success: expected === actual, actual });
// 
// arr = [7,[6,[5,[4,[3,2]]]]];
// explode(arr);
// expected = '[7,[6,[5,[7,0]]]]';
// actual = JSON.stringify(arr);
// console.log({ success: expected === actual, actual });
// 
// arr = [[6,[5,[4,[3,2]]]],1];
// explode(arr);
// expected = '[[6,[5,[7,0]]],3]';
// actual = JSON.stringify(arr);
// console.log({ success: expected === actual, actual });
// 
// arr = [[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]];
// explode(arr);
// expected = '[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]';
// actual = JSON.stringify(arr);
// console.log({ success: expected === actual, actual });
// 
// arr = [[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]];
// explode(arr);
// expected = '[[3,[2,[8,0]]],[9,[5,[7,0]]]]';
// actual = JSON.stringify(arr);
// console.log({ success: expected === actual, actual });
// 
// arr = [[3,[2,[1,[7,3]]]],[[[[3,2],4],5],9]];
// explode(arr);
// expected = JSON.stringify([[3,[2,[8,0]]],[[[[6,2],4],5],9]]);
// actual = JSON.stringify(arr);
// console.log({ success: expected === actual, actual });