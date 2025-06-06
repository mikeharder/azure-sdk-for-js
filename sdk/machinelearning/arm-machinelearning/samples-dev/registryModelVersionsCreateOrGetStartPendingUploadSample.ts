/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { PendingUploadRequestDto } from "@azure/arm-machinelearning";
import { AzureMachineLearningServicesManagementClient } from "@azure/arm-machinelearning";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Generate a storage location and credential for the client to upload a model asset to.
 *
 * @summary Generate a storage location and credential for the client to upload a model asset to.
 * x-ms-original-file: specification/machinelearningservices/resource-manager/Microsoft.MachineLearningServices/stable/2024-04-01/examples/Registry/ModelVersion/createOrGetStartPendingUpload.json
 */
async function createOrGetStartPendingUploadRegistryModelVersion(): Promise<void> {
  const subscriptionId =
    process.env["MACHINELEARNING_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["MACHINELEARNING_RESOURCE_GROUP"] || "test-rg";
  const registryName = "registryName";
  const modelName = "string";
  const version = "string";
  const body: PendingUploadRequestDto = {
    pendingUploadId: "string",
    pendingUploadType: "TemporaryBlobReference",
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureMachineLearningServicesManagementClient(credential, subscriptionId);
  const result = await client.registryModelVersions.createOrGetStartPendingUpload(
    resourceGroupName,
    registryName,
    modelName,
    version,
    body,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrGetStartPendingUploadRegistryModelVersion();
}

main().catch(console.error);
