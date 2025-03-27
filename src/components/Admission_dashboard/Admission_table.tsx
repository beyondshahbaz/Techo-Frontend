import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useNavigate } from "react-router-dom";

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
  interview_by: string | null;
}

const AdmissionTable: React.FC = () => {
  const [data, setData] = useState<AdmissionData[]>([]);
  const navigate = useNavigate();
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [interviewerNames, setInterviewerNames] = useState<{
    [key: string]: string;
  }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://gl8tx74f-8000.inc1.devtunnels.ms/auth/Learner/"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const nameTemplate = (rowData: AdmissionData) => (
    <span style={{ color: "black", fontWeight: "bold" }}>{rowData.name}</span>
  );

  const emailTemplate = (rowData: AdmissionData) => (
    <span style={{ color: "black" }}>{rowData.email}</span>
  );

  const mobileTemplate = (rowData: AdmissionData) => (
    <span style={{ color: "black", fontWeight: "bold" }}>
      {rowData.mobile_no}
    </span>
  );

  const interviewByTemplate = (rowData: AdmissionData) => (
    <span style={{ color: "black", fontWeight: "bold" }}>
      {rowData.interview_by}
    </span>
  );

  const handleEditInterviewer = (
    rowData: AdmissionData,
    newInterviewer: string
  ) => {
    const updatedData = data.map((item) =>
      item.id === rowData.id ? { ...item, interview_by: newInterviewer } : item
    );
    setData(updatedData);

    // Send the updated data to the backend
    axios
      .put(
        `https://gl8tx74f-8000.inc1.devtunnels.ms/auth/Learner/${rowData.id}/`,
        {
          ...rowData,
          interview_by: newInterviewer,
        }
      )
      .then((response) => {
        console.log("Interviewer updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating interviewer:", error);
      });
  };

  const editInterviewerTemplate = (rowData: AdmissionData) => {
    return (
      <InputText
        value={interviewerNames[rowData.id] || ""}
        onChange={(e) => {
          setInterviewerNames((prev) => ({
            ...prev,
            [rowData.id]: e.target.value,
          }));
        }}
        placeholder="Enter Interviewer Name"
      />
    );
  };

  const handleEdit = (rowData: AdmissionData) => {
    console.log("Editing row:", rowData);
    navigate(`/interview-candidate/${rowData.id}`, {
      state: { candidateData: rowData },
    });
  };

  const editTemplate = (rowData: AdmissionData) => {
    if (rowData.interview_by === null) {
      return (
        <Button
          label="Select Interviewer  "
          icon="pi pi-user-plus"
          className="p-button-sm custom-edit-button "
          style={{
            background:
              hoveredRow === rowData.id
                ? "var(--bs-info)"
                : "rgb(92, 160, 232)",
          }}
          onMouseEnter={() => setHoveredRow(rowData.id)}
          onMouseLeave={() => setHoveredRow(null)}
          onClick={() =>
            handleEditInterviewer(rowData, interviewerNames[rowData.id] || "")
          }
        />
      );
    } else {
      return (
        <Button
          label="Select for interview"
          icon="pi pi-pencil"
          className="p-button-sm custom-edit-button"
          onClick={() => handleEdit(rowData)}
        />
      );
    }
  };

  const handleAllIntervieweesInformationClick = () => {
    navigate("/AllIntervieweesInformation");
  };

  return (
    <div className="container mt-4">
      <div className="header-containerH">
        <h2 className="header-titleH">INTERVIEWEES</h2>
        <Button
          className="header-buttonH mb-1"
          label="All Interviewees Information"
          severity="info"
          onClick={handleAllIntervieweesInformationClick}
        />
      </div>

      <div className="card">
        <DataTable value={data} stripedRows paginator rows={15}>
          <Column
            field="name"
            header="Name"
            body={nameTemplate}
            sortable
          ></Column>
          <Column
            field="email"
            header="Email"
            body={emailTemplate}
            sortable
          ></Column>
          <Column
            field="mobile_no"
            header="Mobile No"
            body={mobileTemplate}
            sortable
          ></Column>
          <Column
            field="interview_by"
            header="Interviewer Name"
            body={interviewByTemplate}
            sortable
          ></Column>
          <Column
            header="Enter Interviewer Name"
            body={editInterviewerTemplate}
          ></Column>
          <Column header="Actions" body={editTemplate}></Column>
        </DataTable>
      </div>
    </div>
  );
};

export default AdmissionTable;
