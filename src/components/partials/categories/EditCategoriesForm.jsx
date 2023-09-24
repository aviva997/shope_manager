import { Container ,Box,Heading,FormControl,FormLabel,Input, Divider, Text, UnorderedList, ListItem, Button, Select, Image,Flex, Spinner} from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const EditCategoriesForm = ({data}) => {
  const navigate = useNavigate();
  const {category_name} = data;

  const [values, setValues] = useState({ });
  const [loading, setLoading] = useState(false);
  
useEffect(()=>{
  setValues({
    category_name: category_name || '',

   })
   
},[data])


  const handelChange = (e) => {
    const { name, value } = e.target;
    setValues(() => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log('iiiiiiiiiiiiid', data)
      console.log('bbbbbbb',values)
      const response = await axios.put(
        `https://shope-server.onrender.com/categories/manager/updateCategoryById/${data._id}`,
        values
      );

      toast.success(response.data.message, {
        position: "top-center",
        theme: "colored",
        autoClose: 1000,
      });
      setLoading(false);
      navigate("../");

    } catch (error) {
      console.log(error)

      toast.error('error', {
        position: "top-center",
        theme: "colored",
        autoClose: 1000,
      });
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <>
    <Container  maxW="container.xl" boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.10)" p={10}  margin="0" w="100%" >
        <Heading>Edit Category : {values.category_name}</Heading>
        <Flex mt={10}>
        <Box as="form" mt={10} padding={4} w="100%" onSubmit={handleSubmit}>

          <FormControl id="category_name" isRequired>
              <FormLabel htmlFor="category_name">Categoty Name </FormLabel>
              <Input
                w='70%'
                value={values.category_name}
                name="category_name"
                onChange={handelChange}
                type="text"
              />
          </FormControl>
          <Divider w="70%" mt="20px" />

          <Button type="submit" w="70%" h="7vh" marginTop={4} bg="black" color="white" p={15}  >
            Save
          </Button>
         
        </Box>
        {loading && <Spinner color="red"/>}




    </Flex>
    </Container>

    </>
  )
}

export default EditCategoriesForm