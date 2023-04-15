import { memo, useContext } from "react";
import { TaskVisibility } from "../../types/Task";
import { TaskVisibilityContext } from "./contexts/TaskVisibilityContext";

function ListManager() {
  const { taskVisibility, setTaskVisibility } = useContext(
    TaskVisibilityContext
  );
  const visibilityOptions = () =>
    TaskVisibility.map((x, index) => {
      return (
        <option key={index} value={x.value}>
          {x.name}
        </option>
      );
    });
  const setVisibility = (value: string) => {
    const mode = TaskVisibility.find((x) => x.value === Number(value));
    if (mode) {
      setTaskVisibility(mode);
    }
  };
  return (
    <>
      <div className="task">
        <div className="task-visibility">
          <label htmlFor="visibility">
            <p>Task visibility:</p>
          </label>
          <select
            id="visibility"
            onChange={(e) => {
              setVisibility(e.target.value);
            }}
            value={taskVisibility.value}
          >
            {visibilityOptions()}
          </select>
        </div>
      </div>
    </>
  );
}
export default memo(ListManager);
