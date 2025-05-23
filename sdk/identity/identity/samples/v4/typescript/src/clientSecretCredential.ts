// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Authenticates with an app registration’s client ID and secret.
 */

import { ClientSecretCredential } from "@azure/identity";
import { KeyClient } from "@azure/keyvault-keys";

// Load the .env file if it exists
import "dotenv/config";

export async function main(): Promise<void> {
  const credential = new ClientSecretCredential(
    process.env.AZURE_TENANT_ID!, // The tenant ID in Microsoft Entra ID
    process.env.AZURE_CLIENT_ID!, // The app registration client Id in the Microsoft Entra tenant
    process.env.AZURE_CLIENT_SECRET!, // The app registration secret for the registered application
  );

  const keyVaultUrl = `https://key-vault-name.vault.azure.net`;
  const client = new KeyClient(keyVaultUrl, credential);

  // Retrieving the properties of the existing keys in that specific Key Vault.
  console.log(await client.listPropertiesOfKeys().next());
}

main().catch((err) => {
  console.log("error code: ", err.code);
  console.log("error message: ", err.message);
  console.log("error stack: ", err.stack);
});
