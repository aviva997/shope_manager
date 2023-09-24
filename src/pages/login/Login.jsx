import { Navigate } from "react-router-dom";
import LoginForm from "../../components/partials/LoginForm.jsx";

const Login = ({logged}) => {
    if(logged){
        return <Navigate to="/home"/>
    }
  return (
    <>
    <LoginForm/>
    </>
  )
}

export default Login