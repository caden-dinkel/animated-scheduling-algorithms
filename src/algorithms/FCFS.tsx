import DisplayQueue from "@/components/DisplayQueue";
import Timer from "@/components/Timer";
import { Process } from "@/types/Process";
import useQueue from "@/types/Queue";
import { useState, useEffect, useRef } from "react";
import Timeline from "@/components/TimeLine";
import CompletionTable from "@/components/CompletionTable";

interface FCFSProps {
  processes: Process[];
}

const FCFS: React.FC<FCFSProps> = ({ processes }) => {
  const { queue, enqueue, dequeue, peek } = useQueue();
  processes.sort((a, b) => a.arrivalTime - b.arrivalTime);

  const [time, setTime] = useState(0);
  const [executingProcess, setExecutingProcess] = useState<Process | null>(
    null
  );
  const [completedProcesses, setCompletedProcesses] = useState<Process[]>([]);

  const enqueuedIdsRef = useRef(new Set<number>());

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

  useEffect(() => {
    if (!executingProcess && queue.length > 0) {
      const nextProcess = peek();
      dequeue();
      if (nextProcess) {
        setExecutingProcess({ ...nextProcess, startTime: time });
      }
    }
  }, [queue, executingProcess]);

  useEffect(() => {
    if (executingProcess) {
      const interval = setInterval(() => {
        setExecutingProcess((prev) => {
          if (prev) {
            if (prev.burstTime - 1 === 0) {
              setCompletedProcesses((prevCompleted) => [
                ...prevCompleted,
                { ...prev, completionTime: time + 1 },
              ]);
              return null;
            }
            return { ...prev, burstTime: prev.burstTime - 1 };
          }
          return prev;
        });
        setTime((prevTime) => prevTime + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [executingProcess]);

  return (
    <div>
      <Timeline
        process={executingProcess}
        time={time}
        totalTime={processes.reduce((acc, p) => acc + p.burstTime, 0)}
      />
      <Timer onTimeUpdate={setTime} />
      <DisplayQueue queue={queue} />
      {/* ✅ Pass only completed processes with correct completion times */}
      <CompletionTable completedProcesses={completedProcesses} />
    </div>
  );
};

export default FCFS;
