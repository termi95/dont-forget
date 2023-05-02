import { Priority, Task } from "../../../types/Task";
import { UseTaskApi } from "../UseTaskApi";
import { useState } from "react";

interface Props {
  priority: Priority;
  id: number;
  refreshPriority: (value: Priority) => void;
}
function UseTaskBody({ id, priority, refreshPriority }: Props) {
  const { handleUpdateTaskPriority } = UseTaskApi();
  const [selectedOption, setSelectedOption] = useState(priority);

  const priorityTaskOptions = () => {
    const sortTypes = Object.values(Priority);
    const half = Math.ceil(sortTypes.length / 2);
    const firstHalf = sortTypes.slice(0, half);
    const mapper = [
      { name: "LOW", value: "Low ↓" },
      { name: "MEDIUM", value: "Medium →" },
      { name: "HIGH", value: "High ↑" },
      { name: "CRITICAL", value: "Critical !" },
    ];

    return firstHalf.map((value, index) => {
      const text = mapper.map((x) => {
        if (x.name === value.toString()) {
          return value.toString().replace(x.name, x.value);
        }
      });
      return (
        <option key={index} value={index}>
          {text}
        </option>
      );
    });
  };

  const changeTaskPriority = async (target: HTMLSelectElement) => {
    try {
      const pickedPriorityAsNumber = Number.parseInt(target.value);
      if (
        await handleUpdateTaskPriority({
          priority: pickedPriorityAsNumber,
          id: id,
        } as Task)
      ) {
        setSelectedOption(pickedPriorityAsNumber);
        refreshPriority(pickedPriorityAsNumber);
      }
    } catch (error) {}
  };

  return {
    priorityTaskOptions,
    changeTaskPriority,
    selectedOption,
  };
}

export default UseTaskBody;
