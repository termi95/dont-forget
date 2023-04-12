import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useState,
  } from "react";
  import { ITaskVisibility } from "../../../types/Task";

  export interface ITaskVisibilityContextInterface {
    taskVisibility: ITaskVisibility;
    setTaskVisibility: Dispatch<SetStateAction<ITaskVisibility>>;
  }
  const initialTaskVisibility = { name: "not done", value: 0 };
  const defaultStateTaskVisibility = {
    taskVisibility: initialTaskVisibility,
    setTaskVisibility: (TaskVisibility: ITaskVisibility) => {},
  } as ITaskVisibilityContextInterface;
  
  export const TaskVisibilityContext =
    createContext<ITaskVisibilityContextInterface>(defaultStateTaskVisibility);
  
  type ProjectProviderProps = {
    children: ReactNode;
  };
  export default function TaskVisibilityProvider({ children }: ProjectProviderProps) {
    const [taskVisibility, setTaskVisibility] = useState<ITaskVisibility>(
      initialTaskVisibility
    );
  
    return (
        <TaskVisibilityContext.Provider
          value={{ taskVisibility, setTaskVisibility }}
        >
            {children}
        </TaskVisibilityContext.Provider>
    );
  }
  