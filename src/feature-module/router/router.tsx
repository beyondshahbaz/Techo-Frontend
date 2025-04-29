import React, { useContext } from "react";
import { Route, Routes } from "react-router";
import { authRoutes, publicRoutes } from "./router.link";
import { Student } from "./student_routes";
import Feature from "../feature";
import AuthFeature from "../authFeature";
import Login from "../auth/login/login-3";
import Register3 from "../auth/register/register-3";
import StudentFeature from "../studentFeature";
import Defaultlayout from "../../components/Defaultlayout";
import { all_routes } from "./all_routes";
import StudentsProfile from "../../components/Student_dashboard/StudentsProfile";
import { Landing_page } from "../../components/Landing_Page/Landing_page";
import StudentsBatches from "../../components/Student_dashboard/StudentsBatches";
import TrainerProfile from "../../components/Trainer_dashboard/TrainerProfile";
import { Students_SponserDashboard } from "../../components/Sponser_Dashboard/Students_SponserDashboard";
import { AuthContext } from "../../contexts/authContext";
import { RecruitmentDashboard } from "../../components/RecruitmentDashboard/RecruitmentDashboard";
import Sponsor_Profile from "../../components/Sponser_Dashboard/SponsorProfile";

import AdmissionTable from "../../components/Admission_dashboard/Admission_table";
import InterviewCandidate from "../../components/Admission_dashboard/InterviewCandidate";
import AllIntervieweesInformation from "../../components/Admission_dashboard/AllIntervieweesInformation";
import TrainerBatch from "../../components/Trainer_dashboard/TrainerBatch";
import TrainerBatchDetail from "../../components/Trainer_dashboard/TrainerBatchDetail";
import AssessmentTable from "../../components/Assessment_dashboard/AssessmentTable";
import AssessmentCandidte from "../../components/Assessment_dashboard/AssessmentCandidte";
import { Forbidden } from "../../components/Forbidden/Forbidden";
import RecruitmentProfile from "../../components/RecruitmentDashboard/RecruitmentProfile";
import AssignBatch from "../../components/Admission_dashboard/AssignBatch";
import StudentInformation from "../../components/Assessment_dashboard/StudentInformation";



const ALLRoutes: React.FC = () => {
  const routes = all_routes;
  const {userLoggedIN} = useContext(AuthContext);
  const accessToken = localStorage.getItem('accessToken');


  return (
    <Routes>
      <Route path="/" element={<Defaultlayout />}>
        <Route path="" element={<Landing_page />} />
        {userLoggedIN &&  accessToken &&  <Route path="/Students_SponserDashboard" element={<Students_SponserDashboard />} />}
        {userLoggedIN &&  accessToken && <Route path="/ReadyToRecruitDashboard" element={<RecruitmentDashboard/>} />}
        
        <Route path={routes.login3} element={<Login />} />
        <Route path={routes.register3} element={<Register3 />} />
        {userLoggedIN &&  accessToken  && <Route path="/Students_profile" element={<StudentsProfile />} /> } 
        {userLoggedIN &&  accessToken  && <Route path="/Recruitment_Profile" element={< RecruitmentProfile/>} /> } 
        {userLoggedIN &&  accessToken  && <Route path="/Sponsor_Profile" element={<Sponsor_Profile />} /> } 

        {userLoggedIN &&  accessToken  && <Route path="/Students_batches" element={<StudentsBatches />} /> }
        {userLoggedIN &&  accessToken  && <Route path="/Trainer_profile" element={<TrainerProfile />} /> }
        {userLoggedIN &&  accessToken  && <Route path="/Admission_table" element={<AdmissionTable />} /> } 
        {userLoggedIN &&  accessToken  && <Route path="/interview-candidate/:id" element={<InterviewCandidate />} /> } 
        {userLoggedIN &&  accessToken  && <Route path="/AllIntervieweesInformation" element={<AllIntervieweesInformation/>} /> } 
        {userLoggedIN &&  accessToken  && <Route path="/Trainer_batch" element={<TrainerBatch/>} /> } 
        {userLoggedIN &&  accessToken  && <Route path="/TrainerBatchDetail/:batchId" element={<TrainerBatchDetail />} /> }
        {userLoggedIN &&  accessToken  && <Route path="/AssessmentTable" element={<AssessmentTable />} /> }
        {userLoggedIN &&  accessToken  && <Route path="/AssessmentCandidte/:id" element={<AssessmentCandidte />} /> }
        {userLoggedIN &&  accessToken  && <Route path="/AssignBatch" element={<AssignBatch/>} /> }
        {userLoggedIN &&  accessToken  && <Route path="/StudentInformation" element={<StudentInformation/>} /> }
         
         
      </Route>


      {/* Public Routes */}
      <Route element={<Feature />}>
        {publicRoutes.map((route, idx) => (
          <Route path={route.path} element={route.element} key={idx} />
        ))}
      </Route>

      {/* Authenticated Routes */}
      <Route element={<AuthFeature />}>
        {authRoutes.map((route, idx) => (
          <Route path={route.path} element={route.element} key={idx} />
        ))}
      </Route>

      {/* Student Routes */}
      <Route element={<StudentFeature />}>
        {Student.map((route, idx) => (
          <Route path={route.path} element={route.element} key={idx} />
        ))}
      </Route>
    </Routes>

  );
};

export default ALLRoutes;
