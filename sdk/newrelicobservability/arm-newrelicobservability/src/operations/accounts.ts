/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import { Accounts } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { NewRelicObservability } from "../newRelicObservability.js";
import {
  AccountResource,
  AccountsListNextOptionalParams,
  AccountsListOptionalParams,
  AccountsListOperationResponse,
  AccountsListNextResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing Accounts operations. */
export class AccountsImpl implements Accounts {
  private readonly client: NewRelicObservability;

  /**
   * Initialize a new instance of the class Accounts class.
   * @param client Reference to the service client
   */
  constructor(client: NewRelicObservability) {
    this.client = client;
  }

  /**
   * List all the existing accounts
   * @param userEmail User Email.
   * @param location Location for NewRelic.
   * @param options The options parameters.
   */
  public list(
    userEmail: string,
    location: string,
    options?: AccountsListOptionalParams,
  ): PagedAsyncIterableIterator<AccountResource> {
    const iter = this.listPagingAll(userEmail, location, options);
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
        return this.listPagingPage(userEmail, location, options, settings);
      },
    };
  }

  private async *listPagingPage(
    userEmail: string,
    location: string,
    options?: AccountsListOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<AccountResource[]> {
    let result: AccountsListOperationResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._list(userEmail, location, options);
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._listNext(continuationToken, options);
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *listPagingAll(
    userEmail: string,
    location: string,
    options?: AccountsListOptionalParams,
  ): AsyncIterableIterator<AccountResource> {
    for await (const page of this.listPagingPage(
      userEmail,
      location,
      options,
    )) {
      yield* page;
    }
  }

  /**
   * List all the existing accounts
   * @param userEmail User Email.
   * @param location Location for NewRelic.
   * @param options The options parameters.
   */
  private _list(
    userEmail: string,
    location: string,
    options?: AccountsListOptionalParams,
  ): Promise<AccountsListOperationResponse> {
    return this.client.sendOperationRequest(
      { userEmail, location, options },
      listOperationSpec,
    );
  }

  /**
   * ListNext
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  private _listNext(
    nextLink: string,
    options?: AccountsListNextOptionalParams,
  ): Promise<AccountsListNextResponse> {
    return this.client.sendOperationRequest(
      { nextLink, options },
      listNextOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/providers/NewRelic.Observability/accounts",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.AccountsListResponse,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  queryParameters: [
    Parameters.apiVersion,
    Parameters.userEmail,
    Parameters.location,
  ],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  headerParameters: [Parameters.accept],
  serializer,
};
const listNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.AccountsListResponse,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  urlParameters: [
    Parameters.$host,
    Parameters.nextLink,
    Parameters.subscriptionId,
  ],
  headerParameters: [Parameters.accept],
  serializer,
};
