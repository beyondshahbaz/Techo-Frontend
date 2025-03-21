import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../authContext';


export const SponsorContext = createContext();


const SponsorDashboardProvider = ({ children }) => {

    const [usersDataToSponsor, setUserDataToSponsor] = useState([]);
    const [batchName, setBatchName] = useState([]);
    const [batchId, setBatchId] = useState(null);
    const [readyForRecruitment, setReadyForRecruitment] = useState([]);

    const {API_BASE_URL} = useContext(AuthContext);

    const GET_ALL_STUDENTS_TO_SPONSER = async ()=>{
        try {
        const response = await axios.get(`${API_BASE_URL}/sponsers/1/available_students/`);          

        if(response.status == 200){

            setUserDataToSponsor(response.data.students_to_sponsor);
            console.log('data', response);
        }
        } catch (error) {
            console.log(error);
        }    
    }

    const GET_BATCH = async ()=>{
      try {
        const response = await axios.get(`${API_BASE_URL}/batches/`);

        if(response.status == 200){
          setBatchName(response.data);
          setBatchId(response.data.batch_id);
        }
      } catch (error) {
        console.log('batch error', error);
        // throw error;
      }
    }

    const GET_READY_FOR_RECRUITMENT = async ()=>{
      try {
        const response = await axios.get(`${API_BASE_URL}/recruiter/1/ready_for_recruitment/`);  
        
        if(response.status === 200){
          setReadyForRecruitment(response.data.technologies_usage);
        }
      } catch (error) {
        console.log('readytorecruit error', error);

      }
    }
    useEffect(()=>{
        GET_ALL_STUDENTS_TO_SPONSER();
        GET_BATCH();
        GET_READY_FOR_RECRUITMENT();

    }, []);





  const value = {
    usersDataToSponsor,
    batchName,
    batchId,
    readyForRecruitment

  };

  return (
    <SponsorContext.Provider value={value}>
      {children}
    </SponsorContext.Provider>
  );
};

export default SponsorDashboardProvider;