/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { SimplePollerLike, OperationState } from "@azure/core-lro";
import {
  MonitoringSettingsGetOptionalParams,
  MonitoringSettingsGetResponse,
  MonitoringSettingResource,
  MonitoringSettingsUpdatePutOptionalParams,
  MonitoringSettingsUpdatePutResponse,
  MonitoringSettingsUpdatePatchOptionalParams,
  MonitoringSettingsUpdatePatchResponse
} from "../models/index.js";

/** Interface representing a MonitoringSettings. */
export interface MonitoringSettings {
  /**
   * Get the Monitoring Setting and its properties.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serviceName The name of the Service resource.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    serviceName: string,
    options?: MonitoringSettingsGetOptionalParams
  ): Promise<MonitoringSettingsGetResponse>;
  /**
   * Update the Monitoring Setting.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serviceName The name of the Service resource.
   * @param monitoringSettingResource Parameters for the update operation
   * @param options The options parameters.
   */
  beginUpdatePut(
    resourceGroupName: string,
    serviceName: string,
    monitoringSettingResource: MonitoringSettingResource,
    options?: MonitoringSettingsUpdatePutOptionalParams
  ): Promise<
    SimplePollerLike<
      OperationState<MonitoringSettingsUpdatePutResponse>,
      MonitoringSettingsUpdatePutResponse
    >
  >;
  /**
   * Update the Monitoring Setting.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serviceName The name of the Service resource.
   * @param monitoringSettingResource Parameters for the update operation
   * @param options The options parameters.
   */
  beginUpdatePutAndWait(
    resourceGroupName: string,
    serviceName: string,
    monitoringSettingResource: MonitoringSettingResource,
    options?: MonitoringSettingsUpdatePutOptionalParams
  ): Promise<MonitoringSettingsUpdatePutResponse>;
  /**
   * Update the Monitoring Setting.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serviceName The name of the Service resource.
   * @param monitoringSettingResource Parameters for the update operation
   * @param options The options parameters.
   */
  beginUpdatePatch(
    resourceGroupName: string,
    serviceName: string,
    monitoringSettingResource: MonitoringSettingResource,
    options?: MonitoringSettingsUpdatePatchOptionalParams
  ): Promise<
    SimplePollerLike<
      OperationState<MonitoringSettingsUpdatePatchResponse>,
      MonitoringSettingsUpdatePatchResponse
    >
  >;
  /**
   * Update the Monitoring Setting.
   * @param resourceGroupName The name of the resource group that contains the resource. You can obtain
   *                          this value from the Azure Resource Manager API or the portal.
   * @param serviceName The name of the Service resource.
   * @param monitoringSettingResource Parameters for the update operation
   * @param options The options parameters.
   */
  beginUpdatePatchAndWait(
    resourceGroupName: string,
    serviceName: string,
    monitoringSettingResource: MonitoringSettingResource,
    options?: MonitoringSettingsUpdatePatchOptionalParams
  ): Promise<MonitoringSettingsUpdatePatchResponse>;
}
