import { FC } from "react";
interface PopupProps {
  isVisible: boolean;
  animations: string[];
  onClose: () => void;
}

const Popup: FC<PopupProps> = ({ isVisible, animations, onClose }) => {
  return (
    <div
      className={`fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center transition-all duration-500 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-2xl mb-4">Animations</h2>
        <div className="space-y-4">
          {animations.map((animation, index) => (
            <div key={index} className={`animate__animated ${animation}`}>
              <p>Animation {index + 1}</p>
            </div>
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white p-2 rounded hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;
