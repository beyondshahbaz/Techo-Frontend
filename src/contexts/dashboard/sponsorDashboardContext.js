import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const SponsorContext = createContext();


const SponsorDashboardProvider = ({ children }) => {

    const [usersDataToSponsor, setUserDataToSponsor] = useState([]);
    const [batchName, setBatchName] = useState([]);


    // const base_api = "https://techie01.pythonanywhere.com/auth";
    const base_api = "https://gl8tx74f-8000.inc1.devtunnels.ms/auth";

    const GET_ALL_STUDENTS_TO_SPONSER = async ()=>{
        try {
        const response = await axios.get(`${base_api}/sponsers/1/available_students/`);          
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
        const response = await axios.get(`${base_api}/batches`);

        if(response.status == 200){
          setBatchName(response.data);
        }
      } catch (error) {
        console.log(error);
        // throw error;
      }
    }
    useEffect(()=>{
        GET_ALL_STUDENTS_TO_SPONSER();
        GET_BATCH();
    }, []);





  const value = {
    usersDataToSponsor,
    batchName
  };

  return (
    <SponsorContext.Provider value={value}>
      {children}
    </SponsorContext.Provider>
  );
};

export default SponsorDashboardProvider;