import { Container ,Box,Heading,FormControl,FormLabel,Input, Divider, Text, UnorderedList, ListItem, Button, Select, Image,Flex, Spinner} from '@chakra-ui/react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import avatar from '../../../assets/avatar.png'
import { toast } from 'react-toastify';

const AddProductForm = ()=>{
    const navigate = useNavigate();
    const[catregories, setCategories]= useState([]);
    const[chosenCategories, setChosenCategories] = useState([]);
    const[loading, setLoading] = useState(false);
    const [color, setColor] = useState([]);
    const [size, setSize] = useState([]);

    const [values, setValues] = useState({
        product_name: "",
        product_price: "",
        product_description: "",
        product_image: "",
      });
    

      const handelChange = (e)=>{
        const {name, value} = e.target;
        setValues(()=>({...values, [name]:value}))

      }
      const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);

        setValues({ ...values, product_image : base64 })
      }

      const handelSize = (e)=>{
        const sizeArray = e.target.value.split(',').map(Number); // Convert split strings to numbers
        setSize(sizeArray);
      
        setValues((prevValues) => ({
          ...prevValues,
          product_size: sizeArray,
        }));
      }

      const handelColor = (e)=>{
        const sizeArray = e.target.value.split(',').map(String); // Convert split strings to numbers
        setColor(sizeArray);
      
        setValues((prevValues) => ({
          ...prevValues,
          product_color: sizeArray,
        }));
        
      }
      
      useEffect(() => {
    
        const getAllCategories = async (req, res) => {
          try {
            const response = await axios.get(
              'https://shope-server.onrender.com/categories/manager/getAllCategory'
            );
            setCategories(response.data.all_categories);
          } catch (error) {
            console.log(error.response.data.error);
          }
        };
    
        getAllCategories();
    
      }, []);

      useEffect(() => {
        const arr = [];
        chosenCategories.map((cc) => {
          arr.push({
            category: cc._id,
          });
        });
    
        setValues((prevValues) => ({
          ...prevValues,
          categories: arr,
        }));
    
      }, [chosenCategories]);


      const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
          setLoading(true);
          const {data} = await axios.post(`https://shope-server.onrender.com/products/product/add-product-manager`,values)
          toast.success(data.message, {
            position:'top-center',
            theme:'colored',
            autoClose: 1000,

          })
          navigate('../')
        }catch(e){
          toast.error('error',{
           position:'top-center',
           theme:'colored',
           autoClose: 1000,

          })
    
        }finally{
          setLoading(false)
        }
    
      }


    return(
        <>
        <Container  maxW="container.xl" boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.10)" p={10}  margin="0" w="100%" >
            <Heading>Add Product - Shoes</Heading>
            <Flex mt={10}>
            <Box as="form" mt={10} padding={4} w="100%" onSubmit={handleSubmit}>
    
              <FormControl id="product_name" isRequired>
                  <FormLabel htmlFor="product_name">Product Name</FormLabel>
                  <Input
                    w='70%'
                    name="product_name"
                    onChange={handelChange}
                    type="text"
                  />
              </FormControl>
    
              <FormControl id="product_price" isRequired  marginTop={4}>
                  <FormLabel htmlFor="product_price">Product Price</FormLabel>
                  <Input
                    w='70%'
                    name="product_price"
                    onChange={handelChange}
                    type="number"
                  />
              </FormControl>
    
              <FormControl id="product_description" isRequired  marginTop={4}>
                  <FormLabel htmlFor="product_description">Product Description</FormLabel>
                  <Input
                    w='70%'
                    name="product_description"
                    onChange={handelChange}
                    type="text"
                  />
              </FormControl>
    
              <FormControl id="product_size" isRequired  marginTop={4}>
                  <FormLabel htmlFor="product_size">Product Size</FormLabel>
                  <Input
                    w='70%'
                    name="product_size"
                    onChange={handelSize}
                    type="text"
                  />
              </FormControl>
              <FormControl id="product_color" isRequired  marginTop={4}>
                  <FormLabel htmlFor="product_color">Product Color</FormLabel>
                  <Input
                    w='70%'
                    name="product_color"
                    onChange={handelColor}
                    type="text"
                  />
              </FormControl>
    
              <Divider w="70%" mt="20px" />

              <FormControl id="product_image" marginTop={4}   w='20%' isRequired>
                <FormLabel htmlFor="product_image">
                  Product Image
                  <Image
                    width="70%"
                    src= {values.product_image || avatar}
                  />
                </FormLabel>
                <Input
                  id="fileInput"
                  w="100%"
                  display="none"
                  name="product_image"
                  onChange={handleFileUpload}
                  type="file"
                  accept=".jpeg, .png, .jpg"
                />
                <label htmlFor="fileInput">
                    <Button
                        as="span"
                        variant="outline"
                        w="100%"
                        fontSize="sm"
                        fontWeight="normal"
                        borderRadius="md"
                        bg='gray.300'
                        p={5}
                    >
                        Choose File
                    </Button>
                </label>
              </FormControl>
    
    
            <Divider w="70%" mt="20px" />
            <FormControl w="70%" >
                <FormLabel htmlFor='categories'>Product Categories </FormLabel>
                <Select
                    id='categories'
                    onChange={(e)=>{

                        const obj = JSON.parse(e.target.value);

                        console.log(chosenCategories.length)
                        const exists = chosenCategories.length>0? chosenCategories.some((c)=>{
                            
                            return c._id === obj._id
                            
                        }):false
            
                        if (!exists) {
                            setChosenCategories(() => {
                              return [...chosenCategories, obj];
                            });
                          }
                    }}
                >
             <option>Select Category</option>
              {catregories?.map((category) => (
                <option key={category._id} value={JSON.stringify(category)}>
                  {category.category_name}
                </option>
              ))}
                </Select>
            </FormControl>

            <Divider w="70%" mt="20px" />
            <Text my={15}>Selected Categories : </Text>

            <UnorderedList>
            {chosenCategories.map((category) => (
                <ListItem key={category._id}>
                {category.category_name}
                <Button
                    onClick={() => {
                    const filteredChosen = chosenCategories.filter((cc) => {
                        return category._id !== cc._id;
                    });

                    setChosenCategories(filteredChosen);
                    }}
                >
                    Remove
                </Button>
                </ListItem>
            ))}
            </UnorderedList>
            


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

export default AddProductForm;
function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }
  