import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useState,
  } from "react";
  import { SortType } from "../../../types/Task";

  const initialTaskState: SortType = SortType.ALPHABETICALLY_DESC;
  
  export interface TaskSortContextInterface {
    sortTasks: SortType;
    setSortTasks: Dispatch<SetStateAction<SortType>>;
  }
  const defaultTaskState = {
    sortTasks: initialTaskState,
    setSortTasks: (sortTasks: SortType) => {},
  } as TaskSortContextInterface;
  
  export const TaskSortContext =
    createContext<TaskSortContextInterface>(defaultTaskState);
  
  type ProjectProviderProps = {
    children: ReactNode;
  };
  export default function TaskSortContextProvider({ children }: ProjectProviderProps) {
    const [sortTasks, setSortTasks] = useState<SortType>(initialTaskState);
  
    return (
          <TaskSortContext.Provider value={{ sortTasks, setSortTasks }}>
            {children}
          </TaskSortContext.Provider>
    );
  }
  