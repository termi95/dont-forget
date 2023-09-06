interface Task {
  id: number | null;
  name: string;
  body: string;
  done: boolean;
  createdByUser: number | null;
  creationDate: Date | null;
  FinishDate: Date | null;
  priority: Priority;
  DoerId: number;
}
interface TaskUpdate {
  id: number;
  Name: string;
  Body: string;
  done: boolean;
  priority: Priority;
  DoerId: number;
}

interface AddTaskHeader {
  name: string;
  projectId: number | null;
  id: number;
}
interface ITaskVisibility {
  name: string;
  value: number;
}
export interface IMessage {  
  id:number;
  message: string;
  user: string;
  added: string;
}
export interface TaskProperties {
  id: number;
  body: string;
  priority?: Priority;
  DoerId: number;
}

export interface Doer {
  id: number;
  email: string;
}

export const TaskVisibility: ITaskVisibility[] = [
  { name: "Not done", value: 0 },
  { name: "Done", value: 1 },
  { name: "All", value: 2 },
];

export enum Priority {
  LOW,
  MEDIUM,
  HIGH,
  CRITICAL,
}
export enum SortType {
  ALPHABETICALLY_DESC,
  ALPHABETICALLY_ASC,
  PRIORITY_DESC,
  PRIORITY_ASC,
}
export type { Task, AddTaskHeader, TaskUpdate, ITaskVisibility };
