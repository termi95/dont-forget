import { api } from "../../api/api";
import { ProjectMembers } from "../../types/Project";

function UseProjectApi() {
  const getProjectMembers = async (
    projectId: number
  ): Promise<[ProjectMembers]> => {
    const tasks = await api
      .post("/Project/members", {id:projectId})
      .then(async (res) => {
        if (res.status === 200) {
          return res.data;
        }
        throw new Error("brak danych");
      });
    return tasks;
  };
  return { getProjectMembers };
}

export default UseProjectApi;
