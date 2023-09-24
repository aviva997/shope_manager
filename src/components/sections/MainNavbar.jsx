import { Flex ,Box,Heading,ButtonGroup ,Button,Spacer,IconButton  } from "@chakra-ui/react";
import { wrap } from "framer-motion";
import {FiLogOut} from 'react-icons/Fi'
import {AuthContext} from '../../contexts/AuthContext';
import { useContext } from "react";
const MainNavbar = ()=>{

  const {logout} =  useContext(AuthContext);

    return(
        <Flex
        w='100%'
        p="15px"
        bg="#AEC8CA"
        >
        <Box p='2'>
          <Heading size='md'>Online Shoes Shop</Heading>
        </Box>
        <Spacer />
        <ButtonGroup gap='2'>

          <Button 
         bg="black"
         color="white"
          _hover={{ background: 'none' }}
            >
            <button onClick={logout}>Log out</button>
            <FiLogOut style={{ marginLeft: '5px' }} />
          </Button>
        </ButtonGroup>
      </Flex>
      
    )
}

export default MainNavbar;