import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useState,
} from "react";
import { ITaskVisibility, Task } from "../../types/Task";

const initialTasksState: [Task] = [{ body: "", createdByUser: 0, creationDate: new Date("2021-01-01"), done: false, FinishDate: new Date("2021-01-01"), id: 0, name: "" }];

export interface TasksContextInterface {
    tasks: [Task];
    setTasks: Dispatch<SetStateAction<[Task]>>;
}
const defaultState = {
    tasks: initialTasksState,
    setTasks: (tasks: [Task]) => { },
} as TasksContextInterface;

export const TasksContext =
    createContext<TasksContextInterface>(defaultState);
//---------------------------------------------------------------------
const initialTaskState: Task | null = null;

export interface TaskContextInterface {
    activeTask: Task | null;
    setActiveTask: Dispatch<SetStateAction<Task | null>>;
}
const defaultTaskState = {
    activeTask: initialTaskState,
    setActiveTask: (task: Task) => { },
} as TaskContextInterface;

export const TaskContext =
    createContext<TaskContextInterface>(defaultTaskState);
//---------------------------------------------------------------------
export interface ITaskVisibilityContextInterface {
    taskVisibility: ITaskVisibility;
    setTaskVisibility: Dispatch<SetStateAction<ITaskVisibility>>;
}
const initialTaskVisibility = { name: 'not done', value: 0 };
const defaultStateTaskVisibility = {
    taskVisibility: initialTaskVisibility,
    setTaskVisibility: (TaskVisibility: ITaskVisibility) => { },
} as ITaskVisibilityContextInterface;

export const TaskVisibilityContext =
    createContext<ITaskVisibilityContextInterface>(defaultStateTaskVisibility);

type ProjectProviderProps = {
    children: ReactNode;
};
export default function TasksProvider({ children }: ProjectProviderProps) {
    const [tasks, setTasks] = useState<[Task]>(initialTasksState);
    const [activeTask, setActiveTask] = useState<Task | null>(initialTaskState);
    const [taskVisibility, setTaskVisibility] = useState<ITaskVisibility>(initialTaskVisibility);

    return (
        <TaskVisibilityContext.Provider value={{ taskVisibility, setTaskVisibility }}>
            <TasksContext.Provider value={{ tasks, setTasks }}>
                <TaskContext.Provider value={{ activeTask, setActiveTask }}>
                    {children}
                </TaskContext.Provider>
            </TasksContext.Provider>
        </TaskVisibilityContext.Provider>
    );
}
