import { useContext, useEffect } from "react";
import "../../style/menu.scss";
import { UseMenu } from "./UseMenu";
import { RiMenuAddLine, SlArrowLeft, SlArrowRight } from "react-icons/all";
import Spiner from "../spiner/Spiner";
import ProjectHeader from "./menuElements/project/header/ProjectHeader";
import { ProjectContext } from "../project/ProjectContext";

function Menu() {
  const {
    getProjects,
    changeAddProjectState,
    addProjectContent,
    setIsMenuExpaned,
    projects,
    isLoading,
    IsMenuExpaned,
    loginUser,
  } = UseMenu();
  const { project, setProject } = useContext(ProjectContext);
  const checkIfProjectExists = () => {
    return (
      projects &&
      projects.length > 0 &&
      (project.id === 0 ||
        projects.filter((x) => x.id === project.id).length !== projects.length)
    );
  };

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
    <>
      <menu
        className={[
          "vertical-menu",
          loginUser.isDesktop
            ? IsMenuExpaned
              ? "expand-menu"
              : "shrink-menu"
            : IsMenuExpaned
            ? "expand-menu"
            : "shrink-menu",
        ].join(" ")}
      >
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
      <div>
        <div
          className="absolut h-auto t00 background-default pointer sm-pad"
          onClick={() => setIsMenuExpaned((prev) => !prev)}
        >
          {loginUser.isDesktop ? (
            IsMenuExpaned ? (
              <SlArrowLeft />
            ) : (
              <SlArrowRight />
            )
          ) : IsMenuExpaned ? (
            <SlArrowRight />
          ) : (
            <SlArrowLeft />
          )}
        </div>
      </div>
    </>
  );
}

export default Menu;
