/* eslint-disable */
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const read = require('read-yaml');
const config = read.sync('config.yml');
const themeID = config.development.theme_id;
const storeURL = config.development.store;
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const settings = require('./lib/config').init();
const HtmlWebpackPlugin = require('html-webpack-plugin');
const getTemplateEntrypoints = require('./lib/utilities/get-template-entrypoints');
const getLayoutEntrypoints = require('./lib/utilities/get-layout-entrypoints');

// webpack build
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const development = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: Object.assign(
        {},
        getLayoutEntrypoints(settings),
        getTemplateEntrypoints(settings),
    ),
    output: {
        filename: '[name].js',
        path: settings.theme.dist.assets
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
                        loader: development ? 'style-loader' : MiniCssExtractPlugin.loader,
                        options: {
                            hmr: development,
                        },
                    },
                    {
                        loader: 'css-loader', options: { sourceMap: true }
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
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=100000'
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
                test: /\.js$/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: settings.theme.src.assets,
                to: settings.theme.dist.assets,
                flatten: true,
            },
            {
                from: settings.theme.src.layout,
                to: settings.theme.dist.layout,
            },
            {
                from: settings.theme.src.locales,
                to: settings.theme.dist.locales,
            },
            {
                from: settings.theme.src.snippets,
                to: settings.theme.dist.snippets,
            },
            {
                from: settings.theme.src.templates,
                to: settings.theme.dist.templates,
            },
        ]),
        new HtmlWebpackPlugin({
            excludeChunks: ['static'],
            filename: settings.theme.dist.snippets + '/script-tags.liquid',
            template: './lib/script-tags.html',
            inject: false,
            minify: {
                removeComments: true,
                removeAttributeQuotes: false,
            },
            isDevServer: development,
            liquidTemplates: getTemplateEntrypoints(settings),
            liquidLayouts: getLayoutEntrypoints(settings),
        }),

        new HtmlWebpackPlugin({
            excludeChunks: ['static'],
            filename: settings.theme.dist.snippets + '/style-tags.liquid',
            template: './lib/style-tags.html',
            inject: false,
            minify: {
                removeComments: true,
                removeAttributeQuotes: false,
            },
            isDevServer: development,
            liquidTemplates: getTemplateEntrypoints(settings),
            liquidLayouts: getLayoutEntrypoints(settings),
        }),
        new webpack.HotModuleReplacementPlugin({
            // Options...
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css',
            chunkFilename:  '[id].css',
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new BrowserSyncPlugin({
            host: 'localhost',
            https: true,
            port: settings.ports[0],
            uiPort: settings.ports[2],
            //reloadDelay: 2000,
            proxy: {
                target: 'https://' + storeURL + '?preview_theme_id=' + themeID,
                middleware: function (req, res, next) {
                    // Shopify sites with redirection enabled for custom domains force redirection
                    // to that domain. `?_fd=0` prevents that forwarding.
                    // ?pb=0 hides the Shopify preview bar
                    const prefix = req.url.indexOf('?') > -1 ? '&' : '?';
                    const queryStringComponents = ['_fd=0&pb=0'];

                    req.url += prefix + queryStringComponents.join('&');
                    next();
                }
            },
            socket: {
                domain: `https://${storeURL}:${settings.ports[0]}`,
            },
            files: [
                {
                    match: [
                        '**/*.liquid',
                        //'**/*.scss'
                    ],
                    fn: function(event, file) {
                        if (event === "change") {
                            const bs = require('browser-sync').get('bs-webpack-plugin');
                            console.log('https://' + storeURL + '?preview_theme_id=' + themeID);
                            bs.reload();
                        }
                    }
                }
            ]
        })
    ]
};
