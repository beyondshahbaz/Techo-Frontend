import { useContext, useEffect, useState } from "react";
import bgSponser from "../../assets/images/sponserDashboard/bgSponser.png";
import { Student_Card } from "./Student_Card";
import { SponsorContext } from "../../contexts/dashboard/sponsorDashboardContext";

export const Students_SponserDashboard = () => {
  const { usersDataToSponsor, batchName } = useContext(SponsorContext);
  const [searchStudent, setSearchStudent] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("Filter Batch");

  const [selectAll, setSelectAll] = useState(false); 




  const filterStudent = usersDataToSponsor.filter((student) => {
    const matchesName = student.student_name
      .toLowerCase()
      .includes(searchStudent.toLowerCase());
    const matchesBatch =
      selectedBatch === "Filter Batch" ||
      student.batch_name.toLowerCase().includes(selectedBatch.toLowerCase());

    return matchesName && matchesBatch;
  });

  const handleSponsorClick = () => {
    const studentsSection = document.getElementById("studentsSection");
    if (studentsSection) {
      studentsSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleSelectAll = () => {
    setSelectAll((prev) => !prev); 
  };



  return (
    <div className="row studentDashboardContainer mx-0">
      <div className="col-xxl-12 col-xl-12 col-md-12 bgSponserDashobard">
        <div className="innerContainerSponsor">
          <img src={bgSponser} className="sponserImgDashboard" />
          <div className="p-3">
            <h1>Sponsor Dashboard</h1>
            <p>
              Empower students by providing financial assistance and mentorship.
              Track sponsorship details, student progress, and impact in one
              place.
            </p>
            <button className="sponserButton" onClick={handleSponsorClick}>
              EXPLORE STUDENTS
            </button>
          </div>
        </div>
      </div>
      <div className="col-xxl-12 col-xl-12 col-md-12 ">
        <div className="row g-2 sponsorHeader">
        <div className="col-xxl-2 col-xl-2 col-xl-2">
            <div class="dropdown w-100 mb-0">
              <button
                class="btnDropdown dropdown-toggle form-control bg-primary"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Select Students
              </button>
              <ul class="dropdown-menu w-100">  
              <li className="dropdown-item c-pointer" onClick={handleSelectAll}>
                  {selectAll ? "Deselect All" : "Select All"}
                </li>
              </ul>
            </div>
          </div>

          <div className="col-xxl-3 col-xl-3 col-xl-3">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search Student"
                className="search-input mb-0"
                value={searchStudent}
                onChange={(e) => setSearchStudent(e.target.value)}
              />
              <i className="fas fa-search search-icon"></i>
            </div>
          </div>
          <div className="col-xxl-3 col-xl-3 col-xl-3  ms-auto">
            <div class="dropdown w-100 mb-0">
              <button
                class="btnDropdown dropdown-toggle form-control"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {selectedBatch}
              </button>
              <ul class="dropdown-menu w-100">
                {batchName.map((batches, index) => (
                  <li
                    className="dropdown-item c-pointer"
                    key={index}
                    onClick={() => setSelectedBatch(batches.batch_name)}
                  >
                    {batches.batch_name}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
        <h1 className="sponsornowHeading" id="studentsSection">
          Students
        </h1>
        <Student_Card
          filterStudent={filterStudent}
          selectAll = {selectAll}
          setSelectAll = {setSelectAll}

        />
      </div>
    </div>
  );
};
