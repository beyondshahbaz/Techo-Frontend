import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import img1 from "../../assets/images/trainers/user.png";
import { SponsorContext } from "../../contexts/dashboard/sponsorDashboardContext";

const RecruitmentProfile = () => {
  const { recruiterProfileDetails } = useContext(SponsorContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  // const [contributionType, setContributionType] = useState("");
  // const [contributionValue, setContributionValue] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
    const [disabled, setDisabled] = useState(true);
  

  useEffect(() => {
    if (recruiterProfileDetails && recruiterProfileDetails.length > 0) {
      const profile = recruiterProfileDetails[0];
      setFirstName(profile.first_name || "-");
      setLastName(profile.last_name || "-");
      setEmail(profile.email || "-");
      setPhoneNumber(profile.mobile_no || "-");
      setCompanyName(profile.company_name || "-");
      setDateOfBirth(profile.date_of_birth || "-");
      setGender(profile.gender || "-");
    }
  }, [recruiterProfileDetails]);

  const toggleDisabled = ()=>{
    setDisabled(!disabled);
  }

  return (
    <div className="container mt-5">
      <div className="card p-3">
        <div className="row">
          <div className="col-xxl-12 col-xl-12 col-md-12 d-flex mb-3">
            <div className="d-flex flex-column me-4">
              <img src={img1} className="profileImg mb-2" alt="Profile" />
              <button
                className="btn btn-light w-100"
                onClick={() => {setIsEditing(!isEditing); toggleDisabled()}}
              >
                {isEditing ? "Save" : "Edit"}
              </button>
            </div>
            {recruiterProfileDetails.map((items, idx) => (
              <div className="profileView" key={idx}>
                <span className="profileName d-block">
                  {items.first_name} {items.last_name}
                </span>
                <span className="profileEmail d-block">{items.email}</span>
              </div>
            ))}
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
              disabled = {disabled}
            >
              Submit Change
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentProfile;
