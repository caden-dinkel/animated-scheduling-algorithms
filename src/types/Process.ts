export interface Process {
  id: number;
  name: string;
  burstTime: number;
  arrivalTime: number;
  status: "none" | "waiting" | "in-progress" | "completed";
  remainingBurstTime: number;
  startTime?: number;
  endTime?: number;
}
