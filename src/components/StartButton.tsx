import { useState } from "react";

interface StartButtonProps {
  onClick: () => void;
}

const StartButton: React.FC<StartButtonProps> = ({ onClick }) => {
  const [clicked, SetClicked] = useState(false);

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={onClick}
      >
        Start
      </button>
    </div>
  );
};
export default StartButton;
