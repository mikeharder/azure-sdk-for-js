/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { FeaturesetVersion } from "@azure/arm-machinelearning";
import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Create or update version.
 *
 * @summary Create or update version.
 * x-ms-original-file: specification/machinelearningservices/resource-manager/Microsoft.MachineLearningServices/stable/2024-04-01/examples/Workspace/FeaturesetVersion/createOrUpdate.json
 */
async function createOrUpdateWorkspaceFeaturesetVersion(): Promise<void> {
  const subscriptionId =
    process.env["MACHINELEARNING_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["MACHINELEARNING_RESOURCE_GROUP"] || "test-rg";
  const workspaceName = "my-aml-workspace";
  const name = "string";
  const version = "string";
  const body: FeaturesetVersion = {
    properties: {
      description: "string",
      entities: ["string"],
      isAnonymous: false,
      isArchived: false,
      materializationSettings: {
        notification: { emailOn: ["JobFailed"], emails: ["string"] },
        resource: { instanceType: "string" },
        schedule: {
          endTime: "string",
          frequency: "Day",
          interval: 1,
          schedule: {
            hours: [1],
            minutes: [1],
            monthDays: [1],
            weekDays: ["Monday"],
          },
          startTime: "string",
          timeZone: "string",
          triggerType: "Recurrence",
        },
        sparkConfiguration: { string: "string" },
        storeType: "Online",
      },
      properties: { string: "string" },
      specification: { path: "string" },
      stage: "string",
      tags: { string: "string" },
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.featuresetVersions.beginCreateOrUpdateAndWait(
    resourceGroupName,
    workspaceName,
    name,
    version,
    body,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateWorkspaceFeaturesetVersion();
}

main().catch(console.error);
