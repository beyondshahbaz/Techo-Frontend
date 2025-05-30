import React, { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/authContext";
import axios from "axios";

const AssignBatchForTrainer = () => {
  const { batches, allTrainer } = useContext(AuthContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAccessToken(token);
    }
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const payload = {
        batch_id: data.batch_id,
        trainer_ids: [parseInt(data.trainer_ids)], // Convert to number and wrap in array
      };

      const response = await axios.post(
        "https://gl8tx74f-8000.inc1.devtunnels.ms/auth/batches/assign_trainers_for_admin/",
        payload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Assignment successful:", response.data);
      alert("Assignment successful");
      setSubmitSuccess(true);
      reset();
      window.location.reload();
    } catch (error) {
      console.error("Assignment failed:", error);
      setSubmitError(
        error.response?.data?.message || "Failed to assign batch to trainer"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="assignABT-batch-container mt-6">
      <h1 className="assignABT-batch-title text-center">
        Assign Batch to Trainer
      </h1>

      <div className="assignABT-form-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-groupABT">
            <label className="form-labelABT" htmlFor="trainerId">
              Select Trainer
            </label>
            <select
              id="trainerId"
              {...register("trainer_ids", { required: "Trainer is required" })}
              className="form-selectABT"
              disabled={isSubmitting}
            >
              <option value="">-- Select Trainer --</option>
              {allTrainer.map((trainer) => (
                <option key={trainer.id} value={trainer.id}>
                  {trainer.first_name} {trainer.last_name} - {trainer.email}
                </option>
              ))}
            </select>
            {errors.trainer_ids && (
              <p className="error-message">{errors.trainer_ids.message}</p>
            )}
          </div>

          <div className="form-groupABT">
            <label className="form-labelABT" htmlFor="batchId">
              Select Batch
            </label>
            <select
              id="batchId"
              {...register("batch_id", { required: "Batch is required" })}
              className="form-selectABT"
              disabled={isSubmitting}
            >
              <option value="">-- Select Batch --</option>
              {batches.map((batch) => (
                <option key={batch.batch_id} value={batch.batch_id}>
                  {batch.batch_name} - {batch.center}
                </option>
              ))}
            </select>
            {errors.batch_id && (
              <p className="error-message">{errors.batch_id.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="submit-buttonABT"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Assigning..." : "Assign Batch"}
          </button>
        </form>
        {submitSuccess && (
          <div className="success-message">
            Batch assigned to trainer successfully!
          </div>
        )}
        {submitError && <div className="error-message text-red-600">{submitError}</div>}
      </div>
    </div>
  );
};

export default AssignBatchForTrainer;
