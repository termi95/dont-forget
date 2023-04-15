import { useCallback, useState } from "react";
import { Project } from "../../types/Project";
import UseMenuApi from "./UseMenuApi";

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

  const handleActiveProject = useCallback(
    async (newActiveElem: HTMLDivElement) => {
      document.querySelector(".active")?.classList.remove("active");
      newActiveElem.classList.add("active");
    },
    []
  );

  return {
    getProjects,
    changeAddProjectState,
    setIsLoading,
    handleActiveProject,
    projects,
    addProject,
    isLoading,
  };
};
