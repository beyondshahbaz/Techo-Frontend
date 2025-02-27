import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { all_routes } from "../feature-module/router/all_routes";
import { Button } from "primereact/button";
import { AuthContext } from "../contexts/authContext";

interface HeaderProps {
  toggleSidebar: () => void;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, setVisible }) => {
  const routes = all_routes;
  const { userLoggedIN, accessToken, refreshToken, userID } =
    useContext(AuthContext);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  return (
    // <header className="row classHeader">
    //   <div className="col-xxl-4 col-xl-6 col-md-6">
    //     <div className="row align-items-center resRow">
    //       <div className="col-xxl-auto col-xl-auto col-md col-sm">
    //         <Link to={""}>
    //           {/* <h1 className="logoHeading">
    //             LGS <span className="txt-primary">TechnoHub</span>
    //           </h1> */}
    //           <h1 className="logoHeading">technoHub</h1>
    //         </Link>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="col-xxl-8 col-xl-6 col-md-6">
    //     <div className="row">
    //       <div className="col-xxl-12 col-xl-12 col-md-12">
    //         <div>
    //           <Link to={""} className="headerLinks">
    //             Home
    //           </Link>
    //           <Link to={routes.register3} className="headerLinks">
    //             Contact
    //           </Link>
    //                 <Button
    //     icon="pi pi-cog"
    //     onClick={() => setVisible(true)}
    //     style={{
    //       backgroundColor: "#fff",
    //       color: "#05a6f0",
    //       borderRadius: "8px",
    //     }}
    //   />
    //           {/* <Link to={routes.register3} className="headerLinks">
    //             About
    //           </Link> */}
    //         </div>
    //       </div>
    //     </div>

    //   </div>
    //   {/* {userLoggedIN && (
    //         <div className="col-xxl-auto col-xl-auto col-md-2 col-sm-6">
    //           <Button
    //             icon="pi pi-bars"
    //             onClick={() => setVisible(true)}
    //             style={{
    //               backgroundColor: "#fff",
    //               color: "#05a6f0",
    //               borderRadius: "8px",
    //             }}
    //           />
    //         </div>
    //       )} */}

    // </header>
    //   <nav className="navbar">
    //   {/* Logo on the left */}
    //   <div className="navbar-logo">
    //     <Link to="/">
    //       <h1 className="logoHeading">
    //         LGS <span className="txt-primary">TechnoHub</span>
    //       </h1>
    //     </Link>
    //   </div>

    //   {/* Hamburger menu for mobile */}
    //   <Button
    //     icon="pi pi-bars"
    //     className="navbar-toggle"
    //     onClick={() => setVisible(!visible)}
    //   />

    //   {/* Navbar links */}
    //   <div className={`navbar-links ${visible ? "active" : ""}`}>
    //     <Link to="/" className="navbar-link">
    //       Home
    //     </Link>
    //     <Link to="/register" className="navbar-link">
    //       Register
    //     </Link>
    //     <Link to="/login" className="navbar-link">
    //       Login
    //     </Link>
    //     <Button
    //       icon="pi pi-cog"
    //       onClick={() => setVisible(true)}
    //       className="navbar-settings"
    //     />
    //   </div>
    // </nav>
    //   <nav className="navbar">
    //   <div className="row w-100">
    //     <div className="navbar-logo col-xxl-6">
    //       <Link to="/">
    //         <h1 className="logoHeading">
    //           LGS <span className="txt-primary">TechnoHub</span>
    //         </h1>
    //       </Link>
    //     </div>

    //     <div
    //       className={`navbar-links ${isNavbarOpen ? "active" : ""} col-xxl-6`}
    //     >
    //       <div>
    //         <Link to="/" className="navbar-link">
    //           Home
    //         </Link>
    //       </div>

    //       <div className="navbar-links">
    //         <Link to={routes.login3} className="navbar-link">
    //           Login
    //         </Link>
    //         <Link to={routes.register3} className="navbar-link">
    //           Register
    //         </Link>
    //         <Button
    //           icon="pi pi-cog"
    //           onClick={() => setVisible(true)}
    //           className="navbar-settings"
    //         />
    //       </div>
    //     </div>
    //   </div>

    //   <Button
    //     icon="pi pi-bars"
    //     className="navbar-toggle"
    //     onClick={() => setIsNavbarOpen(!isNavbarOpen)}
    //   />
    // </nav>
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <h1 className="logoHeading">technohub</h1>
        </Link>
      </div>

      <Button
        icon="pi pi-bars"
        className="navbar-toggle"
        onClick={() => setIsNavbarOpen(!isNavbarOpen)}
      />

      <div className={`navbar-links ${isNavbarOpen ? "active" : ""}`}>
        <Link to="/" className="navbar-link">
          Home
        </Link>
        {!userLoggedIN && !accessToken && !refreshToken && (
          <Link to={routes.login3} className="navbar-link">
            Login
          </Link>
        )}

        <Link to={routes.register3} className="navbar-link">
          Register
        </Link>
        {userLoggedIN && accessToken && refreshToken && userID && (
          <Button
            icon="pi pi-th-large"
            size="large"
            onClick={() => setVisible(true)}
            className="navbar-settings"
          />
        )}
        
      </div>
    </nav>
  );
};

export default Header;
