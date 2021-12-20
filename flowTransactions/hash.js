//import { SHA3 } from "sha3";
const {SHA3}=require("sha3")
 function hash(message) {
    const sha = new SHA3(256)
    sha.update(Buffer.from(message, "hex"))
    return sha.digest()
}
module.exports=hash;