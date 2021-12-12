const fs = require('fs')

const input = fs.readFileSync("input.txt", "utf8");
const lines = input.split("\n");

const pathMap = lines.reduce((acc, line) => {
  const [start, end] = line.split("-");
  if (!acc[start]) acc[start] = [];
  acc[start].push(end);

  if (!acc[end]) acc[end] = [];
  if (start !== "start") acc[end].push(start);

  return acc;
}, {});

function explore(path, current, visited, paths) {
  if (visited[current]) return;

  if (current === "end") {
    paths.push(path);
    return;
  }

  if (current === current.toLowerCase()) {
    visited[current] = true;
  }
  
  const adjacents = pathMap[current];
  if (!adjacents) return;

  adjacents.forEach((node) => {
    explore(
      [...path, current],
      node,
      {...visited},
      paths
    );
  });
}

const paths = [];

pathMap["start"].forEach((node) => {
  explore(["start"], node, {}, paths);
})

console.log({ answer: paths.length });