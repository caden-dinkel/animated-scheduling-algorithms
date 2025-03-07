import { useEffect, useState } from "react";
import CheckboxGroup from "../components/CheckBoxGroup";
import "animate.css";
import { Process } from "../types/Process";
import ProcessGenerator from "../components/GenerateProcesses";
import { motion } from "framer-motion";
import Button from "../components/Button";
import { FCFS } from "../algorithms/FCFS";
import Scheduler from "@/algorithms/Scheduler";
import DisplayProcesses from "../components/DisplayProcesses"

const Home: React.FC = () => {
  const [processes, setProcesses] = useState<Process[]>([]);

  const handleGenerate = (generatedProcesses: Process[]) => {
    setProcesses(generatedProcesses);
  };

  const [selectedValues, setSelectedValues] = useState<Record<string, boolean>>(
    {}
  );

  const handleCheckboxChange = (newSelectedValues: Record<string, boolean>) => {
    setSelectedValues(newSelectedValues);
  };

  const handleSubmit = () => {
    console.log("Selected values:", selectedValues); // Logs the selected values to the console
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
      <h1>Process Generator</h1>
      {/* Render the ProcessGenerator component and pass the handleGenerate function */}
      <ProcessGenerator onGenerate={handleGenerate} />

      {/* Display generated processes */}
        <DisplayProcesses
      <div>
        <h1>Select Options</h1>
        <CheckboxGroup
          checkboxes={checkboxes}
          onSelectionChange={handleCheckboxChange} // Pass callback to get selected values
        />
        <Button onClick={handleSubmit} label="Submit" />
      </div>
      <Scheduler algorithm={new FCFS()} processes={processes} />
    </div>
  );
};
export default Home;
