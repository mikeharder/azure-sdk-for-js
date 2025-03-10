/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { VirtualNetworksDeleteOptionalParams } from "@azure/arm-scvmm";
import { ScVmm } from "@azure/arm-scvmm";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Deregisters the ScVmm virtual network from Azure.
 *
 * @summary Deregisters the ScVmm virtual network from Azure.
 * x-ms-original-file: specification/scvmm/resource-manager/Microsoft.ScVmm/stable/2023-10-07/examples/VirtualNetworks_Delete_MaximumSet_Gen.json
 */
async function virtualNetworksDeleteMaximumSet(): Promise<void> {
  const subscriptionId =
    process.env["SCVMM_SUBSCRIPTION_ID"] || "79332E5A-630B-480F-A266-A941C015AB19";
  const resourceGroupName = process.env["SCVMM_RESOURCE_GROUP"] || "rgscvmm";
  const force = "true";
  const virtualNetworkName = ".";
  const options: VirtualNetworksDeleteOptionalParams = { force };
  const credential = new DefaultAzureCredential();
  const client = new ScVmm(credential, subscriptionId);
  const result = await client.virtualNetworks.beginDeleteAndWait(
    resourceGroupName,
    virtualNetworkName,
    options,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Deregisters the ScVmm virtual network from Azure.
 *
 * @summary Deregisters the ScVmm virtual network from Azure.
 * x-ms-original-file: specification/scvmm/resource-manager/Microsoft.ScVmm/stable/2023-10-07/examples/VirtualNetworks_Delete_MinimumSet_Gen.json
 */
async function virtualNetworksDeleteMinimumSet(): Promise<void> {
  const subscriptionId =
    process.env["SCVMM_SUBSCRIPTION_ID"] || "79332E5A-630B-480F-A266-A941C015AB19";
  const resourceGroupName = process.env["SCVMM_RESOURCE_GROUP"] || "rgscvmm";
  const virtualNetworkName = "1";
  const credential = new DefaultAzureCredential();
  const client = new ScVmm(credential, subscriptionId);
  const result = await client.virtualNetworks.beginDeleteAndWait(
    resourceGroupName,
    virtualNetworkName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await virtualNetworksDeleteMaximumSet();
  await virtualNetworksDeleteMinimumSet();
}

main().catch(console.error);
