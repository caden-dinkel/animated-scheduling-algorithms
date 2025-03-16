import { useState, useEffect } from "react";
import NumberBox from "./NumberBox";

interface MinMaxInputProps {
  minValId: { minId: string; minLabel: string };
  maxValId: { maxId: string; maxLabel: string };
  onMinChange: (value: number) => void;
  onMaxChange: (value: number) => void;
  initialMax: number;
  initialMin: number;
}

const MinMaxInputs: React.FC<MinMaxInputProps> = ({
  minValId,
  maxValId,
  onMinChange,
  onMaxChange,
  initialMax,
  initialMin,
}) => {
  const [min, setMin] = useState<number>(initialMin);
  const [max, setMax] = useState<number>(initialMax);

  useEffect(() => {
    setMin(initialMin);
  }, [initialMin]);

  useEffect(() => {
    setMax(initialMax);
  }, [initialMax]);

  const handleMinChange = (newMin: number) => {
    if (newMin <= max) {
      setMin(newMin);
      onMinChange(newMin); // Pass the change to parent
    }
  };

  const handleMaxChange = (newMax: number) => {
    if (newMax >= min) {
      setMax(newMax);
      onMaxChange(newMax); // Pass the change to parent
    }
  };

  return (
    <div style={{ display: "flex", gap: "15px" }}>
      <NumberBox
        id={minValId.minId}
        value={min}
        label={minValId.minLabel}
        onValueChange={handleMinChange}
      />
      <NumberBox
        id={maxValId.maxId}
        value={max}
        label={maxValId.maxLabel}
        onValueChange={handleMaxChange}
      />
    </div>
  );
};

export default MinMaxInputs;
