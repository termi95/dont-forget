import { api } from "../../api/api";
import { Project } from "../../types/Project";
import { AddTaskHeader, Task, TaskUpdate } from "../../types/Task";

export const UseTaskApi = () => {
  const handleAddTask = (task: AddTaskHeader, projectId: number) => {
    if (task.name.length < 4) {
      throw new Error("Name is to short");
    }
    task.projectId = projectId;
    const result = api.post("/task", task).then((res) => {
      if (res.status === 200) {
        return true;
      }
      return false;
    });
    return result;
  };
  const getProjectTasks = async (project: Project): Promise<[Task]> => {
    const tasks = await api
      .post("/task/tasks", project)
      .then(async (res): Promise<[Task]> => {
        if (res.status === 200) {
          return res.data;
        }
        throw new Error("brak danych");
      });
    return tasks;
  };
  const taskToggleDoneStatus = async (task: Task) => {
    const updatedTask = await handlePrepareTaskToUpdate(task);
    return await api
      .patch("/task/togleDone", updatedTask)
      .then(async (res) => {
        if (res.status === 200) {
          return true;
        }
        throw new Error("");
      })
      .catch((e) => {
        throw new Error("");
      });
  };
  const deleteTask = async (task: Task) => {
    return await api
      .post("/task/delete", task)
      .then(async (res) => {
        if (res.status === 201) {
          return true;
        }
        throw new Error("");
      })
      .catch((e) => {
        throw new Error("");
      });
  };

  const handlePrepareTaskToUpdate = (task: Task) => {
    const updateTask: TaskUpdate = {
      id: 0,
      newName: "",
      newBody: "",
      done: false,
    };
    updateTask.done = task.done;
    updateTask.newName = task.name;
    updateTask.newBody = task.body;
    updateTask.id = task.id ? task.id : 0;
    return updateTask;
  };

  const handleUpdateTask = async (task: AddTaskHeader) => {
    const updatedTask = await handlePrepareTaskToUpdate({
      id: task.id,
      name: task.name,
    } as Task);
    return await api
      .patch("/task/rename", updatedTask)
      .then(async (res) => {
        if (res.status === 200) {
          return true;
        }
        throw new Error("");
      })
      .catch((e) => {
        throw new Error(e);
      });
  };

  return {
    handleAddTask,
    getProjectTasks,
    taskToggleDoneStatus,
    deleteTask,
    handleUpdateTask,
  };
};
