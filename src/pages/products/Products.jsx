import React, { useEffect, useState } from 'react'
import ProductsTable from '../../components/partials/products/ProductsTable'
import { Flex } from '@chakra-ui/react'
import useFetchGet from '../../hooks/useFetchGet';
import axios from 'axios';
import { useCookies } from "react-cookie";



const productUrl = 'https://shope-server.onrender.com/products/product/get-product-manager'
const Products = () => {
    const [cookies] = useCookies(["token"]);

    const [products, setProducts] = useState([])

    const  [data, loading,error] = useFetchGet(productUrl,{
        Authorization:`Bearer ${cookies.token}`
    })

    const deleteProduct = async (id)=>{
        try{
            const response= await axios.delete(`https://shope-server.onrender.com/products/product/delete-product-by-id-manager/${id}`)
            data.all_product = data.all_product.filter((product) => product._id !== id);
            setProducts(data.all_product);
        }catch(error){
            console.log(error.message)

        }

    }
    useEffect(()=>{
        if(data){
            setProducts(data.all_product)
        }

    },[data])

    if(loading){
        return <span>loading ...</span>
    }
    if(error){
        return <span>{error.message}</span>
    }

   
  return (
    <Flex style={{flex:5}}
        margin="2.5vh"
        w="100%"
   >
        {products&& (<ProductsTable data={products} deleteProduct={deleteProduct}/>)}
    </Flex>
  )
}

export default Products