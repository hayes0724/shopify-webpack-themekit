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

* npm install

#### Setup Instructions - NPM build scripts
All scripts are run in this format:
````
npm run [script-name]
````
To start work on a project:
```
npm run watch
```
another terminal
```
npm run theme-sync
```
* build - builds project one time
* watch - builds project, then continues to watch for changes
* theme-sync - starts the sync with shopify
* theme-upload - uploads theme one time
* theme-download - downloads theme one time

### Notes
1. *theme download* is useful if there are changes made in "customization"
2. *theme upload* to manually upload changes. Mainly used for pushing to production
3. *build* is good for one time build (getting production ready for upload)
4. make sure to cancel theme sync/watch before switching branches or uploading manually

