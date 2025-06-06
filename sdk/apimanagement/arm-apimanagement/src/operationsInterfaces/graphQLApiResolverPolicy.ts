/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import {
  PolicyContract,
  GraphQLApiResolverPolicyListByResolverOptionalParams,
  PolicyIdName,
  GraphQLApiResolverPolicyGetEntityTagOptionalParams,
  GraphQLApiResolverPolicyGetEntityTagResponse,
  GraphQLApiResolverPolicyGetOptionalParams,
  GraphQLApiResolverPolicyGetResponse,
  GraphQLApiResolverPolicyCreateOrUpdateOptionalParams,
  GraphQLApiResolverPolicyCreateOrUpdateResponse,
  GraphQLApiResolverPolicyDeleteOptionalParams,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Interface representing a GraphQLApiResolverPolicy. */
export interface GraphQLApiResolverPolicy {
  /**
   * Get the list of policy configuration at the GraphQL API Resolver level.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param apiId API revision identifier. Must be unique in the current API Management service instance.
   *              Non-current revision has ;rev=n as a suffix where n is the revision number.
   * @param resolverId Resolver identifier within a GraphQL API. Must be unique in the current API
   *                   Management service instance.
   * @param options The options parameters.
   */
  listByResolver(
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    resolverId: string,
    options?: GraphQLApiResolverPolicyListByResolverOptionalParams,
  ): PagedAsyncIterableIterator<PolicyContract>;
  /**
   * Gets the entity state (Etag) version of the GraphQL API resolver policy specified by its identifier.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param apiId API revision identifier. Must be unique in the current API Management service instance.
   *              Non-current revision has ;rev=n as a suffix where n is the revision number.
   * @param resolverId Resolver identifier within a GraphQL API. Must be unique in the current API
   *                   Management service instance.
   * @param policyId The identifier of the Policy.
   * @param options The options parameters.
   */
  getEntityTag(
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    resolverId: string,
    policyId: PolicyIdName,
    options?: GraphQLApiResolverPolicyGetEntityTagOptionalParams,
  ): Promise<GraphQLApiResolverPolicyGetEntityTagResponse>;
  /**
   * Get the policy configuration at the GraphQL API Resolver level.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param apiId API revision identifier. Must be unique in the current API Management service instance.
   *              Non-current revision has ;rev=n as a suffix where n is the revision number.
   * @param resolverId Resolver identifier within a GraphQL API. Must be unique in the current API
   *                   Management service instance.
   * @param policyId The identifier of the Policy.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    resolverId: string,
    policyId: PolicyIdName,
    options?: GraphQLApiResolverPolicyGetOptionalParams,
  ): Promise<GraphQLApiResolverPolicyGetResponse>;
  /**
   * Creates or updates policy configuration for the GraphQL API Resolver level.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param apiId API revision identifier. Must be unique in the current API Management service instance.
   *              Non-current revision has ;rev=n as a suffix where n is the revision number.
   * @param resolverId Resolver identifier within a GraphQL API. Must be unique in the current API
   *                   Management service instance.
   * @param policyId The identifier of the Policy.
   * @param parameters The policy contents to apply.
   * @param options The options parameters.
   */
  createOrUpdate(
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    resolverId: string,
    policyId: PolicyIdName,
    parameters: PolicyContract,
    options?: GraphQLApiResolverPolicyCreateOrUpdateOptionalParams,
  ): Promise<GraphQLApiResolverPolicyCreateOrUpdateResponse>;
  /**
   * Deletes the policy configuration at the GraphQL Api Resolver.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param apiId API revision identifier. Must be unique in the current API Management service instance.
   *              Non-current revision has ;rev=n as a suffix where n is the revision number.
   * @param resolverId Resolver identifier within a GraphQL API. Must be unique in the current API
   *                   Management service instance.
   * @param policyId The identifier of the Policy.
   * @param ifMatch ETag of the Entity. ETag should match the current entity state from the header
   *                response of the GET request or it should be * for unconditional update.
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    serviceName: string,
    apiId: string,
    resolverId: string,
    policyId: PolicyIdName,
    ifMatch: string,
    options?: GraphQLApiResolverPolicyDeleteOptionalParams,
  ): Promise<void>;
}
