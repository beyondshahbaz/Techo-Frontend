import React from "react";
import { Link } from "react-router-dom";
import { all_routes } from "../feature-module/router/all_routes";
import { Button } from "primereact/button";

interface HeaderProps {
  toggleSidebar: () => void;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, setVisible }) => {
  const routes = all_routes;
  return (
    <header className="row classHeader">
      <div className="col-xxl-4 col-xl-6 col-md-6">
        <div className="row align-items-center resRow">
          <div className="col-xxl-auto col-xl-auto col-md-2 col-sm-6">
            <Button
              icon="pi pi-bars"
              onClick={() => setVisible(true)}
              style={{
                backgroundColor: "#fff",
                color: "#05a6f0",
                borderRadius: "8px"
              }}
            />
          </div>
          <div className="col-xxl-auto col-xl-auto col-md col-sm">
            <Link to={routes.login3}>
              <h1>
                LGS <span className="txt-primary">TechnoHub</span>
              </h1>
            </Link>
          </div>
        </div>
      </div>
      <div className="col-xxl-8 col-xl-6 col-md-6">
        <div className="row">
          <div className="col-xxl-12 col-xl-12 col-md-12 d-flex align-items-center justify-content-between">
            <div>
              <Link to={routes.login3} className="headerLinks">
                Home
              </Link>
              <Link to={routes.register3} className="headerLinks">
                Contact
              </Link>
              <Link to={routes.register3} className="headerLinks">
                About
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
