const fs = require('fs')

let data;

try {
  data = fs.readFileSync('input.txt', 'utf8')
} catch (err) {
  console.error(err)
  return;
}

const lines = data.split("\n");
let h = 0, d = 0, aim = 0;

lines.forEach((line) => {
  const [dir, number] = line.split(" ");
  const n = Number(number);

  if (dir === "forward") {
    h += n;
    d += aim * n;
  }
  else if (dir === "down") aim += n;
  else if (dir === "up") aim -= n;

  if (Object.is(NaN, h) || Object.is(NaN, d)) console.log("NaN!", line, h, d);
});

console.log(h, d, aim, h * d);
