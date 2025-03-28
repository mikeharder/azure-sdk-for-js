/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { ServiceMap } from "@azure/arm-servicemap";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Returns the specified machine group as it existed during the specified time interval.
 *
 * @summary Returns the specified machine group as it existed during the specified time interval.
 * x-ms-original-file: specification/service-map/resource-manager/Microsoft.OperationalInsights/preview/2015-11-01-preview/examples/MachineGroups/SMMachineGroupsGetGet.json
 */
async function smMachineGroupsGet(): Promise<void> {
  const subscriptionId =
    process.env["SERVICE-MAP_SUBSCRIPTION_ID"] || "63BE4E24-FDF0-4E9C-9342-6A5D5A359722";
  const resourceGroupName = process.env["SERVICE-MAP_RESOURCE_GROUP"] || "rg-sm";
  const workspaceName = "D6F79F14-E563-469B-84B5-9286D2803B2F";
  const machineGroupName = "07597c56-5395-4815-839c-c4e7bddbac18";
  const credential = new DefaultAzureCredential();
  const client = new ServiceMap(credential, subscriptionId);
  const result = await client.machineGroups.get(resourceGroupName, workspaceName, machineGroupName);
  console.log(result);
}

async function main(): Promise<void> {
  await smMachineGroupsGet();
}

main().catch(console.error);
