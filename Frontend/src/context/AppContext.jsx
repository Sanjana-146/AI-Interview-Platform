import { useState , useEffect } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";


export const AppContext = createContext()

export const AppContextProvider = (props)=>{

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [isLoggedIn , setIsLoggedIn] = useState(false)
    const [user , setUser] = useState(null)

    const navigate = useNavigate();

  //  This effect runs once when the app starts to check for a valid session cookie
  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/user/Me`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // This is crucial to send the httpOnly cookie
        });

        const data = await response.json();

        if (data.success) {
          setIsLoggedIn(true);
          setUser(data.user);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      } catch (error) {
        console.error("Error checking user status:", error);
        setIsLoggedIn(false);
        setUser(null);
      }
    };

    checkUserStatus();
  }, []); // The empty array [] ensures this runs only once on mount

  //  Logout function to clear session and state
  const logout = async () => {
    try {
      await fetch(`${backendUrl}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      // Clear state on the frontend
      setIsLoggedIn(false);
      setUser(null);
      navigate("/"); // Redirect to the homepage
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const value = {
    backendUrl,
    isLoggedIn,
    setIsLoggedIn,
    user,
    setUser,
    logout,
  };

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}