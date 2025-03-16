import { useEffect, useState } from "react";

interface TimerProps {
  onTimeUpdate: (time: number) => void; // Callback to pass the time to the parent
}

const Timer: React.FC<TimerProps> = ({ onTimeUpdate }) => {
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => {
        const newTime = prevTime + 1;
        onTimeUpdate(newTime); // Pass the updated time to the parent
        return newTime;
      });
    }, 1000); // Increment every second

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [onTimeUpdate]);

  return <div>Time: {time}s</div>;
};

export default Timer;
