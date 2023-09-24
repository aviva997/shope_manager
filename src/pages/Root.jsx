import { Outlet } from "react-router-dom";
import Navbar from "../components/sections/Navbar";
import MainNavbar from "../components/sections/MainNavbar";
import {AuthContext} from '../contexts/AuthContext';
import { useContext } from "react";

const Root = ()=>{
    const {isAuthenticated} =  useContext(AuthContext)

    return (
        <>
        {isAuthenticated && <><MainNavbar/> <Navbar/></>}
        <Outlet/>
        
        </>
    )

}

export default Root