import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from "axios";

interface Batch {
  batch_name: string;
  start_date: string;
  trainer: string;
}

const StudentsBatches: React.FC = () => {
  const [batches, setBatches] = useState<Batch[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://gl8tx74f-8000.inc1.devtunnels.ms/auth/batches/"
        );
        console.log(response.data[0]);

        setBatches(response.data[0] ? [response.data[0]] : []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setBatches([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container py-5">
      <h1 className="text-center text-primary mb-4 fs-2">Students Batch</h1>
      <div className="card shadow p-4 border border-danger m-6">
        <div className="table-responsive">
          <DataTable value={batches} loading={loading} className="table table-striped table-bordered fw-bold">
            <Column field="batch_name" header="Batch Name" sortable headerClassName="bg-danger text-white" />
            <Column field="start_date" header="Start Date" sortable headerClassName="bg-danger text-white" />
            <Column field="trainer" header="Trainer" sortable headerClassName="bg-danger text-white" />
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default StudentsBatches;
