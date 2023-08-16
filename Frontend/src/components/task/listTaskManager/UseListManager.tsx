import { useContext, useEffect } from "react";
import { SortType, Task, TaskVisibility } from "../../../types/Task";
import { TaskVisibilityContext } from "../contexts/TaskVisibilityContext";
import { TaskSortContext } from "../contexts/TaskSortContext";
import { TasksContext } from "../contexts/TasksContext";

function UseListManager() {
  const { taskVisibility, setTaskVisibility } = useContext(
    TaskVisibilityContext
  );
  const { sortTasks, setSortTasks } = useContext(TaskSortContext);
  const { tasks, setTasks } = useContext(TasksContext);

  useEffect(() => {
    setSortTasks(SortType.ALPHABETICALLY_DESC);
  }, [tasks]);

  const visibilityOptions = () =>
    TaskVisibility.map((x, index) => {
      return (
        <option key={index} value={x.value}>
          {x.name}
        </option>
      );
    });
  const setVisibility = (value: string) => {
    const mode = TaskVisibility.find((x) => x.value === Number(value));
    if (mode) {
      setTaskVisibility(mode);
    }
  };

  const setSortType = (value: string) => {
    const intValue = parseInt(value);
    if (intValue || intValue === 0) {
      setSortTasks(intValue);
    }
  };

  const sortTaskOptions = () => {
    const sortTypes = Object.values(SortType);
    const half = Math.ceil(sortTypes.length / 2);
    const firstHalf = sortTypes.slice(0, half);
    const mapper = [
      { name: "ALPHABETICALLY_ASC", value: "Z-a" },
      { name: "ALPHABETICALLY_DESC", value: "A-z" },
      { name: "PRIORITY_ASC", value: "Priority ↑" },
      { name: "PRIORITY_DESC", value: "Priority ↓" },
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

  const sortTask = (sortType: SortType) => {
    let sortedTasks: [Task] | undefined = undefined;

    switch (sortType) {
      case SortType.ALPHABETICALLY_ASC:
        sortedTasks = tasks?.sort((a, b) =>
          a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
        );
        break;
      case SortType.ALPHABETICALLY_DESC:
        sortedTasks = tasks?.sort((a, b) =>
          a.name.toLowerCase() > b.name.toLowerCase() ? -1 : 1
        );
        break;
      case SortType.PRIORITY_ASC:
        sortedTasks = tasks?.sort((a, b) => {
          return a.priority + b.priority;
        });
        break;
      case SortType.PRIORITY_DESC:
        sortedTasks = tasks?.sort((a, b) => {
          return a.priority - b.priority;
        });
        break;
      default:
        throw new Error("Unknow sort type");
    }
    if (sortedTasks) {
      setTasks(sortedTasks);
    }
  };

  return {
    setVisibility,
    visibilityOptions,
    taskVisibility,
    sortTaskOptions,
    setSortType,
    sortTasks,
    sortTask,
  };
}

export default UseListManager;
