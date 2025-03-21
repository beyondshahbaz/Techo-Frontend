import {
    createContext,
    useContext,
    useEffect,
    useState,
  } from "react";
  
  const NetworkContext = createContext(null);
  
  export const NetworkProvider = ({ children }) => {
    const [isOnline, setOnline] = useState(navigator.onLine);
  
    useEffect(() => {
      const handleOnline = () => {
        console.log("Online event triggered");
        setOnline(true);
      };
  
      const handleOffline = () => {
        console.log("Offline event triggered");
        setOnline(false);
      };
  
      console.log("Adding event listeners for online/offline");
      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);
  
      // Manually check the network status every 5 seconds
    //   const interval = setInterval(() => {
    //     console.log("Manual check: navigator.onLine =", navigator.onLine);
    //     setOnline(navigator.onLine);
    //   }, 1000);
  
      return () => {
        console.log("Removing event listeners for online/offline");
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
        // clearInterval(interval); // Clean up the interval
      };
    }, []);
  
    return (
      <NetworkContext.Provider value={{ isOnline }}>
        {children}
      </NetworkContext.Provider>
    );
  };
  
  export const useNetworkCheck = () => {
    const context = useContext(NetworkContext);
    if (!context) {
      throw Error("useNetworkCheck must be used inside NetworkProvider");
    }
    return context;
  };