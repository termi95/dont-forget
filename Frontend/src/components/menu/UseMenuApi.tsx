import { api } from "../../api/api";
import { Project, ProjectUpdate } from "../../types/Project";

function UseMenuApi() {
  const updateProjectHeader = async (project: ProjectUpdate) => {
    return await api
      .patch("/project/", project)
      .then((res) => {
        if (res.status === 200) {
          return true;
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  const insertProjectHeader = async (project: ProjectUpdate) => {
    return await api
      .post("/project/", project)
      .then((res) => {
        if (res.status === 201) {
          return true;
        } else {
          return false;
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  const getProjectHeader = async () => {
    return await api
      .get("/project/projects")
      .then(async (res: { status: number; data: Project[] | null }) => {
        if (res.status === 200) {
          return res.data;
        } else {
          return null;
        }
      })
      .catch((e) => {
        throw new Error(e);
      });
  };

  const deleteProjectHeader = async (id: number) => {
    return await api
      .delete("/project/", { data: { id } })
      .then((res) => {
        if (res.status === 200) {
          return true;
        } else {
          return false;
        }
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
  return {
    getProjectHeader,
    insertProjectHeader,
    updateProjectHeader,
    deleteProjectHeader,
  };
}
export default UseMenuApi;
