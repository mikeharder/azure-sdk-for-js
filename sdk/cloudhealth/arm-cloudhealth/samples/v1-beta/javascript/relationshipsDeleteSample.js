// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CloudHealthClient } = require("@azure/arm-cloudhealth");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Relationship
 *
 * @summary delete a Relationship
 * x-ms-original-file: 2025-05-01-preview/Relationships_Delete.json
 */
async function relationshipsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4980D7D5-4E07-47AD-AD34-E76C6BC9F061";
  const client = new CloudHealthClient(credential, subscriptionId);
  await client.relationships.delete("rgopenapi", "model1", "rel1");
}

async function main() {
  await relationshipsDelete();
}

main().catch(console.error);
