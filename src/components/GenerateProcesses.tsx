import { Process } from "@/types/Process";
import Button from "./Button";
import { useState } from "react";
import MinMaxInputs from "./MinMaxInputs";

// Function to generate random processes with dynamic min/max values
const GenerateRandomProcesses = (
  numProcesses: number,
  minBurstTime: number,
  maxBurstTime: number,
  minArrivalTime: number,
  maxArrivalTime: number
): Process[] => {
  const processes: Process[] = [];
  for (let i = 1; i <= numProcesses; i++) {
    const processName = `P${i}`;
    const burstTime =
      Math.floor(Math.random() * (maxBurstTime - minBurstTime + 1)) +
      minBurstTime;
    const arrivalTime =
      Math.floor(Math.random() * (maxArrivalTime - minArrivalTime + 1)) +
      minArrivalTime;
    processes.push({
      id: i,
      name: processName,
      burstTime: burstTime,
      arrivalTime: arrivalTime,
    });
  }
  return processes;
};

interface ProcessGeneratorProps {
  onGenerate: (processes: Process[]) => void;
}

const ProcessGenerator: React.FC<ProcessGeneratorProps> = ({ onGenerate }) => {
  // State to track dynamic min/max values
  const [minProcesses, setMinProcesses] = useState(3);
  const [maxProcesses, setMaxProcesses] = useState(7);
  const [minBurstTime, setMinBurstTime] = useState(1);
  const [maxBurstTime, setMaxBurstTime] = useState(10);
  const [minArrivalTime, setMinArrivalTime] = useState(0);
  const [maxArrivalTime, setMaxArrivalTime] = useState(10);

  // Handle generating random processes based on current state
  const generateProcesses = () => {
    const numProcesses =
      Math.floor(Math.random() * (maxProcesses - minProcesses + 1)) +
      minProcesses;
    const randomProcesses = GenerateRandomProcesses(
      numProcesses,
      minBurstTime,
      maxBurstTime,
      minArrivalTime,
      maxArrivalTime
    );
    onGenerate(randomProcesses);
  };

  return (
    <div>
      {/* Min/Max inputs for processes */}
      <MinMaxInputs
        minValId={{ minId: "minProcesses", minLabel: "Min Processes" }}
        maxValId={{ maxId: "maxProcesses", maxLabel: "Max Processes" }}
        onMinChange={(value) => setMinProcesses(value)}
        onMaxChange={(value) => setMaxProcesses(value)}
      />

      {/* Min/Max inputs for burst time */}
      <MinMaxInputs
        minValId={{ minId: "minBurstTime", minLabel: "Min Burst Time" }}
        maxValId={{ maxId: "maxBurstTime", maxLabel: "Max Burst Time" }}
        onMinChange={(value) => setMinBurstTime(value)}
        onMaxChange={(value) => setMaxBurstTime(value)}
      />

      {/* Min/Max inputs for arrival time */}
      <MinMaxInputs
        minValId={{ minId: "minArrivalTime", minLabel: "Min Arrival Time" }}
        maxValId={{ maxId: "maxArrivalTime", maxLabel: "Max Arrival Time" }}
        onMinChange={(value) => setMinArrivalTime(value)}
        onMaxChange={(value) => setMaxArrivalTime(value)}
      />

      {/* Button to generate processes */}
      <Button label="Generate Random Processes" onClick={generateProcesses} />
    </div>
  );
};

export default ProcessGenerator;
