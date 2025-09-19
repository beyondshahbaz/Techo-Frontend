import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseURL } from '../../utils/axios';


const AllStudent = () => {
  const [studentData, setStudentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudentData = async () => {
        const token = localStorage.getItem("accessToken");
      try {
        const response = await axios.get(
          `${baseURL}/auth/Learner/interviewee_student/?selected_status=Y` , {
            headers: {
              Authorization: `Bearer ${token}`,
            },
      });
        
        setStudentData(response.data);
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
    return <div className="error">Error fetching data: {error}</div>;
  }

  return (
    <div className="student-info-containerS">
      {/* <h2 className="table-titleS uppercase">Student Information</h2> */}
       <h2 className="sponsornowHeading pt-2 text-4xl  mb-4 uppercase text-center max-w-[95vw] sm:max-w-[800px] mx-auto">
        Student Information
      </h2>-+
      <div className="table-wrapperS">
        <table className="student-tableS">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile No</th>
              <th>Gender</th>
              <th>Batch</th>
            </tr>
          </thead>
          <tbody>
            {studentData.map((student) => (
              <tr key={student.id || student.email}>
                <td className="student-nameS">{student.name}</td>
                <td>{student.email}</td>
                <td>{student.mobile_no}</td>
                <td>{student.gender}</td>
                <td><span className="batch-tagS">{student.batch}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllStudent;

