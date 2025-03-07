import { Process } from "./Process";

export interface SchedulingAlgorithm {
  execute: (processes: Process[]) => Promise<Process[]>;
  initialize: (processes: Process[]) => Promise<Process[]>;
}
