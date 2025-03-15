import React from "react";
import { Process } from "@/types/Process";
import styles from "../styles/processDisplay.module.css"; // Import the CSS module

interface ProcessDisplayProps {
  processes: Process[];
}

const ProcessDisplay: React.FC<ProcessDisplayProps> = ({ processes }) => {
  return (
    <div className={styles.container}>
      <h3>Generated Processes</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>ID</th>
            <th className={styles.th}>Name</th>
            <th className={styles.th}>Burst Time</th>
            <th className={styles.th}>Arrival Time</th>
          </tr>
        </thead>
        <tbody>
          {processes.map((process) => (
            <tr key={process.id}>
              <td className={styles.td}>{process.id}</td>
              <td className={styles.td}>{process.name}</td>
              <td className={styles.td}>{process.burstTime}</td>
              <td className={styles.td}>{process.arrivalTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProcessDisplay;
