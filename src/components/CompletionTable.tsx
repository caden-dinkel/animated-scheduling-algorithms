import { Process } from "@/types/Process";

interface CompletionTableProps {
  completedProcesses: Process[];
}

const CompletionTable: React.FC<CompletionTableProps> = ({
  completedProcesses,
}) => {
  return (
    <div className="max-w-md mx-auto">
      <h2 className="mt-4 text-lg font-bold text-center">
        Completed Processes
      </h2>
      <table className="w-full border-collapse border border-gray-400 mt-2">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-400 px-4 py-2">Process ID</th>
            <th className="border border-gray-400 px-4 py-2">
              Completion Time
            </th>
          </tr>
        </thead>
        <tbody>
          {completedProcesses.map((process) => (
            <tr key={process.id} className="text-center">
              <td className="border border-gray-400 px-4 py-2">
                P{process.id}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {process.endTime ?? "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompletionTable;
