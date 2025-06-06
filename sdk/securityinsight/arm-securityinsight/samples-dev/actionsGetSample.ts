/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { SecurityInsights } from "@azure/arm-securityinsight";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the action of alert rule.
 *
 * @summary Gets the action of alert rule.
 * x-ms-original-file: specification/securityinsights/resource-manager/Microsoft.SecurityInsights/preview/2022-09-01-preview/examples/actions/GetActionOfAlertRuleById.json
 */
async function getAnActionOfAlertRule(): Promise<void> {
  const subscriptionId =
    process.env["SECURITYINSIGHT_SUBSCRIPTION_ID"] || "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const resourceGroupName = process.env["SECURITYINSIGHT_RESOURCE_GROUP"] || "myRg";
  const workspaceName = "myWorkspace";
  const ruleId = "73e01a99-5cd7-4139-a149-9f2736ff2ab5";
  const actionId = "912bec42-cb66-4c03-ac63-1761b6898c3e";
  const credential = new DefaultAzureCredential();
  const client = new SecurityInsights(credential, subscriptionId);
  const result = await client.actions.get(resourceGroupName, workspaceName, ruleId, actionId);
  console.log(result);
}

async function main(): Promise<void> {
  await getAnActionOfAlertRule();
}

main().catch(console.error);
