import { useState } from "react";
import { api } from "../../../../api/api";
import { Project, ProjectUpdate } from "../../../../types/Project";

const initialProjectState: ProjectUpdate = {
  name: "",
  newName: "",
  id: 0,
  owner: 0,
};

interface Props {
  handleRefresh: () => Promise<void>;
  toggleState: () => Promise<void>;
  project: Project;
  update: boolean
}

export const UseAddProject = ({ handleRefresh, project, toggleState, update }: Props) => {
  const [projectUpdate, setProject] = useState<ProjectUpdate>({ name: project.name, newName: "", owner: 0, id: project.id });
  const acceptChanges = async () => {
    console.log(update);
    if (projectUpdate && !update && projectUpdate.name) {
      await handleInsert(projectUpdate);
    } else if (projectUpdate && projectUpdate.newName !== "") {
      await handleUpdate(projectUpdate);
    }
  };

  const handleChange = async (e: HTMLInputElement) => {
    if (update) {
      projectUpdate.newName = e.value;
      setProject(projectUpdate);
    } else {
      projectUpdate.name = e.value;
      setProject(projectUpdate);
    }
  };

  const handleInsert = async (project: ProjectUpdate) => {
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
  const handleUpdate = async (project: ProjectUpdate) => {
    await api
      .patch("/project/", project)
      .then((res) => {
        if (res.status === 200) {
          setProject(initialProjectState);
          toggleState();
          handleRefresh();
        }
      })
      .catch((error) => { });
  };
  return { acceptChanges, handleChange, projectUpdate };
};
