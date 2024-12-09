const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");

function diskFragment() {
  const typeMap = {
    file: "blank",
    blank: "file",
  };

  let idNumber = [];
  let currentId = 0;
  let currentType = "file";

  const emptySpaceIndex = [];

  for (let i = 0; i < input.length; i++) {
    let symbol = "";
    if (currentType === "file") {
      symbol = `${currentId}`;
      currentId += 1;
    } else if (currentType === "blank") {
      symbol = ".";
    }

    for (let j = 0; j < Number(input[i]); j++) {
      if (symbol === ".") {
        emptySpaceIndex.push(idNumber.length);
      }
      idNumber.push(symbol);
    }

    currentType = typeMap[currentType];
  }

  let changeCount = 0;

  const breakCount = emptySpaceIndex.length;

  for (let i = idNumber.length - 1; i >= 0; i--) {
    if (changeCount >= breakCount) {
      break;
    }

    if (idNumber[i] !== ".") {
      const temp = idNumber[i];
      idNumber[i] = ".";
      emptySpaceIndex.push(i);
      idNumber[emptySpaceIndex.shift()] = temp;
    }

    changeCount += 1;
  }

  let result = 0;

  for (let i = 0; i < idNumber.length; i++) {
    if (idNumber[i] === ".") {
      break;
    }

    result += i * idNumber[i];
  }

  return result;
}

console.log("result: ", diskFragment());
