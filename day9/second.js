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

  const emptySpace = [];
  const numberSpace = [];

  for (let i = 0; i < input.length; i++) {
    let symbol = "";
    if (currentType === "file") {
      symbol = `${currentId}`;
      currentId += 1;
    } else if (currentType === "blank") {
      symbol = ".";
    }

    let tempContent = [];
    for (let j = 0; j < Number(input[i]); j++) {
      tempContent.push(symbol);
    }

    if (symbol === ".") {
      emptySpace.push(tempContent);
    } else {
      numberSpace.push(tempContent);
    }

    currentType = typeMap[currentType];
  }

  currentType = "file";

  while (numberSpace.length || emptySpace.length) {
    if (currentType === "file") {
      idNumber.push(numberSpace.shift());
    } else {
      const emptyTarget = emptySpace.shift();

      while (emptyTarget.length) {
        let i = numberSpace.length - 1;
        for (; i >= 0; i--) {
          if (
            numberSpace[i].length <= emptyTarget.length &&
            numberSpace[i][0] !== "."
          ) {
            const tempTarget = numberSpace.splice(i, 1)[0];
            const fillEmpty = new Array(tempTarget.length).fill(".");
            numberSpace.splice(i, 0, fillEmpty);

            idNumber.push(tempTarget);
            emptyTarget.splice(0, tempTarget.length);
          }
        }

        if (i < 0) {
          idNumber.push(emptyTarget);
          break;
        }
      }
    }

    currentType = typeMap[currentType];
  }

  idNumber = idNumber.flat();
  let result = 0;

  for (let i = 0; i < idNumber.length; i++) {
    if (idNumber[i] === ".") {
      continue;
    }

    result += i * idNumber[i];
  }

  return result;
}

console.log("result: ", diskFragment());
