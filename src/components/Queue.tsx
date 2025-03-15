import { useState, ChangeEvent } from "react";
import useQueue from "../types/Queue";
import { Process } from "@/types/Process";

const Queue: React.FC = () => {
  const { queue, enqueue, dequeue, peek } = useQueue<Process[]>([]);
  const [input, setInput] = useState<Process[]>([]);

  const handleAddToQueue = (): void => {
    if (input) {
      enqueue(input);
      setInput("");
    }
  };

  const handleRemoveFromQueue = (): void => {
    dequeue();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Queue Management</h1>
      <div>
        <h2>Current Queue</h2>
        <div
          style={{
            border: "2px solid #000", // Adds a border around the queue container
            padding: "10px",
            display: "flex", // Makes the queue items align horizontally
            gap: "10px", // Adds space between items
            overflowX: "auto", // Enables horizontal scrolling if items exceed width
          }}
        >
          {queue.length > 0 ? (
            queue.map((item, index) => (
              <div
                key={index}
                style={{
                  padding: "10px",
                  border: "1px solid #ccc", // Border for individual items
                  borderRadius: "5px",
                  backgroundColor: "#f0f0f0", // Light background color for items
                }}
              >
                {item}
              </div>
            ))
          ) : (
            <div>No items in the queue</div>
          )}
        </div>
      </div>

      <div>
        <h3>Enqueue Item</h3>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Add item to queue"
        />
        <button onClick={handleAddToQueue}>Enqueue</button>
      </div>

      <div>
        <h3>Dequeue Item</h3>
        <button onClick={handleRemoveFromQueue}>Dequeue</button>
        {peek() && <p>Next item in queue: {peek()}</p>}
      </div>
    </div>
  );
};

export default Queue;
