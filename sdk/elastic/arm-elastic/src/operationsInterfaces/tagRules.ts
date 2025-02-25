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
  MonitoringTagRules,
  TagRulesListOptionalParams,
  TagRulesCreateOrUpdateOptionalParams,
  TagRulesCreateOrUpdateResponse,
  TagRulesGetOptionalParams,
  TagRulesGetResponse,
  TagRulesDeleteOptionalParams,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a TagRules. */
export interface TagRules {
  /**
   * List the tag rules for a given monitor resource.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param monitorName Monitor resource name
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    monitorName: string,
    options?: TagRulesListOptionalParams,
  ): PagedAsyncIterableIterator<MonitoringTagRules>;
  /**
   * Create or update a tag rule set for a given monitor resource.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param monitorName Monitor resource name
   * @param ruleSetName Tag Rule Set resource name
   * @param options The options parameters.
   */
  createOrUpdate(
    resourceGroupName: string,
    monitorName: string,
    ruleSetName: string,
    options?: TagRulesCreateOrUpdateOptionalParams,
  ): Promise<TagRulesCreateOrUpdateResponse>;
  /**
   * Get a tag rule set for a given monitor resource.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param monitorName Monitor resource name
   * @param ruleSetName Tag Rule Set resource name
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    monitorName: string,
    ruleSetName: string,
    options?: TagRulesGetOptionalParams,
  ): Promise<TagRulesGetResponse>;
  /**
   * Delete a tag rule set for a given monitor resource.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param monitorName Monitor resource name
   * @param ruleSetName Tag Rule Set resource name
   * @param options The options parameters.
   */
  beginDelete(
    resourceGroupName: string,
    monitorName: string,
    ruleSetName: string,
    options?: TagRulesDeleteOptionalParams,
  ): Promise<SimplePollerLike<OperationState<void>, void>>;
  /**
   * Delete a tag rule set for a given monitor resource.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param monitorName Monitor resource name
   * @param ruleSetName Tag Rule Set resource name
   * @param options The options parameters.
   */
  beginDeleteAndWait(
    resourceGroupName: string,
    monitorName: string,
    ruleSetName: string,
    options?: TagRulesDeleteOptionalParams,
  ): Promise<void>;
}
