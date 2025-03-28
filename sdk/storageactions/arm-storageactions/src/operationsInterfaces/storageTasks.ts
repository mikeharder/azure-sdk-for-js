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
  StorageTask,
  StorageTasksListBySubscriptionOptionalParams,
  StorageTasksListByResourceGroupOptionalParams,
  StorageTasksCreateOptionalParams,
  StorageTasksCreateResponse,
  StorageTasksDeleteOptionalParams,
  StorageTasksDeleteResponse,
  StorageTasksGetOptionalParams,
  StorageTasksGetResponse,
  StorageTaskUpdateParameters,
  StorageTasksUpdateOptionalParams,
  StorageTasksUpdateResponse,
  StorageTaskPreviewAction,
  StorageTasksPreviewActionsOptionalParams,
  StorageTasksPreviewActionsResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a StorageTasks. */
export interface StorageTasks {
  /**
   * Lists all the storage tasks available under the subscription.
   * @param options The options parameters.
   */
  listBySubscription(
    options?: StorageTasksListBySubscriptionOptionalParams,
  ): PagedAsyncIterableIterator<StorageTask>;
  /**
   * Lists all the storage tasks available under the given resource group.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param options The options parameters.
   */
  listByResourceGroup(
    resourceGroupName: string,
    options?: StorageTasksListByResourceGroupOptionalParams,
  ): PagedAsyncIterableIterator<StorageTask>;
  /**
   * Asynchronously creates a new storage task resource with the specified parameters. If a storage task
   * is already created and a subsequent create request is issued with different properties, the storage
   * task properties will be updated. If a storage task is already created and a subsequent create or
   * update request is issued with the exact same set of properties, the request will succeed.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param storageTaskName The name of the storage task within the specified resource group. Storage
   *                        task names must be between 3 and 18 characters in length and use numbers and lower-case letters
   *                        only.
   * @param parameters The parameters to create a Storage Task.
   * @param options The options parameters.
   */
  beginCreate(
    resourceGroupName: string,
    storageTaskName: string,
    parameters: StorageTask,
    options?: StorageTasksCreateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<StorageTasksCreateResponse>,
      StorageTasksCreateResponse
    >
  >;
  /**
   * Asynchronously creates a new storage task resource with the specified parameters. If a storage task
   * is already created and a subsequent create request is issued with different properties, the storage
   * task properties will be updated. If a storage task is already created and a subsequent create or
   * update request is issued with the exact same set of properties, the request will succeed.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param storageTaskName The name of the storage task within the specified resource group. Storage
   *                        task names must be between 3 and 18 characters in length and use numbers and lower-case letters
   *                        only.
   * @param parameters The parameters to create a Storage Task.
   * @param options The options parameters.
   */
  beginCreateAndWait(
    resourceGroupName: string,
    storageTaskName: string,
    parameters: StorageTask,
    options?: StorageTasksCreateOptionalParams,
  ): Promise<StorageTasksCreateResponse>;
  /**
   * Delete the storage task resource.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param storageTaskName The name of the storage task within the specified resource group. Storage
   *                        task names must be between 3 and 18 characters in length and use numbers and lower-case letters
   *                        only.
   * @param options The options parameters.
   */
  beginDelete(
    resourceGroupName: string,
    storageTaskName: string,
    options?: StorageTasksDeleteOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<StorageTasksDeleteResponse>,
      StorageTasksDeleteResponse
    >
  >;
  /**
   * Delete the storage task resource.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param storageTaskName The name of the storage task within the specified resource group. Storage
   *                        task names must be between 3 and 18 characters in length and use numbers and lower-case letters
   *                        only.
   * @param options The options parameters.
   */
  beginDeleteAndWait(
    resourceGroupName: string,
    storageTaskName: string,
    options?: StorageTasksDeleteOptionalParams,
  ): Promise<StorageTasksDeleteResponse>;
  /**
   * Get the storage task properties
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param storageTaskName The name of the storage task within the specified resource group. Storage
   *                        task names must be between 3 and 18 characters in length and use numbers and lower-case letters
   *                        only.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    storageTaskName: string,
    options?: StorageTasksGetOptionalParams,
  ): Promise<StorageTasksGetResponse>;
  /**
   * Update storage task properties
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param storageTaskName The name of the storage task within the specified resource group. Storage
   *                        task names must be between 3 and 18 characters in length and use numbers and lower-case letters
   *                        only.
   * @param parameters The parameters to provide to update the storage task resource.
   * @param options The options parameters.
   */
  beginUpdate(
    resourceGroupName: string,
    storageTaskName: string,
    parameters: StorageTaskUpdateParameters,
    options?: StorageTasksUpdateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<StorageTasksUpdateResponse>,
      StorageTasksUpdateResponse
    >
  >;
  /**
   * Update storage task properties
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param storageTaskName The name of the storage task within the specified resource group. Storage
   *                        task names must be between 3 and 18 characters in length and use numbers and lower-case letters
   *                        only.
   * @param parameters The parameters to provide to update the storage task resource.
   * @param options The options parameters.
   */
  beginUpdateAndWait(
    resourceGroupName: string,
    storageTaskName: string,
    parameters: StorageTaskUpdateParameters,
    options?: StorageTasksUpdateOptionalParams,
  ): Promise<StorageTasksUpdateResponse>;
  /**
   * Runs the input conditions against input object metadata properties and designates matched objects in
   * response.
   * @param location The location to perform preview of the actions.
   * @param parameters The parameters to preview action condition.
   * @param options The options parameters.
   */
  previewActions(
    location: string,
    parameters: StorageTaskPreviewAction,
    options?: StorageTasksPreviewActionsOptionalParams,
  ): Promise<StorageTasksPreviewActionsResponse>;
}
