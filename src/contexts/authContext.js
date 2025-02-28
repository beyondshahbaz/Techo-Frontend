  import axios from "axios";
  import { createContext, useEffect, useState } from "react";

  export const AuthContext = createContext();

  const AuthProvider = ({ children }) => {
    const [userLoggedIN, setUserLoggedIN] = useState(false);
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const [userID, setUserID] = useState(null);
    const [newSubrole, setNewSubRole] = useState([]);
    const [loading, setLoading] = useState(false);

    const [loginError, setLoginError] = useState("");


    const API_BASE_URL = "https://techie01.pythonanywhere.com/auth/";


    useEffect(() => {
      const storedAccessToken = localStorage.getItem("accessToken");
      const storedRefreshToken = localStorage.getItem("refreshToken");
      const storedUserID = localStorage.getItem("userID");

      if (storedAccessToken && storedRefreshToken && storedUserID) {
        setAccessToken(storedAccessToken);
        setRefreshToken(storedRefreshToken);
        setUserID(storedUserID);
        setUserLoggedIN(true);
      }
    }, []); 

    const RegisterUser = async (userData) => {
      setLoading(true);
      try {
        const response = await axios.post(`${API_BASE_URL}/register/`, userData, {
          headers: { "Content-Type": "application/json" },
        });

        console.log("Response Data:", response.data);
        return response.data;
      } catch (error) {
        console.error(
          "Registration Error:",
          error.response?.data || error.message
        );
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
        localStorage.setItem("accessToken", response.data.access);
        localStorage.setItem("refreshToken", response.data.refresh);
        localStorage.setItem("userID", response.data.user_id);

        if (response.status === 200) {
          setUserLoggedIN(true);
          return response.data;
        }
      } catch (error) {
        console.log('error', error.response.data.non_field_errors[0]);
        setLoginError(error.response.data.non_field_errors[0]);
        throw error;
      } finally {
        setLoading(false);
      }
    };

    const GetUser = async () => {
      if (!accessToken) {
        console.log("No access token available.");
        return;
      }
      setLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/User/${userID}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
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
        const response = await axios.get(`${API_BASE_URL}/SubRole`);
        if (response.status === 200) {
          setNewSubRole(response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    const LogoutUser = async () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userID');
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

    return (
      <AuthContext.Provider
        value={{
          user,
          RegisterUser,
          LoginUser,
          GetUser,
          accessToken,
          refreshToken,
          newSubrole,
          fetchNewSubrole,
          userID,
          userLoggedIN,
          setUserLoggedIN,
          loading,
          LogoutUser,
          loginError
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };

  export default AuthProvider;
