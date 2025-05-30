import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { AuthContext } from "../../contexts/authContext";
import { baseURL } from "../../utils/axios";
interface AssessmentDetail {
  id: string;
  batch_id: number;
  trainer_score: number;
  trainer_feedback: string;
  assessment_test_status: string | null;
  admin_name?: string; 
  admin_score?: number; 
  admin_feedback?: string; 
  admin_selected?: string; 
  student_name: string;
  batch_name: string;
  assessed_by: string;
  trainer_is_selected: boolean;
  student_id?: string; 
  trainer_id?: string; 
  center : string;
  selected_by_trainer : string;
}

interface ApiResponse {
  data: AssessmentDetail;
}

const AssessmentCandidateWithForm: React.FC = () => {
  const [assessmentDetail, setAssessmentDetail] =
    useState<AssessmentDetail | null>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { role } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AssessmentDetail>();

  useEffect(() => {
    const fetchAssessmentDetail = async () => {
      try {
        const response = await axios.get<ApiResponse>(
          `${baseURL}/assessment/${id}/`
        );
        const data = response.data.data;

        // Map assessment_test_status to match select options
        const mappedStatus = {
          Selected: "Selected",
          Not: "Not",
          null: "", // for cases where it's null or undefined
        };

        // Ensure the form gets expected values
        const transformedData = {
          ...data,
          assessment_test_status:
            mappedStatus[
              data.assessment_test_status as keyof typeof mappedStatus
            ] || "",
          admin_selected: data.admin_selected ? "yes" : "no",
        };

        setAssessmentDetail(data);
        reset(transformedData);
      } catch (error) {
        console.error("Error fetching assessment detail:", error);
      }
    };

    fetchAssessmentDetail();
  }, [id, reset]);

  const onSubmit: SubmitHandler<AssessmentDetail> = async (data) => {
    console.log(data);

    // Construct the base payload without admin fields
    const payload: any = {
      // any uses for add extra fetures in payload
      id: data.id,
      student_id: data.student_id,
      batch_id: data.batch_id,
      trainer_score: data.trainer_score,
      trainer_feedback: data.trainer_feedback,
      assessment_test_status: data.assessment_test_status,
      student_name: data.student_name,
      batch_name: data.batch_name,
      trainer_id: data.trainer_id,
      assessed_by: data.assessed_by,
      trainer_is_selected: data.trainer_is_selected,
      selected_by_trainer: data.selected_by_trainer,
      center: data.center,
    };

    // If the role is ADMIN, add the admin-specific fields to the payload
    if (role === "ADMIN") {
      payload.admin_name = data.admin_name;
      payload.admin_score = data.admin_score;
      payload.admin_feedback = data.admin_feedback;
      payload.admin_selected = data.admin_selected;
    }

    try {
      const response = await axios.put(`${baseURL}/assessment/update/${id}/`, payload);
      console.log("Data updated successfully:", response.data);
      alert("Assessment Completed successfully!");
      navigate("/AssessmentTable");
      window.location.reload();
    } catch (error) {
      console.error("Error updating data:", error);
      alert("Failed to update assessment data.");
    }
  };

  if (!assessmentDetail) {
    return <div className="container mt-4">Loading...</div>;
  }

  return (
    <div className="card m-4">
      <div className="card-header">
        <h1 className="card-title text-center mb-2 text-primary fs-3">
          ASSESSMENT DETAILS
        </h1>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
          {/* Batch ID */}
          <div className="col-xxl-6 col-xl-6 col-md-6">
            <label className="form-label fw-bold">Batch ID</label>
            <input
              type="number"
              className={`form-control ${errors.batch_id ? "is-invalid" : ""}`}
              {...register("batch_id", { required: "Batch ID is required." })}
              readOnly
            />
            {errors.batch_id && (
              <div className="invalid-feedback">{errors.batch_id.message}</div>
            )}
          </div>

          {/* Trainer Score */}
          <div className="col-xxl-6 col-xl-6 col-md-6">
            <label className="form-label fw-bold">Trainer Score <span className="text-danger" style={{ fontSize: "1.2em" }}>*</span></label>
            <input
              type="number"
              className={`form-control ${
                errors.trainer_score ? "is-invalid" : ""
              }`}
              {...register("trainer_score", {
                required: "Trainer Score is required.",
              })}
            />
            {errors.trainer_score && (
              <div className="invalid-feedback">
                {errors.trainer_score.message}
              </div>
            )}
          </div>

          {/* Trainer Feedback */}
          <div className="col-xxl-6 col-xl-6 col-md-6">
            <label className="form-label fw-bold">Trainer Feedback <span className="text-danger" style={{ fontSize: "1.2em" }}>*</span></label>
            <input
              type="text"
              className={`form-control ${
                errors.trainer_feedback ? "is-invalid" : ""
              }`}
              {...register("trainer_feedback", {
                required: "Trainer Feedback is required.",
              })}
            />
            {errors.trainer_feedback && (
              <div className="invalid-feedback">
                {errors.trainer_feedback.message}
              </div>
            )}
          </div>

          {/* Assessment Test Status */}
          <div className="col-xxl-6 col-xl-6 col-md-6">
            <label className="form-label fw-bold">Assessment Test Status <span className="text-danger" style={{ fontSize: "1.2em" }}>*</span></label>
            <select
              className="form-select"
              {...register("assessment_test_status")}
            >
              <option value="Selected">Yes</option>
              <option value="Not">No</option>
            </select>
          </div>

          {/* Conditionally render Admin fields if role is ADMIN */}
          {role === "ADMIN" && (
            <>
              {/* Admin Name */}
              <div className="col-xxl-6 col-xl-6 col-md-6">
                <label className="form-label fw-bold">Admin Name</label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.admin_name ? "is-invalid" : ""
                  }`}
                  {...register("admin_name", {
                    required: "Admin Name is required.",
                  })}
                />
                {errors.admin_name && (
                  <div className="invalid-feedback">
                    {errors.admin_name.message}
                  </div>
                )}
              </div>

              {/* Admin Score */}
              <div className="col-xxl-6 col-xl-6 col-md-6">
                <label className="form-label fw-bold">Admin Score <span className="text-danger" style={{ fontSize: "1.2em" }}>*</span></label>
                <input
                  type="number"
                  className={`form-control ${
                    errors.admin_score ? "is-invalid" : ""
                  }`}
                  {...register("admin_score", {
                    required: "Admin Score is required.",
                  })}
                />
                {errors.admin_score && (
                  <div className="invalid-feedback">
                    {errors.admin_score.message}
                  </div>
                )}
              </div>

              {/* Admin Feedback */}
              <div className="col-xxl-6 col-xl-6 col-md-6">
                <label className="form-label fw-bold">Admin Feedback <span className="text-danger" style={{ fontSize: "1.2em" }}>*</span></label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.admin_feedback ? "is-invalid" : ""
                  }`}
                  {...register("admin_feedback", {
                    required: "Admin Feedback is required.",
                  })}
                />
                {errors.admin_feedback && (
                  <div className="invalid-feedback">
                    {errors.admin_feedback.message}
                  </div>
                )}
              </div>

              {/* Admin Selected */}
              <div className="col-xxl-6 col-xl-6 col-md-6">
                <label className="form-label fw-bold">Admin Selected <span className="text-danger" style={{ fontSize: "1.2em" }}>*</span></label>
                <select className="form-select" {...register("admin_selected")}>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
            </>
          )}

          {/* Student Name */}
          <div className="col-xxl-6 col-xl-6 col-md-6">
            <label className="form-label fw-bold">Student Name</label>
            <input
              type="text"
              className={`form-control ${
                errors.student_name ? "is-invalid" : ""
              }`}
              {...register("student_name", {
                required: "Student Name is required.",
              })}
              readOnly
            />
            {errors.student_name && (
              <div className="invalid-feedback">
                {errors.student_name.message}
              </div>
            )}
          </div>

          {/* Batch Name */}
          <div className="col-xxl-6 col-xl-6 col-md-6">
            <label className="form-label fw-bold">Batch Name</label>
            <input
              type="text"
              className={`form-control ${
                errors.batch_name ? "is-invalid" : ""
              }`}
              {...register("batch_name", {
                required: "Batch Name is required.",
              })}
              readOnly
            />
            {errors.batch_name && (
              <div className="invalid-feedback">
                {errors.batch_name.message}
              </div>
            )}
          </div>

          {/* Trainer Name */}
          <div className="col-xxl-6 col-xl-6 col-md-6">
            <label className="form-label fw-bold">Trainer Name</label>
            <input
              type="text"
              className={`form-control ${
                errors.assessed_by ? "is-invalid" : ""
              }`}
              {...register("assessed_by", {
                required: "Trainer Name is required.",
              })}
              readOnly
            />
            {errors.assessed_by && (
              <div className="invalid-feedback">
                {errors.assessed_by.message}
              </div>
            )}
          </div>

          {/* Trainer Is Selected */}
          <div className="col-xxl-6 col-xl-6 col-md-6">
            <label className="form-label fw-bold">Trainer Is Selected</label>
            <input
              type="text"
              className={`form-control ${
                errors.trainer_is_selected ? "is-invalid" : ""
              }`}
              value={assessmentDetail.trainer_is_selected ? "Yes" : "No"}
              readOnly
            />
          </div>

          {/* Submit Button */}
          <div className="col-12 d-flex justify-content-center">
            <button type="submit" className="custom-button-interview">
              Update Assessment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssessmentCandidateWithForm;
