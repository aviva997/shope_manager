import React from 'react'
import { Container, Heading, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, Image, Button } from "@chakra-ui/react"
import {useNavigate} from 'react-router-dom';

const CategoriesTable = ({data, deleteCategory}) => {
  const navigate = useNavigate()
  return (
    <Container 
    maxW="container.xl" boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.10)" p={0}  margin="0" w="100%"
    >
    <Heading size='md' textAlign='center' p='15px'>Categories</Heading>

    <Table variant='striped' colorScheme='gray'  style={{ tableLayout: 'fixed' }}  w="100%"   >
      <Thead>
        <Tr>
          <Th>Category name</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody >
        
        {data && data.map((d)=>(
          <Tr key={d._id} >
            <Td>{d.category_name}</Td>
      
        
            <Td>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button mx={2} w="20%" bg="black" color="white" p={4}
                  onClick={()=>navigate(`../category/edit-category/${d._id}`)}
                >
                Edit
                </Button>
                <Button mx={2} w="20%" bg="teal" color="white"
                onClick={()=>{
                  confirm("Are u sure u want to delete this user?")&&
                  deleteCategory(d._id)
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

export default CategoriesTable