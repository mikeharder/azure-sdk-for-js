/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  GroupQuotaLimitsListOptionalParams,
  GroupQuotaLimitsListResponse,
} from "../models/index.js";

/** Interface representing a GroupQuotaLimits. */
export interface GroupQuotaLimits {
  /**
   * Gets the GroupQuotaLimits for the specified resource provider and location for resource names passed
   * in $filter=resourceName eq {SKU}.
   * @param managementGroupId Management Group Id.
   * @param groupQuotaName The GroupQuota name. The name should be unique for the provided context
   *                       tenantId/MgId.
   * @param resourceProviderName The resource provider name, such as - Microsoft.Compute. Currently only
   *                             Microsoft.Compute resource provider supports this API.
   * @param location The name of the Azure region.
   * @param options The options parameters.
   */
  list(
    managementGroupId: string,
    groupQuotaName: string,
    resourceProviderName: string,
    location: string,
    options?: GroupQuotaLimitsListOptionalParams,
  ): Promise<GroupQuotaLimitsListResponse>;
}
