import { useState } from "react";
import { Process } from "./Process";

type Queue = Process[];

const useQueue = () => {
  const [queue, setQueue] = useState<Queue>([]);

  // Enqueue function to add an item to the queue
  const enqueue = (process: Process): void => {
    setQueue((prevQueue) => [...prevQueue, process]);
  };

  // Dequeue function to remove the first item from the queue
  const dequeue = (): void => {
    setQueue((prevQueue) => prevQueue.slice(1));
  };

  // Peek function to get the first item without removing it
  const peek = (): Process | undefined => {
    return queue[0];
  };

  return { queue, enqueue, dequeue, peek };
};

export default useQueue;
