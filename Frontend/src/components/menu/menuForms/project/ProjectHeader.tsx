import { useState } from "react";
import { Project } from "../../../../types/Project";
interface Props {
  active: boolean;
  project: Project;
  handleActiveProject: (idActiveElem: HTMLDivElement) => Promise<void>;
}

function ProjectHeader({ project, active, handleActiveProject }: Props) {
  const [activeHeader, setActiveHeader] = useState(active);
  const { id, name } = project;
  return (
    <>
      <div
        key={id}
        className={"btn " + (activeHeader ? "active" : "")}
        onClick={(e) => {
          handleActiveProject(e.currentTarget);
          setActiveHeader(true);
        }}
      >
        <span>{name}</span>
      </div>
    </>
  );
}

export default ProjectHeader;
