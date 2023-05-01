import { useCallback, useContext, useEffect, useState } from "react";
import { ProjectContext } from "../project/ProjectContext";
import Task from "./Task";
import Spiner from "../spiner/Spiner";
import { UseTaskApi } from "./UseTaskApi";
import { TaskVisibilityContext } from "./contexts/TaskVisibilityContext";
import { TasksContext } from "./contexts/TasksContext";
import { TaskSortContext } from "./contexts/TaskSortContext";

function TaskList() {
  const { taskVisibility } = useContext(TaskVisibilityContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { project } = useContext(ProjectContext);
  const { tasks, setTasks } = useContext(TasksContext);
  const { sortTasks } = useContext(TaskSortContext);
  const { getProjectTasks } = UseTaskApi();

  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    setTasks(await getProjectTasks(project));
    setIsLoading(false);
  }, [project]);

  useEffect(() => {
    fetchTasks();
  }, [project]);
  
  useEffect(() => {
    content;
  }, [sortTasks]);


  const content = () => {
    if (!(taskVisibility.name === "All")) {
      return tasks!
        .filter((task) => task.done === Boolean(taskVisibility.value))
        .map((task) => {
          return <Task key={task.id} task={task} refresh={fetchTasks} />;
        });
    } else {
      return tasks!.map((task) => {
        return <Task key={task.id} task={task} refresh={fetchTasks} />;
      });
    }
  };

  return <>{isLoading ? <Spiner /> : content()}</>;
}

export default TaskList;
