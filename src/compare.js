import fs from "fs";
import path from "node:path/win32";
import { cwd } from "node:process";
import _ from "lodash";

const minus = "-";
const plus = "+";
const eq = " ";

const loadJSON = (filePath) => {
  filePath = path.resolve(cwd(), filePath);
  return JSON.parse(fs.readFileSync(filePath));
};

// Pretiry/ stringify
const stringify = (diff) => {
  const strFormat = diff.map((item) => `  ${item[0]} ${item[1]}: ${item[2]}`);
  return `{\n${strFormat.join("\n")}\n}`;
};

export const genDiff = (filePath1, filePath2) => {
  const minuend = loadJSON(filePath1);
  const subtrahend = loadJSON(filePath2);
  const diff = [];

  for (const [key, value] of Object.entries(minuend)) {
    if (Object.hasOwn(subtrahend, key)) {
      if (value === subtrahend[key]) {
        diff.push([eq, key, value]);
      } else {
        diff.push([minus, key, value], [plus, key, subtrahend[key]]);
      }
    } else {
      diff.push([minus, key, value]);
    }
  }

  for (const [key, value] of Object.entries(subtrahend)) {
    if (!Object.hasOwn(minuend, key)) {
      diff.push(["+", key, value]);
    }
  }
  const sortedDiff = _.sortBy(diff, [(pair) => pair[1]]);
  console.log(stringify(sortedDiff));
};
