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
    if (project && project.id && project.id > 0) {
      setTasks(await getProjectTasks(project));
    }
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
      if (tasks) {
        return tasks
          .filter((task) => task.done === Boolean(taskVisibility.value))
          .map((task) => {
            return (
              <Task
                key={task.id}
                task={task}
                projectId={project.id!}
                refresh={fetchTasks}
              />
            );
          });        
      }
      return []
    } else {
      if (tasks) {
        return tasks.map((task) => {
          return (
            <Task
              key={task.id}
              task={task}
              projectId={project.id!}
              refresh={fetchTasks}
            />
          );
        });        
      }
      return []
    }
  };

  return <>{isLoading ? <Spiner /> : content()}</>;
}

export default TaskList;
