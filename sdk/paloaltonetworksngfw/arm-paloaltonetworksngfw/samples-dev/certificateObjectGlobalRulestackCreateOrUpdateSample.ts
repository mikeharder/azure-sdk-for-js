/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { CertificateObjectGlobalRulestackResource } from "@azure/arm-paloaltonetworksngfw";
import { PaloAltoNetworksCloudngfw } from "@azure/arm-paloaltonetworksngfw";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Create a CertificateObjectGlobalRulestackResource
 *
 * @summary Create a CertificateObjectGlobalRulestackResource
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2023-09-01/examples/CertificateObjectGlobalRulestack_CreateOrUpdate_MaximumSet_Gen.json
 */
async function certificateObjectGlobalRulestackCreateOrUpdateMaximumSetGen(): Promise<void> {
  const globalRulestackName = "praval";
  const name = "armid1";
  const resource: CertificateObjectGlobalRulestackResource = {
    description: "description",
    auditComment: "comment",
    certificateSelfSigned: "TRUE",
    certificateSignerResourceId: "",
    etag: "2bf4a339-294d-4c25-b0b2-ef649e9f5c27",
    provisioningState: "Accepted",
  };
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.certificateObjectGlobalRulestack.beginCreateOrUpdateAndWait(
    globalRulestackName,
    name,
    resource,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Create a CertificateObjectGlobalRulestackResource
 *
 * @summary Create a CertificateObjectGlobalRulestackResource
 * x-ms-original-file: specification/paloaltonetworks/resource-manager/PaloAltoNetworks.Cloudngfw/stable/2023-09-01/examples/CertificateObjectGlobalRulestack_CreateOrUpdate_MinimumSet_Gen.json
 */
async function certificateObjectGlobalRulestackCreateOrUpdateMinimumSetGen(): Promise<void> {
  const globalRulestackName = "praval";
  const name = "armid1";
  const resource: CertificateObjectGlobalRulestackResource = {
    certificateSelfSigned: "TRUE",
  };
  const credential = new DefaultAzureCredential();
  const client = new PaloAltoNetworksCloudngfw(credential);
  const result = await client.certificateObjectGlobalRulestack.beginCreateOrUpdateAndWait(
    globalRulestackName,
    name,
    resource,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await certificateObjectGlobalRulestackCreateOrUpdateMaximumSetGen();
  await certificateObjectGlobalRulestackCreateOrUpdateMinimumSetGen();
}

main().catch(console.error);
