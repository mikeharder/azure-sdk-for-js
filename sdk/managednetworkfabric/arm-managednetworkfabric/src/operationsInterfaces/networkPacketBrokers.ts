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
  NetworkPacketBroker,
  NetworkPacketBrokersListByResourceGroupOptionalParams,
  NetworkPacketBrokersListBySubscriptionOptionalParams,
  NetworkPacketBrokersCreateOptionalParams,
  NetworkPacketBrokersCreateResponse,
  NetworkPacketBrokersGetOptionalParams,
  NetworkPacketBrokersGetResponse,
  NetworkPacketBrokerPatch,
  NetworkPacketBrokersUpdateOptionalParams,
  NetworkPacketBrokersUpdateResponse,
  NetworkPacketBrokersDeleteOptionalParams
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a NetworkPacketBrokers. */
export interface NetworkPacketBrokers {
  /**
   * Displays NetworkPacketBrokers list by resource group GET method.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param options The options parameters.
   */
  listByResourceGroup(
    resourceGroupName: string,
    options?: NetworkPacketBrokersListByResourceGroupOptionalParams
  ): PagedAsyncIterableIterator<NetworkPacketBroker>;
  /**
   * Displays Network Packet Brokers list by subscription GET method.
   * @param options The options parameters.
   */
  listBySubscription(
    options?: NetworkPacketBrokersListBySubscriptionOptionalParams
  ): PagedAsyncIterableIterator<NetworkPacketBroker>;
  /**
   * Creates a Network Packet Broker.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param networkPacketBrokerName Name of the Network Packet Broker.
   * @param body Request payload.
   * @param options The options parameters.
   */
  beginCreate(
    resourceGroupName: string,
    networkPacketBrokerName: string,
    body: NetworkPacketBroker,
    options?: NetworkPacketBrokersCreateOptionalParams
  ): Promise<
    SimplePollerLike<
      OperationState<NetworkPacketBrokersCreateResponse>,
      NetworkPacketBrokersCreateResponse
    >
  >;
  /**
   * Creates a Network Packet Broker.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param networkPacketBrokerName Name of the Network Packet Broker.
   * @param body Request payload.
   * @param options The options parameters.
   */
  beginCreateAndWait(
    resourceGroupName: string,
    networkPacketBrokerName: string,
    body: NetworkPacketBroker,
    options?: NetworkPacketBrokersCreateOptionalParams
  ): Promise<NetworkPacketBrokersCreateResponse>;
  /**
   * Retrieves details of this Network Packet Broker.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param networkPacketBrokerName Name of the Network Packet Broker.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    networkPacketBrokerName: string,
    options?: NetworkPacketBrokersGetOptionalParams
  ): Promise<NetworkPacketBrokersGetResponse>;
  /**
   * API to update certain properties of the Network Packet Broker resource.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param networkPacketBrokerName Name of the Network Packet Broker.
   * @param body Network Packet Broker properties to update.
   * @param options The options parameters.
   */
  beginUpdate(
    resourceGroupName: string,
    networkPacketBrokerName: string,
    body: NetworkPacketBrokerPatch,
    options?: NetworkPacketBrokersUpdateOptionalParams
  ): Promise<
    SimplePollerLike<
      OperationState<NetworkPacketBrokersUpdateResponse>,
      NetworkPacketBrokersUpdateResponse
    >
  >;
  /**
   * API to update certain properties of the Network Packet Broker resource.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param networkPacketBrokerName Name of the Network Packet Broker.
   * @param body Network Packet Broker properties to update.
   * @param options The options parameters.
   */
  beginUpdateAndWait(
    resourceGroupName: string,
    networkPacketBrokerName: string,
    body: NetworkPacketBrokerPatch,
    options?: NetworkPacketBrokersUpdateOptionalParams
  ): Promise<NetworkPacketBrokersUpdateResponse>;
  /**
   * Deletes Network Packet Broker.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param networkPacketBrokerName Name of the Network Packet Broker.
   * @param options The options parameters.
   */
  beginDelete(
    resourceGroupName: string,
    networkPacketBrokerName: string,
    options?: NetworkPacketBrokersDeleteOptionalParams
  ): Promise<SimplePollerLike<OperationState<void>, void>>;
  /**
   * Deletes Network Packet Broker.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param networkPacketBrokerName Name of the Network Packet Broker.
   * @param options The options parameters.
   */
  beginDeleteAndWait(
    resourceGroupName: string,
    networkPacketBrokerName: string,
    options?: NetworkPacketBrokersDeleteOptionalParams
  ): Promise<void>;
}
