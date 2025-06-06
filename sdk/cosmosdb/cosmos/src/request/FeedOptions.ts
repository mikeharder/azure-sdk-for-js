// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { PartitionKey } from "../documents/index.js";
import type { SharedOptions } from "./SharedOptions.js";

/**
 * The feed options and query methods.
 */
export interface FeedOptions extends SharedOptions {
  /** Opaque token for continuing the enumeration. Default: undefined
   * @deprecated Use continuationToken instead.
   */
  continuation?: string;
  /** Opaque token for continuing the enumeration. Default: undefined */
  continuationToken?: string;
  /**
   * Limits the size of the continuation token in the response. Default: undefined
   *
   * Continuation Tokens contain optional data that can be removed from the serialization before writing it out to a header.
   * By default we are capping this to 1kb to avoid long headers (Node.js has a global header size limit).
   * A user may set this field to allow for longer headers, which can help the backend optimize query execution."
   */
  continuationTokenLimitInKB?: number;
  /**
   * Allow scan on the queries which couldn't be served as indexing was opted out on the requested paths. Default: false
   *
   * In general, it is best to avoid using this setting. Scans are relatively expensive and take a long time to serve.
   */
  enableScanInQuery?: boolean;
  /**
   * The maximum number of concurrent operations that run client side during parallel query execution in the
   * Azure Cosmos DB database service. Negative values make the system automatically decides the number of
   * concurrent operations to run. Default: 0 (no parallelism)
   */
  maxDegreeOfParallelism?: number;
  /**
   * Max number of items to be returned in the enumeration operation. Default: undefined (server will defined payload)
   *
   * Expirimenting with this value can usually result in the biggest performance changes to the query.
   *
   * The smaller the item count, the faster the first result will be delivered (for non-aggregates). For larger amounts,
   * it will take longer to serve the request, but you'll usually get better throughput for large queries (i.e. if you need 1000 items
   * before you can do any other actions, set `maxItemCount` to 1000. If you can start doing work after the first 100, set `maxItemCount` to 100.)
   */
  maxItemCount?: number;
  /**
   * Note: consider using changeFeed instead.
   *
   * Indicates a change feed request. Must be set to "Incremental feed", or omitted otherwise. Default: false
   */
  useIncrementalFeed?: boolean;
  /**
   * @internal
   * Indicates a change feed request in latestVersion mode.
   * Note: Not to be used directly. Use `ChangeFeedMode` instead to set the mode.
   */
  useLatestVersionFeed?: boolean;
  /**
   * @internal
   * Indicates a change feed request in allVersionsAndDelete mode. Default false.
   * Note: Not to be used directly. Use `ChangeFeedMode` instead to set the mode.
   */
  useAllVersionsAndDeletesFeed?: boolean;
  /** Conditions Associated with the request. */
  accessCondition?: {
    /** Conditional HTTP method header type (IfMatch or IfNoneMatch). */
    type: string;
    /** Conditional HTTP method header value (the _etag field from the last version you read). */
    condition: string;
  };
  /**
   * Enable returning query metrics in response headers. Default: false
   *
   * Used for debugging slow or expensive queries. Also increases response size and if you're using a low max header size in Node.js,
   * you can run into issues faster.
   */
  populateQueryMetrics?: boolean;
  /**
   * Enable buffering additional items during queries. Default: false
   *
   * This will buffer an additional page at a time (multiplied by maxDegreeOfParallelism) from the server in the background.
   * This improves latency by fetching pages before they are needed by the client. If you're draining all of the results from the
   * server, like `.fetchAll`, you should usually enable this. If you're only fetching one page at a time via continuation token,
   * you should avoid this. If you're draining more than one page, but not the entire result set, it may help improve latency, but
   * it will increase the total amount of RU/s use to serve the entire query (as some pages will be fetched more than once).
   */
  bufferItems?: boolean;
  /**
   * This setting forces the query to use a query plan. Default: false
   *
   * Note: this will disable continuation token support, even for single partition queries.
   *
   * For queries like aggregates and most cross partition queries, this happens anyway.
   * However, since the library doesn't know what type of query it is until we get back the first response,
   * some optimization can't happen until later.
   *
   * If this setting is enabled, it will force query plan for the query, which will save some network requests
   * and ensure parallelism can happen. Useful for when you know you're doing cross-partition or aggregate queries.
   */
  forceQueryPlan?: boolean;
  /** Limits the query to a specific partition key. Default: undefined
   *
   *  Scoping a query to a single partition can be accomplished two ways:
   *
   * `container.items.query('SELECT * from c', { partitionKey: "foo" }).toArray()`
   * `container.items.query('SELECT * from c WHERE c.yourPartitionKey = "foo"').toArray()`
   *
   * The former is useful when the query body is out of your control
   * but you still want to restrict it to a single partition. Example: an end user specified query.
   */
  partitionKey?: PartitionKey;
  /**
   * Enable returning index metrics in response headers. Default: false
   */
  populateIndexMetrics?: boolean;
  /**
   * Specifies a custom maximum buffer size for storing final results for nonStreamingOrderBy queries.
   * This value is ignored if the query includes top/offset+limit clauses.
   */
  vectorSearchBufferSize?: number;
  /**
   * Disable the nonStreamingOrderBy query feature in supported query features.
   * Default: false. Set to true to avoid error from an old gateway that doesn't support this feature.
   */
  disableNonStreamingOrderByQuery?: boolean;
  /**
   * Valid only for non streaming order by query.
   * Default: false; When set to true, it allows queries to bypass the default behavior that blocks nonStreaming queries without top or limit clauses.
   */
  allowUnboundedNonStreamingQueries?: boolean;
  /**
   * Controls query execution behavior.
   * Default: false. If set to false, the query will retry until results are ready and `maxItemCount` is reached, which can take time for large partitions with relatively small data.
   * If set to true, scans partitions up to `maxDegreeOfParallelism`, adds results to the buffer, and returns what is available. If results are not ready, it returns an empty response.
   */
  enableQueryControl?: boolean;
  /**
   * Default: false. If set to true, it disables the hybrid search query plan optimization.
   * This optimization is enabled by default and is used to improve the performance of hybrid search queries.
   */
  disableHybridSearchQueryPlanOptimization?: boolean;
  /**
   * @internal
   * rid of the container.
   */
  containerRid?: string;
}
