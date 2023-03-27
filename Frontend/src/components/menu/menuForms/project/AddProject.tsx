import { AiOutlinePlus } from "react-icons/all";
import { UseAddProject } from "./UseAddProject";
interface Props {
  handleRefresh: () => Promise<void>;
  toggleState: () => Promise<void>;
  name: string;
  update: boolean;
}
function AddProject({ handleRefresh, name = "", toggleState, update }: Props) {
  const { acceptChanges, handleChange } = UseAddProject({
    handleRefresh,
    toggleState,
    name,
  });
  return (
    <button className="add-project">
      <input
        type="text"
        value={name}
        placeholder="Project name"
        onChange={(e) => handleChange(e.target)}
      ></input>
      <AiOutlinePlus className="icon-menu" onClick={() => acceptChanges(update)} />
    </button>
  );
}

export default AddProject;
