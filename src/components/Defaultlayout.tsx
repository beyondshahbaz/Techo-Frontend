import React, { useContext, useState } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import Header from "./Header";


import { faSchool , faChalkboardUser , faTicket } from "@fortawesome/free-solid-svg-icons";


import { Sidebar } from "primereact/sidebar";
import Dropdown from "./Dropdown";
import { all_routes } from "../feature-module/router/all_routes";
import { AuthContext } from "../contexts/authContext";
import { useNetworkCheck } from "../contexts/NetworkContext";


const Defaultlayout = () => {
  const routes = all_routes;
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { user, userLoggedIN, LogoutUser } = useContext(AuthContext);
  const { isOnline } = useNetworkCheck();
  const [visible, setVisible] = useState(false);


  const StudentsItems = [
    { path: "/Students_profile", label: "PROFILE" },
    { path: "/Students_batches", label: "BATCH" },
  ];

  const TrainerItems = [
    { path: "/Trainer_profile", label: "PROFILE" },
    { path: "/Trainer_batch", label: "BATCH" }
  ];
  const Admission = [
    { path: "/Admission_table", label: "INTERVIEW" }
  ];
        
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    setVisible(false);
    LogoutUser();
    navigate('/login-3');
  };

  return (
    <>
      <Sidebar
        className="posRel sidebarBg"
        visible={visible}
        onHide={() => setVisible(false)}
        header={
          <div>
            <span className="text_avatar_48 text-nowrap">
              {userLoggedIN && user && user.first_name.charAt(0)}
            </span>
            <div className="sidebarHeaderContainer">
              <span className="sidebarRole">WELCOME,</span>
              <span className="sidebarName"></span>
              <span className="sidebarName text-muted">
                {userLoggedIN && user && `${user.first_name} ${user.last_name}`}
              </span>
            </div>
          </div>
        }
      >
        {/* <Dropdown
        <Dropdown
          key="student-dashboard"
          title="Student Dashboard"
          // items={StudentsItems}
          icon={faSchool}
        />
        <Dropdown
          key="trainer-dashboard"
          title="Trainer Dashboard"
          // items={TrainerItems}
          icon={faChalkboardUser}
        />
        <Dropdown
          key="admission-process"
          title="Admission Process"
          // items={Admission}
          icon={faTicket}
        /> */}

        <div className="authFuncCont">
          {userLoggedIN && (
            <>
              <div className="me-2">
                <i
                  className="pi pi-sign-out"
                  style={{ fontSize: "2rem", color: "#dc3545" }}
                ></i>
              </div>
              <div className="d-flex flex-column">
                <span className="text-muted">Ready to leave?</span>
                <span
                  className="btnLogout"
                  data-bs-toggle="modal"
                  data-bs-target="#logoutModal"
                  onClick={() => setVisible(false)}
                >
                  Logout
                </span>
              </div>
            </>
          )}
        </div>
      </Sidebar>

      <div className="row mx-0">
        <div className="col-xxl-12 col-xl-12 col-md-12 sticky-header-top px-0">
          <Header setVisible={setVisible} toggleSidebar={toggleSidebar} />
        </div>
        <div className="col-xxl-12 col-xl-12 col-md-12 px-0">
          <Outlet />
        </div>
      </div>

      {/* Logout Modal */}
      <div
        className="modal fade"
        id="logoutModal"
        aria-labelledby="logoutModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <h3 className="text-center">Are you sure you want to logout?</h3>
              <hr />
              <div className="row">
                <div className="col-xxl-6 col-xl-6 col-md-6">
                  <button
                    type="button"
                    className="btn btn-light w-100"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                </div>
                <div className="col-xxl-6 col-xl-6 col-md-6">
                  <button
                    type="button"
                    className="btn btn-primary w-100"
                    onClick={handleLogout}
                    data-bs-dismiss="modal"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Defaultlayout;
