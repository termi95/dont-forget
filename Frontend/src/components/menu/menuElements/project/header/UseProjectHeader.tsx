import { useState } from "react";
import UseMenuApi from "../../../UseMenuApi";
import { Project } from "../../../../../types/Project";
interface Props {
  handleRefresh: () => Promise<void>;
  projectProp: Project;
}

function UseProjectHeader({ handleRefresh, projectProp }: Props) {
  const { deleteProjectHeader } = UseMenuApi();
  const [addProject, setAddProject] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalValue, setModalValue] = useState(false);
  const changeAddProjectState = async () => {
    setAddProject(!addProject);
  };

  const toggleModalState = async () => {
    await setShowModal(!showModal);
  };

  const toggleModalValue = async () => {
    setModalValue(!modalValue);
  };

  const handleDelete = async (userAnswer: boolean) => {
    await toggleModalState();
    if (!userAnswer) {
      return;
    }
    if (await deleteProjectHeader(projectProp.id!)) {
      handleRefresh();
    }
  };


  return {
    handleDelete,
    changeAddProjectState,
    toggleModalValue,
    toggleModalState,
    addProject,
    showModal,
  };
}

export default UseProjectHeader;
