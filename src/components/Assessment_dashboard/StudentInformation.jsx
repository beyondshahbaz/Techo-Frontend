import React, { useState, useEffect } from 'react';
import axios from 'axios';


const StudentInformation = () => {
  const [studentData, setStudentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    const fetchStudentData = async () => {
      try {
        const response = await axios.get('https://gl8tx74f-8000.inc1.devtunnels.ms/auth/assessment/' , {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        setStudentData(response.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  if (loading) {
    return (
      <div className="loading-minimal">
        <div className="dot-flashing"></div>
        <span className="ml-4">Loading ...</span>
      </div>
    );
  }

  if (error) {
    return <div className="error text-center">Error fetching data: {error}</div>;
  }

  return (
    <div className="student-info-containerS">
      {/* <h2 className="table-titleS uppercase">Student Information</h2> */}
      <h1 className="sponsornowHeading header-titleH text-center flex flex-column absolute top-5 w-full">
        Student Information
      </h1><br/><br/><br/><br/>
      <div className="table-wrapperS">
        <table className="student-tableS">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Batch</th>
              <th>Center</th>
              <th>Selected By Trainer</th>
            </tr>
          </thead>
          <tbody>
            {studentData.map((student) => (
              <tr key={student.id}>
                <td className="student-nameS text-nowrap">{student.student_name}</td>
                <td><span className="batch-tagS text-nowrap">{student.batch_name}</span></td>
                <td><span className='text-nowrap'>{student.center}</span></td>
                <td><span className='text-nowrap'>{student.selected_by_trainer}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentInformation;