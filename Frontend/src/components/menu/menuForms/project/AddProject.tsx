import { AiOutlinePlus, RxCross1 } from "react-icons/all";
import { Project } from "../../../../types/Project";
import { UseAddProject } from "./UseAddProject";
interface Props {
  handleRefresh: () => Promise<void>;
  toggleState: () => Promise<void>;
  project: Project;
  update: boolean;
}
function AddProject({ handleRefresh, project, toggleState, update }: Props) {
  const { acceptChanges, handleChange, projectUpdate } = UseAddProject({
    handleRefresh,
    toggleState,
    project,
    update
  });

  return (
    <button className="add-project">
      <input
        type="text"
        placeholder="Project name"
        onChange={(e) => handleChange(e.target)}
      ></input>
      <AiOutlinePlus className="icon-menu" onClick={() => acceptChanges()} />
      <RxCross1 className="icon-menu" onClick={toggleState} />
    </button>
  );
}

export default AddProject;
