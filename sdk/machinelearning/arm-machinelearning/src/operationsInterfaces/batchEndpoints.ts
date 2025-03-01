/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { SimplePollerLike, OperationState } from "@azure/core-lro";
import {
  BatchEndpoint,
  BatchEndpointsListOptionalParams,
  BatchEndpointsDeleteOptionalParams,
  BatchEndpointsGetOptionalParams,
  BatchEndpointsGetResponse,
  PartialMinimalTrackedResourceWithIdentity,
  BatchEndpointsUpdateOptionalParams,
  BatchEndpointsUpdateResponse,
  BatchEndpointsCreateOrUpdateOptionalParams,
  BatchEndpointsCreateOrUpdateResponse,
  BatchEndpointsListKeysOptionalParams,
  BatchEndpointsListKeysResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a BatchEndpoints. */
export interface BatchEndpoints {
  /**
   * Lists Batch inference endpoint in the workspace.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName Name of Azure Machine Learning workspace.
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    workspaceName: string,
    options?: BatchEndpointsListOptionalParams,
  ): PagedAsyncIterableIterator<BatchEndpoint>;
  /**
   * Delete Batch Inference Endpoint (asynchronous).
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName Name of Azure Machine Learning workspace.
   * @param endpointName Inference Endpoint name.
   * @param options The options parameters.
   */
  beginDelete(
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    options?: BatchEndpointsDeleteOptionalParams,
  ): Promise<SimplePollerLike<OperationState<void>, void>>;
  /**
   * Delete Batch Inference Endpoint (asynchronous).
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName Name of Azure Machine Learning workspace.
   * @param endpointName Inference Endpoint name.
   * @param options The options parameters.
   */
  beginDeleteAndWait(
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    options?: BatchEndpointsDeleteOptionalParams,
  ): Promise<void>;
  /**
   * Gets a batch inference endpoint by name.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName Name of Azure Machine Learning workspace.
   * @param endpointName Name for the Batch Endpoint.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    options?: BatchEndpointsGetOptionalParams,
  ): Promise<BatchEndpointsGetResponse>;
  /**
   * Update a batch inference endpoint (asynchronous).
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName Name of Azure Machine Learning workspace.
   * @param endpointName Name for the Batch inference endpoint.
   * @param body Mutable batch inference endpoint definition object.
   * @param options The options parameters.
   */
  beginUpdate(
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    body: PartialMinimalTrackedResourceWithIdentity,
    options?: BatchEndpointsUpdateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<BatchEndpointsUpdateResponse>,
      BatchEndpointsUpdateResponse
    >
  >;
  /**
   * Update a batch inference endpoint (asynchronous).
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName Name of Azure Machine Learning workspace.
   * @param endpointName Name for the Batch inference endpoint.
   * @param body Mutable batch inference endpoint definition object.
   * @param options The options parameters.
   */
  beginUpdateAndWait(
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    body: PartialMinimalTrackedResourceWithIdentity,
    options?: BatchEndpointsUpdateOptionalParams,
  ): Promise<BatchEndpointsUpdateResponse>;
  /**
   * Creates a batch inference endpoint (asynchronous).
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName Name of Azure Machine Learning workspace.
   * @param endpointName Name for the Batch inference endpoint.
   * @param body Batch inference endpoint definition object.
   * @param options The options parameters.
   */
  beginCreateOrUpdate(
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    body: BatchEndpoint,
    options?: BatchEndpointsCreateOrUpdateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<BatchEndpointsCreateOrUpdateResponse>,
      BatchEndpointsCreateOrUpdateResponse
    >
  >;
  /**
   * Creates a batch inference endpoint (asynchronous).
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName Name of Azure Machine Learning workspace.
   * @param endpointName Name for the Batch inference endpoint.
   * @param body Batch inference endpoint definition object.
   * @param options The options parameters.
   */
  beginCreateOrUpdateAndWait(
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    body: BatchEndpoint,
    options?: BatchEndpointsCreateOrUpdateOptionalParams,
  ): Promise<BatchEndpointsCreateOrUpdateResponse>;
  /**
   * Lists batch Inference Endpoint keys.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param workspaceName Name of Azure Machine Learning workspace.
   * @param endpointName Inference Endpoint name.
   * @param options The options parameters.
   */
  listKeys(
    resourceGroupName: string,
    workspaceName: string,
    endpointName: string,
    options?: BatchEndpointsListKeysOptionalParams,
  ): Promise<BatchEndpointsListKeysResponse>;
}
