/**
 *
 * @type {{network: {ipAddress: string, external: boolean}, themes: {development: {id: string, password: string, store: string, ignore: string[]}}}}
 * Network
 * - ipAddress: force ip to use for dev server {'null', 'localhost', '192.168.1.1'}
 * - external: if no ip is provided use first external address {}
 * - interface: use a specific network interface, otherwise first interface is selected
 */
module.exports = {
    network: {
        ipAddress: null,
        external: false,
        interface: 'Ethernet',
    },
    themes: {
        development: {
            id: '74500046908',
            password: 'ebd6ce7f27aae8cdafb883a8a5b887b9',
            store: 'hm-themekit.myshopify.com',
            ignore: [
                'settings_data.json' // leave this here to avoid overriding theme settings on sync
            ]
        },
    }
};