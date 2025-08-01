import { Footer } from "./Footer";
import { Centers } from "./Centers";
import { Technologies } from "./Technologies";
import { Trainers } from "./Trainers";
import { Projects } from "./Projects";
import { Testimonials } from "./Testimonials";
import { Carausel } from "./Carausel";
export const Landing_page = () => {
  return (
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
            <h1>Technologies We Teach</h1>
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
            <h1 className="d-none">Testimonials</h1>
            <Testimonials />
          </div>
          <Footer />
        </div>

  );
};
