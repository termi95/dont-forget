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
  const [projectManger, setProjectManger] = useState(false);
  const { id, name } = project;
  const changeAddProjectState = async () => {
    setAddProject(!addProject);
  };
  const changeProjectManage = async () => {
    setProjectManger(!projectManger);
  };
  const addProjectContent = () => {
    return (
      <>
        <AddProject
          handleRefresh={handleRefresh}
          project={project}
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

  const projectHeader = () => {
    return (
      <div
        key={id}
        className={"btn " + (activeHeader ? "active" : "")}
        onClick={(e) => {
          handleActiveProject(e.currentTarget);
          setActiveHeader(true);
        }}
      >
        <span style={{ width:'100%'}}>{name}</span>
        <BsListTask className="icon-menu end" onClick={changeProjectManage} />
      </div>)
  }

  const projectOrRename = () => {
    if (addProject) {
      return addProjectContent();
    } else {
      return projectHeader();
    }
  }

  const projectMangerContent = () => {
    if (projectManger) {
      return (<div>
        <div className="project-header-manager">
          <MdOutlineDriveFileRenameOutline title="Rename" className="icon-menu" onClick={changeAddProjectState} />
          <BsFillTrashFill title="Delete" className="icon-menu" onClick={async () => await handleDelete(id!)} />
          <GoSettings title="Settings" className="icon-menu" onClick={() => alert("jeszcze tu nic nie ma")} />
        </div>
      </div>)
    }
  }

  return (
    <>
      {projectOrRename()}
      {projectMangerContent()}
    </>
  );
}

export default ProjectHeader;