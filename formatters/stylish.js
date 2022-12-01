import _ from 'lodash';
import { plus, minus, upd } from '../src/symbols.js';

const unpack = (data) => {
  if (Array.isArray(data)) {
    const newData = [];
    data.forEach(([sym, key, value, maybeValue]) => {
      if (sym === upd) {
        newData.push([minus, key, value], [plus, key, maybeValue]);
      } else {
        newData.push([sym, key, value]);
      }
    });
    return newData;
  }
  return data;
};

const stylish = (packedData, replacer = ' ', spacesCount = 4, depth = 0) => {
  let result = [];
  const data = unpack(packedData);

  if (Array.isArray(data)) {
    result = data.map(([sym, key, value]) => `${replacer.repeat(spacesCount * depth)}  ${sym} ${key}: ${stylish(value, replacer, spacesCount, depth + 1)}`);
  } else if (_.isObject(data)) {
    result = Object.entries(data).map(([key, value]) => `${replacer.repeat(spacesCount * (depth + 1))}${key}: ${stylish(value, replacer, spacesCount, depth + 1)}`);
  } else {
    return `${data}`;
  }

  return `{
${result.join('\n')}
${replacer.repeat(spacesCount * (depth))}}`;
};

export default stylish;
