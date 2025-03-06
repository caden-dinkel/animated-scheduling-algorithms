import { Process } from "../types/Process";
import { SchedulingAlgorithm } from "../types/SchedulingAlgorithm";
import { useState } from "react";
import Button from "../components/Button";

interface SchedulingAlgorithmProps {
  algorithm: SchedulingAlgorithm;
  processes: Process[];
}

const Scheduler: React.FC<SchedulingAlgorithmProps> = ({
  algorithm,
  processes,
}) => {
  const [completed, setCompleted] = useState<Process[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const handleExecuteAlgorithm = async () => {
    setIsRunning(true);
    const result = await algorithm.execute(processes);
    setCompleted(result);
    setIsRunning(false);
  };

  return (
    <div>
      <Button
        label={isRunning ? "Running..." : "Run Algorithm"}
        onClick={handleExecuteAlgorithm}
        disabled={isRunning}
      />
    </div>
  );
};

export default Scheduler;
