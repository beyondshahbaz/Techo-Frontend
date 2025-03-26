import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/authContext";
import { SponsorContext } from "../../contexts/dashboard/sponsorDashboardContext";

const Sponsor_Profile = () => {

    const {FetchSponsor} = useContext(SponsorContext);




  useEffect(() => {
    FetchSponsor();
  }, []);



  return (
    <div className="container mt-5">
    </div>
  );
};

export default Sponsor_Profile;