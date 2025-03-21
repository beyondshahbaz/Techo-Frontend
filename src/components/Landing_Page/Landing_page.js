import { Footer } from "./Footer";
import { Centers } from "./Centers";
import { Technologies } from "./Technologies";
import { Trainers } from "./Trainers";
import { Projects } from "./Projects";
import { Testimonials } from "./Testimonials";
import { Carausel } from "./Carausel";
import { useNetworkCheck } from "../../contexts/NetworkContext";

export const Landing_page = () => {
  const { isOnline } = useNetworkCheck();

  const handleRetry = () => {
    window.location.reload(); 
  };

  return (
    <>
      {!isOnline ? (
        <div className="alert alert-danger text-center">
          You are offline! Please check your internet connection.
          <button className="btn btn-primary ms-3" onClick={handleRetry}>
            Retry
          </button>
        </div>
      ) : (
        <div>
          <Carausel />
          <div className="row mx-2 my-3">
            <div className="text-primary">
              <hr />
            </div>
            <h1>Our Centers</h1>
            <Centers />
            <div className="text-primary">
              <hr />
            </div>
            <h1>Technologies we teach</h1>
            <Technologies />
            <div className="text-primary">
              <hr />
            </div>
            <h1>Our Trainers</h1>
            <Trainers />
            <div className="text-primary">
              <hr />
            </div>
            <h1>Our Projects</h1>
            <Projects />
            <div className="text-primary">
              <hr />
            </div>
            <h1>Testimonials</h1>
            <Testimonials />
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};
