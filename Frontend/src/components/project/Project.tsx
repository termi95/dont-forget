import Menu from "../menu/Menu";
import "../../style/mainContainer.css";
import ProjectProvider from "./ProjectContext";
import TaskList from "../task/TaskList";
import TasksProvider from "../task/TaskContext";
import ListManager from "../task/ListManager";
import AddTaskContainer from "../task/AddTaskContainer";

function Project() {
  return (
    <>
      <div className="main-container">
        <ProjectProvider>
          <Menu />
          <div id="project-content">
            <TasksProvider>
              <ListManager />
              <TaskList />
              <AddTaskContainer />
            </TasksProvider>
          </div>
        </ProjectProvider>
      </div>
    </>
  );
}

export default Project;
