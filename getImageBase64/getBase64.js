var fs = require("fs");

const getBase64 = (file) => {
  let img = fs.readFileSync(file);
  let base64 = Buffer.from(img).toString("base64");
  return base64;
};
module.exports = getBase64;
