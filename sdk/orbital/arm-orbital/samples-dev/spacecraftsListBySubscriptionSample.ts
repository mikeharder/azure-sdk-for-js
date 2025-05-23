/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import { AzureOrbital } from "@azure/arm-orbital";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Returns list of spacecrafts by subscription.
 *
 * @summary Returns list of spacecrafts by subscription.
 * x-ms-original-file: specification/orbital/resource-manager/Microsoft.Orbital/stable/2022-11-01/examples/SpacecraftsBySubscriptionList.json
 */
async function listOfSpacecraftBySubscription(): Promise<void> {
  const subscriptionId =
    process.env["ORBITAL_SUBSCRIPTION_ID"] || "c1be1141-a7c9-4aac-9608-3c2e2f1152c3";
  const credential = new DefaultAzureCredential();
  const client = new AzureOrbital(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.spacecrafts.listBySubscription()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listOfSpacecraftBySubscription();
}

main().catch(console.error);
