require("@nomiclabs/hardhat-waffle");
require("solidity-coverage");
require('dotenv').config();

const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, './.env') })
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const { RINKEBY_RPC_URL, ROPSTEN_RPC_URL, PRIVATE_KEY } = process.env;

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 module.exports = {
    solidity:{
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
      compilers:[
        {
          version: "0.8.4"
        }
      ]
    },

    networks:{
      ropsten:{
        url: ROPSTEN_RPC_URL,
        accounts: [PRIVATE_KEY]
      },
      rinkeby:{
        url: RINKEBY_RPC_URL,
        accounts: [PRIVATE_KEY]
      }
   },
 };
