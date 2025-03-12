import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import axios from 'axios';

const AllIntervieweesInformation = () => {
  const [interviewees, setInterviewees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://187gwsw1-8000.inc1.devtunnels.ms/auth/Learner/');
        setInterviewees(response.data); 
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="card custom-table-containerH1 m-2 p-2">
      <DataTable
        value={interviewees}
        className="custom-datatableH1"
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 20, 50]}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
      >
        <Column field="id" header="ID" sortable></Column>
        <Column field="email" header="Email" sortable></Column>
        <Column field="role" header="Role" sortable></Column>
        <Column field="subrole" header="Subrole" sortable></Column>
        <Column field="name" header="Name" sortable></Column>
        <Column field="mobile_no" header="Mobile No" sortable></Column>
        <Column field="batch" header="Batch" body={(rowData) => rowData.batch || 'N/A'} sortable></Column>
        <Column field="eng_comm_skills" header="Eng Comm Skills" body={(rowData) => rowData.eng_comm_skills || 'N/A'} sortable></Column>
        <Column field="humble_background" header="Humble Background" body={(rowData) => rowData.humble_background || 'N/A'} sortable></Column>
        <Column field="laptop" header="Laptop" body={(rowData) => rowData.laptop || 'N/A'} sortable></Column>
        <Column field="profession" header="Profession" body={(rowData) => rowData.profession || 'N/A'} sortable></Column>
        <Column field="selected_status" header="Selected Status" body={(rowData) => rowData.selected_status || 'N/A'} sortable></Column>
        <Column field="level" header="Level" body={(rowData) => rowData.level || 'N/A'} sortable></Column>
        <Column field="source" header="Source" body={(rowData) => rowData.source || 'N/A'} sortable></Column>
        <Column field="remarks" header="Remarks" body={(rowData) => rowData.remarks || 'N/A'} sortable></Column>
        <Column field="interview_by" header="Interview By" body={(rowData) => rowData.interview_by || 'N/A'} sortable></Column>
      </DataTable>
    </div>
  );
};

export default AllIntervieweesInformation;