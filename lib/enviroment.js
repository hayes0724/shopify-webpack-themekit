const config = require('../config');

module.exports = class Environment {
    constructor(env = 'development') {
        this.config = config;
        this.env = env;
        this.settings = config.themes[env];
        this.setEnvironment();
    }
    validate() {
        const errors = [].concat(
            this._validateStore(),
            this._validatePassword(),
            this._validateThemeId(),
        );

        return {
            errors,
            isValid: errors.length === 0,
        };
    }

    setEnvironment() {
        console.log('setting environment');
        process.env.ENVIRONMENT = process.env.ENVIRONMENT || this.env;
        process.env.THEME_ID = process.env.THEME_ID || this.settings.id;
        process.env.PASSWORD = process.env.PASSWORD || this.settings.password;
        process.env.STORE = process.env.STORE || this.settings.store;
        process.env.IGNORE_FILES = process.env.IGNORE_FILES || this.settings.ignore.join(':');
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

     _validateStore() {
        const errors = [];
        const store = Environment.getStoreValue();

        if (store.length === 0) {
            errors.push(new Error(`${this.env} - store url must not be empty`));
        } else if (
            store.indexOf('.myshopify.com') < 1 &&
            store.indexOf('.myshopify.io') < 1
        ) {
            errors.push(
                new Error(
                    `${this.env} - store url must be a valid .myshopify.com URL`,
                ),
            );
        } else if (store.slice(-1) === '/') {
            errors.push(
                new Error(
                    `${this.env} store url must not end with a trailing slash`,
                ),
            );
        }

        return errors;
    }

    _validatePassword() {
        const errors = [];
        const password = Environment.getPasswordValue();

        if (password.length === 0) {
            errors.push(
                new Error(`${this.env} - password must not be empty`),
            );
        } else if (!/^\w+$/.test(password)) {
            errors.push(
                new Error(`${this.env} can only contain numbers and letters`),
            );
        }

        return errors;
    }

    _validateThemeId() {
        const errors = [];
        const themeId = Environment.getThemeIdValue();

        if (themeId.length === 0) {
            errors.push(
                new Error(`${this.env} theme id must not be empty`),
            );
        } else if (themeId !== 'live' && !/^\d+$/.test(themeId)) {
            errors.push(
                new Error(
                    `${this.env} theme id can be set to 'live' or a valid theme ID containing only numbers`,
                ),
            );
        }

        return errors;
    }
}