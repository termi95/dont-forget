interface Project {
  name: string;
  id?: number;
  owner: number;
}

interface ProjectUpdate extends Project {
  newName: string;
}

interface ProjectMembers {
  id: number;
  userId: number;
  role: Privileges;
  email: string;
  created: Date;
  name: string;
}

export enum Privileges {
  ADMIN,
  USER,
}

export type { Project, ProjectUpdate , ProjectMembers};
