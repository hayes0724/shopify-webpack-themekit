## Shopify Webpack/ThemeKit

#### Setup Instructions - First time install
Requirements:
1. Have [theme kit](https://shopify.github.io/themekit/) installed globally (run auto install once per computer)
2. [API access](https://shopify.github.io/themekit/#get-api-access) to store
3. Create a dev theme by duplicating live site, use it's theme id in the next step
4. Add [config.yml](https://shopify.github.io/themekit/#configure-an-existing-theme) for existing stores
5. Use *theme-download* to download the theme for the first time
6. Theme is ready to work on, follow NPM build scripts
````
theme configure --password=[your-password] --store=my-store.myshopify.com --themeid=123
````

### Theme files
```
 {{ 'compiled.scss.css' | asset_url | stylesheet_tag }}
 {{ 'compiled.js' | asset_url | script_tag }}
```

* npm install

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


