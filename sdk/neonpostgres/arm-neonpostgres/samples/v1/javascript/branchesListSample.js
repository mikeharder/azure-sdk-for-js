// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgresClient } = require("@azure/arm-neonpostgres");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list Branch resources by Project
 *
 * @summary list Branch resources by Project
 * x-ms-original-file: 2025-03-01/Branches_List_MaximumSet_Gen.json
 */
async function branchesListMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9B8E3300-C5FA-442B-A259-3F6F614D5BD4";
  const client = new PostgresClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.branches.list("rgneon", "test-org", "entity-name")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await branchesListMaximumSet();
}

main().catch(console.error);
