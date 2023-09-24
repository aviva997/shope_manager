import { Heading, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import useFetchGet  from '../../hooks/useFetchGet';

const cusromer_url = 'https://shope-server.onrender.com/users/manager/get-new-users'
const NewCustomers = () => {
  const [newCustomers, setNewCustomers] = useState([]);
  const[data, loading, error] = useFetchGet(cusromer_url);
  useEffect(()=>{

    if(data){
      setNewCustomers(data)
    }
  },[data])
  if(loading){
    return <span>loading ...</span>
}
if(error){
    return <span>{error.message}</span>
}



  return (
  
      <TableContainer
      w="100%"
      p="20px"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.07)"
      >
      <Heading size='md' textAlign='center' p='15px'>New customers for this current month</Heading>

      <Table variant='striped' colorScheme='gray'>
        <Thead>
          <Tr>
            <Th>Custoner Name</Th>
            <Th>Customer Email</Th>
            <Th>Customer Phone</Th>
          </Tr>
        </Thead>
        <Tbody>
          
          {newCustomers && newCustomers.map((d)=>(
            <Tr>
              <Td>{d.customer_name}</Td>
              <Td>{d.customer_email}</Td>
              <Td>{d.customer_phone}</Td>
            </Tr>

          ))
          
          }
          
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default NewCustomers