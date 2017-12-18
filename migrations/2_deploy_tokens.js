const StandardToken = artifacts.require(`./StandardToken.sol`)

module.exports = (deployer) => {
  deployer.deploy(StandardToken)
}
