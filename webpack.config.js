// Load data from shopifys config.yml
var webpack = require('webpack');
const read = require('read-yaml');
const config = read.sync('config.yml');
const themeID = config.development.theme_id;
const storeURL = config.development.store;
const browserSync = require('browser-sync');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const development = process.env.NODE_ENV !== 'production';

// webpack build
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

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
                use: [
                    {
                        loader: development ? 'style-loader' : MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader', options: { sourceMap: development }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            ident: 'postcss',
                            plugins: (loader) => [
                                require('postcss-preset-env')(),
                                require('cssnano')()
                            ]
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }],
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
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "compiled.css",
            chunkFilename: "[id].css",
            hmr: development
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new BrowserSyncPlugin({
            //host: '127.0.0.1',
            https: true,
            port: 3000,
            proxy: 'https://' + storeURL + '?preview_theme_id=' + themeID,
            reloadDelay: 2000,
            middleware: [
                function (req, res, next) {
                    // Shopify sites with redirection enabled for custom domains force redirection
                    // to that domain. `?_fd=0` prevents that forwarding.
                    // ?pb=0 hides the Shopify preview bar
                    const prefix = req.url.indexOf('?') > -1 ? '&' : '?';
                    const queryStringComponents = ['_fd=0&pb=0'];

                    req.url += prefix + queryStringComponents.join('&');
                    next();
                }
            ],
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
