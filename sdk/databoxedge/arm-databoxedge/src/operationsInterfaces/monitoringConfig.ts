/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { PollerLike, PollOperationState } from "@azure/core-lro";
import {
  MonitoringMetricConfiguration,
  MonitoringConfigListOptionalParams,
  MonitoringConfigGetOptionalParams,
  MonitoringConfigGetResponse,
  MonitoringConfigCreateOrUpdateOptionalParams,
  MonitoringConfigCreateOrUpdateResponse,
  MonitoringConfigDeleteOptionalParams
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a MonitoringConfig. */
export interface MonitoringConfig {
  /**
   * Lists metric configurations in a role.
   * @param deviceName The device name.
   * @param roleName The role name.
   * @param resourceGroupName The resource group name.
   * @param options The options parameters.
   */
  list(
    deviceName: string,
    roleName: string,
    resourceGroupName: string,
    options?: MonitoringConfigListOptionalParams
  ): PagedAsyncIterableIterator<MonitoringMetricConfiguration>;
  /**
   * Gets a  metric configuration of a role.
   * @param deviceName The device name.
   * @param roleName The role name.
   * @param resourceGroupName The resource group name.
   * @param options The options parameters.
   */
  get(
    deviceName: string,
    roleName: string,
    resourceGroupName: string,
    options?: MonitoringConfigGetOptionalParams
  ): Promise<MonitoringConfigGetResponse>;
  /**
   * Creates a new metric configuration or updates an existing one for a role.
   * @param deviceName The device name.
   * @param roleName The role name.
   * @param resourceGroupName The resource group name.
   * @param monitoringMetricConfiguration The metric configuration.
   * @param options The options parameters.
   */
  beginCreateOrUpdate(
    deviceName: string,
    roleName: string,
    resourceGroupName: string,
    monitoringMetricConfiguration: MonitoringMetricConfiguration,
    options?: MonitoringConfigCreateOrUpdateOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<MonitoringConfigCreateOrUpdateResponse>,
      MonitoringConfigCreateOrUpdateResponse
    >
  >;
  /**
   * Creates a new metric configuration or updates an existing one for a role.
   * @param deviceName The device name.
   * @param roleName The role name.
   * @param resourceGroupName The resource group name.
   * @param monitoringMetricConfiguration The metric configuration.
   * @param options The options parameters.
   */
  beginCreateOrUpdateAndWait(
    deviceName: string,
    roleName: string,
    resourceGroupName: string,
    monitoringMetricConfiguration: MonitoringMetricConfiguration,
    options?: MonitoringConfigCreateOrUpdateOptionalParams
  ): Promise<MonitoringConfigCreateOrUpdateResponse>;
  /**
   * deletes a new metric configuration for a role.
   * @param deviceName The device name.
   * @param roleName The role name.
   * @param resourceGroupName The resource group name.
   * @param options The options parameters.
   */
  beginDelete(
    deviceName: string,
    roleName: string,
    resourceGroupName: string,
    options?: MonitoringConfigDeleteOptionalParams
  ): Promise<PollerLike<PollOperationState<void>, void>>;
  /**
   * deletes a new metric configuration for a role.
   * @param deviceName The device name.
   * @param roleName The role name.
   * @param resourceGroupName The resource group name.
   * @param options The options parameters.
   */
  beginDeleteAndWait(
    deviceName: string,
    roleName: string,
    resourceGroupName: string,
    options?: MonitoringConfigDeleteOptionalParams
  ): Promise<void>;
}
