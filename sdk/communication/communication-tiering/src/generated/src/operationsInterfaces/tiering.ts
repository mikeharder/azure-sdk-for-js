/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  TieringGetByResourceIdOptionalParams,
  TieringGetByResourceIdResponse
} from "../models/index.js";

/** Interface representing a Tiering. */
export interface Tiering {
  /**
   *  Get the tiering data for a given resource
   * @param resourceId Resource Id. Must be a valid GUID
   * @param options The options parameters.
   */
  getByResourceId(
    resourceId: string,
    options?: TieringGetByResourceIdOptionalParams
  ): Promise<TieringGetByResourceIdResponse>;
}
