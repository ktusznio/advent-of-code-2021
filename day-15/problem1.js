const fs = require('fs');

const input = fs.readFileSync("./input.txt", "utf8");
const lines = input.split("\n");
const grid = lines.map(line => line.split("").map(Number));

class Node {
  constructor(x, y, distance) {
    this.distance = distance;
    this.key = x + "," + y;
    this.x = x;
    this.y = y;
  }
}

const getAdjacents = (grid, point) => {
  const [x, y] = point;
  const points = [];

  const north = y > 0;
  const east = x < grid[0].length - 1;
  const south = y < grid.length - 1;
  const west = x > 0;
  
  if (north) points.push([x, y - 1]);
  if (east) points.push([x + 1, y]);
  if (south) points.push([x, y + 1]);
  if (west) points.push([x - 1, y]);

  return points;
}

const nodeMap = {};
const queue = [];
const distances = {};

grid.forEach((row, y) => {
  row.forEach((d, x) => {
    const node = new Node(x, y, d);
    const distance = x === 0 && y === 0 ? 0 : Number.MAX_SAFE_INTEGER;
    distances[node.key] = distance;
    nodeMap[node.key] = node;
  });
});

Object.values(nodeMap).forEach(node => {
  const neighborNodes = getAdjacents(grid, [node.x ,node.y])
    .map(([x, y]) => nodeMap[x + "," + y]);
  node.neighbors = neighborNodes;
  queue.push(node);
});

while (queue.length > 0) {
  const minIndex = queue.reduce((minIndex, node, nodeIndex) => {
    const minNode = queue[minIndex];

    if (distances[node.key] < distances[minNode.key]) return nodeIndex;
    return minIndex;
  }, 0);
  const [node] = queue.splice(minIndex, 1);

  node.neighbors.forEach(neighbor => {
    const distance = distances[neighbor.key];
    const altDistance = distances[node.key] + neighbor.distance;

    if (altDistance < distance) {
      distances[neighbor.key] = altDistance;
    }
  })
}

const answerIndex = grid[0].length - 1;
const answerKey = [answerIndex, answerIndex].join(",");

console.log({ answer: distances[answerKey]});