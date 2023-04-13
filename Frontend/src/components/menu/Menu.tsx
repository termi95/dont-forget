import { useCallback, useContext, useEffect } from "react";
import "../../style/menu.css";
import { UseMenu } from "./UseMenu";
import { RiMenuAddLine } from "react-icons/all";
import AddProject from "./menuForms/project/AddProject";
import Spiner from "../spiner/Spiner";
import ProjectHeader from "./menuForms/project/ProjectHeader";
import { ProjectContext } from "../project/ProjectContext";
import { Project } from "../../types/Project";

function Menu() {
  const {
    getProjects,
    changeAddProjectState,
    handleActiveProject,
    projects,
    addProject,
    isLoading,
  } = UseMenu();
  const { project, setProject } = useContext(ProjectContext);

  useEffect(() => {
    getProjects();
  }, []);

  useEffect(() => {
    if (projects && projects.length > 0 && project.id === 0) {
      setProject(projects[0]);
    }
  }, [projects]);

  const setProjectContext = useCallback((project: Project) => {
    setProject(project);
  }, []);

  const addProjectContent = () => {
    return (
      <>
        {addProject && (
          <AddProject
            handleRefresh={getProjects}
            project={{ name: "", owner: 0, id: 0 }}
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
                setProjectContext={setProjectContext}
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
                setProjectContext={setProjectContext}
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
        <span style={{ width: "100%" }} className="add-new">
          Add new
        </span>
        <div className="icon-menu add-new secondary">
          <RiMenuAddLine />
        </div>
      </div>
      {addProjectContent()}
      {isLoading ? <Spiner /> : content()}
    </menu>
  );
}

export default Menu;
