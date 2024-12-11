const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");

const inputData = input.split(" ");

function plutonianPebbles(data, blinkTime) {
  let stoneMap = new Map();

  for (let i = 0; i < data.length; i++) {
    stoneMap.set(data[i], (stoneMap.get(data[i]) || 0) + 1);
  }

  for (let currentBlink = 0; currentBlink < blinkTime; currentBlink++) {
    const newStoneMap = new Map();

    for ([currentStone, count] of stoneMap) {
      if (currentStone === "0") {
        newStoneMap.set("1", (newStoneMap.get("1") || 0) + count);
      } else if (currentStone.length % 2 === 0) {
        const midIndex = currentStone.length >> 1;

        const leftStone = String(Number(currentStone.slice(0, midIndex)));
        const rightStone = String(Number(currentStone.slice(midIndex)));

        newStoneMap.set(leftStone, (newStoneMap.get(leftStone) || 0) + count);
        newStoneMap.set(rightStone, (newStoneMap.get(rightStone) || 0) + count);
      } else {
        const cal = (BigInt(currentStone) * 2024n).toString();
        newStoneMap.set(cal, (newStoneMap.get(cal) || 0) + count);
      }
    }

    stoneMap.clear();
    for ([currentStone, count] of newStoneMap) {
      stoneMap.set(currentStone, count);
    }
  }

  let result = 0;

  for (count of stoneMap.values()) {
    result += count;
  }

  return result;
}

console.log("result: ", plutonianPebbles(inputData, 75));
