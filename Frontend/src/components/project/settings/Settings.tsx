import { useEffect } from "react";
import { useParams } from "react-router-dom";
import UseSettings from "./UseSettings";

function Settings() {
  const { projectId } = useParams();

  const { userToAddRef, selectRef, userPrivilagesOptions, addUser } = UseSettings();
  useEffect(() => {}, []);
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
          <button className="t20 back-info t-white" onClick={addUser}>Add</button>
        </div>
        <table className="styled-table w100 t00 text-left space-top">
          <thead>
            <tr>
              <th>User</th>
              <th>Privilages</th>
              <th>Added</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Alfreds Futterkiste</td>
              <td>Maria Anders</td>
              <td>Germany</td>
            </tr>
            <tr>
              <td>Centro comercial Moctezuma</td>
              <td>Francisco Chang</td>
              <td>Mexico</td>
            </tr>
            <tr>
              <td>Ernst Handel</td>
              <td>Roland Mendel</td>
              <td>Austria</td>
            </tr>
            <tr>
              <td>Island Trading</td>
              <td>Helen Bennett</td>
              <td>UK</td>
            </tr>
            <tr>
              <td>Laughing Bacchus Winecellars</td>
              <td>Yoshi Tannamuri</td>
              <td>Canada</td>
            </tr>
            <tr>
              <td>Magazzini Alimentari Riuniti</td>
              <td>Giovanni Rovelli</td>
              <td>Italy</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Settings;
