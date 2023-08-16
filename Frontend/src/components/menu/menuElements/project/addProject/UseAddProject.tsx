import { useCallback, useState } from "react";
import { Project, ProjectUpdate } from "../../../../../types/Project";
import UseMenuApi from "../../../UseMenuApi";
import UseToast from "../../../../../UseToast";

const initialProjectState: ProjectUpdate = {
  name: "",
  newName: "",
  id: 0,
  owner: 0,
};

const MINIMAL_NAME_LONG = 3;
const MAX_NAME_LONG = 32;

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
  const { ShowError } = UseToast();
  const acceptChanges = async () => {
    if (projectUpdate && !update && projectUpdate.name) {
      if (!validateProjectName(projectUpdate.name)) {
        return;
      }
      await handleInsert(projectUpdate);
    } else if (projectUpdate && projectUpdate.newName !== "") {
      if (!validateProjectName(projectUpdate.newName)) {
        return;
      }
      projectUpdate.name = projectUpdate.newName;
      await handleUpdate(projectUpdate);
    }
  };

  const validateProjectName  = (name: string) => {
    return nameIsLongerThenMin(name) && nameIsShorterThenMax(name)
  }

  const nameIsLongerThenMin = (name: string) => {
    if (name.trim().length < MINIMAL_NAME_LONG) {
      ShowError(`Project minimal name length is ${MINIMAL_NAME_LONG}.`);
      return false;
    }
    return true;
  };

  const nameIsShorterThenMax = (name: string) => {
    if (name.trim().length > MAX_NAME_LONG) {
      ShowError(`Project max name length is ${MAX_NAME_LONG}.`);
      return false;
    }
    return true;
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
