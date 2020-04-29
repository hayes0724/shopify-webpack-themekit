const {promisify} = require('util');
const portscanner = require('portscanner');

const findAPortInUse = promisify(portscanner.findAPortInUse);

function getAvailablePortSeries(start, quantity, increment = 1) {
    const startPort = start;
    const endPort = start + (quantity - 1);

    return findAPortInUse(startPort, endPort, '127.0.0.1').then((port) => {
        if (typeof port === 'number') {
            return getAvailablePortSeries(port + increment, quantity);
        }

        const ports = [];

        for (let i = startPort; i <= endPort; i += increment) {
            ports.push(i);
        }
        return ports;
    });
}

module.exports = function(start, quantity) {
    return getAvailablePortSeries(start, quantity);
};
