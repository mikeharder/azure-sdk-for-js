// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BarrierMessage } from "./barrier.js";
import { Snapshot } from "./snapshot.js";

export interface StatusUpdateMessage {
  tag: "statusUpdate";
  snapshots: Snapshot[];
}

export interface ReportResultsMessage {
  tag: "reportResults";
  snapshots: Snapshot[];
}

export type WorkerToManagerMessage = BarrierMessage | StatusUpdateMessage | ReportResultsMessage;

export type WorkerToManagerMessageWithId = WorkerToManagerMessage & { workerId: number };

export type ManagerToWorkerMessage = BarrierMessage;

export type Message = WorkerToManagerMessage | ManagerToWorkerMessage;
