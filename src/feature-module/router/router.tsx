import React from "react";
import { Navigate, Route, Routes } from "react-router";
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
import StudentsBatches from "../../components/Student_dashboard/StudentsBatches";
import TrainerProfile from "../../components/Trainer_dashboard/TrainerProfile";

const ALLRoutes: React.FC = () => {
  const routes = all_routes;
  return (
    <>
      <Routes>
        <Route path="/" element={<Defaultlayout />}>
          <Route path={routes.login3} element={<Login />} />
          <Route path={routes.register3} element={<Register3 />} />
          <Route path="/Students_profile" element={<StudentsProfile />} />
          <Route path="/Students_batches" element={<StudentsBatches/>}/>
          <Route path="/Trainer_profile" element={<TrainerProfile/>}/>
        </Route>

        <Route element={<Feature />}>
          {publicRoutes.map((route, idx) => (
            <Route path={route.path} element={route.element} key={idx} />
          ))}
        </Route>

        <Route element={<AuthFeature />}>
          {authRoutes.map((route, idx) => (
            <Route path={route.path} element={route.element} key={idx} />
          ))}
        </Route>

        {/* ------------------ Students routes --------------- */}
        <Route element={<StudentFeature />}>
          {Student.map((route, idx) => (
            <Route path={route.path} element={route.element} key={idx} />
          ))}
        </Route>
      </Routes>
    </>
  );
};

export default ALLRoutes;
