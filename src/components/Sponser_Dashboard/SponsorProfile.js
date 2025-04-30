import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import img1 from "../../assets/images/trainers/user.png";
import { SponsorContext } from "../../contexts/dashboard/sponsorDashboardContext";
import { AuthContext } from "../../contexts/authContext";

const Sponsor_Profile = () => {
  const { sponsorProfileDetails } = useContext(SponsorContext);
  const { API_BASE_URL } = useContext(AuthContext);
  const accessToken = localStorage.getItem("accessToken");
    

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [gender, setGender] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (sponsorProfileDetails && sponsorProfileDetails.length > 0) {
      const profile = sponsorProfileDetails[0];
      setFirstName(profile.first_name || "");
      setLastName(profile.last_name || "");
      setEmail(profile.email || "");
      setPhoneNumber(profile.mobile_no || "");
      setCompanyName(profile.company_name || "");
      setGender(profile.gender || "");
    }
  }, [sponsorProfileDetails]);

  const toggleDisabled = () => {
    setDisabled(!disabled);
  };
  const handleSponsorUpdate = async () => { 
    try {
      const currentProfile = sponsorProfileDetails[0];
      
      const payload = {
        ...currentProfile,
        first_name: firstName,
        last_name: lastName,
        email: email,
        mobile_no: Number(phoneNumber),
        company_name: companyName,
        gender: gender,
        contribution_details: currentProfile.contribution_details || ""
      }; 
      const cleanPayload = Object.fromEntries(
        Object.entries(payload).filter(([_, value]) => value !== null)
      ); 
      const response = await axios.put(
        `${API_BASE_URL}/sponsors/Sponser_update/`,
        cleanPayload,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
          },
        }
      );
      
      if (response.status === 200) {
        window.alert("Successfully updated the profile");
        setIsEditing(false);
        setDisabled(true);
      }
    } catch (error) {
      console.error("Error updating sponsor:", error);
      if (error.response) {
        console.error("Server response:", error.response.data);
        window.alert(`Update failed: ${JSON.stringify(error.response.data)}`);
      } else {
        window.alert("Failed to update profile. Please check your connection.");
      }
    }
  };

  const handleEditClick = () => {
    if (isEditing) {
      handleSponsorUpdate();
    } else {
      setIsEditing(true);
      toggleDisabled();
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-3">
        <div className="row">
          <div className="col-xxl-12 col-xl-12 col-md-12 d-flex mb-3">
            <div className="d-flex flex-column me-4">
              <img src={img1} className="profileImg mb-2" alt="Profile" />
              <button
                className="btn btn-light w-100"
                onClick={handleEditClick}
              >
                {isEditing ? "Save" : "Edit"}
              </button>
            </div>
            {sponsorProfileDetails && sponsorProfileDetails.map((items, idx) => (
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
              disabled={disabled}
              onClick={handleSponsorUpdate}
            >
              Submit Change
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
              {sponsorProfileDetails && sponsorProfileDetails.map((item, idx) => (
                <div className="row" key={idx}>
                  <div className="col-xxl-12 col-xl-12 col-md-12 contributionTxt">
                    Contribution Type:{" "}
                    <span className="fw-bold">{item.contribution_type}</span>
                  </div>
                  <div className="col-xxl-12 col-xl-12 col-md-12 contributionTxt">
                    Contribution Value:{" "}
                    <span className="fw-bold">{item.contribution_value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sponsor_Profile;