/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { ScopeAccessReviewInstance } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { AuthorizationManagementClient } from "../authorizationManagementClient.js";
import {
  ScopeAccessReviewInstanceStopOptionalParams,
  RecordAllDecisionsProperties,
  ScopeAccessReviewInstanceRecordAllDecisionsOptionalParams,
  ScopeAccessReviewInstanceResetDecisionsOptionalParams,
  ScopeAccessReviewInstanceApplyDecisionsOptionalParams,
  ScopeAccessReviewInstanceSendRemindersOptionalParams
} from "../models/index.js";

/** Class containing ScopeAccessReviewInstance operations. */
export class ScopeAccessReviewInstanceImpl
  implements ScopeAccessReviewInstance {
  private readonly client: AuthorizationManagementClient;

  /**
   * Initialize a new instance of the class ScopeAccessReviewInstance class.
   * @param client Reference to the service client
   */
  constructor(client: AuthorizationManagementClient) {
    this.client = client;
  }

  /**
   * An action to stop an access review instance.
   * @param scope The scope of the resource.
   * @param scheduleDefinitionId The id of the access review schedule definition.
   * @param id The id of the access review instance.
   * @param options The options parameters.
   */
  stop(
    scope: string,
    scheduleDefinitionId: string,
    id: string,
    options?: ScopeAccessReviewInstanceStopOptionalParams
  ): Promise<void> {
    return this.client.sendOperationRequest(
      { scope, scheduleDefinitionId, id, options },
      stopOperationSpec
    );
  }

  /**
   * An action to approve/deny all decisions for a review with certain filters.
   * @param scope The scope of the resource.
   * @param scheduleDefinitionId The id of the access review schedule definition.
   * @param id The id of the access review instance.
   * @param properties Record all decisions payload.
   * @param options The options parameters.
   */
  recordAllDecisions(
    scope: string,
    scheduleDefinitionId: string,
    id: string,
    properties: RecordAllDecisionsProperties,
    options?: ScopeAccessReviewInstanceRecordAllDecisionsOptionalParams
  ): Promise<void> {
    return this.client.sendOperationRequest(
      { scope, scheduleDefinitionId, id, properties, options },
      recordAllDecisionsOperationSpec
    );
  }

  /**
   * An action to reset all decisions for an access review instance.
   * @param scope The scope of the resource.
   * @param scheduleDefinitionId The id of the access review schedule definition.
   * @param id The id of the access review instance.
   * @param options The options parameters.
   */
  resetDecisions(
    scope: string,
    scheduleDefinitionId: string,
    id: string,
    options?: ScopeAccessReviewInstanceResetDecisionsOptionalParams
  ): Promise<void> {
    return this.client.sendOperationRequest(
      { scope, scheduleDefinitionId, id, options },
      resetDecisionsOperationSpec
    );
  }

  /**
   * An action to apply all decisions for an access review instance.
   * @param scope The scope of the resource.
   * @param scheduleDefinitionId The id of the access review schedule definition.
   * @param id The id of the access review instance.
   * @param options The options parameters.
   */
  applyDecisions(
    scope: string,
    scheduleDefinitionId: string,
    id: string,
    options?: ScopeAccessReviewInstanceApplyDecisionsOptionalParams
  ): Promise<void> {
    return this.client.sendOperationRequest(
      { scope, scheduleDefinitionId, id, options },
      applyDecisionsOperationSpec
    );
  }

  /**
   * An action to send reminders for an access review instance.
   * @param scope The scope of the resource.
   * @param scheduleDefinitionId The id of the access review schedule definition.
   * @param id The id of the access review instance.
   * @param options The options parameters.
   */
  sendReminders(
    scope: string,
    scheduleDefinitionId: string,
    id: string,
    options?: ScopeAccessReviewInstanceSendRemindersOptionalParams
  ): Promise<void> {
    return this.client.sendOperationRequest(
      { scope, scheduleDefinitionId, id, options },
      sendRemindersOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const stopOperationSpec: coreClient.OperationSpec = {
  path:
    "/{scope}/providers/Microsoft.Authorization/accessReviewScheduleDefinitions/{scheduleDefinitionId}/instances/{id}/stop",
  httpMethod: "POST",
  responses: {
    204: {},
    default: {
      bodyMapper: Mappers.ErrorDefinition
    }
  },
  queryParameters: [Parameters.apiVersion3],
  urlParameters: [
    Parameters.$host,
    Parameters.scheduleDefinitionId,
    Parameters.id,
    Parameters.scope1
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const recordAllDecisionsOperationSpec: coreClient.OperationSpec = {
  path:
    "/{scope}/providers/Microsoft.Authorization/accessReviewScheduleDefinitions/{scheduleDefinitionId}/instances/{id}/recordAllDecisions",
  httpMethod: "POST",
  responses: {
    204: {},
    default: {
      bodyMapper: Mappers.ErrorDefinition
    }
  },
  requestBody: Parameters.properties4,
  queryParameters: [Parameters.apiVersion3],
  urlParameters: [
    Parameters.$host,
    Parameters.scheduleDefinitionId,
    Parameters.id,
    Parameters.scope1
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const resetDecisionsOperationSpec: coreClient.OperationSpec = {
  path:
    "/{scope}/providers/Microsoft.Authorization/accessReviewScheduleDefinitions/{scheduleDefinitionId}/instances/{id}/resetDecisions",
  httpMethod: "POST",
  responses: {
    204: {},
    default: {
      bodyMapper: Mappers.ErrorDefinition
    }
  },
  queryParameters: [Parameters.apiVersion3],
  urlParameters: [
    Parameters.$host,
    Parameters.scheduleDefinitionId,
    Parameters.id,
    Parameters.scope1
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const applyDecisionsOperationSpec: coreClient.OperationSpec = {
  path:
    "/{scope}/providers/Microsoft.Authorization/accessReviewScheduleDefinitions/{scheduleDefinitionId}/instances/{id}/applyDecisions",
  httpMethod: "POST",
  responses: {
    204: {},
    default: {
      bodyMapper: Mappers.ErrorDefinition
    }
  },
  queryParameters: [Parameters.apiVersion3],
  urlParameters: [
    Parameters.$host,
    Parameters.scheduleDefinitionId,
    Parameters.id,
    Parameters.scope1
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const sendRemindersOperationSpec: coreClient.OperationSpec = {
  path:
    "/{scope}/providers/Microsoft.Authorization/accessReviewScheduleDefinitions/{scheduleDefinitionId}/instances/{id}/sendReminders",
  httpMethod: "POST",
  responses: {
    204: {},
    default: {
      bodyMapper: Mappers.ErrorDefinition
    }
  },
  queryParameters: [Parameters.apiVersion3],
  urlParameters: [
    Parameters.$host,
    Parameters.scheduleDefinitionId,
    Parameters.id,
    Parameters.scope1
  ],
  headerParameters: [Parameters.accept],
  serializer
};
