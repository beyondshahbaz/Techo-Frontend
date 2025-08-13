import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { baseURL } from "../../utils/axios";
import { AuthContext } from "../../contexts/authContext";

interface CandidateData {
  id: string;
  name: string;
  email: string;
  mobile_no: string;
  role: string;
  subrole?: string;
  gender?: string;
  batch?: string;
  eng_comm_skills?: number;
  humble_background?: string;
  laptop?: string;
  profession?: string;
  selected_status?: string;
  level?: number;
  source?: string;
  remarks?: string;
}

interface BatchData {
  id: number;
  batch_id: string;
  batch_name: string;
  trainer: string[];
  center: string;
  status: string;
}

const InterviewCandidate: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { candidateData } = location.state || {};
  const { error1, batches, loadingBatches } = useContext(AuthContext);
  const [accessToken, setAccessToken] = useState<string>("");
  

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAccessToken(token);
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CandidateData>({
    defaultValues: {
      id: candidateData?.id || "",
      name: candidateData?.name || "",
      email: candidateData?.email || "",
      mobile_no: candidateData?.mobile_no || "",
      role: candidateData?.role || "",
      subrole: candidateData?.subrole || "",
      gender: candidateData?.gender || "",
      batch: candidateData?.batch || "",
      eng_comm_skills: candidateData?.eng_comm_skills || 1,
      humble_background: candidateData?.humble_background || "",
      laptop: candidateData?.laptop || "",
      profession: candidateData?.profession || "",
      selected_status: candidateData?.selected_status || "",
      level: candidateData?.level || 1,
      source: candidateData?.source || "",
      remarks: candidateData?.remarks || "",
    },
  });

  const onSubmit: SubmitHandler<CandidateData> = async (data) => {
    console.log(data);
    if (!accessToken) {
      alert("No authentication token available");
      return;
    }
    try {
      const response = await axios.put(
        `${baseURL}/Learner/${data.id}/update_selected/`,
        data ,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log("Data updated successfully:", response.data);
      alert("Candidate data updated successfully!");
      navigate("/Admission_table");
      window.location.reload();
    } catch (error) {
      console.error("Error updating data:", error);
      alert("Failed to update candidate data.");
    }
  };

  if (!candidateData) {
    return <div className="container mt-4">No candidate data found.</div>;
  }

  return (
    <div className="card m-4">
      <div className="card-header">
        {/* <h1 className="card-title text-center mb-2 text-primary fs-3">
          CANDIDATE INFORMATION FOR INTERVIEW
        </h1> */}
         <div className="header-containerH d-flex justify-center w-100 ">
          <h2 className="sponsornowHeading pt-2 text-4xl  mb-4 uppercase text-center max-w-[95vw] sm:max-w-[800px] mx-auto">
        CANDIDATE  INFORMATION  FOR  INTERVIEW
      </h2>
        </div>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
          {/* Name */}
          <div className="col-xxl-6 col-xl-6 col-md-6">
            <label className="form-label fw-bold">Name</label>
            <input
              type="text"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              {...register("name", { required: "Name is required." })}
              readOnly
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name.message}</div>
            )}
          </div>

          {/* Email */}
          <div className="col-xxl-6 col-xl-6 col-md-6">
            <label className="form-label fw-bold">Email</label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              {...register("email", { required: "Email is required." })}
              readOnly
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
          </div>

          {/* Mobile No */}
          <div className="col-xxl-6 col-xl-6 col-md-6">
            <label className="form-label fw-bold">
              Mobile No{" "}
              <span className="text-danger" style={{ fontSize: "1.2em" }}>
                *
              </span>
            </label>
            <input
              type="text"
              className={`form-control ${errors.mobile_no ? "is-invalid" : ""}`}
              {...register("mobile_no", { required: "Mobile No is required." })}
            />
            {errors.mobile_no && (
              <div className="invalid-feedback">{errors.mobile_no.message}</div>
            )}
          </div>

          {/* Role */}
          <div className="col-xxl-6 col-xl-6 col-md-6">
            <label className="form-label fw-bold">Role</label>
            <input
              type="text"
              className={`form-control ${errors.role ? "is-invalid" : ""}`}
              {...register("role", { required: "Role is required." })}
              readOnly
            />
            {errors.role && (
              <div className="invalid-feedback">{errors.role.message}</div>
            )}
          </div>

          {/* Subrole */}
          <div className="col-xxl-6 col-xl-6 col-md-6">
            <label className="form-label fw-bold">Subrole</label>
            <input
              type="text"
              className="form-control"
              {...register("subrole")}
              readOnly
            />
          </div>

          {/* Gender */}
          <div className="col-xxl-6 col-xl-6 col-md-6">
            <label className="form-label fw-bold">
              Gender{" "}
              <span className="text-danger" style={{ fontSize: "1.2em" }}>
                *
              </span>
            </label>
            <select className="form-select" {...register("gender")}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Batch - Updated with dynamic data */}
          <div className="col-xxl-6 col-xl-6 col-md-6">
            <label className="form-label fw-bold">Batch </label>
            {loadingBatches ? (
              <select className="form-select" disabled>
                <option>Loading batches...</option>
              </select>
            ) : error1 ? (
              <select className="form-select" disabled>
                <option className="text-danger">{error1}</option>
              </select>
            ) : (
              <select className="form-select" {...register("batch")}>
                <option value="">Select batch</option>
                {batches.map((batch: BatchData) => (
                  <option key={batch.id} value={batch.batch_id}>
                    {batch.batch_name} - {batch.trainer.join(", ")} -{" "}
                    {batch.center}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* English Communication Skills */}
          <div className="col-xxl-6 col-xl-6 col-md-6">
            <label className="form-label fw-bold">
              {" "}
              English Communication Skills{" "}
              <span className="text-danger" style={{ fontSize: "1.2em" }}>
                *
              </span>
            </label>
            <select className="form-select" {...register("eng_comm_skills")}>
              <option value="">Select</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>

          {/* Humble Background */}
          <div className="col-xxl-6 col-xl-6 col-md-6">
            <label className="form-label fw-bold">
              Humble Background{" "}
              <span className="text-danger" style={{ fontSize: "1.2em" }}>
                *
              </span>
            </label>
            <select className="form-select" {...register("humble_background")}>
              <option value="">Select</option>
              <option value="Y">Yes</option>
              <option value="N">No</option>
            </select>
          </div>

          {/* Laptop */}
          <div className="col-xxl-6 col-xl-6 col-md-6">
            <label className="form-label fw-bold">
              Laptop{" "}
              <span className="text-danger" style={{ fontSize: "1.2em" }}>
                *
              </span>
            </label>
            <select className="form-select" {...register("laptop")}>
              <option value="">Select</option>
              <option value="Y">Yes</option>
              <option value="N">No</option>
            </select>
          </div>

          {/* Profession */}
          <div className="col-xxl-6 col-xl-6 col-md-6">
            <label className="form-label fw-bold">
              Profession{" "}
              <span className="text-danger" style={{ fontSize: "1.2em" }}>
                *
              </span>
            </label>
            <input
              type="text"
              className="form-control"
              {...register("profession")}
            />
          </div>

          {/* Selected Status */}
          <div className="col-xxl-6 col-xl-6 col-md-6">
            <label className="form-label fw-bold">
              Selected Status{" "}
              <span className="text-danger" style={{ fontSize: "1.2em" }}>
                *
              </span>
            </label>
            <select className="form-select" {...register("selected_status")}>
              <option value="">Select</option>
              <option value="Y">Yes</option>
              <option value="N">No</option>
              <option value="TBD">To Be Determined</option>
            </select>
          </div>

          {/* Level */}
          <div className="col-xxl-6 col-xl-6 col-md-6">
            <label className="form-label fw-bold">
              Level{" "}
              <span className="text-danger" style={{ fontSize: "1.2em" }}>
                *
              </span>
            </label>
            <select className="form-select" {...register("level")}>
              <option value="">Select</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>

          {/* Source */}
          <div className="col-xxl-6 col-xl-6 col-md-6">
            <label className="form-label fw-bold">
              Source{" "}
              <span className="text-danger" style={{ fontSize: "1.2em" }}>
                *
              </span>
            </label>
            <input
              type="text"
              className="form-control"
              {...register("source")}
            />
          </div>

          {/* Remarks */}
          <div className="col-12">
            <label className="form-label fw-bold">
              Remarks{" "}
              <span className="text-danger" style={{ fontSize: "1.2em" }}>
                *
              </span>
            </label>
            <textarea className="form-control" {...register("remarks")} />
          </div>

          {/* Submit Button */}
          <div className="col-12 d-flex justify-content-center">
            <button type="submit" className="custom-button-interview">
              Update Candidate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InterviewCandidate;
