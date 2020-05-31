const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const getTemplateEntrypoints = require('../utilities/get-template-entrypoints');
const getLayoutEntrypoints = require('../utilities/get-layout-entrypoints');
const settings = require('../config').init();
const development = process.env.NODE_ENV !== 'production';
// Parts
const core = require('./parts/core');
const css = require('./parts/css');
const scss = require('./parts/scss');

module.exports = merge([
    core,
    scss,
    css,
    {
        mode: 'production',
        devtool: 'hidden-source-map',
        plugins: [
      /*      new MiniCssExtractPlugin({
                filename: '[name].css.liquid',
                chunk: '[chunk].css.liquid',
            }),*/

            new MiniCssExtractPlugin({
                filename: '[name].css',
                chunk: '[chunk].css',
            }),

            new webpack.DefinePlugin({
                'process.env': {NODE_ENV: '"production"'},
            }),

            new UglifyJSPlugin({
                sourceMap: true,
            }),

            // generate dist/layout/*.liquid for all layout files with correct paths to assets

            new HtmlWebpackPlugin({
                excludeChunks: ['static'],
                filename: settings.theme.dist.snippets + '/script-tags.liquid',
                template: './lib/script-tags.html',
                inject: false,
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: false,
                    preserveLineBreaks: true,
                    // more options:
                    // https://github.com/kangax/html-minifier#options-quick-reference
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
                    collapseWhitespace: true,
                    removeAttributeQuotes: false,
                    preserveLineBreaks: true,
                    // more options:
                    // https://github.com/kangax/html-minifier#options-quick-reference
                },
                isDevServer: development,
                liquidTemplates: getTemplateEntrypoints(settings),
                liquidLayouts: getLayoutEntrypoints(settings),
            }),

            //new HtmlWebpackIncludeLiquidStylesPlugin(),

            //new SlateTagPlugin(packageJson.version),
        ],
    },

])