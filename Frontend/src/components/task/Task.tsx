import { useState } from "react";
import { Task as AddTaskType, TaskUpdate } from "../../types/Task";
import Spiner from "../spiner/Spiner";
import { UseTask } from "./UseTask";
interface Props {
  task: AddTaskType;
  refresh: () => void;
}
function Task({ task, refresh }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { UpdateTask } = UseTask();
  const handleUpdate = async () => {
    try {
      setIsLoading(true);
      task.done = await UpdateTask(task) ? true : false;
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
            task.done = true;
            handleUpdate();
          }}></div>
          <div className="task-title">{task.name}</div>
        </div>
      </>
    );
  };
  return <>{isLoading ? <Spiner /> : content()}</>;
}

export default Task;
