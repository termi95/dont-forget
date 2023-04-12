import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useState,
  } from "react";
  import { Task } from "../../../types/Task";

  const initialTaskState: Task | null = null;
  
  export interface TaskContextInterface {
    activeTask: Task | null;
    setActiveTask: Dispatch<SetStateAction<Task | null>>;
  }
  const defaultTaskState = {
    activeTask: initialTaskState,
    setActiveTask: (task: Task) => {},
  } as TaskContextInterface;
  
  export const TaskContext =
    createContext<TaskContextInterface>(defaultTaskState);
  
  type ProjectProviderProps = {
    children: ReactNode;
  };
  export default function ActiveTaskProvider({ children }: ProjectProviderProps) {
    const [activeTask, setActiveTask] = useState<Task | null>(initialTaskState);
  
    return (
          <TaskContext.Provider value={{ activeTask, setActiveTask }}>
            {children}
          </TaskContext.Provider>
    );
  }
  