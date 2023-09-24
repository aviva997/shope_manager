import { Navigate, Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

const PrivateRoutes = ({logged}) => {
   
  const [cookies] = useCookies(["token"]);
  
  if(!logged && !cookies.token) {
    return <Navigate to="/" />
  }
  
  axios.defaults.headers.common["Authorization"] = `Bearer ${cookies.token}`;

  return <Outlet />
}

export default PrivateRoutes