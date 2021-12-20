//import { sign } from "./sign.js"
const sign = require("./sign.js");
async function authz(account) {
  return {
    ...account, // there is some stuff already in here, we need it
    addr: "0xeabdfe827c7db887", // which flow account is going to be doing the signing
    keyId: 0,
    sequenceNum: 99, // says which key we want to do the signing with
    // How to get a signature
    signingFunction: async (signable) => ({
      addr: "0xeabdfe827c7db887", // In this case it should be the same as above
      keyId: 0, // In this case it should be the same as above
      signature: sign(
        "78f922c5e636bb9816f39a769ccc62f1e1a03cf9247cf431608e938fd1caa525",
        signable.message
      )
    })
  };
}
module.exports = authz;
