// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PerfTest } from "../src/index.js";

/**
 * Exception is designed to test the response speed of the Perf test framework
 * If the option "sync" is passed, errors will be thrown on every test call, where the test being called is simple function.
 * Otherwise, errors thrown on every test call, where the test being called is a function returning a promise (an asynchronous function).
 */
export class Exception extends PerfTest {
  public options = {};

  async run(): Promise<void> {
    try {
      throw new Error();
    } catch (e: unknown) {
      // Nothing to do here
    }
  }
}
