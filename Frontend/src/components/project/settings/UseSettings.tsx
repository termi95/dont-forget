import { useRef, useState } from "react";
import {
  AddProjectMember,
  RemoveProjectMember,
  Privileges,
  ProjectMembers,
} from "../../../types/Project";
import UseProjectApi from "../UseProjectApi";
import { BsFillTrashFill } from "react-icons/bs";
interface Props {
  projectId: string | undefined;
}
export default function UseSettings({ projectId }: Props) {
  const userToAddRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);
  const [members, setMembers] = useState<ProjectMembers[]>();
  const { getProjectMembers, deleteMember, insertMember, changeMemberRole } =
    UseProjectApi();

  const userPrivilagesOptions = () => {
    const privileges = Object.values(Privileges);
    const firstHalf = privileges.slice(0, privileges.length / 2);
    return firstHalf.map((value, index) => {
      let text = value.toString();
      text = text.slice(0, 1) + text.slice(1).toLowerCase();
      return (
        <option key={index} value={index}>
          {text}
        </option>
      );
    });
  };

  const addUser = async () => {
    if (selectRef.current !== null && userToAddRef.current !== null) {
      const addUser: AddProjectMember = {
        email: userToAddRef.current.value,
        projectId: parseInt(projectId!),
        role: parseInt(selectRef.current.value),
      };
      const newMember = await insertMember(addUser);
      if (newMember) {
        setMembers([...members!, newMember]);
      }
    }
  };

  const fetchData = async () => {
    if (projectId) {
      setMembers(await getProjectMembers(parseInt(projectId)));
    }
  };

  const deleteMemberHandler = async (userId: number) => {
    const member: RemoveProjectMember = {
      projectId: parseInt(projectId!),
      userId,
    };
    if (await deleteMember(member)) {
      setMembers(members?.filter((m) => m.userId !== userId));
    }
  };

  const changeMemberRoleHandler = async (role: number, userId: number) => {
    if (
      await changeMemberRole({ role, userId, projectId: parseInt(projectId!) })
    ) {
      let index: number = members?.findIndex(m =>m.userId === userId)!;
      const changedRole: ProjectMembers = members?.filter((m) => m.userId === userId)[0]!;
      changedRole.role = role;
      setMembers([
        ...members!.slice(0, index),
        changedRole,        
        ...members!.slice(++index),
      ]);
    }
  };

  const projectMembersTableContent = () => {
    return members?.map((member, index) => {
      const { email, id, role, created, userId } = member;
      return (
        <tr key={id}>
          <td>{++index}</td>
          <td>{email}</td>
          <td>
            <select
              name="Privilages"
              className="bg-white no-border t00 pointer"
              onChange={(e) =>
                changeMemberRoleHandler(parseInt(e.target.value), userId)
              }
              value={role}
            >
              {userPrivilagesOptions()}
            </select>
          </td>
          <td>{created.toString()}</td>
          <td>
            <BsFillTrashFill
              className="delete"
              onClick={() => deleteMemberHandler(userId)}
            />
          </td>
        </tr>
      );
    });
  };
  return {
    userToAddRef,
    selectRef,
    userPrivilagesOptions,
    addUser,
    fetchData,
    projectMembersTableContent,
  };
}
