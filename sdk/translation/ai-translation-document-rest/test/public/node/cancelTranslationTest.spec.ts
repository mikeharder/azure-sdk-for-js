// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import type { DocumentTranslationClient } from "../../../src/index.js";
import { isUnexpected } from "../../../src/index.js";
import { createDocumentTranslationClient, startRecorder } from "../utils/recordedClient.js";
import {
  ONE_TEST_DOCUMENTS,
  createSourceContainer,
  createTargetContainer,
} from "./containerHelper.js";
import {
  createBatchRequest,
  createSourceInput,
  createTargetInput,
  getTranslationOperationID,
} from "../utils/testHelper.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("CancelTranslation tests", () => {
  let recorder: Recorder;
  let client: DocumentTranslationClient;

  beforeEach(async (ctx) => {
    recorder = await startRecorder(ctx);
    client = await createDocumentTranslationClient({ recorder });
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("cancel translation", async () => {
    const sourceUrl = await createSourceContainer(recorder, ONE_TEST_DOCUMENTS);
    const sourceInput = createSourceInput(sourceUrl);
    const targetUrl = await createTargetContainer(recorder);
    const targetInput = createTargetInput(targetUrl, "fr");
    const batchRequest = createBatchRequest(sourceInput, [targetInput]);

    // Start translation
    const batchRequests = { inputs: [batchRequest] };
    const poller = await client.path("/document/batches").post({
      body: batchRequests,
    });
    const id = getTranslationOperationID(poller.headers["operation-location"]);

    // Cancel translation
    await client.path("/document/batches/{id}", id).delete();

    // get translation status and verify
    const response = await client.path("/document/batches/{id}", id).get();
    if (isUnexpected(response)) {
      throw response.body;
    }

    const idOutput = response.body.id;
    assert.isTrue(idOutput === id, "IDOutput is:" + idOutput);
    const statusOutput = response.body.status;
    assert.isTrue(
      statusOutput === "Cancelled" ||
        statusOutput === "Cancelling" ||
        statusOutput === "NotStarted",
      "Status output is: " + statusOutput,
    );
  });
});
