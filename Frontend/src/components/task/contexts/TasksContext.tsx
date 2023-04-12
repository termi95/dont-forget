import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";
import { Task } from "../../../types/Task";

const initialTasksState: [Task] = [
  {
    body: "",
    createdByUser: 0,
    creationDate: new Date("2021-01-01"),
    done: false,
    FinishDate: new Date("2021-01-01"),
    id: 0,
    name: "",
  },
];

export interface TasksContextInterface {
  tasks: [Task];
  setTasks: Dispatch<SetStateAction<[Task]>>;
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
  const [tasks, setTasks] = useState<[Task]>(initialTasksState);

  return (
    <TasksContext.Provider value={{ tasks, setTasks }}>
          {children}
    </TasksContext.Provider>
  );
}
