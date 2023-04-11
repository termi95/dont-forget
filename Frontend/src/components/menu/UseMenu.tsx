import { SetStateAction, useCallback, useState } from "react";
import { api } from "../../api/api";
import { Project } from "../../types/Project";

export const UseMenu = () => {
  const [projects, setProjects] = useState<Project[]>();
  const [addProject, setAddProject] = useState<boolean>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const getProjects = useCallback(async () => {
    setIsLoading(true);
    try {
      await api
        .get("/project/projects")
        .then(
          async (res: {
            status: number;
            data: SetStateAction<Project[] | undefined>;
          }) => {
            if (res.status === 200) {
              setProjects(res.data);
            }
          }
        )
        .catch(() => {});
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
