const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");

const inputData = input.split("\n").map((item) => item.split(""));

const pastPlant = new Set();

function calculatePlots(data, plotSet, plant, currentPivot) {
  if (
    currentPivot.row < 0 ||
    currentPivot.row >= data.length || // 修正行边界
    currentPivot.col < 0 || // 添加列的左边界检查
    currentPivot.col >= data[0].length || // 修正列边界
    plant !== data[currentPivot.row][currentPivot.col] ||
    pastPlant.has(`${currentPivot.row},${currentPivot.col}`)
  ) {
    return;
  }

  pastPlant.add(`${currentPivot.row},${currentPivot.col}`);
  plotSet.add(`${currentPivot.row},${currentPivot.col}`);

  // 左
  calculatePlots(data, plotSet, plant, {
    row: currentPivot.row,
    col: currentPivot.col - 1,
  });

  // 右
  calculatePlots(data, plotSet, plant, {
    row: currentPivot.row,
    col: currentPivot.col + 1,
  });

  // 上
  calculatePlots(data, plotSet, plant, {
    row: currentPivot.row - 1,
    col: currentPivot.col,
  });

  // 下
  calculatePlots(data, plotSet, plant, {
    row: currentPivot.row + 1,
    col: currentPivot.col,
  });

  return;
}

function calculateSides(currentMap) {
  let count = 0;
  for (let [_, currentSet] of currentMap) {
    // 升序
    const temp = [...currentSet].sort((a, b) => a - b);

    if (temp[temp.length - 1] - temp[0] === temp.length - 1) {
      count += 2;
    } else {
      let gap = 1;

      for (let i = temp.length - 1; i > 0; i--) {
        if (temp[i] - temp[i - 1] !== 1) {
          gap += 1;
        }
      }

      count += gap * 2;
    }
  }

  return count;
}

function gardenGroups(data) {
  const plotsMap = new Map();
  for (let row = 0; row < data.length; row++) {
    for (let col = 0; col < data[0].length; col++) {
      if (pastPlant.has(`${row},${col}`)) {
        continue;
      }

      const tempSet = new Set();
      calculatePlots(data, tempSet, data[row][col], { row, col });

      plotsMap.set(`${data[row][col]}(${row},${col})`, tempSet);
    }
  }

  let result = 0;

  for ([key, plotSet] of plotsMap) {
    const area = plotSet.size;

    const horizontalMap = new Map();
    const verticalMap = new Map();

    for (let item of plotSet) {
      const [row, col] = item.split(",").map(Number);

      if (!horizontalMap.has(row)) {
        horizontalMap.set(row, new Set());
      }
      horizontalMap.get(row).add(col);

      if (!verticalMap.has(col)) {
        verticalMap.set(col, new Set());
      }
      verticalMap.get(col).add(row);
    }

    const verticalSideCount = calculateSides(horizontalMap);
    const horizontalSideCount = calculateSides(verticalMap);

    result += area * (verticalSideCount + horizontalSideCount);
  }

  return result;
}

console.log("result: ", gardenGroups(inputData));
