export interface Task {
  id: number;
  name: string;
  body: string;
  done: boolean;
  project: Date;
  createdByUser: number;
  creationDate: Date;
  FinishDate: Date;
}
