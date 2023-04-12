import Menu from "../menu/Menu";
import "../../style/mainContainer.css";
import ProjectProvider from "./ProjectContext";
import TaskList from "../task/TaskList";
import TasksProvider from "../task/contexts/TasksContext";
import ListManager from "../task/ListManager";
import AddTaskContainer from "../task/AddTaskContainer";
import TaskVisibilityProvider from "../task/contexts/TaskVisibilityContext";
import ActiveTaskProvider from "../task/contexts/ActiveTaskContext";

function Project() {
  return (
    <>
      <div className="main-container">
        <ProjectProvider>
          <Menu />
          <div id="project-content">
            <TasksProvider>
              <TaskVisibilityProvider>
                <ListManager />
                <ActiveTaskProvider>
                  <TaskList />
                </ActiveTaskProvider>
              </TaskVisibilityProvider>
              <AddTaskContainer />
            </TasksProvider>
          </div>
        </ProjectProvider>
      </div>
    </>
  );
}

export default Project;
