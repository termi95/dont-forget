interface Project {
  name: string;
  id?: number;
  owner: number;
}

interface ProjectUpdate extends Project {
  newName: string;
}

export enum Privileges {
  ADMIN,
  USER,
}

export type { Project, ProjectUpdate };
