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
  Bucket,
  BucketsListOptionalParams,
  BucketsGetOptionalParams,
  BucketsGetResponse,
  BucketsCreateOrUpdateOptionalParams,
  BucketsCreateOrUpdateResponse,
  BucketsUpdateOptionalParams,
  BucketsUpdateResponse,
  BucketsDeleteOptionalParams,
  BucketsDeleteResponse,
  BucketCredentialsExpiry,
  BucketsGenerateCredentialsOptionalParams,
  BucketsGenerateCredentialsResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a Buckets. */
export interface Buckets {
  /**
   * Describes all buckets belonging to a volume. Buckets allow additional services, such as AI services,
   * connect to the volume data contained in those buckets.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName The name of the NetApp account
   * @param poolName The name of the capacity pool
   * @param volumeName The name of the volume
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    volumeName: string,
    options?: BucketsListOptionalParams,
  ): PagedAsyncIterableIterator<Bucket>;
  /**
   * Get the details of the specified volume's bucket. A bucket allows additional services, such as AI
   * services, connect to the volume data contained in those buckets.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName The name of the NetApp account
   * @param poolName The name of the capacity pool
   * @param volumeName The name of the volume
   * @param bucketName The name of the bucket
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    volumeName: string,
    bucketName: string,
    options?: BucketsGetOptionalParams,
  ): Promise<BucketsGetResponse>;
  /**
   * Creates or updates a bucket for a volume. A bucket allows additional services, such as AI services,
   * connect to the volume data contained in those buckets.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName The name of the NetApp account
   * @param poolName The name of the capacity pool
   * @param volumeName The name of the volume
   * @param bucketName The name of the bucket
   * @param body The bucket details including user details, and the volume path that should be mounted
   *             inside the bucket.
   * @param options The options parameters.
   */
  beginCreateOrUpdate(
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    volumeName: string,
    bucketName: string,
    body: Bucket,
    options?: BucketsCreateOrUpdateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<BucketsCreateOrUpdateResponse>,
      BucketsCreateOrUpdateResponse
    >
  >;
  /**
   * Creates or updates a bucket for a volume. A bucket allows additional services, such as AI services,
   * connect to the volume data contained in those buckets.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName The name of the NetApp account
   * @param poolName The name of the capacity pool
   * @param volumeName The name of the volume
   * @param bucketName The name of the bucket
   * @param body The bucket details including user details, and the volume path that should be mounted
   *             inside the bucket.
   * @param options The options parameters.
   */
  beginCreateOrUpdateAndWait(
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    volumeName: string,
    bucketName: string,
    body: Bucket,
    options?: BucketsCreateOrUpdateOptionalParams,
  ): Promise<BucketsCreateOrUpdateResponse>;
  /**
   * Updates the details of a volume bucket.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName The name of the NetApp account
   * @param poolName The name of the capacity pool
   * @param volumeName The name of the volume
   * @param bucketName The name of the bucket
   * @param options The options parameters.
   */
  beginUpdate(
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    volumeName: string,
    bucketName: string,
    options?: BucketsUpdateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<BucketsUpdateResponse>,
      BucketsUpdateResponse
    >
  >;
  /**
   * Updates the details of a volume bucket.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName The name of the NetApp account
   * @param poolName The name of the capacity pool
   * @param volumeName The name of the volume
   * @param bucketName The name of the bucket
   * @param options The options parameters.
   */
  beginUpdateAndWait(
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    volumeName: string,
    bucketName: string,
    options?: BucketsUpdateOptionalParams,
  ): Promise<BucketsUpdateResponse>;
  /**
   * Delete a volume's bucket.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName The name of the NetApp account
   * @param poolName The name of the capacity pool
   * @param volumeName The name of the volume
   * @param bucketName The name of the bucket
   * @param options The options parameters.
   */
  beginDelete(
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    volumeName: string,
    bucketName: string,
    options?: BucketsDeleteOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<BucketsDeleteResponse>,
      BucketsDeleteResponse
    >
  >;
  /**
   * Delete a volume's bucket.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName The name of the NetApp account
   * @param poolName The name of the capacity pool
   * @param volumeName The name of the volume
   * @param bucketName The name of the bucket
   * @param options The options parameters.
   */
  beginDeleteAndWait(
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    volumeName: string,
    bucketName: string,
    options?: BucketsDeleteOptionalParams,
  ): Promise<BucketsDeleteResponse>;
  /**
   * Generate the access key and secret key used for accessing the specified volume bucket. Also return
   * expiry date and time of key pair (in UTC).
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param accountName The name of the NetApp account
   * @param poolName The name of the capacity pool
   * @param volumeName The name of the volume
   * @param bucketName The name of the bucket
   * @param body The bucket's Access and Secret key pair expiry time expressed as the number of days from
   *             now.
   * @param options The options parameters.
   */
  generateCredentials(
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    volumeName: string,
    bucketName: string,
    body: BucketCredentialsExpiry,
    options?: BucketsGenerateCredentialsOptionalParams,
  ): Promise<BucketsGenerateCredentialsResponse>;
}
