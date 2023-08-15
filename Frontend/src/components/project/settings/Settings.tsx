import { useEffect } from "react";
import { useParams } from "react-router-dom";
import UseSettings from "./UseSettings";
import Modal from "../../modal/Modal";
import { ModalButton } from "../../../types/Modal";

function Settings() {
  const { projectId } = useParams();

  const {
    userToAddRef,
    selectRef,
    showModal,
    memberToDelete,
    handleDeleteAction,
    userPrivilagesOptions,
    addUser,
    fetchData,
    projectMembersTableContent,
    toggleModalState,
  } = UseSettings({ projectId });
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="center flex column">
        <div className="t100">Project: </div>
        <div className="t20 flex">
          <p>Add user to project</p>
          <input
            type="email"
            name="Email"
            className="space-left  t00"
            placeholder="user@email.com"
            ref={userToAddRef}
          />
          <select
            name="Privilages"
            ref={selectRef}
            className="bg-white no-border t00 pointer"
          >
            {userPrivilagesOptions()}
          </select>
          <button className="t20 back-info t-white" onClick={addUser}>
            Add
          </button>
        </div>
        <table className="styled-table w100 t00 text-left space-top tablemobile">
          <thead>
            <tr>
              <th>No.</th>
              <th>User</th>
              <th>Privilages</th>
              <th>Added</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{projectMembersTableContent()}</tbody>
        </table>
      </div>
      {showModal &&  memberToDelete && (
        <Modal
          text={`Are you sure, you want to remove ${memberToDelete.email} from project`}
          tittle={`Remove ${memberToDelete.email}`}
          type={ModalButton.YesNo}
          closeAction={toggleModalState}
          handleUserAction={handleDeleteAction}
        />
      )}
    </>
  );
}

export default Settings;
