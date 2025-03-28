/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { WorkflowRunActionRepetitions } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { LogicManagementClient } from "../logicManagementClient.js";
import {
  WorkflowRunActionRepetitionDefinition,
  WorkflowRunActionRepetitionsListOptionalParams,
  WorkflowRunActionRepetitionsListResponse,
  ExpressionRoot,
  WorkflowRunActionRepetitionsListExpressionTracesOptionalParams,
  WorkflowRunActionRepetitionsListExpressionTracesResponse,
  WorkflowRunActionRepetitionsGetOptionalParams,
  WorkflowRunActionRepetitionsGetResponse
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing WorkflowRunActionRepetitions operations. */
export class WorkflowRunActionRepetitionsImpl
  implements WorkflowRunActionRepetitions {
  private readonly client: LogicManagementClient;

  /**
   * Initialize a new instance of the class WorkflowRunActionRepetitions class.
   * @param client Reference to the service client
   */
  constructor(client: LogicManagementClient) {
    this.client = client;
  }

  /**
   * Get all of a workflow run action repetitions.
   * @param resourceGroupName The resource group name.
   * @param workflowName The workflow name.
   * @param runName The workflow run name.
   * @param actionName The workflow action name.
   * @param options The options parameters.
   */
  public list(
    resourceGroupName: string,
    workflowName: string,
    runName: string,
    actionName: string,
    options?: WorkflowRunActionRepetitionsListOptionalParams
  ): PagedAsyncIterableIterator<WorkflowRunActionRepetitionDefinition> {
    const iter = this.listPagingAll(
      resourceGroupName,
      workflowName,
      runName,
      actionName,
      options
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
        return this.listPagingPage(
          resourceGroupName,
          workflowName,
          runName,
          actionName,
          options,
          settings
        );
      }
    };
  }

  private async *listPagingPage(
    resourceGroupName: string,
    workflowName: string,
    runName: string,
    actionName: string,
    options?: WorkflowRunActionRepetitionsListOptionalParams,
    _settings?: PageSettings
  ): AsyncIterableIterator<WorkflowRunActionRepetitionDefinition[]> {
    let result: WorkflowRunActionRepetitionsListResponse;
    result = await this._list(
      resourceGroupName,
      workflowName,
      runName,
      actionName,
      options
    );
    yield result.value || [];
  }

  private async *listPagingAll(
    resourceGroupName: string,
    workflowName: string,
    runName: string,
    actionName: string,
    options?: WorkflowRunActionRepetitionsListOptionalParams
  ): AsyncIterableIterator<WorkflowRunActionRepetitionDefinition> {
    for await (const page of this.listPagingPage(
      resourceGroupName,
      workflowName,
      runName,
      actionName,
      options
    )) {
      yield* page;
    }
  }

  /**
   * Lists a workflow run expression trace.
   * @param resourceGroupName The resource group name.
   * @param workflowName The workflow name.
   * @param runName The workflow run name.
   * @param actionName The workflow action name.
   * @param repetitionName The workflow repetition.
   * @param options The options parameters.
   */
  public listExpressionTraces(
    resourceGroupName: string,
    workflowName: string,
    runName: string,
    actionName: string,
    repetitionName: string,
    options?: WorkflowRunActionRepetitionsListExpressionTracesOptionalParams
  ): PagedAsyncIterableIterator<ExpressionRoot> {
    const iter = this.listExpressionTracesPagingAll(
      resourceGroupName,
      workflowName,
      runName,
      actionName,
      repetitionName,
      options
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
        return this.listExpressionTracesPagingPage(
          resourceGroupName,
          workflowName,
          runName,
          actionName,
          repetitionName,
          options,
          settings
        );
      }
    };
  }

  private async *listExpressionTracesPagingPage(
    resourceGroupName: string,
    workflowName: string,
    runName: string,
    actionName: string,
    repetitionName: string,
    options?: WorkflowRunActionRepetitionsListExpressionTracesOptionalParams,
    _settings?: PageSettings
  ): AsyncIterableIterator<ExpressionRoot[]> {
    let result: WorkflowRunActionRepetitionsListExpressionTracesResponse;
    result = await this._listExpressionTraces(
      resourceGroupName,
      workflowName,
      runName,
      actionName,
      repetitionName,
      options
    );
    yield result.inputs || [];
  }

  private async *listExpressionTracesPagingAll(
    resourceGroupName: string,
    workflowName: string,
    runName: string,
    actionName: string,
    repetitionName: string,
    options?: WorkflowRunActionRepetitionsListExpressionTracesOptionalParams
  ): AsyncIterableIterator<ExpressionRoot> {
    for await (const page of this.listExpressionTracesPagingPage(
      resourceGroupName,
      workflowName,
      runName,
      actionName,
      repetitionName,
      options
    )) {
      yield* page;
    }
  }

  /**
   * Get all of a workflow run action repetitions.
   * @param resourceGroupName The resource group name.
   * @param workflowName The workflow name.
   * @param runName The workflow run name.
   * @param actionName The workflow action name.
   * @param options The options parameters.
   */
  private _list(
    resourceGroupName: string,
    workflowName: string,
    runName: string,
    actionName: string,
    options?: WorkflowRunActionRepetitionsListOptionalParams
  ): Promise<WorkflowRunActionRepetitionsListResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, workflowName, runName, actionName, options },
      listOperationSpec
    );
  }

  /**
   * Get a workflow run action repetition.
   * @param resourceGroupName The resource group name.
   * @param workflowName The workflow name.
   * @param runName The workflow run name.
   * @param actionName The workflow action name.
   * @param repetitionName The workflow repetition.
   * @param options The options parameters.
   */
  get(
    resourceGroupName: string,
    workflowName: string,
    runName: string,
    actionName: string,
    repetitionName: string,
    options?: WorkflowRunActionRepetitionsGetOptionalParams
  ): Promise<WorkflowRunActionRepetitionsGetResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        workflowName,
        runName,
        actionName,
        repetitionName,
        options
      },
      getOperationSpec
    );
  }

  /**
   * Lists a workflow run expression trace.
   * @param resourceGroupName The resource group name.
   * @param workflowName The workflow name.
   * @param runName The workflow run name.
   * @param actionName The workflow action name.
   * @param repetitionName The workflow repetition.
   * @param options The options parameters.
   */
  private _listExpressionTraces(
    resourceGroupName: string,
    workflowName: string,
    runName: string,
    actionName: string,
    repetitionName: string,
    options?: WorkflowRunActionRepetitionsListExpressionTracesOptionalParams
  ): Promise<WorkflowRunActionRepetitionsListExpressionTracesResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        workflowName,
        runName,
        actionName,
        repetitionName,
        options
      },
      listExpressionTracesOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/workflows/{workflowName}/runs/{runName}/actions/{actionName}/repetitions",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.WorkflowRunActionRepetitionDefinitionCollection
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.workflowName,
    Parameters.runName,
    Parameters.actionName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const getOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/workflows/{workflowName}/runs/{runName}/actions/{actionName}/repetitions/{repetitionName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.WorkflowRunActionRepetitionDefinition
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.workflowName,
    Parameters.runName,
    Parameters.actionName,
    Parameters.repetitionName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listExpressionTracesOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Logic/workflows/{workflowName}/runs/{runName}/actions/{actionName}/repetitions/{repetitionName}/listExpressionTraces",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.ExpressionTraces
    },
    default: {
      bodyMapper: Mappers.ErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.workflowName,
    Parameters.runName,
    Parameters.actionName,
    Parameters.repetitionName
  ],
  headerParameters: [Parameters.accept],
  serializer
};
