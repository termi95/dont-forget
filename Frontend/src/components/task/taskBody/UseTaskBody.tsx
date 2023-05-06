import { Priority, Task, TaskProperties } from "../../../types/Task";
import { UseTaskApi } from "../UseTaskApi";
import { useEffect, useState } from "react";

interface Props {
  id: number;
  refreshPriority: (value: Priority) => void;
}
function UseTaskBody({ id, refreshPriority }: Props) {
  const { handleUpdateTaskPriority } = UseTaskApi();
  const [taskProperties, setTaskProperties] = useState<TaskProperties>();
  const { getTaskProperties, updateTaskProperties } = UseTaskApi();

  useEffect(() => {
    getProperties(id);
  }, []);

  const getProperties = async (id: number) => {
    const data = await getTaskProperties(id);
    if (data) {
      setTaskProperties(data);
    }
  };

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
        taskProperties!.priority = pickedPriorityAsNumber;
        setTaskProperties(taskProperties);
        refreshPriority(pickedPriorityAsNumber);
      }
    } catch (error) {}
  };

  const handleSaveContent = async (content: string | undefined) => {
    if (content === undefined && taskProperties === undefined) {
      return;
    }
    taskProperties!.body = content!;
    const data = await updateTaskProperties(taskProperties!);
    if (data) {
      setTaskProperties(data);
    }
  };

  return {
    priorityTaskOptions,
    changeTaskPriority,
    taskProperties,
    handleSaveContent,
  };
}

export default UseTaskBody;
