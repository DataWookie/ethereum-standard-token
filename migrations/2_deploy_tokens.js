const StandardToken = artifacts.require(`./StandardToken.sol`)

module.exports = (deployer) => {
  deployer.deploy(StandardToken, 10000, "StandardToken", "STX")
}
