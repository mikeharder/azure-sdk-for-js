// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { env, isPlaybackMode } from "@azure-tools/test-recorder";
import { createTestCredential } from "@azure-tools/test-credential";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import { createRecorder } from "./utils/recordedClient.js";
import { PostgresClient } from "../../src/postgresClient.js";

export const testPollingOptions = {
  updateIntervalInMs: isPlaybackMode() ? 0 : undefined,
};

describe("Postgres test", () => {
  let recorder: Recorder;
  let subscriptionId: string;
  let client: PostgresClient;

  beforeEach(async (context) => {
    process.env.SystemRoot = process.env.SystemRoot || "C:\\Windows";
    recorder = await createRecorder(context);
    subscriptionId = env.SUBSCRIPTION_ID || "";
    // This is an example of how the environment variables are used
    const credential = createTestCredential();
    client = new PostgresClient(credential, subscriptionId, recorder.configureClientOptions({}));
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it.skip("operations list test", async () => {
    const resArray = new Array();
    for await (const item of client.operations.list()) {
      resArray.push(item);
    }
    assert.notEqual(resArray.length, 0);
  });

  it("organizations list test", async () => {
    const res = client.organizations.listByResourceGroup("myjstest");
    assert.ok(res);
  });
});
