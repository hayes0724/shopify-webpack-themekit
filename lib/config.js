const path = require('path');
const getAvailablePortSeries = require('./utilities/get-available-port-series.js');

const roots = {
    src: path.resolve(__dirname, '../src'),
    dist: path.resolve(__dirname, '../dist'),
};

function init() {
    const ports = getAvailablePortSeries(3000, 3);
    return {
        ports: {
            server: ports[0],
            assets: ports[1],
            ui: ports[2],
        },
        theme: {
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
            },
        },
    };
}
module.exports = {
    init,
};
