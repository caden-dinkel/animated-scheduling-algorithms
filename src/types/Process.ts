export interface Process {
  id: number;
  name: string;
  burstTime: number;
  arrivalTime: number;
  endTime?: number;
}
