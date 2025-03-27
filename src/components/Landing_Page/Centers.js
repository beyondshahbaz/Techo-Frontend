import center1 from "../../assets/images/centers/center1.jpeg";
import center2 from "../../assets/images/centers/center2.jpeg";
import center3 from "../../assets/images/centers/center3.jpeg";
import { AllSaints } from "./centers/AllSaints";

import { LGS } from "./centers/LGS";
import { Mecaps } from "./centers/Mecaps";

export const Centers = () => {
  return (
    // <div className="col-xxl-12 col-xl-12 col-md-12 px-0">
    //   <div className="scrollbar-wrappercenter">
    //     <div className="row mx-0 flex-nowrap">
    //       <div className="col-xxl-4 col-xl-4 col-md-4">
    //         <div class="card">
    //           <img src={center1} alt="" className="cardImage" />
    //           <div class="card-body">
    //             <h2>LGS</h2>
    //             <p className="card-text">
    //               {" "}
    //               <span className="fw-bold">Batches:</span>3
    //             </p>
    //             <p className="card-text">
    //               {" "}
    //               <span className="fw-bold">Students:</span>35
    //             </p>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="col-xxl-4 col-xl-4 col-md-4">
    //         <div class="card">
    //           <img src={center2} alt="" className="cardImage" />
    //           <div class="card-body">
    //           <h2>MECAPS</h2>
    //             <p className="card-text">
    //               {" "}
    //               <span className="fw-bold">Batches:</span>4
    //             </p>
    //             <p className="card-text">
    //               {" "}
    //               <span className="fw-bold">Students:</span>67
    //             </p>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="col-xxl-4 col-xl-4 col-md-4">
    //         <div class="card">
    //           <img src={center3} alt="" className="cardImage" />
    //           <div class="card-body">
    //           <h2>All Saints</h2>
    //             <p className="card-text">
    //               {" "}
    //               <span className="fw-bold">Batches:</span>1
    //             </p>
    //             <p className="card-text">
    //               {" "}
    //               <span className="fw-bold">Students:</span>21
    //             </p>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div>
      <div className="row flex-nowrap scrollbar-wrappercenter">
        <div className="col-xxl-4 col-xl-4 col-md-4">
          <div className="card">
            <div className="card-body">
              <LGS />
            </div>
          </div>
        </div>
        <div className="col-xxl-4 col-xl-4 col-md-4">
          <div className="card">
            <div className="card-body">
              <Mecaps />
            </div>
          </div>
        </div>
        <div className="col-xxl-4 col-xl-4 col-md-4">
          <div className="card">
            <div className="card-body">
              <AllSaints />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
