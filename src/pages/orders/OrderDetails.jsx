import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';

import OrderDetailsForm from '../../components/partials/orders/OrderDetailsForm';
import { Button, Flex, Spinner } from '@chakra-ui/react';
const url = `https://shope-server.onrender.com/orders/order/`;
const OrderDetails = () => {

    const navigate = useNavigate();
    const {id} = useParams();
    const[order, setOrder] = useState(null);
    const[loading, setLoading]= useState(false)

    useEffect(()=>{
        const getOrders = async()=>{
            try{
                setLoading(true)
                const res = await axios.get(`${url}get-order-for-manager/${id}`)
                setOrder(res.data.order);
                setLoading(false)

            }catch(error){
                toast.error('error', {
                    position: "top-center",
                    theme: "colored",
                    autoClose: 1000,
                  });
            }finally{
                setLoading(false)
            }
        }

        getOrders()
    },[])

    const deleteOrder = async(id)=>{
        try{
            const res = await axios.delete(`${url}delete-order-for-manage/${id}`);
            
            toast.success(res.data.message, {
                position: "top-center",
                theme: "colored",
                autoClose: 1000,
            });

        }catch(error){
            toast.error('error', {
                position: "top-center",
                theme: "colored",
                autoClose: 1000,
              });
        }
    }

    const changeStatus = async(id, value)=>{
        try{
            const res = await axios.put(`${url}update-status-order/${id}`,{status:value});
            toast.success(response.data.message, {
                position: "top-center",
                theme: "colored",
                autoClose: 1000
              });
        

        }catch(error){
            toast.error(error.response.data.error, {
                position: "top-center",
                theme: "colored",
                autoClose: 1000
              });
            
        }

    }



  return (
    <Flex
    style={{flex:5}}
    margin="2.5vh"
    w="100%"
    position="relative"

    >
        {loading && <Spinner/>}
        {order&&(
            <>
                <OrderDetailsForm
                order={order}
                changeStatus={changeStatus}
                deleteOrder={deleteOrder}
                />
                <Button
                 variant="outline"
                 style={{
                    position:"absolute",
                    right: 10,
                    top:10
                  }}
                  colorScheme="teal"
                  onClick={()=>{
                    navigate('/orders')
                  }}
                >
                    back
                </Button>
            </>

        )}
    
    </Flex>
  )
}

export default OrderDetails