//import elliptic from 'elliptic';
const elliptic = require("elliptic");
const EdDSA = elliptic.ec;
const ec1 = new EdDSA("p256");

//import { hash } from "./hash.js"
const hash = require("./hash.js");
const sign = (privateKey, message) => {
  const key = ec1.keyFromPrivate(Buffer.from(privateKey, "hex"));
  const sig = key.sign(hash(message));
  const n = 32;
  const r = sig.r.toArrayLike(Buffer, "be", n);
  const s = sig.s.toArrayLike(Buffer, "be", n);
  return Buffer.concat([r, s]).toString("hex");
};
module.exports = sign;
