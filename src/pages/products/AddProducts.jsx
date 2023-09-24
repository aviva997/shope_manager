import { Flex } from '@chakra-ui/react';
import AddProductsForm from '../../components/partials/products/AddProductsForm';

const AddProducts = ()=>{

    return(

    <Flex style={{flex:5}}
        margin="2.5vh"
        w="100%"
        
    >
        <AddProductsForm/>
    
    </Flex>

    )
}

export default AddProducts;