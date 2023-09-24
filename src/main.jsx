import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {ChakraProvider} from '@chakra-ui/react';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {AuthProvider} from "./contexts/AuthContext";



ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    <React.StrictMode>
      <AuthProvider>
        <ToastContainer/>
        <App />

      </AuthProvider>
    </React.StrictMode>,
  </ChakraProvider>
)
