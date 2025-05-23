/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import type { RecorderStartOptions } from "@azure-tools/test-recorder";
import { env, Recorder, isPlaybackMode } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { CosmosDBManagementClient } from "../src/cosmosDBManagementClient.js";
import { afterEach, assert, beforeEach, describe, it } from "vitest";

const replaceableVariables: Record<string, string> = {
  SUBSCRIPTION_ID: "88888888-8888-8888-8888-888888888888",
};

const recorderOptions: RecorderStartOptions = {
  envSetupForPlayback: replaceableVariables,
  removeCentralSanitizers: [
    "AZSDK3493", // .name in the body is not a secret and is listed below in the beforeEach section
    "AZSDK3430", // .id in the body is not a secret and is listed below in the beforeEach section
  ],
};

export const testPollingOptions = {
  updateIntervalInMs: isPlaybackMode() ? 0 : undefined,
};

describe("Cosmosdb test", () => {
  let recorder: Recorder;
  let client: CosmosDBManagementClient;
  let subscriptionId: string;
  let location: string;
  let resourceGroupName: string;
  let accountName: string;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    await recorder.start(recorderOptions);
    subscriptionId = env.SUBSCRIPTION_ID || "";
    // This is an example of how the environment variables are used
    const credential = createTestCredential();
    client = new CosmosDBManagementClient(
      credential,
      subscriptionId,
      recorder.configureClientOptions({}),
    );
    location = "uksouth";
    resourceGroupName = "myjstest";
    accountName = "myaccountxxyz2";
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("databaseAccounts create test", async () => {
    const res = await client.databaseAccounts.beginCreateOrUpdateAndWait(
      resourceGroupName,
      accountName,
      {
        databaseAccountOfferType: "Standard",
        locations: [
          // {
          //   failoverPriority: 2,
          //   locationName: "southcentralus",
          //   isZoneRedundant: false
          // },
          {
            locationName: "uksouth",
            failoverPriority: 1,
          },
          {
            locationName: "westus",
            failoverPriority: 0,
          },
        ],
        location: location,
        createMode: "Default",
      },
      testPollingOptions,
    );
    assert.equal(res.name, accountName);
  });

  it("databaseAccounts get test", async () => {
    const res = await client.databaseAccounts.get(resourceGroupName, accountName);
    assert.equal(res.name, accountName);
  });

  it("databaseAccounts list test", async () => {
    const resArray = new Array();
    for await (const item of client.databaseAccounts.listByResourceGroup(resourceGroupName)) {
      resArray.push(item);
    }
    assert.equal(resArray.length, 1);
  });

  it("databaseAccounts delete test", { timeout: 3600000 }, async () => {
    await client.databaseAccounts.beginDeleteAndWait(
      resourceGroupName,
      accountName,
      testPollingOptions,
    );
    const resArray = new Array();
    for await (const item of client.databaseAccounts.listByResourceGroup(resourceGroupName)) {
      resArray.push(item);
    }
    assert.equal(resArray.length, 0);
  });
});
