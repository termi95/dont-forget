import { useCallback, useState } from "react";
import { Project, ProjectUpdate } from "../../../../../types/Project";
import UseMenuApi from "../../../UseMenuApi";

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
  update: boolean;
}

export const UseAddProject = ({
  handleRefresh,
  project,
  toggleState,
  update,
}: Props) => {
  const [projectUpdate, setProject] = useState<ProjectUpdate>({
    name: project.name,
    newName: "",
    owner: 0,
    id: project.id,
  });
  const { updateProjectHeader, insertProjectHeader } = UseMenuApi();
  const acceptChanges = async () => {
    if (projectUpdate && !update && projectUpdate.name) {
      await handleInsert(projectUpdate);
    } else if (projectUpdate && projectUpdate.newName !== "") {
      await handleUpdate(projectUpdate);
    }
  };

  const handleChange = useCallback(async (e: HTMLInputElement) => {
    if (update) {
      projectUpdate.newName = e.value;
      setProject(projectUpdate);
    } else {
      projectUpdate.name = e.value;
      setProject(projectUpdate);
    }
  }, []);

  const handleInsert = async (project: ProjectUpdate) => {
    if (await insertProjectHeader(project)) {
      setProject(initialProjectState);
      toggleState();
      handleRefresh();
    }
  };

  const handleUpdate = async (project: ProjectUpdate) => {
    if (await updateProjectHeader(project)) {
      setProject(initialProjectState);
      toggleState();
      handleRefresh();
    }
  };

  const handleOnKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      await acceptChanges();
    }
  };
  return { acceptChanges, handleChange, handleOnKeyDown, projectUpdate };
};
