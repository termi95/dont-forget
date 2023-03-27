import { useState } from "react";
import { GoSettings, MdOutlineDriveFileRenameOutline } from "react-icons/all";
import { BsFillTrashFill, BsListTask } from "react-icons/bs";
import { api } from "../../../../api/api";
import { Project } from "../../../../types/Project";
import AddProject from "./AddProject";
interface Props {
  active: boolean;
  project: Project;
  handleActiveProject: (idActiveElem: HTMLDivElement) => Promise<void>;
  handleRefresh: () => Promise<void>;
}

function ProjectHeader({ project, active, handleActiveProject, handleRefresh }: Props) {
  const [activeHeader, setActiveHeader] = useState(active);
  const [addProject, setAddProject] = useState(false);
  const { id, name } = project;
  const changeAddProjectState = async () => {
    setAddProject(!addProject);
  };
  const addProjectContent = () => {
    return (
      <>
        <AddProject
          handleRefresh={handleRefresh}
          name={name}
          toggleState={changeAddProjectState}
          update={true}
        />
      </>
    );
  };
  const handleDelete = async (id: number) => {
    await api
      .delete("/project/", { data: { id } })
      .then((res) => {
        if (res.status === 200) {
          handleRefresh();
        }
      })
      .catch((error) => { });
  };
  return (
    <>
      <div
        key={id}
        className={"btn " + (activeHeader ? "active" : "")}
        onClick={(e) => {
          // setAddProject(false);
          handleActiveProject(e.currentTarget);
          setActiveHeader(true);
        }}
      >
        <span>{name}</span>
        <BsListTask className="icon-menu" onClick={changeAddProjectState} />
      </div>
      <div>
        {addProjectContent()}
        <div className="project-header-manager">
          <MdOutlineDriveFileRenameOutline className="icon-menu" />
          <BsFillTrashFill className="icon-menu" onClick={async () => await handleDelete(id!)} />
          <GoSettings className="icon-menu" onClick={() => alert("jeszcze tu nic nie ma")}/>
        </div>
      </div>
    </>
  );
}

export default ProjectHeader;
