import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import img1 from "../../assets/images/trainers/user.png";
import { SponsorContext } from "../../contexts/dashboard/sponsorDashboardContext";
import { AuthContext } from "../../contexts/authContext";

const RecruitmentProfile = () => {
  const { API_BASE_URL } = useContext(AuthContext);
  const accessToken = localStorage.getItem("accessToken");
  const { recruiterProfileDetails } = useContext(SponsorContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [gender, setGender] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [userProfileError, setUserProfileError] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [existingProfileImage, setExistingProfileImage] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      setUserProfileError("Only JPG, JPEG, or PNG files are allowed");
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setUserProfileError("Image size should be less than 2MB");
      return;
    }

    setProfileImage(file);
    setUserProfileError("");
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setProfileImage(null);
    setImagePreview("");
    URL.revokeObjectURL(imagePreview);
  };

  useEffect(() => {
    if (recruiterProfileDetails?.length) {
      const profile = recruiterProfileDetails[0];
      setFirstName(profile.first_name || "-");
      setLastName(profile.last_name || "-");
      setEmail(profile.email || "-");
      setPhoneNumber(profile.mobile_no || "-");
      setCompanyName(profile.company_name || "-");
      setGender(profile.gender || "-");
      setExistingProfileImage(profile.user_profile || "");
    }
  }, [recruiterProfileDetails]);

  const toggleDisabled = () => setDisabled(!disabled);

  const handleRecruiterUpdate = async () => {
    try {
      const currentProfile = recruiterProfileDetails[0];
      const formData = new FormData();

      // Required fields
      formData.append("id", currentProfile.id);
      formData.append("first_name", firstName);
      formData.append("last_name", lastName);
      formData.append("email", email);
      formData.append("mobile_no", phoneNumber);
      formData.append("company_name", companyName);
      formData.append("gender", gender);

      // Optional fields with fallbacks
      formData.append("id_type", currentProfile.id_type);
      formData.append("identity", currentProfile.identity || "");
      formData.append("qualification", currentProfile.qualification || "");
      formData.append("address", currentProfile.address || "");
      formData.append("date_of_birth", currentProfile.date_of_birth);

      // Append image if exists
      if (profileImage) {
        formData.append("user_profile", profileImage);
      }

      const response = await axios.put(
        `${API_BASE_URL}/recruiter/Recruiter_update/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        window.alert("Successfully updated the profile");
        setIsEditing(false);
        setDisabled(true);
        setProfileImage(null);

        // Assume updated profile is returned in response.data
        const updatedProfile = response.data;

        setImagePreview("");
        setExistingProfileImage(updatedProfile.user_profile || "");

      }
    } catch (error) {
      console.error("Error updating recruiter:", error);
      if (error.response) {
        window.alert(`Update failed: ${JSON.stringify(error.response.data)}`);
      } else {
        window.alert("Failed to update profile. Please check your connection.");
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-3">
        <div className="row">
          <div className="col-xxl-12 col-xl-12 col-md-12 d-flex mb-3">
            <div className="d-flex flex-column me-4">
              <img
                src={
                  imagePreview
                    ? imagePreview
                    : existingProfileImage
                    ? `${API_BASE_URL}${existingProfileImage}`
                    : img1
                }
                className="profileImg mb-2"
                alt="Profile"
              />

              <button
                className="btn btn-light w-100"
                onClick={() => {
                  setIsEditing(!isEditing);
                  toggleDisabled();
                }}
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
            <label className="form-label" htmlFor="user_profile">
              User Profile Image <span className="text-danger">*</span>
            </label>
            <input
              disabled={!isEditing}
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
                  style={{
                    maxWidth: "100px",
                    maxHeight: "100px",
                    display: "block",
                  }}
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
            <label className="form-label" htmlFor="Gender">
              Select Gender <span className="text-danger">*</span>
            </label>
            <div className="dropdown">
              <button
                className="btnDropdown dropdown-toggle form-control"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                disabled={!isEditing}
              >
                {gender || "Select Gender"}
              </button>
              <ul className="dropdown-menu w-100">
                <li
                  className="dropdown-item c-pointer"
                  onClick={() => setGender("Male")}
                >
                  Male
                </li>
                <li
                  className="dropdown-item c-pointer"
                  onClick={() => setGender("Female")}
                >
                  Female
                </li>
                <li
                  className="dropdown-item c-pointer"
                  onClick={() => setGender("Other")}
                >
                  Other
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xxl-12 col-xl-12 col-md-12 text-end">
            <button
              className="btn btn-primary text-nowrap me-2"
              disabled={disabled}
              onClick={handleRecruiterUpdate}
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
