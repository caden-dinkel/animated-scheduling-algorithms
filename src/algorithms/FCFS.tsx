import { SchedulingAlgorithm } from "../types/SchedulingAlgorithm";
import { Process } from "@/types/Process";

export class FCFS implements SchedulingAlgorithm {
  async initialize(processes: Process[]): Promise<Process[]> {
    // Sorting the processes by arrival time (First Come First Serve)
    const sortedProcesses = processes.sort(
      (a, b) => a.arrivalTime - b.arrivalTime
    );
    return Promise.resolve(sortedProcesses);
  }

  async execute(processes: Process[]): Promise<Process[]> {
    if (processes[0].burstTime > 0) {
      processes[0].burstTime -= 1;
    } else {
      const lostValue = processes.shift();
    }
    return Promise.resolve(processes);
  }
}
