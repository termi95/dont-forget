import Menu from "../menu/Menu";
import "../../style/mainContainer.css";
import Task from "../task/Task";
import Spiner from "../spiner/Spiner";

function Project() {
  return (
    <>
      <div className="main-container">
        <Menu />
        <div id="project-content">
            <Task />
            <Task />
        </div>
      </div>
    </>
  );
}

export default Project;
