import { Flex, Spinner } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useParams } from 'react-router-dom';
import EditCustomersForm from '../../components/partials/customers/EditCustomersForm';
const EditCustomers = () => {

  const {id} = useParams();
  const[customer,setCustomer] = useState([]);
  const [loading, setLoading] = useState(false);
  const[error, setError] = useState(null);

  useEffect(()=>{

    const customerDate = async() =>{
      try{
        setLoading(true)
        const res = await axios.get(`https://shope-server.onrender.com/users/manager/get-customer-by-id/${id}`);
        setCustomer(res.data.customer)

      }catch(error){
        setError(error)

      }finally{
        setLoading(false)
      }
    }
    customerDate();
  },[])

  

  return (
    <Flex 
      style={{flex:5}}
      margin="2.5vh"
      w="100%"
      >
      {loading && <Spinner/>}
      {error && <p>{error}</p>}
      {customer && <EditCustomersForm data={customer}/>}

    </Flex>
  )
}

export default EditCustomers