import React, { useContext } from "react";
import { SponsorContext } from "../../contexts/dashboard/sponsorDashboardContext";

export const SponsorTable = () => {
  const { sponsorProfileDetails } = useContext(SponsorContext);
  console.log("sponsorProfileDetails", sponsorProfileDetails);

  return (
    <div className="px-2">
      <h1 className="sponsornowHeading">Sponsors</h1>
      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              {/* <th className="text-nowrap">User Profile</th> */}
              <th className="text-nowrap">Name</th>
              <th className="text-nowrap">Company</th>
              <th className="text-nowrap">Email</th>
              <th className="text-nowrap">Gender</th>
              {/* <th className="text-nowrap">Qualification</th> */}
              <th className="text-nowrap">Mobile</th>
              {/* <th className="text-nowrap">Identity</th> */}
              <th className="text-nowrap">Contribution Value</th> 
              <th className="text-nowrap">Contribution Type</th> 
            </tr>
          </thead>
          <tbody>
            {sponsorProfileDetails.length > 0 ? (
              sponsorProfileDetails.map((profile) => (
                <tr>
                  {/* <td>{profile.image}</td> */}
                  <td className="text-nowrap">
                    {profile.first_name} {profile.last_name}
                  </td>
                  <td className="text-nowrap">{profile.company_name}</td>
                  <td className="text-nowrap">{profile.email}</td>
                  <td className="text-nowrap">{profile.gender}</td>
                  {/* <td className="text-nowrap">{profile.qualification}</td> */}
                  <td className="text-nowrap">{profile.mobile_no}</td>
                  {/* <td className="text-nowrap">{profile.identity}</td> */}
                  <td className="text-nowrap">{profile.contribution_value}</td>
                  <td className="text-nowrap">{profile.contribution_type}</td>
                </tr>
              ))
            ) : (
              <tr className="text-center p-3 w-100">
                <td colSpan={8}>No Recruiters Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
