import { useState, useEffect } from "react";
import { Process } from "@/types/Process";

interface ProcessQueueProps {
  time: number; // Current time from the Timer component
  processes: Process[];
}

const ProcessQueue: React.FC<ProcessQueueProps> = ({ time, processes }) => {
  const [queue, setQueue] = useState<Process[]>([]);

  // Check and add processes to the queue as time progresses
  useEffect(() => {
    const arrivedProcesses = processes.filter(
      (process) =>
        process.arrivalTime >= time && !queue.some((p) => p.id === process.id)
    );

    if (arrivedProcesses.length > 0) {
      setQueue((prevQueue) => [...prevQueue, ...arrivedProcesses]);
    }
  });
  return (
    <div className="flex flex-col items-center">
      <div className="w-full border-t border-gray-600 mb-1"></div>
      <div className="flex space-x-2 bg-gray-100 p-2 rounded-lg">
        {queue.map((process) => (
          <div
            key={process.id}
            className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm"
          >
            P{process.id}
          </div>
        ))}
      </div>
      <div className="w-full border-b border-gray-600 mt-1"></div>
    </div>
  );
};

export default ProcessQueue;
