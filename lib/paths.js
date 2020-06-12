const path = require('path');
const getTemplateEntrypoints = require('./utilities/get-template-entrypoints');
const getLayoutEntrypoints = require('./utilities/get-layout-entrypoints');

const roots = {
    src: path.resolve(process.cwd(), 'src'),
    dist: path.resolve(process.cwd(), 'dist'),
};

const config = {
    commonExcludes: [/node_modules/, /assets\/static/],
    theme: {
        root: process.cwd(),
        src: {
            assets: path.resolve(roots.src, './assets'),
            config: path.resolve(roots.src, './config'),
            scripts: path.resolve(roots.src, './scripts'),
            styles: path.resolve(roots.src, './styles'),
            layout: path.resolve(roots.src, './layout'),
            locales: path.resolve(roots.src, './locales'),
            snippets: path.resolve(roots.src, './snippets'),
            templates: path.resolve(roots.src, './templates'),
            customers: path.resolve(roots.src, './templates/customers'),
            sections: path.resolve(roots.src, './sections'),
            root: roots.src
        },
        dist: {
            assets: path.resolve(roots.dist, './assets'),
            config: path.resolve(roots.dist, './config'),
            scripts: path.resolve(roots.dist, './scripts'),
            styles: path.resolve(roots.dist, './styles'),
            layout: path.resolve(roots.dist, './layout'),
            locales: path.resolve(roots.dist, './locales'),
            snippets: path.resolve(roots.dist, './snippets'),
            templates: path.resolve(roots.dist, './templates'),
            customers: path.resolve(roots.dist, './templates/customers'),
            sections: path.resolve(roots.dist, './sections'),
            root: roots.dist
        },
    },
};

config.liquidTemplates = getTemplateEntrypoints(config);
config.liquidLayouts = getLayoutEntrypoints(config);
config.entrypoints = {...config.liquidTemplates, ...config.liquidLayouts};

module.exports = {
    config,
};
