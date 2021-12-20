const { DefaultAzureCredential } = require("@azure/identity");
const { SecretClient } = require("@azure/keyvault-secrets");
const KEY_VAULT_NAME = "nowwherevault";
async function main() {
  const keyVaultName = KEY_VAULT_NAME;
  const KVUri = "https://" + keyVaultName + ".vault.azure.net";

  const credential = new DefaultAzureCredential();
  const client = new SecretClient(KVUri, credential);
  const retrievedSecret = await client.getSecret("nowsecret");
  return JSON.parse(retrievedSecret.value);
}
module.exports = main();
