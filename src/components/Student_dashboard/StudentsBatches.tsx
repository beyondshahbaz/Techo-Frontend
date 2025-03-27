import React, { useState, useEffect } from "react";
import axios from "axios";

interface Batch {
  batch_name: string;
  start_date: string;
  trainer: string;
  duration: string;
  technoLogies: number[];
}

const StudentsBatches: React.FC = () => {
  const [batches, setBatches] = useState<Batch[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://gl8tx74f-8000.inc1.devtunnels.ms/auth/batches/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);

        if (response.data && Array.isArray(response.data)) {
          setBatches(response.data[2] ? [response.data[2]] : []);
        } else {
          setBatches([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setBatches([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const mapTechnologies = (techIds: number[]): string => {
    const techMap: { [key: number]: string } = {
      1: "Python",
      2: "Django",
      3: "Fastapi",
      4: "MYSQL",
      5: "Java",
      6: "JavaScript",
      7: "AI/ML",
      8: "React",
      9: "Nodejs",
    };

    return techIds.map((id) => techMap[id] || "Unknown").join(", ");
  };

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="batches-containerHSB">
      <h1 className="batches-titleHSB">Students Batch</h1>
      <div className="batches-gridHSB">
        {batches.map((batch, index) => (
          <div key={index} className="batch-cardHSB">
            <div className="batch-card-headerHSB">
              <h2 className="batch-nameHSB">{batch.batch_name}</h2>
            </div>
            <div className="batch-card-bodyHSB">
              <div className="batch-infoHSB">
                <p>
                  <strong>Start Date:</strong> {batch.start_date}
                </p>
                <p>
                  <strong>Trainer:</strong> {batch.trainer}
                </p>
                <p>
                  <strong>Duration:</strong> {batch.duration}
                </p>
                <p>
                  <strong>Technologies:</strong>{" "}
                  {mapTechnologies(batch.technoLogies)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentsBatches;
