//import * as sdk from "@onflow/sdk"
const sdk = require("@onflow/sdk");

//import { authz } from "./authz.js";
const authz = require("./authz.js");

sdk
  .config()
  //.put("accessNode.api", "http://127.0.0.1:8080")
  //.put("accessNode.api", "http://localhost:8080") // local Flow emulator
  // .put("challenge.handshake", "http://localhost:8701/flow/authenticate") // local dev wallet
  // .put("challenge.scope", "email") // request for Email
  .put("accessNode.api", "https://access-testnet.onflow.org"); // Flow testnet

const NFTMint = async () => {
  var txId = await sdk
    .send([
      sdk.transaction`
        import NFTContract from 0xeabdfe827c7db887;
            transaction {
                let receiverRef:&{NFTContract.NFTReceiver};
                let adminRef:&NFTContract.TemplateCollection;
                let minterRef:&NFTContract.NFTMinter;prepare(acct: AuthAccount){
                self.receiverRef=acct.getCapability<&{NFTContract.NFTReceiver}>(/public/NFTReceiver)
                .borrow()??panic("Could not borrow the receiver reference");
                self.minterRef=acct.borrow<&NFTContract.NFTMinter>(from:/storage/NFTMinterv1)
                ??panic("Could not borrow the receiver reference");
                self.adminRef=acct.borrow<&NFTContract.TemplateCollection>(from:/storage/TemplateCollectionv9)
                ??panic("Could not borrow the receiver reference");
                let temp=self.adminRef.isTemplateLocked(TemplateID:24);
                if temp==true{
                    panic("Could not borrow the receiver reference");
                }
                }
                execute{
                    let newNFT<-self.minterRef.mintNFT(templateID:24);
                    self.receiverRef.deposit(token:<-newNFT);
                    log("Could not borrow the receiver reference");
                }
            }`,
      sdk.proposer(authz), // used as a nonce
      sdk.payer(authz), // means your account 0xe704fadec500fa15 will be paying for the transaction
      sdk.authorizations([
        authz // means the first AuthAccount passed into the prepare will be for 0xe704fadec500fa15
      ]),
      sdk.limit(9999)
    ])
    .then(sdk.decode);

  console.log(`tx[${txId}]: https://flow-view-source.com/testnet/tx/${txId}`); // see the status of the transaction
  return txId;
};
module.exports = NFTMint();
