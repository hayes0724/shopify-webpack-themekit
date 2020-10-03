## Shopify ThemeKit - Webpack
![GitHub tag (latest SemVer)](https://img.shields.io/github/v/tag/hayes0724/shopify-webpack-themekit)
[![GitHub issues](https://img.shields.io/github/issues/hayes0724/shopify-webpack-themekit.svg)](https://GitHub.com/hayes0724/shopify-webpack-themekit/issues/)
[![GitHub license](https://img.shields.io/github/license/hayes0724/shopify-webpack-themekit.svg)](https://github.com/hayes0724/shopify-webpack-themekit/blob/master/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/hayes0724/shopify-webpack-themekit.svg?style=social&label=Star&maxAge=2592000)](https://GitHub.com/hayes0724/shopify-webpack-themekit/stargazers/)
[![GitHub forks](https://img.shields.io/github/forks/hayes0724/shopify-webpack-themekit.svg?style=social&label=Fork&maxAge=2592000)](https://GitHub.com/hayes0724/shopify-webpack-themekit/network/)


Development tool for Shopify using webpack and themekit.

Check out the node package version: [Shopify Packer](https://github.com/hayes0724/shopify-packer)

1. [Requirements](#requirements)
2. [Getting Started](#getting-started)
3. [Theme files](#theme-files)
4. [Commands](#commands)

### Features
* Ready to use [blank starter theme](https://github.com/hayes0724/packer-blank-theme)
* Webpack 4
* Stylelint
* ESLint
* Babel
* Middleware for Shopify preview
* Webpack dev server for assets
* BrowserSync
* Chunks for templates and layouts

## Requirements

* Create config.js (see example.config.js)

## Getting Started

1. Install dependencies - `npm install`

2. Start webpack compiler - `npm run start`

`npm run deploy`

## Theme files

Webpack will create the following snippets that load all style and script chunks. You need to include this in your theme.liquid file.

```
 {% include 'script-tags' %}
 {% include 'style-tags' %}
```

### Creating chunks

The system will check for any script or style sheet that matches Shopify template and layout files.

filename: `scripts/templates/product.js`

creates file: `assets/template.product.js`

script-tags snippet (auto generated) will only load this script on pages that use product template

```html
{%- if template == 'product' -%}
<script type="text/javascript" src="{{ 'template.product.js' | asset_url }}" defer="defer"></script>
{%- else -%}
<link rel="prefetch" href="{{ 'template.product.js' | asset_url }}" as="script">
{%- endif -%}
```

## Commands

Start - Watches files for changes and deploys changes to Shopify. Also builds and deploys all theme files to Shopify before starting

`npm run start`

Watch - Watches files for changes and deploys changes to Shopify. Skips first deployment.

`npm run watch`

Build - Builds js/scss in production mode

`npm run build`

Deploy - Deploys the contents of dist folder

`npm run deploy`

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



