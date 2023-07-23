import { useRef, useState } from "react";
import { Privileges, ProjectMembers } from "../../../types/Project";
import UseProjectApi from "../UseProjectApi";
interface Props {
  projectId: string | undefined;
}
export default function UseSettings({ projectId }: Props) {
  const userToAddRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);
  const [members, setMembers] = useState<ProjectMembers[]>();
  const { getProjectMembers } = UseProjectApi();

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

  const addUser = () => {
    if (selectRef.current !== null && userToAddRef.current !== null) {
      console.log(selectRef.current.value, userToAddRef.current.value);
    }
  };

  const fetchData = async () => {
    if (projectId) {
      setMembers(await getProjectMembers(parseInt(projectId)));
    }
  };

  const projectMembersTableContent = () => {
    return members?.map((member, index) => {
      const {email,id,role,created} = member;
      return (
        <tr key={id}>
          <td>{++index}</td>
          <td>{email}</td>
          <td>{Privileges[role]}</td>
          <td>{created.toString()}</td>
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
