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
        {/* <Link to="/" className="navbar-link">
          Home
        </Link> */}
        {!userLoggedIN && !accessToken && !refreshToken && (
          <Link to={routes.login3} className="btn btn-light">
            Login
          </Link>
        )}

        <Link to={routes.register3} className="btn btn-primary">
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
