import { Process } from "@/types/Process";

const GenerateRandomProcesses = (numProcesses: number): Process[] => {
  const processes: Process[] = [];

  for (let i = 1; i <= numProcesses; i++) {
    const processName = `P${i}`;
    const burstTime = Math.floor(Math.random() * 10) + 1;
    processes.push({ id: i, name: processName, burstTime: burstTime });
  }
  return processes;
};

interface ProcessGeneratorProps {
  onGenerate: (processes: Process[]) => void;
}

const ProcessGenerator: React.FC<ProcessGeneratorProps> = ({ onGenerate }) => {
  const generateProcesses = () => {
    const numProcesses = Math.floor(Math.random() * 5) + 3;
    const randomProcesses = GenerateRandomProcesses(numProcesses);
    onGenerate(randomProcesses);
  };
  return (
    <div>
      <button
        onClick={generateProcesses}
        className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 mb-4"
      >
        Generate Random Processes
      </button>
    </div>
  );
};

export default ProcessGenerator;
