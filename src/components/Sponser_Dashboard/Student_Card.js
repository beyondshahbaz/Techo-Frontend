import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/authContext";

export const Student_Card = ({ filterStudent, selectAll, setSelectAll }) => {
  const [sponsorStudentId, setSponsorStudentId] = useState([]);
  const [sponsorStudentBatchId, setSponsorStudentBatchId] = useState([]);
  const [countStudent, setCountStudent] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const { API_BASE_URL } = useContext(AuthContext);
  const accessToken = localStorage.getItem("accessToken");

  const handleCheckboxClick = (e, studentId, batchId) => {
    const isChecked = e.target.checked;
    const student = filterStudent.find((s) => s.student_id === studentId);
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

    if (selectAll && !isChecked) setSelectAll(false);
  };

  const loadScript = (src) =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handleSponsorship = async (e) => {
    e.preventDefault();
    if (!sponsorStudentId.length) {
      alert("Please select at least one student before sponsoring.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${API_BASE_URL}/sponsors/create-order/`,
        {
          student_id: sponsorStudentId[0],
          amount: totalAmount,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      const { order_id, key_id, sponsorship_id } = response.data;

      const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
      if (!res) {
        alert("Razorpay SDK failed to load.");
        return;
      }

      const options = {
        key: key_id,
        amount: totalAmount * 100,
        currency: "INR",
        name: "Techno Hub",
        description: "Sponsor Students",
        order_id: order_id,
        handler: async (paymentResponse) => {
           console.log("Razorpay Payment ID:", paymentResponse.razorpay_payment_id);
            console.log("Razorpay Order ID:", paymentResponse.razorpay_order_id);
            console.log("Razorpay Signature:", paymentResponse.razorpay_signature);
          try {
            await axios.post(
              `${API_BASE_URL}/sponsors/verify-payment/`,
              {
                sponsorship_id,
                razorpay_payment_id: paymentResponse.razorpay_payment_id,
                razorpay_order_id: paymentResponse.razorpay_order_id,
                razorpay_signature: paymentResponse.razorpay_signature,
              },
              {
                headers: { Authorization: `Bearer ${accessToken}` },
              }
            );
            alert("Payment Successful!");
            window.location.reload();
          } catch (err) {
            console.log(err);
            alert("Payment verification failed.");
          }
        },
        prefill: 
        { name: "Abdurrahman Khan", 
          email: "abdur@example.com", 
          contact: "9999999999" },
        theme: 
        { color: "#2563eb" },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.log(err);
      alert("Error creating payment. Try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectAll) {
      const allStudentIds = filterStudent.map((s) => s.student_id);
      const allBatchIds = filterStudent.map((s) => s.batch_id || "");
      const totalFee = filterStudent.reduce((sum, s) => sum + (s.fee || 0), 0);
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
            <th className="text-end" width="15%">
              Fee
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
                      id={student.student_id}
                      checked={sponsorStudentId.includes(student.student_id)}
                      onChange={(e) => handleCheckboxClick(e, student.student_id, student.batch_id)}
                    />
                    <label
                      className="form-check-label text-nowrap"
                      htmlFor={student.student_id}
                    >
                      {student.student_name}
                    </label>
                  </div>
                </td>
                <td className="text-nowrap">{`${student.batch_name || ""} ${student.batch_id || ""}`}</td>
                <td className="text-end">₹{student.fee || 0}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">No students found.</td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr className="fixedTableBottom">
            <th>Total: {countStudent}</th>
            <th>
              <button className="btn btn-primary w-full" 
              onClick={handleSponsorship}>
                {loading ? <span className="fas fa-spinner fa-spin me-2"></span> : "Sponsor Selected"}
              </button>
            </th>
            <th className="text-end">₹{totalAmount}</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
