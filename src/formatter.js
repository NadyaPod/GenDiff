import _ from 'lodash';

const stringify = (data, replacer = ' ', spacesCount = 4, depth = 0) => {
  const result = [];

  if (!Array.isArray(data)) {
    for (const [objKey, objValue] of Object.entries(data)) {
      if (_.isObject(objValue)) {
        result.push(`${replacer.repeat(spacesCount * (depth + 1))}${objKey}: ${stringify(objValue, replacer, spacesCount, depth + 1)}`);
      } else {
        result.push(`${replacer.repeat(spacesCount * (depth + 1))}${objKey}: ${objValue}`);
      }
    } 
  } else {
    data.forEach(([sym, key, value]) => {
      if (_.isObject(value)) {
        result.push(`${replacer.repeat(spacesCount * depth)}  ${sym} ${key}: ${stringify(value, replacer, spacesCount, depth + 1)}`);
      } else {
        result.push(`${replacer.repeat(spacesCount * depth)}  ${sym} ${key}: ${value}`);
      }
    });
  }

  return `{
${result.join('\n')}
${replacer.repeat(spacesCount * (depth))}}`;
};

export default stringify;
