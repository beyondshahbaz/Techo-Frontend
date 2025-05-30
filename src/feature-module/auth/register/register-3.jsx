import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { all_routes } from "../../router/all_routes";
import axios from "axios";
import { AuthContext } from "../../../contexts/authContext";
import ClipLoader from "react-spinners/ClipLoader";
import BeatLoader from "react-spinners/BeatLoader";
import { Tooltip } from "primereact/tooltip";
import { Badge } from "primereact/badge";

const Register3 = () => {
  const { API_BASE_URL } = useContext(AuthContext);
  const routes = all_routes;
  const navigate = useNavigate();

  // CONTEXT API
  const {
    RegisterUser,
    newSubrole,
    fetchNewSubrole,
    loading,
    emailAlreadyCreated,
  } = useContext(AuthContext);

  // STATE MANAGEMENT
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newSelectedRole, setNewSelectedRole] = useState("ENABLER");
  const [selectedSubrole, setSelectedSubrole] = useState("Choose Your Subrole");
  const [mobileNumber, setMobileNumber] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [idTypes, setIdType] = useState([]);
  const [identity, setIdentity] = useState("");
  // const [proposerEmail, setProposerEmail] = useState("");
  // const [proposerNumber, setProposerNumber] = useState("");
  const [selectedIdType, setSelectedIdType] = useState("Select an ID");
  const [imagePreview, setImagePreview] = useState("");

  // Error states
  const [errorFirstName, setErrorFirstName] = useState("");
  const [errorLastName, setErrorLastName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorSelectedRole, setErrorSelectedRole] = useState("");
  const [errorSelectedSubRole, setErrorSelectedSubsRole] = useState("");
  const [mobilenumberError, setMobileNumberError] = useState("");
  const [userProfileError, setUserProfileError] = useState("");
  const [idTypeError, setSelectedIdTypeError] = useState("");
  const [idNumberError, setIdNumberError] = useState("");
  // const [proposerEmailError, setProposerEmailError] = useState("");
  // const [proposerMobileError, setproposerMobileError] = useState("");
  const [emailExistsError, setEmailExistsError] = useState("");

  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
  });

  const ID_TYPE_MAPPING = {
    'PASSPORT': 2,
    'VOTER_ID': 3,
    'ADHAARCARD': 1
  };

  // Validation functions
  const validatePassword = (password) => {
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateMobileNumber = (number) => {
    const mobileRegex = /^[0-9]{10}$/;
    return mobileRegex.test(number);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisibility((prevState) => ({
      ...prevState,
      password: !prevState.password,
    }));
  };

  const handleSelectRole = (role) => {
    setNewSelectedRole(role);
    setErrorSelectedRole("");
  };

  // Fetch ID types from API
  const fetchIdType = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/idtypes/`);
      if (response.status === 200) {
        setIdType(response.data);
      }
    } catch (error) {
      console.error("Error fetching ID types:", error);
    }
  };

  // Enhanced image upload handler
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      setUserProfileError("Only JPG, JPEG, or PNG files are allowed");
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setUserProfileError("Image size should be less than 2MB");
      return;
    }

    // If validations pass, set the file to state and create preview
    setProfileImage(file);
    setUserProfileError("");
    setImagePreview(URL.createObjectURL(file));

  };

  const removeImage = () => {
    setProfileImage(null);
    setImagePreview("");
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
  };



  useEffect(() => {
    fetchNewSubrole();
    fetchIdType();
    
    // Clean up object URLs when component unmounts
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, []);

const onRegisterUser = async (e) => {
  e.preventDefault();
  console.log("Register button clicked"); // Add this

  // Reset all errors
  setErrorFirstName("");
  setErrorLastName("");
  setErrorEmail("");
  setErrorPassword("");
  setErrorSelectedRole("");
  setErrorSelectedSubsRole("");
  setMobileNumberError("");
  setUserProfileError("");
  setSelectedIdTypeError("");
  setIdNumberError("");
  setEmailExistsError("");

  let isValid = true;

  // Validation checks
  if (!firstName.trim()) {
    setErrorFirstName("First Name is Required");
    isValid = false;
  }

  if (!lastName.trim()) {
    setErrorLastName("Last Name is Required");
    isValid = false;
  }

  if (!email.trim()) {
    setErrorEmail("Email is Required");
    isValid = false;
  } else if (!validateEmail(email)) {
    setErrorEmail("Invalid Email Format");
    isValid = false;
  }

  if (!password) {
    setErrorPassword("Password is Required");
    isValid = false;
  } else if (!validatePassword(password)) {
    setErrorPassword(
      "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    );
    isValid = false;
  }

  if (!newSelectedRole) {
    setErrorSelectedRole("Select a Role");
    isValid = false;
  }

  if (newSelectedRole === "ENABLER") {
    if (!selectedSubrole || selectedSubrole === "Choose Your Subrole") {
      setErrorSelectedSubsRole("Select a subrole");
      isValid = false;
    }
  } else if (newSelectedRole === "LEARNER") {
    if (!mobileNumber) {
      setMobileNumberError("Mobile Number is Required");
      isValid = false;
    } else if (!validateMobileNumber(mobileNumber)) {
      setMobileNumberError("Invalid Mobile Number");
      isValid = false;
    }
    if (!profileImage) {
      setUserProfileError("Profile Image is Required");
      isValid = false;
    }
    // ID TYPE VALIDATION
    if (!selectedIdType || selectedIdType === "Select an ID") {
      setSelectedIdTypeError("ID Type is Required");
      isValid = false;
    }

    // ID NUMBER VALIDATION (EXISTENCE)
    if (!identity.trim()) {
      setIdNumberError("ID Number is Required");
      isValid = false;
    }
  }

  
if (selectedIdType && identity.trim()) {
      let regex;
      let errorMessage = "";
      
      switch (selectedIdType.toUpperCase()) {
        case "ADHAARCARD":
          regex = /^\d{12}$/;
          errorMessage = "Aadhaar must be exactly 12 digits";
          break;
        case "PASSPORT":
          regex = /^[A-Za-z][0-9]{7}$/;
          errorMessage = "Invalid Passport format (e.g., A1234567)";
          break;
        case "VOTER_ID":
          regex = /^[A-Za-z]{3}[0-9]{7}$/;
          errorMessage = "Voter ID must be 3 letters followed by 7 digits";
          break;
        default:
          break;
      }

      if (regex && !regex.test(identity)) {
        setIdNumberError(errorMessage);
        isValid = false;
      }
    }

  // if (!isValid) return;
    if (!isValid) return;

  //   if (!isValid) {
  //   console.log("Validation failed - not calling API");
  //   return;
  // }

  try {
    const formData = new FormData();

    formData.append("first_name", firstName.trim());
    formData.append("last_name", lastName.trim());
    formData.append("email", email.trim());
    formData.append("password", password);
    formData.append("mobile_no", mobileNumber);

    if (newSelectedRole === "LEARNER") {
      formData.append("role", "2");
      formData.append("id_type", ID_TYPE_MAPPING[selectedIdType.toUpperCase()]);
      formData.append("identity", identity.trim());
      formData.append("subrole", 1);
      if (profileImage) {
        formData.append("user_profile", profileImage);
      }
    } else if (newSelectedRole === "ENABLER") {
      formData.append("role", "3");
      const subroleMapping = {
        APPLICANT: 1,
        INTERVIEWEE: 2,
        STUDENT: 3,
        SPONSOR: 4,
        TRAINER: 5,
        RECRUITER: 6,
        "GUEST LECTURER": 7,
      };
      formData.append("subrole", subroleMapping[selectedSubrole] || "");
    }

    const response = await RegisterUser(formData);
    console.log('response', response);

    if (response && response.success) {
      alert("User successfully created!");
    }

    // Handle email exists case based on success = false
    if (response && !response.success && response.error?.email) {
      setEmailExistsError(response.error.email.join(", "));
    }

  } catch (error) {

    // Handle email already exists error
    if (
      error.response?.data?.email &&
      error.response.data.email.some((msg) =>
        msg.toLowerCase().includes("already exists")
      )
    ) {
      setEmailExistsError(
        "This email is already registered. Please use a different email."
      );
    }

    // Handle file upload specific errors
    if (error.response?.data?.user_profile) {
      setUserProfileError(error.response.data.user_profile.join(", "));
    } else if (error.message?.includes("user_profile")) {
      setUserProfileError(error.message);
    }

    // Handle other API errors
    if (error.response?.data) {
      const errors = error.response.data;

      if (errors.email) {
        setErrorEmail(errors.email.join(", "));
      }

      if (errors.mobileNumber) {
        setMobileNumberError(errors.mobileNumber.join(", "));
      }
    }
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
            <div className="col-xxl-6 col-xl-6 col-md-6 mb-3">
              <label htmlFor="firstName" className="form-label">
                First Name <span className="text-danger">*</span>
              </label>
              <input
                id="firstName"
                placeholder="Enter Your First Name"
                type="text"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  setErrorFirstName("");
                }}
                className="mb-0"
              />
              {errorFirstName && (
                <span className="text-danger">{errorFirstName}</span>
              )}
            </div>

            <div className="col-xxl-6 col-xl-6 col-md-6 mb-3">
              <label htmlFor="lastName" className="form-label">
                Last Name <span className="text-danger">*</span>
              </label>
              <input
                className="mb-0"
                id="lastName"
                placeholder="Enter Your Last Name"
                type="text"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                  setErrorLastName("");
                }}
              />
              {errorLastName && (
                <span className="text-danger">{errorLastName}</span>
              )}
            </div>

            <div className="col-xxl-6 col-xl-6 col-md-6 mb-3">
              <label htmlFor="emailAddress" className="form-label">
                Email Address <span className="text-danger">*</span>
              </label>
              <input
                placeholder="Enter Your Email"
                id="emailAddress"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrorEmail("");
                  setEmailExistsError("");
                }}
                className="mb-0"
              />
              {errorEmail && <span className="text-danger">{errorEmail}</span>}
              {emailExistsError && (
                <span className="text-danger">{emailExistsError}</span>
              )}
            </div>

            <div className="col-xxl-6 col-xl-6 col-md-6 posRel mb-3">
              <label htmlFor="password" className="form-label">
                Password <span className="text-danger">*</span>
              </label>
              <Tooltip target=".custom-target-icon" />

              <i
                className="custom-target-icon pi pi-info-circle p-text-secondary ms-5"
                data-pr-tooltip="Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character"
                data-pr-position="right"
                data-pr-at="right+5 top"
                data-pr-my="left center-2"
                style={{ fontSize: "1rem", cursor: "pointer" }}
              ></i>
              <input
                id="password"
                placeholder="Enter Your Password"
                type={passwordVisibility.password ? "text" : "password"}
                value={password}
                className="mb-0"
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorPassword("");
                }}
              />
              <span
                className={`ti toggle-passwordsSignup ${
                  passwordVisibility.password ? "ti-eye" : "ti-eye-off"
                }`}
                onClick={togglePasswordVisibility}
              ></span>
              {errorPassword && (
                <span className="text-danger">{errorPassword}</span>
              )}
            </div>

            <div className="col-xxl-6 col-xl-6 col-md-6  mb-3">

              <label className="form-label" htmlFor="mobileNumber">
                Mobile Number <span className="text-danger">*</span>
              </label>
              <input
                className="mb-0"
                placeholder="Enter Your Number"
                id="mobileNumber"
                type="text"
                value={mobileNumber}
                onChange={(e) => {
                  setMobileNumber(e.target.value);
                  setMobileNumberError("");
                }}
              />
              {mobilenumberError && (
                <span className="text-danger">{mobilenumberError}</span>
              )}
            </div>

            <div className="col-xxl-6 col-xl-6 col-md-6 mb-3">
              <label className="form-label" htmlFor="Roles">
                Select Role <span className="text-danger">*</span>
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
              {errorSelectedRole && (
                <span className="text-danger">{errorSelectedRole}</span>
              )}
            </div>
            <div
              className={`col-xxl-6 col-xl-6 col-md-6 mb-3 ${
                newSelectedRole === "LEARNER" ? "d-none" : "d-block"
              }`}
            >
              <label className="form-label" htmlFor="Roles">
                Select Subrole <span className="text-danger">*</span>
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
                    newSubrole
                      .filter(
                        (subrole) =>
                          subrole.name === "SPONSOR" ||
                          subrole.name === "TRAINER" ||
                          subrole.name === "RECRUITER" ||
                          subrole.name === "GUEST LECTURER"
                      )
                      .map((subrole) => (
                        <li
                          className="dropdown-item c-pointer"
                          key={subrole.id}
                          onClick={() => {
                            setSelectedSubrole(subrole.name);
                            setErrorSelectedSubsRole("");
                          }}
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
              {errorSelectedSubRole && (
                <span className="text-danger">{errorSelectedSubRole}</span>
              )}
            </div>
          </div>

          <div
            className={`row ${
              newSelectedRole === "ENABLER" ? "d-none" : "d-flex mt-4"
            }`}
          >
            <div className="col-xxl-4 col-xl-4 col-md-4 mb-3">
              <label className="form-label" htmlFor="user_profile">
                User Profile Image <span className="text-danger">*</span>
              </label>
              <input
                id="user_profile"
                type="file"
                name="user_profile"
                className="form-control mb-0"
                accept="image/jpeg, image/png, image/jpg"
                onChange={handleImageUpload}
              />
              {userProfileError && (
                <span className="text-danger">{userProfileError}</span>
              )}
              {imagePreview && (
                <div className="mt-2">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    style={{maxWidth: '100px', maxHeight: '100px', display: 'block'}}
                    className="mb-2"
                  />
                  <button 
                    type="button" 
                    className="btn btn-sm btn-danger"
                    onClick={removeImage}
                  >
                    Remove Image
                  </button>
                </div>
              )}
            </div>

            <div className="col-xxl-4 col-xl-4 col-md-4">
              <label className="form-label">
                ID Type <span className="text-danger">*</span>
              </label>
              <div className="dropdown">
                <button
                  className="btnDropdown dropdown-toggle form-control"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {selectedIdType || "Adhaarcard"}
                </button>
                <ul className="dropdown-menu w-100">
                  {idTypes.length > 0 ? (
                    idTypes.map((idtype) => (
                      <li
                        key={idtype.idTypeName}
                        onClick={() => {
                          setSelectedIdType(idtype.idTypeName);
                          setSelectedIdTypeError("");
                        }}
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
              {idTypeError && (
                <span className="text-danger">{idTypeError}</span>
              )}
            </div>

            <div className="col-xxl-4 col-xl-4 col-md-4  mb-3">
              <label
                className="form-label text-nowrap"
                htmlFor="identityNumber"
              >
                Identity Number <span className="text-danger">*</span>
              </label>
              <input
                className="mb-0"
                placeholder="Enter Your ID Number"
                id="identityNumber"
                type="text"
                onChange={(e) => {
                  setIdentity(e.target.value);
                  setIdNumberError("");
                }}
                value={identity}
              />
              {idNumberError && (
                <span className="text-danger">{idNumberError}</span>
              )}
            </div>
          </div>

          <hr />
          <div className="row justify-content-center">
            <div className="col-xxl-5 col-xl-5 col-md-5">
              <div className="mb-3">
                <button
                  type="submit"
                  className="btn btn-primary w-100 loginBtn"
                  disabled={loading}
                >
                  Create Account
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
