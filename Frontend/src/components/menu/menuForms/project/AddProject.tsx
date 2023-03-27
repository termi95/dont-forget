import { AiOutlinePlus } from "react-icons/all";
import { UseAddProject } from "./UseAddProject";
interface Props {
  handleRefresh: () => Promise<void>;
  toggleState: () => Promise<void>;
  name: string;
}
function AddProject({ handleRefresh, name = "", toggleState }: Props) {
  const { acceptChanges, handleChange } = UseAddProject({
    handleRefresh,
    toggleState,
    name,
  });
  return (
    <button className="add-project">
      <input
        type="text"
        placeholder="Project name"
        onChange={(e) => handleChange(e.target)}
      ></input>
      <button className="btn" onClick={acceptChanges}>
        <AiOutlinePlus />
      </button>
    </button>
  );
}

export default AddProject;
