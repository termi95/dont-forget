import "../../style/task.css";
import { useContext, useState } from "react";
import { Task as AddTaskType } from "../../types/Task";
import Spiner from "../spiner/Spiner";
import { UseTask } from "./UseTask";
import TaskBody from "./TaskBody";
import { TaskContext } from "./contexts/ActiveTaskContext";
import { BsFillTrashFill, BsListTask } from "react-icons/bs";
import { GoSettings, MdOutlineDriveFileRenameOutline, RxCross1 } from "react-icons/all";
interface Props {
  task: AddTaskType;
  refresh: () => void;
}
function Task({ task, refresh }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [visibleTaskSetting, setVisibleTaskSetting] = useState<boolean>(false);
  const { taskToggleDoneStatus, deleteTask } = UseTask();
  const { activeTask, setActiveTask } = useContext(TaskContext);

  const toggleTaskStatus = async () => {
    try {
      setIsLoading(true);
      task.done = (await taskToggleDoneStatus(task)) ? true : false;
      refresh();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const toggleActiveTask = (task: AddTaskType) => {
    if (task.id === activeTask?.id) {
      setActiveTask(null);
    } else {
      setActiveTask(task);
    }
  };

  const showTaskBody = () => {
    if (!activeTask) {
      return;
    }
    if (task.id == activeTask.id) {
      return (
        <div className="task-body">
          <TaskBody />
        </div>
      );
    }
  };

  const taskSettings = () => {
    return (
      <div className="task-header-manager">
        <MdOutlineDriveFileRenameOutline title="Rename" className="icon-menu primary" onClick={() => { }} />
        <BsFillTrashFill title="Delete" className="icon-menu delete" onClick={async () => { if (await deleteTask(task)) { refresh(); } }} />
        <RxCross1 className="icon-menu secondary" onClick={() => { setVisibleTaskSetting(false) }} />
      </div>);
  }

  const taskSettingsIcon = () => {
    return (<BsListTask className="icon-menu secondary" onClick={() => { setVisibleTaskSetting(true) }} />);
  }

  const taskSettingsOrIcon = () => {
    if (visibleTaskSetting) {
      return taskSettings()
    } else {
      return taskSettingsIcon()
    }
  }
  const content = () => {
    return (
      <>
        <div
          className={`task ${activeTask?.id && task.id === activeTask.id ? "remove-bottom-border" : ""} `}

        >
          <div
            className="circle"
            onClick={() => {
              task.done = !task.done;
              toggleTaskStatus();
            }}
          ></div>
          <div className="task-title" onClick={() => { toggleActiveTask(task); }}>{task.name}</div>
          {taskSettingsOrIcon()}
        </div>
        {showTaskBody()}
      </>
    );
  };
  return <>{isLoading ? <Spiner /> : content()}</>;
}

export default Task;
