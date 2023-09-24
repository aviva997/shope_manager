import React from 'react'
import { Container, Heading, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, Image, Button } from "@chakra-ui/react"
import {useNavigate} from 'react-router-dom';

const ProductsTable = ({data, deleteProduct}) => {

  const navigate = useNavigate()
  return (
    <Container 
    maxW="container.xl" boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.10)" p={0}  margin="0" w="100%"
   
    >
    <Heading size='md' textAlign='center' p='15px'>Products - shoes</Heading>

    <Table variant='striped' colorScheme='gray'  style={{ tableLayout: 'fixed' }}  w="100%"   >
      <Thead>
        <Tr>
          <Th>product name</Th>
          <Th>product description </Th>
          <Th>product price</Th>
          <Th>product size</Th>
          <Th>product color</Th>
          <Th>product image</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody >
        
        {data && data.map((d)=>(
          <Tr key={d._id} >
            <Td>{d.product_name}</Td>
            <Td>{d.product_description}</Td>
            <Td>{d.product_price}</Td>
            <Td>{d.product_size.join(',')}</Td>
            <Td>{d.product_color.join(',')}</Td>
            <Td>
                <Image 
                    boxSize="50px"
                    objectFit="cover"
                    src={d.product_image}
                />
            </Td>
            <Td>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button mx={2} w="50%" bg="black" color="white" p={4}
                  onClick={()=>navigate(`../products/edit-product/${d._id}`)}
                >
                Edit
                </Button>
                <Button mx={2} w="50%" bg="teal" color="white"
                onClick={()=>{
                  confirm("are u sure to delete this product?")&&
                  deleteProduct(d._id)
                }}
                >
                Delete
                </Button>
            </div>
            </Td>

            
          </Tr>

        ))
        
        }
        
      </Tbody>
    </Table>
  </Container>
  )
}

export default ProductsTable