import React from "react";
import { Card } from "primereact/card";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const TrainerBatch = () => {
  // Hardcoded values
  const imageUrl =
    "https://scienceai.co.in/wp-content/uploads/2024/04/programming-language.png"; // Placeholder image URL
  const batchName = "Java"; // Hardcoded batch name
  const currentStudents = 7; // Hardcoded number of students

  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle card click
  const handleCardClick = () => {
    navigate("/TrainerBatchDetail"); // Navigate to /TrainerBatchDetail
  };

  return (
    <>
      <div>
        <Card title="Assigned Batches" className="custom-cardH3 m-5 text-black ">
          <h3 className="m-0 text-black">For Trainer</h3>
        </Card>

        {/* Flex container with wrapping */}
        <div className="flex flex-wrap gap-5 m-5">
          {/* Each card has a fixed width so only 3 fit per row */}
          <div
            className="card trainer-batch-cardH2 w-1/4 min-w-[250px]"
            onClick={handleCardClick} // Add onClick event handler
            style={{ cursor: "pointer" }} // Change cursor to pointer to indicate clickability
          >
            <img src={imageUrl} className="card-img-topH2" alt={batchName} />
            <div className="card-bodyH2">
              <h5 className="card-titleH2">{batchName}</h5>
              <p className="card-textH2">Current Students: {currentStudents}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrainerBatch;