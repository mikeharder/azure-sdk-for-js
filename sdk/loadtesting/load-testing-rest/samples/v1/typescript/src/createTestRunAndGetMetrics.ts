/**
 * This sample demonstrates how to run a test and  get test status
 *
 * @summary creates and run a loadtest
 */

import AzureLoadTesting, { isUnexpected } from "@azure-rest/load-testing";
import { DefaultAzureCredential } from "@azure/identity";
import { v4 as uuidv4 } from "uuid";

async function main(): Promise<void> {
  const endpoint = process.env["LOADTESTSERVICE_ENDPOINT"] || "";
  const displayName = "some-load-test";
  const testId = uuidv4(); // ID to be assigned to a test
  const testRunId = uuidv4(); // ID to be assigned to a testRun

  // Build a client through AAD
  const client = AzureLoadTesting(endpoint, new DefaultAzureCredential());

  // Creating the test run
  const testRunCreationResult = await client.path("/test-runs/{testRunId}", testRunId).patch({
    contentType: "application/merge-patch+json",
    body: {
      testId: testId,
      displayName: displayName,
      virtualUsers: 10,
    },
  });

  if (isUnexpected(testRunCreationResult)) {
    throw testRunCreationResult.body.error;
  }

  if (testRunCreationResult.body.testRunId === undefined)
    throw new Error("Test Run ID returned as undefined.");

  // Checking the test run status and printing metrics
  var testStatus = null;
  var getTestRunResult = null;
  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  //wait for terminal state
  while (
    testStatus == null ||
    (testStatus != "DONE" && testStatus != "CANCELLED" && testStatus != "FAILED")
  ) {
    getTestRunResult = await client
      .path("/test-runs/{testRunId}", testRunCreationResult.body.testRunId)
      .get();
    if (isUnexpected(getTestRunResult)) {
      throw getTestRunResult.body.error;
    }
    testStatus = getTestRunResult.body.status;

    //Check test status after every 5 seconds
    sleep(5000);
  }

  console.log(getTestRunResult);
}
main().catch(console.error);
