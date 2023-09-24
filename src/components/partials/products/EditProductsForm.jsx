import { Container ,Box,Heading,FormControl,FormLabel,Input, Divider, Text, UnorderedList, ListItem, Button, Select, Image,Flex, Spinner} from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";


const EditProductsForm = ({product}) => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  if (!product) {
    return <div>Loading or handle no product case...</div>;
}

    const {
        product_name,
        product_price,
        product_description,
        product_image,
        product_size,
        product_color,
        categories
    } = product;

  const [values, setValues] = useState({});
   

  const [chosenCategories, setChosenCategories] = useState([]);


  const [allCategories, setAllCategories] = useState([]);
  const [color, setColor] = useState(product.product_size || []);
  const [size, setSize] = useState(product.product_size || []);

  useEffect(()=>{
    setValues({
      product_name: product_name || '',
      product_price: product_price || '',
      product_description: product_description || '',
      product_image: product_image || '',
      product_size:product_size || '' ,
      product_color: product_color||'',
      categories:categories ||''

     })
     


  },[product])

  console.log('first', values)

  useEffect(() => {
    
    const getAllCategories = async (req, res) => {
      try {
        const response = await axios.get(
          'https://shope-server.onrender.com/categories/manager/getAllCategory'
        );
        setAllCategories(response.data.all_categories);
      } catch (error) {
        console.log(error.response.data.error);
      }
    };

    getAllCategories();

  }, []);
  console.log('all categories', allCategories)

  const handelChange = (e)=>{
    const {name,value}= e.target;
    setValues(()=>({...values, [name]:value}));

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
  const handleFileUpload = async(e)=>{
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setValues({ ...values, product_image : base64 })

  }
  useEffect(() => {
    // Initialize chosenCategories after product data is available
    if (product.categories) {
      setChosenCategories(product.categories);
    }
  }, [product.categories]);

  useEffect(() => {
    const arr = [];
    chosenCategories.map((cc) => {
      arr.push({
        category: cc.category._id,
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
      const {data} = await axios.put(`https://shope-server.onrender.com/products/product/update-product-by-id-manager/${product._id}`,values)
      
      toast.success(data.message, {
        position:'top-center',
        theme:'colored',
      })
      navigate('../')
    }catch(e){
      // toast.error(e.data.error,{
      //   position:'top-center',
      //   theme:'colored',

      // })

    }finally{
      setLoading(false)
    }

  }
  return (
    <>
    <Container  maxW="container.xl" boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.10)" p={10}  margin="0" w="100%" >
        <Heading>Edit Shoes : {values.product_name}</Heading>
        <Flex mt={10}>
        <Box as="form" mt={10} padding={4} w="100%" onSubmit={handleSubmit}>

          <FormControl id="product_name" isRequired>
              <FormLabel htmlFor="product_name">Product Name</FormLabel>
              <Input
                w='70%'
                value={values.product_name}
                name="product_name"
                onChange={handelChange}
                type="text"
              />
          </FormControl>

          <FormControl id="product_price" isRequired  marginTop={4}>
              <FormLabel htmlFor="product_price">Product Price</FormLabel>
              <Input
                w='70%'
                value={values.product_price}
                name="product_price"
                onChange={handelChange}
                type="number"
              />
          </FormControl>

          <FormControl id="product_description" isRequired  marginTop={4}>
              <FormLabel htmlFor="product_description">Product Description</FormLabel>
              <Input
                w='70%'
                value={values.product_description}
                name="product_description"
                onChange={handelChange}
                type="text"
              />
          </FormControl>

          <FormControl id="product_size" isRequired  marginTop={4}>
              <FormLabel htmlFor="product_size">Product Size</FormLabel>
              <Input
                w='70%'
                value={values.product_size}
                name="product_size"
                onChange={handelSize}
                type="text"
              />
          </FormControl>
          <FormControl id="product_color" isRequired  marginTop={4}>
              <FormLabel htmlFor="product_color">Product Color</FormLabel>
              <Input
                w='70%'
                value={values.product_color}
                name="product_color"
                onChange={handelColor}
                type="text"
              />
          </FormControl>

          <Divider w="70%" mt="20px" />

          <Text my={13}>Selected categories :</Text>

          <UnorderedList mb={15}>
            {chosenCategories?.map((c)=>(
              <ListItem key={c.category._id}>
                  {c.category.category_name}
                  <Button
                    onClick={()=>{
                      if (chosenCategories.length < 2) {
                        console.log('product mast have a minimum one category')
                        // toast.error("product mast have a minimum one category", {
                        //   position: "top-center",
                        //   theme: "colored",
                        //   autoClose: 1000,
                        // });
                      } else {
                        const filteredChosen = chosenCategories.filter((cc) => {
                          return c.category._id !== cc.category._id;
                        });

                        setChosenCategories(filteredChosen);
  
                      }

                    }}
                  >
                    Remove
                  </Button>
              </ListItem>

            ))}

          </UnorderedList>

          <Divider w="70%" mt="20px" />
          <FormControl marginTop={4}>
            <FormLabel >choose product categories</FormLabel>
            <Select 
            id='product_categories'
            w='70%'
            onChange={(e) => {
              const obj = JSON.parse(e.target.value);

              const exists = chosenCategories.some((cc) => {
                return cc.category._id === obj._id;
              });


              if (!exists) {
                setChosenCategories(() => {
                  return [...chosenCategories, { category: obj }];
                });
              }
            }}

            >

              <option>Add Category</option>
              {allCategories.map((category) => (
                <option key={category._id} value={JSON.stringify(category)}>
                  {category.category_name}
                </option>
              ))}

            </Select>
          </FormControl>
  
        <Divider w="70%" mt="20px" />
        <Button type="submit" w="70%" h="7vh" marginTop={4} bg="black" color="white" p={15}  >
          Save
        </Button>

        </Box>
        {loading && <Spinner color="red"/>}

        <Box  w="60%" mt="10%">
        <FormControl id="product_image" marginTop={4}>
            <FormLabel htmlFor="product_image">
              Product Image
              <Image
                width="100%"
                src= {values.product_image }
                alt="product image"
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
                >
                    Choose File
                </Button>
            </label>
          </FormControl>

        </Box>



    </Flex>
    </Container>

    </>
  )
}

export default EditProductsForm;
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