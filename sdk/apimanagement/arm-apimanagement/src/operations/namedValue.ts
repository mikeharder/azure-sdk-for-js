/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import { NamedValue } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { ApiManagementClient } from "../apiManagementClient.js";
import {
  SimplePollerLike,
  OperationState,
  createHttpPoller,
} from "@azure/core-lro";
import { createLroSpec } from "../lroImpl.js";
import {
  NamedValueContract,
  NamedValueListByServiceNextOptionalParams,
  NamedValueListByServiceOptionalParams,
  NamedValueListByServiceResponse,
  NamedValueGetEntityTagOptionalParams,
  NamedValueGetEntityTagResponse,
  NamedValueGetOptionalParams,
  NamedValueGetResponse,
  NamedValueCreateContract,
  NamedValueCreateOrUpdateOptionalParams,
  NamedValueCreateOrUpdateResponse,
  NamedValueUpdateParameters,
  NamedValueUpdateOptionalParams,
  NamedValueUpdateResponse,
  NamedValueDeleteOptionalParams,
  NamedValueListValueOptionalParams,
  NamedValueListValueResponse,
  NamedValueRefreshSecretOptionalParams,
  NamedValueRefreshSecretResponse,
  NamedValueListByServiceNextResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing NamedValue operations. */
export class NamedValueImpl implements NamedValue {
  private readonly client: ApiManagementClient;

  /**
   * Initialize a new instance of the class NamedValue class.
   * @param client Reference to the service client
   */
  constructor(client: ApiManagementClient) {
    this.client = client;
  }

  /**
   * Lists a collection of named values defined within a service instance.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param options The options parameters.
   */
  public listByService(
    resourceGroupName: string,
    serviceName: string,
    options?: NamedValueListByServiceOptionalParams,
  ): PagedAsyncIterableIterator<NamedValueContract> {
    const iter = this.listByServicePagingAll(
      resourceGroupName,
      serviceName,
      options,
    );
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
        return this.listByServicePagingPage(
          resourceGroupName,
          serviceName,
          options,
          settings,
        );
      },
    };
  }

  private async *listByServicePagingPage(
    resourceGroupName: string,
    serviceName: string,
    options?: NamedValueListByServiceOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<NamedValueContract[]> {
    let result: NamedValueListByServiceResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._listByService(
        resourceGroupName,
        serviceName,
        options,
      );
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listByServiceNext(
        resourceGroupName,
        serviceName,
        continuationToken,
        options,
      );
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listByServicePagingAll(
    resourceGroupName: string,
    serviceName: string,
    options?: NamedValueListByServiceOptionalParams,
  ): AsyncIterableIterator<NamedValueContract> {
    for await (const page of this.listByServicePagingPage(
      resourceGroupName,
      serviceName,
      options,
    )) {
      yield* page;
    }
  }

  /**
   * Lists a collection of named values defined within a service instance.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param options The options parameters.
   */
  private _listByService(
    resourceGroupName: string,
    serviceName: string,
    options?: NamedValueListByServiceOptionalParams,
  ): Promise<NamedValueListByServiceResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, serviceName, options },
      listByServiceOperationSpec,
    );
  }

  /**
   * Gets the entity state (Etag) version of the named value specified by its identifier.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param namedValueId Identifier of the NamedValue.
   * @param options The options parameters.
   */
  getEntityTag(
    resourceGroupName: string,
    serviceName: string,
    namedValueId: string,
    options?: NamedValueGetEntityTagOptionalParams,
  ): Promise<NamedValueGetEntityTagResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, serviceName, namedValueId, options },
      getEntityTagOperationSpec,
    );
  }

  /**
   * Gets the details of the named value specified by its identifier.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param namedValueId Identifier of the NamedValue.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    serviceName: string,
    namedValueId: string,
    options?: NamedValueGetOptionalParams,
  ): Promise<NamedValueGetResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, serviceName, namedValueId, options },
      getOperationSpec,
    );
  }

  /**
   * Creates or updates named value.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param namedValueId Identifier of the NamedValue.
   * @param parameters Create parameters.
   * @param options The options parameters.
   */
  async beginCreateOrUpdate(
    resourceGroupName: string,
    serviceName: string,
    namedValueId: string,
    parameters: NamedValueCreateContract,
    options?: NamedValueCreateOrUpdateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<NamedValueCreateOrUpdateResponse>,
      NamedValueCreateOrUpdateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<NamedValueCreateOrUpdateResponse> => {
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
      args: {
        resourceGroupName,
        serviceName,
        namedValueId,
        parameters,
        options,
      },
      spec: createOrUpdateOperationSpec,
    });
    const poller = await createHttpPoller<
      NamedValueCreateOrUpdateResponse,
      OperationState<NamedValueCreateOrUpdateResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      resourceLocationConfig: "location",
    });
    await poller.poll();
    return poller;
  }

  /**
   * Creates or updates named value.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param namedValueId Identifier of the NamedValue.
   * @param parameters Create parameters.
   * @param options The options parameters.
   */
  async beginCreateOrUpdateAndWait(
    resourceGroupName: string,
    serviceName: string,
    namedValueId: string,
    parameters: NamedValueCreateContract,
    options?: NamedValueCreateOrUpdateOptionalParams,
  ): Promise<NamedValueCreateOrUpdateResponse> {
    const poller = await this.beginCreateOrUpdate(
      resourceGroupName,
      serviceName,
      namedValueId,
      parameters,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Updates the specific named value.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param namedValueId Identifier of the NamedValue.
   * @param ifMatch ETag of the Entity. ETag should match the current entity state from the header
   *                response of the GET request or it should be * for unconditional update.
   * @param parameters Update parameters.
   * @param options The options parameters.
   */
  async beginUpdate(
    resourceGroupName: string,
    serviceName: string,
    namedValueId: string,
    ifMatch: string,
    parameters: NamedValueUpdateParameters,
    options?: NamedValueUpdateOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<NamedValueUpdateResponse>,
      NamedValueUpdateResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<NamedValueUpdateResponse> => {
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
      args: {
        resourceGroupName,
        serviceName,
        namedValueId,
        ifMatch,
        parameters,
        options,
      },
      spec: updateOperationSpec,
    });
    const poller = await createHttpPoller<
      NamedValueUpdateResponse,
      OperationState<NamedValueUpdateResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      resourceLocationConfig: "location",
    });
    await poller.poll();
    return poller;
  }

  /**
   * Updates the specific named value.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param namedValueId Identifier of the NamedValue.
   * @param ifMatch ETag of the Entity. ETag should match the current entity state from the header
   *                response of the GET request or it should be * for unconditional update.
   * @param parameters Update parameters.
   * @param options The options parameters.
   */
  async beginUpdateAndWait(
    resourceGroupName: string,
    serviceName: string,
    namedValueId: string,
    ifMatch: string,
    parameters: NamedValueUpdateParameters,
    options?: NamedValueUpdateOptionalParams,
  ): Promise<NamedValueUpdateResponse> {
    const poller = await this.beginUpdate(
      resourceGroupName,
      serviceName,
      namedValueId,
      ifMatch,
      parameters,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * Deletes specific named value from the API Management service instance.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param namedValueId Identifier of the NamedValue.
   * @param ifMatch ETag of the Entity. ETag should match the current entity state from the header
   *                response of the GET request or it should be * for unconditional update.
   * @param options The options parameters.
   */
  delete(
    resourceGroupName: string,
    serviceName: string,
    namedValueId: string,
    ifMatch: string,
    options?: NamedValueDeleteOptionalParams,
  ): Promise<void> {
    return this.client.sendOperationRequest(
      { resourceGroupName, serviceName, namedValueId, ifMatch, options },
      deleteOperationSpec,
    );
  }

  /**
   * Gets the secret of the named value specified by its identifier.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param namedValueId Identifier of the NamedValue.
   * @param options The options parameters.
   */
  listValue(
    resourceGroupName: string,
    serviceName: string,
    namedValueId: string,
    options?: NamedValueListValueOptionalParams,
  ): Promise<NamedValueListValueResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, serviceName, namedValueId, options },
      listValueOperationSpec,
    );
  }

  /**
   * Refresh the secret of the named value specified by its identifier.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param namedValueId Identifier of the NamedValue.
   * @param options The options parameters.
   */
  async beginRefreshSecret(
    resourceGroupName: string,
    serviceName: string,
    namedValueId: string,
    options?: NamedValueRefreshSecretOptionalParams,
  ): Promise<
    SimplePollerLike<
      OperationState<NamedValueRefreshSecretResponse>,
      NamedValueRefreshSecretResponse
    >
  > {
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec,
    ): Promise<NamedValueRefreshSecretResponse> => {
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
      args: { resourceGroupName, serviceName, namedValueId, options },
      spec: refreshSecretOperationSpec,
    });
    const poller = await createHttpPoller<
      NamedValueRefreshSecretResponse,
      OperationState<NamedValueRefreshSecretResponse>
    >(lro, {
      restoreFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      resourceLocationConfig: "location",
    });
    await poller.poll();
    return poller;
  }

  /**
   * Refresh the secret of the named value specified by its identifier.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param namedValueId Identifier of the NamedValue.
   * @param options The options parameters.
   */
  async beginRefreshSecretAndWait(
    resourceGroupName: string,
    serviceName: string,
    namedValueId: string,
    options?: NamedValueRefreshSecretOptionalParams,
  ): Promise<NamedValueRefreshSecretResponse> {
    const poller = await this.beginRefreshSecret(
      resourceGroupName,
      serviceName,
      namedValueId,
      options,
    );
    return poller.pollUntilDone();
  }

  /**
   * ListByServiceNext
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param serviceName The name of the API Management service.
   * @param nextLink The nextLink from the previous successful call to the ListByService method.
   * @param options The options parameters.
   */
  private _listByServiceNext(
    resourceGroupName: string,
    serviceName: string,
    nextLink: string,
    options?: NamedValueListByServiceNextOptionalParams,
  ): Promise<NamedValueListByServiceNextResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, serviceName, nextLink, options },
      listByServiceNextOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listByServiceOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/namedValues",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.NamedValueCollection,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.filter,
    Parameters.top,
    Parameters.skip,
    Parameters.isKeyVaultRefreshFailed,
  ],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.serviceName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const getEntityTagOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/namedValues/{namedValueId}",
  httpMethod: "HEAD",
  responses: {
    200: {
      headersMapper: Mappers.NamedValueGetEntityTagHeaders,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.serviceName,
    Parameters.namedValueId,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const getOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/namedValues/{namedValueId}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.NamedValueContract,
      headersMapper: Mappers.NamedValueGetHeaders,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.serviceName,
    Parameters.namedValueId,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const createOrUpdateOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/namedValues/{namedValueId}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.NamedValueContract,
      headersMapper: Mappers.NamedValueCreateOrUpdateHeaders,
    },
    201: {
      bodyMapper: Mappers.NamedValueContract,
      headersMapper: Mappers.NamedValueCreateOrUpdateHeaders,
    },
    202: {
      bodyMapper: Mappers.NamedValueContract,
      headersMapper: Mappers.NamedValueCreateOrUpdateHeaders,
    },
    204: {
      bodyMapper: Mappers.NamedValueContract,
      headersMapper: Mappers.NamedValueCreateOrUpdateHeaders,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  requestBody: Parameters.parameters61,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.serviceName,
    Parameters.namedValueId,
  ],
  headerParameters: [
    Parameters.contentType,
    Parameters.accept,
    Parameters.ifMatch,
  ],
  mediaType: "json",
  serializer,
};
const updateOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/namedValues/{namedValueId}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.NamedValueContract,
      headersMapper: Mappers.NamedValueUpdateHeaders,
    },
    201: {
      bodyMapper: Mappers.NamedValueContract,
      headersMapper: Mappers.NamedValueUpdateHeaders,
    },
    202: {
      bodyMapper: Mappers.NamedValueContract,
      headersMapper: Mappers.NamedValueUpdateHeaders,
    },
    204: {
      bodyMapper: Mappers.NamedValueContract,
      headersMapper: Mappers.NamedValueUpdateHeaders,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  requestBody: Parameters.parameters62,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.serviceName,
    Parameters.namedValueId,
  ],
  headerParameters: [
    Parameters.contentType,
    Parameters.accept,
    Parameters.ifMatch1,
  ],
  mediaType: "json",
  serializer,
};
const deleteOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/namedValues/{namedValueId}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    204: {},
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.serviceName,
    Parameters.namedValueId,
  ],
  headerParameters: [Parameters.accept, Parameters.ifMatch1],
  serializer,
};
const listValueOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/namedValues/{namedValueId}/listValue",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.NamedValueSecretContract,
      headersMapper: Mappers.NamedValueListValueHeaders,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.serviceName,
    Parameters.namedValueId,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const refreshSecretOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ApiManagement/service/{serviceName}/namedValues/{namedValueId}/refreshSecret",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.NamedValueContract,
      headersMapper: Mappers.NamedValueRefreshSecretHeaders,
    },
    201: {
      bodyMapper: Mappers.NamedValueContract,
      headersMapper: Mappers.NamedValueRefreshSecretHeaders,
    },
    202: {
      bodyMapper: Mappers.NamedValueContract,
      headersMapper: Mappers.NamedValueRefreshSecretHeaders,
    },
    204: {
      bodyMapper: Mappers.NamedValueContract,
      headersMapper: Mappers.NamedValueRefreshSecretHeaders,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.serviceName,
    Parameters.namedValueId,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
const listByServiceNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.NamedValueCollection,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  urlParameters: [
    Parameters.$host,
    Parameters.resourceGroupName,
    Parameters.subscriptionId,
    Parameters.nextLink,
    Parameters.serviceName,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
