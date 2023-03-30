interface Task {
    id: number | null;
    name: string;
    body: string;
    done: boolean;
    createdByUser: number | null;
    creationDate: Date | null;
    FinishDate: Date | null;
  }
  export type { Task };