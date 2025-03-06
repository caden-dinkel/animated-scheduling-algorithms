import React, { useState } from "react";
import Checkbox from "./CheckBox"; // Assuming your Checkbox component is in the same folder

interface CheckboxGroupProps {
  checkboxes: { label: string; id: string }[];
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ checkboxes }) => {
  const [selectedValues, setSelectedValues] = useState<Record<string, boolean>>(
    checkboxes.reduce((acc, { id }) => {
      acc[id] = false; // Default all checkboxes to unchecked
      return acc;
    }, {} as Record<string, boolean>)
  );

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [id]: checked,
    }));
  };

  return (
    <div>
      {checkboxes.map(({ label, id }) => (
        <Checkbox
          key={id}
          id={id}
          label={label}
          checked={selectedValues[id]}
          onChange={(checked) => handleCheckboxChange(id, checked)}
        />
      ))}
    </div>
  );
};

export default CheckboxGroup;
