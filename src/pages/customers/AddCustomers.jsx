import { Flex } from '@chakra-ui/react'
import React from 'react'
import  AddCustomersForm from '../../components/partials/customers/AddCustomersForm'
const addCustomers = () => {
  return (
    <Flex
    style={{flex:5}}
    margin="2.5vh"
    w="100%"
    >
      <AddCustomersForm/>


    </Flex>

  )
}

export default addCustomers