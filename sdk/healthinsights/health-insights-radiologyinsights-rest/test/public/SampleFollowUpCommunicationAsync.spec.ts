// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import type { AzureHealthInsightsClient } from "../../src/index.js";
import { getLongRunningPoller } from "../../src/index.js";
import { createRecorder, createTestClient } from "./utils/recordedClient.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

const codingData = {
  system: "http://www.ama-assn.org/go/cpt",
  code: "USPELVIS",
  display: "US PELVIS COMPLETE",
};

const code = {
  coding: [codingData],
};

const patientInfo = {
  sex: "female",
  birthDate: "1959-11-11T19:00:00+00:00",
};

const encounterData = {
  id: "encounterid1",
  period: {
    start: "2021-8-28T00:00:00",
    end: "2021-8-28T00:00:00",
  },
  class: "inpatient",
};

const authorData = {
  id: "authorid1",
  fullName: "authorname1",
};

const orderedProceduresData = {
  code: code,
  description: "US PELVIS COMPLETE",
};

const administrativeMetadata = {
  orderedProcedures: [orderedProceduresData],
  encounterId: "encounterid1",
};

const content = {
  sourceType: "inline",
  value: `CLINICAL HISTORY:
20-year-old female presenting with abdominal pain. Surgical history significant for appendectomy.

COMPARISON:
Right upper quadrant sonographic performed 1 day prior.

TECHNIQUE:
Transabdominal grayscale pelvic sonography with duplex color Doppler
and spectral waveform analysis of the ovaries.

FINDINGS:
The uterus is unremarkable given the transabdominal technique with
endometrial echo complex within physiologic normal limits. The
ovaries are symmetric in size, measuring 2.5 x 1.2 x 3.0 cm and the
left measuring 2.8 x 1.5 x 1.9 cm.

On duplex imaging, Doppler signal is symmetric.

IMPRESSION:
1. Normal pelvic sonography. Findings of testicular torsion.
A new US pelvis within the next 6 months is recommended.

These results have been discussed with Dr. Jones at 3 PM on November 5 2020.`,
};

const patientDocumentData = {
  type: "note",
  clinicalType: "radiologyReport",
  id: "docid1",
  language: "en",
  authors: [authorData],
  specialtyType: "radiology",
  administrativeMetadata: administrativeMetadata,
  content: content,
  createdAt: "2021-05-31T16:00:00.000Z",
  orderedProceduresAsCsv: "US PELVIS COMPLETE",
};

const patientData = {
  id: "Samantha Jones",
  details: patientInfo,
  encounters: [encounterData],
  patientDocuments: [patientDocumentData],
};

const inferenceTypes = [
  "finding",
  "ageMismatch",
  "lateralityDiscrepancy",
  "sexMismatch",
  "completeOrderDiscrepancy",
  "limitedOrderDiscrepancy",
  "criticalResult",
  "criticalRecommendation",
  "followupRecommendation",
  "followupCommunication",
  "radiologyProcedure",
  "scoringAndAssessment",
  "guidance",
  "qualityMeasure",
];

const followupRecommendationOptions = {
  includeRecommendationsWithNoSpecifiedModality: true,
  includeRecommendationsInReferences: true,
  provideFocusedSentenceEvidence: true,
};

const findingOptions = {
  provideFocusedSentenceEvidence: true,
};

const inferenceOptions = {
  followupRecommendationOptions: followupRecommendationOptions,
  findingOptions: findingOptions,
};

// Create RI Configuration
const configuration = {
  inferenceOptions: inferenceOptions,
  inferenceTypes: inferenceTypes,
  locale: "en-US",
  verbose: false,
  includeEvidence: true,
};

// create RI Data
const RadiologyInsightsJob = {
  jobData: {
    patients: [patientData],
    configuration: configuration,
  },
};

const param = {
  body: RadiologyInsightsJob,
};

/**
 *
 * Display the Follow Up Recommendation of the Radiology Insights request.
 *
 */

function findFollowUpCommunicationInferences(res: any): void {
  if ("result" in res.body) {
    res.body.result?.patientResults.forEach((patientResult: any) => {
      if (patientResult.inferences) {
        patientResult.inferences.forEach(
          (inference: {
            kind: string;
            communicatedAt: any[];
            recipient: any[];
            wasAcknowledged: string;
          }) => {
            if (inference.kind === "followupCommunication") {
              console.log("Followup Communication Inference found");
              if ("communicatedAt" in inference) {
                console.log("Communicated At: " + inference.communicatedAt.join(" "));
              }
              if ("recipient" in inference) {
                console.log("Recipient: " + inference.recipient.join(" "));
              }
              console.log("Aknowledged: " + inference.wasAcknowledged);
            }
          },
        );
      }
    });
  }
}

describe("Follow Up Communication Inference Test", () => {
  let recorder: Recorder;
  let client: AzureHealthInsightsClient;

  beforeEach(async (ctx) => {
    recorder = await createRecorder(ctx);
    client = await createTestClient(recorder);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("follow up communication inference test", async () => {
    const result = await client
      .path("/radiology-insights/jobs/{id}", "jobId-17138794923687")
      .put(param);
    const poller = await getLongRunningPoller(client, result);
    const res = await poller.pollUntilDone();
    console.log(res);
    assert.equal(res.status, "200");
    findFollowUpCommunicationInferences(res);
  });
});
