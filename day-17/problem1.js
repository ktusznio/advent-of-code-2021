const fs = require('fs');

const input = fs.readFileSync("./input.txt", "utf8");

const [xT, yT] = input.slice("target area: ".length).split(", ");
const [xTmin, xTmax] = xT.slice("x=".length).split("..").map(Number);
const [yTmin, yTmax] = yT.slice("y=".length).split("..").map(Number);

let answer = Number.MIN_SAFE_INTEGER;

for (let dxStart = 1; dxStart <= xTmax; dxStart++) {
  // Guessing at dyStart :/
  for (let dyStart = 100; dyStart > 0; dyStart--) {
    let dx = dxStart;
    let dy = dyStart;
    let [x, y] = [0, 0];
    let yMax = 0;

    while (x + dx <= xTmax && y + dy >= yTmin) {
      x += dx;
      y += dy;
      yMax = Math.max(yMax, y);

      if (dx !== 0) {
        dx > 0 ? dx-- : dx++;
      } else if (x < xTmin) {
        break;
      }
      dy--;
    }

    if (x >= xTmin && x <= xTmax && y >= yTmin && y <= yTmax) {
      console.log(`[${dxStart}, ${dyStart}] landed in target.`, { answer, yMax });
      answer = Math.max(yMax, answer);
    }
  }
}

console.log({ answer });