import { Process } from "../types/Process";

interface DisplayProcessesProps {
  processes: Process[];
}

const DisplayProcesses: React.FC<DisplayProcessesProps> = ({ processes }) => {
  return (
    <div>
      <h2>Generated Processes:</h2>
      <ul>
        {processes.map((process: Process) => (
          <li key={process.id}>
            {process.name} - Burst Time: {process.burstTime} - Arrival Time:{" "}
            {process.arrivalTime}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisplayProcesses;
