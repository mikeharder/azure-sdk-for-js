## API Report File for "@azure/storage-blob-changefeed"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import type { AbortSignalLike } from '@azure/abort-controller';
import type { AnonymousCredential } from '@azure/storage-blob';
import type { CommonOptions } from '@azure/storage-blob';
import type { PagedAsyncIterableIterator } from '@azure/core-paging';
import { Pipeline } from '@azure/storage-blob';
import type { StoragePipelineOptions } from '@azure/storage-blob';
import type { StorageSharedKeyCredential } from '@azure/storage-blob';
import type { TokenCredential } from '@azure/core-auth';

// @public
export type AccessTier = "P4" | "P6" | "P10" | "P15" | "P20" | "P30" | "P40" | "P50" | "P60" | "P70" | "P80" | "Hot" | "Cool" | "Archive";

// @public
export class BlobChangeFeedClient {
    constructor(url: string, credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: StoragePipelineOptions, changeFeedClientOptions?: BlobChangeFeedClientOptions);
    constructor(url: string, pipeline: Pipeline);
    static fromConnectionString(connectionString: string, options?: StoragePipelineOptions, changeFeedClientOptions?: BlobChangeFeedClientOptions): BlobChangeFeedClient;
    listChanges(options?: BlobChangeFeedListChangesOptions): PagedAsyncIterableIterator<BlobChangeFeedEvent, BlobChangeFeedEventPage>;
}

// @public
export interface BlobChangeFeedClientOptions {
    maximumTransferSize?: number;
}

// @public
export interface BlobChangeFeedEvent {
    data: BlobChangeFeedEventData;
    dataVersion?: string;
    eventTime: Date;
    eventType: BlobChangeFeedEventType;
    id: string;
    metadataVersion: string;
    schemaVersion?: number;
    subject: string;
    topic: string;
}

// @public
export interface BlobChangeFeedEventData {
    api: string;
    blobAccessTier?: AccessTier;
    blobType: BlobType;
    blobVersion?: string;
    clientRequestId: string;
    containerVersion?: string;
    contentLength: number;
    contentOffset?: number;
    contentType: string;
    destinationUrl?: string;
    etag: string;
    isRecursive?: boolean;
    longRunningOperationInfo?: BlobOperationResult;
    previousInfo?: ChangeFeedEventPreviousInfo;
    requestId: string;
    sequencer: string;
    snapshot?: string;
    sourceUrl?: string;
    updatedBlobProperties?: UpdatedBlobProperties;
    updatedBlobTags?: BlobTagsChange;
    url: string;
}

// @public
export class BlobChangeFeedEventPage {
    constructor();
    continuationToken: string;
    events: BlobChangeFeedEvent[];
}

// @public
export type BlobChangeFeedEventType = "UnspecifiedEventType" | "BlobCreated" | "BlobDeleted" | "BlobPropertiesUpdated" | "BlobSnapshotCreated" | "Control" | "BlobTierChanged" | "BlobAsyncOperationInitiated" | "BlobMetadataUpdated" | "RestorePointMarkerCreated";

// @public
export interface BlobChangeFeedListChangesOptions extends CommonOptions {
    abortSignal?: AbortSignalLike;
    end?: Date;
    start?: Date;
}

// @public
export interface BlobOperationResult {
    copyId?: string;
    destinationAccessTier?: AccessTier;
    isAsync: boolean;
}

// @public
export interface BlobPropertyChange {
    newValue: string;
    oldValue: string;
    propertyName: string;
}

// @public
export interface BlobTagsChange {
    newTags: Record<string, string>;
    oldTags: Record<string, string>;
}

// @public
export type BlobType = "BlockBlob" | "AppendBlob" | "PageBlob";

// @public
export interface ChangeFeedEventPreviousInfo {
    isBlobSoftDeleted: boolean;
    newBlobVersion?: string;
    oldBlobVersion?: string;
    previousTier?: AccessTier;
    softDeleteSnapshot?: string;
}

// @public
export function newPipeline(credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, pipelineOptions?: StoragePipelineOptions): Pipeline;

// @public
export type UpdatedBlobProperties = Record<string, BlobPropertyChange>;

// (No @packageDocumentation comment for this package)

```
