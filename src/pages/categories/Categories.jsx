import React, { useEffect, useState } from 'react';
import useFetchGet from '../../hooks/useFetchGet';
import { Flex } from '@chakra-ui/react';
import axios from 'axios';
import { toast } from "react-toastify";


import CategoriesTable from '../../components/partials/categories/CategoriesTable';

const categoriesUrl = 'https://shope-server.onrender.com/categories/manager/getAllCategory';

const Categories = () => {

  const [categories, setCategories] = useState();


  const [data, loading, error] =  useFetchGet(categoriesUrl);

  const deleteCategory = async (id) => {
      
      try {
        const res = await axios.delete(`https://shope-server.onrender.com/categories/manager/deleteCategoryById/${id}`);
        if (res.data.success) {
          toast.success(res.data.message, {
            position: 'top-center',
            theme: 'colored',
            autoClose: 1000,
          });
          data.all_categories = data.all_categories.filter((c) => c._id !== id);
          setCategories(data.all_categories);
        }
      } catch (error) {
          console.log('error in delete category')
          toast.error('error', {
              position: 'top-center',
              theme: 'colored',
              autoClose: 1000,
            });
        
      }
    };

    useEffect(()=>{
        if(data){
            setCategories(data.all_categories)
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
        {categories && (<CategoriesTable data={categories} deleteCategory={deleteCategory}/>)}


    </Flex>
  )
}

export default Categories