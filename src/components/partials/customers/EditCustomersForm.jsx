import { Container ,Box,Heading,FormControl,FormLabel,Input, Divider, Text, UnorderedList, ListItem, Button, Select, Image,Flex, Spinner} from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const EditCustomersForm = ({data}) => {
  const navigate = useNavigate();
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(false)
  const {
    customer_name,
    customer_email,
    customer_phone,
 } = data;

useEffect(()=>{
  setValues({
    customer_name: customer_name || '',
    customer_email: customer_email || '',
    customer_phone: customer_phone || '',

   })
   
},[data])

const handelChange = (e)=>{
  const {name,value}= e.target;
  setValues(()=>({...values, [name]:value}));
}

const handleSubmit = async (e)=>{
  e.preventDefault();
  try{
    setLoading(true);
    const res =  await axios.put(`https://shope-server.onrender.com/users/manager/update-customer-by-id/${data._id}`,values)
    toast.success(res.data.message, {
      position: "top-center",
      theme: "colored",
      autoClose: 1000,

    })
    setLoading(false);
    navigate('../')
  }catch(error){
    toast.error('error' ,{
      position: "top-center",
      theme: "colored",
      autoClose: 1000,
    })
  }finally{
    setLoading(false)
  }
   
}



  return (
    <>
    <Container  maxW="container.xl" boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.10)" p={10}  margin="0" w="100%" >
        <Heading>Edit Customer Details : {values.customer_name}</Heading>
        <Flex mt={10}>
        <Box as="form" mt={10} padding={4} w="100%" onSubmit={handleSubmit}>

          <FormControl id="customer_name" isRequired>
              <FormLabel htmlFor="customer_name">Customer Name</FormLabel>
              <Input
                w='70%'
                value={values.customer_name}
                name="customer_name"
                onChange={handelChange}
                type="text"
              />
          </FormControl>
          <Divider w="70%" mt="20px" />

          <FormControl id="customer_email" isRequired>
              <FormLabel htmlFor="customer_email">Customer Email</FormLabel>
              <Input
                w='70%'
                value={values.customer_email}
                name="customer_email"
                onChange={handelChange}
                type="text"
              />
          </FormControl>

          <Divider w="70%" mt="20px" />


          <FormControl id="customer_phone" isRequired>
              <FormLabel htmlFor="customer_phone">Customer Phone</FormLabel>
              <Input
                w='70%'
                value={values.customer_phone}
                name="customer_phone"
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

export default EditCustomersForm