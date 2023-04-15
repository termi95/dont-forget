import { memo, useState } from "react";
import { GoSettings, MdOutlineDriveFileRenameOutline } from "react-icons/all";
import { BsFillTrashFill, BsListTask } from "react-icons/bs";
import { api } from "../../../../api/api";
import { Project } from "../../../../types/Project";
import AddProject from "./AddProject";
import UseMenuApi from "../../UseMenuApi";
interface Props {
  active: boolean;
  project: Project;
  handleActiveProject: (idActiveElem: HTMLDivElement) => Promise<void>;
  handleRefresh: () => Promise<void>;
  setProjectContext: (project: Project) => void;
}

function ProjectHeader({
  project,
  active,
  handleActiveProject,
  handleRefresh,
  setProjectContext,
}: Props) {
  const { deleteProjectHeader } = UseMenuApi();
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
    if (await deleteProjectHeader(id)) {
      handleRefresh();
    }
  };

  const projectHeader = () => {
    return (
      <div
        key={id}
        className={"btn " + (activeHeader ? "active" : "")}
        onDoubleClick={changeAddProjectState}
        onClick={(e) => {
          handleActiveProject(e.currentTarget);
          setProjectContext(project);
          setActiveHeader(true);
        }}
      >
<<<<<<< Updated upstream
        <span style={{ width:'100%'}}>{name}</span>
        <BsListTask className="icon-menu end secondary" onClick={changeProjectManage} />
      </div>)
  }
=======
        <span style={{ width: "100%" }}>{name}</span>
        <BsListTask className="icon-menu end" onClick={changeProjectManage} />
      </div>
    );
  };
>>>>>>> Stashed changes

  const projectOrRename = () => {
    if (addProject) {
      return addProjectContent();
    } else {
      return projectHeader();
    }
  };

  const projectMangerContent = () => {
    if (projectManger) {
<<<<<<< Updated upstream
      return (<div>
        <div className="project-header-manager">
          <MdOutlineDriveFileRenameOutline title="Rename" className="icon-menu success" onClick={changeAddProjectState} />
          <BsFillTrashFill title="Delete" className="icon-menu delete" onClick={async () => await handleDelete(id!)} />
          <GoSettings title="Settings" className="icon-menu primary" onClick={() => alert("jeszcze tu nic nie ma")} />
=======
      return (
        <div>
          <div className="project-header-manager">
            <MdOutlineDriveFileRenameOutline
              title="Rename"
              className="icon-menu"
              onClick={changeAddProjectState}
            />
            <BsFillTrashFill
              title="Delete"
              className="icon-menu"
              onClick={async () => await handleDelete(id!)}
            />
            <GoSettings
              title="Settings"
              className="icon-menu"
              onClick={() => alert("jeszcze tu nic nie ma")}
            />
          </div>
>>>>>>> Stashed changes
        </div>
      );
    }
  };

  return (
    <>
      {projectOrRename()}
      {projectMangerContent()}
    </>
  );
}

export default memo(ProjectHeader);
