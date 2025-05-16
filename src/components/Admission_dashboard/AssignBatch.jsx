import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../../utils/axios";

const AssignBatch = () => {
  const [selectedLearners, setSelectedLearners] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [learners, setLearners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLearners = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/Learner/selected_without_batch/`
      );
      setLearners(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLearners();
  }, []);

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

    try {
      // Make API call to assign batch
      await axios.post(
        `${baseURL}/Learner/assign_batch/`,
        {
          learner_ids: selectedLearners,
          batch_id: selectedBatch,
        }
      );

      // Refresh the learners list by removing the assigned ones
      setLearners(
        learners.filter((learner) => !selectedLearners.includes(learner.id))
      );

      // Reset selections
      setSelectedLearners([]);
      setSelectAll(false);
      setSelectedBatch("");
      setShowDialog(false);
    } catch (err) {
      alert("Failed to assign batch: " + err.message);
    }
  };

  if (loading) {
    return (
      <div className="assign-batch-container-with-bg text-white text-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="assign-batch-container-with-bg text-white text-center">
        Error: {error}
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
              <table className="tableA">
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

            <select
              className="form-selectA"
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
            >
              <option value="">Select batch</option>
              <option value="103">Java</option>
              <option value="101">Python</option>
              <option value="102">Full stack development</option>
            </select>

            <div className="dialog-actionsA">
              <button className="btn btn-secondary" onClick={handleDialogClose}>
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleBatchAssignConfirm}
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
