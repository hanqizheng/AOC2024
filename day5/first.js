const fs = require("fs");
const path = require("path");

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");

const sortTest = fs.readFileSync(path.join(__dirname, "sort.txt"), "utf8");

const inputData = input.split("\n");
const sortData = sortTest.split("\n").map((list) => list.split(","));
console.log("sortData: ", sortData);

function calMidSum(data, testList) {
  const map = {};

  for (let i = 0; i < data.length; i++) {
    const regx = /(\d*)\|(\d*)/;
    const [, a, b] = data[i].match(regx);

    if (map[a]) {
      Object.assign(map, { [a]: map[a].concat(b) });
    } else {
      Object.assign(map, { [a]: [b] });
    }
  }

  let result = 0;

  for (let j = 0; j < testList.length; j++) {
    const tempList = testList[j];

    let flag = true;
    for (let k = 0; k < tempList.length - 1; k++) {
      const current = tempList[k];
      const next = tempList[k + 1];

      if (map[current]?.includes(next)) {
        continue;
      } else {
        flag = false;
        break;
      }
    }

    if (flag) {
      const index = Math.floor(tempList.length / 2);
      console.log("index: ", tempList, index, tempList[index]);
      result += Number(tempList[index]);
    }
  }

  return result;
}

const mock = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13`;

const mockSort = `75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;

console.log("result: ", calMidSum(inputData, sortData));
// console.log(
//   "result: ",
//   calMidSum(
//     mock.split("\n"),
//     mockSort.split("\n").map((item) => item.split(","))
//   )
// );
