import { useState } from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  label: string;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  label,
  disabled = false,
}) => {
  return (
    <div className="flex justify-center items-center">
      <button
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={onClick}
        disabled={disabled}
      >
        {label}
      </button>
    </div>
  );
};
export default Button;
