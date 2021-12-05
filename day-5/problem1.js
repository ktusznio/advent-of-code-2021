const fs = require('fs')

let input;

try {
  input = fs.readFileSync('input.txt', 'utf8')
  input = input.split("\n");
} catch (err) {
  console.error(err)
  return;
}

class Line {
  constructor(p1, p2) {
    this.p1 = p1.split(",").map(Number);
    this.p2 = p2.split(",").map(Number);
  }

  getPoints() {
    const points = [];

    const [x1, y1] = this.p1;
    const [x2, y2] = this.p2;

    if (x1 === x2) {
      const yStart = Math.min(y1, y2);
      const yEnd = Math.max(y1, y2);

      for (let y = yStart; y <= yEnd; y++) points.push([x1, y]);
    } else if (y1 === y2) {
      const xStart = Math.min(x1, x2);
      const xEnd = Math.max(x1, x2);

      for (let x = xStart; x <= xEnd; x++) points.push([x, y1]);
    } else {
      return [];
    }

    return points;
  }
}

const map = {};

input.forEach(string => {
  if (!string) return;

  console.log({ string });
  const [p1, p2] = string.split(" -> ");

  const line = new Line(p1, p2);
  const points = line.getPoints();

  points.forEach(([x, y]) => {
    const key = [x, y].join(",");
    map[key] ? map[key]++ : map[key] = 1;
  });
});


let answer = 0;

for (const [point, count] of Object.entries(map)) {
  if (count >= 2) answer++;
}

console.log({ answer });
