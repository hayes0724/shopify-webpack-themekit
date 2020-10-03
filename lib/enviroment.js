const chalk = require('chalk');
const config = require('../config');

module.exports = class Environment {
  constructor(env) {
    this.config = config;
    this.env = env;
    this.settings = config.themes[env];
    this._setEnvironment();
  }

  static validate() {
    const errors = [].concat(
      Environment._validateStore(),
      Environment._validatePassword(),
      Environment._validateThemeId(),
    );

    return {
      errors,
      isValid: errors.length === 0,
    };
  }

  static getEnvNameValue() {
    return process.env.ENVIRONMENT;
  }

  static getPasswordValue() {
    return process.env.PASSWORD;
  }

  static getThemeIdValue() {
    return process.env.THEME_ID;
  }

  static getStoreValue() {
    return process.env.STORE;
  }

  static getIgnoreFilesValue() {
    return process.env.IGNORE_FILES;
  }

  _setEnvironment() {
    console.log(chalk.green(`Loading environment: ${this.env}`));
    process.env.ENVIRONMENT = process.env.ENVIRONMENT || this.env;
    process.env.NODE_ENV = process.env.NODE_ENV || this.env;
    process.env.THEME_ID = process.env.THEME_ID || this.settings.id;
    process.env.PASSWORD = process.env.PASSWORD || this.settings.password;
    process.env.STORE = process.env.STORE || this.settings.store;
    process.env.IGNORE_FILES = process.env.IGNORE_FILES || this.settings.ignore.join(':');
  }

  static _validateStore() {
    const errors = [];
    const store = Environment.getStoreValue();

    if (store.length === 0) {
      errors.push(new Error(`${Environment.getEnvNameValue()} - store url must not be empty`));
    } else if (
      store.indexOf('.myshopify.com') < 1 &&
      store.indexOf('.myshopify.io') < 1
    ) {
      errors.push(
        new Error(
          `${Environment.getEnvNameValue()} - store url must be a valid .myshopify.com URL`,
        ),
      );
    } else if (store.slice(-1) === '/') {
      errors.push(
        new Error(
          `${Environment.getEnvNameValue()} store url must not end with a trailing slash`,
        ),
      );
    }

    return errors;
  }

  static _validatePassword() {
    const errors = [];
    const password = Environment.getPasswordValue();

    if (password.length === 0) {
      errors.push(
        new Error(`${Environment.getEnvNameValue()} - password must not be empty`),
      );
    } else if (!/^\w+$/.test(password)) {
      errors.push(
        new Error(`${Environment.getEnvNameValue()} can only contain numbers and letters`),
      );
    }

    return errors;
  }

  static _validateThemeId() {
    const errors = [];
    const themeId = Environment.getThemeIdValue();

    if (themeId.length === 0) {
      errors.push(
        new Error(`${Environment.getEnvNameValue()} theme id must not be empty`),
      );
    } else if (themeId !== 'live' && !/^\d+$/.test(themeId)) {
      errors.push(
        new Error(
          `${Environment.getEnvNameValue()} theme id can be set to 'live' or a valid theme ID containing only numbers`,
        ),
      );
    }

    return errors;
  }
};
