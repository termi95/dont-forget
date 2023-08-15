import { BsFillTrashFill } from "react-icons/bs";
import { ProjectMembers } from "../../../types/Project";
interface Props {
  member: ProjectMembers;
  index: number;
  userPrivilagesOptions: () => JSX.Element[];
  changeMemberRoleHandler: (role: number, userId: number) => Promise<void>;
  handleSetMemberToDelete: (member: ProjectMembers) => void;
  toggleModalState: () => Promise<void>;
}
export function UserRow 
  (
    {
      member,
      index,
      userPrivilagesOptions,
      changeMemberRoleHandler,
      handleSetMemberToDelete,
      toggleModalState,
    }: Props
  )  {
    const { created, email, role, userId } = member;
    return (
      <>
        <tr>
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
              onClick={() => (
                handleSetMemberToDelete(member), toggleModalState()
              )}
            />
          </td>
        </tr>
      </>
    );
  };
