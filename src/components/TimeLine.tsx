import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Process } from "@/types/Process";

interface TimelineProps {
  process: Process | null;
  time: number;
  totalTime: number;
}

const Timeline: React.FC<TimelineProps> = ({ process, time, totalTime }) => {
  const [executedProcesses, setExecutedProcesses] = useState<Process[]>([]);
  const length = 1000; // Total timeline width
  const numMarkers = 4; // Number of time markers
  const markerSpacing = totalTime / numMarkers;

  useEffect(() => {
    if (process && !executedProcesses.some((p) => p.id === process.id)) {
      setExecutedProcesses((prev) => [...prev, process]);
    }
  }, [process]);

  return (
    <div style={{ width: length, position: "relative" }}>
      {/* Timeline Bar */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: 60,
          backgroundColor: "#e0e0e0",
          borderRadius: 5,
          overflow: "hidden",
          border: "1px solid #ccc",
        }}
      >
        {/* Display Executed Processes */}
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
                opacity: isCompleted ? 0.5 : 1,
              }}
            >
              {`P${p.id}`}
            </div>
          );
        })}
      </div>

      {/* Time Markers */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 5,
        }}
      >
        {Array.from({ length: numMarkers + 1 }, (_, i) => {
          const markerTime = Math.round(i * markerSpacing);
          return (
            <span key={i} style={{ fontSize: "12px", color: "#555" }}>
              {markerTime}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
