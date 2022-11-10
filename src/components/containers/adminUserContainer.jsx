import React, { useEffect, useState } from "react";
import { GetAppUsers } from "../../Services/axiosService";
import AppUserRow from "../pure/appUserRow";

export default function AdminUserContainer() {
  const [applicationUsers, setApplicationUsers] = useState([]);

  useEffect(() => {
    getApplicationUsers();
  }, []);

  const getApplicationUsers = () => {
    GetAppUsers()
      .then((response) => {
        if (response.data === null) {
          console.log("Failed response");
        } else {
          setApplicationUsers(response.data);
        }
      })
      .catch((error) => {
        console.log("Failed axios");
        console.log(`Somethin went wrong: ${error}`);
      })
      .finally(() => {});
  };


  return (
  <div>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Rol</th>
            <th>User</th>
          </tr>
        </thead>
        <tbody>
          {applicationUsers.map((appUser, index) => (
            <AppUserRow
              key={index}
              user={appUser}
            ></AppUserRow>
          ))}
        </tbody>
      </table>
  </div>
  );
}
