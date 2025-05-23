/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { ProcessesListAcceptingPortsOptionalParams } from "@azure/arm-servicemap";
import { ServiceMap } from "@azure/arm-servicemap";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Returns a collection of ports on which this process is accepting
 *
 * @summary Returns a collection of ports on which this process is accepting
 * x-ms-original-file: specification/service-map/resource-manager/Microsoft.OperationalInsights/preview/2015-11-01-preview/examples/Machines/Processes/SMMachinesProcessesListAcceptingPortsGet.json
 */
async function smMachinesProcessesListAcceptingPortsGet(): Promise<void> {
  const subscriptionId =
    process.env["SERVICE-MAP_SUBSCRIPTION_ID"] || "63BE4E24-FDF0-4E9C-9342-6A5D5A359722";
  const resourceGroupName = process.env["SERVICE-MAP_RESOURCE_GROUP"] || "rg-sm";
  const workspaceName = "D6F79F14-E563-469B-84B5-9286D2803B2F";
  const machineName = "m-999066c5-38c5-4f2f-9ce0-51d738cdc432";
  const processName = "p-37d1761114556be465c44e2300bda03178a6189e";
  const startTime = new Date("2018-01-07T08:01:48.525Z");
  const endTime = new Date("2018-01-07T08:01:48.525Z");
  const options: ProcessesListAcceptingPortsOptionalParams = {
    startTime,
    endTime,
  };
  const credential = new DefaultAzureCredential();
  const client = new ServiceMap(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.processes.listAcceptingPorts(
    resourceGroupName,
    workspaceName,
    machineName,
    processName,
    options,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await smMachinesProcessesListAcceptingPortsGet();
}

main().catch(console.error);
