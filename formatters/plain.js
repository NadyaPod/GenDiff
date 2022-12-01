import _ from 'lodash';
import { plus, minus, upd } from '../src/symbols.js';

const strBuilder = (data) => {
  const result = [];
  data.forEach(([sym, key, value, maybeValue]) => {
    if (sym === plus) {
      result.push(`Property '${key}' was added with value: ${value}`);
    } else if (sym === minus) {
      result.push(`Property '${key}' was removed`);
    } else if (sym === upd) {
      const updValue = maybeValue;
      result.push(`Property '${key}' was updated. From ${value} to ${updValue}`);
    }
  });
  return result.join('\n');
};

const valueFormatter = (value) => {
  switch (typeof value) {
    case ('string'): {
      return `'${value}'`;
    }
    default:
      return value;
  }
};

const generateKeyValueData = (data, base = '') => {
  const result = data.flatMap(([sym, key, value, maybeValue]) => {
    const complexKey = base === '' ? `${key}` : `${base}.${key}`;
    if (_.isObject(value) && !Array.isArray(value) && value !== null) {
      return [sym, complexKey, '[complex value]', `${valueFormatter(maybeValue)}`];
    }
    if (!_.isObject(value) && !Array.isArray(value)) {
      return [sym, complexKey, `${valueFormatter(value)}`, `${valueFormatter(maybeValue)}`];
    }
    if (Array.isArray(value)) {
      const newValue = value;
      return generateKeyValueData(newValue, complexKey);
    }
    return [sym, complexKey, value, maybeValue];
  });
  return result;
};

const plain = (data) => {
  const generatedData = _.chunk(generateKeyValueData(data), 4);
  return strBuilder(generatedData);
};

export default plain;
