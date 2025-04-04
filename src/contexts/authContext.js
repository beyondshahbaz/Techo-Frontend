import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userLoggedIN, setUserLoggedIN] = useState(false);
  const [userCreatedSuccessfully, setUserCreatedSuccessfully] = useState(false);
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [userID, setUserID] = useState(null);
  const [role, setRole] = useState(null);
  const [responseSubrole, setResponseSubrole] = useState(null);
  const [newSubrole, setNewSubRole] = useState([]);
  const [loading, setLoading] = useState(false);
  const [emailAlreadyCreated, setEmailAlreadyCreated] = useState(false);

  const [loginError, setLoginError] = useState("");

  const API_BASE_URL = "https://techie01.pythonanywhere.com/auth";
  // const API_BASE_URL = "https://gl8tx74f-8000.inc1.devtunnels.ms/auth";
  // const API_BASE_URL = "https://p9777pv7-8000.inc1.devtunnels.ms/auth";


  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");
    const storedRefreshToken = localStorage.getItem("refreshToken");
    const storedUserID = localStorage.getItem("userID");
    const storedRole = localStorage.getItem("role");

    if (storedAccessToken && storedRefreshToken && storedUserID && storedRole) {
      setAccessToken(storedAccessToken);
      setRefreshToken(storedRefreshToken);
      setUserID(storedUserID);
      setRole(storedRole);
      setUserLoggedIN(true);
    }
  }, []);

  const RegisterUser = async (userData) => {
    setLoading(true);
    setUserCreatedSuccessfully(false);
    try {
      // Determine if we're sending FormData (file upload) or JSON
      const isFormData = userData instanceof FormData;
      
      const config = {
        headers: {
          'Content-Type': isFormData ? 'multipart/form-data' : 'application/json'
        }
      };
  
      const response = await axios.post(
        `${API_BASE_URL}/register/`, 
        userData, 
        config
      );
  
      if (response.status === 200) {
        setUserCreatedSuccessfully(true); 
        window.alert("User Created Successfully");
      }
      return response.data;
    } catch (error) {
      if(error.response?.data?.email?.[0] === 'user with this email already exists.'){
        setEmailAlreadyCreated(true);
      }
      console.log('Registration error:', error);
      
      // Handle file upload specific errors
      if (error.response?.status === 400 && error.response?.data?.user_profile) {
        throw new Error(error.response.data.user_profile.join(', '));
      }
      

      throw error;
    } finally {
      setLoading(false);
    }
  };

    const LoginUser = async (userData) => {
      setLoginError("");
      setLoading(true);
      try {
        const response = await axios.post(`${API_BASE_URL}/login/`, userData, {
          headers: { "Content-Type": "application/json" },
        });

        setAccessToken(response.data.access);
        setRefreshToken(response.data.refresh);
        setUserID(response.data.user_id);
        setResponseSubrole(response.data.subrole);
        setRole(response.data.role);
        localStorage.setItem("accessToken", response.data.access);
        localStorage.setItem("refreshToken", response.data.refresh);
        localStorage.setItem("userID", response.data.user_id);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("subrole", response.data.subrole);

        if (response.status === 200) {
          console.log('data', response.data);

          setUserLoggedIN(true);
          return response.data;
        }
      } catch (error) {

        setLoginError(error.response.data.non_field_errors[0]);
        throw error;
      } finally {
        setLoading(false);
      }
    };

  const GetUser = async () => {
    if (!accessToken) {

      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/User/${userID}`);
     
      
      if (response.status === 200) {
        setUser(response.data);
      }
    } catch (error) {
      console.error("GetUser Error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchNewSubrole = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/SubRole/`);
      
      if (response.status === 200) {
        console.log("Subroles fetched successfully:", response.data);


        setNewSubRole(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const LogoutUser = async () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userID");
    localStorage.removeItem("role");
    localStorage.removeItem("subrole");
    setUserLoggedIN(false);
    setAccessToken(null);
    setRefreshToken(null);
    setUserID(null);
  };

  useEffect(() => {
    if (accessToken && userID) {
      GetUser();
    }
  }, [accessToken, userID]);

  const value = {
    user,
    RegisterUser,
    LoginUser,
    GetUser,
    accessToken,
    refreshToken,
    newSubrole,
    fetchNewSubrole,
    userID,
    role,
    userLoggedIN,
    setUserLoggedIN,
    loading,
    LogoutUser,
    loginError,
    userCreatedSuccessfully,
    responseSubrole,
    emailAlreadyCreated,
    setLoginError,
    API_BASE_URL,
  };

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
