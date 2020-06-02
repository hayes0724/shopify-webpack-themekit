const path = require('path');
const os = require('os');
const {existsSync, readFileSync} = require('fs');

function sslKeyCert() {
    const key = readFileSync(getSSLKeyPath());
    const cert = readFileSync(getSSLCertPath());

    return {key, cert};
}

function getSSLKeyPath() {
    const key = path.resolve(os.homedir(), '.localhost_ssl/server.key');
    return existsSync(key)
        ? key
        : path.join(__dirname, './server.pem');
}

function getSSLCertPath() {
    const cert = path.resolve(os.homedir(), '.localhost_ssl/server.crt');
    return existsSync(cert)
        ? cert
        : path.join(__dirname, './server.pem');
}

module.exports = {
    sslKeyCert,
    getSSLCertPath,
    getSSLKeyPath
};