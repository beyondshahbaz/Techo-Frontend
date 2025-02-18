import axios from "axios";
import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  const API_BASE_URL = "https://gl8tx74f-8000.inc1.devtunnels.ms/auth";

  const RegisterUser = async (userData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/register/`,
        userData,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Response Data:", response.data);
      return response.data;
    } catch (error) {
      console.error("Registration Error:", error.response?.data || error.message);
      throw error;
    }
  };

  const LoginUser = async (userData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/login/`,
        userData,
        { headers: { "Content-Type": "application/json" } }
      );
      
      setAccessToken(response.data.access);
      setRefreshToken(response.data.refresh);
      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);

      return response.data;
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      throw error;
    }
  };

  const GetUser = async () => {
    try {
      if (!accessToken) {
        console.log("No access token available.");
        return;
      }

      const response = await axios.get(`${API_BASE_URL}/User`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });

      if (response.status === 200) {
        setUser(response.data);
      }
    } catch (error) {
      console.error("GetUser Error:", error.response?.data || error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, RegisterUser, LoginUser, GetUser, accessToken, refreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
