import fs from 'fs';
import path from 'path';
import { cwd } from 'process';
import _ from 'lodash';

const minus = '-';
const plus = '+';
const eq = ' ';

const loadJSON = (filePath) => {
  const fullPath = path.resolve(cwd(), filePath);
  return JSON.parse(fs.readFileSync(fullPath));
};

const stringify = (diff) => {
  const strFormat = diff.map((item) => `  ${item[0]} ${item[1]}: ${item[2]}`);
  return `{\n${strFormat.join('\n')}\n}`;
};

const diff = (minuend, subtrahend) => {
  const difference = [];

  /* eslint-disable-next-line */
  for (const [key, value] of Object.entries(minuend)) {
    if (Object.hasOwn(subtrahend, key)) {
      if (value === subtrahend[key]) {
        difference.push([eq, key, value]);
      } else {
        difference.push([minus, key, value], [plus, key, subtrahend[key]]);
      }
    } else {
      difference.push([minus, key, value]);
    }
  }

  /* eslint-disable-next-line */
  for (const [key, value] of Object.entries(subtrahend)) {
    if (!Object.hasOwn(minuend, key)) {
      difference.push([plus, key, value]);
    }
  }
  return _.sortBy(difference, [(pair) => pair[1]]);
};

export default (filePath1, filePath2) => {
  const minuend = loadJSON(filePath1);
  const subtrahend = loadJSON(filePath2);
  return stringify(diff(minuend, subtrahend));
};
