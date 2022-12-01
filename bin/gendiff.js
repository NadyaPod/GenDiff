#!/usr/bin/env node

import { Command } from 'commander';
import getDiff from '../src/compare.js';

const program = new Command();

program
  .name('genDiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2, opts) => {
    console.log(getDiff(filepath1, filepath2, opts.format));
  });

program.parse();
