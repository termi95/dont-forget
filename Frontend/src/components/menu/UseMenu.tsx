import { useState } from "react";
import { api } from "../../api/api";
import { Project } from "../../types/Project";

export const UseMenu = () => {
  const [projects, setProjects] = useState<Project[]>();
  const [addProject, setAddProject] = useState<boolean>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeHeader, setActiveHeader] = useState<HTMLDivElement>();
  const getProjects = async () => {
    setIsLoading(true);
    try {
      await api
        .get("/project/projects")
        .then((res) => {
          if (res.status === 200) {
            setProjects(res.data);
          }
        })
        .catch((error) => {});
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const changeAddProjectState = async () => {
    setAddProject(!addProject);
  };

  const handleActiveProject = async (newActiveElem: HTMLDivElement) => {
    if (activeHeader) {
      activeHeader.classList.remove("active");
      newActiveElem.classList.add("active");
      setActiveHeader(newActiveElem);
    } else {
      document.querySelector('.active')?.classList.remove("active");
      newActiveElem.classList.add("active");
      setActiveHeader(newActiveElem);
    }
  };

  return {
    getProjects,
    changeAddProjectState,
    setIsLoading,
    handleActiveProject,
    projects,
    addProject,
    isLoading,
    activeHeader,
  };
};
