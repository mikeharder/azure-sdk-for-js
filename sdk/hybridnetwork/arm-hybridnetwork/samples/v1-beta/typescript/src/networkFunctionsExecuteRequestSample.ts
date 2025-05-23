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
  ExecuteRequestParameters,
  HybridNetworkManagementClient
} from "@azure/arm-hybridnetwork";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Execute a request to services on a containerized network function.
 *
 * @summary Execute a request to services on a containerized network function.
 * x-ms-original-file: specification/hybridnetwork/resource-manager/Microsoft.HybridNetwork/stable/2023-09-01/examples/NetworkFunctionsExecuteRequest.json
 */
async function sendRequestToNetworkFunctionServices(): Promise<void> {
  const subscriptionId =
    process.env["HYBRIDNETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["HYBRIDNETWORK_RESOURCE_GROUP"] || "rg";
  const networkFunctionName = "testNetworkfunction";
  const parameters: ExecuteRequestParameters = {
    requestMetadata: {
      apiVersion: "apiVersionQueryString",
      httpMethod: "Post",
      relativePath: "/simProfiles/testSimProfile",
      serializedBody:
        '{"subscriptionProfile":"ChantestSubscription15","permanentKey":"00112233445566778899AABBCCDDEEFF","opcOperatorCode":"63bfa50ee6523365ff14c1f45f88737d","staticIpAddresses":{"internet":{"ipv4Addr":"198.51.100.1","ipv6Prefix":"2001:db8:abcd:12::0/64"},"another_network":{"ipv6Prefix":"2001:111:cdef:22::0/64"}}}'
    },
    serviceEndpoint: "serviceEndpoint"
  };
  const credential = new DefaultAzureCredential();
  const client = new HybridNetworkManagementClient(credential, subscriptionId);
  const result = await client.networkFunctions.beginExecuteRequestAndWait(
    resourceGroupName,
    networkFunctionName,
    parameters
  );
  console.log(result);
}

async function main(): Promise<void> {
  sendRequestToNetworkFunctionServices();
}

main().catch(console.error);
