import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useMemo,
  useState,
} from "react";
import { Project } from "../../types/Project";

const initialProjectState: Project = {
  name: "",
  id: 0,
  owner: 0,
};

export interface ProjectContextInterface {
  project: Project;
  setProject: Dispatch<SetStateAction<Project>>;
}
const defaultState = {
  project: initialProjectState,
  setProject: (project: Project) => {},
} as ProjectContextInterface;
export const ProjectContext =
  createContext<ProjectContextInterface>(defaultState);

type ProjectProviderProps = {
  children: ReactNode;
};

export default function ProjectProvider({ children }: ProjectProviderProps) {
  const [project, setProject] = useState<Project>(initialProjectState);

  const value = useMemo(
    () => ({
      project,
      setProject,
    }),
    [project]
  );
  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
}
