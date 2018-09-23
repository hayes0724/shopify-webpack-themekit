// Load data from shopifys config.yml
const read = require('read-yaml');
const config = read.sync('config.yml');
const themeID = config.development.theme_id;
const storeURL = config.development.store;
// webpack build
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const extractSass = new ExtractTextPlugin({
    filename: "compiled.scss.liquid",
    disable: process.env.NODE_ENV === "development"
});

module.exports = {
    entry: './_src/js/app.js',
    output: {
        filename: 'compiled.js',
        path: path.resolve(__dirname, 'assets')
    },
    externals: {
        "jquery": "jQuery"
    },
    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                use: extractSass.extract({
                    use: [
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "postcss-loader"
                    },
                    {
                        loader: "sass-loader"
                    }],

                    // use style-loader in development
                    fallback: "style-loader"
                })
            },
            {
                // Match woff2 and patterns like .woff?v=1.1yo.1.
                test:  /\.(ttf|eot|woff|woff2|svg)$/,
                loader: "url-loader?limit=100000",
                options: {
                    name: "[name].[ext]",
                },
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=100000'
            }
        ]
    },
    plugins: [
        extractSass,
        new BrowserSyncPlugin({
            host: storeURL,
            port: 3000,
            proxy: storeURL + '?preview_theme_id=' + themeID,
            reloadDelay: 2000,
            files: [
                {
                    match: [
                        '**/*.liquid',
                        '**/*.scss'
                    ],
                    fn: function(event, file) {
                        if (event === "change") {
                            const bs = require('browser-sync').get('bs-webpack-plugin');
                            bs.reload();
                        }
                    }
                }
            ]
        })
    ]
};