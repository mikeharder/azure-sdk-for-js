/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { setContinuationToken } from "../pagingHelper.js";
import { AppAttachPackageInfo } from "../operationsInterfaces/index.js";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers.js";
import * as Parameters from "../models/parameters.js";
import { DesktopVirtualizationAPIClient } from "../desktopVirtualizationAPIClient.js";
import {
  AppAttachPackage,
  ImportPackageInfoRequest,
  AppAttachPackageInfoImportNextOptionalParams,
  AppAttachPackageInfoImportOptionalParams,
  AppAttachPackageInfoImportResponse,
  AppAttachPackageInfoImportNextResponse,
} from "../models/index.js";

/// <reference lib="esnext.asynciterable" />
/** Class containing AppAttachPackageInfo operations. */
export class AppAttachPackageInfoImpl implements AppAttachPackageInfo {
  private readonly client: DesktopVirtualizationAPIClient;

  /**
   * Initialize a new instance of the class AppAttachPackageInfo class.
   * @param client Reference to the service client
   */
  constructor(client: DesktopVirtualizationAPIClient) {
    this.client = client;
  }

  /**
   * Gets information from a package given the path to the package.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param hostPoolName The name of the host pool within the specified resource group
   * @param importPackageInfoRequest Object containing URI to package image and other optional properties
   * @param options The options parameters.
   */
  public listImport(
    resourceGroupName: string,
    hostPoolName: string,
    importPackageInfoRequest: ImportPackageInfoRequest,
    options?: AppAttachPackageInfoImportOptionalParams,
  ): PagedAsyncIterableIterator<AppAttachPackage> {
    const iter = this.importPagingAll(
      resourceGroupName,
      hostPoolName,
      importPackageInfoRequest,
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
        return this.importPagingPage(
          resourceGroupName,
          hostPoolName,
          importPackageInfoRequest,
          options,
          settings,
        );
      },
    };
  }

  private async *importPagingPage(
    resourceGroupName: string,
    hostPoolName: string,
    importPackageInfoRequest: ImportPackageInfoRequest,
    options?: AppAttachPackageInfoImportOptionalParams,
    settings?: PageSettings,
  ): AsyncIterableIterator<AppAttachPackage[]> {
    let result: AppAttachPackageInfoImportResponse;
    let continuationToken = settings?.continuationToken;
    if (!continuationToken) {
      result = await this._import(
        resourceGroupName,
        hostPoolName,
        importPackageInfoRequest,
        options,
      );
      let page = result.value || [];
      continuationToken = result.nextLink;
      setContinuationToken(page, continuationToken);
      yield page;
    }
    while (continuationToken) {
      result = await this._importNext(
        resourceGroupName,
        hostPoolName,
        importPackageInfoRequest,
        continuationToken,
        options,
      );
      continuationToken = result.nextLink;
      let page = result.value || [];
      setContinuationToken(page, continuationToken);
      yield page;
    }
  }

  private async *importPagingAll(
    resourceGroupName: string,
    hostPoolName: string,
    importPackageInfoRequest: ImportPackageInfoRequest,
    options?: AppAttachPackageInfoImportOptionalParams,
  ): AsyncIterableIterator<AppAttachPackage> {
    for await (const page of this.importPagingPage(
      resourceGroupName,
      hostPoolName,
      importPackageInfoRequest,
      options,
    )) {
      yield* page;
    }
  }

  /**
   * Gets information from a package given the path to the package.
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param hostPoolName The name of the host pool within the specified resource group
   * @param importPackageInfoRequest Object containing URI to package image and other optional properties
   * @param options The options parameters.
   */
  private _import(
    resourceGroupName: string,
    hostPoolName: string,
    importPackageInfoRequest: ImportPackageInfoRequest,
    options?: AppAttachPackageInfoImportOptionalParams,
  ): Promise<AppAttachPackageInfoImportResponse> {
    return this.client.sendOperationRequest(
      { resourceGroupName, hostPoolName, importPackageInfoRequest, options },
      importOperationSpec,
    );
  }

  /**
   * ImportNext
   * @param resourceGroupName The name of the resource group. The name is case insensitive.
   * @param hostPoolName The name of the host pool within the specified resource group
   * @param importPackageInfoRequest Object containing URI to package image and other optional properties
   * @param nextLink The nextLink from the previous successful call to the Import method.
   * @param options The options parameters.
   */
  private _importNext(
    resourceGroupName: string,
    hostPoolName: string,
    importPackageInfoRequest: ImportPackageInfoRequest,
    nextLink: string,
    options?: AppAttachPackageInfoImportNextOptionalParams,
  ): Promise<AppAttachPackageInfoImportNextResponse> {
    return this.client.sendOperationRequest(
      {
        resourceGroupName,
        hostPoolName,
        importPackageInfoRequest,
        nextLink,
        options,
      },
      importNextOperationSpec,
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const importOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DesktopVirtualization/hostPools/{hostPoolName}/importAppAttachPackageInfo",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.AppAttachPackageList,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  requestBody: Parameters.importPackageInfoRequest,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.hostPoolName,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
const importNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.AppAttachPackageList,
    },
    default: {
      bodyMapper: Mappers.ErrorResponse,
    },
  },
  urlParameters: [
    Parameters.$host,
    Parameters.nextLink,
    Parameters.subscriptionId,
    Parameters.resourceGroupName,
    Parameters.hostPoolName,
  ],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer,
};
