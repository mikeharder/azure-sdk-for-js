// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";

import { KeyVaultBackupClient } from "../../src";
import { authenticate } from "./utils/authentication";
import { testPollerProperties } from "./utils/recorder";
import { assertThrowsAbortError, getSasToken, getServiceVersion } from "./utils/common";

// TODO: https://github.com/Azure/azure-sdk-for-js/issues/30273
describe.skip("Aborting KeyVaultBackupClient's requests", () => {
  let client: KeyVaultBackupClient;
  let recorder: Recorder;
  let blobStorageUri: string;
  let blobSasToken: string;

  let generateFakeUUID: () => string;

  beforeEach(async function () {
    const authentication = await authenticate(this, getServiceVersion());
    client = authentication.backupClient;
    recorder = authentication.recorder;
    generateFakeUUID = authentication.generateFakeUUID;

    const sasTokenData = getSasToken();
    blobStorageUri = sasTokenData.blobStorageUri;
    blobSasToken = sasTokenData.blobSasToken;
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("can abort beginBackup", async function () {
    const controller = new AbortController();
    controller.abort();

    await assertThrowsAbortError(async () => {
      await client.beginBackup(blobStorageUri, blobSasToken, {
        ...testPollerProperties,
        abortSignal: controller.signal,
      });
    });
  });

  it("can abort beginRestore", async function () {
    const backupURI = `${blobStorageUri}/${generateFakeUUID()}`;
    const controller = new AbortController();
    controller.abort();

    await assertThrowsAbortError(async () => {
      await client.beginRestore(backupURI, blobSasToken, {
        ...testPollerProperties,
        abortSignal: controller.signal,
      });
    });
  });

  it("can abort beginSelectiveKeyRestore", async function () {
    const backupURI = `${blobStorageUri}/${generateFakeUUID()}`;

    const controller = new AbortController();
    controller.abort();

    await assertThrowsAbortError(async () => {
      await client.beginSelectiveKeyRestore("key-name", backupURI, blobSasToken, {
        ...testPollerProperties,
        abortSignal: controller.signal,
      });
    });
  });
});
