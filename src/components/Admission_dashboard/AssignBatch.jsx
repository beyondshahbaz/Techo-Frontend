import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../../utils/axios";
import { AuthContext } from "../../contexts/authContext";

const AssignBatch = () => {
  const [selectedLearners, setSelectedLearners] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [learners, setLearners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { error1, batches, loadingBatches } = useContext(AuthContext);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAccessToken(token);
    } else {
      setError("No access token found");
      setLoading(false);
    }
  }, []);

  const fetchLearners = async () => {
    if (!accessToken) return;
    
    try {
      const response = await axios.get(
        `${baseURL}/Learner/selected_without_batch/`, 
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
      setLearners(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.detail || err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchLearners();
    }
  }, [accessToken]);

  const handleSelectLearner = (learnerId) => {
    if (selectedLearners.includes(learnerId)) {
      setSelectedLearners(selectedLearners.filter((id) => id !== learnerId));
    } else {
      setSelectedLearners([...selectedLearners, learnerId]);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedLearners([]);
    } else {
      setSelectedLearners(learners.map((learner) => learner.id));
    }
    setSelectAll(!selectAll);
  };

  const handleAssignBatchClick = () => {
    setShowDialog(true);
  };

  const handleDialogClose = () => {
    setShowDialog(false);
    setSelectedBatch("");
  };

  const handleBatchAssignConfirm = async () => {
    if (!selectedBatch) {
      alert("Please select a batch");
      return;
    }

    if (!accessToken) {
      alert("No authentication token available");
      return;
    }

    try {
      await axios.post(
        `${baseURL}/Learner/assign_batch/`, 
        {
          learner_ids: selectedLearners,
          batch_id: selectedBatch,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );

      setLearners(
        learners.filter((learner) => !selectedLearners.includes(learner.id))
      );

      setSelectedLearners([]);
      setSelectAll(false);
      setSelectedBatch("");
      setShowDialog(false);
    } catch (err) {
      alert("Failed to assign batch: " + (err.response?.data?.detail || err.message));
    }
  };

  if (loading) {
    return (
      <div className="loading-minimal">
        <div className="dot-flashing"></div>
        <span className="ml-4">Loading ...</span>
      </div>
    );
  }

  const errorToDisplay = error1 || error;
  if (errorToDisplay) {
    return (
      <div className="assign-batch-container-with-bg text-white text-center">
        Error: {errorToDisplay}
      </div>
    );
  }

  return (
    <div className="assign-batch-container-with-bg">
      <div className="assign-batch-container">
        <h2 className="text-center">Assign Batch to Students</h2>

        {learners.length === 0 ? (
          <div className="alert alert-info pt-3">
            All Students have been assigned to batches.
          </div>
        ) : (
          <>
            <div className="table-responsiveA">
              {/* Desktop Table */}
              <table className="tableA d-none d-md-table">
                <thead>
                  <tr>
                    <th>
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                      />
                    </th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Level</th>
                    <th>Laptop</th>
                    <th>Interview By</th>
                  </tr>
                </thead>
                <tbody>
                  {learners.map((learner) => (
                    <tr key={learner.id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedLearners.includes(learner.id)}
                          onChange={() => handleSelectLearner(learner.id)}
                        />
                      </td>
                      <td>{learner.name}</td>
                      <td>{learner.email}</td>
                      <td>{learner.mobile_no}</td>
                      <td>{learner.level}</td>
                      <td>{learner.laptop === "Y" ? "Yes" : "No"}</td>
                      <td>{learner.interview_by}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Mobile Cards */}
              <div className="d-md-none">
                {learners.map((learner) => (
                  <div
                    key={learner.id}
                    className={`mobile-learner-card ${
                      selectedLearners.includes(learner.id) ? "selected" : ""
                    }`}
                    onClick={() => handleSelectLearner(learner.id)}
                  >
                    <div className="card-header">
                      <input
                        type="checkbox"
                        checked={selectedLearners.includes(learner.id)}
                        onChange={() => handleSelectLearner(learner.id)}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <span className="learner-name">{learner.name}</span>
                    </div>
                    <div className="card-details">
                      <div>
                        <span>Email:</span> {learner.email}
                      </div>
                      <div>
                        <span>Mobile:</span> {learner.mobile_no}
                      </div>
                      <div>
                        <span>Level:</span> {learner.level}
                      </div>
                      <div>
                        <span>Laptop:</span>{" "}
                        {learner.laptop === "Y" ? "Yes" : "No"}
                      </div>
                      <div>
                        <span>Interview By:</span> {learner.interview_by}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="action-buttonsA">
              <button
                className="btn btn-primary"
                onClick={handleAssignBatchClick}
                disabled={selectedLearners.length === 0}
              >
                Assign Batch to Selected ({selectedLearners.length})
              </button>
            </div>
          </>
        )}
      </div>

      {/* Dialog Box */}
      {showDialog && (
        <div className="dialog-overlayA">
          <div className="dialog-boxA">
            <h3>Assign Batch</h3>
            <p>Select a batch for the selected learners:</p>

            {loadingBatches ? (
              <select className="form-selectA" disabled>
                <option>Loading batches...</option>
              </select>
            ) : (
              <select
                className="form-selectA"
                value={selectedBatch}
                onChange={(e) => setSelectedBatch(e.target.value)}
              >
                <option value="">Select batch</option>
                {batches.map((batch) => (
                  <option key={batch.id} value={batch.batch_id}>
                    {batch.batch_name} - {batch.trainer.join(", ")} -{" "}
                    {batch.center}
                  </option>
                ))}
              </select>
            )}

            <div className="dialog-actionsA">
              <button className="btn btn-secondary" onClick={handleDialogClose}>
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleBatchAssignConfirm}
                disabled={!selectedBatch}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignBatch;