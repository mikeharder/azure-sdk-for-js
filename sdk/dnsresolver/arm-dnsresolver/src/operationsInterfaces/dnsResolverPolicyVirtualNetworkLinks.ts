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
  DnsResolverPolicyVirtualNetworkLink,
  DnsResolverPolicyVirtualNetworkLinksListOptionalParams,
  DnsResolverPolicyVirtualNetworkLinksCreateOrUpdateOptionalParams,
  DnsResolverPolicyVirtualNetworkLinksCreateOrUpdateResponse,
  DnsResolverPolicyVirtualNetworkLinkPatch,
  DnsResolverPolicyVirtualNetworkLinksUpdateOptionalParams,
  DnsResolverPolicyVirtualNetworkLinksUpdateResponse,
  DnsResolverPolicyVirtualNetworkLinksDeleteOptionalParams,
  DnsResolverPolicyVirtualNetworkLinksDeleteResponse,
  DnsResolverPolicyVirtualNetworkLinksGetOptionalParams,
  DnsResolverPolicyVirtualNetworkLinksGetResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a DnsResolverPolicyVirtualNetworkLinks. */
export interface DnsResolverPolicyVirtualNetworkLinks {
  /**
   * Lists DNS resolver policy virtual network links.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param dnsResolverPolicyName The name of the DNS resolver policy.
   * @param options The options parameters.
   */
  list(
    resourceGroupName: string,
    dnsResolverPolicyName: string,
    options?: DnsResolverPolicyVirtualNetworkLinksListOptionalParams,
  ): PagedAsyncIterableIterator<DnsResolverPolicyVirtualNetworkLink>;
  /**
   * Creates or updates a DNS resolver policy virtual network link.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param dnsResolverPolicyName The name of the DNS resolver policy.
   * @param dnsResolverPolicyVirtualNetworkLinkName The name of the DNS resolver policy virtual network
   *                                                link for the DNS resolver policy.
   * @param parameters Parameters supplied to the CreateOrUpdate operation.
   * @param options The options parameters.
   */
  beginCreateOrUpdate(
    resourceGroupName: string,
    dnsResolverPolicyName: string,
    dnsResolverPolicyVirtualNetworkLinkName: string,
    parameters: DnsResolverPolicyVirtualNetworkLink,
    options?: DnsResolverPolicyVirtualNetworkLinksCreateOrUpdateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<DnsResolverPolicyVirtualNetworkLinksCreateOrUpdateResponse>,
      DnsResolverPolicyVirtualNetworkLinksCreateOrUpdateResponse
    >
  >;
  /**
   * Creates or updates a DNS resolver policy virtual network link.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param dnsResolverPolicyName The name of the DNS resolver policy.
   * @param dnsResolverPolicyVirtualNetworkLinkName The name of the DNS resolver policy virtual network
   *                                                link for the DNS resolver policy.
   * @param parameters Parameters supplied to the CreateOrUpdate operation.
   * @param options The options parameters.
   */
  beginCreateOrUpdateAndWait(
    resourceGroupName: string,
    dnsResolverPolicyName: string,
    dnsResolverPolicyVirtualNetworkLinkName: string,
    parameters: DnsResolverPolicyVirtualNetworkLink,
    options?: DnsResolverPolicyVirtualNetworkLinksCreateOrUpdateOptionalParams,
  ): Promise<DnsResolverPolicyVirtualNetworkLinksCreateOrUpdateResponse>;
  /**
   * Updates a DNS resolver policy virtual network link.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param dnsResolverPolicyName The name of the DNS resolver policy.
   * @param dnsResolverPolicyVirtualNetworkLinkName The name of the DNS resolver policy virtual network
   *                                                link for the DNS resolver policy.
   * @param parameters Parameters supplied to the Update operation.
   * @param options The options parameters.
   */
  beginUpdate(
    resourceGroupName: string,
    dnsResolverPolicyName: string,
    dnsResolverPolicyVirtualNetworkLinkName: string,
    parameters: DnsResolverPolicyVirtualNetworkLinkPatch,
    options?: DnsResolverPolicyVirtualNetworkLinksUpdateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<DnsResolverPolicyVirtualNetworkLinksUpdateResponse>,
      DnsResolverPolicyVirtualNetworkLinksUpdateResponse
    >
  >;
  /**
   * Updates a DNS resolver policy virtual network link.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param dnsResolverPolicyName The name of the DNS resolver policy.
   * @param dnsResolverPolicyVirtualNetworkLinkName The name of the DNS resolver policy virtual network
   *                                                link for the DNS resolver policy.
   * @param parameters Parameters supplied to the Update operation.
   * @param options The options parameters.
   */
  beginUpdateAndWait(
    resourceGroupName: string,
    dnsResolverPolicyName: string,
    dnsResolverPolicyVirtualNetworkLinkName: string,
    parameters: DnsResolverPolicyVirtualNetworkLinkPatch,
    options?: DnsResolverPolicyVirtualNetworkLinksUpdateOptionalParams,
  ): Promise<DnsResolverPolicyVirtualNetworkLinksUpdateResponse>;
  /**
   * Deletes a DNS resolver policy virtual network link. WARNING: This operation cannot be undone.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param dnsResolverPolicyName The name of the DNS resolver policy.
   * @param dnsResolverPolicyVirtualNetworkLinkName The name of the DNS resolver policy virtual network
   *                                                link for the DNS resolver policy.
   * @param options The options parameters.
   */
  beginDelete(
    resourceGroupName: string,
    dnsResolverPolicyName: string,
    dnsResolverPolicyVirtualNetworkLinkName: string,
    options?: DnsResolverPolicyVirtualNetworkLinksDeleteOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<DnsResolverPolicyVirtualNetworkLinksDeleteResponse>,
      DnsResolverPolicyVirtualNetworkLinksDeleteResponse
    >
  >;
  /**
   * Deletes a DNS resolver policy virtual network link. WARNING: This operation cannot be undone.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param dnsResolverPolicyName The name of the DNS resolver policy.
   * @param dnsResolverPolicyVirtualNetworkLinkName The name of the DNS resolver policy virtual network
   *                                                link for the DNS resolver policy.
   * @param options The options parameters.
   */
  beginDeleteAndWait(
    resourceGroupName: string,
    dnsResolverPolicyName: string,
    dnsResolverPolicyVirtualNetworkLinkName: string,
    options?: DnsResolverPolicyVirtualNetworkLinksDeleteOptionalParams,
  ): Promise<DnsResolverPolicyVirtualNetworkLinksDeleteResponse>;
  /**
   * Gets properties of a DNS resolver policy virtual network link.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param dnsResolverPolicyName The name of the DNS resolver policy.
   * @param dnsResolverPolicyVirtualNetworkLinkName The name of the DNS resolver policy virtual network
   *                                                link for the DNS resolver policy.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    dnsResolverPolicyName: string,
    dnsResolverPolicyVirtualNetworkLinkName: string,
    options?: DnsResolverPolicyVirtualNetworkLinksGetOptionalParams,
  ): Promise<DnsResolverPolicyVirtualNetworkLinksGetResponse>;
}
