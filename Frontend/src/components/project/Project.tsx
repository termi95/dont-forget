import Menu from "../menu/Menu";
import "../../style/mainContainer.css";
import Task from "../task/Task";
import { AiFillPlusCircle } from "react-icons/all";
import AddTask from "../task/AddTask";
import { useRef, useState } from "react";

function Project() {
  const [addProjectFlag, setAddProjectFlag] = useState(false);
  const handleAddClick = (flag: boolean) => {
    setAddProjectFlag(flag);
  }

  return (
    <>
      <div className="main-container">
        <Menu />
        <div id="project-content">
          <Task />
          <Task />
          {addProjectFlag && <AddTask handleAddClick={handleAddClick} />}
          <div className="add-task">
            <AiFillPlusCircle className="add-task-button" onClick={() => handleAddClick(true)} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Project;
