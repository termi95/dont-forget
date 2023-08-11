import { useCallback, useContext, useState } from "react";
import { Project } from "../../types/Project";
import UseMenuApi from "./UseMenuApi";
import AddProject from "./menuElements/project/addProject/AddProject";
import { MenuContext } from "./MenuContext";
import { AppContext } from "../../AppContext";

export const UseMenu = () => {
  const { getProjectHeader } = UseMenuApi();
  const [projects, setProjects] = useState<Project[]>();
  const [addProject, setAddProject] = useState<boolean>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { IsMenuExpaned, setIsMenuExpaned } = useContext(MenuContext);  
  const { loginUser } = useContext(AppContext);
  const getProjects = useCallback(async () => {
    setIsLoading(true);
    try {
      const projects = await getProjectHeader();
      if (projects !== null) {
        setProjects(projects);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }, []);

  const changeAddProjectState = async () => {
    setAddProject(!addProject);
  };

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

  return {
    getProjects,
    changeAddProjectState,
    setIsLoading,
    addProjectContent,
    setIsMenuExpaned,
    projects,
    addProject,
    isLoading,
    IsMenuExpaned,
    loginUser
  };
};
