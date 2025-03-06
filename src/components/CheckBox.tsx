import { useState } from "react";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded peer"
      />
      <label className="text-gray-700 peer-checked:text-blue-600">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
