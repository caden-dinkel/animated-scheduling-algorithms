import "../components"
import { useEffect, useState } from "react";
import Popup from "@/components/Popup";
import "animate.css";
import { Process } from "@/types/Process";
import ProcessGenerator from "@/components/GenerateProcesses";
import {motion} from 'framer-motion'

const Home = () => {
  const [completed, setCompleted] = useState<Process[]>([]);
  const [processes, setProcesses] = useState<Process[]>([]);
    
  const runFCFS = async (processes: Process[]) => {
    for (let i = 0; i < processes.length; i++) {
      const process = processes[i];
      setCompleted((prev) => [...prev, process]);

      await new Promise((resolve) =>
        setTimeout(resolve, process.burstTime * 1000)
      );
    }
  };

  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({
    animation1: false,
    animation2: false,
    animation3: false,
  });

  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);

  const handleCheckboxChange = (animation: string, checked: boolean) => {
    setCheckedItems((prev) => ({ ...prev, [animation]: checked }));
  };

  const handleStartButtonClick = () => {
    const animations = Object.keys(checkedItems).filter(
      (key) => checkedItems[key]
    );
    setIsPopupVisible(true);
  };

  const handlePopupClose = () => {
    setIsPopupVisible(false);
  };

  const getAnimations = () => {
    const animations: string[] = [];
    if (checkedItems.animation1) animations.push("animate__bounce");
    if (checkedItems.animation2) animations.push("animate__fadeIn");
    if (checkedItems.animation3) animations.push("animate__slideInUp");
    return animations;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <h1 className="text-3xl font-bold mb-4">Process Scheduling - FCFS</h1>

      {/* Process Generator Component */}
      <ProcessGenerator onGenerate={setProcesses} />

      {/* Queue Section */}
      <div className="w-full max-w-4xl p-4 bg-white rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Queue</h2>
        <div className="flex space-x-4">
          {processes.map((process, index) => (
            <motion.div
              key={process.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 1 }}
              className="w-12 h-12 bg-blue-500 text-white flex items-center justify-center rounded-lg"
            >
              {process.name}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Timeline Section */}
      <div className="w-full max-w-4xl p-4 bg-white rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Timeline</h2>
        <div className="flex relative w-full h-24 bg-gray-300 rounded-lg">
          {completed.map((process, index) => (
            <motion.div
              key={process.name}
              initial={{ left: 0 }}
              animate={{ left: `${(index * process.burstTime * 100) / totalBurstTime}%` }}
              transition={{ duration: 1 }}
              className="absolute top-0 left-0 h-full bg-blue-500 text-white flex items-center justify-center rounded-lg"
              style={{ width: `${(process.burstTime * 100) / totalBurstTime}%` }}
            >
              {process.name}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Completed Processes Section */}
      <div className="w-full max-w-4xl p-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Completed</h2>
        <div className="flex space-x-4">
          {completed.map((process, index) => (
            <div
              key={process.name}
              className="w-12 h-12 bg-green-500 text-white flex items-center justify-center rounded-lg"
            >
              {process.name}
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={runFCFS}
        className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600"
      >
        Start FCFS
      </button>
    </div>
  );
}
};

export default Home;
