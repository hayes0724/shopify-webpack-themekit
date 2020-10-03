const chalk = require('chalk');
const {deploy, replace} = require('../../src/server/sync');
const promptContinueIfPublishedTheme = require('../../src/server/prompts/continue-if-published-theme');
const Environment = require('../../src/utilities/enviroment');

module.exports = (args) => {
  const envFlag = (args.env ? args.env : process.env.NODE_ENV || 'development');
  const env = new Environment(envFlag);
  promptContinueIfPublishedTheme(Environment.getThemeIdValue())
    .then((answer) => {
      if (!answer) {
        process.exit(0);
      }
      if (args.nodelete) {
        return deploy();
      }
      return replace();
    })
    .then(() => {
      return console.log(chalk.green('\nFiles overwritten successfully!\n'));
    })
    .catch((error) => {
      console.log(`\n${chalk.red(error)}\n`);
    });
}
