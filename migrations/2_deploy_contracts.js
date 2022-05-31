// SPDX-License-Identifier: MIT
var TDVToken = artifacts.require("./TDVToken.sol");
var TDVTokenSale = artifacts.require("./TDVTokenSale.sol");
var KycContract = artifacts.require("./KycContract.sol");

require('dotenv').config({path: '../.env'});
console.log(process.env);

module.exports = async function(deployer) {

  let address = await web3.eth.getAccounts();
  await deployer.deploy(TDVToken,process.env.INITIAL_TOKEN);
  await deployer.deploy(KycContract);
  await deployer.deploy(TDVTokenSale,1,address[0], TDVToken.address, KycContract.address);

  let tokenInstance = await TDVToken.deployed();
  let totalSuplly = await tokenInstance.totalSupply();

await tokenInstance.transfer(TDVTokenSale.address,totalSuplly);


};
