import { motion, AnimatePresence } from "framer-motion";
import { Process } from "@/types/Process";

interface DisplayQueueProps {
  queue: Process[];
}

const DisplayQueue: React.FC<DisplayQueueProps> = ({ queue }) => {
  return (
    <div className="queue-container">
      <h3>Process Queue</h3>
      <div className="queue-list">
        <AnimatePresence>
          {queue.map((process: Process) => (
            <motion.div
              key={process.id}
              layout
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
              className="queue-item"
            >
              {process.name}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DisplayQueue;
