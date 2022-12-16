import _ from 'lodash';
import { plus, minus, upd } from '../src/symbols.js';

const unpack = (data) => {
  if (Array.isArray(data)) {
    return data.flatMap(([sym, key, value, maybeValue]) => (
      sym === upd
        ? [[minus, key, value], [plus, key, maybeValue]]
        : [[sym, key, value]]
    ));
  }
  return data;
};

const stylish = (packedData, replacer = ' ', spacesCount = 4, depth = 0) => {
  const data = unpack(packedData);

  if (!_.isObject(data)) {
    return `${data}`;
  }
  const result = Array.isArray(data)
    ? data.map(([sym, key, value]) => `${replacer.repeat(spacesCount * depth)}  ${sym} ${key}: ${stylish(value, replacer, spacesCount, depth + 1)}`)
    : Object.entries(data).map(([key, value]) => `${replacer.repeat(spacesCount * (depth + 1))}${key}: ${stylish(value, replacer, spacesCount, depth + 1)}`);

  return `{
${result.join('\n')}
${replacer.repeat(spacesCount * (depth))}}`;
};

export default stylish;
