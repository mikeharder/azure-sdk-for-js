/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { MicrosoftDatadogClient } from "@azure/arm-datadog";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Updates the subscriptions that are being monitored by the Datadog monitor resource
 *
 * @summary Updates the subscriptions that are being monitored by the Datadog monitor resource
 * x-ms-original-file: specification/datadog/resource-manager/Microsoft.Datadog/stable/2023-01-01/examples/MonitoredSubscriptions_Delete.json
 */
async function monitorsDeleteMonitoredSubscriptions(): Promise<void> {
  const subscriptionId =
    process.env["DATADOG_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["DATADOG_RESOURCE_GROUP"] || "myResourceGroup";
  const monitorName = "myMonitor";
  const configurationName = "default";
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftDatadogClient(credential, subscriptionId);
  const result = await client.monitoredSubscriptions.beginDeleteAndWait(
    resourceGroupName,
    monitorName,
    configurationName
  );
  console.log(result);
}

async function main(): Promise<void> {
  monitorsDeleteMonitoredSubscriptions();
}

main().catch(console.error);
