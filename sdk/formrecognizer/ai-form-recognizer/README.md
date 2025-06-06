# Azure AI Document Intelligence client library for JavaScript

Azure AI [Document Intelligence](https://azure.microsoft.com/products/ai-services/ai-document-intelligence) is a cloud service that uses machine learning to analyze text and structured data from your documents. It includes the following main features:

- Layout - Extract text, table structures, and selection marks, along with their bounding region coordinates, from documents.
- Document - Analyze entities, key-value pairs, tables, and selection marks from documents using the general prebuilt document model.
- Read - Read information about textual elements, such as page words and lines in addition to text language information.
- Prebuilt - Analyze data from certain types of common documents (such as receipts, invoices, business cards, or identity documents) using prebuilt models.
- Custom - Build custom models to extract text, field values, selection marks, and table data from documents. Custom models are built with your own data, so they're tailored to your documents.
- Classifiers - Build custom classifiers to categorize documents into predefined classes.

[Source code](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/formrecognizer/ai-form-recognizer/) |
[Package (NPM)](https://www.npmjs.com/package/@azure/ai-form-recognizer) |
[API reference documentation](https://learn.microsoft.com/javascript/api/@azure/ai-form-recognizer) |
[Product documentation](https://learn.microsoft.com/azure/cognitive-services/form-recognizer/) |
[Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/formrecognizer/ai-form-recognizer/samples)

#### Note

The Document Intelligence service was formerly known as "Azure Form Recognizer." These services are one and the same, and the `@azure/ai-form-recognizer` package for JavaScript is the Azure SDK package for the Azure AI Document Intelligence service. At the time of writing, the renaming of Azure Form Recognizer to Azure AI Document Intelligence is underway, so "Form Recognizer" and "Document Intelligence" may be used interchangeably in some cases.

### Install the `@azure/ai-form-recognizer` package

Install the Azure Document Intelligence client library for JavaScript with `npm`:

```bash
npm install @azure/ai-form-recognizer
```

## Getting started

```ts snippet:ReadmeSampleCreateClient_Node
import { DefaultAzureCredential } from "@azure/identity";
import { DocumentAnalysisClient } from "@azure/ai-form-recognizer";
import { createReadStream } from "node:fs";

const credential = new DefaultAzureCredential();
const client = new DocumentAnalysisClient(
  "https://<resource name>.cognitiveservices.azure.com",
  credential,
);

// Document Intelligence supports many different types of files.
const file = createReadStream("path/to/file.jpg");
const poller = await client.beginAnalyzeDocument("<model ID>", file);

const { pages, tables, styles, keyValuePairs, documents } = await poller.pollUntilDone();
```

### Currently supported environments

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)
- Latest versions of Safari, Chrome, Edge, and Firefox.

See our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

### Prerequisites

- An [Azure subscription](https://azure.microsoft.com/free/)
- A [Cognitive Services or Form Recognizer resource][fr_or_cs_resource]. If you need to create the resource, you can use the [Azure Portal][azure_portal] or [Azure CLI][azure_cli].

#### Create a Form Recognizer resource

**Note**: At the time of writing, the Azure portal still refers to the resource as a "Form Recognizer" resource. In the future, this may be updated to a "Document Intelligence" resource. For now, the following documentation uses the "Form Recognizer" name.

Document Intelligence supports both [multi-service and single-service access][multi_and_single_service]. Create a Cognitive Services resource if you plan to access multiple cognitive services under a single endpoint/key. For Form Recognizer access only, create a Form Recognizer resource.

You can create the resource using

**Option 1:** [Azure Portal][azure_portal_create_fr_resource]

**Option 2:** [Azure CLI][azure_cli_create_fr_resource].

Below is an example of how you can create a Form Recognizer resource using the CLI:

```bash
# Create a new resource group to hold the Form Recognizer resource -
# if using an existing resource group, skip this step
az group create --name my-resource-group --location westus2
```

If you use the Azure CLI, replace `<your-resource-group-name>` and `<your-resource-name>` with your own unique names:

```bash
az cognitiveservices account create --kind FormRecognizer --resource-group <your-resource-group-name> --name <your-resource-name> --sku <your-sku-name> --location <your-location>
```

### Create and authenticate a client

In order to interact with the Document Intelligence service, you'll need to select either a `DocumentAnalysisClient` or a `DocumentModelAdministrationClient`, and create an instance of this type. In the following examples, we will use `DocumentAnalysisClient`. To create a client instance to access the Document Intelligence API, you will need the `endpoint` of your Form Recognizer resource and a `credential`. The clients can use either an `AzureKeyCredential` with an API key of your resource or a `TokenCredential` that uses Azure Active Directory RBAC to authorize the client.

You can find the endpoint for your Form Recognizer resource either in the [Azure Portal][azure_portal] or by using the [Azure CLI][azure_cli] snippet below:

```bash
az cognitiveservices account show --name <your-resource-name> --resource-group <your-resource-group-name> --query "properties.endpoint"
```

#### Use an API key

Use the [Azure Portal][azure_portal] to browse to your Form Recognizer resource and retrieve an API key, or use the [Azure CLI][azure_cli] snippet below:

**Note:** Sometimes the API key is referred to as a "subscription key" or "subscription API key."

```bash
az cognitiveservices account keys list --resource-group <your-resource-group-name> --name <your-resource-name>
```

Once you have an API key and endpoint, you can use it as follows:

```ts snippet:ReadmeSampleCreateClient_KeyCredential
import { AzureKeyCredential, DocumentAnalysisClient } from "@azure/ai-form-recognizer";

const credential = new AzureKeyCredential("<API key>");
const client = new DocumentAnalysisClient(
  "https://<resource name>.cognitiveservices.azure.com",
  credential,
);
```

#### Use Azure Active Directory

API key authorization is used in most of the examples, but you can also authenticate the client with Azure Active Directory using the [Azure Identity library][azure_identity]. To use the [DefaultAzureCredential][defaultazurecredential] provider shown below or other credential providers provided with the Azure SDK, please install the `@azure/identity` package:

```bash
npm install @azure/identity
```

To authenticate using a service principal, you will also need to [register an AAD application][register_aad_app] and grant access to the service by assigning the `"Cognitive Services User"` role to your service principal (note: other roles such as `"Owner"` will not grant the necessary permissions, only `"Cognitive Services User"` will suffice to run the examples and the sample code).

Set the values of the client ID, tenant ID, and client secret of the AAD application as environment variables: `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_CLIENT_SECRET`.

```ts snippet:ReadmeSampleCreateClient_TokenCredential
import { DefaultAzureCredential } from "@azure/identity";
import { DocumentAnalysisClient } from "@azure/ai-form-recognizer";

const credential = new DefaultAzureCredential();
const client = new DocumentAnalysisClient(
  "https://<resource name>.cognitiveservices.azure.com",
  credential,
);
```

#### Sovereign Clouds

Connect to alternative Azure cloud environments (such as Azure China or Azure Government) by specifying the `audience` option when creating your client. Use the `KnownFormRecognizerAudience` enum to select the correct value for your environment.

```ts snippet:ReadmeSampleSovereignClouds
import { DefaultAzureCredential } from "@azure/identity";
import { DocumentAnalysisClient, KnownFormRecognizerAudience } from "@azure/ai-form-recognizer";

const credential = new DefaultAzureCredential();
const client = new DocumentAnalysisClient(
  "https://<resource name>.cognitiveservices.azure.com", // endpoint
  credential,
  {
    audience: KnownFormRecognizerAudience.AzureGovernment,
  },
);
```

If you do not specify the `audience` option, the default is suitable for the Azure Public Cloud (`https://cognitiveservices.azure.com`).

## Key concepts

### `DocumentAnalysisClient`

`DocumentAnalysisClient` provides operations for analyzing input documents using custom and prebuilt models. It has three methods:

- `beginAnalyzeDocument`, which extracts data from an input document file stream using a custom or prebuilt model given by its model ID. For information about the prebuilt models supported in all resources and their model IDs/outputs, please see [the service's documentation of the models][fr-models].
- `beginAnalyzeDocumentFromUrl`, which performs the same function as `beginAnalyzeDocument`, but submits a publicly-accessible URL of a file instead of a file stream.

### `DocumentModelAdministrationClient`

`DocumentModelAdministrationClient` provides operations for managing (creating, reading, listing, and deleting) models in the resource:

- `beginBuildDocumentModel` starts an operation to create a new document model from your own training data set. The created model can extract fields according to a custom schema. The training data are expected to be located in an Azure Storage container and organized according to a particular convention. See the [service's documentation on creating a training data set][fr-build-training-set] for a more detailed explanation of applying labels to a training data set.
- `beginComposeDocumentModel` starts an operation to compose multiple models into a single model. When used for custom form recognition, the new composed model will first perform a classification of the input documents to determine which of its submodels is most appropriate.
- `beginCopyModelTo` starts an operation to copy a custom model from one resource to another (or even to the same resource). It requires a `CopyAuthorization` from the target resource, which can be generated using the `getCopyAuthorization` method.
- `getResourceDetails` retrieves information about the resource's limits, such as the number of custom models and the maximum number of models the resource can support.
- `getDocumentModel`, `listDocumentModels`, and `deleteDocumentModel` enable managing models in the resource.
- `getOperation` and `listOperations` enable viewing the status of model creation operations, even those operations that are ongoing or that have failed. Operations are retained for 24 hours.

Please note that models can also be created using the Document Intelligence service's graphical user interface: [Document Intelligence Studio][fr-studio].

Sample code snippets that illustrate the use of `DocumentModelAdministrationClient` to build a model can be found [below, in the "Build a Model" example section.](#build-a-model).

### Long-running operations

Long-running operations (LROs) are operations which consist of an initial request sent to the service to start an operation, followed by polling for a result at a certain interval to determine if the operation has completed and whether it failed or succeeded. Ultimately, the LRO will either fail with an error or produce a result.

In Azure AI Document Intelligence, operations that create models (including copying and composing models) as well as the analysis/data-extraction operations are LROs. The SDK clients provide asynchronous `begin<operation-name>` methods that return `Promise<PollerLike>` objects. The `PollerLike` object represents the operation, which runs asynchronously on the service's infrastructure, and a program can wait for the operation to complete by calling and awaiting the `pollUntilDone` method on the poller returned from the `begin<operation-name>` method. Sample code snippets are provided to illustrate using long-running operations in the next section.

## Examples

The following section provides several JavaScript code snippets illustrating common patterns used in the Document Intelligence client libraries.

- [Analyze a document with a model ID](#analyze-a-document-with-a-model-id)
- [Use prebuilt document models](#use-prebuilt-document-models)
- [Use the "layout" prebuilt](#use-the-layout-prebuilt)
- [Use the "document" prebuilt](#use-the-document-prebuilt)
- [Use the "read" prebuilt](#use-the-read-prebuilt)
- [Build a model](#build-a-model)
- [Manage models](#manage-models)

### Analyze a document with a model ID

The `beginAnalyzeDocument` method can extract fields and table data from documents. Analysis may use either a custom model, trained with your own data, or a prebuilt model provided by the service (see _[Use Prebuilt Models](#use-prebuilt-models)_ below). A custom model is tailored to your own documents, so it should only be used with documents of the same structure as one of the document types in the model (there may be multiple, such as in a composed model).

```ts snippet:ReadmeSampleAnalyzeDocumentWithModelId
import { DefaultAzureCredential } from "@azure/identity";
import { DocumentAnalysisClient } from "@azure/ai-form-recognizer";
import { createReadStream } from "node:fs";

const credential = new DefaultAzureCredential();
const client = new DocumentAnalysisClient(
  "https://<resource name>.cognitiveservices.azure.com",
  credential,
);

const modelId = "<model id>";
const path = "<path to a document>";
const readStream = createReadStream(path);

const poller = await client.beginAnalyzeDocument(modelId, readStream, {
  onProgress: ({ status }) => {
    console.log(`status: ${status}`);
  },
});

// There are more fields than just these three
const { documents, pages, tables } = await poller.pollUntilDone();

console.log("Documents:");
for (const document of documents || []) {
  console.log(`Type: ${document.docType}`);
  console.log("Fields:");
  for (const [name, field] of Object.entries(document.fields)) {
    console.log(
      `Field ${name} has content '${field.content}' with a confidence score of ${field.confidence}`,
    );
  }
}

console.log("Pages:");
for (const page of pages || []) {
  console.log(`Page number: ${page.pageNumber} (${page.width}x${page.height} ${page.unit})`);
}

console.log("Tables:");
for (const table of tables || []) {
  console.log(`- Table (${table.columnCount}x${table.rowCount})`);
  for (const cell of table.cells) {
    console.log(`  - cell (${cell.rowIndex},${cell.columnIndex}) "${cell.content}"`);
  }
}
```

#### Analyze a document from a URL

As an alternative to providing a readable stream, a publicly-accessible URL can be provided instead using the `beginAnalyzeDocumentFromUrl` method. "Publicly-accessible" means that URL sources must be accessible from the service's infrastructure (in other words, a private intranet URL, or URLs that use header- or certificate-based secrets, will not work, as the Document Intelligence service must be able to access the URL). However, the URL itself could encode a secret, such as an Azure Storage blob URL that contains a SAS token in the query parameters.

### Use prebuilt document models

The `beginAnalyzeDocument` method also supports extracting fields from certain types of common documents such as receipts, invoices, business cards, identity documents, and more using prebuilt models provided by the Document Intelligence service. The prebuilt models may be provided either as model ID strings (the same as custom document models&mdash;see the _[other prebuilt models](#other-prebuilt-models)_ section below) or using a `DocumentModel` object. When using a `DocumentModel`, the Document Intelligence SDK for JavaScript provides a much stronger TypeScript type for the resulting extracted documents based on the model's schema, and it will be converted to use JavaScript naming conventions.

Example `DocumentModel` objects for the current service API version (`2022-08-31`) can be found in [the `prebuilt` samples directory][samples-prebuilt]. In the following example, we'll use the `PrebuiltReceiptModel` from the [`prebuilt-receipt.ts`] file in that directory.

Since the main benefit of `DocumentModel`-based analysis is stronger TypeScript type constraints, the following sample is written in TypeScript using ECMAScript module syntax:

```ts snippet:ReadmeSamplePrebuiltReceipt
import { DefaultAzureCredential } from "@azure/identity";
import { DocumentAnalysisClient } from "@azure/ai-form-recognizer";
import { createReadStream } from "node:fs";
import { PrebuiltReceiptModel } from "../samples-dev/prebuilt/prebuilt-receipt.js";

const credential = new DefaultAzureCredential();
const client = new DocumentAnalysisClient(
  "https://<resource name>.cognitiveservices.azure.com",
  credential,
);

const path = "<path to a document>";
const readStream = createReadStream(path);

// The PrebuiltReceiptModel `DocumentModel` instance encodes both the model ID and a stronger return type for the operation
const poller = await client.beginAnalyzeDocument(PrebuiltReceiptModel, readStream, {
  onProgress: ({ status }) => {
    console.log(`status: ${status}`);
  },
});

const {
  documents: [receiptDocument],
} = await poller.pollUntilDone();

// The fields of the document constitute the extracted receipt data.
const receipt = receiptDocument.fields;

if (receipt === undefined) {
  throw new Error("Expected at least one receipt in analysis result.");
}

console.log(`Receipt data (${receiptDocument.docType})`);
console.log("  Merchant Name:", receipt.merchantName?.value);

// The items of the receipt are an example of a `DocumentArrayValue`
if (receipt.items !== undefined) {
  console.log("Items:");
  for (const { properties: item } of receipt.items.values) {
    console.log("- Description:", item.description?.value);
    console.log("  Total Price:", item.totalPrice?.value);
  }
}

console.log("  Total:", receipt.total?.value);
```

Alternatively, as mentioned above, instead of using `PrebuiltReceiptModel`, which produces the stronger return type, the prebuilt receipt's model ID ("prebuilt-receipt") can be used, but the document fields will not be strongly typed in TypeScript, and the field names will generally be in "PascalCase" instead of "camelCase".

#### **Other prebuilt models**

You are not limited to receipts! There are a few prebuilt models to choose from, with more on the way. Each prebuilt model has its own set of supported fields:

- Receipts, using [`PrebuiltReceiptModel`][samples-prebuilt-receipt] (as above) or the prebuilt receipt model ID `"prebuilt-receipt"`.
- Business cards, using [`PrebuiltBusinessCardModel`][samples-prebuilt-businesscard] or its model ID `"prebuilt-businessCard"`.
- Invoices, using [`PrebuiltInvoiceModel`][samples-prebuilt-invoice] or its model ID `"prebuilt-invoice"`.
- Identity Documents (such as driver licenses and passports), using [`PrebuiltIdDocumentModel`][samples-prebuilt-iddocument] or its model ID `"prebuilt-idDocument"`.
- W2 Tax Forms (United States), using [`PrebuiltTaxUsW2Model`][samples-prebuilt-tax.us.w2] or its model ID `"prebuilt-tax.us.w2"`.
- Health Insurance Cards (United States), using [`PrebuiltHealthInsuranceCardUsModel`][samples-prebuilt-healthinsurancecard.us] or its model ID `"prebuilt-healthInsuranceCard.us"`.

Each of the above prebuilt models produces `documents` (extracted instances of the model's field schema). There are also three prebuilt models that do not have field schemas and therefore do not produce `documents`. They are:

- The prebuilt Layout model (see _[Use the "layout" prebuilt](#use-the-layout-prebuilt)_ below), which extracts information about basic layout (OCR) elements such as pages and tables.
- The prebuilt General Document model (see _[Use the "document" prebuilt](#use-the-document-prebuilt)_ below), which adds key-value pairs (directed associations between page elements, such as labeled elements) to the information produced by the layout model.
- The prebuilt Read model (see _[Use the "read" prebuilt](#use-the-read-prebuilt)_ below), which extracts only textual elements, such as page words and lines, along with information about the language of the document.

For information about the fields of all of these models, see [the service's documentation of the available prebuilt models](https://aka.ms/azsdk/formrecognizer/models).

The fields of all prebuilt models may also be accessed programmatically using the `getDocumentModel` method (by their model IDs) of `DocumentModelAdministrationClient` and inspecting the `docTypes` field in the result.

### Use the "layout" prebuilt

The `"prebuilt-layout"` model extracts only the basic elements of the document, such as pages, (which consist of text words/lines and selection marks), tables, and visual text styles along with their bounding regions and spans within the text content of the input documents. We provide a strongly-typed `DocumentModel` instance named [`PrebuiltLayoutModel`][samples-prebuilt-layout] that invokes this model, or as always its model ID `"prebuilt-layout"` may be used directly.

Since the main benefit of `DocumentModel`-based analysis is stronger TypeScript type constraints, the following sample is written in TypeScript using ECMAScript module syntax:

```ts snippet:ReadmeSamplePrebuiltLayout
import { DefaultAzureCredential } from "@azure/identity";
import { DocumentAnalysisClient } from "@azure/ai-form-recognizer";
import { createReadStream } from "node:fs";
import { PrebuiltLayoutModel } from "../samples-dev/prebuilt/prebuilt-layout.js";

const credential = new DefaultAzureCredential();
const client = new DocumentAnalysisClient(
  "https://<resource name>.cognitiveservices.azure.com",
  credential,
);

const path = "<path to a document>";
const readStream = createReadStream(path);

const poller = await client.beginAnalyzeDocument(PrebuiltLayoutModel, readStream);
const { pages, tables } = await poller.pollUntilDone();

for (const page of pages || []) {
  console.log(`- Page ${page.pageNumber}: (${page.width}x${page.height} ${page.unit})`);
}

for (const table of tables || []) {
  console.log(`- Table (${table.columnCount}x${table.rowCount})`);
  for (const cell of table.cells) {
    console.log(`  cell [${cell.rowIndex},${cell.columnIndex}] "${cell.content}"`);
  }
}
```

### Use the "document" prebuilt

The `"prebuilt-document"` model extracts information about key-value pairs (directed associations between page elements, such as labeled fields) in addition to the properties produced by the layout extraction method. This prebuilt (general) document model provides similar functionality to the custom models trained without label information in previous iterations of the Document Intelligence service, but it is now provided as a prebuilt model that works with a wide variety of documents. We provide a strongly-typed `DocumentModel` instance named [`PrebuiltDocumentModel`][samples-prebuilt-document] that invokes this model, or as always its model ID `"prebuilt-document"` may be used directly.

Since the main benefit of `DocumentModel`-based analysis is stronger TypeScript type constraints, the following sample is written in TypeScript using ECMAScript module syntax:

```ts snippet:ReadmeSamplePrebuiltDocument
import { DefaultAzureCredential } from "@azure/identity";
import { DocumentAnalysisClient } from "@azure/ai-form-recognizer";
import { createReadStream } from "node:fs";
import { PrebuiltDocumentModel } from "../samples-dev/prebuilt/prebuilt-document.js";

const credential = new DefaultAzureCredential();
const client = new DocumentAnalysisClient(
  "https://<resource name>.cognitiveservices.azure.com",
  credential,
);

const path = "<path to a document>";
const readStream = createReadStream(path);

const poller = await client.beginAnalyzeDocument(PrebuiltDocumentModel, readStream);

// `pages`, `tables` and `styles` are also available as in the "layout" example above, but for the sake of this
// example we won't show them here.
const { keyValuePairs } = await poller.pollUntilDone();

if (!keyValuePairs || keyValuePairs.length <= 0) {
  console.log("No key-value pairs were extracted from the document.");
} else {
  console.log("Key-Value Pairs:");
  for (const { key, value, confidence } of keyValuePairs) {
    console.log("- Key  :", `"${key.content}"`);
    console.log("  Value:", `"${value?.content ?? "<undefined>"}" (${confidence})`);
  }
}
```

### Use the "read" prebuilt

The `"prebuilt-read"` model extracts textual information in a document such as words and paragraphs and analyzes the language and writing style (e.g. handwritten vs. typeset) of that text. We provide a strongly-typed `DocumentModel` instance named [`PrebuiltReadModel`][samples-prebuilt-document] that invokes this model, or as always its model ID `"prebuilt-read"` may be used directly.

Since the main benefit of `DocumentModel`-based analysis is stronger TypeScript type constraints, the following sample is written in TypeScript using ECMAScript module syntax:

```ts snippet:ReadmeSamplePrebuiltRead
import { DefaultAzureCredential } from "@azure/identity";
import { DocumentAnalysisClient } from "@azure/ai-form-recognizer";
import { createReadStream } from "node:fs";
import { PrebuiltReadModel } from "../samples-dev/prebuilt/prebuilt-read.js";

const credential = new DefaultAzureCredential();
const client = new DocumentAnalysisClient(
  "https://<resource name>.cognitiveservices.azure.com",
  credential,
);

const path = "<path to a document>";
const readStream = createReadStream(path);

const poller = await client.beginAnalyzeDocument(PrebuiltReadModel, readStream);

// The "prebuilt-read" model (`beginReadDocument` method) only extracts information about the textual content of the
// document, such as page text elements, text styles, and information about the language of the text.
const { content, pages, languages } = await poller.pollUntilDone();

if (!pages || pages.length <= 0) {
  console.log("No pages were extracted from the document.");
} else {
  console.log("Pages:");
  for (const page of pages) {
    console.log("- Page", page.pageNumber, `(unit: ${page.unit})`);
    console.log(`  ${page.width}x${page.height}, angle: ${page.angle}`);
    console.log(
      `  ${page.lines && page.lines.length} lines, ${page.words && page.words.length} words`,
    );

    if (page.lines && page.lines.length > 0) {
      console.log("  Lines:");

      for (const line of page.lines) {
        console.log(`  - "${line.content}"`);
      }
    }
  }
}

if (!languages || languages.length <= 0) {
  console.log("No language spans were extracted from the document.");
} else {
  console.log("Languages:");
  for (const languageEntry of languages) {
    console.log(
      `- Found language: ${languageEntry.locale} (confidence: ${languageEntry.confidence})`,
    );

    for (const text of getTextOfSpans(content, languageEntry.spans)) {
      const escapedText = text.replace(/\r?\n/g, "\\n").replace(/"/g, '\\"');
      console.log(`  - "${escapedText}"`);
    }
  }
}

function* getTextOfSpans(content, spans) {
  for (const span of spans) {
    yield content.slice(span.offset, span.offset + span.length);
  }
}
```

### Classify a document

The Document Intelligence service supports custom document classifiers that can classify documents into a set of predefined categories based on a training data set. Documents can be classified with a custom classifier using the `beginClassifyDocument` method of `DocumentAnalysisClient`. Like `beginAnalyzeDocument` above, this method accepts a file or stream containing the document to be classified, and it has a `beginClassifyDocumentFromUrl` counterpart that accepts a publicly-accessible URL to a document instead.

The following sample shows how to classify a document using a custom classifier:

```ts snippet:ReadmeSampleClassifyDocument
import { DefaultAzureCredential } from "@azure/identity";
import { DocumentAnalysisClient } from "@azure/ai-form-recognizer";

const credential = new DefaultAzureCredential();
const client = new DocumentAnalysisClient(
  "https://<resource name>.cognitiveservices.azure.com",
  credential,
);

const documentUrl =
  "https://raw.githubusercontent.com/Azure/azure-sdk-for-js/main/sdk/formrecognizer/ai-form-recognizer/assets/invoice/Invoice_1.pdf";

const poller = await client.beginClassifyDocumentFromUrl("<classifier id>", documentUrl);

const result = await poller.pollUntilDone();

if (result?.documents?.length === 0) {
  throw new Error("Failed to extract any documents.");
}

for (const document of result.documents) {
  console.log(
    `Extracted a document with type '${document.docType}' on page ${document.boundingRegions?.[0].pageNumber} (confidence: ${document.confidence})`,
  );
}
```

For information on training a custom classifier, see the [section on classifier training at the end of the next section](#build-classifier).

### Build a model

The SDK also supports creating models using the `DocumentModelAdministrationClient` class. Building a model from labeled training data creates a new model that is trained on your own documents, and the resulting model will be able to recognize values from the structures of those documents. The model building operation accepts a SAS-encoded URL to an Azure Storage Blob container that holds the training documents. The Document Intelligence service's infrastructure will read the files in the container and create a model based on their contents. For more details on how to create and structure a training data container, see the [Document Intelligence service's documentation for building a model][fr-build-model].

While we provide these methods for programmatic model creation, the Document Intelligence service team has created an interactive web application, [Document Intelligence Studio][fr-studio], that enables creating and managing models on the web.

For example, the following program builds a custom document model using a SAS-encoded URL to a pre-existing Azure Storage container:

```ts snippet:ReadmeSampleBuildModel
import { DefaultAzureCredential } from "@azure/identity";
import { DocumentModelAdministrationClient } from "@azure/ai-form-recognizer";

const credential = new DefaultAzureCredential();
const client = new DocumentModelAdministrationClient(
  "https://<resource name>.cognitiveservices.azure.com",
  credential,
);

const containerSasUrl = "<SAS url to the blob container storing training documents>";

// You must provide the model ID. It can be any text that does not start with "prebuilt-".
// For example, you could provide a randomly generated GUID using the "uuid" package.
// The second parameter is the SAS-encoded URL to an Azure Storage container with the training documents.
// The third parameter is the build mode: one of "template" (the only mode prior to 4.0.0-beta.3) or "neural".
// See https://aka.ms/azsdk/formrecognizer/buildmode for more information about build modes.
const poller = await client.beginBuildDocumentModel("<model ID>", containerSasUrl, "template", {
  // The model description is optional and can be any text.
  description: "This is my new model!",
  onProgress: ({ status }) => {
    console.log(`operation status: ${status}`);
  },
});
const model = await poller.pollUntilDone();

console.log(`Model ID: ${model.modelId}`);
console.log(`Description: ${model.description}`);
console.log(`Created: ${model.createdOn}`);

// A model may contain several document types, which describe the possible object structures of fields extracted using
// this model

console.log("Document Types:");
for (const [docType, { description, fieldSchema: schema }] of Object.entries(
  model.docTypes ?? {},
)) {
  console.log(`- Name: "${docType}"`);
  console.log(`  Description: "${description}"`);

  // For simplicity, this example will only show top-level field names
  console.log("  Fields:");

  for (const [fieldName, fieldSchema] of Object.entries(schema)) {
    console.log(`  - "${fieldName}" (${fieldSchema.type})`);
    console.log(`    ${fieldSchema.description ?? "<no description>"}`);
  }
}
```

<a id="build-classifier"></a>
Custom classifiers are built in a similar way using the `beginBuildDocumentClassifier` method rather than `beginBuildDocumentModel`. Please see the [build classifier sample][sample-build-classifier] for more information about building a custom classifier, as the input training data are provided in a slightly different format. For information about building a training data set for a custom classifier, see [the Document Intelligence service documentation](https://aka.ms/azsdk/formrecognizer/buildclassifiermodel).

### Manage models

`DocumentModelAdministrationClient` also provides several methods for accessing and listing models. The following example shows how to iterate through the models in a resource (this will include both custom models in the resource as well as prebuilt models that are common to all resources), get a model by ID, and delete a model.

```ts snippet:ReadmeSampleManageModels
import { DefaultAzureCredential } from "@azure/identity";
import { DocumentModelAdministrationClient } from "@azure/ai-form-recognizer";

const credential = new DefaultAzureCredential();
const client = new DocumentModelAdministrationClient(
  "https://<resource name>.cognitiveservices.azure.com",
  credential,
);

// Produces an async iterable that supports paging (`PagedAsyncIterableIterator`). The `listDocumentModels` method will only
// iterate over model summaries, which do not include detailed schema information. Schema information is only returned
// from `getDocumentModel` as part of the full model information.
const models = client.listDocumentModels();
let i = 1;
for await (const summary of models) {
  console.log(`Model ${i++}:`, summary);
}

// The iterable is paged, and the application can control the flow of paging if needed
i = 1;
for await (const page of client.listDocumentModels().byPage()) {
  for (const summary of page) {
    console.log(`Model ${i++}`, summary);
  }
}

// We can also get a full ModelInfo by ID. Here we only show the basic information. See the documentation and the
// `getDocumentModel` sample program for information about the `docTypes` field, which contains the model's document type
// schemas.
const model = await client.getDocumentModel("<model ID>");
console.log(`ID ${model.modelId}`);
console.log(`Created: ${model.createdOn}`);
console.log(`Description: ${model.description ?? "<none>"}`);

// A model can also be deleted by its model ID. Once it is deleted, it CANNOT be recovered.
const modelIdToDelete = "<model ID that should be deleted forever>";
await client.deleteDocumentModel(modelIdToDelete);
```

Similar methods `listDocumentClassifiers` and `getDocumentClassifier` are available for listing and getting information about custom classifiers in addition to `deleteDocumentClassifier` for deleting custom classifiers.

## Troubleshooting

For assistance with troubleshooting, see the [troubleshooting guide][trouble-shooting].

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```ts snippet:SetLogLevel
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

## Next steps

Please take a look at the [samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/formrecognizer/ai-form-recognizer/samples) directory for detailed code samples that show how to use this library including several features and methods that are not shown in the "Examples" section above, such as copying and composing models, listing model management operations, and deleting models.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

[azure_cli]: https://learn.microsoft.com/cli/azure
[azure_sub]: https://azure.microsoft.com/free/
[fr_or_cs_resource]: https://learn.microsoft.com/azure/cognitive-services/cognitive-services-apis-create-account?tabs=multiservice%2Cwindows
[azure_portal]: https://portal.azure.com
[azure_identity]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity
[register_aad_app]: https://learn.microsoft.com/azure/cognitive-services/authentication#assign-a-role-to-a-service-principal
[defaultazurecredential]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential
[fr-build-model]: https://aka.ms/azsdk/formrecognizer/buildmodel
[build_sample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/formrecognizer/ai-form-recognizer/samples/v5/typescript/src/buildModel.ts
[multi_and_single_service]: https://learn.microsoft.com/azure/cognitive-services/cognitive-services-apis-create-account?tabs=multiservice%2Cwindows
[azure_portal_create_fr_resource]: https://ms.portal.azure.com/#create/Microsoft.CognitiveServicesFormRecognizer
[azure_cli_create_fr_resource]: https://learn.microsoft.com/azure/cognitive-services/cognitive-services-apis-create-account-cli?tabs=windows
[fr-labeling-tool]: https://aka.ms/azsdk/formrecognizer/labelingtool
[fr-studio]: https://formrecognizer.appliedai.azure.com/studio
[fr-build-training-set]: https://aka.ms/azsdk/formrecognizer/buildtrainingset
[fr-models]: https://aka.ms/azsdk/formrecognizer/models
[sample-build-classifier]: https://github.com/azure/azure-sdk-for-js/blob/main/sdk/formrecognizer/ai-form-recognizer/samples/v5/typescript/src/buildClassifier.ts
[samples-prebuilt]: https://github.com/azure/azure-sdk-for-js/tree/main/sdk/formrecognizer/ai-form-recognizer/samples-dev/prebuilt/
[samples-prebuilt-businesscard]: https://github.com/azure/azure-sdk-for-js/blob/main/sdk/formrecognizer/ai-form-recognizer/samples-dev/prebuilt/prebuilt-businessCard.ts
[samples-prebuilt-document]: https://github.com/azure/azure-sdk-for-js/blob/main/sdk/formrecognizer/ai-form-recognizer/samples-dev/prebuilt/prebuilt-document.ts
[samples-prebuilt-healthinsurancecard]: https://github.com/azure/azure-sdk-for-js/blob/main/sdk/formrecognizer/ai-form-recognizer/samples-dev/prebuilt/prebuilt-healthInsuranceCard.ts
[samples-prebuilt-iddocument]: https://github.com/azure/azure-sdk-for-js/blob/main/sdk/formrecognizer/ai-form-recognizer/samples-dev/prebuilt/prebuilt-idDocument.ts
[samples-prebuilt-invoice]: https://github.com/azure/azure-sdk-for-js/blob/main/sdk/formrecognizer/ai-form-recognizer/samples-dev/prebuilt/prebuilt-invoice.ts
[samples-prebuilt-layout]: https://github.com/azure/azure-sdk-for-js/blob/main/sdk/formrecognizer/ai-form-recognizer/samples-dev/prebuilt/prebuilt-layout.ts
[samples-prebuilt-read]: https://github.com/azure/azure-sdk-for-js/blob/main/sdk/formrecognizer/ai-form-recognizer/samples-dev/prebuilt/prebuilt-read.ts
[samples-prebuilt-receipt]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/formrecognizer/ai-form-recognizer/samples-dev/prebuilt/prebuilt-receipt.ts
[samples-prebuilt-tax.us.w2]: https://github.com/azure/azure-sdk-for-js/blob/main/sdk/formrecognizer/ai-form-recognizer/samples-dev/prebuilt/prebuilt-tax.us.w2.ts
[trouble-shooting]: https://github.com/azure/azure-sdk-for-js/blob/main/sdk/formrecognizer/ai-form-recognizer/TROUBLESHOOTING.md
