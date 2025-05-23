// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, expect, vi, beforeEach, afterEach } from "vitest";
import { getClient } from "../../src/getClient.js";

function createResponse(statusCode: number, body = ""): Response {
  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      const view = encoder.encode(body);

      if (view.length > 1) {
        const first = view.slice(0, 1);
        const second = view.slice(1);
        controller.enqueue(first);
        controller.enqueue(second);
        controller.close();
      } else {
        controller.enqueue(view);
        controller.close();
      }
    },
  });
  return new Response(stream, { status: statusCode });
}

const mockBaseUrl = "https://example.org";

describe("[Browser] Streams", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    if (vi.isFakeTimers()) {
      vi.useRealTimers();
    }
  });

  it("should get a JSON body response as a stream", async () => {
    const responseText = "An appropriate response.";
    const fetchMock = vi.mocked(fetch);
    fetchMock.mockResolvedValue(createResponse(200, responseText));

    const client = getClient(mockBaseUrl);
    const result = await client.pathUnchecked("/foo").get().asBrowserStream();
    const reader = result.body!.getReader();
    // Read the first chunk
    const chunk = await reader.read();
    assert.equal(chunk.done, false);
    expect(fetchMock).toHaveBeenCalledOnce();
  });

  it("should get a JSON body response", async () => {
    const responseText = "An appropriate response.";

    const client = getClient(mockBaseUrl);
    const fetchMock = vi.mocked(fetch);
    fetchMock.mockResolvedValue(createResponse(200, responseText));

    const result = await client.pathUnchecked("/foo").get();

    assert.deepEqual(result.body, responseText);
    expect(fetchMock).toHaveBeenCalledOnce();
  });

  it("should be able to handle errors on normal response", async () => {
    const client = getClient(mockBaseUrl);

    const fetchMock = vi.mocked(fetch);
    fetchMock.mockRejectedValue(new Error("ExpectedException"));

    try {
      await client.pathUnchecked("/foo").get();
    } catch (e: any) {
      assert.match(e.message, /ExpectedException/);
    }
  });

  it("should be able to handle errors on streamed response", async () => {
    const client = getClient(mockBaseUrl);

    const fetchMock = vi.mocked(fetch);
    fetchMock.mockRejectedValue(new Error("ExpectedException"));

    try {
      await client.pathUnchecked("/foo").get().asBrowserStream();
    } catch (e: any) {
      assert.match(e.message, /ExpectedException/);
    }
  });

  it("should throw when attempting to use node streams", async () => {
    const fetchMock = vi.mocked(fetch);
    fetchMock.mockResolvedValue(createResponse(200, "test"));

    const client = getClient(mockBaseUrl);

    try {
      await client.pathUnchecked("/foo").get().asNodeStream();
      assert.fail("Expected error was not thrown");
    } catch (e: any) {
      assert.equal(
        e.message,
        "`isNodeStream` is not supported in the browser environment. Use `asBrowserStream` to obtain the response body stream.",
      );
    }
  });
});
