interface Project {
    name: string;
    id?: number;
    owner: number;
  }

  interface ProjectUpdate extends Project {
    newName: string;
  }

  interface ProjectContextType {
    project: Project
    activeManager:boolean
  }
  
  export type { Project, ProjectUpdate, ProjectContextType };