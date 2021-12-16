const fs = require('fs');

const input = fs.readFileSync("./input.txt", "utf8");
const lines = input.split("\n");

class Node {
  constructor(x, y, distance) {
    this.distance = distance;
    this.key = x + "," + y;
    this.x = x;
    this.y = y;
  }
}

function dijkstra(grid, xT, yT, pageSize) {
  const distances = {};
  const nodeMap = {};
  const queue = [];

  const getGridValue = (x, y) => {
    if (x === 0 && y === 0) return 0;

    const x0 = (x % pageSize);
    const y0 = (y % pageSize);

    const xM = Math.floor(x / pageSize);
    const yM = Math.floor(y / pageSize);
    const d = xM + yM;

    let value = grid[y0][x0];
    for (let i = 0; i < d; i++) {
      value++;
      if (value === 10) value = 1;
    }

    return value;
  }

  const getAdjacents = (x, y) => {
    const points = [];

    const north = y > 0;
    const east = x < xT;
    const south = y < yT;
    const west = x > 0;
    
    if (north) points.push([x, y - 1]);
    if (east) points.push([x + 1, y]);
    if (south) points.push([x, y + 1]);
    if (west) points.push([x - 1, y]);

    return points;
  }

  // Create nodes and initialize distances to MAX_SAFE_INTEGER.
  for (let x = 0; x <= xT; x++) {
    for (let y = 0; y <= yT; y++) {
      const d = getGridValue(x, y);
      const node = new Node(x, y, d);
      const distance = x === 0 && y === 0 ? 0 : Number.MAX_SAFE_INTEGER;
      distances[node.key] = distance;
      nodeMap[node.key] = node;
    }
  }

  // Set neighbors for each node and push all nodes onto the queue.
  Object.values(nodeMap).forEach(node => {
    node.neighbors = getAdjacents(node.x , node.y).map(([x, y]) => nodeMap[x + "," + y]);
    queue.push(node);
  });

  let curr = nodeMap["0,0"];
  while (curr.key !== xT + "," + yT) {
    // Update distances for each of node's neighbors.
    curr.neighbors.forEach(neighbor => {
      const distance = distances[neighbor.key];
      const altDistance = distances[curr.key] + neighbor.distance;

      if (altDistance < distance) {
        distances[neighbor.key] = altDistance;
      }
    });

    // Find the node in the queue with the lowest distance.
    const minIndex = queue.reduce((minIndex, node, nodeIndex) => {
      const minNode = queue[minIndex];
      return distances[node.key] < distances[minNode.key] ? nodeIndex : minIndex;
    }, 0);

    // Set it as curr and remove from the queue.
    curr = queue.splice(minIndex, 1)[0];

    if (queue.length % 100 === 0) console.log("queue size: ", queue.length);
  }

  return distances[xT + "," + yT];
}

const grid = lines.map(line => line.split("").map(Number));
const size = grid.length;
const targetXY = (size * 5) - 1;
console.log({ size, targetXY });
console.log(dijkstra(grid, targetXY, targetXY, grid.length));