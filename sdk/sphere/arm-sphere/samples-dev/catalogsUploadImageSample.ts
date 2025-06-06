/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { Image } from "@azure/arm-sphere";
import { AzureSphereManagementClient } from "@azure/arm-sphere";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates an image. Use this action when the image ID is unknown.
 *
 * @summary Creates an image. Use this action when the image ID is unknown.
 * x-ms-original-file: specification/sphere/resource-manager/Microsoft.AzureSphere/stable/2024-04-01/examples/PostUploadImageCatalog.json
 */
async function catalogsUploadImage(): Promise<void> {
  const subscriptionId =
    process.env["SPHERE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["SPHERE_RESOURCE_GROUP"] || "MyResourceGroup1";
  const catalogName = "MyCatalog1";
  const uploadImageRequest: Image = {
    properties: { image: "bXliYXNlNjRzdHJpbmc=" },
  };
  const credential = new DefaultAzureCredential();
  const client = new AzureSphereManagementClient(credential, subscriptionId);
  const result = await client.catalogs.beginUploadImageAndWait(
    resourceGroupName,
    catalogName,
    uploadImageRequest,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await catalogsUploadImage();
}

main().catch(console.error);
