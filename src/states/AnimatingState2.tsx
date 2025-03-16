import { Process } from "@/types/Process";

interface AnimatingStateProps {
  processes: Process[];
  selectedAnimations: Record<string, boolean>;
}

const AnimateState: React.FC<AnimatingStateProps> = ({
  processes,
  selectedAnimations,
}) => {};
