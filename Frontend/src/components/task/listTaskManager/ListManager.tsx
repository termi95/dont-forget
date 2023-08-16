import { memo } from "react";
import UseListManager from "./UseListManager";

function ListManager() {
  const {
    setVisibility,
    visibilityOptions,
    taskVisibility,
    sortTaskOptions,
    setSortType,
    sortTasks,
    sortTask,
  } = UseListManager();

  return (
    <>
      <div className="task" style={{ cursor: "default" }}>
        <div className="task-visibility">
          <label htmlFor="visibility">
            <p>Task visibility:</p>
          </label>
          <select
            className="pointer"
            id="visibility"
            onChange={(e) => {
              setVisibility(e.target.value);
            }}
            value={taskVisibility.value}
          >
            {visibilityOptions()}
          </select>
        </div>
        <div className="task-visibility">
          <label htmlFor="sort">
            <p>Sort task by:</p>
          </label>
          <select
            className="pointer"
            onChange={(e) => {
              setSortType(e.target.value);
              sortTask(sortTasks.valueOf());
            }}
            value={sortTasks.valueOf()}
          >
            {sortTaskOptions()}
          </select>
        </div>
      </div>
    </>
  );
}
export default memo(ListManager);
