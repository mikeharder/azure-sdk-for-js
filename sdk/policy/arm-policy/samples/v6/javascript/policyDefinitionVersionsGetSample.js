/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

const { PolicyClient } = require("@azure/arm-policy");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to This operation retrieves the policy definition version in the given subscription with the given name.
 *
 * @summary This operation retrieves the policy definition version in the given subscription with the given name.
 * x-ms-original-file: specification/resources/resource-manager/Microsoft.Authorization/stable/2024-05-01/examples/getPolicyDefinitionVersion.json
 */
async function retrieveAPolicyDefinitionVersion() {
  const subscriptionId =
    process.env["POLICY_SUBSCRIPTION_ID"] || "ae640e6b-ba3e-4256-9d62-2993eecfa6f2";
  const policyDefinitionName = "ResourceNaming";
  const policyDefinitionVersion = "1.2.1";
  const credential = new DefaultAzureCredential();
  const client = new PolicyClient(credential, subscriptionId);
  const result = await client.policyDefinitionVersions.get(
    policyDefinitionName,
    policyDefinitionVersion,
  );
  console.log(result);
}

async function main() {
  await retrieveAPolicyDefinitionVersion();
}

main().catch(console.error);
