import { useEffect } from "react";
import "../../style/menu.css";
import { UseMenu } from "./UseMenu";
import { RiMenuAddLine } from "react-icons/all";
import AddProject from "./menuForms/project/AddProject";
import Spiner from "../spiner/Spiner";
import ProjectHeader from "./menuForms/project/ProjectHeader";

function Menu() {
  const {
    getProjects,
    changeAddProjectState,
    handleActiveProject,
    projects,
    addProject,
    isLoading,
  } = UseMenu();

  useEffect(() => {
    getProjects();
  }, []);

  const addProjectContent = () => {
    return (
      <>
        {addProject && (
          <AddProject
            handleRefresh={getProjects}
            name={""}
            toggleState={changeAddProjectState}
            update={false}
          />
        )}
      </>
    );
  };

  const content = () => {
    return (
      <>
        {projects?.map((project, index) => {
          if (index < 1) {
            return (
              <ProjectHeader
                key={index}
                active={true}
                project={project}
                handleActiveProject={handleActiveProject}
                handleRefresh={getProjects}
              />
            );
          } else {
            return (
              <ProjectHeader
                key={index}
                active={false}
                project={project}
                handleActiveProject={handleActiveProject}
                handleRefresh={getProjects}
              />
            );
          }
        })}
      </>
    );
  };

  return (
    <menu className="vertical-menu">
      <div className="btn add-project" onClick={changeAddProjectState}>
        <span className="add-new">Add new</span>
        <div className="icon-menu add-new">
          <RiMenuAddLine />
        </div>
      </div>
      {addProjectContent()}
      {isLoading ? <Spiner /> : content()}
    </menu>
  );
}

export default Menu;
