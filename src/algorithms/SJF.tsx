import DisplayQueue from "@/components/DisplayQueue";
import Timer from "@/components/Timer";
import { Process } from "@/types/Process";
import useQueue from "@/types/Queue";
import { useState, useEffect, useRef } from "react";
import Timeline from "@/components/TimeLine";
import CompletionTable from "@/components/CompletionTable";

interface SJFProps {
  processes: Process[];
}

const SJF: React.FC<SJFProps> = ({ processes }) => {
  const { queue, enqueue, dequeue, peek } = useQueue();

  const [time, setTime] = useState(0);
  const [executingProcess, setExecutingProcess] = useState<Process | null>(
    null
  );
  const [completedProcesses, setCompletedProcesses] = useState<Process[]>([]);
  const enqueuedIdsRef = useRef(new Set<number>()); // Prevents duplicate enqueues

  const totalBurstTime = processes.reduce(
    (acc, process) => acc + process.burstTime,
    0
  );

  // Add processes to queue as they arrive (ensuring they are sorted)
  useEffect(() => {
    processes.forEach((process) => {
      if (
        process.arrivalTime === time &&
        !enqueuedIdsRef.current.has(process.id)
      ) {
        enqueue(process);
        enqueuedIdsRef.current.add(process.id);
      }
    });
  }, [time, processes]);

  // Ensure queue is sorted by burst time (SJF rule)
  useEffect(() => {
    if (!executingProcess && queue.length > 0) {
      const sortedQueue = [...queue].sort((a, b) => a.burstTime - b.burstTime);
      const nextProcess = sortedQueue[0];

      if (nextProcess) {
        dequeue();
        setExecutingProcess(nextProcess);
      }
    }
  }, [queue, executingProcess]);

  // Manage process execution
  useEffect(() => {
    if (executingProcess) {
      const interval = setInterval(() => {
        setExecutingProcess((prev) => {
          if (prev) {
            if (prev.burstTime - 1 === 0) {
              setCompletedProcesses((prevCompleted) => [
                ...prevCompleted,
                { ...prev, endTime: time + 1 },
              ]);
              return null; // Process is complete
            }
            return { ...prev, burstTime: prev.burstTime - 1 };
          }
          return prev;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [executingProcess, time]);

  return (
    <div>
      <Timeline
        process={executingProcess}
        time={time}
        totalTime={totalBurstTime}
      />
      <Timer onTimeUpdate={setTime} />
      <DisplayQueue
        queue={[...queue].sort((a, b) => a.burstTime - b.burstTime)}
      />
      <CompletionTable completedProcesses={completedProcesses} />
    </div>
  );
};

export default SJF;
