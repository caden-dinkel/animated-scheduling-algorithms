import { Process } from "@/types/Process";

interface DisplayQueueProps {
  queue: Process[];
}

const DisplayQueue: React.FC<DisplayQueueProps> = ({ queue }) => {
  const minWidth = 150; // Minimum width for the queue
  const processWidth = 60; // Approximate width per process
  const queueWidth = Math.max(minWidth, queue.length * processWidth); // Dynamic width

  return (
    <div className="flex flex-col items-center">
      <div className="w-full border-t border-gray-600 mb-1"></div>
      <div
        className="flex bg-gray-100 p-2 rounded-lg overflow-hidden"
        style={{ width: queueWidth }}
      >
        {queue.map((process) => (
          <div
            key={process.id}
            className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm mx-1"
          >
            P{process.id}
          </div>
        ))}
      </div>
      <div className="w-full border-b border-gray-600 mt-1"></div>
    </div>
  );
};

export default DisplayQueue;
