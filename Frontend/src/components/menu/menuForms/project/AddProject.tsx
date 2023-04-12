import { AiOutlinePlus, RxCross1 } from "react-icons/all";
import { Project } from "../../../../types/Project";
import { UseAddProject } from "./UseAddProject";
import { memo, useEffect, useRef } from "react";
interface Props {
  handleRefresh: () => Promise<void>;
  toggleState: () => Promise<void>;
  project: Project;
  update: boolean;
}
function AddProject({ handleRefresh, project, toggleState, update }: Props) {
  const { acceptChanges, handleChange, handleOnKeyDown } = UseAddProject({
    handleRefresh,
    toggleState,
    project,
    update,
  });
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <button className="add-project">
      <input
        ref={ref}
        type="text"
        placeholder="Project name"
        onChange={(e) => handleChange(e.target)}
        onKeyDown={(e) => handleOnKeyDown(e)}
      ></input>
      <AiOutlinePlus className="icon-menu" onClick={() => acceptChanges()} />
      <RxCross1 className="icon-menu" onClick={toggleState} />
    </button>
  );
}

export default memo(AddProject);
