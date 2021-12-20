const express = require("express");
const cors = require("cors");
const prodKey = require("./ReadArweaveDataFile/ReadSecretFile.js");
const getBalance = require("./getArweaveBalance/fetchArweaveBalance.js");
const arweave = require("./InitArweaveSettings/InitArweaveSettings.js");
const getBase64 = require("./getImageBase64/getBase64.js");
const NFTMint =require("./flowTransactions/mvt.tx.js")
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const formData = require("express-form-data");

app.use(formData.parse());
app.get("/api/getArweaveBalance", async function (req, res) {
  try {
    let data = await getBalance;
    res.send({ success: true, balance: data });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
});
app.post("/api/uploadFileToArweave", async function (req, res) {
  try {
    const file = req.files.file.path;
    const artistName = req.body.artistName;
    let OrignalProdKey = await prodKey;
    let testKey = await arweave.wallets.generate(); ////for testing
    const base64Img = getBase64(file);

    const tx = await arweave.createTransaction(
      {
        data: Buffer.from(base64Img, "base64"),
      },
      testKey
    );

    tx.addTag("App-Name", "Nowwhere");
    tx.addTag("App-Version", "v0.001");
    tx.addTag("Content-Type", "data:" + req.files.file.type);
    tx.addTag("Artist-Name", artistName);
    tx.addTag("Date", new Date());

    await arweave.transactions.sign(tx, testKey);
    const txid = tx.id;
    let uploader = await arweave.transactions.getUploader(tx);

    while (!uploader.isComplete) {
      await uploader.uploadChunk();
      console.log(
        `${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`
      );
    }
    res.send({ success: true, trnsactionId: txid });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
});
app.post("/api/NftMint", async function (req, res) {
  try {
    let data = await NFTMint;
    res.send({ success: true, nft: data });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
});
app.listen(port);
