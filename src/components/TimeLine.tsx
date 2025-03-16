import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Process } from "@/types/Process";

// Props for Timeline
interface TimelineProps {
  process: Process | null;
  time: number;
  totalTime: number;
}

const Timeline: React.FC<TimelineProps> = ({ process, time, totalTime }) => {
  const [executedProcesses, setExecutedProcesses] = useState<Process[]>([]);

  useEffect(() => {
    if (process && !executedProcesses.some((p) => p.id === process.id)) {
      setExecutedProcesses((prev) => [...prev, process]);
    }
  }, [process]);

  const length = 1000; // Total timeline width
  return (
    <div
      style={{
        position: "relative",
        width: length,
        height: 60,
        backgroundColor: "#e0e0e0",
        borderRadius: 5,
        overflow: "hidden",
        border: "1px solid #ccc",
      }}
    >
      {/* Display all executed processes */}
      {executedProcesses.map((p) => {
        const startX = (Number(p.startTime) / totalTime) * length;
        const width = (p.burstTime / totalTime) * length;
        const isCompleted = time >= Number(p.startTime) + p.burstTime;

        return (
          <div
            key={p.id}
            style={{
              position: "absolute",
              left: startX,
              width: width,
              height: "100%",
              backgroundColor: isCompleted ? "gray" : "blue",
              color: "white",
              textAlign: "center",
              lineHeight: "60px",
              borderRadius: 5,
              fontSize: 14,
              opacity: isCompleted ? 0.5 : 1, // Dim after completion
            }}
          >
            {`P${p.id}`}
          </div>
        );
      })}
    </div>
  );
};

export default Timeline;
