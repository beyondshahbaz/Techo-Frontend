import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Checkbox } from "primereact/checkbox";
import axios from "axios";
import { baseURL } from "../../utils/axios";

// Define the type for a student object
interface Student {
  student_id: number;
  student_name: string;
  is_ready_for_recruitment: boolean;
  trainer_is_selected: boolean;
}

// Define the type for a technology object
interface Technology {
  technology_name: string;
}

// Define the type for batch details
interface BatchDetail {
  batch_id: number;
  batch_name: string;
  student_count: number;
  technologies: Technology[];
  students: Student[];
}

// Define the type for the API response
interface ApiResponse {
  data: BatchDetail;
}

const TrainerBatchDetail = () => {
  const { batchId } = useParams<{ batchId: string }>();
  const [batchDetail, setBatchDetail] = useState<BatchDetail | null>(null);
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAccessToken(token);
    }

    const fetchBatchDetail = async () => {
      try {
        const response = await axios.get<ApiResponse>(
          `${baseURL}/trainers/batches/${batchId}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBatchDetail(response.data.data);
      } catch (error) {
        console.error("Error fetching batch detail:", error);
      }
    };

    fetchBatchDetail();
  }, [batchId]);

  // Handle student selection
  const onStudentSelect = (studentId: number) => {
    if (selectedStudents.includes(studentId)) {
      setSelectedStudents(selectedStudents.filter((id) => id !== studentId));
    } else {
      setSelectedStudents([...selectedStudents, studentId]);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!batchDetail) return;

    const payload = {
      batch_id: batchDetail.batch_id,
      student_ids: selectedStudents,
    };

    try {
      const response = await axios.post(
        `${baseURL}/Trainer/trainer_select/`,
        payload ,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      alert("Students selected successfully!");
      navigate("/Trainer_batch");
      window.location.reload();
    } catch (error) {
      console.error("Error submitting selected students:", error);
      alert("Failed to select students.");
    }
  };

  if (!batchDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div className="trainer-batch-detail-container">
      <div className="batch-headerTBD">
        <h2>Batch: {batchDetail.batch_name}</h2>
      </div>

      <div className="batch-infoTBD">
        <div className="info-itemTBD">
          <span className="info-labelTBD">Number of Students:</span>
          <span className="info-valueTBD">{batchDetail.student_count}</span>
        </div>
        <div className="info-itemTBD">
          <span className="info-labelTBD">Technologies:</span>
          <span className="info-valueTBD">
            {batchDetail.technologies.map((e) => e.technology_name).join(", ")}
          </span>
        </div>
      </div>

      <div className="student-name-section">
        <h3>Student Names</h3>
        <DataTable
          value={batchDetail.students}
          className="p-datatable-striped p-datatable-gridlines custom-datatableTBD"
        >
          <Column
            field="student_name"
            header="Student Name"
            sortable
            body={(rowData: Student) => (
              <span className="student-name-gradient">
                {rowData.student_name}
              </span>
            )}
          />
          <Column
            header="INDUSTRY READY"
            body={(rowData: Student) => (
              <Checkbox
                checked={
                  rowData.trainer_is_selected ||
                  selectedStudents.includes(rowData.student_id)
                }
                onChange={() => onStudentSelect(rowData.student_id)}
                disabled={rowData.trainer_is_selected}
                className={rowData.trainer_is_selected ? "checked-designH" : ""}
              />
            )}
            className="align-end-columnH"
          />
        </DataTable>
        <button onClick={handleSubmit} className="submit-buttonH">
          Submit For Assessment
        </button>
      </div>
    </div>
  );
};

export default TrainerBatchDetail;
