import { Process } from "@/types/Process";
import Button from "./Button";

const MIN_PROCESSES = 3;
const MAX_PROCESSES = 7;

const MAX_BURSTTIME = 10;
const MIN_BURSTTIME = 1;

const MAX_ARRIVALTIME = 10;
const MIN_ARRIVALTIME = 0;

const GenerateRandomProcesses = (numProcesses: number): Process[] => {
  const processes: Process[] = [];

  for (let i = 1; i <= numProcesses; i++) {
    const processName = `P${i}`;
    //BurstTime between 1 and 10
    const burstTime = Math.floor(Math.random() * MAX_BURSTTIME) + MIN_BURSTTIME;
    const arrivalTime =
      Math.floor(Math.random() * MAX_ARRIVALTIME) + MIN_ARRIVALTIME;
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
  const generateProcesses = () => {
    const numProcesses =
      Math.floor(Math.random() * (MAX_PROCESSES - MIN_PROCESSES + 1)) +
      MIN_PROCESSES;
    const randomProcesses = GenerateRandomProcesses(numProcesses);
    onGenerate(randomProcesses);
  };
  return (
    <div>
      <Button label="Generate Random Processes" onClick={generateProcesses} />
    </div>
  );
};

export default ProcessGenerator;
