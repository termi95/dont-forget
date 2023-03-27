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
  const acceptChanges = async (update: boolean) => {
    if (project && !update) {
      await handleInsert(project);
    } else if (project) {
      await handleUpdate(project);
    }
  };

  const handleChange = async (e: HTMLInputElement) => {
    project!.name = e.value;
    setProject(project);
  };

  const handleInsert = async (project: Project) => {
    await api
      .post("/project/", project)
      .then((res) => {
        if (res.status === 201) {
          setProject(initialProjectState);
          toggleState();
          handleRefresh();
        }
      })
      .catch((error) => { });
  };
  const handleUpdate = async (project: Project) => {
    await api
      .patch("/project/", project)
      .then((res) => {
        if (res.status === 201) {
          setProject(initialProjectState);
          toggleState();
          handleRefresh();
        }
      })
      .catch((error) => { });
  };
  return { acceptChanges, handleChange };
};
