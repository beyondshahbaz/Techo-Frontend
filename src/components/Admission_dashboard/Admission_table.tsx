import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom"; // Import useNavigate

interface AdmissionData {
  id: string;
  email: string;
  mobile_no: string;
  name: string;
  role: string;
  subrole: string;
  gender: string | null;
  batch: string | null;
  eng_comm_skills: number;
  humble_background: string;
  laptop: string;
  profession: string;
  selected_status: string;
  level: number;
  source: string;
  remarks: string;
}

const AdmissionTable: React.FC = () => {
  const [data, setData] = useState<AdmissionData[]>([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://187gwsw1-8000.inc1.devtunnels.ms/auth/Learner/"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const nameTemplate = (rowData: AdmissionData) => (
    <span style={{ color: "blue", fontWeight: "bold" }}>{rowData.name}</span>
  );

  const emailTemplate = (rowData: AdmissionData) => (
    <span style={{ color: "green" }}>{rowData.email}</span>
  );

  const mobileTemplate = (rowData: AdmissionData) => (
    <span style={{ color: "red", fontWeight: "bold" }}>{rowData.mobile_no}</span>
  );

  const handleEdit = (rowData: AdmissionData) => {
    console.log("Editing row:", rowData);
    // Navigate to InterviewCandidate with the entire rowData as state
    navigate(`/interview-candidate/${rowData.id}`, { state: { candidateData: rowData } });
  };

  const editTemplate = (rowData: AdmissionData) => (
    <Button
      label="Select for interview"
      icon="pi pi-pencil"
      className="p-button-sm custom-edit-button"
      onClick={() => handleEdit(rowData)}
    />
  );

  return (
    <div className="container mt-4">
      <h2 className="card-title text-center mb-0 text-primary">
        INTERVIEWS RECORD
      </h2>
      <div className="card">
        <DataTable value={data} stripedRows paginator rows={15}>
          <Column field="name" header="Name" body={nameTemplate} sortable></Column>
          <Column field="email" header="Email" body={emailTemplate} sortable></Column>
          <Column field="mobile_no" header="Mobile No" body={mobileTemplate} sortable></Column>
          <Column header="Actions" body={editTemplate}></Column>
        </DataTable>
      </div>
    </div>
  );
};

export default AdmissionTable;