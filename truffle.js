var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "mnemonic";


module.exports = {
  networks: {
    ropsten: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/_id")
      },
      network_id: 3,
      gas: 3000000,
      gasPrice: 5000000000
    },

    "live": {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://mainnet.infura.io/_id")
      },
      network_id: 1,
      gas: 4000000,
      gasPrice: 8000000000
    },

    development: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '*'
    }
  }
};
