/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  PrivateLinkResource,
  PrivateLinkResourcesListByRedisCacheOptionalParams,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a PrivateLinkResources. */
export interface PrivateLinkResources {
  /**
   * Gets the private link resources that need to be created for a redis cache.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param cacheName The name of the Redis cache.
   * @param options The options parameters.
   */
  listByRedisCache(
    resourceGroupName: string,
    cacheName: string,
    options?: PrivateLinkResourcesListByRedisCacheOptionalParams,
  ): PagedAsyncIterableIterator<PrivateLinkResource>;
}
