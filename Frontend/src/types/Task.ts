interface Task {
  id: number | null;
  name: string;
  body: string;
  done: boolean;
  createdByUser: number | null;
  creationDate: Date | null;
  FinishDate: Date | null;
}
interface TaskUpdate {
  id: number;
  newName: string;
  newBody: string;
  done: boolean;
}

interface AddTask {
  name: string;
  body: string;
  projectId: number | null;
}
interface ITaskVisibility {
  name: string, value: number
}

export const TaskVisibility: ITaskVisibility[] = [
  { name: 'Not done', value: 0 },
  { name: 'Done', value: 1 },
  { name: 'All', value: 2 }];


export type { Task, AddTask, TaskUpdate, ITaskVisibility };