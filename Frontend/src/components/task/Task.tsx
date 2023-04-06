import { useState } from "react";
import { Task as AddTaskType } from "../../types/Task";
import Spiner from "../spiner/Spiner";
import { UseTask } from "./UseTask";
interface Props {
  task: AddTaskType;
  refresh: () => void;
}
function Task({ task, refresh }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { taskToggleDoneStatus } = UseTask();
  const toggleTaskStatus = async () => {
    try {
      setIsLoading(true);
      task.done = await taskToggleDoneStatus(task) ? true : false;
      refresh();
    } catch (error) {

    } finally {
      setIsLoading(false);
    }
  }

  const content = () => {
    return (
      <>
        <div className="task">
          <div className="circle" onClick={() => {
            task.done = !task.done;
            toggleTaskStatus();
          }}></div>
          <div className="task-title">{task.name}</div>
        </div>
      </>
    );
  };
  return <>{isLoading ? <Spiner /> : content()}</>;
}

export default Task;
