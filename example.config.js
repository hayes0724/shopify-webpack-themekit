/**
 *
 * @type {{network: {ipAddress: string, external: boolean|number, interface: boolean|string}, themes: {development: {id: string, password: string, store: string, ignore: string[]}}}}
 * Network
 * - ipAddress: force ip to use for dev server {'null', 'localhost', '192.168.1.1'}
 * - external: if no ip is provided use first external address {true|false}
 * - interface: use a specific network interface by name, otherwise first interface is selected {false, Ethernet}
 */
module.exports = {
    network: {
        ipAddress: 'localhost',
        external: false,
        interface: false,
    },
    themes: {
        development: {
            id: '74500024251', // Theme ID
            password: 'ebd6ce7f27aae8cdafb883a456456456', // Private app password
            store: 'mystore.myshopify.com', // Store URL
            ignore: [
                'settings_data.json' // leave this here to avoid overriding theme settings on sync
            ]
        },
    }
};