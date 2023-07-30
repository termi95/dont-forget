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

interface AddProjectMember {
  projectId: number;
  role: number;
  email: string;
}
interface RemoveProjectMember {
  projectId: number;
  userId: number;
}
interface ChangeMemberRole {
  projectId: number;
  userId: number;
  role: Privileges;
}

export enum Privileges {
  ADMIN,
  USER,
}

export type { Project, ProjectUpdate , ProjectMembers, AddProjectMember, RemoveProjectMember, ChangeMemberRole};
