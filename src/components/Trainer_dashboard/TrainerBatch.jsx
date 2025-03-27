import React, { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TrainerImage from "../../assets/images/trainers/Trainer.jpg";

const TrainerBatch = () => {
  const [batches, setBatches] = useState([]);
  const navigate = useNavigate();

  // Fetch batch data from the API
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    const fetchBatches = async () => {
      try {
        const response = await axios.get(
          "https://gl8tx74f-8000.inc1.devtunnels.ms/auth/trainers/batches/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        setBatches(response.data.data);
      } catch (error) {
        console.error("Error fetching batch data:", error);
      }
    };

    fetchBatches();
  }, []);

  // Function to handle card click
  const handleCardClick = (batchId) => {
    console.log(batches);
    console.log("Navigating to batch ID:", batchId);
    navigate(`/TrainerBatchDetail/${batchId}`); // Navigate to /TrainerBatchDetail with batch ID
  };

  return (
    <>
      <div>
        <Card title="Assigned Batches" className="custom-cardH3 m-5 text-black">
          <h3 className="m-0 text-black">For Trainer</h3>
        </Card>

        {/* Flex container with wrapping */}
        <div className="flex flex-wrap gap-5 m-5">
          {/* Map over the batches array to render multiple cards */}
          {batches.map((batch) => (
            <div
              key={batch.batch_id} // Use batch ID as the key
              className="card trainer-batch-cardH2 w-1/4 min-w-[250px]"
              onClick={() => handleCardClick(batch.batch_id)} // Pass batch ID to handleCardClick
              style={{ cursor: "pointer" }} // Change cursor to pointer to indicate clickability
            >
              <img
                src={TrainerImage}
                className="card-img-topH2"
                alt={batch.batch_name}
              />
              <div className="card-bodyH2">
                <h5 className="card-titleH2">{batch.batch_name}</h5>
                <p className="card-textH2">
                  Current Students: {batch.student_count}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TrainerBatch;
