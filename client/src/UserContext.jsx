import axios from "axios";
import { useEffect, useState, createContext } from "react";



export const UserContext = createContext({});

export const UserContextProvider =  ({children}) =>{
    const [user, setUser] = useState(null);
    const [IsLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(()=>{       //refresh လုပ်ရင် ပျောက်မသွားပဲ 
        if (!user) { 
            axios.get('/profile').then(({data})=>{
                setUser(data);
                setIsLoggedIn(true);
            });
            
        }
    },[])
    return (
    <UserContext.Provider value={{user, setUser, IsLoggedIn}}>
        {children}
    </UserContext.Provider>
    )
};