/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import type { AttestationServicePatchParams } from "@azure/arm-attestation";
import { AttestationManagementClient } from "@azure/arm-attestation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to Updates the Attestation Provider.
 *
 * @summary Updates the Attestation Provider.
 * x-ms-original-file: specification/attestation/resource-manager/Microsoft.Attestation/stable/2020-10-01/examples/Update_AttestationProvider.json
 */
async function attestationProvidersUpdate(): Promise<void> {
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = "MyResourceGroup";
  const providerName = "myattestationprovider";
  const updateParams: AttestationServicePatchParams = {
    tags: { property1: "Value1", property2: "Value2", property3: "Value3" },
  };
  const credential = new DefaultAzureCredential();
  const client = new AttestationManagementClient(credential, subscriptionId);
  const result = await client.attestationProviders.update(
    resourceGroupName,
    providerName,
    updateParams,
  );
  console.log(result);
}

attestationProvidersUpdate().catch(console.error);
