import Checkbox from "@/components/CheckBox";
import StartButton from "../components/StartButton";
import { useEffect, useState } from "react";
import Popup from "@/components/Popup";
import "animate.css";
import { Process } from "@/types/Process";

const Home = () => {
  const [completed, setCompleted] = useState<Process[]>([]);
    const [processes, setProcesses] = useState<Process[]>([])

  useEffect(() => {
    const generateProcesses:
  });

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
    <div className="min-h-screen flex-col items-center justify-center space-y-6">
      <Checkbox
        label="Bounce Animation"
        checked={checkedItems.animation1}
        onChange={(checked) => handleCheckboxChange("animation1", checked)}
      />
      <Checkbox
        label="Fade In Animation"
        checked={checkedItems.animation2}
        onChange={(checked) => handleCheckboxChange("animation2", checked)}
      />
      <Checkbox
        label="Slide Up Animation"
        checked={checkedItems.animation3}
        onChange={(checked) => handleCheckboxChange("animation3", checked)}
      />
      <StartButton onClick={handleStartButtonClick} />
      <Popup
        isVisible={isPopupVisible}
        animations={getAnimations()}
        onClose={handlePopupClose}
      />
    </div>
  );
};

export default Home;
