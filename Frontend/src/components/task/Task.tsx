import "../../style/task.css";
import { memo, useContext, useState } from "react";
import { Task as AddTaskType } from "../../types/Task";
import Spiner from "../spiner/Spiner";
import { UseTask } from "./UseTask";
import TaskBody from "./TaskBody";
import { TaskContext } from "./contexts/ActiveTaskContext";
interface Props {
  task: AddTaskType;
  refresh: () => void;
}
function Task({ task, refresh }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { taskToggleDoneStatus } = UseTask();
  const { activeTask, setActiveTask } = useContext(TaskContext);

  const toggleTaskStatus = async () => {
    try {
      setIsLoading(true);
      task.done = (await taskToggleDoneStatus(task)) ? true : false;
      refresh();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const toggleActiveTask = (task: AddTaskType) => {
    if (task.id === activeTask?.id) {
      setActiveTask(null);
    } else {
      setActiveTask(task);
    }
  };

  const showTaskBody = () => {
    if (!activeTask) {
      return;
    }
    if (task.id == activeTask.id) {
      return (
        <div className="task-body">
          {task.id}
          <TaskBody />
        </div>
      );
    }
  };

  const content = () => {
    return (
      <>
        <div
          className="task"
          onClick={() => {
            console.log("click");
            toggleActiveTask(task);
          }}
        >
          <div
            className="circle"
            onClick={() => {
              task.done = !task.done;
              toggleTaskStatus();
            }}
          ></div>
          <div className="task-title">{task.name}</div>
        </div>
        {showTaskBody()}
      </>
    );
  };
  return <>{isLoading ? <Spiner /> : content()}</>;
}

export default Task;
