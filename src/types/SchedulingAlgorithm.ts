import { Process } from "./Process";

export interface SchedulingAlgorithm {
  execute: (processes: Process[]) => Promise<Process[]>;
}
