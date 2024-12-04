const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");

function calTarget(data) {
  let result = 0;

  for (let i = 0; i < data.length; i++) {
    const regx = /XMAS/g;

    result += data[i].match(regx)?.length || 0;
  }

  return result;
}

function findTargetStr(input, isReverse) {
  let result = 0;

  const horizontalData = input.split("\n");
  const reverseHorizontalData = horizontalData.map((item) =>
    item.split("").reverse().join("")
  );

  const verticalData = [];

  // leftBottom to rightTop
  const leftToRightData = [];

  const rightToLeftData = [];

  for (let i = 0; i < horizontalData[0].length; i++) {
    let tempStr = "";

    for (let j = 0; j < horizontalData.length; j++) {
      tempStr += horizontalData[j][i];

      leftToRightData[i + j] =
        (leftToRightData[i + j] ?? "") + horizontalData[i][j];

      rightToLeftData[i + j] =
        (rightToLeftData[i + j] ?? "") + reverseHorizontalData[i][j];
    }

    verticalData.push(tempStr);
  }
  const reverseVerticalData = verticalData.map((item) =>
    item.split("").reverse().join("")
  );

  const reverseLeftToRightData = leftToRightData.map((item) =>
    item.split("").reverse().join("")
  );

  const reverseRightToLeftData = rightToLeftData.map((item) =>
    item.split("").reverse().join("")
  );

  result += calTarget(horizontalData);
  result += calTarget(reverseHorizontalData);

  result += calTarget(verticalData);
  result += calTarget(reverseVerticalData);

  result += calTarget(leftToRightData);
  result += calTarget(reverseLeftToRightData);

  result += calTarget(rightToLeftData);
  result += calTarget(reverseRightToLeftData);

  return result;
}

console.log("result: ", findTargetStr(input));
