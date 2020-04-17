import React from "react";
import Tabs from "./tabs";
import "./Tabs.css";

const TabView = props => {
  return (
    <React.Fragment>
      <div
        style={{
          marginTop: "40px",
          border: "1px solid #d0d0d0",
          borderRadius: "3px",
          WebkitBoxShadow: "2px 3px 3px 0px rgba(0, 0, 0, 0.2)",
          padding: "0px"
        }}
      >
        <Tabs currentTab={props.currentTab} />
      </div>
    </React.Fragment>
  );
};

export default TabView;
