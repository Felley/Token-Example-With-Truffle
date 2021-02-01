var MyToken = artifacts.require("EXTToken");
var MyTokenSale = artifacts.require("MyTokenSale");
var KycContract = artifacts.require("KYCContract");
require('dotenv').config({path:'../.env'});

module.exports = async function(deployer) {
    let addr = await web3.eth.getAccounts();
    await deployer.deploy(MyToken, process.env.INITIAL_TOKENS);
    await deployer.deploy(KycContract);
    await deployer.deploy(MyTokenSale, 1, addr[0], MyToken.address, KycContract.address);
    let tokenInstance = await MyToken.deployed();
    await tokenInstance.transfer(MyTokenSale.address, process.env.INITIAL_TOKENS);
}