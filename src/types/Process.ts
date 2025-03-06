export default interface Process {
  id: number;
  name: string;
  burstTime: number;
  startTime?: number;
  endTime?: number;
}
