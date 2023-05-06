interface Task {
  id: number | null;
  name: string;
  body: string;
  done: boolean;
  createdByUser: number | null;
  creationDate: Date | null;
  FinishDate: Date | null;
  priority: Priority;
}
interface TaskUpdate {
  id: number;
  newName: string;
  newBody: string;
  done: boolean;
  priority: Priority;
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
export interface TaskProperties {
  id: number;
  body: string;
  priority?: Priority;
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
