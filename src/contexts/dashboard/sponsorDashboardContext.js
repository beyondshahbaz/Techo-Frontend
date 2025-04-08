import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "../authContext";


export const SponsorContext = createContext();

const SponsorDashboardProvider = ({ children }) => {
  const [usersDataToSponsor, setUserDataToSponsor] = useState([]);
  const [batchName, setBatchName] = useState([]);
  const [batchId, setBatchId] = useState(null);
  const [readyForRecruitment, setReadyForRecruitment] = useState([]);
  const [sponsorProfileDetails, setSponsorProfileDetails] = useState([]);
  const [recruiterProfileDetails, setRecruiterProfileDetails] = useState([]);
  const { API_BASE_URL, userLoggedIN, accessToken } = useContext(AuthContext);


  const GET_ALL_STUDENTS_TO_SPONSER = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/sponsors/available_students/`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },

        }
      );
      if (response.status == 200) {
        setUserDataToSponsor(response.data.students_to_sponsor);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const GET_BATCH = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/batches/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status == 200) {
        setBatchName(response.data);
        setBatchId(response.data.batch_id);
      }
    } catch (error) {
      console.log("batch error", error);
    }
  };

  const GET_READY_FOR_RECRUITMENT = async () => {
    console.log(accessToken);
    try {
      const response = await axios.get(

        `${API_BASE_URL}/recruiter/ready_for_recruitment/`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }
      );
      if (response.status === 200) {
        setReadyForRecruitment(response.data.technologies_usage);
      }
    } catch (error) {
      console.log("readytorecruit error", error);
    }
  };

  const FetchSponsor = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/sponsors/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status === 200) {
        console.log(response.data);
        setSponsorProfileDetails(response.data);
      }
    } catch (error) {
      console.log("sponsor error", error);
    }
  };
  const FetchRecuiter = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/recruiter/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status === 200) {
        console.log('recruiter data', response.data);
        setRecruiterProfileDetails(response.data);
      }
    } catch (error) {
      console.log("sponsor error", error);
    }
  };

  const fetchAllData = async () => {
    if (userLoggedIN && accessToken) {
      try {
        await Promise.all([
          GET_ALL_STUDENTS_TO_SPONSER(),
          GET_BATCH(),
          GET_READY_FOR_RECRUITMENT(),
          FetchSponsor(),
          FetchRecuiter()
        ]);
      } catch (error) {
        console.log("Error fetching sponsor data:", error);
      }
    }
  };


  useEffect(() => {
    fetchAllData();
  }, [userLoggedIN, accessToken]); // Add both userLoggedIN and accessToken as dependencies

  const value = {
    usersDataToSponsor,
    batchName,
    batchId,
    readyForRecruitment,
    FetchSponsor,
    fetchAllData, // Export if you need to manually refresh data
    sponsorProfileDetails,
    recruiterProfileDetails

  };

  return (
    <SponsorContext.Provider value={value}>{children}</SponsorContext.Provider>
  );
};

export default SponsorDashboardProvider;
