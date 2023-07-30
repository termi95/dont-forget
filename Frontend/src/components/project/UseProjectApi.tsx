import { api } from "../../api/api";
import {
  AddProjectMember,
  ChangeMemberRole,
  RemoveProjectMember,
  ProjectMembers,
} from "../../types/Project";

function UseProjectApi() {
  const getProjectMembers = async (
    projectId: number
  ): Promise<[ProjectMembers]> => {
    const tasks = await api
      .post("/Project/get-members", { id: projectId })
      .then(async (res) => {
        if (res.status === 200) {
          return res.data;
        }
        throw new Error("brak danych");
      });
    return tasks;
  };

  const insertMember = async (member: AddProjectMember) => {
    return await api.post("/Project/add-member", member).then(async (res) => {
      if (res.status === 200) {
        return res.data;
      }
      throw new Error("brak danych");
    });
  };

  const deleteMember = async (member: RemoveProjectMember) => {
    const { projectId, userId } = member;
    return await api
      .delete("/Project/delete-member", { data: { projectId, userId } })
      .then(async (res) => {
        if (res.status === 200) {
          return res.data;
        }
        throw new Error("brak danych");
      });
  };

  const changeMemberRole = async (member: ChangeMemberRole) => {
    return await api.patch("/Project/member",  member).then(async (res) => {
      if (res.status === 200) {
        return res.data;
      }
      throw new Error("brak danych");
    });
  };

  return { getProjectMembers, insertMember, deleteMember, changeMemberRole };
}

export default UseProjectApi;
