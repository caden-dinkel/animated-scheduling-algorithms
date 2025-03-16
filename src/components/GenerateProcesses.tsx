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
  console.log(numProcesses);
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
      remainingBurstTime: burstTime,
      status: "none",
    });
  }
  return processes;
};

interface ProcessGeneratorProps {
  onGenerate: (processes: Process[]) => void;
}

const INITIAL_MIN_PROCESSES = 4;
const INITIAL_MAX_PROCESSES = 7;

const INITIAL_MIN_ARRIVAL = 0;
const INITIAL_MAX_ARRIVAL = 4;

const INITIAL_MIN_BURST = 2;
const INITIAL_MAX_BURST = 7;

const ProcessGenerator: React.FC<ProcessGeneratorProps> = ({ onGenerate }) => {
  // State to track dynamic min/max values
  const [minProcesses, setMinProcesses] = useState(INITIAL_MIN_PROCESSES);
  const [maxProcesses, setMaxProcesses] = useState(INITIAL_MAX_PROCESSES);
  const [minBurstTime, setMinBurstTime] = useState(INITIAL_MIN_BURST);
  const [maxBurstTime, setMaxBurstTime] = useState(INITIAL_MAX_BURST);
  const [minArrivalTime, setMinArrivalTime] = useState(INITIAL_MIN_ARRIVAL);
  const [maxArrivalTime, setMaxArrivalTime] = useState(INITIAL_MAX_ARRIVAL);

  // Handle generating random processes based on current state
  const generateProcesses = () => {
    const numProcesses =
      minProcesses === maxProcesses
        ? minProcesses
        : Math.floor(Math.random() * (maxProcesses - minProcesses + 1)) +
          minProcesses;
    const randomProcesses = GenerateRandomProcesses(
      numProcesses,
      minBurstTime,
      maxBurstTime,
      minArrivalTime,
      maxArrivalTime
    );
    console.log(randomProcesses);
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
        initialMax={INITIAL_MAX_PROCESSES}
        initialMin={INITIAL_MIN_PROCESSES}
      />

      {/* Min/Max inputs for burst time */}
      <MinMaxInputs
        minValId={{ minId: "minBurstTime", minLabel: "Min Burst Time" }}
        maxValId={{ maxId: "maxBurstTime", maxLabel: "Max Burst Time" }}
        onMinChange={(value) => setMinBurstTime(value)}
        onMaxChange={(value) => setMaxBurstTime(value)}
        initialMax={INITIAL_MAX_BURST}
        initialMin={INITIAL_MIN_BURST}
      />

      {/* Min/Max inputs for arrival time */}
      <MinMaxInputs
        minValId={{ minId: "minArrivalTime", minLabel: "Min Arrival Time" }}
        maxValId={{ maxId: "maxArrivalTime", maxLabel: "Max Arrival Time" }}
        onMinChange={(value) => setMinArrivalTime(value)}
        onMaxChange={(value) => setMaxArrivalTime(value)}
        initialMax={INITIAL_MAX_ARRIVAL}
        initialMin={INITIAL_MIN_ARRIVAL}
      />

      {/* Button to generate processes */}
      <Button label="Generate Random Processes" onClick={generateProcesses} />
    </div>
  );
};

export default ProcessGenerator;
