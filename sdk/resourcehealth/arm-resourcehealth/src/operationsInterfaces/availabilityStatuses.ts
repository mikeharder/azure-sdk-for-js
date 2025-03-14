/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  AvailabilityStatus,
  AvailabilityStatusesListBySubscriptionIdOptionalParams,
  AvailabilityStatusesListByResourceGroupOptionalParams,
  AvailabilityStatusesListOptionalParams,
  AvailabilityStatusesGetByResourceOptionalParams,
  AvailabilityStatusesGetByResourceResponse
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a AvailabilityStatuses. */
export interface AvailabilityStatuses {
  /**
   * Lists the current availability status for all the resources in the subscription.
   * @param options The options parameters.
   */
  listBySubscriptionId(
    options?: AvailabilityStatusesListBySubscriptionIdOptionalParams
  ): PagedAsyncIterableIterator<AvailabilityStatus>;
  /**
   * Lists the current availability status for all the resources in the resource group.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param options The options parameters.
   */
  listByResourceGroup(
    resourceGroupName: string,
    options?: AvailabilityStatusesListByResourceGroupOptionalParams
  ): PagedAsyncIterableIterator<AvailabilityStatus>;
  /**
   * Lists all historical availability transitions and impacting events for a single resource.
   * @param resourceUri The fully qualified ID of the resource, including the resource name and resource
   *                    type. Currently the API support not nested and one nesting level resource types :
   *                    /subscriptions/{subscriptionId}/resourceGroups/{resource-group-name}/providers/{resource-provider-name}/{resource-type}/{resource-name}
   *                    and
   *                    /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resource-provider-name}/{parentResourceType}/{parentResourceName}/{resourceType}/{resourceName}
   * @param options The options parameters.
   */
  list(
    resourceUri: string,
    options?: AvailabilityStatusesListOptionalParams
  ): PagedAsyncIterableIterator<AvailabilityStatus>;
  /**
   * Gets current availability status for a single resource
   * @param resourceUri The fully qualified ID of the resource, including the resource name and resource
   *                    type. Currently the API support not nested and one nesting level resource types :
   *                    /subscriptions/{subscriptionId}/resourceGroups/{resource-group-name}/providers/{resource-provider-name}/{resource-type}/{resource-name}
   *                    and
   *                    /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{resource-provider-name}/{parentResourceType}/{parentResourceName}/{resourceType}/{resourceName}
   * @param options The options parameters.
   */
  getByResource(
    resourceUri: string,
    options?: AvailabilityStatusesGetByResourceOptionalParams
  ): Promise<AvailabilityStatusesGetByResourceResponse>;
}
