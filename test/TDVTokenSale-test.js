var TDVToken = artifacts.require("TDVToken.sol");
var TDVTokenSale = artifacts.require("TDVTokenSale.sol");
var KycContract = artifacts.require("KycContract.sol");

require('dotenv').config({path: '../.env'});
const chai = require("./setup_chai.js");
const BN = web3.utils.BN;
const expect = chai.expect

contract ("TDVTokenSale test", async(accounts) => {

    const [deployerAccount, anotherAccount] = accounts;

    it("All token should be empty first account", async()=> {
        let instance = await TDVToken.deployed();

        expect (await instance.balanceOf(accounts[0])).to.be.a.bignumber.equal(new BN(0));
    })

    it("all tokens should be in the TokenSale Smart Contract by default", async()=> {
        let instance = await TDVToken.deployed();
        let totalSupply = await instance.totalSupply();

        let balanceofTokenSaleSC = await instance.balanceOf(TDVTokenSale.address);

        expect
    
        await expect(balanceofTokenSaleSC).to.be.a.bignumber.equal(totalSupply);
     })

     it("Not possible buy one token if not whitelisted", async()=> {
        let instance = await TDVToken.deployed();
        let tokenSaleInstance = await TDVTokenSale.deployed();
        let balanceBefore = await instance.balanceOf.call(anotherAccount);

        await expect(tokenSaleInstance.sendTransaction({from: anotherAccount, value: web3.utils.toWei("1","wei")}));
        await expect(balanceBefore).to.be.bignumber.equal(await instance.balanceOf.call(anotherAccount));
        
    })  
   
    it("Should be possible to buy one token by sending ether to smart contract after whitelisted", async()=> {
        let instance = await TDVToken.deployed();
        let tokenSaleInstance = await TDVTokenSale.deployed();
        let balanceBefore = await instance.balanceOf.call(anotherAccount);
        console.log("balance",balanceBefore.toString());
        let KycContractInstance = await KycContract.deployed();
        await KycContractInstance.setKyc(anotherAccount);

        await expect(tokenSaleInstance.sendTransaction({from: anotherAccount,value: web3.utils.toWei("1","wei")})).to.be.fulfilled;

        await expect(balanceBefore.addn(1)).to.be.bignumber.equal(await instance.balanceOf.call(anotherAccount));
        
    })   
})