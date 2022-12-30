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
  name: string;
  body: string;
  newName: string;
  newBody: string;
}
export interface TaskCreate {
  name: string;
  body: string;
  project: number;
}
