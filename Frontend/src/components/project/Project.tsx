import Menu from "../menu/Menu";
import "../../style/mainContainer.css";
import { AiFillPlusCircle } from "react-icons/all";
import AddTask from "../task/AddTask";
import { useState } from "react";
import ProjectProvider from "./ProjectContext";
import TaskList from "../task/TaskList";

function Project() {
  const [addProjectFlag, setAddProjectFlag] = useState(false);
  const handleAddClick = (flag: boolean) => {
    setAddProjectFlag(flag);
  };

  return (
    <>
      <div className="main-container">
        <ProjectProvider>
          <Menu />
          <div id="project-content">
            <TaskList />
            {addProjectFlag && <AddTask handleAddClick={handleAddClick} />}
            <div className="add-task">
              <AiFillPlusCircle
                className="add-task-button"
                onClick={() => handleAddClick(!addProjectFlag)}
              />
            </div>
          </div>
        </ProjectProvider>
      </div>
    </>
  );
}

export default Project;
