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
  OuContainer,
  OuContainerListOptionalParams,
  OuContainerGetOptionalParams,
  OuContainerGetResponse,
  ContainerAccount,
  OuContainerCreateOptionalParams,
  OuContainerCreateResponse,
  OuContainerDeleteOptionalParams,
  OuContainerUpdateOptionalParams,
  OuContainerUpdateResponse
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a OuContainerOperationGrp. */
export interface OuContainerOperationGrp {
  /**
   * The List of OuContainers in DomainService instance.
   * @param resourceGroupName The name of the resource group within the user's subscription. The name is
   *                          case insensitive.
   * @param domainServiceName The name of the domain service.
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    domainServiceName: string,
    options?: OuContainerListOptionalParams
  ): PagedAsyncIterableIterator<OuContainer>;
  /**
   * Get OuContainer in DomainService instance.
   * @param resourceGroupName The name of the resource group within the user's subscription. The name is
   *                          case insensitive.
   * @param domainServiceName The name of the domain service.
   * @param ouContainerName The name of the OuContainer.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    domainServiceName: string,
    ouContainerName: string,
    options?: OuContainerGetOptionalParams
  ): Promise<OuContainerGetResponse>;
  /**
   * The Create OuContainer operation creates a new OuContainer under the specified Domain Service
   * instance.
   * @param resourceGroupName The name of the resource group within the user's subscription. The name is
   *                          case insensitive.
   * @param domainServiceName The name of the domain service.
   * @param ouContainerName The name of the OuContainer.
   * @param containerAccount Container Account Description.
   * @param options The options parameters.
   */
  beginCreate(
    resourceGroupName: string,
    domainServiceName: string,
    ouContainerName: string,
    containerAccount: ContainerAccount,
    options?: OuContainerCreateOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<OuContainerCreateResponse>,
      OuContainerCreateResponse
    >
  >;
  /**
   * The Create OuContainer operation creates a new OuContainer under the specified Domain Service
   * instance.
   * @param resourceGroupName The name of the resource group within the user's subscription. The name is
   *                          case insensitive.
   * @param domainServiceName The name of the domain service.
   * @param ouContainerName The name of the OuContainer.
   * @param containerAccount Container Account Description.
   * @param options The options parameters.
   */
  beginCreateAndWait(
    resourceGroupName: string,
    domainServiceName: string,
    ouContainerName: string,
    containerAccount: ContainerAccount,
    options?: OuContainerCreateOptionalParams
  ): Promise<OuContainerCreateResponse>;
  /**
   * The Delete OuContainer operation deletes specified OuContainer.
   * @param resourceGroupName The name of the resource group within the user's subscription. The name is
   *                          case insensitive.
   * @param domainServiceName The name of the domain service.
   * @param ouContainerName The name of the OuContainer.
   * @param options The options parameters.
   */
  beginDelete(
    resourceGroupName: string,
    domainServiceName: string,
    ouContainerName: string,
    options?: OuContainerDeleteOptionalParams
  ): Promise<PollerLike<PollOperationState<void>, void>>;
  /**
   * The Delete OuContainer operation deletes specified OuContainer.
   * @param resourceGroupName The name of the resource group within the user's subscription. The name is
   *                          case insensitive.
   * @param domainServiceName The name of the domain service.
   * @param ouContainerName The name of the OuContainer.
   * @param options The options parameters.
   */
  beginDeleteAndWait(
    resourceGroupName: string,
    domainServiceName: string,
    ouContainerName: string,
    options?: OuContainerDeleteOptionalParams
  ): Promise<void>;
  /**
   * The Update OuContainer operation can be used to update the existing OuContainers.
   * @param resourceGroupName The name of the resource group within the user's subscription. The name is
   *                          case insensitive.
   * @param domainServiceName The name of the domain service.
   * @param ouContainerName The name of the OuContainer.
   * @param containerAccount Container Account Description.
   * @param options The options parameters.
   */
  beginUpdate(
    resourceGroupName: string,
    domainServiceName: string,
    ouContainerName: string,
    containerAccount: ContainerAccount,
    options?: OuContainerUpdateOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<OuContainerUpdateResponse>,
      OuContainerUpdateResponse
    >
  >;
  /**
   * The Update OuContainer operation can be used to update the existing OuContainers.
   * @param resourceGroupName The name of the resource group within the user's subscription. The name is
   *                          case insensitive.
   * @param domainServiceName The name of the domain service.
   * @param ouContainerName The name of the OuContainer.
   * @param containerAccount Container Account Description.
   * @param options The options parameters.
   */
  beginUpdateAndWait(
    resourceGroupName: string,
    domainServiceName: string,
    ouContainerName: string,
    containerAccount: ContainerAccount,
    options?: OuContainerUpdateOptionalParams
  ): Promise<OuContainerUpdateResponse>;
}
