/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { AFDDomain } from "@azure/arm-cdn";
import { CdnManagementClient } from "@azure/arm-cdn";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates a new domain within the specified profile.
 *
 * @summary Creates a new domain within the specified profile.
 * x-ms-original-file: specification/cdn/resource-manager/Microsoft.Cdn/stable/2024-02-01/examples/AFDCustomDomains_Create.json
 */
async function afdCustomDomainsCreate(): Promise<void> {
  const subscriptionId = process.env["CDN_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["CDN_RESOURCE_GROUP"] || "RG";
  const profileName = "profile1";
  const customDomainName = "domain1";
  const customDomain: AFDDomain = {
    azureDnsZone: { id: "" },
    hostName: "www.someDomain.net",
    tlsSettings: {
      certificateType: "ManagedCertificate",
      minimumTlsVersion: "TLS12",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new CdnManagementClient(credential, subscriptionId);
  const result = await client.afdCustomDomains.beginCreateAndWait(
    resourceGroupName,
    profileName,
    customDomainName,
    customDomain,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await afdCustomDomainsCreate();
}

main().catch(console.error);
