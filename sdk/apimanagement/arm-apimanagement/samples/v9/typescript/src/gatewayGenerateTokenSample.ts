/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */
import {
  GatewayTokenRequestContract,
  ApiManagementClient
} from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the Shared Access Authorization Token for the gateway.
 *
 * @summary Gets the Shared Access Authorization Token for the gateway.
 * x-ms-original-file: specification/apimanagement/resource-manager/Microsoft.ApiManagement/stable/2022-08-01/examples/ApiManagementGatewayGenerateToken.json
 */
async function apiManagementGatewayGenerateToken() {
  const subscriptionId =
    process.env["APIMANAGEMENT_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName =
    process.env["APIMANAGEMENT_RESOURCE_GROUP"] || "rg1";
  const serviceName = "apimService1";
  const gatewayId = "gw1";
  const parameters: GatewayTokenRequestContract = {
    expiry: new Date("2020-04-21T00:44:24.2845269Z"),
    keyType: "primary"
  };
  const credential = new DefaultAzureCredential();
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.gateway.generateToken(
    resourceGroupName,
    serviceName,
    gatewayId,
    parameters
  );
  console.log(result);
}

async function main() {
  apiManagementGatewayGenerateToken();
}

main().catch(console.error);
