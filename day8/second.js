const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");

const inputData = input.split("\n").map((item) => item.split(""));

function getAntennas(width, height) {
  const antennasMap = new Map();

  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      if (inputData[i][j] !== ".") {
        if (antennasMap.has(inputData[i][j])) {
          antennasMap.set(
            inputData[i][j],
            antennasMap.get(inputData[i][j]).concat({ x: i, y: j })
          );
        } else {
          antennasMap.set(inputData[i][j], [{ x: i, y: j }]);
        }
      }
    }
  }

  return antennasMap;
}

function findAntiNodes(tempSet, targetList, width, height) {
  let tempResult = 0;

  for (let i = 0; i < targetList.length - 1; i++) {
    for (let j = i + 1; j < targetList.length; j++) {
      const pointA = { x: targetList[i].x, y: targetList[i].y };
      const pointB = { x: targetList[j].x, y: targetList[j].y };

      const offsetA = { x: pointA.x - pointB.x, y: pointA.y - pointB.y };
      const offsetB = { x: pointB.x - pointA.x, y: pointB.y - pointA.y };

      while (
        pointA.x >= 0 &&
        pointA.y >= 0 &&
        pointA.x < width &&
        pointA.y < height
      ) {
        if (!tempSet.has(`${pointA.x},${pointA.y}`)) {
          tempSet.add(`${pointA.x},${pointA.y}`);
          tempResult += 1;
        }

        pointA.x = pointA.x + offsetA.x;
        pointA.y = pointA.y + offsetA.y;
      }

      while (
        pointB.x >= 0 &&
        pointB.y >= 0 &&
        pointB.x < width &&
        pointB.y < height
      ) {
        if (!tempSet.has(`${pointB.x},${pointB.y}`)) {
          tempSet.add(`${pointB.x},${pointB.y}`);
          tempResult += 1;
        }

        pointB.x = pointB.x + offsetB.x;
        pointB.y = pointB.y + offsetB.y;
      }
    }
  }

  return tempResult;
}

function countAntiNodes() {
  let result = 0;

  const width = inputData[0].length;
  const height = inputData.length;

  const antennasMap = getAntennas(width, height);
  const tempSet = new Set();

  for (let item of antennasMap) {
    /**
     * ['O', [{ x: 1, y: 1 }]]
     */
    result += findAntiNodes(tempSet, item[1], width, height);
  }

  return result;
}

console.log("result: ", countAntiNodes());
