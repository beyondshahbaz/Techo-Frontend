import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";

interface Trainer {
  id: number;
  first_name: string;
  last_name: string;
  job_title: string;
  email: string;
  mobile_no: string;
  gender: string;
  qualification: string;
  address: string;
  date_of_birth: string;
  user_profile: string;
}

const TrainerProfile: React.FC = () => {
  const [trainer, setTrainer] = useState<Trainer | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [image, setImage] = useState<File | null>(null);

  const { register, handleSubmit, reset } = useForm<Trainer>();

  useEffect(() => {
    axios
      .get<Trainer[]>("https://gl8tx74f-8000.inc1.devtunnels.ms/auth/trainers/")
      .then((response) => {
        if (response.data.length > 2) {
          const trainerData = response.data[2]; // Ensure index exists
          setTrainer(trainerData);
          reset(trainerData); // Pre-fill the form
        } else {
          console.error("Trainer data is missing.");
        }
      })
      .catch((error) => {
        console.error("Error fetching trainer data:", error);
      });
  }, [reset]);

  const onSubmit = async (data: Trainer) => {
    if (!trainer) return;

    const formData = new FormData();
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("job_title", data.job_title);
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
        `https://gl8tx74f-8000.inc1.devtunnels.ms/auth/trainers/${trainer.id}/`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert("Profile updated successfully!");
      setEditMode(false);
      setTrainer({ ...data, user_profile: trainer.user_profile });
      window.location.reload();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (!trainer) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-3">
      <div className="card shadow-lg border-0 rounded p-4">
        <div className="row align-items-center">
          <div className="col-sm-12 col-md-4 d-flex flex-column align-items-center justify-content-center mb-3">
            <img
              src={`https://gl8tx74f-8000.inc1.devtunnels.ms/auth${trainer.user_profile}`}
              alt="Trainer Profile"
              className="img-thumbnail rounded-circle border border-primary"
              style={{ width: "180px", height: "180px", objectFit: "cover" }}
            />
            <button
              className="btn btn-primary btn-sm w-100 mt-3"
              onClick={() => setEditMode(true)}
            >
              Edit Profile
            </button>
          </div>
          <div className="col-sm-12 col-md-8">
            {editMode ? (
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-sm-6 mb-3">
                    <label className="form-label fw-bold">First Name</label>
                    <input
                      className="form-control"
                      {...register("first_name")}
                    />
                  </div>

                  <div className="col-sm-6 mb-3">
                    <label className="form-label fw-bold">Last Name</label>
                    <input
                      className="form-control"
                      {...register("last_name")}
                    />
                  </div>

                  <div className="col-sm-6 mb-3">
                    <label className="form-label fw-bold">Job Title</label>
                    <input
                      className="form-control"
                      {...register("job_title")}
                    />
                  </div>

                  <div className="col-sm-6 mb-3">
                    <label className="form-label fw-bold">Email</label>
                    <input
                      className="form-control"
                      {...register("email")}
                      type="email"
                    />
                  </div>

                  <div className="col-sm-6 mb-3">
                    <label className="form-label fw-bold">Mobile No</label>
                    <input
                      className="form-control"
                      {...register("mobile_no")}
                    />
                  </div>

                  <div className="col-sm-6 mb-3">
                    <label className="form-label fw-bold">Gender</label>
                    <select className="form-control" {...register("gender")}>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>

                  <div className="col-sm-6 mb-3">
                    <label className="form-label fw-bold">Qualification</label>
                    <input
                      className="form-control"
                      {...register("qualification")}
                    />
                  </div>

                  <div className="col-sm-6 mb-3">
                    <label className="form-label fw-bold">Address</label>
                    <input className="form-control" {...register("address")} />
                  </div>

                  <div className="col-sm-6 mb-3">
                    <label className="form-label fw-bold">Date of Birth</label>
                    <input
                      className="form-control"
                      {...register("date_of_birth")}
                      type="date"
                    />
                  </div>

                  <div className="col-12 mb-3">
                    <label className="form-label fw-bold">Profile Image</label>
                    <input
                      className="form-control"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImage(e.target.files?.[0] || null)}
                    />
                  </div>

                  <div className="col-12 d-flex gap-2">
                    <button type="submit" className="btn btn-success w-100">
                      Save Changes
                    </button>
                    <button
                      className="btn btn-secondary w-100"
                      onClick={() => setEditMode(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <div className="table-responsive">
                <h3 className="fs-3 text-black">
                  <span className="font-bold text-primary">Name </span>:{" "}
                  {trainer.first_name} {trainer.last_name}
                </h3>
                <p className="text-black fs-3 font-bold mb-3">
                  <span className="font-bold text-primary">Job Title </span>:{" "}
                  {trainer.job_title}
                </p>
                <table className="table table-borderless text-dark bg-light p-3 rounded shadow-sm">
                  <tbody>
                    <tr>
                      <th className="text-primary">Email:</th>
                      <td>{trainer.email}</td>
                    </tr>
                    <tr>
                      <th className="text-primary">Mobile:</th>
                      <td>{trainer.mobile_no}</td>
                    </tr>
                    <tr>
                      <th className="text-primary">Gender:</th>
                      <td>{trainer.gender}</td>
                    </tr>
                    <tr>
                      <th className="text-primary">Qualification:</th>
                      <td>{trainer.qualification}</td>
                    </tr>
                    <tr>
                      <th className="text-primary">Address:</th>
                      <td>{trainer.address}</td>
                    </tr>
                    <tr>
                      <th className="text-primary">Date of Birth:</th>
                      <td>{trainer.date_of_birth}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerProfile;
