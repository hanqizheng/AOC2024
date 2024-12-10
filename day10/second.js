const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");

const inputData = input
  .split("\n")
  .map((item) => item.split("").map((item) => Number(item)));

function getTrailHeads(data) {
  const tempTrailHeads = [];

  for (let i = 0; i < data[0].length; i++) {
    for (let j = 0; j < data.length; j++) {
      if (data[i][j] === 0) {
        tempTrailHeads.push({ x: i, y: j });
      }
    }
  }

  return tempTrailHeads;
}

function hoof(graphicMap, pivot, height, trailHeadsMap) {
  if (height === 9) {
    if (trailHeadsMap.has(`(${pivot.x},${pivot.y})`)) {
      trailHeadsMap.set(
        `(${pivot.x},${pivot.y})`,
        trailHeadsMap.get(`(${pivot.x},${pivot.y})`) + 1
      );
    } else {
      trailHeadsMap.set(`(${pivot.x},${pivot.y})`, 1);
    }

    return 1;
  }

  const graphicEdge = { x: graphicMap[0].length, y: graphicMap.length };

  let resultUp = 0;
  let resultDown = 0;
  let resultRight = 0;
  let resultLeft = 0;

  // right
  if (pivot.x + 1 < graphicEdge.x) {
    resultRight +=
      graphicMap[pivot.x + 1][pivot.y] - height === 1
        ? hoof(
            graphicMap,
            { x: pivot.x + 1, y: pivot.y },
            height + 1,
            trailHeadsMap
          )
        : 0;
  }

  // left
  if (pivot.x - 1 >= 0) {
    resultLeft +=
      graphicMap[pivot.x - 1][pivot.y] - height === 1
        ? hoof(
            graphicMap,
            { x: pivot.x - 1, y: pivot.y },
            height + 1,
            trailHeadsMap
          )
        : 0;
  }

  // down
  if (pivot.y + 1 < graphicEdge.y) {
    resultDown +=
      graphicMap[pivot.x][pivot.y + 1] - height === 1
        ? hoof(
            graphicMap,
            { x: pivot.x, y: pivot.y + 1 },
            height + 1,
            trailHeadsMap
          )
        : 0;
  }

  // up
  if (pivot.y - 1 >= 0) {
    resultUp +=
      graphicMap[pivot.x][pivot.y - 1] - height === 1
        ? hoof(
            graphicMap,
            { x: pivot.x, y: pivot.y - 1 },
            height + 1,
            trailHeadsMap
          )
        : 0;
  }

  // console.log(resultLeft, resultRight, resultUp, resultDown);
  return resultLeft + resultRight + resultUp + resultDown;
}

/**
 *
 * 8X010123
 * 78121874
 * 87430X65
 * X654X874
 * 45678X03
 * 3201X012
 * 0132X801
 * 10456732
 */

function hoofIt(data) {
  const trailHeads = getTrailHeads(data);
  console.log("trailHeads: ", trailHeads.length);

  let result = 0;

  for (let i = 0; i < trailHeads.length; i++) {
    const trailHeadsMap = new Map();
    hoof(data, trailHeads[i], 0, trailHeadsMap);

    for (item of trailHeadsMap.values()) {
      result += item;
    }
  }

  return result;
}

console.log("result: ", hoofIt(inputData));
