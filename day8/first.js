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
      const pointA = targetList[i];
      const pointB = targetList[j];

      const antinodeA = {
        x: pointA.x + (pointA.x - pointB.x),
        y: pointA.y + (pointA.y - pointB.y),
      };

      const antinodeB = {
        x: pointB.x + (pointB.x - pointA.x),
        y: pointB.y + (pointB.y - pointA.y),
      };

      if (
        antinodeA.x >= 0 &&
        antinodeA.y >= 0 &&
        antinodeA.x < width &&
        antinodeA.y < height &&
        !tempSet.has(`${antinodeA.x},${antinodeA.y}`)
      ) {
        tempSet.add(`${antinodeA.x},${antinodeA.y}`);
        tempResult += 1;
      }

      if (
        antinodeB.x >= 0 &&
        antinodeB.y >= 0 &&
        antinodeB.x < width &&
        antinodeB.y < height &&
        !tempSet.has(`${antinodeB.x},${antinodeB.y}`)
      ) {
        tempSet.add(`${antinodeB.x},${antinodeB.y}`);
        tempResult += 1;
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
