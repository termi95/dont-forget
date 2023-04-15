import { useCallback, useState } from "react";
import { Project } from "../../types/Project";
import UseMenuApi from "./UseMenuApi";
import AddProject from "./menuElements/project/addProject/AddProject";

export const UseMenu = () => {
  const { getProjectHeader } = UseMenuApi();
  const [projects, setProjects] = useState<Project[]>();
  const [addProject, setAddProject] = useState<boolean>();
  const [isLoading, setIsLoading] = useState<boolean>(true);  
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
    projects,
    addProject,
    isLoading,
  };
};
