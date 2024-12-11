const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");

const inputData = input.split(" ");

function plutonianPebbles(data, currentTime, blinkTime) {
  if (currentTime === blinkTime) {
    return data.length;
  }
  const tempData = [];
  for (let i = 0; i < data.length; i++) {
    const currentStone = data[i];
    if (currentStone === "0") {
      tempData.push("1");
    } else if (currentStone.length % 2 === 0) {
      const midIndex = currentStone.length / 2;

      let leftStone = "";
      let rightStone = "";

      for (let i = 0; i < midIndex; i++) {
        leftStone += currentStone[i];
      }

      for (let i = midIndex; i < currentStone.length; i++) {
        rightStone += currentStone[i];
      }
      tempData.push(String(Number(leftStone)), String(Number(rightStone)));
    } else {
      tempData.push(String(Number(currentStone) * 2024));
    }
  }

  return plutonianPebbles(tempData, currentTime + 1, blinkTime);
}

console.log("result: ", plutonianPebbles(inputData, 0, 25));
