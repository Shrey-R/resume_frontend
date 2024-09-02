import { useState } from "react";
import getNavBarData from "./helpers/getNavBarData.js";
import NavBar from "./NavBar/index.js";
import Form from "./Form/index.js";
import DisplayData from "./DisplayData/index.js";
import styles from "./styles.module.css";

export default function App() {
  const [activeTab, setActiveTab] = useState("form");
  const navBarData = getNavBarData(setActiveTab);

  const Component = {
    form: <Form />,
    display: <DisplayData />,
  };

  return (
    <div className={`${styles.container} ${styles.grainy}`}>
      <NavBar data={navBarData} activeTab={activeTab}/>
      {Component[activeTab]}
    </div>
  );
}