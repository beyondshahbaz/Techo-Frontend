import React, { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";

const AllTrainer = () => {
  const { allTrainer, error, loading } = useContext(AuthContext);

  const trainerData = allTrainer;

  if (loading) {
    return (
      <div className="loading-minimal">
        <div className="dot-flashing"></div>
        <span className="ml-4">Loading trainers...</span>
      </div>
    );
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="student-info-containerS">
      <h2 className="table-titleS uppercase">Trainer Information</h2>
      <div className="table-wrapperS">
        <table className="student-tableS">
          <thead>
            <tr>
              <th>Name</th>
              <th>Job Title</th>
              <th>Experience</th>
              <th>Technologies</th>
              <th>Batches - Centers</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Gender</th>
            </tr>
          </thead>
          <tbody>
            {trainerData.map((trainer) => (
              <tr key={trainer.id}>
                <td className="student-nameS">
                  {trainer.first_name} {trainer.last_name}
                </td>
                <td>{trainer.job_title}</td>
                <td>{trainer.experience} years</td>
                <td>
                  {trainer.technologies &&
                    trainer.technologies.map((tech, index) => (
                      <span key={index} className="batch-tagS">
                        {tech}
                      </span>
                    ))}
                </td>
                <td className="batchAll-center-container">
                  {trainer.batch_names && trainer.centers ? (
                    <>
                      {trainer.batch_names.map((batch, index) => (
                        <span key={index} className="batchAll-center-tag">
                          <span className="batchAll-name">{batch}</span>
                          {trainer.centers[index] && (
                            <>
                              <span className="separatorAll">→</span>
                              <span className="centerAll-name">
                                {trainer.centers[index]}
                              </span>
                            </>
                          )}
                        </span>
                      ))}
                    </>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td>{trainer.email}</td>
                <td>{trainer.mobile_no || "N/A"}</td>
                <td>{trainer.gender || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllTrainer;
