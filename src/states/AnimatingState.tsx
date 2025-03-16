import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Timer from "@/components/Timer";
import useQueue from "@/types/Queue";
import Timeline from "@/components/TimeLine";
import { Process } from "@/types/Process";

interface AnimatingStateProps {
  processes: Process[];
  selectedAnimations: Record<string, boolean>;
}

interface CompletedProcess {
  process: Process;
  completionTime: number;
}

const AnimatingState: React.FC<AnimatingStateProps> = ({
  processes,
  selectedAnimations,
}) => {
  const { queue, enqueue, dequeue, peek } = useQueue();
  const [time, setTime] = useState(0);
  const [executingProcesses, setExecutingProcesses] = useState<Process[]>([]);
  const [completedProcesses, setCompletedProcesses] = useState<
    CompletedProcess[]
  >([]);
  const [enqueuedProcessIds, setEnqueuedProcessIds] = useState(
    new Set<number>()
  );
  const [executingProcess, setExecutingProcess] = useState<Process | null>(
    null
  );

  // Enqueue each process once when its arrival time is reached
  useEffect(() => {
    processes.forEach((process) => {
      if (process.arrivalTime === time && !enqueuedProcessIds.has(process.id)) {
        enqueue(process);
        setEnqueuedProcessIds((prev) => new Set(prev).add(process.id));
      }
    });
  }, [time, processes, enqueue, enqueuedProcessIds]);

  // FCFS Scheduling Algorithm:
  // Dequeues the next process (FIFO) and simulates execution.
  const runFCFS = () => {
    if (!executingProcess && queue.length > 0) {
      const nextProcess = peek();
      dequeue();
      if (nextProcess) {
        setExecutingProcess(nextProcess);
        setExecutingProcesses((prev) => [...prev, nextProcess]);

        // Simulate process execution using a timeout based on burstTime
        setTimeout(() => {
          setExecutingProcesses((prev) =>
            prev.filter((p) => p.id !== nextProcess.id)
          );
          // Record the completion time (current time + burstTime)
          setCompletedProcesses((prev) => [
            ...prev,
            {
              process: nextProcess,
              completionTime: time + nextProcess.burstTime,
            },
          ]);
          setExecutingProcess(null);
        }, nextProcess.burstTime * 1000);
      }
    }
  };

  // Call runFCFS on every time update if FCFS is selected.
  useEffect(() => {
    if (selectedAnimations.FCFS) {
      runFCFS();
    }
  }, [time, queue, executingProcess, selectedAnimations]);

  return (
    <div>
      <Timer onTimeUpdate={setTime} />

      {/* Queue Animation */}
      <div className="queue-section">
        <h3>Queue</h3>
        <AnimatePresence>
          {queue.map((process) => (
            <motion.div
              key={process.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              {process.name}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Timeline Animation */}
      <Timeline processes={executingProcesses} time={time} />

      {/* Completed Processes */}
      <div>
        <h3>Completed Processes</h3>
        <table>
          <thead>
            <tr>
              <th>Process</th>
              <th>Completion Time</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {completedProcesses.map(({ process, completionTime }) => (
                <motion.tr
                  key={`${process.id}-${completionTime}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <td>{process.name}</td>
                  <td>{completionTime}s</td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AnimatingState;
