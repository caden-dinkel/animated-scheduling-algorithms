import DisplayQueue from "@/components/DisplayQueue";
import Timer from "@/components/Timer";
import { Process } from "@/types/Process";
import useQueue from "@/types/Queue";
import { useState, useEffect, useRef } from "react";
import Timeline from "@/components/TimeLine";

interface FCFSProps {
  processes: Process[];
}

const FCFS: React.FC<FCFSProps> = ({ processes }) => {
  const { queue, enqueue, dequeue, peek } = useQueue();
  processes.sort((a, b) => a.arrivalTime - b.arrivalTime);
  const [time, setTime] = useState(0);
  const [remainingBurstTime, setRemainingBurstTime] = useState(0);

  const [executingProcess, setExecutingProcess] = useState<Process | null>(
    null
  );
  const enqueuedIdsRef = useRef(new Set<number>()); // Persistent tracking without triggering re-renders

  const minArrivalTime = Math.min(...processes.map((p) => p.arrivalTime));
  const totalBurstTime = processes.reduce(
    (acc, process) => acc + process.burstTime,
    0
  );

  //Add processes to queue as they arrive

  useEffect(() => {
    processes.forEach((process) => {
      if (
        process.arrivalTime === time &&
        !enqueuedIdsRef.current.has(process.id) // Check if already enqueued
      ) {
        enqueue(process);
        enqueuedIdsRef.current.add(process.id); // Mark as enqueued
      }
    });
  }, [time, processes]); // Runs only when time updates
  // `queue` added as a dependency to reflect changes immediately

  //Move First in queue to Timeline if empty
  useEffect(() => {
    if (!executingProcess && queue.length > 0) {
      const nextProcess = peek();
      dequeue();
      if (nextProcess) {
        setExecutingProcess(nextProcess);
        nextProcess.startTime = time;
        setRemainingBurstTime(nextProcess.burstTime);
      }
    }
  }, [queue, executingProcess]);

  useEffect(() => {
    if (executingProcess && remainingBurstTime > 0) {
      const interval = setInterval(() => {
        setRemainingBurstTime((prev) => prev - 1);
      }, 1000); // Simulating 1 second per unit of burst time

      return () => clearInterval(interval);
    } else if (executingProcess && remainingBurstTime === 0) {
      setExecutingProcess(null); // Process completes, move to next
    }
  }, [executingProcess, remainingBurstTime]);

  return (
    <div>
      <Timer onTimeUpdate={setTime} />
      <DisplayQueue queue={queue} />
      <Timeline
        process={executingProcess}
        time={time}
        totalTime={totalBurstTime + minArrivalTime}
      />
    </div>
  );
};
export default FCFS;
