import { lazy, useContext, useState } from "react";
import { GoSettings, MdOutlineDriveFileRenameOutline } from "react-icons/all";
import { BsFillTrashFill, BsListTask } from "react-icons/bs";
import { Project } from "../../../../../types/Project";
import UseProjectHeader from "./UseProjectHeader";
import { ProjectContext } from "../../../../project/ProjectContext";
import AddProject from "../addProject/AddProject";
import { ModalButton } from "../../../../../types/Modal";
const Modal = lazy(() => import("../../../../modal/Modal"));
interface Props {
  projectProp: Project;
  handleRefresh: () => Promise<void>;
}

function ProjectHeader({ projectProp, handleRefresh }: Props) {
  const { changeAddProjectState, handleDelete, toggleModalState, addProject, showModal } = UseProjectHeader({
    handleRefresh, projectProp
  });
  const { project, setProject } = useContext(ProjectContext);
  const [projectManger, setProjectManger] = useState(false);
  const { id, name } = projectProp;
  const projectHeader = () => {
    return (
      <div
        key={id}
        className={"btn " + (project?.id == id ? "active" : "")}
        onDoubleClick={changeAddProjectState}
        onClick={() => {
          setProject(projectProp);
        }}
      >
        <span style={{ width: "100%" }}>{name}</span>
        <BsListTask
          className="icon-menu end secondary"
          onClick={changeProjectManager}
        />
      </div>
    );
  };

  const changeProjectManager = () => {
    setProjectManger(!projectManger);
  };
  const addProjectContent = () => {
    return (
      <>
        <AddProject
          handleRefresh={handleRefresh}
          project={projectProp}
          toggleState={changeAddProjectState}
          update={true}
        />
      </>
    );
  };

  const projectOrRename = () => {
    if (addProject) {
      return addProjectContent();
    } else {
      return projectHeader();
    }
  };

  const projectMangerContent = () => {
    if (projectManger) {
      return (
        <div>
          <div className="project-header-manager">
            <MdOutlineDriveFileRenameOutline
              title="Rename"
              className="icon-menu success"
              onClick={changeAddProjectState}
            />
            <BsFillTrashFill
              title="Delete"
              className="icon-menu delete"
              onClick={toggleModalState}
            />
            <GoSettings
              title="Settings"
              className="icon-menu primary"
              onClick={() => alert("jeszcze tu nic nie ma")}
            />
          </div>
        </div>
      );
    }
  };

  return (
    <>
      {projectOrRename()}
      {projectMangerContent()}
      {showModal && <Modal text={`Are you sure, you want to delete project: ${projectProp.name}`} tittle={projectProp.name} type={ModalButton.YesNo} closeAction={toggleModalState} handleUserAction={handleDelete} />}
    </>
  );
}

export default ProjectHeader;
