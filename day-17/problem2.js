const fs = require('fs');

const input = fs.readFileSync("./input.txt", "utf8");

const [xT, yT] = input.slice("target area: ".length).split(", ");
const [xTmin, xTmax] = xT.slice("x=".length).split("..").map(Number);
const [yTmin, yTmax] = yT.slice("y=".length).split("..").map(Number);

const landings = {};

for (let dxStart = 1; dxStart <= xTmax; dxStart++) {
  // Guessing at dyStart :/
  for (let dyStart = 10000; dyStart >= yTmin; dyStart--) {
    let dx = dxStart;
    let dy = dyStart;
    let [x, y] = [0, 0];

    while (x + dx <= xTmax && y + dy >= yTmin) {
      x += dx;
      y += dy;

      if (dx !== 0) {
        dx > 0 ? dx-- : dx++;
      } else if (x < xTmin) {
        break;
      }
      dy--;
    }

    if (x >= xTmin && x <= xTmax && y >= yTmin && y <= yTmax) {
      landings[dxStart + "," + dyStart] = true;
    }
  }
}

console.log({ answer: Object.keys(landings).length });