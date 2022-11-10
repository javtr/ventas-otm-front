import React, { useContext } from "react";
import UserContext from "../../context/context";
import avatar from "../../images/avatar-default.svg";
import close from "../../images/close.svg";

export default function UserInfo() {
  const { userDataContext, setUserDataContext } = useContext(UserContext);

  function logOut() {
    if (alert("Cerrar sesion")) {
      localStorage.token = "";

      const userTemp = {
        id: 0,
        user: "",
        rol: "",
        token: "",
      };

      setUserDataContext(userTemp);
      navigate("/login");
    }
  }

  return (
    <div className="userInfo">
      <img
        onClick={() => {
          logOut();
        }}
        className="userInfo__imgClose"
        src={close}
      ></img>
      <div className="userInfo__img">
        <img src={avatar}></img>
      </div>
      <h4 className="userInfo__name">{userDataContext.user}</h4>
    </div>
  );
}
