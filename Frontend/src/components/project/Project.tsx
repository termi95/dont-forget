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
import { MenuContext } from "../menu/MenuContext";
import { useContext } from "react";
import { AppContext } from "../../AppContext";

function Project() {
  const { IsMenuExpaned } = useContext(MenuContext);
  const { loginUser } = useContext(AppContext);
  return (
    <>
      <div className="main-container">
        <ProjectProvider>
          <Menu />
          {loginUser.isMobile && !IsMenuExpaned && (
            <div
              id="project-content"
              className={[
                "max-h",
                loginUser.isDesktop
                  ? IsMenuExpaned
                    ? ""
                    : ""
                  : IsMenuExpaned
                  ? "shrink-menu"
                  : "expand-menu",
              ].join(" ")}
            >
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
          )}
          
          {loginUser.isDesktop && (
            <div
              id="project-content"
              className={[
                "max-h",
                loginUser.isDesktop
                  ? IsMenuExpaned
                    ? ""
                    : ""
                  : IsMenuExpaned
                  ? "shrink-menu"
                  : "expand-menu",
                  loginUser.isMobile && !IsMenuExpaned && ""
              ].join(" ")}
            >
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
          )}
        </ProjectProvider>
      </div>
    </>
  );
}

export default Project;
