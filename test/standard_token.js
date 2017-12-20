var StandardToken = artifacts.require("StandardToken.sol");

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
	it("balance of token owner", function() {
		var standard_token;
		return StandardToken.deployed().then(function(instance){
			standard_token = instance;
			return standard_token.balanceOf(web3.eth.accounts[0]);
		}).then(function(result){
			assert.equal(result.toNumber(), 10000, 'balance is wrong');
		})
	});
});