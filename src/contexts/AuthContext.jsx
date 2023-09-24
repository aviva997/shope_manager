import { createContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

export const AuthContext = createContext();

export function AuthProvider({children}){
    const[customer, setCustomer] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const login = async (manager_email,manager_password)=>{
        console.log(manager_email,manager_password)
        try{
            const {data} = await axios.post('https://shope-server.onrender.com/users/manager/login',{
                manager_email,
                manager_password
            })
            if(!data.success){
                throw new Error(`${data.message} : ${data.error}`);
        
              }
           
            setCustomer(data)
            setCookie('token', data.token, {path:"/", maxAge:3600 });

            setIsAuthenticated(true);

            return{
                success: true,
                message:data.message
            }


        }catch(error){
            return {
                success: false,
                message: error.data.error,
              };

        }
    }



    const logout =  async ()=>{
      try{
        await axios.post(`https://shope-server.onrender.com/users/manager/logout`,{
            headers: {
                Authorization: `Bearer ${cookies.token}`
            }
        })

        removeCookie("token");
        setIsAuthenticated(false);
        setCustomer(null);
      
        return{
            success: true,
            message: 'Logout successfuly'
        }

      }catch(error){
        throw new Error(error.response.data.error)
      }

    }
   

    useEffect(()=>{

        console.log('token',cookies.token ? true: false)
        if(cookies.token){
        const authUser = async()=>{
                setLoading(true);
                try{
                    const {data} = await axios.get(`https://shope-server.onrender.com/users/manager/auth`, {
                        headers: {
                            Authorization: `Bearer ${cookies.token}`
                          }
                    })
                    console.log('data', data)
                    setCustomer(data.manager);
                    setIsAuthenticated(true);
                    setCookie("token", data.token, { path:"/", maxAge:10800})
                    


                }catch(error){
                    //removeCookie("token");
                    setIsAuthenticated(false);
                    setError(error)

                }finally{
                    setLoading(false)
                }
        
            }
            
            authUser();
        }


    },[cookies, removeCookie]);
    
   
    

    const value = {
        isAuthenticated,
        customer,
        login,
        logout,
        loading,
        error
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>

}