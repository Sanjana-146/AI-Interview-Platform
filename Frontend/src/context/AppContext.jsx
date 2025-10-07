import { useState , useEffect } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";


export const AppContext = createContext()

export const AppContextProvider = (props)=>{

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [isLoggedIn , setIsLoggedIn] = useState(false)
    const [user , setUser] = useState(null)
    const [isLoading  , setIsLoading] = useState(true);

    const navigate = useNavigate();

  // 1. Moved the function definition here, so it's in the component's scope
    const checkAuthStatus = async () => {
        try {
            const response = await fetch(`${backendUrl}/api/user/Me`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include", // This is crucial to send the httpOnly cookie
            });

            // If the server says Unauthorized, we know the user is not logged in.
            if (response.status === 401) {
                setIsLoggedIn(false);
                setUser(null);
                return; // Stop execution here
            }

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
        } finally {
            setIsLoading(false);
        }
    };
    
    // This effect runs once when the app starts to check for a valid session cookie
    useEffect(() => {
        // 2. Now we just call the function here
        checkAuthStatus();
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
      // navigate("/");
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
    isLoading,
    logout,
    checkAuthStatus
  };

    return(
        <AppContext.Provider value={value}>
            {!isLoading && props.children}
        </AppContext.Provider>
    )
}