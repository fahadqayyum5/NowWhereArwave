const jkw = require("../ReadArweaveDataFile/ReadSecretFile.js");
const arweave = require("../InitArweaveSettings/InitArweaveSettings.js");

const getArweaveBalance = async () => {
  const ProdKey = await jkw;

  const generatedAddr = await arweave.wallets.getAddress(ProdKey);
  const generatedAddressBalance = await arweave.wallets
    .getBalance(generatedAddr)
    .then((balance) => {
      let winston = balance;
      let ar = arweave.ar.winstonToAr(balance);
      return ar;
    });
  console.log(generatedAddressBalance);
  return generatedAddressBalance;
};
module.exports = getArweaveBalance();
