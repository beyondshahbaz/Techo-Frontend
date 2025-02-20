import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

// Define the type for the data
interface AdmissionData {
  email: string;
  mobile_no: string;
  name: string;
}

const AdmissionTable: React.FC = () => {
  const data: AdmissionData[] = [
    {
      email: "3www@gmail.com",
      mobile_no: "9300937158",
      name: "Hasnen Ali",
    },
    {
      email: "example@gmail.com",
      mobile_no: "9876543210",
      name: "John Doe",
    },
  ];

  // Function to style the name column
  const nameTemplate = (rowData: AdmissionData) => (
    <span style={{ color: "blue", fontWeight: "bold" }}>{rowData.name}</span>
  );

  // Function to style the email column
  const emailTemplate = (rowData: AdmissionData) => (
    <span style={{ color: "green" }}>{rowData.email}</span>
  );

  // Function to style the mobile_no column
  const mobileTemplate = (rowData: AdmissionData) => (
    <span style={{ color: "red", fontWeight: "bold" }}>{rowData.mobile_no}</span>
  );

  return (
    <div className="container mt-4">
      <h2 className="card-title text-center mb-0 text-primary">
        INTERVIEWS RECORD
      </h2>
      <div className="card">
        <DataTable value={data} stripedRows paginator rows={5}>
          <Column field="name" header="Name" body={nameTemplate} sortable></Column>
          <Column field="email" header="Email" body={emailTemplate} sortable></Column>
          <Column field="mobile_no" header="Mobile No" body={mobileTemplate} sortable></Column>
        </DataTable>
      </div>
    </div>
  );
};

export default AdmissionTable;