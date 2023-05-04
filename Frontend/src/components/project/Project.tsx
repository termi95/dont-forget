import Menu from "../menu/Menu";
import "../../style/mainContainer.scss";
import ProjectProvider from "./ProjectContext";
import TaskList from "../task/TaskList";
import TasksProvider from "../task/contexts/TasksContext";
import ListManager from "../task/listTaskManager/ListManager";
import AddTaskContainer from "../task/AddTaskContainer";
import TaskVisibilityProvider from "../task/contexts/TaskVisibilityContext";
import ActiveTaskProvider from "../task/contexts/ActiveTaskContext";
import TaskSortContextProvider from "../task/contexts/TaskSortContext";

function Project() {
  return (
    <>
      <div className="main-container">
        <ProjectProvider>
          <Menu />
          <div id="project-content">
            <TasksProvider>
              <TaskVisibilityProvider>
                <TaskSortContextProvider>
                  <ListManager />
                  <ActiveTaskProvider>
                    <TaskList />
                  </ActiveTaskProvider>
                </TaskSortContextProvider>
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
