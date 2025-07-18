// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  ContainerDefinition,
  CreateOperationInput,
  FeedOptions,
  PluginConfig,
} from "../../../src/index.js";
import { CosmosClient } from "../../../src/index.js";
import type { Container } from "../../../src/index.js";
import { endpoint } from "../common/_testConfig.js";
import { masterKey } from "../common/_fakeTestSecrets.js";
import {
  getTestContainer,
  getTestDatabase,
  removeAllDatabases,
  testForDiagnostics,
} from "../common/TestHelpers.js";
import { PartitionKeyDefinitionVersion, PartitionKeyKind } from "../../../src/documents/index.js";
import { describe, it, assert, beforeAll, afterAll } from "vitest";
import type { Database } from "../../../src/client/Database/Database.js";
import { PluginOn, ResourceType } from "../../../src/index.js";
import type { Response } from "../../../src/index.js";

const client = new CosmosClient({
  endpoint,
  key: masterKey,
  connectionPolicy: { enableBackgroundEndpointRefreshing: false },
});

describe("Queries", { timeout: 10000 }, () => {
  beforeAll(async () => {
    await removeAllDatabases();
  });

  describe("Query CRUD", () => {
    it("nativeApi Should do queries CRUD operations successfully name based", async () => {
      // create a database
      const database = await getTestDatabase("query test database");
      // query databases
      const querySpec0 = {
        query: "SELECT * FROM root r WHERE r.id=@id",
        parameters: [
          {
            name: "@id",
            value: database.id,
          },
        ],
      };
      const { resources: results } = await client.databases.query(querySpec0).fetchAll();
      assert(results.length > 0, "number of results for the query should be > 0");
      const querySpec1 = {
        query: "SELECT * FROM root r WHERE r.id='" + database.id + "'",
      };
      const { resources: results2 } = await client.databases.query(querySpec1).fetchAll();
      assert(results2.length > 0, "number of results for the query should be > 0");
      const querySpec2 = "SELECT * FROM root r WHERE r.id='" + database.id + "'";
      const { resources: results3 } = await client.databases.query(querySpec2).fetchAll();
      assert(results3.length > 0, "number of results for the query should be > 0");
    });
  });

  describe("QueryIterator", { timeout: 30000 }, () => {
    let resources: { container: Container; doc1: any; doc2: any; doc3: any };

    beforeAll(async () => {
      const container = await getTestContainer("Validate QueryIterator Functionality", client);
      const { resource: doc1 } = await container.items.create({ id: "doc1", prop1: "value1" });
      const { resource: doc2 } = await container.items.create({ id: "doc2", prop1: "value2" });
      const { resource: doc3 } = await container.items.create({ id: "doc3", prop1: "value3" });
      resources = { container, doc1, doc2, doc3 };
    });

    it("fetchAll", async () => {
      const queryIterator = resources.container.items.readAll({ maxItemCount: 2 });

      const { resources: docs } = await testForDiagnostics(
        async () => {
          return queryIterator.fetchAll();
        },
        {
          locationEndpointsContacted: 1,
          // metadataCallCount: 7,
          retryCount: 0,
          gatewayStatisticsTestSpec: [{}, {}], // Two backend data calls.
        },
        true,
      );

      // const { resources: docs } = await queryIterator.fetchAll();
      assert.equal(docs.length, 3, "queryIterator should return all documents using continuation");
      assert.equal(docs[0].id, resources.doc1.id);
      assert.equal(docs[1].id, resources.doc2.id);
      assert.equal(docs[2].id, resources.doc3.id);
    });

    it("asyncIterator", async () => {
      const queryIterator = resources.container.items.readAll({ maxItemCount: 2 });
      let counter = 0;
      for await (const { resources: docs } of queryIterator.getAsyncIterator()) {
        if (counter === 0) {
          assert.equal(docs[0].id, resources.doc1.id, "first document should be doc1");
          assert.equal(docs[1].id, resources.doc2.id, "second document should be doc2");
        } else {
          assert.equal(docs[0].id, resources.doc3.id, "third document should be doc3");
        }
        counter++;
      }
      assert(counter === 2, "iterator should have run 3 times");
    });

    it("executeNext", async () => {
      let queryIterator = resources.container.items.readAll({
        maxItemCount: 2,
      });

      const firstResponse = await testForDiagnostics(
        async () => {
          return queryIterator.fetchNext();
        },
        {
          locationEndpointsContacted: 1,
          // metadataCallCount: 5,
          retryCount: 0,
          gatewayStatisticsTestSpec: [{}], // One backend data calls.
        },
        true,
      );
      // const firstResponse = await queryIterator.fetchNext();
      assert(firstResponse.continuationToken);
      assert(firstResponse.requestCharge > 0, "RequestCharge has to be non-zero");
      assert.equal(firstResponse.resources.length, 2, "first batch size should be 2");
      assert.equal(
        firstResponse.resources[0].id,
        resources.doc1.id,
        "first batch first document should be doc1",
      );
      assert.equal(
        firstResponse.resources[1].id,
        resources.doc2.id,
        "batch first second document should be doc2",
      );
      const { resources: docs2 } = await queryIterator.fetchNext();
      assert.equal(docs2.length, 1, "second batch size is unexpected");
      assert.equal(docs2[0].id, resources.doc3.id, "second batch element should be doc3");

      // validate Iterator.executeNext with continuation token
      queryIterator = resources.container.items.readAll({
        maxItemCount: 2,
        continuationToken: firstResponse.continuationToken,
      });
      const secondResponse = await queryIterator.fetchNext();
      assert(secondResponse.requestCharge > 0, "RequestCharge has to be non-zero");
      assert.equal(
        secondResponse.resources.length,
        1,
        "second batch size with continuation token is unexpected",
      );
      assert.equal(
        secondResponse.resources[0].id,
        resources.doc3.id,
        "second batch element should be doc3",
      );
    });
    it("fails with invalid continuation token", async () => {
      let queryIterator = resources.container.items.readAll({
        maxItemCount: 2,
      });
      const firstResponse = await queryIterator.fetchNext();
      assert(firstResponse.continuationToken);

      queryIterator = resources.container.items.readAll({
        maxItemCount: 2,
        continuationToken: "junk",
      });

      try {
        await queryIterator.fetchNext();
      } catch (e: any) {
        assert(e.message.includes("Invalid Continuation Token"));
      }
    });

    describe("SUM query iterator", { timeout: 30000 }, () => {
      it("returns undefined sum with null value in aggregator", async () => {
        const container = await getTestContainer(
          "Validate QueryIterator Functionality",
          undefined,
          {
            throughput: 10100,
            partitionKey: "/id",
          },
        );
        await container.items.create({ id: "5eded6f8asdfasdfasdfaa21be0109ae34e29", age: 22 });
        await container.items.create({ id: "5eded6f8a21be0109ae34e29", age: 22 });
        await container.items.create({ id: "5edasdfasdfed6f8a21be0109ae34e29", age: null });
        await container.items.create({ id: "5eded6f8a2dd1be0109ae34e29", age: 22 });
        await container.items.create({ id: "AndersenFamily" });
        await container.items.create({ id: "1" });

        const queryIterator = container.items.query("SELECT VALUE SUM(c.age) FROM c");
        const { resources: sum } = await queryIterator.fetchAll();
        assert.equal(sum.length, 0);
      });

      it("returns undefined sum with false value in aggregator", async () => {
        const container = await getTestContainer(
          "Validate QueryIterator Functionality",
          undefined,
          {
            throughput: 10100,
            partitionKey: "/id",
          },
        );
        await container.items.create({ id: "5eded6f8asdfasdfasdfaa21be0109ae34e29", age: 22 });
        await container.items.create({ id: "5eded6f8a21be0109ae34e29", age: 22 });
        await container.items.create({ id: "5edasdfasdfed6f8a21be0109ae34e29", age: false });
        await container.items.create({ id: "5eded6f8a2dd1be0109ae34e29", age: 22 });
        await container.items.create({ id: "AndersenFamily" });
        await container.items.create({ id: "1" });

        const queryIterator = container.items.query("SELECT VALUE SUM(c.age) FROM c");
        const { resources: sum } = await queryIterator.fetchAll();
        assert.equal(sum.length, 0);
      });

      it("returns undefined sum with empty array value in aggregator", async () => {
        const container = await getTestContainer(
          "Validate QueryIterator Functionality",
          undefined,
          {
            throughput: 10100,
            partitionKey: "/id",
          },
        );
        await container.items.create({ id: "5eded6f8asdfasdfasdfaa21be0109ae34e29", age: 22 });
        await container.items.create({ id: "5eded6f8a21be0109ae34e29", age: 22 });
        await container.items.create({ id: "5edasdfasdfed6f8a21be0109ae34e29", age: [] });
        await container.items.create({ id: "5eded6f8a2dd1be0109ae34e29", age: 22 });
        await container.items.create({ id: "AndersenFamily" });
        await container.items.create({ id: "1" });

        const queryIterator = container.items.query("SELECT VALUE SUM(c.age) FROM c");
        const { resources: sum } = await queryIterator.fetchAll();
        assert.equal(sum.length, 0);
      });

      it("returns a valid sum with undefined value in aggregator", async () => {
        const container = await getTestContainer(
          "Validate QueryIterator Functionality",
          undefined,
          {
            throughput: 10100,
            partitionKey: "/id",
          },
        );
        await container.items.create({ id: "5eded6f8asdfasdfasdfaa21be0109ae34e29", age: 22 });
        await container.items.create({ id: "5eded6f8a21be0109ae34e29", age: 22 });
        await container.items.create({ id: "5edasdfasdfed6f8a21be0109ae34e29", age: undefined });
        await container.items.create({ id: "5eded6f8a2dd1be0109ae34e29", age: 22 });
        await container.items.create({ id: "AndersenFamily" });
        await container.items.create({ id: "1" });

        const queryIterator = container.items.query("SELECT VALUE SUM(c.age) FROM c");
        const { resources: sum } = await queryIterator.fetchAll();
        assert.equal(sum.length, 1);
        assert.equal(sum[0], 66);
      });
    });

    describe("MakeList query iterator", { timeout: 30000 }, () => {
      it("returns all documents for query iterator with makeList", async () => {
        const queryIterator = resources.container.items.query(
          "SELECT VALUE MAKELIST (c.prop1) FROM c",
        );
        const { resources: ages } = await queryIterator.fetchAll();
        assert.equal(ages.length, 1);
        assert.deepEqual(ages[0], ["value1", "value2", "value3"]);
      });

      it("returns all documents for query iterator with makeList with multipartitioned container", async () => {
        const container = await getTestContainer("multipartitioned makelist", client, {
          throughput: 12100,
        });
        await container.items.create({ id: "doc1", prop1: "value1" });
        await container.items.create({ id: "doc2", prop1: "value2" });
        await container.items.create({ id: "doc3", prop1: "value3" });
        await container.items.create({ id: "doc4", prop1: "value1" });
        const queryIterator = container.items.query("SELECT VALUE MAKELIST (c.prop1) FROM c");
        const { resources: ages } = await queryIterator.fetchAll();
        assert.equal(ages.length, 1);
        assert.deepEqual(ages[0], ["value1", "value2", "value3", "value1"]);
      });

      it("field of type array", async () => {
        const container = await getTestContainer("array field", client, {
          throughput: 12100,
        });
        await container.items.create({ id: "doc1", prop1: ["value1", "value2"] });
        await container.items.create({ id: "doc2", prop1: [] });
        await container.items.create({ id: "doc3" });
        const queryIterator = container.items.query(
          "SELECT VALUE MAKELIST (c.prop1) FROM c where IS_ARRAY(c.prop1)",
        );
        const { resources: ages } = await queryIterator.fetchAll();
        assert.equal(ages.length, 1);
        assert.deepEqual(ages[0], [["value1", "value2"], []]);
      });

      it("field of type string", async () => {
        const container = await getTestContainer("array field", client, {
          throughput: 12100,
        });
        await container.items.create({ id: "doc1", prop1: ["value1", "value2"] });
        await container.items.create({ id: "doc2", prop1: [] });
        await container.items.create({ id: "doc3", prop1: "value3" });
        const queryIterator = container.items.query(
          "SELECT VALUE MAKELIST (c.prop1) FROM c where IS_STRING(c.prop1)",
        );
        const { resources: ages } = await queryIterator.fetchAll();
        assert.equal(ages.length, 1);
        assert.deepEqual(ages[0], ["value3"]);
      });
    });

    describe("MakeSet query iterator", { timeout: 30000 }, () => {
      it("returns all documents for query iterator with makeSet", async () => {
        await resources.container.items.create({ id: "doc4", prop1: "value1" });
        const queryIterator = resources.container.items.query(
          "SELECT VALUE MAKESET (c.prop1) FROM c",
        );
        const { resources: ages } = await queryIterator.fetchAll();
        assert.equal(ages.length, 1);
        assert.deepEqual(ages[0], ["value1", "value2", "value3"]);
      });

      it("returns all documents for query iterator with makeSet with multipartitioned container", async () => {
        const container = await getTestContainer("multipartitioned makeset", client, {
          throughput: 12100,
        });
        await container.items.create({ id: "doc1", prop1: "value1" });
        await container.items.create({ id: "doc2", prop1: "value2" });
        await container.items.create({ id: "doc3", prop1: "value3" });
        await container.items.create({ id: "doc4", prop1: "value1" });
        const queryIterator = container.items.query("SELECT VALUE MAKESET (c.prop1) FROM c");
        const { resources: ages } = await queryIterator.fetchAll();
        assert.equal(ages.length, 1);
        assert.deepEqual(ages[0], ["value1", "value2", "value3"]);
      });
    });
  });

  describe("QueryIterator: Hierarchical partitions", { timeout: 30000 }, () => {
    let resources: { container: Container; doc1: any; doc2: any; doc3: any; doc4: any };

    beforeAll(async () => {
      const containerDef: ContainerDefinition = {
        partitionKey: {
          paths: ["/prop1", "/prop2"],
          version: PartitionKeyDefinitionVersion.V2,
          kind: PartitionKeyKind.MultiHash,
        },
      };
      const container = await getTestContainer(
        "Validate QueryIterator Functionality",
        client,
        containerDef,
      );
      const { resource: doc1 } = await container.items.create({ id: "doc1", prop1: "a", prop2: 1 });
      const { resource: doc2 } = await container.items.create({ id: "doc2", prop1: "a", prop2: 1 });
      const { resource: doc3 } = await container.items.create({ id: "doc3", prop1: "a", prop2: 1 });
      const { resource: doc4 } = await container.items.create({ id: "doc4", prop1: "b", prop2: 2 });

      resources = { container, doc1, doc2, doc3, doc4 };
    });

    it("fetchAll", async () => {
      const queryIterator = resources.container.items.readAll({ maxItemCount: 2 });
      const { resources: docs } = await queryIterator.fetchAll();
      assert.equal(docs.length, 4, "queryIterator should return all documents using continuation");
      assert.equal(docs[0].id, resources.doc1.id);
      assert.equal(docs[1].id, resources.doc2.id);
      assert.equal(docs[2].id, resources.doc3.id);
      assert.equal(docs[3].id, resources.doc4.id);
    });

    it("asyncIterator", async () => {
      const queryIterator = resources.container.items.readAll({ maxItemCount: 2 });
      let counter = 0;
      for await (const { resources: docs } of queryIterator.getAsyncIterator()) {
        if (counter === 0) {
          assert.equal(docs[0].id, resources.doc1.id, "first document should be doc1");
          assert.equal(docs[1].id, resources.doc2.id, "second document should be doc2");
        } else if (counter === 1) {
          assert.equal(docs[0].id, resources.doc3.id, "third document should be doc3");
          assert.equal(docs[1].id, resources.doc4.id, "fourth document should be doc4");
        }
        counter++;
      }
      assert.strictEqual(counter, 3, "iterator should have run 4 times");
    });

    it("asyncIterator - with partitionKey parameter", async () => {
      const queryIterator = resources.container.items.readAll({
        maxItemCount: 2,
        partitionKey: ["a", 1],
      });
      let counter = 0;
      for await (const { resources: docs } of queryIterator.getAsyncIterator()) {
        if (counter === 0) {
          assert.equal(docs[0].id, resources.doc1.id, "first document should be doc1");
          assert.equal(docs[1].id, resources.doc2.id, "second document should be doc2");
        } else {
          assert.equal(docs[0].id, resources.doc3.id, "third document should be doc3");
        }
        counter++;
      }
      assert.strictEqual(counter, 2, "iterator should have run 3 times");
    });

    it("executeNext", async () => {
      let queryIterator = resources.container.items.readAll({
        maxItemCount: 2,
        partitionKey: ["a", 1],
      });
      const firstResponse = await queryIterator.fetchNext();
      assert(firstResponse.continuationToken);
      assert(firstResponse.requestCharge > 0, "RequestCharge has to be non-zero");
      assert.equal(firstResponse.resources.length, 2, "first batch size should be 2");
      assert.equal(
        firstResponse.resources[0].id,
        resources.doc1.id,
        "first batch first document should be doc1",
      );
      assert.equal(
        firstResponse.resources[1].id,
        resources.doc2.id,
        "batch first second document should be doc2",
      );
      const { resources: docs2 } = await queryIterator.fetchNext();
      assert.equal(docs2.length, 1, "second batch size is unexpected");
      assert.equal(docs2[0].id, resources.doc3.id, "second batch element should be doc3");

      // validate Iterator.executeNext with continuation token
      queryIterator = resources.container.items.readAll({
        maxItemCount: 2,
        continuationToken: firstResponse.continuationToken,
        partitionKey: ["a", 1],
      });
      const secondResponse = await queryIterator.fetchNext();
      assert(secondResponse.requestCharge > 0, "RequestCharge has to be non-zero");
      assert.equal(
        secondResponse.resources.length,
        1,
        "second batch size with continuation token is unexpected",
      );
      assert.equal(
        secondResponse.resources[0].id,
        resources.doc3.id,
        "second batch element should be doc3",
      );
    });
    it("fails with invalid continuation token", async () => {
      let queryIterator = resources.container.items.readAll({
        maxItemCount: 2,
        partitionKey: ["a", 1],
      });
      const firstResponse = await queryIterator.fetchNext();
      assert(firstResponse.continuationToken);

      queryIterator = resources.container.items.readAll({
        maxItemCount: 2,
        continuationToken: "junk",
      });

      try {
        await queryIterator.fetchNext();
      } catch (e: any) {
        assert(e.message.includes("Invalid Continuation Token"));
      }
    });

    describe("SUM query iterator", { timeout: 30000 }, () => {
      it("return sum for given partition key", async () => {
        const container = await getTestContainer(
          "Validate QueryIterator Functionality",
          undefined,
          {
            throughput: 10100,
            partitionKey: {
              paths: ["/city", "/address/zip"],
              version: PartitionKeyDefinitionVersion.V2,
              kind: PartitionKeyKind.MultiHash,
            },
          },
        );
        await container.items.create({
          id: "5eded6f8asdfasdfasdfaa21be0109ae34e29",
          age: 22,
          city: "a",
          address: { zip: 1 },
        });
        await container.items.create({
          id: "5eded6f8a21be0109ae34e29",
          age: 22,
          city: "a",
          address: { zip: 1 },
        });
        await container.items.create({
          id: "5edasdfasdfed6f8a21be0109ae34e29",
          age: 22,
          city: "a",
          address: { zip: 1 },
        });
        await container.items.create({
          id: "5eded6f8a2dd1be0109ae34e29",
          age: 22,
          city: "b",
          address: { zip: 2 },
        });
        await container.items.create({
          id: "AndersenFamily",
          age: 11,
          city: "b",
          address: { zip: 2 },
        });
        await container.items.create({
          id: "5esdfeded6f8a2dd1be0109ae34e29",
          age: 113,
        });
        await container.items.create({
          id: "5edsfesdfeded6f8a2dd1be0109ae34e29",
          age: 115,
          address: { zip: 2 },
        });
        await container.items.create({ id: "1", age: 100, city: "b", address: { zip: 2 } });

        const queryIterator = container.items.query("SELECT VALUE SUM(c.age) FROM c", {
          partitionKey: ["a", 1],
        });
        const { resources: sum } = await queryIterator.fetchAll();
        assert.equal(sum.length, 1);
        assert.strictEqual(sum[0], 66, "Sum should be 66");

        const queryIterator2 = container.items.query("SELECT VALUE SUM(c.age) FROM c", {
          partitionKey: ["b", 2],
        });
        const { resources: sum2 } = await queryIterator2.fetchAll();
        assert.equal(sum2.length, 1);
        assert.strictEqual(sum2[0], 133, "Sum should be 133");

        const queryIterator3 = container.items.query("SELECT VALUE SUM(c.age) FROM c", {
          partitionKey: [undefined, undefined],
        });
        const { resources: sum3 } = await queryIterator3.fetchAll();
        assert.equal(sum3.length, 1);
        assert.strictEqual(sum3[0], 113, "Sum should be 113");

        const queryIterator4 = container.items.query("SELECT VALUE SUM(c.age) FROM c", {
          partitionKey: [undefined, 2],
        });
        const { resources: sum4 } = await queryIterator4.fetchAll();
        assert.equal(sum4.length, 1);
        assert.strictEqual(sum4[0], 115, "Sum should be 115");
      });
    });
  });

  describe("Query With DISTINCT, ORDER BY and LIMIT", () => {
    let container: Container;

    beforeAll(async () => {
      const containerDefinition = {
        id: "conti1",
        partitionKey: { paths: ["/name"], kind: PartitionKeyKind.Hash },
        throughput: 13000,
      };
      container = await getTestContainer(
        "Query With DISTINCT, ORDER BY and LIMIT",
        client,
        containerDefinition,
      );
      const sampleData = {
        id: "1",
        name: "A",
        age: 28,
      };
      for (let i = 1; i <= 10; i++) {
        sampleData.id = i.toString() + "A";
        sampleData.name = "A";
        sampleData.age = i;
        await container.items.create(sampleData);
      }
      for (let i = 1; i <= 10; i++) {
        sampleData.id = i.toString() + "B";
        sampleData.name = "B";
        sampleData.age = i;
        await container.items.create(sampleData);
      }
      for (let i = 1; i <= 10; i++) {
        sampleData.id = i.toString() + "C";
        sampleData.name = "C";
        sampleData.age = i;
        await container.items.create(sampleData);
      }
    });

    const expectedResult = [
      { age: 1 },
      { age: 2 },
      { age: 3 },
      { age: 4 },
      { age: 5 },
      { age: 6 },
      { age: 7 },
      { age: 8 },
      { age: 9 },
      { age: 10 },
    ];

    it("query with offset 0 and limit 10 should fetch correct number of results", async () => {
      const query = "SELECT DISTINCT c.age FROM c ORDER BY c.age ASC OFFSET 0 LIMIT 10";
      const options: FeedOptions = {
        forceQueryPlan: true,
        maxItemCount: 2,
      };
      const queryIterator = container.items.query(query, options);
      const { resources: results } = await queryIterator.fetchAll();
      assert.deepEqual(results, expectedResult);
    });

    it("query with offset 5 and limit 10 should fetch correct number of results", async () => {
      const query = "SELECT DISTINCT c.age FROM c ORDER BY c.age ASC OFFSET 5 LIMIT 10";
      const options: FeedOptions = {
        forceQueryPlan: true,
        maxItemCount: 2,
      };
      const queryIterator = container.items.query(query, options);
      const { resources: results } = await queryIterator.fetchAll();
      assert.deepEqual(results, expectedResult.slice(5));
    });

    it("query with TOP 10 should fetch correct number of results", async () => {
      const query = "SELECT DISTINCT TOP 10  c.age FROM c ORDER BY c.age ASC";
      const options: FeedOptions = {
        forceQueryPlan: true,
        maxItemCount: 2,
      };
      const queryIterator = container.items.query(query, options);
      const { resources: results } = await queryIterator.fetchAll();
      assert.deepEqual(results, expectedResult);
    });
  });
});

describe("Full Text Search queries", () => {
  let database: Database;
  const dbName = `fts-query-db`;

  beforeAll(async () => {
    await removeAllDatabases();
    const client1 = new CosmosClient({ endpoint, key: masterKey });
    const { database: db } = await client1.databases.createIfNotExists({ id: dbName });
    database = db;
  });

  afterAll(async () => {
    if (database) await database.delete();
  });

  it("should execute a full text query targeting an individual partition via query plan using WHERE clause", async () => {
    const containerName = "full text search partition where test";
    let container;
    try {
      const result = await database.containers.createIfNotExists({
        id: containerName,
        partitionKey: { paths: ["/pk"] },
        indexingPolicy: {
          includedPaths: [{ path: "/*" }],
          fullTextIndexes: [{ path: "/text" }],
        },
        fullTextPolicy: {
          defaultLanguage: "en-US",
          fullTextPaths: [{ path: "/text", language: "en-US" }],
        },
        throughput: 25000,
      });
      container = result.container;
      // Create items in different partitions
      const responseA1 = await container.items.create({ id: "1", pk: "A", text: "I like to swim" });
      const responseZ = await container.items.create({ id: "2", pk: "Z", text: "I like to swim" });
      const responseA2 = await container.items.create({ id: "3", pk: "A", text: "I like to run" });
      const pkRangeIdA1 = responseA1.headers["x-ms-documentdb-partitionkeyrangeid"];
      const pkRangeIdZ = responseZ.headers["x-ms-documentdb-partitionkeyrangeid"];
      const pkRangeIdA2 = responseA2.headers["x-ms-documentdb-partitionkeyrangeid"];
      assert.notEqual(pkRangeIdA1, pkRangeIdZ);
      assert.equal(pkRangeIdA1, pkRangeIdA2);

      // FullTextContains
      let query = "SELECT * FROM c WHERE c.pk = 'A' AND FullTextContains(c.text, 'swim')";
      let { resources } = await container.items.query(query).fetchAll();
      assert.equal(resources.length, 1);
      assert.equal(resources[0].pk, "A");
      assert.equal(resources[0].text, "I like to swim");

      // FullTextContainsAll
      query = "SELECT * FROM c WHERE c.pk = 'A' AND FullTextContainsAll(c.text, 'swim', 'run')";
      resources = (await container.items.query(query).fetchAll()).resources;
      assert.equal(resources.length, 0);

      // FullTextContainsAny
      query = "SELECT * FROM c WHERE c.pk = 'A' AND FullTextContainsAny(c.text, 'swim', 'run')";
      resources = (await container.items.query(query).fetchAll()).resources;
      assert.equal(resources.length, 2);
    } finally {
      if (container) await container.delete();
    }
  });

  it("should execute a cross-partition full text query", async () => {
    const containerName = "full text search cross partition test";
    let container;
    try {
      const result = await database.containers.createIfNotExists({
        id: containerName,
        partitionKey: { paths: ["/pk"] },
        indexingPolicy: {
          includedPaths: [{ path: "/*" }],
          fullTextIndexes: [{ path: "/text" }],
        },
        fullTextPolicy: {
          defaultLanguage: "en-US",
          fullTextPaths: [{ path: "/text", language: "en-US" }],
        },
        throughput: 25000,
      });
      container = result.container;

      // Create items in different partitions
      const responseA = await container.items.create({ id: "1", pk: "A", text: "I like to swim" });
      const responseZ = await container.items.create({
        id: "2",
        pk: "Z",
        text: "I like to swim and run",
      });
      const responseM = await container.items.create({ id: "3", pk: "M", text: "I like to run" });
      const pkRangeIdA = responseA.headers["x-ms-documentdb-partitionkeyrangeid"];
      const pkRangeIdZ = responseZ.headers["x-ms-documentdb-partitionkeyrangeid"];
      const pkRangeIdM = responseM.headers["x-ms-documentdb-partitionkeyrangeid"];
      assert.notEqual(pkRangeIdA, pkRangeIdZ);
      assert.notEqual(pkRangeIdA, pkRangeIdM);
      assert.notEqual(pkRangeIdZ, pkRangeIdM);

      // FullTextContains
      let query = "SELECT * FROM c WHERE FullTextContains(c.text, 'swim')";
      let { resources } = await container.items.query(query, { forceQueryPlan: true }).fetchAll();
      let pks = resources.map((r: any) => r.pk);
      assert.equal(resources.length, 2);
      assert(pks.includes("A"));
      assert(pks.includes("Z"));

      // FullTextContainsAll
      query = "SELECT * FROM c WHERE FullTextContainsAll(c.text, 'swim', 'run')";
      resources = (await container.items.query(query, { forceQueryPlan: true }).fetchAll())
        .resources;
      pks = resources.map((r: any) => r.pk);
      assert.equal(resources.length, 1);
      assert(pks.includes("Z"));

      // FullTextContainsAny
      query = "SELECT * FROM c WHERE FullTextContainsAny(c.text, 'swim', 'run')";
      resources = (await container.items.query(query, { forceQueryPlan: true }).fetchAll())
        .resources;
      pks = resources.map((r: any) => r.pk);
      assert.equal(resources.length, 3);
      assert(pks.includes("A"));
      assert(pks.includes("Z"));
      assert(pks.includes("M"));
    } finally {
      if (container) await container.delete();
    }
  });

  it("should execute a full text single partition query using hierarchical partition keys", async () => {
    const containerName = "full text search hierarchical partition test";
    let container;
    try {
      const result = await database.containers.createIfNotExists({
        id: containerName,
        partitionKey: {
          paths: ["/country", "/city"],
          version: 2,
          kind: PartitionKeyKind.MultiHash,
        },
        indexingPolicy: {
          includedPaths: [{ path: "/*" }],
          fullTextIndexes: [{ path: "/text" }],
        },
        fullTextPolicy: {
          defaultLanguage: "en-US",
          fullTextPaths: [{ path: "/text", language: "en-US" }],
        },
        throughput: 1000,
      });
      container = result.container;
      await container.items.create({ id: "1", country: "US", city: "NY", text: "I like to swim" });
      await container.items.create({ id: "2", country: "US", city: "SF", text: "I like to swim" });
      await container.items.create({
        id: "3",
        country: "CA",
        city: "Toronto",
        text: "I like to run",
      });

      // FullTextContains with hierarchical partition keys
      let query =
        "SELECT * FROM c WHERE c.country = 'US' AND c.city = 'NY' AND FullTextContains(c.text, 'swim')";
      let { resources } = await container.items.query(query).fetchAll();
      assert.equal(resources.length, 1);
      assert.equal(resources[0].country, "US");
      assert.equal(resources[0].city, "NY");
      assert.equal(resources[0].text, "I like to swim");

      // FullTextContainsAll with hierarchical partition keys
      query =
        "SELECT * FROM c WHERE c.country = 'US' AND c.city = 'NY' AND FullTextContainsAll(c.text, 'swim', 'run')";
      resources = (await container.items.query(query).fetchAll()).resources;
      assert.equal(resources.length, 0);
      // FullTextContainsAny with hierarchical partition keys
      query =
        "SELECT * FROM c WHERE c.country = 'US' AND c.city = 'NY' AND FullTextContainsAny(c.text, 'swim', 'run')";
      resources = (await container.items.query(query).fetchAll()).resources;
      assert.equal(resources.length, 1);
      assert.equal(resources[0].country, "US");
      assert.equal(resources[0].city, "NY");
      assert.equal(resources[0].text, "I like to swim");
    } finally {
      if (container) await container.delete();
    }
  });

  it("should execute a full text cross-partition query using hierarchical partition keys", async () => {
    const containerName = "fts cross partition hierarchical partition test";
    let container;
    try {
      const result = await database.containers.createIfNotExists({
        id: containerName,
        partitionKey: {
          paths: ["/country", "/city"],
          version: 2,
          kind: PartitionKeyKind.MultiHash,
        },
        indexingPolicy: {
          includedPaths: [{ path: "/*" }],
          fullTextIndexes: [{ path: "/text" }],
        },
        fullTextPolicy: {
          defaultLanguage: "en-US",
          fullTextPaths: [{ path: "/text", language: "en-US" }],
        },
        throughput: 30000,
      });
      container = result.container;
      // Create items in different partitions using diverse partition key values
      const response1 = await container.items.create({
        id: "1",
        country: "US",
        city: "NewYork",
        text: "I like to swim and play",
      });
      const response2 = await container.items.create({
        id: "2",
        country: "India",
        city: "Delhi",
        text: "I like to swim and run",
      });
      const response3 = await container.items.create({
        id: "3",
        country: "Australia",
        city: "Sidney",
        text: "I like to run",
      });

      const pkRangeId1 = response1.headers["x-ms-documentdb-partitionkeyrangeid"];
      const pkRangeId2 = response2.headers["x-ms-documentdb-partitionkeyrangeid"];
      const pkRangeId3 = response3.headers["x-ms-documentdb-partitionkeyrangeid"];
      assert.notEqual(pkRangeId1, pkRangeId2);
      assert.notEqual(pkRangeId1, pkRangeId3);
      assert.notEqual(pkRangeId2, pkRangeId3);

      // FullTextContains with hierarchical partition keys
      let query = "SELECT * FROM c WHERE FullTextContains(c.text, 'play')";
      let { resources } = await container.items.query(query).fetchAll();
      assert.equal(resources.length, 1);
      assert.equal(resources[0].country, "US");
      assert.equal(resources[0].city, "NewYork");
      assert.equal(resources[0].text, "I like to swim and play");

      // FullTextContainsAll with hierarchical partition keys
      query = "SELECT * FROM c WHERE FullTextContainsAll(c.text, 'swim', 'run')";
      resources = (await container.items.query(query).fetchAll()).resources;
      assert.equal(resources.length, 1);
      assert.equal(resources[0].country, "India");
      assert.equal(resources[0].city, "Delhi");
      assert.equal(resources[0].text, "I like to swim and run");

      // FullTextContainsAny with hierarchical partition keys
      query = "SELECT * FROM c WHERE FullTextContainsAny(c.text, 'swim', 'run')";
      resources = (await container.items.query(query).fetchAll()).resources;
      assert.equal(resources.length, 3);
      const pks = resources.map((r: any) => `${r.country}-${r.city}`);
      assert(pks.includes("US-NewYork"));
      assert(pks.includes("India-Delhi"));
      assert(pks.includes("Australia-Sidney"));
    } finally {
      if (container) await container.delete();
    }
  });

  it("should use the countIf aggregate with full text search", async () => {
    const containerName = "full text search countIf test";
    let container;
    try {
      const result = await database.containers.createIfNotExists({
        id: containerName,
        partitionKey: { paths: ["/pk"] },
        indexingPolicy: {
          includedPaths: [{ path: "/*" }],
          fullTextIndexes: [{ path: "/text" }],
        },
        fullTextPolicy: {
          defaultLanguage: "en-US",
          fullTextPaths: [{ path: "/text", language: "en-US" }],
        },
        throughput: 25000,
      });
      container = result.container;
      // Create items in different partitions
      const responseA = await container.items.create({ id: "1", pk: "A", text: "I like to swim" });
      const responseZ = await container.items.create({ id: "2", pk: "Z", text: "I like to run" });
      const responseM = await container.items.create({
        id: "3",
        pk: "M",
        text: "I like to swim and run",
      });
      const pkRangeIdA = responseA.headers["x-ms-documentdb-partitionkeyrangeid"];
      const pkRangeIdZ = responseZ.headers["x-ms-documentdb-partitionkeyrangeid"];
      const pkRangeIdM = responseM.headers["x-ms-documentdb-partitionkeyrangeid"];
      assert.notEqual(pkRangeIdA, pkRangeIdZ);
      assert.notEqual(pkRangeIdA, pkRangeIdM);
      assert.notEqual(pkRangeIdZ, pkRangeIdM);

      // Use countIf with FullTextContains
      let query = "SELECT VALUE countIf(FullTextContains(c.text, 'swim')) FROM c";
      let { resources } = await container.items.query(query).fetchAll();
      assert.equal(resources[0], 2);

      // Use countIf with FullTextContainsAll
      query = "SELECT VALUE countIf(FullTextContainsAll(c.text, 'swim', 'run')) FROM c";
      resources = (await container.items.query(query).fetchAll()).resources;
      assert.equal(resources[0], 1);

      // Use countIf with FullTextContainsAny
      query = "SELECT VALUE countIf(FullTextContainsAny(c.text, 'swim', 'run')) FROM c";
      resources = (await container.items.query(query).fetchAll()).resources;
      assert.equal(resources[0], 3);
    } finally {
      if (container) await container.delete();
    }
  });

  it("should handle partition split during long-running full text queries", async () => {
    let numpkRangeRequests = 0;
    const plugins: PluginConfig[] = [
      {
        on: PluginOn.request,
        plugin: async (context, _diagNode, next) => {
          if (context.resourceType === ResourceType.pkranges) {
            let response: Response<any>;
            if (numpkRangeRequests === 0) {
              response = {
                headers: {},
                result: {
                  PartitionKeyRanges: [
                    {
                      _rid: "RRsbAKHytdECAAAAAAAAUA==",
                      id: "1",
                      _etag: '"00000000-0000-0000-683c-819a242201db"',
                      minInclusive: "",
                      maxExclusive: "FF",
                    },
                  ],
                },
              };
              response.code = 200;
              numpkRangeRequests++;
              return response;
            }
            numpkRangeRequests++;
          }
          const res = await next(context);
          return res;
        },
      },
    ];
    const client1 = new CosmosClient({
      endpoint: endpoint,
      key: masterKey,
      plugins: plugins,
    });

    // Create a test database and container
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { database } = await client1.databases.createIfNotExists({ id: "partitionSplitTestDb" });
    const { container } = await database.containers.createIfNotExists({
      id: "partitionSplitTestContainer",
      partitionKey: { paths: ["/pk"] },
      indexingPolicy: {
        includedPaths: [{ path: "/*" }],
        fullTextIndexes: [{ path: "/text" }],
      },
      fullTextPolicy: {
        defaultLanguage: "en-US",
        fullTextPaths: [{ path: "/text", language: "en-US" }],
      },
      throughput: 1000,
    });
    // Replace the for loop with the executeBulkOperations API call:
    const operations: CreateOperationInput[] = [...Array(50).keys()].map((i) => ({
      operationType: "Create",
      partitionKey: `A${i}`,
      resourceBody: { id: `${i}`, pk: `A${i}`, text: "I like to swim" },
    }));
    await container.items.executeBulkOperations(operations);
    // Start a long-running full text query
    const query = "SELECT * FROM c WHERE FullTextContains(c.text, 'swim')";
    const iterator = container.items.query(query, { maxItemCount: 10 });

    let total = 0;
    while (iterator.hasMoreResults()) {
      const { resources } = await iterator.fetchNext();
      total += resources.length;
    }

    // Assert all items were returned
    assert.equal(total, 50);

    await database.delete();
  });
});
