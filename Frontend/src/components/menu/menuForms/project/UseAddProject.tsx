import { useState } from "react";
import { api } from "../../../../api/api";
import { Project } from "../../../../types/Project";

const initialProjectState: Project = {
  name: "",
  id: 0,
  owner: 0,
};

interface Props {
  handleRefresh: () => Promise<void>;
  toggleState: () => Promise<void>;  
  name: string;
}

export const UseAddProject = ({ handleRefresh, name = "", toggleState }: Props) => {
  const [project, setProject] = useState<Project>({ name, owner: 0, id: 0 });
  const acceptChanges = async () => {
    if (project && project.name !== "") {
      await insert(project);
    }
  };

  const handleChange = async (e: HTMLInputElement) => {
    project!.name = e.value;
    setProject(project);
  };

  const insert = async (project: Project) => {
    await api
      .post("/project/", project)
      .then((res) => {
        if (res.status === 201) {
          setProject(initialProjectState);
          toggleState();
          handleRefresh();
        }
      })
      .catch((error) => {});
  };
  return { acceptChanges, handleChange };
};
