// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";
import { delay } from "@azure/core-util";
import { Poller } from "@azure/core-lro";
import type {
  RestoreCertificateBackupPollOperationState,
  TestCertificateClientInterface,
} from "./operation.js";
import { makeRestoreCertificateBackupPollOperation } from "./operation.js";
import type { KeyVaultCertificate } from "../../../../../src/index.js";

export interface RestoreCertificateBackupPollerOptions {
  client: TestCertificateClientInterface;
  backup: Uint8Array;
  operationOptions?: OperationOptions;
  intervalInMs?: number;
  resumeFrom?: string;
}

/**
 * Class that creates a poller that waits until a certificate finishes being restored
 */
export class RestoreCertificateBackupPoller extends Poller<
  RestoreCertificateBackupPollOperationState,
  KeyVaultCertificate
> {
  /**
   * Defines how much time the poller is going to wait before making a new request to the service.
   */
  public intervalInMs: number;

  constructor(options: RestoreCertificateBackupPollerOptions) {
    const { client, backup, operationOptions, intervalInMs = 2000, resumeFrom } = options;

    let state: RestoreCertificateBackupPollOperationState | undefined;

    if (resumeFrom) {
      state = JSON.parse(resumeFrom).state;
    }

    const operation = makeRestoreCertificateBackupPollOperation({
      ...state,
      backup,
      operationOptions,
      client,
    });

    super(operation);

    this.intervalInMs = intervalInMs;
  }

  /**
   * The method used by the poller to wait before attempting to update its operation.
   */
  async delay(): Promise<void> {
    return delay(this.intervalInMs);
  }
}
