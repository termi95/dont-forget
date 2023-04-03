import { useState } from "react";
import { Task as AddTaskType, TaskUpdate } from "../../types/Task";
import Spiner from "../spiner/Spiner";
import { api } from "../../api/api";
interface Props {
  task: AddTaskType;
}
function Task({ task }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);  
  const updateTask: TaskUpdate = {
    id: 0,
    newName: "",
    newBody: "",
    done: false
  };
  const handleDone = async () => {
    setIsLoading(true);
    try {
      task.done = true;
      updateTask.done = task.done;
      updateTask.newName = task.name;
      updateTask.newBody = task.body;
      updateTask.id = task.id ? task.id : 0;
      console.log(updateTask);
      await api
        .patch("/task/", updateTask)
        .then(async (res) => {
          if (res.status === 200) {
            console.log("poszło");
          }
        })
        .catch(() => {});
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const content = () => {
    return (
      <>
        <div className="task">
          <div className="circle" onClick={handleDone}></div>
          <div className="task-title">{task.name}</div>
        </div>
      </>
    );
  };
  return <>{isLoading ? <Spiner /> : content()}</>;
}

export default Task;
