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

interface AddTaskHeader {
  name: string;
  projectId: number | null;
  id: number
}
interface ITaskVisibility {
  name: string, value: number
}

export const TaskVisibility: ITaskVisibility[] = [
  { name: 'Not done', value: 0 },
  { name: 'Done', value: 1 },
  { name: 'All', value: 2 }];


export type { Task, AddTaskHeader, TaskUpdate, ITaskVisibility };