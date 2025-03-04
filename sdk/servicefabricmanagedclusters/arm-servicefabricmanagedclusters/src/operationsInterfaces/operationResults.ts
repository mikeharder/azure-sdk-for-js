/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  OperationResultsGetOptionalParams,
  OperationResultsGetResponse,
} from "../models/index.js";

/** Interface representing a OperationResults. */
export interface OperationResults {
  /**
   * Get long running operation result.
   * @param location The location for the cluster code versions. This is different from cluster location.
   * @param operationId operation identifier.
   * @param options The options parameters.
   */
  get(
    location: string,
    operationId: string,
    options?: OperationResultsGetOptionalParams,
  ): Promise<OperationResultsGetResponse>;
}
