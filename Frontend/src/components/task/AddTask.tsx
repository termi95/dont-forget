import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { BsFillTrashFill } from "react-icons/all";
import { api } from "../../api/api";
import { Task } from "../../types/Task";
interface Props {
  handleAddClick: (flag: boolean) => void;
};

const initialTask: Task = {
  body: "",
  createdByUser: 0,
  creationDate: null,
  FinishDate: null,
  done: false,
  id: null,
  name: '',
};

function AddTask({ handleAddClick }: Props) {
  const [task, setTask] = useState<Task>(initialTask);
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);
  const handleOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log(task);
    }
  }

  const handleAddTask = () => {
    api.post("/task",)
  }

  const handleChange = (e: HTMLInputElement ) => {
    task.name = e.value;
    setTask(task);
  }

  return (
    <>
      <div className="task">
        <div className="circle"></div>
        <div className="task-title" style={{ width: '100%' }}>
          <input ref={ref} onChange={(e) => handleChange(e.target)} onKeyDown={(e) => handleOnKeyDown(e)} type="text" style={{ all: 'unset', width: '100%', textAlign: "left" }} />
        </div>
        <BsFillTrashFill title="Delete" className="icon-menu" onClick={() => handleAddClick(false)} style={{ marginRight: '2rem', marginLeft: '2rem' }} />
      </div>
    </>
  );
}

export default AddTask;
