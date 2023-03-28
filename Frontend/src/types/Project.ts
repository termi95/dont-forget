interface Project {
    name: string;
    id?: number;
    owner: number;
  }

  interface ProjectUpdate extends Project {
    newName: string;
  }
  
  export type { Project, ProjectUpdate };