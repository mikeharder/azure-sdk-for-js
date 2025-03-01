/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  RoutingInfoModel,
  RoutingInfoListOptionalParams,
  RoutingInfoGetOptionalParams,
  RoutingInfoGetResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a RoutingInfo. */
export interface RoutingInfo {
  /**
   * List all of the routing information for the packet core.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param packetCoreControlPlaneName The name of the packet core control plane.
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    packetCoreControlPlaneName: string,
    options?: RoutingInfoListOptionalParams,
  ): PagedAsyncIterableIterator<RoutingInfoModel>;
  /**
   * Get the routing information for the packet core.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param packetCoreControlPlaneName The name of the packet core control plane.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    packetCoreControlPlaneName: string,
    options?: RoutingInfoGetOptionalParams,
  ): Promise<RoutingInfoGetResponse>;
}
