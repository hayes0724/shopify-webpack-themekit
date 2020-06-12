const flags = require('minimist')(process.argv.slice(2));
const consoleControl = require('console-control-strings');
const clearConsole = require('../../utilities/clear-console');
const AssetServer = require('../../server/asset-server');
const DevServer = require('../../server/dev-server');
const webpackConfig = require('../../webpack/dev.config');
const chalk = require('chalk');
const figures = require('figures');
const ora = require('ora');
const ip = require('ip');
const getAvailablePortSeries = require('../../utilities/get-available-port-series');
const config = require('../../../config');
const promptContinueIfPublishedTheme = require('../../server/prompts/continue-if-published-theme');
const promptSkipSettingsData = require('../../server/prompts/skip-settings-data');
const Environment = require('../../enviroment');

const envFlag = (flags.env ? flags.env : process.env.NODE_ENV || 'development');
const env = new Environment(envFlag);
const spinner = ora(chalk.magenta('Compiling...'));

function getIpAddress() {
    if (config.network.ipAddress) {
        console.log(`Using forced IP Address ${config.network.ipAddress}`);
        return config.network.ipAddress;
    }
    if (config.network.interface) {
        return ip.address(config.network.interface)
    }
    if (config.network.external) {
        return ip.address('public')
    }
    return ip.address('private');
}

const address = getIpAddress();

let firstSync = true;
let skipSettingsData = null;
let continueIfPublishedTheme = null;
let assetServer;
let devServer;
let themeId;
let url;
let previewUrl;

Promise.all([
    getAvailablePortSeries(3000, 3),
])
    .then((ports) => {
        ports = ports[0];

        themeId = config.themes.development.id;
        url = config.themes.development.store;

        assetServer = new AssetServer({
            env:  process.env.NODE_ENV,
            skipFirstDeploy: flags.skipFirstDeploy,
            webpackConfig,
            port: ports[1],
            address,
        });

        devServer = new DevServer({
            port: ports[0],
            uiPort: ports[2],
            target: url,
            themeId: themeId,
            address,
        });

        previewUrl = `https://${url}?preview_theme_id=${themeId}`;

        assetServer.compiler.hooks.compile.tap('CLI', onCompilerCompile);
        assetServer.compiler.hooks.done.tap('CLI', onCompilerDone);
        assetServer.client.hooks.beforeSync.tapPromise('CLI', onClientBeforeSync);
        assetServer.client.hooks.syncSkipped.tap('CLI', onClientSyncSkipped);
        assetServer.client.hooks.sync.tap('CLI', onClientSync);
        assetServer.client.hooks.syncDone.tap('CLI', onClientSyncDone);
        assetServer.client.hooks.afterSync.tap('CLI', onClientAfterSync);

        return assetServer.start();
    })
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

function onCompilerCompile() {
    if (process.env.NODE_ENV !== 'test') {
        //
    }
    spinner.start();
}

function onCompilerDone(stats) {
    const statsJson = stats.toJson({}, true);

    spinner.stop();

    if (process.env.NODE_ENV !== 'test') {

    }

    if (statsJson.errors.length) {
        console.log(chalk.red('Failed to compile.\n'));

        statsJson.errors.forEach((message) => {
            console.log(`${message}\n`);
        });
    }

    if (statsJson.warnings.length) {
        console.log(chalk.yellow('Compiled with warnings.\n'));

        statsJson.warnings.forEach((message) => {
            console.log(`${message}\n`);
        });
    }

    if (!statsJson.errors.length && !statsJson.warnings.length) {
        console.log(
            `${chalk.green(figures.tick)}  Compiled successfully in ${statsJson.time /
            1000}s!`,
        );
    }
}
async function onClientBeforeSync(files) {
    const themeID = Environment.getThemeIdValue();

    if (firstSync && flags.skipFirstDeploy) {
        assetServer.skipDeploy = true;

        return;
    }

    if (continueIfPublishedTheme === null) {
        try {
            continueIfPublishedTheme = await promptContinueIfPublishedTheme(themeID);
        } catch (error) {
            console.log(`\n${chalk.red(error)}\n`);
        }
    }

    if (!continueIfPublishedTheme) {
        process.exit(0);
    }

    if (skipSettingsData === null) {
        skipSettingsData = await promptSkipSettingsData(files);
    }

    if (skipSettingsData) {
        assetServer.files = files.filter(
            (file) => !file.endsWith('settings_data.json'),
        );
    }
}

function onClientSyncSkipped() {
    if (!(firstSync && flags.skipFirstDeploy)) return;
    console.log(
        `\n${chalk.blue(
            figures.info,
        )}  Skipping first deployment because --skipFirstDeploy flag`,
    );
}

function onClientSync() {
    //console.log('client sync')
}

function onClientSyncDone() {
    process.stdout.write(consoleControl.previousLine(4));
    process.stdout.write(consoleControl.eraseData());

    console.log(`\n${chalk.green(figures.tick)}  Files uploaded successfully!`);
}

async function onClientAfterSync() {
    if (firstSync) {
        firstSync = false;
        await devServer.start();
    }

    const urls = devServer.server.options.get('urls');

    console.log(
        `${chalk.yellow(
            figures.star,
        )}  You are editing files in theme ${chalk.green(
            Environment.getThemeIdValue(),
        )} on the following store:\n`,
    );

    console.log(`      ${chalk.cyan(previewUrl)}`);

    console.log();
    console.log(`   Your theme can be previewed at:\n`);
    console.log(
        `      ${chalk.cyan(urls.get('local'))} ${chalk.grey('(Local)')}`,
    );

    if (devServer.address !== 'localhost') {
        console.log(
            `      ${chalk.cyan(urls.get('external'))} ${chalk.grey('(External)')}`,
        );
    }
    console.log();
    console.log(`   Assets are being served from:\n`);

    console.log(
        `      ${chalk.cyan(`https://localhost:${assetServer.port}`)} ${chalk.grey(
            '(Local)',
        )}`,
    );

    if (assetServer.address !== 'localhost') {
        console.log(
            `      ${chalk.cyan(
                `https://${assetServer.address}:${assetServer.port}`,
            )} ${chalk.grey('(External)')}`,
        );
    }

    console.log();
    console.log(`   The Browsersync control panel is available at:\n`);

    if (devServer.address !== 'localhost') {
        console.log(
            `      ${chalk.cyan(urls.get('ui-external'))} ${chalk.grey(
                '(External)',
            )}`,
        );
    }

    console.log(chalk.magenta('\nWatching for changes...'));
}
