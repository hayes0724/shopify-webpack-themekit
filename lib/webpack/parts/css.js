const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isDev = process.env.NODE_ENV !== 'production';

const part = {
    module: {
        rules: [],
    },
    plugins: [],
};

const cssRule = {
    test: /\.css$/,
};

const styleLoader = {
    loader: 'style-loader',
    options: {
        hmr: isDev,
    },
};

const cssLoader = {
    loader: 'css-loader',
    // Enabling sourcemaps in styles when using HMR causes style-loader to inject
    // styles using a <link> tag instead of <style> tag. This causes
    // a FOUC content, which can cause issues with JS that is reading
    // the DOM for styles (width, height, visibility) on page load.
    options: {sourceMap: !isDev},
};

const postcssLoader = {
    loader: 'postcss-loader',
    options: {
        ident: 'postcss',
        sourceMap: !isDev,
        plugins: (loader) => [
            require('postcss-preset-env')(),
            require('cssnano')()
        ]
    },
};

//const cssVarLoader = {loader: '@shopify/slate-cssvar-loader'};

cssRule.use = [
    ...(isDev ? [styleLoader] : [MiniCssExtractPlugin.loader]),
    cssLoader,
    postcssLoader,
];
part.module.rules.push(cssRule);

module.exports = part;