let Arweave = require("arweave");
const arweaveData = Arweave.init({
  host: "arweave.net",
  port: 443,
  protocol: "https",
  timeout: 200000, // Network request timeouts in milliseconds
  logging: false,
});
module.exports = arweaveData;
