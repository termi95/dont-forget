import { useRef, useState } from "react";
import {
  AddProjectMember,
  RemoveProjectMember,
  Privileges,
  ProjectMembers,
} from "../../../types/Project";
import UseProjectApi from "../UseProjectApi";
import { UserRow } from "./UserRow";
import { useNavigate } from "react-router-dom";
interface Props {
  projectId: string | undefined;
}
export default function UseSettings({ projectId }: Props) {
  const userToAddRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);
  const [members, setMembers] = useState<ProjectMembers[]>();
  const [memberToDelete, setMemberToDelete] = useState<ProjectMembers | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);
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

  const toggleModalState = async () => {
    await setShowModal((prev) => !prev);
  };
  const handleDeleteAction = async (userAnswer: boolean) => {
    await toggleModalState();
    if (!userAnswer) {
      return;
    }
    if (memberToDelete) {
      deleteMemberHandler(memberToDelete?.userId);
      setMemberToDelete(null);
    }
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
  const handleSetMemberToDelete = (member: ProjectMembers) => {
    setMemberToDelete(member);
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
      let index: number = members?.findIndex((m) => m.userId === userId)!;
      const changedRole: ProjectMembers = members?.filter(
        (m) => m.userId === userId
      )[0]!;
      changedRole.role = role;
      setMembers([
        ...members!.slice(0, index),
        changedRole,
        ...members!.slice(++index),
      ]);
    }
  };

  let navigate = useNavigate();
  function returnToMainPage() {
    return navigate("/project");
  }

  const projectMembersTableContent = () => {
    return members?.map((member, index) => {
      return (
        <UserRow
          key={member.id}
          member={member}
          index={index}
          userPrivilagesOptions={userPrivilagesOptions}
          changeMemberRoleHandler={changeMemberRoleHandler}
          handleSetMemberToDelete={handleSetMemberToDelete}
          toggleModalState={toggleModalState}
        />
      );
    });
  };
  return {
    userToAddRef,
    selectRef,
    showModal,
    memberToDelete,
    userPrivilagesOptions,
    addUser,
    fetchData,
    projectMembersTableContent,
    toggleModalState,
    handleDeleteAction,
    returnToMainPage,
  };
}
