const webpack = require('webpack');
const webpackConfig = require('../../webpack/prod.config');

webpack(webpackConfig, (err, stats) => {
    if (err) throw err;

    process.stdout.write(
        `${stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false,
        })}`,
    );

    console.log('');

    if (stats.compilation.errors.length) process.exit(1);
});
