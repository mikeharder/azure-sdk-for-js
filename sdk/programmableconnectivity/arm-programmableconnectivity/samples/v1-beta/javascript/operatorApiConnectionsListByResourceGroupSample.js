// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ProgrammableConnectivityClient } = require("@azure/arm-programmableconnectivity");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list OperatorApiConnection resources by resource group.
 *
 * @summary list OperatorApiConnection resources by resource group.
 * x-ms-original-file: 2024-01-15-preview/OperatorApiConnections_ListByResourceGroup_MaximumSet_Gen.json
 */
async function operatorApiConnectionsListByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "B976474B-99FA-4C25-A3BD-8B05C3C3D07A";
  const client = new ProgrammableConnectivityClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.operatorApiConnections.listByResourceGroup("rgopenapi")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await operatorApiConnectionsListByResourceGroup();
}

main().catch(console.error);
