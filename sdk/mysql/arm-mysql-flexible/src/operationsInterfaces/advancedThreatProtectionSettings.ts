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
  AdvancedThreatProtection,
  AdvancedThreatProtectionSettingsListOptionalParams,
  AdvancedThreatProtectionName,
  AdvancedThreatProtectionSettingsGetOptionalParams,
  AdvancedThreatProtectionSettingsGetResponse,
  AdvancedThreatProtectionForUpdate,
  AdvancedThreatProtectionSettingsUpdateOptionalParams,
  AdvancedThreatProtectionSettingsUpdateResponse,
  AdvancedThreatProtectionSettingsUpdatePutOptionalParams,
  AdvancedThreatProtectionSettingsUpdatePutResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a AdvancedThreatProtectionSettings. */
export interface AdvancedThreatProtectionSettings {
  /**
   * Gets a list of server's Advanced Threat Protection states.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serverName The name of the server.
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    serverName: string,
    options?: AdvancedThreatProtectionSettingsListOptionalParams,
  ): PagedAsyncIterableIterator<AdvancedThreatProtection>;
  /**
   * Get a server's Advanced Threat Protection state
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serverName The name of the server.
   * @param advancedThreatProtectionName The name of the Advanced Threat Protection state.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    serverName: string,
    advancedThreatProtectionName: AdvancedThreatProtectionName,
    options?: AdvancedThreatProtectionSettingsGetOptionalParams,
  ): Promise<AdvancedThreatProtectionSettingsGetResponse>;
  /**
   * Updates a server's Advanced Threat Protection state.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serverName The name of the server.
   * @param advancedThreatProtectionName The name of the Advanced Threat Protection state.
   * @param parameters The server's Advanced Threat Protection body to update.
   * @param options The options parameters.
   */
  beginUpdate(
    resourceGroupName: string,
    serverName: string,
    advancedThreatProtectionName: AdvancedThreatProtectionName,
    parameters: AdvancedThreatProtectionForUpdate,
    options?: AdvancedThreatProtectionSettingsUpdateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<AdvancedThreatProtectionSettingsUpdateResponse>,
      AdvancedThreatProtectionSettingsUpdateResponse
    >
  >;
  /**
   * Updates a server's Advanced Threat Protection state.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serverName The name of the server.
   * @param advancedThreatProtectionName The name of the Advanced Threat Protection state.
   * @param parameters The server's Advanced Threat Protection body to update.
   * @param options The options parameters.
   */
  beginUpdateAndWait(
    resourceGroupName: string,
    serverName: string,
    advancedThreatProtectionName: AdvancedThreatProtectionName,
    parameters: AdvancedThreatProtectionForUpdate,
    options?: AdvancedThreatProtectionSettingsUpdateOptionalParams,
  ): Promise<AdvancedThreatProtectionSettingsUpdateResponse>;
  /**
   * Updates a server's Advanced Threat Protection state.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serverName The name of the server.
   * @param advancedThreatProtectionName The name of the Advanced Threat Protection state.
   * @param parameters The server's Advanced Threat Protection body to update.
   * @param options The options parameters.
   */
  beginUpdatePut(
    resourceGroupName: string,
    serverName: string,
    advancedThreatProtectionName: AdvancedThreatProtectionName,
    parameters: AdvancedThreatProtection,
    options?: AdvancedThreatProtectionSettingsUpdatePutOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<AdvancedThreatProtectionSettingsUpdatePutResponse>,
      AdvancedThreatProtectionSettingsUpdatePutResponse
    >
  >;
  /**
   * Updates a server's Advanced Threat Protection state.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serverName The name of the server.
   * @param advancedThreatProtectionName The name of the Advanced Threat Protection state.
   * @param parameters The server's Advanced Threat Protection body to update.
   * @param options The options parameters.
   */
  beginUpdatePutAndWait(
    resourceGroupName: string,
    serverName: string,
    advancedThreatProtectionName: AdvancedThreatProtectionName,
    parameters: AdvancedThreatProtection,
    options?: AdvancedThreatProtectionSettingsUpdatePutOptionalParams,
  ): Promise<AdvancedThreatProtectionSettingsUpdatePutResponse>;
}
