import "../../../style/taskBody.scss";
import { Priority } from "../../../types/Task";
import UseTaskBody from "./UseTaskBody";

interface Props {
  priority: Priority;
  id: number;
  refreshPriority:  (value: Priority) => void;
}

function TaskBody({ priority, id, refreshPriority }: Props) {
  const { priorityTaskOptions, changeTaskPriority, selectedOption } =
    UseTaskBody({ priority, id, refreshPriority });
  return (
    <>
      <div className="task-body-content-wraper">
        <div className="task-body-content">
          <div className="task-priority">
            <label htmlFor="priority">
              <p>Priority:</p>
            </label>
            <select
              onChange={(e) => {
                changeTaskPriority(e.target);
              }}
              value={selectedOption}
            >
              {priorityTaskOptions()}
            </select>
          </div>
          <textarea></textarea>
        </div>
        <div className="chat">tu będzię czat</div>
      </div>
    </>
  );
}
export default TaskBody;
