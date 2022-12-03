import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/context";
import ChartBoxes from "../pure/chartBoxes";
import CharVentas from "../pure/charVentas";

export default function Home() {
  const { userDataContext, setUserDataContext } = useContext(UserContext);

  return (
    <div className="homeCharts">
      <div className="homeCharts__container">
        <div className="homeCharts__container__row">
          <ChartBoxes></ChartBoxes>
        </div>
        <CharVentas></CharVentas>
      </div>
    </div>
  );
}
