---
page_type: sample
languages:
  - typescript
products:
  - azure
  - azure-cognitive-services
  - language-service
urlFragment: ai-language-text-typescript
---

# Azure Cognitive Language Service client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for Azure Cognitive Language Service in some common scenarios.

| **File Name**                                                         | **Description**                                                                     |
| --------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| [entityLinking.ts][entitylinking]                                     | detects entities that have links to more information on the web                     |
| [entityRecognition.ts][entityrecognition]                             | detects entities in a piece of text                                                 |
| [keyPhraseExtraction.ts][keyphraseextraction]                         | extracts key phrases from a piece of text                                           |
| [languageDetection.ts][languagedetection]                             | detects the language of a piece of text                                             |
| [piiEntityRecognition.ts][piientityrecognition]                       | detects personally-identifiable information                                         |
| [sentimentAnalysis.ts][sentimentanalysis]                             | analyzes the sentiment of a piece of text                                           |
| [stats.ts][stats]                                                     | access statistics about documents and transactions                                  |
| [abstractiveSummarization.ts][abstractivesummarization]               | generates a summary for an article                                                  |
| [customEntityRecognition.ts][customentityrecognition]                 | detects custom text in a piece of text                                              |
| [customMultiLabelClassification.ts][custommultilabelclassification]   | multi-label classification of pieces of text                                        |
| [customSingleLabelClassification.ts][customsinglelabelclassification] | single-label classification of pieces of text                                       |
| [extractiveSummarization.ts][extractivesummarization]                 | extracts a summary from an article                                                  |
| [healthcare.ts][healthcare]                                           | detects healthcare entities in a piece of text                                      |
| [opinionMining.ts][opinionmining]                                     | analyzes the sentiment of a piece of text and mine opinions about different targets |
| [batching.ts][batching]                                               | applies multiple Text Analytics actions per document                                |
| [modelVersion.ts][modelversion]                                       | shows how to choose model versions for pre-built models.                            |
| [paging.ts][paging]                                                   | controls paging for the results of `beginAnalyzeActions`                            |
| [rehydratePolling.ts][rehydratepolling]                               | creates a poller using the serialized state of another                              |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using:

```bash
npm install -g typescript
```

You need [an Azure subscription][freesub] and the following Azure resources to run these sample programs:

- [Azure Cognitive Services instance][createinstance_azurecognitiveservicesinstance]

Samples retrieve credentials to access the service endpoint from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser may require some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Compile the samples:

```bash
npm run build
```

3. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

4. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node dist/entityLinking.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx dev-tool run vendored cross-env LANGUAGE_ENDPOINT="<language endpoint>" node dist/entityLinking.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[entitylinking]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-text/samples/v1/typescript/src/entityLinking.ts
[entityrecognition]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-text/samples/v1/typescript/src/entityRecognition.ts
[keyphraseextraction]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-text/samples/v1/typescript/src/keyPhraseExtraction.ts
[languagedetection]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-text/samples/v1/typescript/src/languageDetection.ts
[piientityrecognition]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-text/samples/v1/typescript/src/piiEntityRecognition.ts
[sentimentanalysis]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-text/samples/v1/typescript/src/sentimentAnalysis.ts
[stats]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-text/samples/v1/typescript/src/stats.ts
[abstractivesummarization]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-text/samples/v1/typescript/src/abstractiveSummarization.ts
[customentityrecognition]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-text/samples/v1/typescript/src/customEntityRecognition.ts
[custommultilabelclassification]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-text/samples/v1/typescript/src/customMultiLabelClassification.ts
[customsinglelabelclassification]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-text/samples/v1/typescript/src/customSingleLabelClassification.ts
[extractivesummarization]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-text/samples/v1/typescript/src/extractiveSummarization.ts
[healthcare]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-text/samples/v1/typescript/src/healthcare.ts
[opinionmining]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-text/samples/v1/typescript/src/opinionMining.ts
[batching]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-text/samples/v1/typescript/src/batching.ts
[modelversion]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-text/samples/v1/typescript/src/modelVersion.ts
[paging]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-text/samples/v1/typescript/src/paging.ts
[rehydratepolling]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/cognitivelanguage/ai-language-text/samples/v1/typescript/src/rehydratePolling.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/ai-language-text
[freesub]: https://azure.microsoft.com/free/
[createinstance_azurecognitiveservicesinstance]: https://learn.microsoft.com/azure/cognitive-services/cognitive-services-apis-create-account
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/cognitivelanguage/ai-language-text/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
