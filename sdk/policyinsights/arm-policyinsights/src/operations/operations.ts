/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

import * as msRest from "@azure/ms-rest-js";
import * as Models from "../models";
import * as Mappers from "../models/operationsMappers";
import * as Parameters from "../models/parameters";
import { PolicyInsightsClientContext } from "../policyInsightsClientContext";

/** Class representing a Operations. */
export class Operations {
  private readonly client: PolicyInsightsClientContext;

  /**
   * Create a Operations.
   * @param {PolicyInsightsClientContext} client Reference to the service client.
   */
  constructor(client: PolicyInsightsClientContext) {
    this.client = client;
  }

  /**
   * Lists available operations.
   * @param [options] The optional parameters
   * @returns Promise<Models.OperationsListResponse>
   */
  list(options?: msRest.RequestOptionsBase): Promise<Models.OperationsListResponse>;
  /**
   * @param callback The callback
   */
  list(callback: msRest.ServiceCallback<Models.OperationsListResults>): void;
  /**
   * @param options The optional parameters
   * @param callback The callback
   */
  list(options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.OperationsListResults>): void;
  list(options?: msRest.RequestOptionsBase | msRest.ServiceCallback<Models.OperationsListResults>, callback?: msRest.ServiceCallback<Models.OperationsListResults>): Promise<Models.OperationsListResponse> {
    return this.client.sendOperationRequest(
      {
        options
      },
      listOperationSpec,
      callback) as Promise<Models.OperationsListResponse>;
  }
}

// Operation Specifications
const serializer = new msRest.Serializer(Mappers);
const listOperationSpec: msRest.OperationSpec = {
  httpMethod: "GET",
  path: "providers/Microsoft.PolicyInsights/operations",
  queryParameters: [
    Parameters.apiVersion2
  ],
  headerParameters: [
    Parameters.acceptLanguage
  ],
  responses: {
    200: {
      bodyMapper: Mappers.OperationsListResults
    },
    default: {
      bodyMapper: Mappers.QueryFailure
    }
  },
  serializer
};
