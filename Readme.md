## Shopify ThemeKit - Webpack

1. [Requirements](#requirements)
2. [Getting Started](#getting-started)
3. [Theme files](#theme-files)
4. [Commands](#commands)

## Requirements

* Have [theme kit](https://shopify.github.io/themekit/) installed globally (run auto install once per computer)

* Create [config.yml](https://shopify.github.io/themekit/#configure-an-existing-theme)

## Getting Started

1. Install dependencies - `npm install`

2. Start webpack compiler - `npm run watch`

3. Watch files and upload to Shopify - `npm run theme-watch`


## Theme files

If this is a new project you will need to add the compiled files to theme.liquid

```
 {{ 'compiled.scss.css' | asset_url | stylesheet_tag }}
 {{ 'compiled.js' | asset_url | script_tag }}
```

## Settings Data

If you make changes in admin customize then they need to be synced to the repo.

1. Download settings file `npm run theme-download:settings`

## Commands

Test - Runs all tests and code linters

`npm run test`

Lint CSS - Checks scss for errors and best practices.

`` npm run lint:css``

Lint JS - Checks js for errors and best practices.

`` npm run lint:js``

Fix CSS - Checks scss for errors and best practices. Automatically fixes simple errors like line endings

`` npm run fix:css``

Fix jS - Checks js for errors and best practices. Automatically fixes simple errors.

`` npm run fix:js``

## Code Guidelines

#### Linting

This project uses stylelint and eslint for checking css and js. 

**Do not edit .stylelintrc or .eslintrc files**

![linter](https://github.com/stylelint/stylelint/raw/master/example.png?raw=true)

- [StyleLint](https://stylelint.io/)

- [Prettier](https://github.com/prettier/stylelint-prettier)

- [ESLint](https://eslint.org/)



