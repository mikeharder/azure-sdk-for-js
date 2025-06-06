// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Consume events delivered by Event Grid to a Service Bus Queue
 * @azsdk-weight 3
 */

import { EventGridDeserializer, isSystemEvent } from "@azure/eventgrid";
import type { ServiceBusReceivedMessage } from "@azure/service-bus";
import { ServiceBusClient } from "@azure/service-bus";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

// Create a Event Grid Consumer which will decode the payload of service bus message into an array of EventGridEvent objects.
const consumer = new EventGridDeserializer();

// The connection string for Service Bus namespace that Event Grid will deliver messages to.
// You can find the connection string in the Azure portal.
// Navigate to Settings > Shared access policies > RootManageSharedAccessKey in your Service Bus Namespace's menu blade to see
// the connection string.
const serviceBusFqdn = process.env["SERVICE_BUS_FQDN"] || "";

// The name of the queue within the Service Bus namespace that Event Grid will deliver messages to. You should ensure that
// events sent to this queue are sent using the Event Grid schema.
const serviceBusQueueName = process.env["SERVICE_BUS_QUEUE_NAME"] || "";

// Create a receiver to read messages from the Service Bus Queue.
const receiver = new ServiceBusClient(serviceBusFqdn, new DefaultAzureCredential()).createReceiver(
  serviceBusQueueName,
);

// The handler function which will be run on each message we remove from the Service Bus Queue.
async function processMessage(message: ServiceBusReceivedMessage): Promise<void> {
  // Convert the message into an array of Event Grid Events.
  const events = await consumer.deserializeEventGridEvents(message.body);

  // Process each message, printing the type and ID. In addition, if the event is a system event generated by Azure when
  // a blob is created, print the URL from the event.
  for (const event of events) {
    console.log(`Processing event of type ${event.eventType} with id: ${event.id}`);
    if (isSystemEvent("Microsoft.Storage.BlobCreated", event)) {
      console.log(`A blob was created with URL: ${event.data.url}`);
    }
  }
}

async function main(): Promise<void> {
  // Start processing events.
  const closer = receiver.subscribe({
    processMessage,
    processError: async (err) => {
      console.error("Error while processing events:", err);
    },
  });

  // Run for 10 seconds, allowing events to be processed.
  await new Promise((resolve) => {
    setTimeout(resolve, 1000 * 10);
  });

  // Stop processing events and exit.
  await closer.close();
  await receiver.close();
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
  process.exit(1);
});
