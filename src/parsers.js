import yaml from 'js-yaml';

export default (file, type) => {
  switch (type) {
    case 'json':
      return JSON.parse(file);
    case 'yaml':
      return yaml.load(file);
    case 'yml':
      return yaml.load(file);
    default:
      console.log(type);
      return `Not support ${type}`;
  }
};
