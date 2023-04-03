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

export type { Task, AddTask, TaskUpdate };