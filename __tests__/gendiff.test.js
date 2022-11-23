import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';

import generateDiff from '../src/compare.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('json', () => {
  const expected = readFixture('expected.txt');
  const file1Path = getFixturePath('file1.json');
  const file2Path = getFixturePath('file2.json');
  const actual = generateDiff(file1Path, file2Path);

  expect(actual).toEqual(expected);
});

test('yaml', () => {
  const expected = readFixture('expected.txt');
  const file1Path = getFixturePath('file1.yml');
  const file2Path = getFixturePath('file2.yaml');
  const actual = generateDiff(file1Path, file2Path);

  expect(actual).toEqual(expected);
});

test('json and yaml', () => {
  const expected = readFixture('expected.txt');
  const file1Path = getFixturePath('file1.json');
  const file2Path = getFixturePath('file2.yaml');
  const actual = generateDiff(file1Path, file2Path);

  expect(actual).toEqual(expected);
});
