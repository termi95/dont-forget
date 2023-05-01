import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { Task } from "../../../types/Task";

const initialTasksState: [Task] | null = null;

export interface TasksContextInterface {
  tasks: [Task] | null;
  setTasks: Dispatch<SetStateAction<[Task] | null>>;
}
const defaultState = {
  tasks: initialTasksState,
  setTasks: (tasks: [Task]) => {},
} as TasksContextInterface;

export const TasksContext = createContext<TasksContextInterface>(defaultState);

type ProjectProviderProps = {
  children: ReactNode;
};
export default function TasksProvider({ children }: ProjectProviderProps) {
  const [tasks, setTasks] = useState<[Task] | null>(initialTasksState);

  return (
    <TasksContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TasksContext.Provider>
  );
}
