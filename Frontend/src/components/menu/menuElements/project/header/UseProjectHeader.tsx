import { useState } from "react";
import UseMenuApi from "../../../UseMenuApi";
interface Props {
  handleRefresh: () => Promise<void>;
}

function UseProjectHeader({ handleRefresh }: Props) {
  const { deleteProjectHeader } = UseMenuApi();
  const [addProject, setAddProject] = useState(false);
  const changeAddProjectState = async () => {
    setAddProject(!addProject);
  };

  const handleDelete = async (id: number) => {
    if (await deleteProjectHeader(id)) {
      handleRefresh();
    }
  };

  
  return {
    handleDelete,
    changeAddProjectState,
    addProject,
  };
}

export default UseProjectHeader;
