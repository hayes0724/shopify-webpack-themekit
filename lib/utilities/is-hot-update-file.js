module.exports = function(key) {
    return /\.hot-update\.json$/.test(key) || /\.hot-update\.js$/.test(key);
};
