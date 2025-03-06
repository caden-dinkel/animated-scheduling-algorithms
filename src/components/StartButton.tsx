import Button, { ButtonProps } from "./Button";

interface StartButtonProps extends Omit<ButtonProps, "label"> {
  label?: string;
}

const StartButton: React.FC<StartButtonProps> = ({
  onClick,
  label = "Start",
}) => {
  return <Button label={label} onClick={onClick} />;
};
