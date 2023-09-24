import React from 'react'
import {Flex} from "@chakra-ui/react"
import AddCategortForm from '../../components/partials/categories/AddCategoryForm'
const AddCategory = () => {
  return (
    <Flex
    style={{flex:5}}
    margin="2.5vh"
    w="100%"
    >
      <AddCategortForm/>


    </Flex>

  )
}

export default AddCategory