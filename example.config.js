/**
 * @type {?Number|String} ipAddress - force ip to use for dev server
 * @type {?Boolean} external - if no ip is provided use first external address
 * @type {?Boolean|String} interface - use a specific network interface by name, otherwise first interface is selected
 */
module.exports = {
  network: {
    ipAddress: 'localhost',
    external: false,
    interface: false,
  },
  themes: {
    development: {
      id: '74500024251',
      password: 'ebd6ce7f27aae8cdafb883a456456456',
      store: 'mystore.myshopify.com',
      ignore: [
        'settings_data.json',
      ],
    },
  },
};
