/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { OperationStatusBackupVaultContext } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { DataProtectionClient } from "../dataProtectionClient.js";
import {
  OperationStatusBackupVaultContextGetOptionalParams,
  OperationStatusBackupVaultContextGetResponse,
} from "../models/index.js";

/** Class containing OperationStatusBackupVaultContext operations. */
export class OperationStatusBackupVaultContextImpl
  implements OperationStatusBackupVaultContext
{
  private readonly client: DataProtectionClient;

  /**
   * Initialize a new instance of the class OperationStatusBackupVaultContext class.
   * @param client Reference to the service client
   */
  constructor(client: DataProtectionClient) {
    this.client = client;
  }

  /**
   * Gets the operation status for an operation over a BackupVault's context.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param vaultName The name of the backup vault.
   * @param operationId
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    vaultName: string,
    operationId: string,
    options?: OperationStatusBackupVaultContextGetOptionalParams,
  ): Promise<OperationStatusBackupVaultContextGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, vaultName, operationId, options },
      getOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const getOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataProtection/backupVaults/{vaultName}/operationStatus/{operationId}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.OperationResource,
    },
    default: {
      bodyMapper: Mappers.CloudError,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.vaultName,
    Parameters.operationId,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
