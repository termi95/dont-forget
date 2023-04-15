import { useState } from "react";
import UseMenuApi from "../../../UseMenuApi";
interface Props {
  handleRefresh: () => Promise<void>;
}

function UseProjectHeader({ handleRefresh }: Props) {
  const { deleteProjectHeader } = UseMenuApi();
  const [addProject, setAddProject] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalValue, setModalValue] = useState(false);
  const changeAddProjectState = async () => {
    setAddProject(!addProject);
  };

  const toggleModalState =async () => {
    setShowModal(!showModal);
  }
  const toggleModalValue =async () => {
    setModalValue(!modalValue);
  }
  const handleDelete = async (id: number) => {
    await toggleModalState();
    if (await modalValue) {
      if (await deleteProjectHeader(id)) {
        handleRefresh();
      }
    }
    await toggleModalState();;
  };


  return {
    handleDelete,
    changeAddProjectState,
    toggleModalValue,
    addProject,
    showModal,
  };
}

export default UseProjectHeader;
