export interface Task {
  id: number;
  name: string;
  body: string;
  done: boolean;
  createdByUser: number;
  creationDate: Date;
  finishDate: Date;
  priority?: Priority;
}

export interface TaskUpdate {
  id: number;
  newName: string;
  newBody: string;
  done: boolean;
}
export interface TaskCreate {
  name: string;
  body: string;
  projectId: number;
}

export enum Priority {
  LOW,
  MEDIUM,
  HIGH,
  CRITICAL,
}
