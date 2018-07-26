const Password = artifacts.require('./passwordEscrow.sol')

module.exports = (deployer) => {
  const commissionFee = 0
  deployer.deploy(Password, commissionFee)
}
