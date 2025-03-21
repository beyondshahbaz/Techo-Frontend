import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/authContext";

export const Student_Card = ({ filterStudent, selectAll, setSelectAll }) => {
  const [sponsorStudentId, setSponsorStudentId] = useState([]);
  const [sponsorStudentBatchId, setSponsorStudentBatchId] = useState([]);
  const [countStudent, setCountStudent] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const { API_BASE_URL } = useContext(AuthContext);

  const SPONSOR_STUDENT = async () => {

    const uniqueBatchIds = [...new Set(sponsorStudentBatchId)];


    const intSponsorStudentBatchId = uniqueBatchIds.map((item) => Number(item));

    const payload = {
      student_ids: sponsorStudentId,
      batch_ids: intSponsorStudentBatchId,
    };

    try {
      console.log(payload); 
      const response = await axios.post(
        `${API_BASE_URL}/sponsers/2/sponsor_batch/`,

        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        window.alert("Successfully Sponsored");
      }

    } catch (error) {
      console.log("error", error);

      window.alert("There is some issue at the moment, please try again");
    }
  };

  const handleCheckboxClick = (e, studentId, batchId) => {

    const isChecked = e.target.checked;
    const student = filterStudent.find(
      (student) => student.student_id === studentId
    );
    const studentFee = student ? student.fee : 0;

    if (isChecked) {
      setSponsorStudentId((prev) => [...prev, studentId]);
      setSponsorStudentBatchId((prev) => [...prev, batchId]);
      setCountStudent((prev) => prev + 1);
      setTotalAmount((prev) => prev + studentFee);
    } else {
      setSponsorStudentId((prev) => prev.filter((id) => id !== studentId));
      setSponsorStudentBatchId((prev) => prev.filter((id) => id !== batchId));

      setCountStudent((prev) => prev - 1);
      setTotalAmount((prev) => prev - studentFee);
    }


    if (selectAll && !isChecked) {
      setSelectAll(false);
    }
  };

  const handleSponsorship = (e) => {
    e.preventDefault();
    SPONSOR_STUDENT();
  };

  useEffect(() => {
    if (selectAll) {
      const allStudentIds = filterStudent.map((student) => student.student_id);
      const allBatchIds = filterStudent.map((student) => student.batch_id || ""); 
      const totalFee = filterStudent.reduce(
        (sum, student) => sum + (student.fee || 0),
        0
      );
      setSponsorStudentId(allStudentIds);
      setSponsorStudentBatchId(allBatchIds);
      setCountStudent(filterStudent.length);
      setTotalAmount(totalFee);
    } else {
      setSponsorStudentId([]);
      setSponsorStudentBatchId([]);

      setCountStudent(0);
      setTotalAmount(0);
    }
  }, [selectAll, filterStudent]);

  return (
    <div className="table-responsive maxhTable">
      <table>
        <thead>
          <tr>
            <th width="25%">Name</th>
            <th width="35%">Batch</th>
            <th className="text-end" width="15%">Fee</th>

            <th width="10%" className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filterStudent && filterStudent.length > 0 ? (

            filterStudent.map((student, index) => (
              <tr key={index}>
                <td>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`${student.student_id}`}
                      checked={sponsorStudentId.includes(student.student_id)}
                      onChange={(e) =>
                        handleCheckboxClick(e, student.student_id, student.batch_id)
                      }

                    />
                    <label
                      className="form-check-label"
                      htmlFor={`${student.student_id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        const checkbox = document.getElementById(
                          `${student.student_id}`
                        );
                        checkbox.checked = !checkbox.checked;
                        handleCheckboxClick(
                          { target: { checked: checkbox.checked } },
                          student.student_id,
                          student.batch_id

                        );
                      }}
                    >
                      {student.student_name}
                    </label>
                  </div>
                </td>
                <td className="text-nowrap">{`${student.batch_name || ""} ${student.batch_id?.toString() || ""}`}</td>
                <td className="text-end">₹{student.fee || 0}</td>

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
          <tr className="fixedTableBottom">
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
          </tr>

        </tfoot>
      </table>
    </div>
