var StandardToken = artifacts.require("StandardToken.sol");

// Tests are based on https://medium.com/taipei-ethereum-meetup/smart-contract-unit-testing-use-erc20-token-contract-as-an-example-d150c2700834.

contract('StandardToken', function(accounts) {
	it("initial supply of tokens", function() {
		var standard_token;
		return StandardToken.deployed().then(function(instance) {
			standard_token = instance;
			return standard_token.totalSupply.call();
		}).then(function(result){
			assert.equal(result.toNumber(), 10000, 'total supply is wrong');
		})
	});
	it("balance of owner", function() {
		var standard_token;
		return StandardToken.deployed().then(function(instance) {
			standard_token = instance;
			return standard_token.balanceOf.call(web3.eth.accounts[0]);
		}).then(function(result){
			assert.equal(result.toNumber(), 10000, 'balance is wrong');
		})
	});
	it("transfer tokens", function() {
		var standard_token;
		return StandardToken.deployed().then(function(instance) {
			standard_token = instance;
			return standard_token.transfer(web3.eth.accounts[1], 5000);
		}).then(function(){
			return standard_token.balanceOf.call(web3.eth.accounts[0]);
		}).then(function(result){
			assert.equal(result.toNumber(), 5000, 'accounts[0] balance is wrong');
			return standard_token.balanceOf.call(web3.eth.accounts[1]);
		}).then(function(result){
			assert.equal(result.toNumber(), 5000, 'accounts[1] balance is wrong');
		})
	});
	it("give accounts[1] authority to spend accounts[0]'s tokens", function() {
		var standard_token;
		return StandardToken.deployed().then(function(instance){
			standard_token = instance;
			return standard_token.approve(web3.eth.accounts[1], 2000);
		}).then(function(){
			return standard_token.allowance.call(web3.eth.accounts[0], web3.eth.accounts[1]);
		}).then(function(result){
			assert.equal(result.toNumber(), 2000, 'allowance is wrong');
			return standard_token.transferFrom(web3.eth.accounts[0], web3.eth.accounts[2], 2000, {from: web3.eth.accounts[1]});
		}).then(function(){
			return standard_token.balanceOf.call(web3.eth.accounts[0]);
		}).then(function(result){
			assert.equal(result.toNumber(), 3000, 'accounts[0] balance is wrong');
			return standard_token.balanceOf.call(web3.eth.accounts[1]);
		}).then(function(result){
			assert.equal(result.toNumber(), 5000, 'accounts[1] balance is wrong');
			return standard_token.balanceOf.call(web3.eth.accounts[2]);
		}).then(function(result){
			assert.equal(result.toNumber(), 2000, 'accounts[2] balance is wrong');
		})
	});
});