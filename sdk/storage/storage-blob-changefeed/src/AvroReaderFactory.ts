// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AvroReadable } from "@azure/storage-internal-avro";
import { AvroReader } from "@azure/storage-internal-avro";

/**
 * Creates AvroReaders.  Allows us to inject mock AvroReaders in the Chunk unit tests.
 */
export class AvroReaderFactory {
  public create(headerAndDataStream: AvroReadable): AvroReader;

  public create(
    dataStream: AvroReadable,
    headerStream: AvroReadable,
    blockOffset: number,
    eventIndex: number,
  ): AvroReader;

  public create(
    dataStream: AvroReadable,
    headerStream?: AvroReadable,
    blockOffset?: number,
    eventIndex?: number,
  ): AvroReader {
    if (headerStream) {
      return new AvroReader(dataStream, headerStream, blockOffset!, eventIndex!);
    } else {
      return new AvroReader(dataStream);
    }
  }
}
