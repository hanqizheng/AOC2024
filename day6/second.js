const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");

const inputData = input.split("\n").map((item) => item.split(""));

const mock = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

const mockData = mock.split("\n").map((item) => item.split(""));

const directionMap = {
  up: "right",
  right: "down",
  down: "left",
  left: "up",
};

function findStart(data) {
  for (let i = 0; i < data[0].length; i++) {
    for (let j = 0; j < data.length; j++) {
      if (data[i][j] === "^") {
        return { row: i, col: j };
      }
    }
  }
}

function pathTrace(data, { startRow, startCol }) {
  const directionMap = {
    up: "right",
    right: "down",
    down: "left",
    left: "up",
  };

  let direction = "up";
  let visited = new Set(); // 用于记录访问过的位置和方向

  data[startRow][startCol] = "|";

  row = startRow;
  col = startCol;

  while (true) {
    // console.log("-------------------");
    // console.log(data.map((item) => item.join("")).join("\n"));

    // 检测是否形成环
    if (visited.has(`${row},${col},${direction}`)) {
      return true; // 发现环
    }
    visited.add(`${row},${col},${direction}`);

    if (direction === "up") {
      let i = row;
      while (i >= 0) {
        if (data[i][col] === ".") {
          data[i][col] = "|";
        } else if (data[i][col] === "-") {
          data[i][col] = "+";
        } else if (data[i][col] === "#" || data[i][col] === "O") {
          direction = directionMap[direction];
          row = i + 1;
          data[row][col] = "+";
          break;
        }
        i--;
      }
      if (i < 0) {
        break;
      }
    } else if (direction === "right") {
      let i = col;
      while (i < data[0].length) {
        if (data[row][i] === ".") {
          data[row][i] = "-";
        } else if (data[row][i] === "|") {
          data[row][i] = "+";
        } else if (data[row][i] === "#" || data[row][i] === "O") {
          direction = directionMap[direction];
          col = i - 1;
          data[row][col] = "+";
          break;
        }
        i++;
      }
      if (i === data[0].length) {
        break;
      }
    } else if (direction === "down") {
      let i = row;
      while (i < data.length) {
        if (data[i][col] === ".") {
          data[i][col] = "|";
        } else if (data[i][col] === "-") {
          data[i][col] = "+";
        } else if (data[i][col] === "#" || data[i][col] === "O") {
          direction = directionMap[direction];
          row = i - 1;
          data[row][col] = "+";
          break;
        }
        i++;
      }
      if (i === data.length) {
        break;
      }
    } else if (direction === "left") {
      let i = col;
      while (i >= 0) {
        if (data[row][i] === ".") {
          data[row][i] = "-";
        } else if (data[row][i] === "|") {
          data[row][i] = "+";
        } else if (data[row][i] === "#" || data[row][i] === "O") {
          direction = directionMap[direction];
          col = i + 1;
          data[row][col] = "+";
          break;
        }
        i--;
      }
      if (i < 0) {
        break;
      }
    }
  }

  return false; // 没有发现环
}

function simulateObstruction(data) {
  let result = 0;

  let { row: startRow, col: startCol } = findStart(data);

  for (let row = 0; row < data.length; row++) {
    for (let col = 0; col < data[0].length; col++) {
      const temp = data[row][col];
      data[row][col] = "O";

      const tryResult = pathTrace(data, { startRow, startCol });
      data[row][col] = temp;
      if (tryResult) {
        result += 1;
      }
    }
  }

  return result;
}

console.log("result: ", simulateObstruction(inputData));
// console.log("result: ", simulateObstruction(mockData));
