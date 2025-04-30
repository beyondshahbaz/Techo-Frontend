import React, { useContext , useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../utils/axios";
import { AuthContext } from "../../contexts/authContext";
interface AssessmentData {
  id: string;
  student_name: string;
  assessed_by: string;
  batch_name: string;
  assessment_test_status: string;
}

interface ApiResponse {
  data: AssessmentData[];
}

const AssessmentTable: React.FC = () => {
  const [data, setData] = useState<AssessmentData[]>([]);
  const navigate = useNavigate();
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  const { trainers } = useContext(AuthContext);
  const trainerName = trainers;

  console.log(trainerName);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ApiResponse>(`${baseURL}/assessment/`);
        setData(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const studentNameTemplate = (rowData: AssessmentData) => (
    <span style={{ color: "black", fontWeight: "bold" }}>
      {rowData.student_name}
    </span>
  );

  const trainerNameTemplate = (rowData: AssessmentData) => (
    <span style={{ color: "black" }}>{rowData.assessed_by}</span>
  );

  const batchNameTemplate = (rowData: AssessmentData) => (
    <span style={{ color: "black", fontWeight: "bold" }}>
      {rowData.batch_name}
    </span>
  );

  const assessmentStatusTemplate = (rowData: AssessmentData) => (
    <span style={{ color: "black", fontWeight: "bold" }}>
      {rowData.assessment_test_status}
    </span>
  );

  const handleEditInterviewer = (rowData: AssessmentData) => {
      const updatedData = data.map((item) =>
        item.id === rowData.id ? { ...item, assessed_by: trainerName } : item
      );
      setData(updatedData);
  
      axios
        .put(`${baseURL}/assessment/update/${rowData.id}/`, {
          ...rowData,
          assessed_by: trainerName,
        })
        .then((response) => {
          console.log("Interviewer updated successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error updating interviewer:", error);
        });
    };

  const handleSelectAssessment = (rowData: AssessmentData) => {
    console.log("Selecting assessment for:", rowData);
    let id = rowData.id;
    navigate(`/AssessmentCandidte/${id}`);
  };

  const selectAssessmentTemplate = (rowData: AssessmentData) => {
        if (rowData.assessed_by === null) {
          return (
            <Button
              label="Select for Assessment"
              icon="pi pi-user-plus"
              className="p-button-sm custom-edit-button"
              style={{
                background:
                  hoveredRow === rowData.id
                    ? "var(--bs-info)"
                    : "rgb(92, 160, 232)",
              }}
              onMouseEnter={() => setHoveredRow(rowData.id)}
              onMouseLeave={() => setHoveredRow(null)}
              onClick={() => handleEditInterviewer(rowData)}
            />
          );
        } else {
          return (
            <Button
              label="Update Details"
              icon="pi pi-check"
              className="p-button-sm custom-edit-button"
              onClick={() => handleSelectAssessment(rowData)}
            />
          );
        }
  };

  const handleStudentInformation = () => {
    navigate("/StudentInformation");
  };

  return (
    <div className="container mt-4">
      <div className="header-containerH">
        <h2 className="header-titleH">ASSESSMENTS</h2>
        <Button
          className="header-buttonH mb-1"
          label="All Student Information"
          severity="info"
          onClick={handleStudentInformation}
        />
      </div>

      <div className="card">
        <DataTable value={data} stripedRows paginator rows={15}>
          <Column
            field="student_name"
            header="Student Name"
            body={studentNameTemplate}
            sortable
          ></Column>
          <Column
            field="assessed_by"
            header="Trainer Name"
            body={trainerNameTemplate}
            sortable
          ></Column>
          <Column
            field="batch_name"
            header="Batch Name"
            body={batchNameTemplate}
            sortable
          ></Column>
          <Column
            field="assessment_test_status"
            header="Assessment Status"
            body={assessmentStatusTemplate}
            sortable
          ></Column>
          <Column header="Actions" body={selectAssessmentTemplate}></Column>
        </DataTable>
      </div>
    </div>
  );
};

export default AssessmentTable;
