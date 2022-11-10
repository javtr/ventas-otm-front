import React from "react";
import { MdDelete } from "react-icons/md";
import { IconContext } from "react-icons";

export default function AppUserRow({ user }) {
  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.rol}</td>
      <td>{user.user}</td>
    </tr>
  );
}
