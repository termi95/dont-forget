import { useContext, useEffect, useState } from "react";
import { ProjectContext } from "../project/ProjectContext";
import { Task as AddTaskType } from "../../types/Task";
import Task from "./Task";
import { api } from "../../api/api";
import Spiner from "../spiner/Spiner";

function TaskList() {
  const [taskList, setTaskList] = useState<AddTaskType[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { project } = useContext(ProjectContext);

  const getProjectTasks = async () => {
    setIsLoading(true);
    try {
      await api
        .post("/task/tasks", project)
        .then(async (res) => {
          if (res.status === 200) {
            setTaskList(res.data);
          }
        })
        .catch(() => {});
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProjectTasks();
  }, [project]);

  const content = () => {
    return taskList!.filter((task)=>task.done === false).map((task) => {
      return <Task key={task.id} task={task} />;
    });
  };

  return <>{isLoading && !taskList ? <Spiner /> : content()}</>;
}

export default TaskList;
