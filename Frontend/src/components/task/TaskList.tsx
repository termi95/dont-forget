import { useContext, useEffect, useState } from "react";
import { ProjectContext } from "../project/ProjectContext";
import Task from "./Task";
import Spiner from "../spiner/Spiner";
import { TasksContext } from "./TaskContext";
import { UseTask } from "./UseTask";

function TaskList() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { project } = useContext(ProjectContext);
  const { tasks, setTasks } = useContext(TasksContext);
  const { getProjectTasks } = UseTask();

  const handleGetTasks = async () => {
    setIsLoading(true);
    setTasks(await getProjectTasks(project));
    setIsLoading(false);
  }

  useEffect(() => {
    handleGetTasks();
  }, [project]);

  const content = () => {
    return tasks!.filter((task) => task.done === false).map((task) => {
      return <Task key={task.id} task={task} refresh={handleGetTasks} />;
    });
  };

  return <>{isLoading ? <Spiner /> : content()}</>;
}

export default TaskList;
