//Combining state for initial logic, will initially have page of checkboxes defining animations to run and numberboxes defining mins/maxes
//Upon clicking the run animation(s) button, transitions to AnimatingState

import { Process } from "@/types/Process";
import ProcessGenerator from "../components/GenerateProcesses";
import CheckboxGroup from "@/components/CheckBoxGroup";
import Button from "@/components/Button";
import ProcessDisplay from "@/components/DisplayProcesses";
import { useState } from "react";

interface InitialStateProps {
  onSubmit: (
    selectedValues: Record<string, boolean>,
    processes: Process[]
  ) => void;
}

const InitialState: React.FC<InitialStateProps> = ({ onSubmit }) => {
  //Checkbox Handling
  const [selectedValues, setSelectedValues] = useState<Record<string, boolean>>(
    {}
  );
  const handleCheckboxChange = (newSelectedValues: Record<string, boolean>) => {
    setSelectedValues(newSelectedValues);
  };

  //ProcessGenerator Handling
  const [processes, setProcesses] = useState<Process[]>([]);

  const handleGenerate = (generatedProcesses: Process[]) => {
    setProcesses(generatedProcesses);
  };

  const handleSubmit = () => {
    onSubmit(selectedValues, processes);
  };

  const checkboxes = [
    { label: "First-Come-First-Serve", id: "FCFS" },
    { label: "Shortest-Job-First", id: "SJF" },
    { label: "Shortest-Time-To-Completion-First", id: "STCF" },
    { label: "Round-Robin", id: "RR" },
    { label: "Multi-Level-Feedback-Queue", id: "MLFQ" },
  ];
  return (
    <div>
      <CheckboxGroup
        checkboxes={checkboxes}
        onSelectionChange={handleCheckboxChange} // Pass callback to get selected values
      />
      <Button onClick={handleSubmit} label="Submit" />
      <ProcessGenerator onGenerate={handleGenerate} />
      {processes.length > 0 && <ProcessDisplay processes={processes} />}
    </div>
  );
};

export default InitialState;
