// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { AvroSerializer } from "../../src/index.js";
import type { SchemaRegistry } from "@azure/schema-registry";
import { assertError } from "./utils/assertError.js";
import {
  createPipelineWithCredential,
  createTestRegistry,
  removeSchemas,
} from "./utils/mockedRegistryClient.js";
import { createTestSerializer } from "./utils/mockedSerializer.js";
import { testGroup, testSchemaName } from "./utils/dummies.js";
import { randomUUID } from "@azure/core-util";
import { isLiveMode, Recorder } from "@azure-tools/test-recorder";
import type { HttpClient, Pipeline } from "@azure/core-rest-pipeline";
import { createDefaultHttpClient } from "@azure/core-rest-pipeline";
import { describe, it, assert, beforeEach, afterEach, afterAll, expect } from "vitest";

describe("Error scenarios", function () {
  let serializer: AvroSerializer;
  let registry: SchemaRegistry;
  let serializerNoAutoReg: AvroSerializer;
  let recorder: Recorder;
  const schemaList: string[] = [];
  let client: HttpClient;
  let pipeline: Pipeline;

  beforeEach(async (ctx) => {
    client = createDefaultHttpClient();
    pipeline = createPipelineWithCredential();
    recorder = new Recorder(ctx);
    registry = createTestRegistry({ recorder });
    serializer = await createTestSerializer({
      registry,
      serializerOptions: {
        autoRegisterSchemas: true,
        groupName: testGroup,
      },
      recorder,
    });
  });

  describe("Schema validation", function () {
    describe("Without auto register schema", function () {
      beforeEach(async () => {
        serializerNoAutoReg = await createTestSerializer({
          serializerOptions: {
            autoRegisterSchemas: false,
            groupName: testGroup,
          },
          recorder,
        });
      });

      afterAll(async function () {
        schemaList.push(testSchemaName);
        await removeSchemas(schemaList, pipeline, client);
      });

      it("schema to serialize with is not found", async () => {
        const schema = JSON.stringify({
          type: "record",
          name: "NeverRegistered",
          namespace: "my.example",
          fields: [{ name: "count", type: "int" }],
        });
        await expect(serializerNoAutoReg.serialize({ count: 42 }, schema)).rejects.toThrow(
          /not found/,
        );
      });
      it("schema to deserialize with is not found", async () => {
        await expect(
          serializerNoAutoReg.deserialize({
            data: Uint8Array.from([0]),
            contentType: `avro/binary+${randomUUID()}`,
          }),
        ).rejects.toThrow(/does not exist/);
      });
    });

    describe("With auto register schema", function () {
      afterEach(async () => {
        await removeSchemas(schemaList, pipeline, client);
      });
      it("invalid reader schema", async () => {
        const writerSchema = {
          type: "record",
          name: "AvroUser",
          namespace: "validation",
          fields: [
            {
              name: "name",
              type: "string",
            },
            {
              name: "favoriteNumber",
              type: "int",
            },
          ],
        };
        const invalidReaderSchema = {
          type: "record",
          name: "AvroUser",
          namespace: "validation",
          fields: [
            {
              name: "name",
              type: {
                type: "array",
                values: [],
              },
            },
          ],
        };
        const message = await serializer.serialize(
          {
            name: "",
            favoriteNumber: 1,
          },
          JSON.stringify(writerSchema),
        );
        await assertError(
          serializer.deserialize(message, {
            schema: JSON.stringify(invalidReaderSchema),
          }),
          {
            causeMessage: /missing array items/,
          },
        );
        schemaList.push(`${writerSchema.namespace}.${writerSchema.name}`);
      });
      it("incompatible reader schema", async () => {
        const writerSchema = {
          type: "record",
          name: "AvroUser",
          namespace: "validation",
          fields: [
            {
              name: "name",
              type: "string",
            },
            {
              name: "favoriteNumber",
              type: "int",
            },
          ],
        };
        const incompatibleReaderSchema = {
          type: "record",
          name: "AvroUser",
          namespace: "validation",
          fields: [
            {
              name: "name",
              type: "string",
            },
            {
              name: "age",
              type: "int",
            },
          ],
        };
        const message = await serializer.serialize(
          {
            name: "",
            favoriteNumber: 1,
          },
          JSON.stringify(writerSchema),
        );
        await assertError(
          serializer.deserialize(message, {
            schema: JSON.stringify(incompatibleReaderSchema),
          }),
          {
            causeMessage: /no matching field for default-less validation.AvroUser.age/,
          },
        );
        schemaList.push(`${writerSchema.namespace}.${writerSchema.name}`);
      });
      it("invalid writer schema at time of deserializing", async function ({ skip }) {
        /**
         * This test can not run in live mode because the service will validate the schema.
         */
        if (isLiveMode()) {
          skip();
        }
        const { id } = await registry.registerSchema({
          definition: "",
          format: "avro",
          groupName: testGroup,
          name: "test",
        });
        const writerSchema = {
          type: "record",
          name: "AvroUser",
          namespace: "validation",
          fields: [
            {
              name: "name",
              type: "string",
            },
            {
              name: "favoriteNumber",
              type: "int",
            },
          ],
        };
        const { data } = await serializer.serialize(
          {
            name: "",
            favoriteNumber: 1,
          },
          JSON.stringify(writerSchema),
        );
        await assertError(
          serializer.deserialize({
            data,
            contentType: `avro/binary+${id}`,
          }),
          {
            causeMessage: /Unexpected end of JSON input/,
          },
        );
      });
      it("incompatible writer schema", async () => {
        const writerSchema1 = {
          type: "record",
          name: "AvroUser",
          namespace: "validation",
          fields: [
            {
              name: "name",
              type: "string",
            },
            {
              name: "favoriteNumber",
              type: "int",
            },
          ],
        };
        const writerSchema2 = {
          type: "record",
          name: "AvroUser",
          namespace: "validation",
          fields: [
            {
              name: "name",
              type: "string",
            },
            {
              name: "description",
              type: "string",
            },
          ],
        };
        const { id } = await registry.registerSchema({
          definition: JSON.stringify(writerSchema2),
          format: "avro",
          groupName: testGroup,
          name: "test",
        });
        const { data } = await serializer.serialize(
          {
            name: "",
            favoriteNumber: 1,
          },
          JSON.stringify(writerSchema1),
        );
        await assertError(
          serializer.deserialize({
            data,
            contentType: `avro/binary+${id}`,
          }),
          {
            causeMessage: /truncated buffer/,
          },
        );
        schemaList.push("test", `${writerSchema1.namespace}.${writerSchema1.name}`);
      });
    });

    describe("Malformed schemas", function () {
      it("unrecognized content type", async () => {
        await expect(
          serializer.deserialize({
            data: Buffer.alloc(1),
            contentType: "application/json+1234",
          }),
        ).rejects.toThrow(/application\/json.*avro\/binary/);
      });
      it("a schema with non-avro format", async () => {
        await expect(
          registry.registerSchema({
            name: "_",
            definition: "_",
            format: "notavro",
            groupName: testGroup,
          }),
        ).rejects.toThrow(/Invalid schema type for PUT request.*notavro/);
      });
      it("not JSON schema", async () => {
        await assertError(serializer.serialize(null, ""), {
          causeMessage: /Unexpected end of JSON input/,
        });
      });
      it("null schema", async () => {
        await assertError(
          /**
           * The type checking will prevent this from happening but I am including
           * it for completeness.
           */
          serializer.serialize(null, null as any),
          {
            causeMessage: /invalid type: null/,
          },
        );
      });
      it("schema without a name", async () => {
        /**
         * The serializer expects a record schema as the top-level schema
         */
        await assertError(
          serializer.serialize(
            null,
            JSON.stringify({
              type: "array",
              items: "int",
            }),
          ),
          {
            message: /Schema must have a name/,
          },
        );
      });
      it("enum schema without symbols", async () => {
        await assertError(
          serializer.serialize(
            null,
            JSON.stringify({
              type: "record",
              name: "foo",
              fields: [
                {
                  name: "enum",
                  type: {
                    type: "enum",
                  },
                },
              ],
            }),
          ),
          {
            causeMessage: /invalid enum symbols: undefined/,
          },
        );
      });
      it("fixed schema without size", async () => {
        await assertError(
          serializer.serialize(
            null,
            JSON.stringify({
              type: "record",
              name: "foo",
              fields: [
                {
                  name: "fixed",
                  type: {
                    type: "fixed",
                  },
                },
              ],
            }),
          ),
          {
            causeMessage: /invalid fixed size/,
          },
        );
      });
      it("array schema without items", async () => {
        await assertError(
          serializer.serialize(
            null,
            JSON.stringify({
              type: "record",
              name: "foo",
              fields: [
                {
                  name: "array",
                  type: {
                    type: "array",
                  },
                },
              ],
            }),
          ),
          {
            causeMessage: /missing array items: {"type":"array"}/,
          },
        );
      });
      it("map schema without values", async () => {
        await assertError(
          serializer.serialize(
            null,
            JSON.stringify({
              type: "record",
              name: "foo",
              fields: [
                {
                  name: "map",
                  type: {
                    type: "map",
                  },
                },
              ],
            }),
          ),
          {
            causeMessage: /missing map values: {"type":"map"}/,
          },
        );
      });
      it("record schema without fields", async () => {
        await assertError(
          serializer.serialize(
            null,
            JSON.stringify({
              type: "record",
              name: "foo",
            }),
          ),
          {
            causeMessage: /non-array record fields: undefined/,
          },
        );
      });
    });
  });
  describe("Unserialized value validation", function () {
    afterEach(async () => {
      schemaList.push("validation.User");
      await removeSchemas(schemaList, pipeline, client);
    });

    it("schema is still registered if serialization fails", async function ({ skip }) {
      /**
       * This test checks for service calls using the onResponse callback but
       * onResponse is not implemented in the mocked registry because it will
       * add very little value so the test is skipped in playback mode.
       */
      if (!isLiveMode()) {
        skip();
      }
      let ran = false;
      const unusedRegistry = createTestRegistry({
        registerSchemaOptions: {
          onResponse: () => {
            ran = true;
          },
        },
        recorder,
      });
      const customSerializer = await createTestSerializer({
        registry: unusedRegistry,
        serializerOptions: {
          autoRegisterSchemas: true,
          groupName: testGroup,
        },
        recorder,
      });
      await assertError(
        customSerializer.serialize(
          {
            field: 1,
          },
          JSON.stringify({
            type: "record",
            name: "User",
            namespace: "validation",
            fields: [
              {
                name: "field",
                type: "null",
              },
            ],
          }),
        ),
        {
          causeMessage: /invalid "null": 1/,
        },
      );
      assert.isTrue(ran, `Expected a service call to register the schema but non was sent!`);
    });
    it("null", async () => {
      await assertError(
        serializer.serialize(
          {
            field: 1,
          },
          JSON.stringify({
            type: "record",
            name: "User",
            namespace: "validation",
            fields: [
              {
                name: "field",
                type: "null",
              },
            ],
          }),
        ),
        {
          causeMessage: /invalid "null": 1/,
        },
      );
    });
    it("boolean", async () => {
      await assertError(
        serializer.serialize(
          {
            field: 1,
          },
          JSON.stringify({
            type: "record",
            name: "User",
            namespace: "validation",
            fields: [
              {
                name: "field",
                type: "boolean",
              },
            ],
          }),
        ),
        {
          causeMessage: /invalid "boolean": 1/,
        },
      );
    });
    it("int", async () => {
      await assertError(
        serializer.serialize(
          {
            field: null,
          },
          JSON.stringify({
            type: "record",
            name: "User",
            namespace: "validation",
            fields: [
              {
                name: "field",
                type: "int",
              },
            ],
          }),
        ),
        {
          causeMessage: /invalid "int": null/,
        },
      );
    });
    it("long", async () => {
      await assertError(
        serializer.serialize(
          {
            field: 9007199254740991,
          },
          JSON.stringify({
            type: "record",
            name: "User",
            namespace: "validation",
            fields: [
              {
                name: "field",
                type: "long",
              },
            ],
          }),
        ),
        {
          causeMessage: /invalid "long": 9007199254740991/,
        },
      );
    });
    it("long with logical DateTime type", async () => {
      await assertError(
        serializer.serialize(
          {
            time: new Date("Wed Sep 13 275760 11:38:05 GMT-0800 (PST)"),
          },
          JSON.stringify({
            type: "record",
            name: "User",
            namespace: "validation",
            fields: [{ name: "time", type: { type: "long", logicalType: "timestamp-millis" } }],
          }),
        ),
        {
          causeMessage: /invalid "long": null/,
        },
      );
    });
    it("float", async () => {
      await assertError(
        serializer.serialize(
          {
            field: "",
          },
          JSON.stringify({
            type: "record",
            name: "User",
            namespace: "validation",
            fields: [
              {
                name: "field",
                type: "float",
              },
            ],
          }),
        ),
        {
          causeMessage: /invalid "float": ""/,
        },
      );
    });
    it("double", async () => {
      await assertError(
        serializer.serialize(
          {
            field: "",
          },
          JSON.stringify({
            type: "record",
            name: "User",
            namespace: "validation",
            fields: [
              {
                name: "field",
                type: "double",
              },
            ],
          }),
        ),
        {
          causeMessage: /invalid "double": ""/,
        },
      );
    });
    it("string", async () => {
      await assertError(
        serializer.serialize(
          {
            field: 1,
          },
          JSON.stringify({
            type: "record",
            name: "User",
            namespace: "validation",
            fields: [
              {
                name: "field",
                type: "string",
              },
            ],
          }),
        ),
        {
          causeMessage: /invalid "string": 1/,
        },
      );
    });
    it("bytes", async () => {
      await assertError(
        serializer.serialize(
          {
            field: 1,
          },
          JSON.stringify({
            type: "record",
            name: "User",
            namespace: "validation",
            fields: [
              {
                name: "field",
                type: "bytes",
              },
            ],
          }),
        ),
        {
          causeMessage: /invalid "bytes": 1/,
        },
      );
    });
    it("union", async () => {
      await assertError(
        serializer.serialize(
          {
            field: 1,
          },
          JSON.stringify({
            type: "record",
            name: "User",
            namespace: "validation",
            fields: [
              {
                name: "field",
                type: ["null", "string"],
              },
            ],
          }),
        ),
        {
          causeMessage: /invalid \["null","string"\]: 1/,
        },
      );
    });
    it("enum", async () => {
      await assertError(
        serializer.serialize(
          {
            field: "x",
          },
          JSON.stringify({
            type: "record",
            name: "User",
            namespace: "validation",
            fields: [
              {
                name: "field",
                type: {
                  type: "enum",
                  name: "foo",
                  symbols: ["A", "B"],
                },
              },
            ],
          }),
        ),
        {
          causeMessage:
            /invalid {"name":"validation.foo","type":"enum","symbols":\["A","B"\]}: "x"/,
        },
      );
    });
    it("fixed", async () => {
      await assertError(
        serializer.serialize(
          {
            field: "x",
          },
          JSON.stringify({
            type: "record",
            name: "User",
            namespace: "validation",
            fields: [
              {
                name: "field",
                type: {
                  type: "fixed",
                  name: "foo",
                  size: 16,
                },
              },
            ],
          }),
        ),
        {
          causeMessage: /invalid {"name":"validation.foo","type":"fixed","size":16}: "x"/,
        },
      );
    });
    it("map", async () => {
      await assertError(
        serializer.serialize(
          {
            field: "x",
          },
          JSON.stringify({
            type: "record",
            name: "User",
            namespace: "validation",
            fields: [
              {
                name: "field",
                type: {
                  type: "map",
                  /**
                   * Map keys are assumed to be strings.
                   */
                  values: "long",
                  default: {},
                },
              },
            ],
          }),
        ),
        {
          causeMessage: /invalid {"type":"map","values":"long"}: "x"/,
        },
      );
    });
    it("array", async () => {
      await assertError(
        serializer.serialize(
          {
            field: "x",
          },
          JSON.stringify({
            type: "record",
            name: "User",
            namespace: "validation",
            fields: [
              {
                name: "field",
                type: {
                  type: "array",
                  /**
                   * Map keys are assumed to be strings.
                   */
                  items: "long",
                  default: [],
                },
              },
            ],
          }),
        ),
        {
          causeMessage: /invalid {"type":"array","items":"long"}: "x"/,
        },
      );
    });
    it("record", async () => {
      await assertError(
        serializer.serialize(
          "x",
          JSON.stringify({
            type: "record",
            name: "User",
            namespace: "validation",
            fields: [
              {
                name: "field",
                type: "int",
              },
            ],
          }),
        ),
        {
          causeMessage: /invalid "int": undefined/,
        },
      );
    });
  });
  describe("Serialized value validation", function () {
    afterEach(async () => {
      schemaList.push("validation.User");
      await removeSchemas(schemaList, pipeline, client);
    });

    it("record", async () => {
      const serializedValue = await serializer.serialize(
        {
          field1: 1,
          field2: "x",
        },
        JSON.stringify({
          type: "record",
          name: "User",
          namespace: "validation",
          fields: [
            {
              name: "field1",
              type: "int",
            },
            {
              name: "field2",
              type: "string",
            },
          ],
        }),
      );
      assert.deepEqual(serializedValue.data, Uint8Array.from([2, 2, 120]));
      serializedValue.data = Buffer.from([2, 2]);
      await assertError(serializer.deserialize(serializedValue), {
        causeMessage: /truncated buffer/,
      });
      serializedValue.data = Buffer.from([2, 2, 120, 5]);
      await assertError(serializer.deserialize(serializedValue), {
        causeMessage: /trailing data/,
      });
    });
    it("long", async () => {
      const serializedValue = await serializer.serialize(
        {
          field: 9007199254740990,
        },
        JSON.stringify({
          type: "record",
          name: "User",
          namespace: "validation",
          fields: [
            {
              name: "field",
              type: "long",
            },
          ],
        }),
      );
      assert.deepEqual(
        serializedValue.data,
        Uint8Array.from([252, 255, 255, 255, 255, 255, 255, 31]),
      );
      serializedValue.data = Uint8Array.from([252, 255, 255, 255, 255, 255, 255, 32]);
      await assertError(serializer.deserialize(serializedValue), {
        causeMessage: /potential precision loss/,
      });
    });
    it("union", async () => {
      const serializedValue = await serializer.serialize(
        {
          field: "x",
        },
        JSON.stringify({
          type: "record",
          name: "User",
          namespace: "validation",
          fields: [
            {
              name: "field",
              type: ["null", "string"],
            },
          ],
        }),
      );
      assert.deepEqual(serializedValue.data, Uint8Array.from([2, 2, 120]));
      serializedValue.data = Uint8Array.from([5, 2, 120]);
      await assertError(serializer.deserialize(serializedValue), {
        causeMessage: /invalid union index: -3/,
      });
    });
    it("enum", async () => {
      const serializedValue = await serializer.serialize(
        {
          field: "A",
        },
        JSON.stringify({
          type: "record",
          name: "User",
          namespace: "validation",
          fields: [
            {
              name: "field",
              type: {
                type: "enum",
                name: "foo",
                symbols: ["A", "B"],
              },
            },
          ],
        }),
      );
      assert.deepEqual(serializedValue.data, Uint8Array.from([0]));
      serializedValue.data = Uint8Array.from([10]);
      await assertError(serializer.deserialize(serializedValue), {
        causeMessage: /invalid validation.foo enum index: 5/,
      });
    });
  });

  describe("Deserialized value validation", function () {
    afterEach(async () => {
      await removeSchemas(schemaList, pipeline, client);
    });

    it("long with logical DateTime type", async () => {
      const schema = await registry.registerSchema({
        name: testSchemaName,
        groupName: testGroup,
        definition: JSON.stringify({
          type: "record",
          name: "AvroUser",
          namespace: "com.azure.schemaregistry.samples",
          fields: [
            { name: "amount", type: "int" },
            { name: "time", type: { type: "long", logicalType: "timestamp-millis" } },
          ],
        }),
        format: "avro",
      });
      // This represents a date that cannot be serialized in JS
      await assertError(
        serializer.deserialize({
          data: Buffer.from([20, -112, -11, -100, -128, -69, -126, -39, 30]),
          contentType: `avro/binary+${schema.id}`,
        }),
        {
          causeMessage: /Invalid date/,
        },
      );

      schemaList.push(testSchemaName);
    });
  });
});
