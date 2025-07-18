## API Report File for "@azure/arm-dell-storage"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import { Client } from '@azure-rest/core-client';
import { OperationOptions } from '@azure-rest/core-client';
import { OperationState } from '@azure/core-lro';
import { PollerLike } from '@azure/core-lro';

// @public
export function $delete(context: StorageContext, resourceGroupName: string, filesystemName: string, options?: FileSystemsDeleteOptionalParams): PollerLike<OperationState<void>, void>;

// @public
export function createOrUpdate(context: StorageContext, resourceGroupName: string, filesystemName: string, resource: FileSystemResource, options?: FileSystemsCreateOrUpdateOptionalParams): PollerLike<OperationState<FileSystemResource>, FileSystemResource>;

// @public
export interface FileSystemsCreateOrUpdateOptionalParams extends OperationOptions {
    updateIntervalInMs?: number;
}

// @public
export interface FileSystemsDeleteOptionalParams extends OperationOptions {
    updateIntervalInMs?: number;
}

// @public
export interface FileSystemsGetOptionalParams extends OperationOptions {
}

// @public
export interface FileSystemsListByResourceGroupOptionalParams extends OperationOptions {
}

// @public
export interface FileSystemsListBySubscriptionOptionalParams extends OperationOptions {
}

// @public
export interface FileSystemsUpdateOptionalParams extends OperationOptions {
}

// @public
export function get(context: StorageContext, resourceGroupName: string, filesystemName: string, options?: FileSystemsGetOptionalParams): Promise<FileSystemResource>;

// @public
export function listByResourceGroup(context: StorageContext, resourceGroupName: string, options?: FileSystemsListByResourceGroupOptionalParams): PagedAsyncIterableIterator<FileSystemResource>;

// @public
export function listBySubscription(context: StorageContext, options?: FileSystemsListBySubscriptionOptionalParams): PagedAsyncIterableIterator<FileSystemResource>;

// @public
export function update(context: StorageContext, resourceGroupName: string, filesystemName: string, properties: FileSystemResourceUpdate, options?: FileSystemsUpdateOptionalParams): Promise<FileSystemResource>;

// (No @packageDocumentation comment for this package)

```
