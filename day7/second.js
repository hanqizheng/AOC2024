const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");

function parseToMap(input) {
  const result = [];
  // 匹配每行的数据
  const lines = input.trim().split("\n");
  for (const line of lines) {
    const [key, value] = line.split(":").map((part) => part.trim());

    if (key && value) {
      const numbers = [Number(key), ...value.split(" ").map(Number)];
      result.push(numbers);
    }
  }
  return result;
}

const inputData = parseToMap(input);

// -------------------------------------------------------

function test(target, array, sum) {
  if (array.length === 0) {
    return sum === target;
  }

  const result1 = test(target, array.slice(1), sum + array[0]);
  const result2 = test(target, array.slice(1), sum * array[0]);
  const result3 = test(target, array.slice(1), Number(String(sum) + String(array[0])));

  return result1 || result2 || result3;
}

function findResultSum() {
  let result = 0;

  for (let i = 0; i < inputData.length; i++) {
    const target = inputData[i][0];
    const value = inputData[i].slice(1);

    const flag = test(target, value.slice(1), value[0]);

    if (flag) {
      result += target;
    }
  }

  return result;
}
console.log("result: ", findResultSum());
