import { DateTimeType } from '@mikro-orm/core';

export interface Task {
  id: number;
  name: string;
  body: string;
  done: boolean;
  createdByUser: number;
  creationDate: DateTimeType;
  FinishDate: DateTimeType;
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
