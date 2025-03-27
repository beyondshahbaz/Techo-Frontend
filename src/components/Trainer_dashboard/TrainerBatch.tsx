import React, { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Define the type for a batch object
interface Batch {
  batch_id: string;
  batch_name: string;
  student_count: number;
}

// Define the type for the API response
interface ApiResponse {
  data: Batch[]; // The actual data is nested inside a `data` property
}

const TrainerBatch = () => {
  const [batches, setBatches] = useState<Batch[]>([]); // Explicitly type the batches state
  const navigate = useNavigate();

  // Fetch batch data from the API
  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await axios.get<ApiResponse>(
          "https://gl8tx74f-8000.inc1.devtunnels.ms/auth/trainers/1/batches/"
        );
        console.log(response);
        setBatches(response.data.data); // Access the nested `data` property
      } catch (error) {
        console.error("Error fetching batch data:", error);
      }
    };

    fetchBatches();
  }, []);

  // Function to handle card click
  const handleCardClick = (batchId: string) => {
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
                src={
                  "https://scienceai.co.in/wp-content/uploads/2024/04/programming-language.png"
                }
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