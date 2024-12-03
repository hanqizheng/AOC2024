const fs = require("fs");
const mock = fs.readFileSync("text.txt", "utf8");

function getMultiplicationsWithCondition(data) {
  const regex = /(mul\(\d+,\d+\)|do\(\)|don\'t\(\))/g;

  const matches = data.match(regex);

  let flag = true;

  let result = 0;
  for (let i = 0; i < matches.length; i++) {
    const target = matches[i];
    if (target === "do()") {
      flag = true;
    } else if (target === "don't()") {
      flag = false;
    } else if (target.match(/\((\d*,\d*)\)/) !== null && flag) {
      const [a, b] = target.match(/\((\d*,\d*)\)/)[1].split(",");
      result += a * b;
    }
  }

  return result;
}

console.log("result: ", getMultiplicationsWithCondition(mock));
