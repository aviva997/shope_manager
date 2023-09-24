import { Flex, Spinner } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useParams } from 'react-router-dom';
import EditCategoriesForm from '../../components/partials/categories/EditCategoriesForm';
const EditCategory = () => {
  const {id} = useParams();
  const[category,setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const[error, setError] = useState(null);


  useEffect(()=>{

    const categoryDate = async() =>{
      try{
        setLoading(true)
        const res = await axios.get(`https://shope-server.onrender.com/categories/manager/getCategoryById/${id}`);
        setCategory(res.data.category)

      }catch(error){
        setError(error)

      }finally{
        setLoading(false)
      }
    }
    categoryDate();
  },[])
  return (

    <Flex 
      style={{flex:5}}
      margin="2.5vh"
      w="100%"
      >
      {loading && <Spinner/>}
      {error && <p>{error}</p>}
      {category && <EditCategoriesForm data={category}/>}

    </Flex>
  )
}

export default EditCategory