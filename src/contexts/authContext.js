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
  const [trainers, setTrainers] = useState([]);



  // const API_BASE_URL = "https://techie01.pythonanywhere.com/auth";
  const API_BASE_URL = "https://gl8tx74f-8000.inc1.devtunnels.ms/auth";


  // Initialize auth state from localStorage
  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");
    const storedRefreshToken = localStorage.getItem("refreshToken");
    const storedUserID = localStorage.getItem("userID");
    const storedRole = localStorage.getItem("role");
    const storedSubrole = localStorage.getItem("subrole");

    if (storedAccessToken && storedRefreshToken && storedUserID && storedRole) {
      setAccessToken(storedAccessToken);
      setRefreshToken(storedRefreshToken);
      setUserID(storedUserID);
      setRole(storedRole);
      setResponseSubrole(storedSubrole);
      setUserLoggedIN(true);
    }
  }, []);

  // Set up Axios interceptors
  useEffect(() => {
    // Request interceptor to add auth token to headers
    const requestInterceptor = axios.interceptors.request.use(
      config => {
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      error => Promise.reject(error)
    );

    // Response interceptor to handle token refresh
    const responseInterceptor = axios.interceptors.response.use(
      response => response,
      async error => {
        const originalRequest = error.config;
        
        // If error is 401 and we haven't already retried
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          
          try {
            const newAccessToken = await GenerateNewAccessToken();
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return axios(originalRequest); // Retry the original request
          } catch (refreshError) {
            // If refresh fails, logout the user
            LogoutUser();
            return Promise.reject(refreshError);
          }
        }
        
        return Promise.reject(error);
      }
    );

    return () => {
      // Clean up interceptors when component unmounts
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [accessToken, refreshToken]);

  useEffect(() => {
    const fetchTrainers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/trainers/` , {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (response.status === 200) {
          setTrainers(response.data.first_name + " " + response.data.last_name);
        }
      } catch (error) {
        console.error("Error fetching trainers:", error);
      } finally {
        setLoading(false);
      }
    };

    if (accessToken) {
      fetchTrainers();
    }
  }, [accessToken])

const RegisterUser = async (userData) => {
  setLoading(true);
  setUserCreatedSuccessfully(false);
  setEmailAlreadyCreated(false); 
  try {
    const config = {
      headers: {
        'Content-Type': userData instanceof FormData ? 'multipart/form-data' : 'application/json'
      }
    };

    const response = await axios.post(
      `${API_BASE_URL}/register/`, 
      userData, 
      config
    );
    

    if (response.status >= 200 && response.status < 300) {
      window.alert('User created successfully');
      setUserCreatedSuccessfully(true);
      return { success: true, data: response.data };
    }
    
    return { success: false, data: response.data };
    
  } catch (error) {
    // Handle email exists error
    if (error.response?.data?.email?.includes('already exists')) {
      setEmailAlreadyCreated(true);
    }
    
    console.error('Registration error:', error);
    return { 
      success: false, 
      error: error.response?.data || error.message,
      status: error.response?.status 
    };
    
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
        setUserLoggedIN(true);
        return response.data;
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.non_field_errors?.[0] ||
        "Login failed. Please try again.";

      setLoginError(errorMessage);
      console.error("Login Error:", error.response?.data);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const GetUser = async () => {
    if (!accessToken) return;
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
    setRole(null);
    setResponseSubrole(null);
    setUser(null);
  };

  const GenerateNewAccessToken = async () => {
    if (!refreshToken) {
      LogoutUser();
      throw new Error("No refresh token available");
    }
    
    try {
      const response = await axios.post(`${API_BASE_URL}/login/refresh/`, {
        refresh: refreshToken
      });
      
      if (response.data.access) {
        const newAccessToken = response.data.access;
        setAccessToken(newAccessToken);
        localStorage.setItem("accessToken", newAccessToken);
        return newAccessToken;
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
      LogoutUser();
      throw error;
    }
  };

  // Fetch user data when accessToken or userID changes
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
    GenerateNewAccessToken,
    trainers,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
