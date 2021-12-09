const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf8');

const findByLength = (len) => (a) => a.length === len;

const diff = (array, ...targets) => {
  const map = {};
  targets.forEach(c => map[c] = true);

  return array.filter(c => !map[c]);
}

const decodeDigits = (signals) => {
  const patterns = signals.split(" ");

  const one = patterns.find(findByLength(2)).split("");
  const four = patterns.find(findByLength(4)).split("");
  const seven = patterns.find(findByLength(3)).split("");
  const eight = patterns.find(findByLength(7)).split("");

  const C_F = one;
  const A = diff(seven, ...C_F);
  const B_D = diff(four, ...C_F);

  const two_three_five = patterns.filter(findByLength(5));
  const zero_six_nine = patterns.filter(findByLength(6));

  const nine = zero_six_nine.find(pattern => {
    return pattern.indexOf(C_F[0]) >= 0 &&
      pattern.indexOf(C_F[1]) >= 0 &&
      pattern.indexOf(B_D[0]) >= 0 &&
      pattern.indexOf(B_D[1]) >= 0;
  }).split("");

  const E = diff(eight, ...nine);
  const G = diff(nine, ...A, ...four);

  const two = two_three_five.find(pattern => {
    const d = diff(pattern.split(""), ...E).join("");
    return pattern !== d;
  }).split("");

  const C = diff(two, ...A, ...B_D, ...E, ...G);
  const F = diff(C_F, ...C);
  const D = diff(two, ...A, ...C, ...E, ...G)
  const B = diff(four, ...C, ...D, ...F)

  const zero = [...A, ...B, ...C, ...E, ...F, ...G];
  const three = [...A, ...C, ...D, ...F, ...G];
  const five = [...A, ...B, ...D, ...F, ...G];
  const six = [...A, ...B, ...D, ...E, ...F, ...G];

  const digits = [ zero, one, two , three, four, five, six, seven, eight, nine ]
    .map(arr => arr.sort().join(""));

  return digits;
};

const lines = input.split("\n");

const answer = lines.reduce((sum, line) => {
  const [signals, output] = line.split(" | ");

  const digits = decodeDigits(signals);

  const decodedOutput = output.split(" ").map(s => {
    const sorted = s.split("").sort().join("");
    return digits.findIndex(digit => sorted === digit);
  });

  return sum + Number(decodedOutput.join(""));
}, 0);

console.log({ answer })