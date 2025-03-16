interface NumberBoxProps {
  value: number;
  id: string;
  label: string;
  onValueChange: (newValue: number) => void;
}

const NumberBox: React.FC<NumberBoxProps> = ({
  value,
  id,
  onValueChange,
  label,
}) => {
  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = Number(event.target.value);
    if (newVal >= 0) {
      onValueChange(newVal);
    }
  };
  return (
    <div>
      <label htmlFor={id} className="block text-lg font-semibold text-gray-700">
        {label}
      </label>
      <input id={id} value={value} type="number" onChange={handleValueChange} />
    </div>
  );
};
export default NumberBox;
