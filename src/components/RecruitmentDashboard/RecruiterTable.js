import { useContext } from "react";
import { SponsorContext } from "../../contexts/dashboard/sponsorDashboardContext";

export const RecruiterTable = () => {
  const { recruiterProfileDetails } = useContext(SponsorContext);
  return (
    <div className="px-2">
      <h1 className="sponsornowHeading">
        Recruiters
      </h1>
      <div className="table-responsive maxhTable">
        <table>
          <thead>
            <tr>
              <th className="text-nowrap">User Profile</th>
              <th className="text-nowrap">Name</th>
              <th className="text-nowrap">Company</th>
              <th className="text-nowrap">Email</th>
              <th className="text-nowrap">Gender</th>
              <th className="text-nowrap">Qualification</th>
              <th className="text-nowrap">Mobile</th>
              <th className="text-nowrap">Identity</th>
            </tr>
          </thead>
          <tbody>
            {recruiterProfileDetails.length > 0 ? (
              recruiterProfileDetails.map((profile) => (
                <tr>
                  <td>{profile.image}</td>
                  <td className="text-nowrap">{profile.first_name} {profile.last_name}</td>
                  <td className="text-nowrap">{profile.company_name}</td>
                  <td className="text-nowrap">{profile.email}</td>
                  <td className="text-nowrap">{profile.gender}</td>
                  <td className="text-nowrap">{profile.qualification}</td>
                  <td className="text-nowrap">{profile.mobile_no}</td>
                  <td className="text-nowrap">{profile.identity}</td>
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
