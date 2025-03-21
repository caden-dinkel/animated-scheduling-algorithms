import { useState } from "react";
import InitialState from "./InitialState";
import { Process } from "@/types/Process";

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
  const processesCopy = processes;
  const processesCopy2 = processes;
  const processesCopy3 = processes;
  const processesCopy4 = processes;

  return (
    <div>
      {currentState === "initial" ? (
        <InitialState onSubmit={handleStartAnimation} />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default StateHandler;
