/**
 *
 * @type {{network: {ipAddress: string, external: boolean}, themes: {development: {id: string, password: string, store: string, ignore: string[]}}}}
 * Network
 * - ipAddress: force ip to use for dev server {'null', 'localhost', 'ip address'}
 * - external: if no ip is provided use first external address
 * - interface: use a specific network interface, otherwise first interface is selected
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