/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import {
  SpringbootserversModel,
  SpringAppDiscoveryManagementClient,
} from "@azure/arm-springappdiscovery";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Create springbootservers resource.
 *
 * @summary Create springbootservers resource.
 * x-ms-original-file: specification/offazurespringboot/resource-manager/Microsoft.OffAzureSpringBoot/preview/2023-01-01-preview/examples/springbootservers_CreateOrUpdate_MaximumSet_Gen.json
 */
async function springbootserversCreateOrUpdateMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["SPRINGAPPDISCOVERY_SUBSCRIPTION_ID"] || "etmdxomjncqvygm";
  const resourceGroupName =
    process.env["SPRINGAPPDISCOVERY_RESOURCE_GROUP"] || "rgspringbootservers";
  const siteName = "hlkrzldhyobavtabgpubtjbhlslnjmsvkthwcfboriwyxndacjypzbj";
  const springbootserversName = "zkarbqnwnxeozvjrkpdqmgnwedwgtwcmmyqwaijkn";
  const springbootservers: SpringbootserversModel = {
    properties: {
      errors: [],
      fqdnAndIpAddressList: [],
      machineArmId: "fvfkiapbqsprnbzczdfmuryknrna",
      port: 10,
      server: "thhuxocfyqpeluqcgnypi",
      springBootApps: 17,
      totalApps: 5,
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new SpringAppDiscoveryManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.springbootservers.createOrUpdate(
    resourceGroupName,
    siteName,
    springbootserversName,
    springbootservers,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Create springbootservers resource.
 *
 * @summary Create springbootservers resource.
 * x-ms-original-file: specification/offazurespringboot/resource-manager/Microsoft.OffAzureSpringBoot/preview/2023-01-01-preview/examples/springbootservers_CreateOrUpdate_MinimumSet_Gen.json
 */
async function springbootserversCreateOrUpdateMinimumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["SPRINGAPPDISCOVERY_SUBSCRIPTION_ID"] || "etmdxomjncqvygm";
  const resourceGroupName =
    process.env["SPRINGAPPDISCOVERY_RESOURCE_GROUP"] || "rgspringbootservers";
  const siteName = "hlkrzldhyobavtabgpubtjbhlslnjmsvkthwcfboriwyxndacjypzbj";
  const springbootserversName = "zkarbqnwnxeozvjrkpdqmgnwedwgtwcmmyqwaijkn";
  const springbootservers: SpringbootserversModel = {};
  const credential = new DefaultAzureCredential();
  const client = new SpringAppDiscoveryManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.springbootservers.createOrUpdate(
    resourceGroupName,
    siteName,
    springbootserversName,
    springbootservers,
  );
  console.log(result);
}

async function main(): Promise<void> {
  springbootserversCreateOrUpdateMaximumSetGen();
  springbootserversCreateOrUpdateMinimumSetGen();
}

main().catch(console.error);
