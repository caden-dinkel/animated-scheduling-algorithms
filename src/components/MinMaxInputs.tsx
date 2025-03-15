import { useState } from "react";
import NumberBox from "./NumberBox";

interface MinMaxInputProps {
  minValId: { minId: string; minLabel: string };
  maxValId: { maxId: string; maxLabel: string };
  onMinChange: (value: number) => void;
  onMaxChange: (value: number) => void;
}

const MinMaxInputs: React.FC<MinMaxInputProps> = ({
  minValId,
  maxValId,
  onMinChange,
  onMaxChange,
}) => {
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(10);

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
    <div>
      <div>
        <NumberBox
          id={minValId.minId}
          value={min}
          label={minValId.minLabel}
          onValueChange={handleMinChange}
        />
      </div>
      <div>
        <NumberBox
          id={maxValId.maxId}
          value={max}
          label={maxValId.maxLabel}
          onValueChange={handleMaxChange}
        />
      </div>
    </div>
  );
};

export default MinMaxInputs;
