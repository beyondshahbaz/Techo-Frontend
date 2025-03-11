import axios from "axios";
import React, { useState, useEffect } from "react";

export const Student_Card = ({ filterStudent, selectAll, setSelectAll }) => {
  const [sponsorStudentId, setSponsorStudentId] = useState([]);
  const [countStudent, setCountStudent] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const base_api = "https://gl8tx74f-8000.inc1.devtunnels.ms/auth";

  const SPONSOR_STUDENT = async () => {
    const payload = {
      student_ids: sponsorStudentId,
    };
    try {
      const response = await axios.post(
        `${base_api}/sponsers/1/select_students/`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        window.alert("Successfully Sponsored");
        console.log("Successfully sponsored", response);
      }
    } catch (error) {
      console.log(error);
      window.alert("There is some issue at the moment, please try again");
    }
  };

  const handleCheckboxClick = (e, studentId) => {
    const isChecked = e.target.checked;
    const student = filterStudent.find(
      (student) => student.student_id === studentId
    );
    const studentFee = student ? student.fee : 0;

    if (isChecked) {
      // Add the student ID to the list
      setSponsorStudentId((prev) => [...prev, studentId]);
      setCountStudent((prev) => prev + 1);
      setTotalAmount((prev) => prev + studentFee);
    } else {
      // Remove the student ID from the list
      setSponsorStudentId((prev) => prev.filter((id) => id !== studentId));
      setCountStudent((prev) => prev - 1);
      setTotalAmount((prev) => prev - studentFee);
    }

    // If "Select All" is active and a checkbox is manually unchecked, disable "Select All"
    if (selectAll && !isChecked) {
      setSelectAll(false);
    }
  };

  const handleSponsorship = (e) => {
    e.preventDefault();
    SPONSOR_STUDENT();
  };

  // Effect to handle "Select All" functionality
  useEffect(() => {
    if (selectAll) {
      // Select all students
      const allStudentIds = filterStudent.map((student) => student.student_id);
      const totalFee = filterStudent.reduce((sum, student) => sum + student.fee, 0);
      setSponsorStudentId(allStudentIds);
      setCountStudent(filterStudent.length);
      setTotalAmount(totalFee);
    } else {
      // Deselect all students
      setSponsorStudentId([]);
      setCountStudent(0);
      setTotalAmount(0);
    }
  }, [selectAll, filterStudent]);

  return (
    <div className="table-responsive">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Batch</th>
            <th className="text-end">Fee</th>
            <th width="10%" className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filterStudent.length > 0 ? (
            filterStudent.map((student, index) => (
              <tr key={index}>
                <td>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`${student.student_id}`}
                      checked={sponsorStudentId.includes(student.student_id)}
                      onChange={(e) => handleCheckboxClick(e, student.student_id)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`${student.student_id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        const checkbox = document.getElementById(`${student.student_id}`);
                        checkbox.checked = !checkbox.checked;
                        handleCheckboxClick(
                          { target: { checked: checkbox.checked } },
                          student.student_id
                        );
                      }}
                    >
                      {student.student_name}
                    </label>
                  </div>
                </td>
                <td className="text-nowrap">{student.batch_name}</td>
                <td className="text-end">₹{student.fee}</td>
                <td className="text-center">
                  <button className="btn btn-light text-nowrap">
                    Sponsor Now
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No students found.
              </td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <th>Total: {countStudent}</th>
          <th></th>
          <th className="text-end">₹{totalAmount}</th>
          <th className="text-center">
            <button
              className="btn btn-primary text-nowrap"
              onClick={handleSponsorship}
            >
              Sponsor Selected
            </button>
          </th>
        </tfoot>
      </table>
    </div>
  );
};



        //     <div className="row g-2">
    //       {filterStudent.length > 0 ? (
    //         filterStudent.map((student, index) => (
    //           <div className="col-xxl-3 col-xl-3 col-md-3" key={index}>
    //             <div className="student-card">
    //               <h3>{student.student_name}</h3>
    //               <p>
    //                 <strong>Batch:</strong> {student.batch_name}
    //               </p>
    //               <p>
    //                 <strong>Fee:</strong> ₹{student.fee}
    //               </p>
    //               <div class="form-check mb-3">
    //                 <input
    //                   class="form-check-input"
    //                   type="checkbox"
    //                   id={`student-checkbox-${index}`}
    //                   disabled={isCheckBoxSelected}
    //                 />
    //                 <label
    //                   class="form-check-label"
    //                   for={`student-checkbox-${index}`}
    //                 >
    //                   Select Student
    //                 </label>
    //               </div>
    //               <button className="sponsor-button" disabled={isCheckBoxSelected}>
    //                 Sponsor Now
    //               </button>
    //             </div>
    //           </div>
    //         ))
    //       ) : (
    //         <div className="col-12">
    //           <p>No students found.</p>
    //         </div>

    //       )}
    // </div>
