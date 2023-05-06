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
export interface TaskProperties {
  id: number;
  body: string;
  priority?: Priority;
}

export interface TaskUpdate {
  id: number;
  newName: string;
  newBody: string;
  done: boolean;
  priority?: Priority;
  body?: string;
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
