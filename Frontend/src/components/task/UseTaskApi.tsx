import UseToast from "../../UseToast";
import { api } from "../../api/api";
import { Project } from "../../types/Project";
import {
  AddTaskHeader,
  Doer,
  IMessage,
  Priority,
  Task,
  TaskProperties,
  TaskUpdate,
} from "../../types/Task";

export const UseTaskApi = () => {
  const { ShowSuccess } = UseToast();
  const handleAddTask = (task: AddTaskHeader, projectId: number) => {
    if (task.name.length < 4) {
      throw new Error("Name is to short");
    }
    task.projectId = projectId;
    const result = api.post("/Assignment/create", task).then((res) => {
      if (res.status === 200) {
        return true;
      }
      return false;
    });
    return result;
  };
  const getProjectTasks = async (project: Project): Promise<[Task]> => {
    const tasks = await api
      .post("/Assignment/tasks", project)
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
      .patch("/Assignment/togleDone", updatedTask)
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
      .post("/Assignment/delete", task)
      .then(async (res) => {
        if (res.status === 200) {
          ShowSuccess("Task deleted successfully.");
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
      Name: "",
      Body: "",
      done: false,
      priority: Priority.MEDIUM,
      DoerId: 0,
    };
    updateTask.done = task.done;
    updateTask.Name = task.name;
    updateTask.Body = task.body;
    updateTask.id = task.id ? task.id : 0;
    updateTask.priority = task.priority;
    updateTask.DoerId = task.DoerId;
    return updateTask;
  };

  const handleUpdateTask = async (task: AddTaskHeader) => {
    const updatedTask = await handlePrepareTaskToUpdate({
      id: task.id,
      name: task.name,
    } as Task);
    return await api
      .patch("/Assignment/rename", updatedTask)
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

  const handleUpdateTaskPriority = async (task: Task) => {
    const updatedTask = await handlePrepareTaskToUpdate(task);
    return await api
      .patch("/Assignment/priority", updatedTask)
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

  const updateTaskProperties = async (properties: TaskProperties) => {
    return await api
      .patch("/Assignment/properties", properties)
      .then(async (res) => {
        if (res.status === 200) {
          return res.data;
        }
        throw new Error("");
      })
      .catch((e) => {
        throw new Error("");
      });
  };

  const getTaskProperties = async (id: number, projectId: number) => {
    const tasks: TaskProperties = await api
      .post("/Assignment/get-properties", { id, projectId })
      .then((res) => {
        if (res.status === 200) {
          return res.data;
        }
        throw new Error("error");
      });
    return await tasks;
  };

  const getAllDoersForProject = async (projectId: number) => {
    const tasks: Doer[] = await api
      .post("Project/get-doers", { projectId })
      .then((res) => {
        if (res.status === 200) {
          return res.data;
        }
        throw new Error("error");
      });
    return await tasks;
  };

  const handleUpdateTaskDoer = async (task: Task) => {
    return await api
      .patch("/Assignment/doer", task)
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

  const insertMessage = async (taskId: number, message: string) => {
    return await api
      .post("/Assignment/add-comment", { AssignmentId: taskId, message })
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

  const getMessages = async (taskId: number): Promise<IMessage[]> => {
    return await api
      .post("/Assignment/get-comment", { AssignmentId: taskId })
      .then(async (res) => {
        if (res.status === 200) {
          return res.data;
        }
        throw new Error("");
      })
      .catch((e) => {
        throw new Error("");
      });
  };

  return {
    handleAddTask,
    getProjectTasks,
    taskToggleDoneStatus,
    deleteTask,
    handleUpdateTask,
    handleUpdateTaskPriority,
    getTaskProperties,
    updateTaskProperties,
    getAllDoersForProject,
    handleUpdateTaskDoer,
    insertMessage,
    getMessages,
  };
};
