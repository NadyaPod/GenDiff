import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import generateDiff from '../src/compare.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe.each([['stylish'], ['plain'], ['json']])('%s format-option', (format) => {
  const expected = readFixture(`expected_${format}.txt`);

  test.each([['json'], ['yaml']])('%s files', (ext) => {
    const file1Path = getFixturePath(`file1.${ext}`);
    const file2Path = getFixturePath(`file2.${ext}`);
    const actual = generateDiff(file1Path, file2Path, format);
    expect(actual).toEqual(expected);
  });

  test('misc files', () => {
    const file1Path = getFixturePath('file1.json');
    const file2Path = getFixturePath('file2.yaml');
    const actual = generateDiff(file1Path, file2Path, format);
    expect(actual).toEqual(expected);
  });
});
