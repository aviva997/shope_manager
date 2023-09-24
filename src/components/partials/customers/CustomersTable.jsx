import React from 'react'
import { Container, Heading, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, Image, Button } from "@chakra-ui/react"
import {useNavigate} from 'react-router-dom';

const CustomersTable = ({data, deleteCustomer}) => {
  const navigate = useNavigate()
  return (
    <Container 
    maxW="container.xl" boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.10)" p={0}  margin="0" w="100%"
   
    >
    <Heading size='md' textAlign='center' p='15px'>Customers Details</Heading>

    <Table variant='striped' colorScheme='gray'  style={{ tableLayout: 'fixed' }}  w="100%"   >
      <Thead>
        <Tr>
          <Th>Customer name</Th>
          <Th>Customer Email </Th>
          <Th>Customer phone</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody >
        
        {data && data.map((d)=>(
          <Tr key={d._id} >
            <Td>{d.customer_name}</Td>
            <Td>{d.customer_email}</Td>
            <Td>{d.customer_phone}</Td>
        
            <Td>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button mx={2} w="50%" bg="black" color="white" p={4}
                  onClick={()=>navigate(`../customers/edit-customer/${d._id}`)}
                >
                Edit
                </Button>
                <Button mx={2} w="50%" bg="teal" color="white"
                onClick={()=>{
                  confirm("Are u sure u want to delete this user?")&&
                  deleteCustomer(d._id)
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

export default CustomersTable