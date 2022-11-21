import difff from '../src/compare.js';

test('diff', () => {
  expect(difff('__fixtures__/file1.json', '__fixtures__/file2.json')).toEqual(`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`);
});

test('dud', () => {
  expect(2).toBe(2);
});
