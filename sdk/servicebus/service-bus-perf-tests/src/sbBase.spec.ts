// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { getEnvVar, BatchPerfTest } from "@azure-tools/test-perf";
import { ServiceBusAdministrationClient, ServiceBusClient } from "@azure/service-bus";
import "dotenv/config";

const connectionString = getEnvVar("SERVICEBUS_CONNECTION_STRING");

export abstract class ServiceBusTest<TOptions> extends BatchPerfTest<TOptions> {
  static sbClient: ServiceBusClient = new ServiceBusClient(connectionString);
  static sbAdminClient = new ServiceBusAdministrationClient(connectionString);
  static queueName = `newqueue-${Math.ceil(Math.random() * 1000)}`;

  public async globalSetup(): Promise<void> {
    await ServiceBusTest.sbAdminClient.createQueue(ServiceBusTest.queueName);
  }

  public async globalCleanup(): Promise<void> {
    await ServiceBusTest.sbClient.close();
    await ServiceBusTest.sbAdminClient.deleteQueue(ServiceBusTest.queueName);
  }
}
