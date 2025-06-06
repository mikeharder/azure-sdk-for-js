/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  GuestConfigurationAssignmentReport,
  GuestConfigurationAssignmentReportsVmssListOptionalParams,
  GuestConfigurationAssignmentReportsVmssGetOptionalParams,
  GuestConfigurationAssignmentReportsVmssGetResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a GuestConfigurationAssignmentReportsVmss. */
export interface GuestConfigurationAssignmentReportsVmss {
  /**
   * List all reports for the VMSS guest configuration assignment, latest report first.
   * @param resourceGroupName The resource group name.
   * @param vmssName The name of the virtual machine scale set.
   * @param name The guest configuration assignment name.
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    vmssName: string,
    name: string,
    options?: GuestConfigurationAssignmentReportsVmssListOptionalParams,
  ): PagedAsyncIterableIterator<GuestConfigurationAssignmentReport>;
  /**
   * Get a report for the VMSS guest configuration assignment, by reportId.
   * @param resourceGroupName The resource group name.
   * @param vmssName The name of the virtual machine scale set.
   * @param name The guest configuration assignment name.
   * @param id The GUID for the guest configuration assignment report.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    vmssName: string,
    name: string,
    id: string,
    options?: GuestConfigurationAssignmentReportsVmssGetOptionalParams,
  ): Promise<GuestConfigurationAssignmentReportsVmssGetResponse>;
}
