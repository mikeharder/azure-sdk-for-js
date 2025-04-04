// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample shows how to programmatically build a custom classifier.
 *
 * The Document Intelligence service expects the training data to be organized and labeled according to a particular
 * convention and stored in an Azure Storage container. For more information about creating a training data set, please
 * see the information at the following link to the service's documentation:
 *
 * https://aka.ms/azsdk/documentitelligence/buildclassifiermodel
 *
 * @summary build a classifier from a training data set
 */

import type { DocumentClassifierBuildOperationDetailsOutput } from "@azure-rest/ai-document-intelligence";
import DocumentIntelligence, {
  getLongRunningPoller,
  isUnexpected,
} from "@azure-rest/ai-document-intelligence";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function main(): Promise<void> {
  const client = DocumentIntelligence(
    process.env["DOCUMENT_INTELLIGENCE_ENDPOINT"] || "<cognitive services endpoint>",
    new DefaultAzureCredential(),
  );

  const random = Date.now().toString();
  const modelId =
    (process.env.CUSTOM_CLASSIFIER_ID || "<classifier id>") + random.substring(random.length - 6);

  const trainingDataSasUrl1 =
    process.env.CUSTOM_CLASSIFIER_TRAINING_DATA_SAS_URL_1 || "<training data container SAS url 1>";

  const trainingDataSasUrl2 =
    process.env.CUSTOM_CLASSIFIER_TRAINING_DATA_SAS_URL_2 || "<training data container SAS url 2>";

  const initialResponse = await client.path("/documentClassifiers:build").post({
    body: {
      classifierId: modelId,
      description: "Custom classifier description",
      docTypes: {
        foo: {
          azureBlobSource: {
            containerUrl: trainingDataSasUrl1,
          },
        },
        bar: {
          azureBlobSource: {
            containerUrl: trainingDataSasUrl2,
          },
        },
      },
    },
  });

  if (isUnexpected(initialResponse)) {
    throw initialResponse.body.error;
  }
  const poller = getLongRunningPoller(client, initialResponse);
  const classifier = (
    (await poller.pollUntilDone()).body as DocumentClassifierBuildOperationDetailsOutput
  ).result;
  if (!classifier) {
    throw new Error("Expected a DocumentClassifierDetailsOutput response.");
  }

  console.log("Classifier ID:", classifier.classifierId);
  console.log("Description:", classifier.description);
  console.log("Created:", classifier.createdDateTime);

  console.log("Document Types:");
  for (const [docType, details] of Object.entries(classifier.docTypes)) {
    console.log(`- Name: "${docType}", source: ${JSON.stringify(details, null, 2)}`);
  }
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});
