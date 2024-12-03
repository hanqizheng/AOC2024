const fs = require("fs");
const mock = fs.readFileSync("text.txt", "utf8");

function getMultiplications(data) {
  const regex = /mul\((\d*,\d*)\)/g;

  const matches = [];
  let match = regex.exec(data);

  while (match !== null) {
    matches.push(match[1]);

    match = regex.exec(data);
  }

  let result = 0;

  for (let i = 0; i < matches.length; i++) {
    const [a, b] = matches[i].split(",");

    result += a * b;
  }

  return result;
}

console.log('result: ', getMultiplications(mock));
