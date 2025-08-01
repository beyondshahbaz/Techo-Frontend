// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import { Button } from "primereact/button";
// import { useNavigate } from "react-router-dom";
// import { baseURL } from "../../utils/axios";
// import { AuthContext } from "../../contexts/authContext";
// interface AssessmentData {
//   id: string;
//   student_name: string;
//   assessed_by: string;
//   batch_name: string;
//   assessment_test_status: string;
//   admin_selected?: boolean;
// }

// interface ApiResponse {
//   data: AssessmentData[];
// }

// const AssessmentTable: React.FC = () => {
//   const [data, setData] = useState<AssessmentData[]>([]);
//   const navigate = useNavigate();
//   const [hoveredRow, setHoveredRow] = useState<string | null>(null);

//   const { trainers, role } = useContext(AuthContext);
//   const trainerName = trainers;

//   console.log(trainerName);

//   useEffect(() => {
//     const token = localStorage.getItem("accessToken");

//     const fetchData = async () => {
//       try {
//         const response = await axios.get<ApiResponse>(
//           `${baseURL}/assessment/`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setData(response.data.data);
//         console.log(response.data.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const studentNameTemplate = (rowData: AssessmentData) => (
//     <span style={{ color: "black", fontWeight: "bold" }}>
//       {rowData.student_name}
//     </span>
//   );

//   const trainerNameTemplate = (rowData: AssessmentData) => (
//     <span style={{ color: "black" }}>{rowData.assessed_by}</span>
//   );

//   const batchNameTemplate = (rowData: AssessmentData) => (
//     <span style={{ color: "black", fontWeight: "bold" }}>
//       {rowData.batch_name}
//     </span>
//   );

//   const assessmentStatusTemplate = (rowData: AssessmentData) => (
//     <span style={{ color: "black", fontWeight: "bold" }}>
//       {rowData.assessment_test_status}
//     </span>
//   );

//   const adminSelectedTemplate = (rowData: AssessmentData) => (
//     <div className="flex align-items-center">
//       <input
//         type="checkbox"
//         checked={rowData.admin_selected || false}
//         readOnly
//         className="custom-checkboxAS"
//       />
//     </div>
//   );

//   const handleEditInterviewer = (rowData: AssessmentData) => {
//     const updatedData = data.map((item) =>
//       item.id === rowData.id ? { ...item, assessed_by: trainerName } : item
//     );
//     setData(updatedData);

//     axios
//       .put(`${baseURL}/assessment/update/${rowData.id}/`, {
//         ...rowData,
//         assessed_by: trainerName,
//       })
//       .then((response) => {
//         console.log("Interviewer updated successfully:", response.data);
//       })
//       .catch((error) => {
//         console.error("Error updating interviewer:", error);
//       });
//   };

//   const handleSelectAssessment = (rowData: AssessmentData) => {
//     console.log("Selecting assessment for:", rowData);
//     let id = rowData.id;
//     navigate(`/AssessmentCandidte/${id}`);
//   };

//   const selectAssessmentTemplate = (rowData: AssessmentData) => {
//     if (rowData.assessed_by === null) {
//       return (
//         <Button
//           label="Select for Assessment"
//           icon="pi pi-user-plus"
//           className="p-button-sm custom-edit-button"
//           style={{
//             background:
//               hoveredRow === rowData.id
//                 ? "var(--bs-info)"
//                 : "rgb(92, 160, 232)",
//           }}
//           onMouseEnter={() => setHoveredRow(rowData.id)}
//           onMouseLeave={() => setHoveredRow(null)}
//           onClick={() => handleEditInterviewer(rowData)}
//         />
//       );
//     } else {
//       return (
//         <Button
//           label="Update Details"
//           icon="pi pi-check"
//           className="p-button-sm custom-edit-button"
//           onClick={() => handleSelectAssessment(rowData)}
//         />
//       );
//     }
//   };

//   const handleStudentInformation = () => {
//     navigate("/StudentInformation");
//   };

//   return (
//     <div className="container mt-4">
//       <div className="header-containerH">
//         <h2 className="header-titleH">ASSESSMENTS</h2>
//         <Button
//           className="header-buttonH mb-1"
//           label="All Student Information"
//           severity="info"
//           onClick={handleStudentInformation}
//         />
//       </div>

//       <div className="card">
//         <DataTable value={data} stripedRows paginator rows={20}>
//           <Column
//             field="student_name"
//             header="Student Name"
//             body={studentNameTemplate}
//             sortable
//           ></Column>
//           <Column
//             field="assessed_by"
//             header="Trainer Name"
//             body={trainerNameTemplate}
//             sortable
//           ></Column>
//           <Column
//             field="batch_name"
//             header="Batch Name"
//             body={batchNameTemplate}
//             sortable
//           ></Column>
//           {/* <Column
//             field="assessment_test_status"
//             header="Assessment Status"
//             body={assessmentStatusTemplate}
//             sortable
//           ></Column> */}
          
//           {/* Conditionally render Admin fields if role is ADMIN */}
//           {role === "ADMIN" && (
//               <Column
//                 field="admin_selected"
//                 header="Approved by Admin"
//                 body={adminSelectedTemplate}
//                 sortable
//               ></Column>
//           )}
//           <Column header="Actions" body={selectAssessmentTemplate}></Column>
//         </DataTable>
//       </div>
//     </div>
//   );
// };

// export default AssessmentTable;


import React, { useContext, useEffect, useState } from "react";
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
  admin_selected?: boolean;
}

interface ApiResponse {
  data: AssessmentData[];
}

const AssessmentTable: React.FC = () => {
  const [data, setData] = useState<AssessmentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  const { trainers, role } = useContext(AuthContext);
  const trainerName = trainers;

  console.log(trainerName);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    const fetchData = async () => {
      try {
        const response = await axios.get<ApiResponse>(
          `${baseURL}/assessment/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }finally {
        setLoading(false);
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

  const adminSelectedTemplate = (rowData: AssessmentData) => (
    <div className="flex align-items-center">
      <input
        type="checkbox"
        checked={rowData.admin_selected || false}
        readOnly
        className="custom-checkboxAS"
      />
    </div>
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
          className="btn btn-primary w-full"
          // className="p-button-sm custom-edit-button"
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
          // className="p-button-sm custom-edit-button"
          className="btn btn-primary w-full"
          onClick={() => handleSelectAssessment(rowData)}
        />
      );
    }
  };

  const handleStudentInformation = () => {
    navigate("/StudentInformation");
  };
   if (loading) {
    return (
      <div className="loading-minimal">
        <div className="dot-flashing"></div>
        <span className="ml-4">Loading ...</span>
      </div>
    );
  }

  if (error) {
    return <div className="error">Error fetching data: {error}</div>;
  }

  return (
    <div className="container mt-4">
      <div className="header-containerH flex flex-column align-items-center mb-3 relative">
        {/* <h2 className="header-titleH">ASSESSMENTS</h2> */}
       
         <h1 className="sponsornowHeading header-titleH text-center flex flex-column absolute top-5">
        ASSESSMENTS
      </h1><br></br><br></br>
      </div>
      {/* <div className="w-100 flex justify-content-end px-3"> */}
      <div className="header-containerH ">

        <Button
          // className="header-buttonH mb-1"
          className="btn btn-primary text"
          label="All Student Information"
          severity="info"
          onClick={handleStudentInformation}
        />
      </div>
      <br/>

      <div className="card">
        {/* paginator rows={20} */}
        <DataTable value={data} stripedRows>
          <Column
            field="student_name"
            header="Student Name"
            body={studentNameTemplate}
            sortable
            className="text-nowrap"
          ></Column>
          <Column
            field="assessed_by"
            header="Trainer Name"
            body={trainerNameTemplate}
            sortable
            className="text-nowrap"

          ></Column>
          <Column
            field="batch_name"
            header="Batch Name"
            body={batchNameTemplate}
            sortable
            className="text-nowrap"

          ></Column>
          {/* <Column
            field="assessment_test_status"
            header="Assessment Status"
            body={assessmentStatusTemplate}
            sortable
          ></Column> */}
          
          {/* Conditionally render Admin fields if role is ADMIN */}
          {role === "ADMIN" && (
              <Column
                field="admin_selected"
                header="Approved by Admin"
                body={adminSelectedTemplate}
                
                sortable
               
              ></Column>
          )}
            
          <Column header="Actions" body={selectAssessmentTemplate} className="text-nowrap"></Column>
        </DataTable>
      </div>
    </div>
  );
};

export default AssessmentTable;

