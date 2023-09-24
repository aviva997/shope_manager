import { Container ,Box,Heading,FormControl,FormLabel,Input, Divider, Text, UnorderedList, ListItem, Button, Select, Image,Flex, Spinner} from '@chakra-ui/react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddCustomersForm = () => {

  const navigate = useNavigate()
  const [values, setValues] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone:"",
  });
  const[loading, setLoading] = useState(false);


  const handelChange = (e)=>{
    const {name, value} = e.target;
    setValues(()=>({...values, [name]:value}))

  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
      setLoading(true);
      const res = await axios.post('https://shope-server.onrender.com/users/manager/add-user-from-manager',values);
  
      toast.success(res.data.message, {
        position: "top-center",
        theme: "colored",
        autoClose: 1000,
      })
      setLoading(false);
      navigate("../");
    }catch(error){
      toast.error('error', {
        position: "top-center",
        theme: "colored",
        autoClose: 1000,
      });

    }finally {
      setLoading(false);
    }



  }

  return (
    <>
      <Container  maxW="container.xl" boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.10)" p={10}  margin="0" w="100%" >
            <Heading>Add Customer </Heading>
            <Flex mt={10}>
            <Box as="form" mt={10} padding={4} w="100%" onSubmit={handleSubmit}>
    
              <FormControl id="customer_name" isRequired>
                  <FormLabel htmlFor="customer_name">Customer Name</FormLabel>
                  <Input
                    w='70%'
                    name="customer_name"
                    onChange={handelChange}
                    type="text"
                  />
              </FormControl>
    
              <FormControl id="customer_email" isRequired  marginTop={4}>
                  <FormLabel htmlFor="customer_email">Customer Email</FormLabel>
                  <Input
                    w='70%'
                    name="customer_email"
                    onChange={handelChange}
                    type="text"
                  />
              </FormControl>

              <FormControl id="customer_password" isRequired  marginTop={4}>
                  <FormLabel htmlFor="customer_password">Customer Password</FormLabel>
                  <Input
                    w='70%'
                    name="customer_password"
                    onChange={handelChange}
                    type="text"
                  />
              </FormControl>
    
              <FormControl id="customer_phone" isRequired  marginTop={4}>
                  <FormLabel htmlFor="product_description">Customer Phone</FormLabel>
                  <Input
                    w='70%'
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

export default AddCustomersForm