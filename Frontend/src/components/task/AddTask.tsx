import { KeyboardEvent, useContext, useEffect, useRef, useState } from "react";
import { BsFillTrashFill } from "react-icons/all";
import { AddTaskHeader } from "../../types/Task";
import { ProjectContext } from "../project/ProjectContext";
import { TasksContext } from "./contexts/TasksContext";
import { UseTaskApi } from "./UseTaskApi";
interface Props {
  handleAddClick: (flag: boolean) => void;
  isUpdate: boolean;
  taskId:number
}

const initialTask: AddTaskHeader = {
  name: "",
  projectId: 0,
  id:0,
};

function AddTask({ handleAddClick, isUpdate, taskId }: Props) {
  const { handleAddTask, handleUpdateTask, getProjectTasks } = UseTaskApi();
  const [task, setTask] = useState<AddTaskHeader>(initialTask);
  const ref = useRef<HTMLInputElement>(null);
  const { project } = useContext(ProjectContext);
  const { setTasks } = useContext(TasksContext);
  useEffect(() => {
    ref.current?.focus();
  }, []);
  const handleOnKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      await acceptChanges();
    }
  };

  const addTask = async () => {
    if (await handleAddTask(task, project.id!)) {
      handleAddClick(false);
      setTasks(await getProjectTasks(project));
    }
  };

  const updateTask = async () => {
    task.id = taskId;
    if (await handleUpdateTask(task)) {
      handleAddClick(false);
      setTasks(await getProjectTasks(project));
    }
  };

  const acceptChanges = async () => {
    if (isUpdate) {
      await updateTask();
      return;
    }
    await addTask();
  };

  const handleChange = (e: HTMLInputElement) => {
    task.name = e.value;
    setTask(task);
  };

  return (
    <>
      <div className="task">
        <div className="circle"></div>
        <div className="task-title" style={{ width: "100%" }}>
          <input
            ref={ref}
            onChange={(e) => handleChange(e.target)}
            onKeyDown={(e) => handleOnKeyDown(e)}
            onBlur={() => acceptChanges()}
            type="text"
            style={{ all: "unset", width: "100%", textAlign: "left" }}
          />
        </div>
        <BsFillTrashFill
          title="Delete"
          className="icon-menu delete"
          onClick={() => handleAddClick(false)}
          style={{ marginRight: "2rem", marginLeft: "2rem" }}
        />
      </div>
    </>
  );
}

export default AddTask;
