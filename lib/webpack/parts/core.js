const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const settings = require('../../paths').init();
const getTemplateEntrypoints = require('../../utilities/get-template-entrypoints');
const getLayoutEntrypoints = require('../../utilities/get-layout-entrypoints');

const extractLiquidStyles = new ExtractTextPlugin(
    '[name].styleLiquid.scss.liquid',
);

const core = {
    context: settings.theme.root,

    output: {
        filename: '[name].js',
        path: settings.theme.dist.assets
    },

    entry: Object.assign(
        {},
        getLayoutEntrypoints(settings),
        getTemplateEntrypoints(settings),
    ),
    resolve: {
        alias: {
            lib: path.resolve(__dirname, 'lib')
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: settings.commonExcludes,
                loader: path.resolve('lib', 'hmr-alamo-loader.js'),
            },
            {
                test: /fonts\/.*\.(eot|svg|ttf|woff|woff2|otf)$/,
                exclude: /node_modules/,
                loader: 'file-loader',
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                exclude: settings.commonExcludes,
                use: [
                    {loader: 'file-loader', options: {name: '[name].[ext]'}},
                    {loader: 'img-loader'},
                ],
            },
            {
                test: /\.(liquid|json)$/,
                exclude: [
                    /(css|scss|sass)\.liquid$/,
                    ...settings.commonExcludes,
                ],
                loader: 'file-loader',
                options: {
                    name: '../[path][name].[ext]',
                },
            },
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /(css|scss|sass)\.liquid$/,
                exclude: settings.commonExcludes,
                use: extractLiquidStyles.extract(['concat-style-loader']),
            },
        ],
    },

    plugins: [
        new CleanWebpackPlugin({

        }),

        extractLiquidStyles,

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
                from: settings.theme.src.config,
                to: settings.theme.dist.config,
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
            {
                from: settings.theme.src.sections,
                to: settings.theme.dist.sections,
            },
        ]),
    ],
}

Object.keys(core.entry).forEach((name) => {
    core.entry[name] = [
        path.join(__dirname, '../../hot-client.js')
    ].concat(core.entry[name])
})

module.exports = core;