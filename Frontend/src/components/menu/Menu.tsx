import { useContext, useEffect } from "react";
import "../../style/menu.css";
import { UseMenu } from "./UseMenu";
import { RiMenuAddLine } from "react-icons/all";
import Spiner from "../spiner/Spiner";
import ProjectHeader from "./menuElements/project/header/ProjectHeader";
import { ProjectContext } from "../project/ProjectContext";

function Menu() {
  const {
    getProjects,
    changeAddProjectState,
    addProjectContent,
    projects,
    isLoading,
  } = UseMenu();
  const { project, setProject } = useContext(ProjectContext);
  const checkIfProjectExists = () => { return (projects && projects.length > 0 && (project.id === 0 || (projects.filter((x) => x.id === project.id).length !== projects.length))) };

  useEffect(() => {
    getProjects();
  }, []);

  useEffect(() => {
    if (projects && checkIfProjectExists()) {
      setProject(projects[0]);
    }
  }, [projects]);

  const content = () => {
    return (
      <>
        {projects?.map((project, index) => {
          return (
            <ProjectHeader
              key={index}
              projectProp={project}
              handleRefresh={getProjects}
            />
          );
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
