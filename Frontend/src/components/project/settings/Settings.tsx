import { useEffect } from "react";
import { useParams } from "react-router-dom";
import UseSettings from "./UseSettings";

function Settings() {
  const { projectId } = useParams();

  const {
    userToAddRef,
    selectRef,
    userPrivilagesOptions,
    addUser,
    fetchData,
    projectMembersTableContent,
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
            className="space-left"
            placeholder="user@email.com"
            ref={userToAddRef}
          />
          <select name="Privilages" ref={selectRef}>
            {userPrivilagesOptions()}
          </select>
          <button className="t20 back-info t-white" onClick={addUser}>
            Add
          </button>
        </div>
        <table className="styled-table w100 t00 text-left space-top">
          <thead>
            <tr>
              <th>No.</th>
              <th>User</th>
              <th>Privilages</th>
              <th>Added</th>
            </tr>
          </thead>
          <tbody>{projectMembersTableContent()}</tbody>
        </table>
      </div>
    </>
  );
}

export default Settings;
