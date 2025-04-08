import React, { useContext, useState, useEffect } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import Header from "./Header";

import {
  faSchool,
  faChalkboardUser,
  faTicket,
  faCubes,
} from "@fortawesome/free-solid-svg-icons";


import { Sidebar } from "primereact/sidebar";
import Dropdown from "./Dropdown";
import { all_routes } from "../feature-module/router/all_routes";
import { AuthContext } from "../contexts/authContext";
import { useNetworkCheck } from "../contexts/NetworkContext";
import { Offline } from "./Offline/Offline";

const Defaultlayout = () => {
  const routes = all_routes;
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { user, userLoggedIN, LogoutUser } = useContext(AuthContext);
  const { isOnline } = useNetworkCheck();
  const [visible, setVisible] = useState(false);
  const [role, setRole] = useState("");
  const [subrole, setSubrole] = useState("");

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    const userSubrole = localStorage.getItem("subrole");

    
    if (userRole) {
      setRole(userRole);
    }
    if (userSubrole) {
      setSubrole(userSubrole);
    }
  }, []);

    if (userRole) {
      setRole(userRole);
    }
    if (userSubrole) {
      setSubrole(userSubrole);
    }
  }, []);
  
  const StudentsItems = [
    { path: "/Students_profile", label: "PROFILE" },
    { path: "/Students_batches", label: "BATCH" },
  ];
  const SponsorItems = [
    { path: "/Sponsor_Profile", label: "PROFILE" },
    { path: "/Students_SponserDashboard", label: "DASHBOARD" },
  ];
  const RecruitmentItems = [
    { path: "/Recruitment_Profile", label: "PROFILE" },
    { path: "/ReadyToRecruitDashboard", label: "DASHBOARD" },
  ];

  const TrainerItems = [
    { path: "/Trainer_profile", label: "PROFILE" },
    { path: "/Trainer_batch", label: "BATCH" },
  ];
  const Admission = [{ path: "/Admission_table", label: "INTERVIEW" }];

  const Admission = [{ path: "/Admission_table", label: "INTERVIEW" }];

  const Assessment = [
    { path: "/AssessmentTable", label: "ASSESSMENT CANDIDATE" },
  ];
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    setVisible(false);
    LogoutUser();
    navigate("/login-3");
  };

  return (
    <>

    {
      isOnline ?     <>
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
        {/* Show STUDENT Dashboard only for STUDENT */}
        {subrole === "STUDENT" && (
          <>
            <Dropdown
              key="student-dashboard"
              title="Student Dashboard"
              items={StudentsItems}
              icon={faSchool}
            />
          </>
        )}

        {/* Show Trainer Dashboard, Admission, and Assessment only for TRAINER */}
        {subrole === "TRAINER" && (
          <>
            <Dropdown
              key="trainer-dashboard"
              title="Trainer Dashboard"
              items={TrainerItems}
              icon={faChalkboardUser}
            />
            <Dropdown
              key="admission-process"
              title="Admission Process"
              items={Admission}
              icon={faTicket}
            />
            <Dropdown
              key="assessment-process"
              title="Assessment Process"
              items={Assessment}
              icon={faCubes}
            />
          </>
        )}

        {/* Show ADMIN Dashboard, Assessment only ADMIN */}
        {role === "ADMIN" && (
          <>
            <Dropdown
              key="assessment-process"
              title="Assessment Process"
              items={Assessment}
              icon={faCubes}
            />
          </>
        )}

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
                <div className="sidebarHeaderContainer">
                  <span className="sidebarRole">WELCOME,</span>
                  <span className="sidebarName"></span>
                  <span className="sidebarName text-muted">
                    {userLoggedIN &&
                      user &&
                      `${user.first_name} ${user.last_name}`}
                  </span>
                </div>
              </div>
            }
          >
            {/* Show STUDENT Dashboard only for STUDENT */}
            {subrole === "STUDENT" && (
              <>
                <Dropdown
                  key="student-dashboard"
                  title="Student Dashboard"
                  items={StudentsItems}
                  icon={faSchool}
                />
              </>
            )}

            {/* Show Trainer Dashboard, Admission, and Assessment only for TRAINER */}
            {subrole === "TRAINER" && (
              <>
                <Dropdown
                  key="trainer-dashboard"
                  title="Trainer Dashboard"
                  items={TrainerItems}
                  icon={faChalkboardUser}
                />
                <Dropdown
                  key="admission-process"
                  title="Admission Process"
                  items={Admission}
                  icon={faTicket}
                />
                <Dropdown
                  key="assessment-process"
                  title="Assessment Process"
                  items={Assessment}
                  icon={faCubes}
                />
              </>
            )}

            {subrole === "RECRUITER" && (
              <>
                <Dropdown
                  key="trainer-dashboard"
                  title="Recruitment"
                  items={RecruitmentItems}
                  icon={faChalkboardUser}
                />
              </>
            )}

            {/* Show ADMIN Dashboard, Assessment only ADMIN */}
            {subrole === "SPONSOR" && (
              <>
                <Dropdown
                  key="assessment-process"
                  title="SPONSOR"
                  items={SponsorItems}
                  icon={faCubes}
                />
              </>
            )}
            
            {role === "ADMIN" && (
              <>
                <Dropdown
                  key="assessment-process"
                  title="Assessment Process"
                  items={Assessment}
                  icon={faCubes}
                />
              </>
            )}

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
                  <h3 className="text-center">
                    Are you sure you want to logout?
                  </h3>
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
      ) : (
        <Offline />
      )}
    </>
  );
};

export default Defaultlayout;
