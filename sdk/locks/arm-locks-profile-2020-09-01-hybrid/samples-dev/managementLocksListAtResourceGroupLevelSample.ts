/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { ManagementLockClient } from "@azure/arm-locks-profile-2020-09-01-hybrid";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Gets all the management locks for a resource group.
 *
 * @summary Gets all the management locks for a resource group.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2016-09-01/examples/ManagementLocks_ListAtResourceGroupLevel.json
 */
async function listManagementGroupsAtResourceGroupLevel() {
  const subscriptionId =
    process.env["LOCKS_SUBSCRIPTION_ID"] || "subscriptionId";
  const resourceGroupName =
    process.env["LOCKS_RESOURCE_GROUP"] || "resourcegroupname";
  const credential = new DefaultAzureCredential();
  const client = new ManagementLockClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.managementLocks.listAtResourceGroupLevel(
    resourceGroupName
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  listManagementGroupsAtResourceGroupLevel();
}

main().catch(console.error);