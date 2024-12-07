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

function findStart(data) {
  for (let i = 0; i < data[0].length; i++) {
    for (let j = 0; j < data.length; j++) {
      if (data[i][j] === "^") {
        return { row: i, col: j };
      }
    }
  }
}

function calXNum(data) {
  let result = 0;
  for (let i = 0; i < data[0].length; i++) {
    for (let j = 0; j < data.length; j++) {
      if (data[i][j] === "X") {
        result += 1;
      }
    }
  }

  return result;
}

function pathTrace(data) {
  let { row, col } = findStart(data);

  const directionMap = {
    up: "right",
    right: "down",
    down: "left",
    left: "up",
  };

  let direction = "up";

  data[row][col] = "X";

  while (true) {
    console.log("-------------------");
    console.log(data.map((item) => item.join("")).join("\n"));
    if (direction === "up") {
      let i = row;
      while (i >= 0) {
        if (data[i][col] === ".") {
          data[i][col] = "X";
        } else if (data[i][col] === "#") {
          direction = directionMap[direction];
          row = i + 1;
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
          data[row][i] = "X";
        } else if (data[row][i] === "#") {
          direction = directionMap[direction];
          col = i - 1;
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
          data[i][col] = "X";
        } else if (data[i][col] === "#") {
          direction = directionMap[direction];
          row = i - 1;
          break;
        }
        i++;
      }
      if (i === data.length) {
        break;
      }
    } else if (direction === 'left') {
      let i = col;

      while (i >= 0) {
        if (data[row][i] === ".") {
          data[row][i] = "X";
        } else if (data[row][i] === "#") {
          direction = directionMap[direction];
          col = i + 1;
          break;
        }

        i--;
      }

      if (i < 0) {
        break;
      }
    }
  }

  return calXNum(data);
}

// console.log("result: ", pathTrace(inputData));
console.log("result: ", pathTrace(mockData));
