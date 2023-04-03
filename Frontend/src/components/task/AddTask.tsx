import { KeyboardEvent, useContext, useEffect, useRef, useState } from "react";
import { BsFillTrashFill } from "react-icons/all";
import { api } from "../../api/api";
import { AddTask as AddTaskType } from "../../types/Task";
import { ProjectContext } from "../project/ProjectContext";
interface Props {
  handleAddClick: (flag: boolean) => void;
}

const initialTask: AddTaskType = {
  body: "",
  name: "",
  projectId: 0,
};

function AddTask({ handleAddClick }: Props) {
  const [task, setTask] = useState<AddTaskType>(initialTask);
  const ref = useRef<HTMLInputElement>(null);
  const { project } = useContext(ProjectContext);
  useEffect(() => {
    ref.current?.focus();
  }, []);
  const handleOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddTask(task);
    }
  };

  const handleAddTask = (task: AddTaskType) => {
    task.projectId = project.id!;
    api.post("/task", task).then((res) => {
      if (res.status === 200) {
        handleAddClick(false);
      }
    });
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
            type="text"
            style={{ all: "unset", width: "100%", textAlign: "left" }}
          />
        </div>
        <BsFillTrashFill
          title="Delete"
          className="icon-menu"
          onClick={() => handleAddClick(false)}
          style={{ marginRight: "2rem", marginLeft: "2rem" }}
        />
      </div>
    </>
  );
}

export default AddTask;
