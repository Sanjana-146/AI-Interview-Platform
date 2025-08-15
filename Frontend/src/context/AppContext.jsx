import { useState } from "react";
import { createContext } from "react";

export const AppContext = createContext()

export const AppContextProvider = (props)=>{

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [isLoggendin , setIsLoggedin] = useState(false)
    const [userData , setuserData] = useState(false)
    const value = {
        backendUrl,
        isLoggendin , setIsLoggedin,
        userData , setuserData
    }
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}