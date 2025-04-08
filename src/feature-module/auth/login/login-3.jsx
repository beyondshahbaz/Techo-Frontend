import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { all_routes } from "../../router/all_routes";
import { AuthContext } from "../../../contexts/authContext";
import login from "../../../assets/images/login/login.png";
import ClipLoader from "react-spinners/ClipLoader";

const Login3 = () => {
  const routes = all_routes;

  const { LoginUser, loading, loginError, responseSubrole, userLoggedIN, setLoginError , role } = useContext(AuthContext);

  const navigation = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
  });

  useEffect(() => {
    if (userLoggedIN && responseSubrole === "SPONSOR") {
      navigation("/Students_SponserDashboard");
    }
    if (userLoggedIN && responseSubrole === "STUDENT") {
      navigation("/Students_profile");
      window.location.reload();
    }
    if (userLoggedIN && responseSubrole === "TRAINER") {
      navigation("/Trainer_batch");
      window.location.reload();
    }
    if (userLoggedIN && role === "ADMIN") {
      navigation("/AssessmentTable");
      window.location.reload();
    }
    if (userLoggedIN && responseSubrole === "RECRUITER") {
      navigation("/ReadyToRecruitDashboard");
    }

    
  }, [userLoggedIN, responseSubrole,role , navigation]);

  console.log(role)
  console.log(responseSubrole)
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };



  const validatePassword = (password) => {
    return password >= 8;
  };

  const togglePasswordVisibility = () => {
    setPasswordVisibility((prevState) => ({
      ...prevState,
      password: !prevState.password,
    }));
  };

  const loginUser = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    setLoginError("");
    
    // Validate inputs
    let isValid = true;
    
    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Enter a Valid Email Address");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Password is Required");
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      isValid = false;
    }

    if (!isValid) return;

    try {
      const userData = { email, password };
      await LoginUser(userData);
    } catch (error) {
      // The error is already handled in AuthContext and stored in loginError
      console.error("Login error:", error);
    }
  };



  return (
    <div className="row bgLoginScreen m-0">
      <div className="col-xxl-8 col-xl-8 col-md-8">
        <img src={login} alt="..." className="loginImg" />
      </div>

      <div className="col-xxl-4 col-xl-4 col-md-4 d-flex align-items-center">
        <form>
          <div className="card">
            <div className="card-body">
              <h1 className="mt-5">Welcome</h1>
              <p className="txt-gray mb-5">
                Please enter your details to sign in
              </p>
              <div className="row mt-3">
                <div className="col-xxl-12 col-xl-12 col-md-12 mb-3">
                  <label htmlFor="emailAddress" className="form-label">
                    Email Address <span className="text-danger">*</span>
                  </label>
                  <input
                    placeholder="Enter Your Email"
                    id="emailAddress"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailError("");
                      setLoginError("");
                    }}
                    className="mb-0"
                  />
                  {emailError && (
                    <span className="text-danger">{emailError}</span>
                  )}
                </div>

                <div className="col-xxl-12 col-xl-12 col-md-12 mb-3 posRel">
                  <label htmlFor="password" className="form-label">
                    Password <span className="text-danger">*</span>
                  </label>
                  <input
                    className="mb-0"
                    id="password"
                    required
                    placeholder="Enter Your Password"
                    type={passwordVisibility.password ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setPasswordError("");
                      setLoginError("");
                    }}
                  />
                  <span
                    className={`ti toggle-passwordsSignup ${
                      passwordVisibility.password ? "ti-eye" : "ti-eye-off"
                    }`}
                    onClick={togglePasswordVisibility}
                  ></span>
                  {passwordError && (
                    <span className="text-danger">{passwordError}</span>
                  )}
                </div>

                <div className="col-xxl-12 col-xl-12 col-md-12 mb-3">
                  <div className="text-end ">
                    <Link to={routes.forgotPassword} className="link-danger">
                      Forgot Password?
                    </Link>
                  </div>
                </div>

                <div className="col-xxl-12 col-xl-12 col-md-12 mb-3">
                  <div className="mb-3">
                    <Link
                      type="submit"
                      className="btn btn-primary loginBtn"
                      onClick={loginUser}
                    >
                      <span>Sign In</span>
                      {loading && (
                        <ClipLoader
                          color="#fff"
                          size={18}
                          speedMultiplier={0.5}
                          className="loginLoader"
                        />
                      )}

                    </Link>
                    {loginError && (
                      <span className="text-danger d-block mt-2">{loginError}</span>
                    )}
                  </div>
                </div>

                <div className="col-xxl-12 col-xl-12 col-md-12 mb-3">
                  <div className="text-center">
                    <h6 className="fw-normal text-dark mb-0">
                      Don't have an account?{" "}
                      <Link to={routes.register3} className="hover-a">
                        Create Account
                      </Link>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login3;
