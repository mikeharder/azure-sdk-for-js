## API Report File for "@azure/arm-iotfirmwaredefense"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import { Client } from '@azure-rest/core-client';
import { ClientOptions } from '@azure-rest/core-client';
import { TokenCredential } from '@azure/core-auth';

// @public
export function createIoTFirmwareDefense(credential: TokenCredential, subscriptionId: string, options?: IoTFirmwareDefenseClientOptionalParams): IoTFirmwareDefenseContext;

// @public
export interface IoTFirmwareDefenseClientOptionalParams extends ClientOptions {
    apiVersion?: string;
}

// @public
export interface IoTFirmwareDefenseContext extends Client {
    apiVersion: string;
    subscriptionId: string;
}

// (No @packageDocumentation comment for this package)

```
