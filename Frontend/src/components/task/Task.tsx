import "../../style/task.scss";
import { lazy, useContext, useState } from "react";
import { Task as AddTaskType, Priority } from "../../types/Task";
import Spiner from "../spiner/Spiner";
import { UseTaskApi } from "./UseTaskApi";
import TaskBody from "./taskBody/TaskBody";
import { TaskContext } from "./contexts/ActiveTaskContext";
import { BsFillTrashFill, BsListTask } from "react-icons/bs";
import { MdOutlineDriveFileRenameOutline, RxCross1 } from "react-icons/all";
import { ModalButton } from "../../types/Modal";
import AddTask from "./AddTask";
import UseTask from "./UseTask";
const Modal = lazy(() => import("../modal/Modal"));
interface Props {
  task: AddTaskType;
  refresh: () => void;
}
function Task({ task, refresh }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [visibleTaskSetting, setVisibleTaskSetting] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const { taskToggleDoneStatus, deleteTask } = UseTaskApi();
  const { getArrowPrioritet, handleChangePriority, priority } = UseTask({
    initialPriority: task.priority,
  });
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
          <TaskBody
            key={task.id}
            id={task.id!}
            refreshPriority={handleChangePriority}
          />
        </div>
      );
    }
  };

  const deleteTaskHandler = async (userAction: boolean) => {
    setShowModal(false);
    if (!userAction) {
      return;
    }
    if (await deleteTask(task)) {
      refresh();
    }
  };

  const taskSettings = () => {
    return (
      <div className="task-header-manager">
        <MdOutlineDriveFileRenameOutline
          title="Rename"
          className="icon-menu primary"
          onClick={() => {
            setIsUpdate(true);
          }}
        />
        <BsFillTrashFill
          title="Delete"
          className="icon-menu delete"
          onClick={async () => setShowModal(true)}
        />
        <RxCross1
          className="icon-menu secondary"
          onClick={() => {
            setVisibleTaskSetting(false);
          }}
        />
      </div>
    );
  };

  const taskSettingsIcon = () => {
    return (
      <BsListTask
        className="icon-menu secondary"
        onClick={() => {
          setVisibleTaskSetting(true);
        }}
      />
    );
  };

  const taskSettingsOrIcon = () => {
    if (visibleTaskSetting) {
      return taskSettings();
    } else {
      return taskSettingsIcon();
    }
  };

  const taskOrRename = () => {
    if (isUpdate) {
      return (
        <AddTask
          handleAddClick={() => setIsUpdate(false)}
          isUpdate={isUpdate}
          taskId={task.id!}
        />
      );
    }
    return content();
  };

  const content = () => {
    return (
      <>
        <div
          className={`task ${
            activeTask?.id && task.id === activeTask.id
              ? "remove-bottom-border"
              : ""
          } `}
        >
          <div
            className="circle"
            onClick={() => {
              task.done = !task.done;
              toggleTaskStatus();
            }}
          ></div>
          <div
            className="task-title"
            onClick={() => {
              toggleActiveTask(task);
            }}
          >
            {task.name}
            <div className="priority">{getArrowPrioritet(priority)}</div>
          </div>
          {taskSettingsOrIcon()}
        </div>
        {showTaskBody()}
      </>
    );
  };
  return (
    <>
      {isLoading ? <Spiner /> : taskOrRename()}
      {showModal && (
        <Modal
          text={`Are you sure, you want to delete task: ${task.name}`}
          tittle={task.name}
          type={ModalButton.YesNo}
          closeAction={async () => setShowModal(false)}
          handleUserAction={deleteTaskHandler}
        />
      )}
    </>
  );
}

export default Task;
