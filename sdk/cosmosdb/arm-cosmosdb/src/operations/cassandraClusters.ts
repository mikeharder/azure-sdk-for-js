/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { CassandraClusters } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { CosmosDBManagementClient } from "../cosmosDBManagementClient.js";
import {
  SimplePollerLike,
  OperationState,
  createHttpPoller,
} from "@azure/core-lro";
import { createLroSpec } from "../lroImpl.js";
import {
  ClusterResource,
  CassandraClustersListBySubscriptionOptionalParams,
  CassandraClustersListBySubscriptionResponse,
  CassandraClustersListByResourceGroupOptionalParams,
  CassandraClustersListByResourceGroupResponse,
  CassandraClustersGetOptionalParams,
  CassandraClustersGetResponse,
  CassandraClustersDeleteOptionalParams,
  CassandraClustersCreateUpdateOptionalParams,
  CassandraClustersCreateUpdateResponse,
  CassandraClustersUpdateOptionalParams,
  CassandraClustersUpdateResponse,
  CommandPostBody,
  CassandraClustersInvokeCommandOptionalParams,
  CassandraClustersInvokeCommandResponse,
  CassandraClustersDeallocateOptionalParams,
  CassandraClustersStartOptionalParams,
  CassandraClustersStatusOptionalParams,
  CassandraClustersStatusResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing CassandraClusters operations. */
export class CassandraClustersImpl implements CassandraClusters {
  private readonly client: CosmosDBManagementClient;

  /**
   * Initialize a new instance of the class CassandraClusters class.
   * @param client Reference to the service client
   */
  constructor(client: CosmosDBManagementClient) {
    this.client = client;
  }

  /**
   * List all managed Cassandra clusters in this subscription.
   * @param options The options parameters.
   */
  public listBySubscription(
    options?: CassandraClustersListBySubscriptionOptionalParams,
  ): PagedAsyncIterableIterator<ClusterResource> {
    const iter = this.listBySubscriptionPagingAll(options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings?: PageSettings) => {
        if (settings?.maxPageSize) {
          throw new Error("maxPageSize is not supported by this operation.");
        }
        return this.listBySubscriptionPagingPage(options, settings);
      },
    };
  }

  private async *listBySubscriptionPagingPage(
    options?: CassandraClustersListBySubscriptionOptionalParams,
    _settings?: PageSettings,
  ): AsyncIterableIterator<ClusterResource[]> {
    let result: CassandraClustersListBySubscriptionResponse;
    result = await this._listBySubscription(options);
    yield result.value || [];
  }

  private async *listBySubscriptionPagingAll(
    options?: CassandraClustersListBySubscriptionOptionalParams,
  ): AsyncIterableIterator<ClusterResource> {
    for await (const page of this.listBySubscriptionPagingPage(options)) {
      yield* page;
    }
  }

  /**
   * List all managed Cassandra clusters in this resource group.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param options The options parameters.
   */
  public listByResourceGroup(
    resourceGroupName: string,
    options?: CassandraClustersListByResourceGroupOptionalParams,
  ): PagedAsyncIterableIterator<ClusterResource> {
    const iter = this.listByResourceGroupPagingAll(resourceGroupName, options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: (settings?: PageSettings) => {
        if (settings?.maxPageSize) {
          throw new Error("maxPageSize is not supported by this operation.");
        }
        return this.listByResourceGroupPagingPage(
          resourceGroupName,
          options,
          settings,
        );
      },
    };
  }

  private async *listByResourceGroupPagingPage(
    resourceGroupName: string,
    options?: CassandraClustersListByResourceGroupOptionalParams,
    _settings?: PageSettings,
  ): AsyncIterableIterator<ClusterResource[]> {
    let result: CassandraClustersListByResourceGroupResponse;
    result = await this._listByResourceGroup(resourceGroupName, options);
    yield result.value || [];
  }

  private async *listByResourceGroupPagingAll(
    resourceGroupName: string,
    options?: CassandraClustersListByResourceGroupOptionalParams,
  ): AsyncIterableIterator<ClusterResource> {
    for await (const page of this.listByResourceGroupPagingPage(
      resourceGroupName,
      options,
    )) {
      yield* page;
    }
  }

  /**
   * List all managed Cassandra clusters in this subscription.
   * @param options The options parameters.
   */
  private _listBySubscription(
    options?: CassandraClustersListBySubscriptionOptionalParams,
  ): Promise<CassandraClustersListBySubscriptionResponse> {
    return this.client.sendOperationRequest(
      { options },
      listBySubscriptionOperationSpec,
    );
  }

  /**
   * List all managed Cassandra clusters in this resource group.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param options The options parameters.
   */
  private _listByResourceGroup(
    resourceGroupName: string,
    options?: CassandraClustersListByResourceGroupOptionalParams,
  ): Promise<CassandraClustersListByResourceGroupResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, options },
      listByResourceGroupOperationSpec,
    );
  }

  /**
   * Get the properties of a managed Cassandra cluster.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param clusterName Managed Cassandra cluster name.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    clusterName: string,
    options?: CassandraClustersGetOptionalParams,
  ): Promise<CassandraClustersGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, clusterName, options },
      getOperationSpec,
    );
  }

  /**
   * Deletes a managed Cassandra cluster.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param clusterName Managed Cassandra cluster name.
   * @param options The options parameters.
   */
  async beginDelete(
    resourceGroupName: string,
    clusterName: string,
    options?: CassandraClustersDeleteOptionalParams,
  ): Promise<SimplePollerLike<OperationState<void>, void>> {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<void> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperationFn = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ) => {
      let currentRawResponse: coreClient.FullOperationResponse | undefined =
        undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown,
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback,
        },
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON(),
        },
      };
    };

    const lro = createLroSpec({
      sendOperationFn,
      args: { resourceGroupName, clusterName, options },
      spec: deleteOperationSpec,
    });
    const poller = await createHttpPoller<void, OperationState<void>>(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
    });
    await poller.poll();
    return poller;
  }

  /**
   * Deletes a managed Cassandra cluster.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param clusterName Managed Cassandra cluster name.
   * @param options The options parameters.
   */
  async beginDeleteAndWait(
    resourceGroupName: string,
    clusterName: string,
    options?: CassandraClustersDeleteOptionalParams,
  ): Promise<void> {
    const poller = await this.beginDelete(
      resourceGroupName,
      clusterName,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Create or update a managed Cassandra cluster. When updating, you must specify all writable
   * properties. To update only some properties, use PATCH.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param clusterName Managed Cassandra cluster name.
   * @param body The properties specifying the desired state of the managed Cassandra cluster.
   * @param options The options parameters.
   */
  async beginCreateUpdate(
    resourceGroupName: string,
    clusterName: string,
    body: ClusterResource,
    options?: CassandraClustersCreateUpdateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<CassandraClustersCreateUpdateResponse>,
      CassandraClustersCreateUpdateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<CassandraClustersCreateUpdateResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperationFn = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ) => {
      let currentRawResponse: coreClient.FullOperationResponse | undefined =
        undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown,
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback,
        },
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON(),
        },
      };
    };

    const lro = createLroSpec({
      sendOperationFn,
      args: { resourceGroupName, clusterName, body, options },
      spec: createUpdateOperationSpec,
    });
    const poller = await createHttpPoller<
      CassandraClustersCreateUpdateResponse,
      OperationState<CassandraClustersCreateUpdateResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
    });
    await poller.poll();
    return poller;
  }

  /**
   * Create or update a managed Cassandra cluster. When updating, you must specify all writable
   * properties. To update only some properties, use PATCH.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param clusterName Managed Cassandra cluster name.
   * @param body The properties specifying the desired state of the managed Cassandra cluster.
   * @param options The options parameters.
   */
  async beginCreateUpdateAndWait(
    resourceGroupName: string,
    clusterName: string,
    body: ClusterResource,
    options?: CassandraClustersCreateUpdateOptionalParams,
  ): Promise<CassandraClustersCreateUpdateResponse> {
    const poller = await this.beginCreateUpdate(
      resourceGroupName,
      clusterName,
      body,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Updates some of the properties of a managed Cassandra cluster.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param clusterName Managed Cassandra cluster name.
   * @param body Parameters to provide for specifying the managed Cassandra cluster.
   * @param options The options parameters.
   */
  async beginUpdate(
    resourceGroupName: string,
    clusterName: string,
    body: ClusterResource,
    options?: CassandraClustersUpdateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<CassandraClustersUpdateResponse>,
      CassandraClustersUpdateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<CassandraClustersUpdateResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperationFn = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ) => {
      let currentRawResponse: coreClient.FullOperationResponse | undefined =
        undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown,
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback,
        },
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON(),
        },
      };
    };

    const lro = createLroSpec({
      sendOperationFn,
      args: { resourceGroupName, clusterName, body, options },
      spec: updateOperationSpec,
    });
    const poller = await createHttpPoller<
      CassandraClustersUpdateResponse,
      OperationState<CassandraClustersUpdateResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
    });
    await poller.poll();
    return poller;
  }

  /**
   * Updates some of the properties of a managed Cassandra cluster.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param clusterName Managed Cassandra cluster name.
   * @param body Parameters to provide for specifying the managed Cassandra cluster.
   * @param options The options parameters.
   */
  async beginUpdateAndWait(
    resourceGroupName: string,
    clusterName: string,
    body: ClusterResource,
    options?: CassandraClustersUpdateOptionalParams,
  ): Promise<CassandraClustersUpdateResponse> {
    const poller = await this.beginUpdate(
      resourceGroupName,
      clusterName,
      body,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Invoke a command like nodetool for cassandra maintenance
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param clusterName Managed Cassandra cluster name.
   * @param body Specification which command to run where
   * @param options The options parameters.
   */
  async beginInvokeCommand(
    resourceGroupName: string,
    clusterName: string,
    body: CommandPostBody,
    options?: CassandraClustersInvokeCommandOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<CassandraClustersInvokeCommandResponse>,
      CassandraClustersInvokeCommandResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<CassandraClustersInvokeCommandResponse> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperationFn = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ) => {
      let currentRawResponse: coreClient.FullOperationResponse | undefined =
        undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown,
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback,
        },
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON(),
        },
      };
    };

    const lro = createLroSpec({
      sendOperationFn,
      args: { resourceGroupName, clusterName, body, options },
      spec: invokeCommandOperationSpec,
    });
    const poller = await createHttpPoller<
      CassandraClustersInvokeCommandResponse,
      OperationState<CassandraClustersInvokeCommandResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
    });
    await poller.poll();
    return poller;
  }

  /**
   * Invoke a command like nodetool for cassandra maintenance
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param clusterName Managed Cassandra cluster name.
   * @param body Specification which command to run where
   * @param options The options parameters.
   */
  async beginInvokeCommandAndWait(
    resourceGroupName: string,
    clusterName: string,
    body: CommandPostBody,
    options?: CassandraClustersInvokeCommandOptionalParams,
  ): Promise<CassandraClustersInvokeCommandResponse> {
    const poller = await this.beginInvokeCommand(
      resourceGroupName,
      clusterName,
      body,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Deallocate the Managed Cassandra Cluster and Associated Data Centers. Deallocation will deallocate
   * the host virtual machine of this cluster, and reserved the data disk. This won't do anything on an
   * already deallocated cluster. Use Start to restart the cluster.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param clusterName Managed Cassandra cluster name.
   * @param options The options parameters.
   */
  async beginDeallocate(
    resourceGroupName: string,
    clusterName: string,
    options?: CassandraClustersDeallocateOptionalParams,
  ): Promise<SimplePollerLike<OperationState<void>, void>> {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<void> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperationFn = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ) => {
      let currentRawResponse: coreClient.FullOperationResponse | undefined =
        undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown,
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback,
        },
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON(),
        },
      };
    };

    const lro = createLroSpec({
      sendOperationFn,
      args: { resourceGroupName, clusterName, options },
      spec: deallocateOperationSpec,
    });
    const poller = await createHttpPoller<void, OperationState<void>>(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
    });
    await poller.poll();
    return poller;
  }

  /**
   * Deallocate the Managed Cassandra Cluster and Associated Data Centers. Deallocation will deallocate
   * the host virtual machine of this cluster, and reserved the data disk. This won't do anything on an
   * already deallocated cluster. Use Start to restart the cluster.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param clusterName Managed Cassandra cluster name.
   * @param options The options parameters.
   */
  async beginDeallocateAndWait(
    resourceGroupName: string,
    clusterName: string,
    options?: CassandraClustersDeallocateOptionalParams,
  ): Promise<void> {
    const poller = await this.beginDeallocate(
      resourceGroupName,
      clusterName,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Start the Managed Cassandra Cluster and Associated Data Centers. Start will start the host virtual
   * machine of this cluster with reserved data disk. This won't do anything on an already running
   * cluster. Use Deallocate to deallocate the cluster.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param clusterName Managed Cassandra cluster name.
   * @param options The options parameters.
   */
  async beginStart(
    resourceGroupName: string,
    clusterName: string,
    options?: CassandraClustersStartOptionalParams,
  ): Promise<SimplePollerLike<OperationState<void>, void>> {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<void> => {
      return this.client.sendOperationRequest(args, spec);
    };
    const sendOperationFn = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ) => {
      let currentRawResponse: coreClient.FullOperationResponse | undefined =
        undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown,
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback,
        },
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON(),
        },
      };
    };

    const lro = createLroSpec({
      sendOperationFn,
      args: { resourceGroupName, clusterName, options },
      spec: startOperationSpec,
    });
    const poller = await createHttpPoller<void, OperationState<void>>(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
    });
    await poller.poll();
    return poller;
  }

  /**
   * Start the Managed Cassandra Cluster and Associated Data Centers. Start will start the host virtual
   * machine of this cluster with reserved data disk. This won't do anything on an already running
   * cluster. Use Deallocate to deallocate the cluster.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param clusterName Managed Cassandra cluster name.
   * @param options The options parameters.
   */
  async beginStartAndWait(
    resourceGroupName: string,
    clusterName: string,
    options?: CassandraClustersStartOptionalParams,
  ): Promise<void> {
    const poller = await this.beginStart(
      resourceGroupName,
      clusterName,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Gets the CPU, memory, and disk usage statistics for each Cassandra node in a cluster.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param clusterName Managed Cassandra cluster name.
   * @param options The options parameters.
   */
  status(
    resourceGroupName: string,
    clusterName: string,
    options?: CassandraClustersStatusOptionalParams,
  ): Promise<CassandraClustersStatusResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, clusterName, options },
      statusOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listBySubscriptionOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/providers/Microsoft.DocumentDB/cassandraClusters",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ListClusters,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  headerParameters: [Parameters.accept],
  serializer,
};
const listByResourceGroupOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/cassandraClusters",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ListClusters,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const getOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/cassandraClusters/{clusterName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.ClusterResource,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.clusterName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/cassandraClusters/{clusterName}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    201: {},
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.clusterName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const createUpdateOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/cassandraClusters/{clusterName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.ClusterResource,
    },
    201: {
      bodyMapper: Mappers.ClusterResource,
    },
    202: {
      bodyMapper: Mappers.ClusterResource,
    },
    204: {
      bodyMapper: Mappers.ClusterResource,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  requestBody: Parameters.body,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.clusterName,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
const updateOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/cassandraClusters/{clusterName}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.ClusterResource,
    },
    201: {
      bodyMapper: Mappers.ClusterResource,
    },
    202: {
      bodyMapper: Mappers.ClusterResource,
    },
    204: {
      bodyMapper: Mappers.ClusterResource,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  requestBody: Parameters.body,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.clusterName,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
const invokeCommandOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/cassandraClusters/{clusterName}/invokeCommand",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.CommandOutput,
    },
    201: {
      bodyMapper: Mappers.CommandOutput,
    },
    202: {
      bodyMapper: Mappers.CommandOutput,
    },
    204: {
      bodyMapper: Mappers.CommandOutput,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  requestBody: Parameters.body1,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.clusterName,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
const deallocateOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/cassandraClusters/{clusterName}/deallocate",
  httpMethod: "POST",
  responses: {
    200: {},
    201: {},
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.clusterName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const startOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/cassandraClusters/{clusterName}/start",
  httpMethod: "POST",
  responses: {
    200: {},
    201: {},
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.clusterName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const statusOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/cassandraClusters/{clusterName}/status",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.CassandraClusterPublicStatus,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.clusterName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
