// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  VirtualNetworksUpdateTagsParameters,
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Updates a virtual network tags.
 *
 * @summary Updates a virtual network tags.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/VirtualNetworkUpdateTags.json
 */
async function updateVirtualNetworkTags(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const virtualNetworkName = "test-vnet";
  const options: VirtualNetworksUpdateTagsParameters = {
    body: { tags: { tag1: "value1", tag2: "value2" } },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualNetworks/{virtualNetworkName}",
      subscriptionId,
      resourceGroupName,
      virtualNetworkName,
    )
    .patch(options);
  console.log(result);
}

updateVirtualNetworkTags().catch(console.error);
