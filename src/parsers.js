import yaml from 'js-yaml';

export default (file, type) => {
  switch (type) {
    case 'json':
      return JSON.parse(file);
    case 'yaml':
    case 'yml':
      return yaml.load(file);
    default:
      throw new Error(`Sorry, wrong formatter: ${type}`);
  }
};
