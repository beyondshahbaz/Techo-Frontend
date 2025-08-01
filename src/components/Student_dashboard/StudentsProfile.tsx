// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useForm } from "react-hook-form";
// import { baseURL } from "../../utils/axios";

// interface Student {
//   id: number;
//   batch: string;
//   first_name: string;
//   last_name: string;
//   email: string;
//   mobile_no: string;
//   gender: string;
//   qualification: string;
//   address: string;
//   date_of_birth: string;
//   user_profile: string;
// }

// const StudentsProfile: React.FC = () => {
//   const [student, setStudent] = useState<Student | null>(null);
//   const [editMode, setEditMode] = useState(false);
//   const [image, setImage] = useState<File | null>(null);
//   const [accessToken, setAccessToken] = useState<string>("");

//   const { register, handleSubmit, reset } = useForm<Student>();

//   useEffect(() => {
//     const fetchStudentData = async (token: string) => {
//       try {
//         const response = await axios.get<Student>(
//           `${baseURL}/Students/`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         const studentData = response.data;
//         setStudent(studentData);
//         reset(studentData);
//       } catch (error) {
//         console.error("Error fetching student data:", error);
//       }
//     };
  
//     const token = localStorage.getItem('accessToken');
//     if (token) {
//       setAccessToken(token);
//       fetchStudentData(token);
//     }
//   }, [reset]); 

//   const onSubmit = async (data: Student) => {
//     if (!student || !accessToken) {
//       console.error("Student data or access token is missing");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("first_name", data.first_name);
//     formData.append("last_name", data.last_name);
//     formData.append("email", data.email);
//     formData.append("mobile_no", data.mobile_no);
//     formData.append("gender", data.gender);
//     formData.append("qualification", data.qualification);
//     formData.append("address", data.address);
//     formData.append("date_of_birth", data.date_of_birth);

//     if (image) {
//       formData.append("user_profile", image);
//     }

//     try {
//       await axios.put(
//         `${baseURL}/Students/${student.id}/`,
//         formData,
//         { 
//           headers: { 
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${accessToken}`,
//           } 
//         }
//       );

//       alert("Profile updated successfully!");
//       setEditMode(false);
//       window.location.reload();
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       alert("Failed to update profile. Please try again.");
//     }
//   };

//   if (!student) {
//     return <div className="text-center mt-5">Loading...</div>;
//   }


//   return (
//     <div className="container mt-5">
//       <div className="row">
//         {/* Profile Card */}
//         <div className="col-md-4">
//           <div className="card shadow-sm">
//             <img
//               src={`${baseURL}${student.user_profile}`}
//               className="card-img-top rounded-circle mx-auto mt-4"
//               alt="Student"
//               style={{ width: "150px", height: "150px", objectFit: "cover" }}
//             />
//             <div className="card-body text-center">
//               <h4 className="card-title mb-2 text-black">
//                 {student.first_name} {student.last_name}
//               </h4>
//               <p className="text-muted mb-3 text-black">{student.email}</p>
//               <p className="text-muted mb-3 text-black">
//                 <strong>Batch:</strong> {student.batch}
//               </p>
//               <div className="d-grid gap-2">
//                 <button
//                   className="btn btn-primary btn-sm"
//                   onClick={() => setEditMode(true)}
//                 >
//                   Edit Profile
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Student Details or Form */}
//         <div className="col-md-8">
//           {editMode ? (
//             // Edit Form
//             <div className="card shadow-sm">
//               <div className="card-header bg-white">
//                 <h4 className="mb-0 font-bold text-2xl text-black">
//                   Edit Student Details
//                 </h4>
//               </div>
//               <div className="card-body">
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                   <div className="mb-3">
//                     <label className="form-label fw-bold">First Name</label>
//                     <input
//                       className="form-control"
//                       {...register("first_name")}
//                     />
//                   </div>

//                   <div className="mb-3">
//                     <label className="form-label fw-bold">Last Name</label>
//                     <input
//                       className="form-control"
//                       {...register("last_name")}
//                     />
//                   </div>

//                   <div className="mb-3">
//                     <label className="form-label fw-bold">Email</label>
//                     <input
//                       className="form-control"
//                       {...register("email")}
//                       type="email"
//                     />
//                   </div>

//                   <div className="mb-3">
//                     <label className="form-label fw-bold">Mobile No</label>
//                     <input
//                       className="form-control"
//                       {...register("mobile_no")}
//                     />
//                   </div>

//                   <div className="mb-3">
//                     <label className="form-label fw-bold">Gender</label>
//                     <select className="form-control" {...register("gender")}>
//                       <option value="Male">Male</option>
//                       <option value="Female">Female</option>
//                     </select>
//                   </div>

//                   <div className="mb-3">
//                     <label className="form-label fw-bold">Qualification</label>
//                     <input
//                       className="form-control"
//                       {...register("qualification")}
//                     />
//                   </div>

//                   <div className="mb-3">
//                     <label className="form-label fw-bold">Address</label>
//                     <input className="form-control" {...register("address")} />
//                   </div>

//                   <div className="mb-3">
//                     <label className="form-label fw-bold">Date of Birth</label>
//                     <input
//                       className="form-control"
//                       {...register("date_of_birth")}
//                       type="date"
//                     />
//                   </div>

//                   <div className="mb-3">
//                     <label className="form-label fw-bold">Profile Image</label>
//                     <input
//                       className="form-control"
//                       type="file"
//                       accept="image/*"
//                       onChange={(e) => setImage(e.target.files?.[0] || null)}
//                     />
//                   </div>

//                   <button type="submit" className="btn btn-success me-2">
//                     Save Changes
//                   </button>
//                   <button
//                     className="btn btn-secondary"
//                     onClick={() => setEditMode(false)}
//                   >
//                     Cancel
//                   </button>
//                 </form>
//               </div>
//             </div>
//           ) : (
//             // Student Details View
//             <div className="card shadow-sm">
//               <div className="card-header bg-white">
//                 <h4 className="mb-0 font-bold text-2xl text-black">
//                   Student Details
//                 </h4>
//               </div>
//               <div className="card-body">
//                 <ul className="list-group list-group-flush">
//                   <li className="list-group-item d-flex justify-content-between align-items-center">
//                     <span className="fw-bold text-black font-bold">Batch</span>
//                     <span className="text-black">{student.batch}</span>
//                   </li>
//                   <li className="list-group-item d-flex justify-content-between align-items-center">
//                     <span className="fw-bold text-black font-bold">
//                       First Name
//                     </span>
//                     <span className="text-black">{student.first_name}</span>
//                   </li>
//                   <li className="list-group-item d-flex justify-content-between align-items-center">
//                     <span className="fw-bold text-black font-bold">
//                       Last Name
//                     </span>
//                     <span className="text-black">{student.last_name}</span>
//                   </li>
//                   <li className="list-group-item d-flex justify-content-between align-items-center">
//                     <span className="fw-bold text-black font-bold">Email</span>
//                     <span className="text-black">{student.email}</span>
//                   </li>
//                   <li className="list-group-item d-flex justify-content-between align-items-center">
//                     <span className="fw-bold text-black font-bold">
//                       Mobile No
//                     </span>
//                     <span className="text-black">{student.mobile_no}</span>
//                   </li>
//                   <li className="list-group-item d-flex justify-content-between align-items-center">
//                     <span className="fw-bold text-black font-bold">Gender</span>
//                     <span className="text-black">{student.gender}</span>
//                   </li>
//                   <li className="list-group-item d-flex justify-content-between align-items-center">
//                     <span className="fw-bold text-black font-bold">
//                       Qualification
//                     </span>
//                     <span className="text-black">{student.qualification}</span>
//                   </li>
//                   <li className="list-group-item d-flex justify-content-between align-items-center">
//                     <span className="fw-bold text-black font-bold">
//                       Address
//                     </span>
//                     <span className="text-black">{student.address}</span>
//                   </li>
//                   <li className="list-group-item d-flex justify-content-between align-items-center">
//                     <span className="fw-bold text-black font-bold">
//                       Date of Birth
//                     </span>
//                     <span className="text-black">{student.date_of_birth}</span>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentsProfile;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { baseURL } from "../../utils/axios";

interface Student {
  id: number;
  batch: string;
  first_name: string;
  last_name: string;
  email: string;
  mobile_no: string;
  gender: string;
  qualification: string;
  address: string;
  date_of_birth: string;
  user_profile: string;
}

const StudentsProfile: React.FC = () => {
  const [student, setStudent] = useState<Student | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [accessToken, setAccessToken] = useState<string>("");
  const [loading, setLoading] = useState(false)


  const { register, handleSubmit, reset } = useForm<Student>();

  useEffect(() => {
    const fetchStudentData = async (token: string) => {
      try {
        const response = await axios.get<Student>(
          `${baseURL}/Students/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const studentData = response.data;
        setStudent(studentData);
        reset(studentData);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };
  
    const token = localStorage.getItem('accessToken');
    if (token) {
      setAccessToken(token);
      fetchStudentData(token);
    }
  }, [reset]); 

  const onSubmit = async (data: Student) => {
    setLoading(true)

    if (!student || !accessToken) {
      console.error("Student data or access token is missing");
      return;
    }

    const formData = new FormData();
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("email", data.email);
    formData.append("mobile_no", data.mobile_no);
    formData.append("gender", data.gender);
    formData.append("qualification", data.qualification);
    formData.append("address", data.address);
    formData.append("date_of_birth", data.date_of_birth);

    if (image) {
      formData.append("user_profile", image);
    }

    try {
      await axios.put(
        `${baseURL}/Students/${student.id}/`,
        formData,
        { 
          headers: { 
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          } 
        }
      );

      alert("Profile updated successfully!");
      setEditMode(false);
      window.location.reload();
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }finally {
      setLoading(false)
    }
  };

  if (!student) {
    return (
      <div className="loading-minimal">
        <div className="dot-flashing"></div>
        <span className="ml-4">Loading ...</span>
      </div>
    )
  }


  return (
    <div className="container mt-5">
      <div className="row">
        {/* Profile Card */}
        <div className="col-md-4">
          <div className="card shadow-sm">
            {/* <img
              src={`${baseURL}${student.user_profile}`}
              className="card-img-top rounded-circle mx-auto mt-4"
              alt="Student"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            /> */}
            {student.user_profile ? (
  <img
    src={`${baseURL}${student.user_profile}`}
    className="card-img-top rounded-circle mx-auto mt-4"
    alt="Student"
    style={{ width: "150px", height: "150px", objectFit: "cover" }}
  />
) : (
  <div
    className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center mx-auto mt-4"
    style={{
      width: "150px",
      height: "150px",
      fontSize: "60px",
      fontWeight: "bold",
      textTransform: "uppercase",
    }}
  >
    {student.first_name?.charAt(0)}
  </div>
)}
            <div className="card-body text-center">
              <h4 className="card-title mb-2 text-black">
                {student.first_name} {student.last_name}
              </h4>
              <p className="text-muted mb-3 text-black">{student.email}</p>
              <p className="text-muted mb-3 text-black">
                <strong>Batch:</strong> {student.batch}
              </p>
              <div className="d-grid gap-2">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => setEditMode(true)}
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Student Details or Form */}
        <div className="col-md-8">
          {editMode ? (
            // Edit Form
            <div className="card shadow-sm">
              <div className="card-header bg-white">
                <h4 className="mb-0 font-bold text-2xl text-black">
                  Edit Student Details
                </h4>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-3">
                    <label className="form-label fw-bold">First Name</label>
                    <input
                      className="form-control"
                      {...register("first_name")}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Last Name</label>
                    <input
                      className="form-control"
                      {...register("last_name")}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Email</label>
                    <input
                      className="form-control"
                      {...register("email")}
                      type="email"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Mobile No</label>
                    <input
                      className="form-control"
                      {...register("mobile_no")}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Gender</label>
                    <select className="form-control" {...register("gender")}>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Qualification</label>
                    <input
                      className="form-control"
                      {...register("qualification")}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Address</label>
                    <input className="form-control" {...register("address")} />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Date of Birth</label>
                    <input
                      className="form-control"
                      {...register("date_of_birth")}
                      type="date"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Profile Image</label>
                    <input
                      className="form-control"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImage(e.target.files?.[0] || null)}
                    />
                  </div>

                  {/* <button type="submit" className="btn btn-success me-2">
                    Save Changes
                  </button> */}
                <div className="flex gap-6 "> 
            <button
              className="btn btn-primary w-40"
             
            >
              {loading ? (
                <>
                  <span
                    className="fas fa-spinner fa-spin me-2"
                  ></span>
                  
                </>
              ) : (
                "Save Changes"
              )}
            </button>
                  <button
                    className="btn btn-secondary w-40"
                    onClick={() => setEditMode(false)}
                  >
                    Cancel
                  </button>
                  </div>  
                </form>
              </div>
            </div>
          ) : (
            // Student Details View
            <div className="card shadow-sm">
              <div className="card-header bg-white">
                <h4 className="mb-0 font-bold text-2xl text-black">
                  Student Details
                </h4>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <span className="fw-bold text-black font-bold">Batch</span>
                    <span className="text-black">{student.batch}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <span className="fw-bold text-black font-bold">
                      First Name
                    </span>
                    <span className="text-black">{student.first_name}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <span className="fw-bold text-black font-bold">
                      Last Name
                    </span>
                    <span className="text-black">{student.last_name}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <span className="fw-bold text-black font-bold">Email</span>
                    <span className="text-black">{student.email}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <span className="fw-bold text-black font-bold">
                      Mobile No
                    </span>
                    <span className="text-black">{student.mobile_no}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <span className="fw-bold text-black font-bold">Gender</span>
                    <span className="text-black">{student.gender}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <span className="fw-bold text-black font-bold">
                      Qualification
                    </span>
                    <span className="text-black">{student.qualification}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <span className="fw-bold text-black font-bold">
                      Address
                    </span>
                    <span className="text-black">{student.address}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <span className="fw-bold text-black font-bold">
                      Date of Birth
                    </span>
                    <span className="text-black">{student.date_of_birth}</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentsProfile;