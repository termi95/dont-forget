export interface Project {
  id: number;
  owner: number;
  name: string;
}

export interface ProjectUpdate extends Project {
  newName: string;
}
