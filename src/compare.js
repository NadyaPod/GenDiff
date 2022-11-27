import { readFileSync } from 'fs';
import path from 'path';
import { cwd } from 'process';
import _ from 'lodash';
import parser from './parsers.js';
import stringify from './formatter.js';

const minus = '-';
const plus = '+';
const eq = ' ';

const getFullPath = (filePath) => path.resolve(cwd(), filePath);

const getFileData = (filePath) => {
  try {
    return readFileSync(getFullPath(filePath), 'utf-8');
  } catch {
    throw new Error('Sorry, can\'t find the file');
  }
};

const getFileType = (filePath) => {
  const extension = path.extname(filePath);
  return extension.slice(1);
};

// const stringify = (diff) => {
//   const strFormat = diff.map((item) => `  ${item[0]} ${item[1]}: ${item[2]}`);
//   return `{\n${strFormat.join('\n')}\n}`;
// };

export const diff = (minuend, subtrahend) => {
  const difference = [];
  const keys1 = Object.keys(minuend);
  const keys2 = Object.keys(subtrahend);
  const keys = _.sortBy(_.union(keys1, keys2));

  keys.forEach((key) => {
    if (!_.has(minuend, key)) {
      difference.push([plus, key, subtrahend[key]]);
    } else if (!_.has(subtrahend, key)) {
      difference.push([minus, key, minuend[key]]);
    } else if (minuend[key] !== subtrahend[key]) {
      if (_.isObject(minuend[key]) && _.isObject(subtrahend[key])) {
        const child = diff(minuend[key], subtrahend[key]);
        difference.push([eq, key, child]);
      } else {
        difference.push([minus, key, minuend[key]], [plus, key, subtrahend[key]]);
      }
    } else {
      difference.push([eq, key, minuend[key]]);
    }
  });
  return difference;
};

export default (filePath1, filePath2) => {
  const minuend = getFileData(filePath1);
  const minuendExt = getFileType(getFullPath(filePath1));
  const minuendParsed = parser(minuend, minuendExt);

  const subtrahend = getFileData(filePath2);
  const subtrahendExt = getFileType(getFullPath(filePath2));
  const subtrahendParsed = parser(subtrahend, subtrahendExt);
  return stringify(diff(minuendParsed, subtrahendParsed));
};
