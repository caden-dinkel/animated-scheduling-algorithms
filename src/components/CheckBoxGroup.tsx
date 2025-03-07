import { useState, useEffect } from "react";
import Checkbox from "./CheckBox"; // Assuming your Checkbox component is in the same folder

interface CheckboxGroupProps {
  checkboxes: { label: string; id: string }[];
  onSelectionChange: (selectedValues: Record<string, boolean>) => void;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  checkboxes,
  onSelectionChange,
}) => {
  const [selectedValues, setSelectedValues] = useState<Record<string, boolean>>(
    checkboxes.reduce((acc, { id }) => {
      acc[id] = false; // Default all checkboxes to unchecked
      return acc;
    }, {} as Record<string, boolean>)
  );

  useEffect(() => {
    onSelectionChange(selectedValues);
  }, [selectedValues, onSelectionChange]);

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
