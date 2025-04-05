import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import img1 from "../../assets/images/trainers/user.png";
import { SponsorContext } from "../../contexts/dashboard/sponsorDashboardContext";

const Sponsor_Profile = () => {
  const { FetchSponsor } = useContext(SponsorContext);
  const [firstName, setFirstName] = useState("Arsalan");
  const [lastName, setLastName] = useState("Ahmed");
  const [email, setEmail] = useState("arsalan@gmail.com");
  const [phoneNumber, setPhoneNumber] = useState(9885354655);
  const [companyName, setCompanyName] = useState("company123");
  const [dateOfBirth, setDateOfBirth] = useState("18-08-1999");
  const [gender, setGender] = useState("Male");
  const [identity, setIdentity] = useState("213165545");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    FetchSponsor();
  }, []);

  return (
    <div className="container mt-5">
      <div className="card p-3">
        <div className="row">
          <div className="col-xxl-12 col-xl-12 col-md-12 d-flex align-items-center mb-3">
            <div className="d-flex flex-column me-4">
              <img src={img1} className="profileImg mb-2" alt="Profile" />
              <button
                className="btn btn-light w-100"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? "Save" : "Edit"}
              </button>
            </div>
            <div className="profileView">
              <span className="profileName d-block">Arsalan Ahmed</span>
              <span className="profileEmail d-block">arsalan@gmail.com</span>
            </div>
          </div>
          <hr />
        </div>
        <div className="row">
          <div className="col-xxl-6 col-xl-6 col-md-6 mb-3">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              type="text"
              disabled={!isEditing}
              id="firstName"
              className="form-control"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
            />
          </div>
          <div className="col-xxl-6 col-xl-6 col-md-6 mb-3">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              disabled={!isEditing}
              id="lastName"
              className="form-control"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
            />
          </div>
          <div className="col-xxl-6 col-xl-6 col-md-6 mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              disabled={!isEditing}
              id="email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="col-xxl-6 col-xl-6 col-md-6 mb-3">
            <label htmlFor="phoneNumber" className="form-label">
              Phone Number
            </label>
            <input
              type="text"
              disabled={!isEditing}
              id="phoneNumber"
              className="form-control"
              onChange={(e) => setPhoneNumber(e.target.value)}
              value={phoneNumber}
            />
          </div>
          <div className="col-xxl-6 col-xl-6 col-md-6 mb-3">
            <label htmlFor="companyName" className="form-label">
              Company Name
            </label>
            <input
              type="text"
              disabled={!isEditing}
              id="companyName"
              className="form-control"
              onChange={(e) => setCompanyName(e.target.value)}
              value={companyName}
            />
          </div>
          <div className="col-xxl-6 col-xl-6 col-md-6 mb-3">
            <label htmlFor="dateOfBirth" className="form-label">
              Date of birth
            </label>
            <input
              type="text"
              disabled={!isEditing}
              id="dateOfBirth"
              className="form-control"
              onChange={(e) => setDateOfBirth(e.target.value)}
              value={dateOfBirth}
            />
          </div>
          <div className="col-xxl-6 col-xl-6 col-md-6 mb-3">
            <label htmlFor="gender" className="form-label">
              Gender
            </label>
            <input
              type="text"
              disabled={!isEditing}
              id="gender"
              className="form-control"
              onChange={(e) => setGender(e.target.value)}
              value={gender}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-xxl-12 col-xl-12 col-md-12 text-end">
            <button
              className="btn btn-primary text-nowrap me-2"
            >
              Submit Details
            </button>
            <button
              className="btn btn-light text-nowrap"
              data-bs-toggle="modal"
              data-bs-target="#sponsorContribution"
            >
              View Contribution
            </button>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="sponsorContribution"
        tabIndex="-1"
        aria-labelledby="sponsorContribution"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-xxl-12 col-xl-12 col-md-12 contributionTxt">
                  Contribution Type: <span className="fw-bold">tst</span>
                </div>
                <div className="col-xxl-12 col-xl-12 col-md-12 contributionTxt">
                  Contribution Value: <span className="fw-bold">200</span>
                </div>
                <div className="col-xxl-12 col-xl-12 col-md-12 contributionTxt">
                  Contribution Details: <span className="fw-bold">This is dummy</span>
                </div>
                <div className="col-xxl-12 col-xl-12 col-md-12 contributionTxt">
                  Contribution Date: <span className="fw-bold">2025-01-31</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sponsor_Profile;
