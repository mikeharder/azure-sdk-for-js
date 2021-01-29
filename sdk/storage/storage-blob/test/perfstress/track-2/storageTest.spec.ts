// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { generateUuid } from "@azure/core-http";
import { PerfStressTest, getEnvVar } from "@azure/test-utils-perfstress";
import {
  BlobServiceClient,
  ContainerClient,
  StorageSharedKeyCredential
} from "@azure/storage-blob";

// Expects the .env file at the same level as the "test" folder
import * as dotenv from "dotenv";
dotenv.config({ path: "../../../.env" });

export abstract class StorageBlobTest<TOptions> extends PerfStressTest<TOptions> {
  blobServiceClient: BlobServiceClient;
  containerClient: ContainerClient;
  sharedKeyCredential: StorageSharedKeyCredential;
  static containerName = generateUuid();

  constructor() {
    super();
    const connectionString = getEnvVar("STORAGE_CONNECTION_STRING");
    this.sharedKeyCredential = new StorageSharedKeyCredential(
      getValueInConnString(connectionString, "AccountName"),
      getValueInConnString(connectionString, "AccountKey")
    );
    this.blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    this.containerClient = this.blobServiceClient.getContainerClient(StorageBlobTest.containerName);
  }

  public async globalSetup() {
    await this.containerClient.create();
  }

  public async globalCleanup() {
    await this.containerClient.delete();
  }
}

export function getValueInConnString(
  connectionString: string,
  argument:
    | "BlobEndpoint"
    | "AccountName"
    | "AccountKey"
    | "DefaultEndpointsProtocol"
    | "EndpointSuffix"
    | "SharedAccessSignature"
) {
  const elements = connectionString.split(";");
  for (const element of elements) {
    if (element.trim().startsWith(argument)) {
      return element.trim().match(argument + "=(.*)")![1];
    }
  }
  return "";
}
