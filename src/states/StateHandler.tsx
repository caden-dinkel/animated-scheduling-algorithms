import { useState } from "react";
import InitialState from "./InitialState";
import AnimatingState from "./AnimatingState";
import { Process } from "@/types/Process";
import FCFS from "@/algorithms/FCFS";

const StateHandler: React.FC = () => {
  const [currentState, setCurrentState] = useState<"initial" | "animating">(
    "initial"
  );
  const [selectedAlgorithms, setSelectedAlgorithms] = useState<
    Record<string, boolean>
  >({});
  const [processes, setProcesses] = useState<Process[]>([]);

  // Handle transition from InitialState to AnimatingState
  const handleStartAnimation = (
    selected: Record<string, boolean>,
    generatedProcesses: Process[]
  ) => {
    setSelectedAlgorithms(selected);
    setProcesses(generatedProcesses);
    setCurrentState("animating"); // Switch state
  };

  return (
    <div>
      {currentState === "initial" ? (
        <InitialState onSubmit={handleStartAnimation} />
      ) : (
        <FCFS processes={processes} />
      )}
    </div>
  );
};

export default StateHandler;
