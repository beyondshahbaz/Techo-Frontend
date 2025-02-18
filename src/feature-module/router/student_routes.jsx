import Profile from "../students/Profile"
import StudentDasboard from "../mainMenu/studentDashboard";
import StudentDetails from "../peoples/students/student-details/studentDetails";





export const Student = [
  {
    path: "/student/dashboard",
    element: <StudentDasboard />,
  },
    // {
    //   path: "/student/profile",
    //   element: <Profile />,
    // },
    {
      path: "/student/profile",
      element: <StudentDetails />,
    },
  ]