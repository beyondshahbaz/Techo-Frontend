// import React, { useContext, useState } from "react";
// import { Link } from "react-router-dom";
// import { all_routes } from "../feature-module/router/all_routes";
// import { Button } from "primereact/button";
// import { AuthContext } from "../contexts/authContext";

// interface HeaderProps {
//   toggleSidebar: () => void;
//   setVisible: React.Dispatch<React.SetStateAction<boolean>>;
// }

// const Header: React.FC<HeaderProps> = ({ toggleSidebar, setVisible }) => {
//   const routes = all_routes;
//   const storedRole = localStorage.getItem("role");
//   const { userLoggedIN, accessToken, refreshToken, userID } =
//     useContext(AuthContext);
//   const [isNavbarOpen, setIsNavbarOpen] = useState(false);
//   return (
//     <nav className="navbar">
//       <div className="navbar-logo">
//         <Link to="/">
//           <h1 className="logoHeading">LGSTechnoHub</h1>
//         </Link>
//       </div>

//       <Button
//         icon="pi pi-bars"
//         className="navbar-toggle"
//         onClick={() => setIsNavbarOpen(!isNavbarOpen)}
//       />

//       <div className={`navbar-links ${isNavbarOpen ? "active" : ""}`}>
//         {!userLoggedIN && !accessToken && !refreshToken && (
//           <Link to={routes.login3} className="btn btn-light">
//             Login
//           </Link>
//         )}

//         {storedRole !== "ADMIN" && <Link to={routes.register} className="btn btn-primary">
//           Register
//         </Link>}
//         {userLoggedIN && accessToken && refreshToken && userID && (
//           <Button
//             icon="pi pi-th-large"
//             size="large"
//             onClick={() => setVisible(true)}
//             className="navbar-settings"
//           />
//         )}  
//       </div>
//     </nav>
//   );
// };

// export default Header;

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
  const storedRole = localStorage.getItem("role");
  const { userLoggedIN, accessToken, refreshToken, userID } =
    useContext(AuthContext);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <h1 className="logoHeading">LGSTechnoHub</h1>
        </Link>
      </div>
      {userLoggedIN && accessToken && refreshToken && userID && (
      <Button
        icon="pi pi-bars"
        className="navbar-toggle"
        // onClick={() => setIsNavbarOpen(!isNavbarOpen)}
        onClick={() => setVisible(true)}

      />)}
       {!userLoggedIN && !accessToken && !refreshToken && !userID && (
      <Button
        icon="pi pi-bars"
        className="navbar-toggle"
        onClick={() => setIsNavbarOpen(!isNavbarOpen)}
        // onClick={() => setVisible(true)}

      />)}

      <div className={`navbar-links ${isNavbarOpen ? "active" : ""}`}>
        {!userLoggedIN && !accessToken && !refreshToken && (
          <Link to={routes.login3} 
          className="btn btn-light"
          onClick={()=>setIsNavbarOpen(!isNavbarOpen)}>
            Login
          </Link>
        )}

        {storedRole !== "ADMIN" && <Link to={routes.register} 
        className="btn btn-primary" 
        onClick={()=>setIsNavbarOpen(!isNavbarOpen)}>
          Register
        </Link>}
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

