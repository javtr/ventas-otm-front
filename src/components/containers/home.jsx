import React,{useContext} from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/context";

export default function Home() {
  const { userDataContext, setUserDataContext } = useContext(UserContext);
  
  return (
    <div className="layout__outlet">
      {userDataContext.rol}
    </div>
  );
}
