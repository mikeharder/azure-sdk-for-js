// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the Skillset Operations.
 */

const { SearchIndexerClient, AzureKeyCredential } = require("@azure/search-documents");

const dotenv = require("dotenv");
dotenv.config();

const endpoint = process.env.ENDPOINT || "";
const apiKey = process.env.SEARCH_API_ADMIN_KEY || "";

const skillsetName = "example-skillset-sample-1";

async function createSkillset(skillsetName, client) {
  console.log(`Creating Skillset Operation`);
  const skillset = {
    name: skillsetName,
    description: `Skillset description`,
    skills: [
      {
        odatatype: "#Microsoft.Skills.Text.EntityRecognitionSkill",
        inputs: [
          {
            name: "text",
            source: "/document/merged_content",
          },
          {
            name: "languageCode",
            source: "/document/language",
          },
        ],
        outputs: [
          {
            name: "persons",
            targetName: "people",
          },
          {
            name: "organizations",
            targetName: "organizations",
          },
          {
            name: "locations",
            targetName: "locations",
          },
        ],
      },
    ],
  };
  await client.createSkillset(skillset);
}

async function getAndUpdateSkillset(skillsetName, client) {
  console.log(`Get And Update Skillset Operation`);
  const skillset = await client.getSkillset(skillsetName);

  skillset.skills[0].outputs = [
    {
      name: "persons",
      targetName: "people",
    },
    {
      name: "organizations",
      targetName: "organizations",
    },
  ];

  await client.createOrUpdateSkillset(skillset);
}

async function listSkillsets(client) {
  console.log(`List Skillset Operation`);
  const listOfSkillsets = await client.listSkillsets();

  console.log(`\tList of Skillsets`);
  console.log(`\t******************`);
  for (let skillset of listOfSkillsets) {
    console.log(`Name: ${skillset.name}`);
    console.log(`Description: ${skillset.description}`);
    console.log(`Skills`);
    console.log(`******`);
    for (let skill of skillset.skills) {
      console.log(`ODataType: ${skill.odatatype}`);
      console.log(`Inputs`);
      for (let input of skill.inputs) {
        console.log(`\tName: ${input.name}`);
        console.log(`\tSource: ${input.source}`);
      }
      console.log(`Outputs`);
      for (let output of skill.outputs) {
        console.log(`\tName: ${output.name}`);
        console.log(`\tTarget Name: ${output.targetName}`);
      }
    }
  }
}

async function deleteSkillset(skillsetName, client) {
  console.log(`Deleting Skillset Operation`);
  await client.deleteSkillset(skillsetName);
}

async function main() {
  console.log(`Running Skillset Operations Sample....`);
  if (!endpoint || !apiKey) {
    console.log("Make sure to set valid values for endpoint and apiKey with proper authorization.");
    return;
  }
  const client = new SearchIndexerClient(endpoint, new AzureKeyCredential(apiKey));
  try {
    await createSkillset(skillsetName, client);
    await getAndUpdateSkillset(skillsetName, client);
    await listSkillsets(client);
  } finally {
    await deleteSkillset(skillsetName, client);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
