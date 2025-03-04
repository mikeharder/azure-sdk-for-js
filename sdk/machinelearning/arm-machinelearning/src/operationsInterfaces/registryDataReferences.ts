/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import {
  GetBlobReferenceSASRequestDto,
  RegistryDataReferencesGetBlobReferenceSASOptionalParams,
  RegistryDataReferencesGetBlobReferenceSASResponse,
} from "../models/index.js";

/** Interface representing a RegistryDataReferences. */
export interface RegistryDataReferences {
  /**
   * Get blob reference SAS Uri.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param registryName Name of Azure Machine Learning registry. This is case-insensitive
   * @param name Data reference name.
   * @param version Version identifier.
   * @param body Asset id and blob uri.
   * @param options The options parameters.
   */
  getBlobReferenceSAS(
    resourceGroupName: string,
    registryName: string,
    name: string,
    version: string,
    body: GetBlobReferenceSASRequestDto,
    options?: RegistryDataReferencesGetBlobReferenceSASOptionalParams,
  ): Promise<RegistryDataReferencesGetBlobReferenceSASResponse>;
}
