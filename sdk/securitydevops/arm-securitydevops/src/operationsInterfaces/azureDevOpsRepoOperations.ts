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
  AzureDevOpsRepo,
  AzureDevOpsRepoListByConnectorOptionalParams,
  AzureDevOpsRepoListOptionalParams,
  AzureDevOpsRepoGetOptionalParams,
  AzureDevOpsRepoGetResponse,
  AzureDevOpsRepoCreateOrUpdateOptionalParams,
  AzureDevOpsRepoCreateOrUpdateResponse,
  AzureDevOpsRepoUpdateOptionalParams,
  AzureDevOpsRepoUpdateResponse
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a AzureDevOpsRepoOperations. */
export interface AzureDevOpsRepoOperations {
  /**
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param azureDevOpsConnectorName Name of the AzureDevOps Connector.
   * @param options The options parameters.
   */
  listByConnector(
    resourceGroupName: string,
    azureDevOpsConnectorName: string,
    options?: AzureDevOpsRepoListByConnectorOptionalParams
  ): PagedAsyncIterableIterator<AzureDevOpsRepo>;
  /**
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param azureDevOpsConnectorName Name of the AzureDevOps Connector.
   * @param azureDevOpsOrgName Name of the AzureDevOps Org.
   * @param azureDevOpsProjectName Name of the AzureDevOps Project.
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    azureDevOpsConnectorName: string,
    azureDevOpsOrgName: string,
    azureDevOpsProjectName: string,
    options?: AzureDevOpsRepoListOptionalParams
  ): PagedAsyncIterableIterator<AzureDevOpsRepo>;
  /**
   * Returns a monitored AzureDevOps Project resource for a given ID.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param azureDevOpsConnectorName Name of the AzureDevOps Connector.
   * @param azureDevOpsOrgName Name of the AzureDevOps Org.
   * @param azureDevOpsProjectName Name of the AzureDevOps Project.
   * @param azureDevOpsRepoName Name of the AzureDevOps Repo.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    azureDevOpsConnectorName: string,
    azureDevOpsOrgName: string,
    azureDevOpsProjectName: string,
    azureDevOpsRepoName: string,
    options?: AzureDevOpsRepoGetOptionalParams
  ): Promise<AzureDevOpsRepoGetResponse>;
  /**
   * Updates an Azure DevOps Repo.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param azureDevOpsConnectorName Name of the AzureDevOps Connector.
   * @param azureDevOpsOrgName Name of the AzureDevOps Org.
   * @param azureDevOpsProjectName Name of the AzureDevOps Project.
   * @param azureDevOpsRepoName Name of the AzureDevOps Repo.
   * @param azureDevOpsRepo Azure DevOps Repo resource payload.
   * @param options The options parameters.
   */
  beginCreateOrUpdate(
    resourceGroupName: string,
    azureDevOpsConnectorName: string,
    azureDevOpsOrgName: string,
    azureDevOpsProjectName: string,
    azureDevOpsRepoName: string,
    azureDevOpsRepo: AzureDevOpsRepo,
    options?: AzureDevOpsRepoCreateOrUpdateOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<AzureDevOpsRepoCreateOrUpdateResponse>,
      AzureDevOpsRepoCreateOrUpdateResponse
    >
  >;
  /**
   * Updates an Azure DevOps Repo.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param azureDevOpsConnectorName Name of the AzureDevOps Connector.
   * @param azureDevOpsOrgName Name of the AzureDevOps Org.
   * @param azureDevOpsProjectName Name of the AzureDevOps Project.
   * @param azureDevOpsRepoName Name of the AzureDevOps Repo.
   * @param azureDevOpsRepo Azure DevOps Repo resource payload.
   * @param options The options parameters.
   */
  beginCreateOrUpdateAndWait(
    resourceGroupName: string,
    azureDevOpsConnectorName: string,
    azureDevOpsOrgName: string,
    azureDevOpsProjectName: string,
    azureDevOpsRepoName: string,
    azureDevOpsRepo: AzureDevOpsRepo,
    options?: AzureDevOpsRepoCreateOrUpdateOptionalParams
  ): Promise<AzureDevOpsRepoCreateOrUpdateResponse>;
  /**
   * Update monitored AzureDevOps Project details.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param azureDevOpsConnectorName Name of the AzureDevOps Connector.
   * @param azureDevOpsOrgName Name of the AzureDevOps Org.
   * @param azureDevOpsProjectName Name of the AzureDevOps Project.
   * @param azureDevOpsRepoName Name of the AzureDevOps Repo.
   * @param options The options parameters.
   */
  beginUpdate(
    resourceGroupName: string,
    azureDevOpsConnectorName: string,
    azureDevOpsOrgName: string,
    azureDevOpsProjectName: string,
    azureDevOpsRepoName: string,
    options?: AzureDevOpsRepoUpdateOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<AzureDevOpsRepoUpdateResponse>,
      AzureDevOpsRepoUpdateResponse
    >
  >;
  /**
   * Update monitored AzureDevOps Project details.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param azureDevOpsConnectorName Name of the AzureDevOps Connector.
   * @param azureDevOpsOrgName Name of the AzureDevOps Org.
   * @param azureDevOpsProjectName Name of the AzureDevOps Project.
   * @param azureDevOpsRepoName Name of the AzureDevOps Repo.
   * @param options The options parameters.
   */
  beginUpdateAndWait(
    resourceGroupName: string,
    azureDevOpsConnectorName: string,
    azureDevOpsOrgName: string,
    azureDevOpsProjectName: string,
    azureDevOpsRepoName: string,
    options?: AzureDevOpsRepoUpdateOptionalParams
  ): Promise<AzureDevOpsRepoUpdateResponse>;
}
