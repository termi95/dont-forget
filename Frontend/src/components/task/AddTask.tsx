import { KeyboardEvent, useContext, useEffect, useRef, useState } from "react";
import { BsFillTrashFill } from "react-icons/all";
import { AddTask as AddTaskType } from "../../types/Task";
import { ProjectContext } from "../project/ProjectContext";
import { TasksContext } from "./contexts/TasksContext";
import { UseTask } from "./UseTask";
interface Props {
  handleAddClick: (flag: boolean) => void;
}

const initialTask: AddTaskType = {
  body: "",
  name: "",
  projectId: 0,
};

function AddTask({ handleAddClick }: Props) {
  const { handleAddTask, getProjectTasks } = UseTask();
  const [task, setTask] = useState<AddTaskType>(initialTask);
  const ref = useRef<HTMLInputElement>(null);
  const { project } = useContext(ProjectContext);
  const { setTasks } = useContext(TasksContext);
  useEffect(() => {
    ref.current?.focus();
  }, []);
  const handleOnKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      await addTask();
    }
  };

  const addTask = async () => {
    if (await handleAddTask(task, project.id!)) {
      handleAddClick(false);
      setTasks(await getProjectTasks(project));
    }
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
            onBlur={() => addTask()}
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
