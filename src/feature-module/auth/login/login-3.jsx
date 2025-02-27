import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { all_routes } from "../../router/all_routes";
import ImageWithBasePath from "../../../core/common/imageWithBasePath";
import axios from "axios";
import { baseURL } from "../../../utils/axios";
import { Card } from "primereact/card";
import { AuthContext } from "../../../contexts/authContext";
import login from "../../../assets/images/login/login.png";
import ClipLoader from "react-spinners/ClipLoader";
import PropagateLoader from "react-spinners/PropagateLoader";
import BeatLoader from "react-spinners/BeatLoader";

const Login3 = () => {
  const routes = all_routes;
  const navigation = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { LoginUser, loading } = useContext(AuthContext);

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

  const loginUser = async (e) => {
    e.preventDefault();
    console.log("login");
    try {
      let userData = {
        email,
        password,
      };
      await LoginUser(userData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="row bgLoginScreen m-0">
      <div className="col-xxl-7 col-xl-6 col-md-12 d-none">
        <div className="card ">
          <div className="card-header">
            <h1>What We Teach</h1>
          </div>
          <div className="card-body scrollbar-wrapper">
            <div className="card mb-1">
              <Card className="bgHomeCard">
                <h6>Web Developemt</h6>
                <p className="m-0">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Inventore sed consequuntur error repudiandae numquam deserunt
                  quisquam repellat libero asperiores earum nam nobis, culpa
                  ratione quam perferendis esse, cupiditate neque quas!
                </p>
              </Card>
            </div>
            <div className="card mb-1">
              <Card className="bgHomeCard">
                <h6>AI/ML</h6>
                <p className="m-0">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Inventore sed consequuntur error repudiandae numquam deserunt
                  quisquam repellat libero asperiores earum nam nobis, culpa
                  ratione quam perferendis esse, cupiditate neque quas!
                </p>
              </Card>
            </div>
            <div className="card mb-1">
              <Card className="bgHomeCard">
                <h6>AI/ML</h6>
                <p className="m-0">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Inventore sed consequuntur error repudiandae numquam deserunt
                  quisquam repellat libero asperiores earum nam nobis, culpa
                  ratione quam perferendis esse, cupiditate neque quas!
                </p>
              </Card>
            </div>
            <div className="card mb-1">
              <Card className="bgHomeCard">
                <h6>AI/ML</h6>
                <p className="m-0">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Inventore sed consequuntur error repudiandae numquam deserunt
                  quisquam repellat libero asperiores earum nam nobis, culpa
                  ratione quam perferendis esse, cupiditate neque quas!
                </p>
              </Card>
            </div>
            <div className="card mb-1">
              <Card className="bgHomeCard">
                <h6>AI/ML</h6>
                <p className="m-0">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Inventore sed consequuntur error repudiandae numquam deserunt
                  quisquam repellat libero asperiores earum nam nobis, culpa
                  ratione quam perferendis esse, cupiditate neque quas!
                </p>
              </Card>
            </div>
            <div className="card mb-1">
              <Card className="bgHomeCard">
                <h6>AI/ML</h6>
                <p className="m-0">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Inventore sed consequuntur error repudiandae numquam deserunt
                  quisquam repellat libero asperiores earum nam nobis, culpa
                  ratione quam perferendis esse, cupiditate neque quas!
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
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
                    Email Address
                  </label>
                  <input
                    placeholder="Enter Your Email"
                    id="emailAddress"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="col-xxl-12 col-xl-12 col-md-12 mb-3 posRel">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    id="password"
                    required
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
                      to={""}
                      className="btn btn-primary loginBtn"
                      onClick={loginUser}
                    >
                      <span>Sign In</span>
                      <ClipLoader color="#fff" size={18} speedMultiplier={0.5} loading={loading} className="loginLoader"/>
                      
                    </Link>
                  </div>
                </div>

                <div className="col-xxl-12 col-xl-12 col-md-12 mb-3">
                  <div className="text-center">
                    <h6 className="fw-normal text-dark mb-0">
                      Don’t have an account?{" "}
                      <Link to={routes.register3} className="hover-a">
                        {" "}
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
