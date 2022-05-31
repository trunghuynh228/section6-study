var TDVToken = artifacts.require("TDVToken.sol");
const chai = require("./setup_chai.js");
const BN = web3.utils.BN;
const expect = chai.expect

require('dotenv').config({path: '../.env'});
console.log(process.env);

contract ("TDVToken test", async(accounts) => {

    const [deployerAccount, anotherAccount] = accounts;
    beforeEach(async() => {
        this.TDVToken = await TDVToken.new(process.env.INITIAL_TOKEN)
    })

    it("All token should be in first account", async()=> {
    let instance = await this.TDVToken

    let totalSupply = await instance.totalSupply();

    expect (await instance.balanceOf(accounts[0])).to.be.a.bignumber.equal(totalSupply);
    })
})