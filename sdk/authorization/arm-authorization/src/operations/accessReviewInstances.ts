/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import { AccessReviewInstances } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { AuthorizationManagementClient } from "../authorizationManagementClient.js";
import {
  AccessReviewInstance,
  AccessReviewInstancesListNextOptionalParams,
  AccessReviewInstancesListOptionalParams,
  AccessReviewInstancesListResponse,
  AccessReviewInstancesGetByIdOptionalParams,
  AccessReviewInstancesGetByIdResponse,
  AccessReviewInstanceProperties,
  AccessReviewInstancesCreateOptionalParams,
  AccessReviewInstancesCreateResponse,
  AccessReviewInstancesListNextResponse
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing AccessReviewInstances operations. */
export class AccessReviewInstancesImpl implements AccessReviewInstances {
  private readonly client: AuthorizationManagementClient;

  /**
   * Initialize a new instance of the class AccessReviewInstances class.
   * @param client Reference to the service client
   */
  constructor(client: AuthorizationManagementClient) {
    this.client = client;
  }

  /**
   * Get access review instances
   * @param scheduleDefinitionId The id of the access review schedule definition.
   * @param options The options parameters.
   */
  public list(
    scheduleDefinitionId: string,
    options?: AccessReviewInstancesListOptionalParams
  ): PagedAsyncIterableIterator<AccessReviewInstance> {
    const iter = this.listPagingAll(scheduleDefinitionId, options);
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
        return this.listPagingPage(scheduleDefinitionId, options, settings);
      }
    };
  }

  private async *listPagingPage(
    scheduleDefinitionId: string,
    options?: AccessReviewInstancesListOptionalParams,
    settings?: PageSettings
  ): AsyncIterableIterator<AccessReviewInstance[]> {
    let result: AccessReviewInstancesListResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._list(scheduleDefinitionId, options);
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listNext(
        scheduleDefinitionId,
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listPagingAll(
    scheduleDefinitionId: string,
    options?: AccessReviewInstancesListOptionalParams
  ): AsyncIterableIterator<AccessReviewInstance> {
    for await (const page of this.listPagingPage(
      scheduleDefinitionId,
      options
    )) {
      yield* page;
    }
  }

  /**
   * Get access review instances
   * @param scheduleDefinitionId The id of the access review schedule definition.
   * @param options The options parameters.
   */
  private _list(
    scheduleDefinitionId: string,
    options?: AccessReviewInstancesListOptionalParams
  ): Promise<AccessReviewInstancesListResponse> {
    return this.client.sendOperationRequest(
      { scheduleDefinitionId, options },
      listOperationSpec
    );
  }

  /**
   * Get access review instances
   * @param scheduleDefinitionId The id of the access review schedule definition.
   * @param id The id of the access review instance.
   * @param options The options parameters.
   */
  getById(
    scheduleDefinitionId: string,
    id: string,
    options?: AccessReviewInstancesGetByIdOptionalParams
  ): Promise<AccessReviewInstancesGetByIdResponse> {
    return this.client.sendOperationRequest(
      { scheduleDefinitionId, id, options },
      getByIdOperationSpec
    );
  }

  /**
   * Update access review instance.
   * @param scheduleDefinitionId The id of the access review schedule definition.
   * @param id The id of the access review instance.
   * @param properties Access review instance properties.
   * @param options The options parameters.
   */
  create(
    scheduleDefinitionId: string,
    id: string,
    properties: AccessReviewInstanceProperties,
    options?: AccessReviewInstancesCreateOptionalParams
  ): Promise<AccessReviewInstancesCreateResponse> {
    return this.client.sendOperationRequest(
      { scheduleDefinitionId, id, properties, options },
      createOperationSpec
    );
  }

  /**
   * ListNext
   * @param scheduleDefinitionId The id of the access review schedule definition.
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  private _listNext(
    scheduleDefinitionId: string,
    nextLink: string,
    options?: AccessReviewInstancesListNextOptionalParams
  ): Promise<AccessReviewInstancesListNextResponse> {
    return this.client.sendOperationRequest(
      { scheduleDefinitionId, nextLink, options },
      listNextOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/accessReviewScheduleDefinitions/{scheduleDefinitionId}/instances",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.AccessReviewInstanceListResult
    },
    default: {
      bodyMapper: Mappers.ErrorDefinition
    }
  },
  queryParameters: [Parameters.filter1, Parameters.apiVersion3],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.scheduleDefinitionId
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const getByIdOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/accessReviewScheduleDefinitions/{scheduleDefinitionId}/instances/{id}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.AccessReviewInstance
    },
    default: {
      bodyMapper: Mappers.ErrorDefinition
    }
  },
  queryParameters: [Parameters.apiVersion3],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.scheduleDefinitionId,
    Parameters.id
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const createOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Authorization/accessReviewScheduleDefinitions/{scheduleDefinitionId}/instances/{id}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.AccessReviewInstance
    },
    default: {
      bodyMapper: Mappers.ErrorDefinition
    }
  },
  requestBody: Parameters.properties2,
  queryParameters: [Parameters.apiVersion3],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.scheduleDefinitionId,
    Parameters.id
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const listNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.AccessReviewInstanceListResult
    },
    default: {
      bodyMapper: Mappers.ErrorDefinition
    }
  },
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.nextLink,
    Parameters.scheduleDefinitionId
  ],
  headerParameters: [Parameters.accept],
  serializer
};
