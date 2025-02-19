import React, { useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import { faSchool , faChalkboardUser } from "@fortawesome/free-solid-svg-icons";

import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import { Ripple } from "primereact/ripple";
import { StyleClass } from "primereact/styleclass";

import Dropdown from "./Dropdown";
import { Link } from "react-router-dom";
import { all_routes } from "../feature-module/router/all_routes";

// import Sidebar from "./Sidebar";

const Defaultlayout = () => {
  const routes = all_routes;

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const loggedInUser = [{ name: "Alice Johnson", role: "Student" }];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [visible, setVisible] = useState(false);

  const StudentsItems = [
    { path: "/Students_profile", label: "PROFILE" },
    { path: "/Students_batches", label: "BATCH" },
  ];
  const TrainerItems = [
    { path: "/Trainer_profile", label: "PROFILE" }
  ];

  if (!isSidebarOpen) return null;

  return (
    <>
      <Sidebar
        className="posRel sidebarBg"
        visible={visible}
        onHide={() => setVisible(false)}
        header={
          <div>
            <span className="text_avatar_48 text-nowrap">
              {loggedInUser[0].name.charAt(0)}
            </span>
            <div className="sidebarHeaderContainer">
              <span className="sidebarName">{loggedInUser[0].name}</span>
              <span className="sidebarRole text-muted">
                {loggedInUser[0].role}
              </span>
            </div>
            <div className="sidebarHeaderContainer d-none">
              <span className="sidebarName">User</span>
              <span className="sidebarRole text-muted">{"Subrole"}</span>
            </div>
          </div>
        }
      >
        <Dropdown
          title="Student Dashboard"
          items={StudentsItems}
          icon={faSchool}
        />
        <Dropdown
          title="Trainer Dashboard"
          items={TrainerItems}
          icon={faChalkboardUser}
        />

        <div className="authFuncCont">
          <div className="me-2">
            <i className="pi pi-user" style={{ fontSize: "2rem" }}></i>
          </div>
          <div className="d-flex flex-column">
            <span className="text-muted">Don't have an account? </span>
            <Link to={all_routes.register3} className="text-light">
              Create Account
            </Link>
          </div>
        </div>
        <div className="authFuncCont d-none">
          <div className="me-2">
            <i
              className="pi pi-sign-out"
              style={{ fontSize: "2rem", color: "#dc3545" }}
            ></i>
          </div>
          <div className="d-flex flex-column">
            <span className="text-muted">Ready to leave?</span>
            <Link className="text-light" to={all_routes.register3}>
              Logout
            </Link>
          </div>
        </div>
      </Sidebar>
      <div className="row  mx-0">
        <div className="col-xxl-12 col-xl-12 col-md-12 sticky-header-top">
          <Header setVisible={setVisible} toggleSidebar={toggleSidebar} />
        </div>
        <div className="col-xxl-12 col-xl-12 col-md-12 px-0">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Defaultlayout;
