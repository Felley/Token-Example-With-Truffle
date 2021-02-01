const Token = artifacts.require("EXTToken");
const TokenSale = artifacts.require("MyTokenSale");
const KycContract = artifacts.require("KYCContract");

const chai = require("./chaisetup.js");
const BN = web3.utils.BN;
const expect = chai.expect;


contract("MyTokenSaleTest", async accounts => {
    const [initialHolder, recipient, anotherAccount] = accounts;

    it("shoud be no coins in my acc", async () => {
        let instance = await Token.deployed();
        return expect(instance.balanceOf.call(initialHolder)).to.eventually.be.a.bignumber.equal(new BN(0));
    })

    it("all tokens should be in smart contract", async() => {
        let instance = await Token.deployed();
        let balance = await instance.balanceOf.call(TokenSale.address);
        let totalSupply = await instance.totalSupply();
        return expect(balance).to.be.a.bignumber.equal(totalSupply);
    })

    it("should be possible to buy token by simply send ether to smart contract", async() => {
        let tokenInstance = await Token.deployed();
        let tokenSaleInstance = await TokenSale.deployed();
        let balanceBeforeAcc = await tokenInstance.balanceOf.call(recipient);
        expect(tokenSaleInstance.sendTransaction({from: recipient, value: web3.utils.toWei("1", "wei")})).to.be.rejected;
        expect(balanceBeforeAcc).to.be.bignumber.equal(await tokenInstance.balanceOf.call(recipient));
        let kycInstance = await KycContract.deployed();
        await kycInstance.setKYCCompleted(recipient);
        expect(tokenSaleInstance.sendTransaction({from: recipient, value: web3.utils.toWei("1", "wei")})).to.be.fulfilled;
        return expect(balanceBeforeAcc + 1).to.be.a.bignumber.equal(await tokenInstance.balanceOf.call(recipient));

    })
});