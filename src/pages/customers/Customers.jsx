import React, { useEffect, useState } from 'react';
import useFetchGet from '../../hooks/useFetchGet';
import { Flex } from '@chakra-ui/react';
import CustomersTable from '../../components/partials/customers/CustomersTable'
import axios from 'axios';
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";


const CustomersUrl = 'https://shope-server.onrender.com/users/manager/get-all-customers';

const Customers = () => {
  const [cookies] = useCookies(["token"]);
  const [customers, setCustomers] = useState();

    const deleteCustomer = async (id) => {
        
        try {
          const res = await axios.delete(`https://shope-server.onrender.com/users/manager/delete-customer-by-id/${id}`);
          if (res.data.success) {
            toast.success(res.data.message, {
              position: 'top-center',
              theme: 'colored',
              autoClose: 1000,
            });
            data.customers = data.customers.filter((c) => c._id !== id);
            setCustomers(data.customers);
          }
        } catch (error) {
            console.log('error in delete customer')
            toast.error('error', {
                position: 'top-center',
                theme: 'colored',
                autoClose: 1000,
              });
          
        }
      };
      

    const [data, loading, error] =  useFetchGet(CustomersUrl, {
      Authorization: `Bearer ${cookies.token}`,
    });
    useEffect(()=>{
        if(data){
            setCustomers(data.customers)
        }
    },[data])



    if(loading){
        return <span>loading ...</span>
    }
    if(error){
        return <span>{error.message}</span>
    }

  return (
    <Flex 
    style={{flex:5}}
    margin="2.5vh"
    w="100%"
    >
        {customers && (<CustomersTable data={customers} deleteCustomer={deleteCustomer}/>)}


    </Flex>
  )
}

export default Customers