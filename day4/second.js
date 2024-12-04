const fs = require("fs");
const path = require("path");
const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");

function findTargetStr(data) {
  const horizontalData = data.split("\n");

  let result = 0;
  for (let i = 0; i < horizontalData[0].length - 2; i++) {
    for (let j = 0; j < horizontalData.length - 2; j++) {
      const str1 =
        horizontalData[i][j] +
        horizontalData[i + 1][j + 1] +
        horizontalData[i + 2][j + 2];

      const str2 =
        horizontalData[i][j + 2] +
        horizontalData[i + 1][j + 1] +
        horizontalData[i + 2][j];

      const regx = /MAS|SAM/;

      console.log(str1, str2, regx.test(str1) && regx.test(str2));
      if (regx.test(str1) && regx.test(str2)) {
        result += 1;
      }
    }
  }

  return result;
}

const mock = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

console.log("result: ", findTargetStr(input));
