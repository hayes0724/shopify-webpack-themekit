## Shopify ThemeKit - Webpack

1. [Requirements](#requirements)
2. [Getting Started](#getting-started)
3. [Theme files](#theme-files)
4. [Commands](#commands)

### Features
* Webpack 4
* Stylelint
* ESLint
* Babel
* Middleware for Shopify preview
* Webpack dev server for assets
* BrowserSync
* Chunks for templates and layouts

## Requirements

* Have [theme kit](https://shopify.github.io/themekit/) installed globally (run auto install once per computer)

* Create [config.yml](https://shopify.github.io/themekit/#configure-an-existing-theme)

## Getting Started

1. Install dependencies - `npm install`

2. Start webpack compiler - `npm run start`

## Deploying

Deploy theme - This runs build process then deploys theme to Shopify

`npm run deploy`

## Theme files

Webpack will create the following snippets that load all style and script chunks. You need to include this in your theme.liquid file.

```
 {% include 'script-tags' %}
 {% include 'style-tags' %}
```

### Creating chunks

The system will check for any script or style sheet that matches Shopify template and layout files.

Example: 

## Commands

Start - Watches files for changes and deploys changes to Shopify

`npm run start`

Build - Builds js/scss in production mode

`npm run build`

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


## Linting

This project uses stylelint and eslint for checking css and js. 


![linter](https://github.com/stylelint/stylelint/raw/master/example.png?raw=true)

- [StyleLint](https://stylelint.io/)

- [Prettier](https://github.com/prettier/stylelint-prettier)

- [ESLint](https://eslint.org/)



