/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { TenantAccessGit } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { ApiManagementClient } from "../apiManagementClient.js";
import {
  AccessIdName,
  TenantAccessGitRegeneratePrimaryKeyOptionalParams,
  TenantAccessGitRegenerateSecondaryKeyOptionalParams,
} from "../models/index.js";

/** Class containing TenantAccessGit operations. */
export class TenantAccessGitImpl implements TenantAccessGit {
  private readonly client: ApiManagementClient;

  /**
   * Initialize a new instance of the class TenantAccessGit class.
   * @param client Reference to the service client
   */
  constructor(client: ApiManagementClient) {
    this.client = client;
  }

  /**
   * Regenerate primary access key for GIT.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param accessName The identifier of the Access configuration.
   * @param options The options parameters.
   */
  regeneratePrimaryKey(
    resourceGroupName: string,
    serviceName: string,
    accessName: AccessIdName,
    options?: TenantAccessGitRegeneratePrimaryKeyOptionalParams,
  ): Promise<void> {
    return this.client.sendOperationRequest(
      { resourceGroupName, serviceName, accessName, options },
      regeneratePrimaryKeyOperationSpec,
    );
  }

  /**
   * Regenerate secondary access key for GIT.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param accessName The identifier of the Access configuration.
   * @param options The options parameters.
   */
  regenerateSecondaryKey(
    resourceGroupName: string,
    serviceName: string,
    accessName: AccessIdName,
    options?: TenantAccessGitRegenerateSecondaryKeyOptionalParams,
  ): Promise<void> {
    return this.client.sendOperationRequest(
      { resourceGroupName, serviceName, accessName, options },
      regenerateSecondaryKeyOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const regeneratePrimaryKeyOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/tenant/{accessName}/git/regeneratePrimaryKey",
  httpMethod: "POST",
  responses: {
    204: {},
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.serviceName,
    Parameters.accessName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const regenerateSecondaryKeyOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/tenant/{accessName}/git/regenerateSecondaryKey",
  httpMethod: "POST",
  responses: {
    204: {},
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.serviceName,
    Parameters.accessName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
