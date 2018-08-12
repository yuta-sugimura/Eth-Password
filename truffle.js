let HDWalletProvider = require("truffle-hdwallet-provider")
let mnemonic = "12 words";
let infura_ropsten = "https://ropsten.infura.io/v3/"
let infura_main = "https://mainnet.infura.io/v3/"
let infura_key = ""

module.exports = {
  networks: {
    ropsten: {
      provider: function() {
        return new HDWalletProvider(mnemonic, infura_ropsten + infura_key)
      },
      network_id: 3,
      gas: 3000000,
      gasPrice: 5000000000
    },

    "live": {
      provider: function() {
        return new HDWalletProvider(mnemonic, infura_main + infura_key)
      },
      network_id: 1,
      gas: 3000000,
      gasPrice: 5000000000
    },

    development: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '*' // Match any network id
    }
  }
};
