import React from 'react';

const StudentsProfile = () => {
  // Sample student data
  const student = {
    first_name: "hjgg",
    last_name: "khan",
    email: "saasadds@gmail.com",
    password: "gjghj",
    role: 3,
    subrole: 17,
    imageUrl: "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg" // Placeholder image URL
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Left Column: Profile Card */}
        <div className="col-md-4">
          <div className="card shadow-sm">
            <img
              src={student.imageUrl}
              className="card-img-top rounded-circle mx-auto mt-4"
              alt="Student"
              style={{ width: '150px', height: '150px', objectFit: 'cover' }}
            />
            <div className="card-body text-center">
              <h4 className="card-title mb-2">
                {student.first_name} {student.last_name}
              </h4>
              <p className="text-muted mb-3">{student.email}</p>
              <div className="d-grid gap-2">
                <button className="btn btn-primary btn-sm">Edit Profile</button>
                <button className="btn btn-outline-secondary btn-sm">
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Details Section */}
        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-header bg-white">
              <h4 className="mb-0">Student Details</h4>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <span className="fw-bold">First Name</span>
                  <span>{student.first_name}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <span className="fw-bold">Last Name</span>
                  <span>{student.last_name}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <span className="fw-bold">Email</span>
                  <span>{student.email}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <span className="fw-bold">Role</span>
                  <span>{student.role}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <span className="fw-bold">Subrole</span>
                  <span>{student.subrole}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentsProfile;