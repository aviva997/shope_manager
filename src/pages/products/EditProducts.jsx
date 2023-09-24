import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import EditProductsForm from '../../components/partials/products/EditProductsForm';
import axios from 'axios';
import { Flex, Spinner } from '@chakra-ui/react';

const EditProducts = () => {

    const {id} = useParams();
    const [ products, setProducts] = useState([]);
    const[loading, setLoading] = useState(false);
    const[error, setError] = useState(null);
    
    const url = `https://shope-server.onrender.com/products/product/get-product-by-id-manager/${id}`
    useEffect(()=>{
        const getProductsFoeEdit = async()=>{
            try{
                setLoading(true);
                const {data} = await axios.get(url);
                setProducts(data.product);

            }catch(error){
                setError(error.data.message)
            }finally{
                setLoading(false)
            }


        }
        getProductsFoeEdit();
    },[])
  return (
    <>
    <Flex style={{flex:5}}
        margin="2.5vh"
        w="100%"
   >
    {loading && <Spinner/>}
    {error && <sapn>{error}</sapn>}
    {products &&  <EditProductsForm product={products}/>}

   </Flex>
   
    </>
  )
}

export default EditProducts