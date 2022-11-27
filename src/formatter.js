import _ from 'lodash';

const stringify = (data, replacer = ' ', spacesCount = 4, depth = 0) => {
  const result = [];

  if (Array.isArray(data)) {
    data.forEach(([sym, key, value]) => {
      result.push(`${replacer.repeat(spacesCount * depth)}  ${sym} ${key}: ${stringify(value, replacer, spacesCount, depth + 1)}`);
    });
  } else if (_.isObject(data)) {
    Object.entries(data).forEach(([key, value]) => {
      result.push(`${replacer.repeat(spacesCount * (depth + 1))}${key}: ${stringify(value, replacer, spacesCount, depth + 1)}`);
    });
  } else {
    return `${data}`;
  }

  return `{
${result.join('\n')}
${replacer.repeat(spacesCount * (depth))}}`;
};

export default stringify;
