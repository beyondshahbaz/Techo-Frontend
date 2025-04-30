import { useContext } from "react";
import user from "../../assets/images/trainers/user.png";
import { SponsorContext } from "../../contexts/dashboard/sponsorDashboardContext";

export const Trainers = () => {
  const { trainerDetails } = useContext(SponsorContext);
  
  return (
    <div className="col-xxl-12 col-xl-12 col-md-12 px-0">
      <div className="scrollbar-wrappercenter">
        <div className="row mx-0 flex-nowrap">
          {trainerDetails.map((trainer) => (
            <div className="col-xxl-3 col-xl-3 col-md-3" key={trainer.id}>
              <div className="card">
                <img 
                  src={trainer.user_profile || user} 
                  alt={`${trainer.first_name} ${trainer.last_name}`} 
                  className="cardImage" 
                  onError={(e) => {
                    e.target.src = user; 
                  }}
                />
                <div className="card-body min-bodyHeight">
                  <h2>{trainer.first_name} {trainer.last_name}</h2>
                  <p className="trainer-skills">
                    <i className="fa-solid fa-star text-warning me-1"></i>
                    {trainer.job_title}
                  </p>
                  <p className="card-text">
                    <span className="fw-bold">Technology:</span>{" "}
                    {trainer.technologies?.join(", ") || "Not specified"}
                  </p>
                  <p className="card-text">
                    <span className="fw-bold">Skills:</span>{" "}
                    {trainer.required_skills || "Not specified"}
                  </p>
                  <p className="card-text">
                    <span className="fw-bold">Experience:</span>{" "}
                    {trainer.experience ? `${trainer.experience} years` : "Not specified"}
                  </p>
                  <p className="card-text">
                    <span className="fw-bold">Qualification:</span>{" "}
                    {trainer.qualification || "Not specified"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};