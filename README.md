[![Actions Status](https://github.com/NadyaPod/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/NadyaPod/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/7df43570f95a790d1cfb/maintainability)](https://codeclimate.com/github/NadyaPod/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/7df43570f95a790d1cfb/test_coverage)](https://codeclimate.com/github/NadyaPod/frontend-project-46/test_coverage)
[![Node CI](https://github.com/NadyaPod/frontend-project-46/actions/workflows/nodejs.yml/badge.svg)](https://github.com/NadyaPod/frontend-project-46/actions/workflows/nodejs.yml)

## About

CLI application compares two configuration files and shows a difference. The tool supports JSON and YAML files and shows result in several output formats.

## How to use

### CLI executable

```
gendiff [options] <filepath1> <filepath2>

Options:
  -V, --version        output the version number
  -f, --format <type>  output format (default: "stylish")
  -h, --help           display help for command
```

Options:

- `filepath1`, `filepath2`

  Strings to be used as file paths

- `format` _(optional)_ — output format:
  - `stylish` _(default)_: shows the changes as a tree
  - `plain` shows a list of changes
  - `json` returns a JSON string
 
## Install

1. Clone the repo
2. Install dependencies

```sh
make install
```
