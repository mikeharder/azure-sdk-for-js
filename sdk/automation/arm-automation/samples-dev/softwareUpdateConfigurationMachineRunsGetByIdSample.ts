/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { AutomationClient } from "@azure/arm-automation";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get a single software update configuration machine run by Id.
 *
 * @summary Get a single software update configuration machine run by Id.
 * x-ms-original-file: specification/automation/resource-manager/Microsoft.Automation/stable/2019-06-01/examples/softwareUpdateConfigurationMachineRun/getSoftwareUpdateConfigurationMachineRunById.json
 */
async function getSoftwareUpdateConfigurationMachineRun(): Promise<void> {
  const subscriptionId =
    process.env["AUTOMATION_SUBSCRIPTION_ID"] || "51766542-3ed7-4a72-a187-0c8ab644ddab";
  const resourceGroupName = process.env["AUTOMATION_RESOURCE_GROUP"] || "mygroup";
  const automationAccountName = "myaccount";
  const softwareUpdateConfigurationMachineRunId = "ca440719-34a4-4234-a1a9-3f84faf7788f";
  const credential = new DefaultAzureCredential();
  const client = new AutomationClient(credential, subscriptionId);
  const result = await client.softwareUpdateConfigurationMachineRuns.getById(
    resourceGroupName,
    automationAccountName,
    softwareUpdateConfigurationMachineRunId,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getSoftwareUpdateConfigurationMachineRun();
}

main().catch(console.error);
