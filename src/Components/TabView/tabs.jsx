import React from "react";
import CreateTab from "./createTab";
import VerifyTab from "./verifyTab";
import ListMits from "./Mits/listMits";
import "./Tabs.css";

const Tabs = props => {
  return (
    <React.Fragment>
      {props.currentTab === 0 ? (
        <div>
          <ul
            className="nav nav-tabs"
            id="myTab"
            role="tablist"
            style={{
              backgroundColor: "#F9F7F7",
              // padding: "10px 0px 0px 30px"
            }}
          >
            <li className="nav-item">
              <a
                className="nav-link active "
                id="Create-tab"
                data-toggle="tab"
                href="#Create"
                role="tab"
                aria-controls="Create"
                aria-selected="true"
              >
                Create
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="Verify-tab"
                data-toggle="tab"
                href="#Verify"
                role="tab"
                aria-controls="Verify"
                aria-selected="false"
              >
                Verify
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="Mit-tab"
                data-toggle="tab"
                href="#Mits"
                role="tab"
                aria-controls="Mits"
                aria-selected="false"
              >
                Your MITS
              </a>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="Create"
              role="tabpanel"
              aria-labelledby="Create-tab"
              style={{ marginTop: "6%", textAlign: "center" }}
            >
              <CreateTab />
            </div>
            <div
              className="tab-pane fade"
              id="Verify"
              role="tabpanel"
              aria-labelledby="Verify-tab"
              style={{ marginTop: "6%", textAlign: "center" }}
            >
              <VerifyTab />
            </div>
            <div
              className="tab-pane fade"
              id="Mits"
              role="tabpanel"
              aria-labelledby="Verify-tab"
            >
              <ListMits />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <ul
            className="nav nav-tabs"
            id="myTab"
            role="tablist"
            style={{
              backgroundColor: "#F9F7F7",
              padding: "10px 0px 0px 30px"
            }}
          >
            <li className="nav-item">
              <a
                className="nav-link "
                id="Create-tab"
                data-toggle="tab"
                href="#Create"
                role="tab"
                aria-controls="Create"
                aria-selected="true"
                style={{
                  fontSize: "28px",
                  fontFamily: "Proxima Nova",
                  color: "#818281"
                }}
              >
                Create
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link active"
                id="Verify-tab"
                data-toggle="tab"
                href="#Verify"
                role="tab"
                aria-controls="Verify"
                aria-selected="false"
                style={{
                  fontSize: "28px",
                  fontFamily: "Proxima Nova",
                  color: "#818281"
                }}
              >
                Verify
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="Mit-tab"
                data-toggle="tab"
                href="#Mits"
                role="tab"
                aria-controls="Verify"
                aria-selected="false"
              >
                Your MITS
              </a>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade "
              id="Create"
              role="tabpanel"
              aria-labelledby="Create-tab"
              style={{ marginTop: "6%", textAlign: "center" }}
            >
              <CreateTab />
            </div>
            <div
              className="tab-pane fade show active"
              id="Verify"
              role="tabpanel"
              aria-labelledby="Verify-tab"
              style={{ marginTop: "6%", textAlign: "center" }}
            >
              <VerifyTab />
            </div>
            <div
              className="tab-pane fade show"
              id="Mits"
              role="tabpanel"
              aria-labelledby="Verify-tab"
              style={{ marginTop: "6%", textAlign: "center" }}
            >
              <ListMits />
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Tabs;
