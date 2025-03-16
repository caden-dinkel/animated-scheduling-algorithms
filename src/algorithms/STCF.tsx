import DisplayQueue from "@/components/DisplayQueue";
import Timer from "@/components/Timer";
import { Process } from "@/types/Process";
import useQueue from "@/types/Queue";
import { useState, useEffect, useRef } from "react";
import Timeline from "@/components/TimeLine";
import CompletionTable from "@/components/CompletionTable";

interface STCFProps {
  processes: Process[];
}

const STCF: React.FC<STCFProps> = ({ processes }) => {
  const { queue, enqueue, dequeue, peek } = useQueue();

  const [time, setTime] = useState(0);
  const [remainingBurstTime, setRemainingBurstTime] = useState(0);
  const [executingProcess, setExecutingProcess] = useState<Process | null>(
    null
  );
  const [completedProcesses, setCompletedProcesses] = useState<
    { id: number; completionTime: number }[]
  >([]);
  const enqueuedIdsRef = useRef(new Set<number>()); // Prevents duplicate enqueues

  const minArrivalTime = Math.min(...processes.map((p) => p.arrivalTime));
  const totalBurstTime = processes.reduce(
    (acc, process) => acc + process.burstTime,
    0
  );

  // Add processes to queue as they arrive
  useEffect(() => {
    processes.forEach((process) => {
      if (
        process.arrivalTime === time &&
        !enqueuedIdsRef.current.has(process.id)
      ) {
        enqueue(process);
        enqueuedIdsRef.current.add(process.id);

        // Sort the queue by burst time after adding a new process
        queue.sort((a, b) => a.burstTime - b.burstTime);
      }
    });
  }, [time, processes]);

  // Move the shortest job in queue to Timeline if CPU is idle
  useEffect(() => {
    if (!executingProcess && queue.length > 0) {
      // Find the process with the shortest burst time
      let shortestProcessIndex = queue.reduce(
        (shortestIndex, process, index) =>
          process.burstTime < queue[shortestIndex].burstTime
            ? index
            : shortestIndex,
        0
      );

      const shortestProcess = queue[shortestProcessIndex];
      if (shortestProcess) {
        queue.splice(shortestProcessIndex, 1); // Remove selected process from queue
        setExecutingProcess(shortestProcess);
        shortestProcess.startTime = time;
        setRemainingBurstTime(shortestProcess.burstTime);
      }
    }
  }, [queue, executingProcess]);

  // Manage process execution
  useEffect(() => {
    if (executingProcess && remainingBurstTime > 0) {
      const interval = setInterval(() => {
        setRemainingBurstTime((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else if (executingProcess && remainingBurstTime === 0) {
      setCompletedProcesses((prev) => [
        ...prev,
        { id: executingProcess.id, completionTime: time },
      ]);
      setExecutingProcess(null);
    }
  }, [executingProcess, remainingBurstTime]);

  return (
    <div>
      <Timeline
        process={executingProcess}
        time={time}
        totalTime={totalBurstTime + minArrivalTime}
      />
      <Timer onTimeUpdate={setTime} />
      <DisplayQueue
        queue={[...queue].sort((a, b) => a.burstTime - b.burstTime)}
      />
      <CompletionTable completedProcesses={completedProcesses} />
    </div>
  );
};

export default STCF;
