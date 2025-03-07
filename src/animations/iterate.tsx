import { Process } from "../types/Process";

interface IterateAlgorithmProps {
    processes: Process[];
    execute: (processes: Process[]) => Promise<Process[]>;
}

const IterateAlgorithm: React.FC<
