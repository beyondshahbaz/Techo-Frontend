import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const TrainerBatchDetail = () => {
  const students = [
    { student_name: "Hamid khan" },
    { student_name: "Atif khan" },
    { student_name: "Umar siddiqe" },
    { student_name: "Palak" },
    { student_name: "Dev jhon" },
    { student_name: "Sumera khan" },
    { student_name: "Ayyub khan" },
  ];

  return (
    <div className="trainer-batch-detail-container">
      {/* First row with full width */}
      <div className="batch-headerTBD">
        <h2>Batch: Java</h2>
      </div>

      {/* Second row with full width and two columns */}
      <div className="batch-infoTBD">
        <div className="info-itemTBD">
          <span className="info-labelTBD">Number of Students:</span>
          <span className="info-valueTBD">07</span>
        </div>
        <div className="info-itemTBD">
          <span className="info-labelTBD">Technologies:</span>
          <span className="info-valueTBD">
            HTML, CSS, bootstrap, Java, Spring-Boot
          </span>
        </div>
      </div>

      {/* Third row with centered content */}
      <div className="student-name-section">
        <h3>Student Names</h3>
        <DataTable
          value={students}
          className="p-datatable-striped p-datatable-gridlines custom-datatableTBD"
        >
          <Column
            field="student_name"
            header="Student Name"
            sortable
            body={(rowData) => (
              <span className="student-name-gradient">
                {rowData.student_name}
              </span>
            )}
          />
        </DataTable>
      </div>
    </div>
  );
};

export default TrainerBatchDetail;
