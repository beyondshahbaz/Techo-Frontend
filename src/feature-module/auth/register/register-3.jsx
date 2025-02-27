import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { all_routes } from "../../router/all_routes";
import axios from "axios";
import { AuthContext } from "../../../contexts/authContext";
import ClipLoader from "react-spinners/ClipLoader";
import BeatLoader from "react-spinners/BeatLoader";

const Register3 = () => {
  const routes = all_routes;
  const navigate = useNavigate();

  // CONTEXT API

  const { RegisterUser, newSubrole, fetchNewSubrole, loading } =
    useContext(AuthContext);

  // STATE MANAGEMENT STARTS
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newSelectedRole, setNewSelectedRole] = useState("ENABLER");
  const [selectedSubrole, setSelectedSubrole] = useState("Choose Your Subrole");
  const [mobileNumber, setMobileNumber] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [idTypes, setIdType] = useState([]);
  const [identity, setIdentity] = useState("");
  const [proposerEmail, setProposerEmail] = useState("");
  const [proposerNumber, setProposerNumber] = useState("");
  const [selectedIdType, setSelectedIdType] = useState("Select an ID");

  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
  });

  // STATE MANAGEMENT ENDS

  const togglePasswordVisibility = () => {
    setPasswordVisibility((prevState) => ({
      ...prevState,
      password: !prevState.password,
    }));
  };

  const handleSelectRole = (role) => {
    setNewSelectedRole(role);
  };

  const fetchIdType = async () => {
    try {
      const response = await axios.get(
        "https://gl8tx74f-8000.inc1.devtunnels.ms/auth/idtypes/"
      );
      if (response.status === 200) {
        setIdType(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNewSubrole();
    fetchIdType();
  }, []);

  const onRegisterUser = async (e) => {
    e.preventDefault();

    let userData = {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
    };

    const subroleMapping = {
      APPLICANT: 1,
      INTERVIEWEE: 2,
      STUDENT: 3,
      SPONSOR: 4,
      TRAINER: 5,
      RECRUITER: 6,
      "GUEST LECTURER": 7,
    };

    // Convert file to Base64 if a file is selected
    const convertToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result); // Base64 string
        reader.onerror = (error) => reject(error);
      });
    };

    try {
      let base64Image = null;

      if (profileImage) {
        base64Image = await convertToBase64(profileImage); // Convert file
      }

      if (newSelectedRole === "LEARNER") {
        userData = {
          ...userData,
          role: 2,
          mobileNumber,
          profileImage: base64Image, // Send as Base64
          idType: selectedIdType,
          identity,
          proposerEmail,
          proposerNumber,
        };
      } else if (newSelectedRole === "ENABLER") {
        userData = {
          ...userData,
          role: 3,
          subrole: subroleMapping[selectedSubrole] || null,
        };
      }

      await RegisterUser(userData);

      console.log(userData);
    } catch (error) {
      console.error("Registration Error:", error);
    }
  };

  return (
    <div className="card mt-5 mx-2">
      <div className="card-header">
        <h2>Register</h2>
        <p>Please enter your details to register</p>
      </div>
      <div className="card-body">
        <form onSubmit={onRegisterUser}>
          <div className="row">
            <div className="col-xxl-6 col-xl-6 col-md-6">
              <label for="firstName" className="form-label">
                First Name
              </label>
              <input
                id="firstName"
                placeholder="Enter Your First Name"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="col-xxl-6 col-xl-6 col-md-6">
              <label for="lastName" className="form-label">
                Last Name
              </label>
              <input
                id="lastName"
                placeholder="Enter Your Last Name"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="col-xxl-6 col-xl-6 col-md-6">
              <label for="emailAddress" className="form-label">
                Email Address
              </label>
              <input
                placeholder="Enter Your Email"
                id="emailAddress"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="col-xxl-6 col-xl-6 col-md-6 posRel">
              <label for="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                placeholder="Enter Your Password"
                type={passwordVisibility.password ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className={`ti toggle-passwordsSignup ${
                  passwordVisibility.password ? "ti-eye" : "ti-eye-off"
                }`}
                onClick={togglePasswordVisibility}
              ></span>
            </div>

            <div className="col-xxl-6 col-xl-6 col-md-6">
              <label className="form-label" htmlFor="Roles">
                Select Role
              </label>
              <div className="dropdown">
                <button
                  className="btnDropdown dropdown-toggle form-control"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {newSelectedRole}
                </button>
                <ul className="dropdown-menu w-100">
                  <li
                    className="dropdown-item c-pointer"
                    onClick={() => handleSelectRole("LEARNER")}
                  >
                    LEARNER
                  </li>
                  <li
                    className="dropdown-item c-pointer"
                    onClick={() => handleSelectRole("ENABLER")}
                  >
                    ENABLER
                  </li>
                </ul>
              </div>
            </div>
            <div
              className={`col-xxl-6 col-xl-6 col-md-6 ${
                newSelectedRole === "LEARNER" ? "d-none" : "d-block"
              }`}
            >
              <label className="form-label" htmlFor="Roles">
                Select Subrole
              </label>
              <div className="dropdown">
                <button
                  className="btnDropdown dropdown-toggle form-control"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {selectedSubrole}
                </button>
                <ul className="dropdown-menu w-100">
                  {newSubrole.length > 0 ? (
                    newSubrole.slice(3, 7).map((subrole) => (
                      <li
                        className="dropdown-item c-pointer"
                        key={subrole.id}
                        onClick={() => setSelectedSubrole(subrole.name)}
                      >
                        {subrole.name}
                      </li>
                    ))
                  ) : (
                    <li className="dropdown-item dropdownLoader">
                      Loading{" "}
                      <BeatLoader                
                        size={5}
                        speedMultiplier={0.5}
                        loading={loading}
                        className="loginLoader"
                      />
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>

          <div
            className={`row ${
              newSelectedRole === "ENABLER" ? "d-none" : "d-flex mt-4"
            }`}
          >
            <div className="col-xxl-4 col-xl-4 col-md-4">
              <label className="form-label" for="mobileNumber">
                Mobile Number
              </label>
              <input
                placeholder="Enter Your Number"
                id="mobileNumber"
                type="text"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
            </div>

            <div className="col-xxl-4 col-xl-4 col-md-4">
              <label className="form-label" for="user_profile">
                User Profile Image
              </label>
              <input
                id="user_profile"
                type="file"
                name="user_profile"
                className="form-control"
                // value={profileImage}
                accept="image/*"
                onChange={(e) => setProfileImage(e.target.files?.[0] || null)}
              />
            </div>

            <div className="col-xxl-4 col-xl-4 col-md-4">
              <label className="form-label">ID Type</label>
              <div className="dropdown">
                <button
                  className="btnDropdown dropdown-toggle form-control"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {selectedIdType}
                </button>
                <ul className="dropdown-menu w-100">
                  {idTypes.length > 0 ? (
                    idTypes.map((idtype) => (
                      <li
                        key={idtype.idTypeName}
                        onClick={() => setSelectedIdType(idtype.idTypeName)}
                        className="dropdown-item c-pointer"
                      >
                        {idtype.idTypeName}
                      </li>
                    ))
                  ) : (
                    <li className="dropdown-item dropdownLoader">
                    Loading{" "}
                    <BeatLoader                
                      size={5}
                      speedMultiplier={0.5}
                      loading={loading}
                      className="loginLoader"
                    />
                  </li>
                  )}
                </ul>
              </div>
            </div>

            <div className="col-xxl-4 col-xl-4 col-md-4">
              <label className="form-label" for="identityNumber">
                Identity
              </label>
              <input
                placeholder="Enter Your ID Number"
                id="identityNumber"
                type="text"
                onChange={(e) => setIdentity(e.target.value)}
                value={identity}
              />
            </div>

            <div className="col-xxl-4 col-xl-4 col-md-4">
              <label className="form-label" for="proposerEmail">
                Proposer Email
              </label>
              <input
                id="proposerEmail"
                placeholder="Enter Your Proposer Email"
                type="email"
                value={proposerEmail}
                onChange={(e) => setProposerEmail(e.target.value)}
              />
            </div>

            <div className="col-xxl-4 col-xl-4 col-md-4">
              <label className="form-label" for="proposerNumber">
                Proposer Mobile No
              </label>
              <input
                id="proposerNumber"
                placeholder="Enter Your Proposer Number"
                type="text"
                value={proposerNumber}
                onChange={(e) => setProposerNumber(e.target.value)}
              />
            </div>
          </div>

          <hr />
          <div className="row justify-content-center">
            <div className="col-xxl-5 col-xl-5 col-md-5">
              <div className="mb-3">
                <button
                  type="submit"
                  className="btn btn-primary w-100 loginBtn"
                >
                  Sign Up{" "}
                  <ClipLoader
                    color="#fff"
                    size={18}
                    speedMultiplier={0.5}
                    loading={loading}
                    className="loginLoader"
                  />
                </button>
              </div>
              <div className="text-center">
                <h6 className="fw-normal text-dark mb-0">
                  Already have an account?
                  <Link to={routes.login3} className="hover-a ms-2">
                    Login
                  </Link>
                </h6>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register3;
