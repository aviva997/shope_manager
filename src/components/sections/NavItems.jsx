import { Flex, Icon, Link, Menu, MenuButton, Text } from "@chakra-ui/react";

const NavItems = ({navSize, title, active})=>{
    return (
        <Flex
            mt={30}
            w={150}
            flexDir="column"
                   
            alignItems={navSize ? "center" : "flex-start"}
        >
            <Menu placement="right">
                <Link
                    backgroundColor={active && "#AEC8CA"}
                    p={3}
                    borderRadius={8}
                    _hover={{ textDecor: 'none', backgroundColor: "#AEC8CA" }}
                    
                    w={!navSize  && "100%"}
                >
                    <MenuButton w="100%">
                        <Flex >
                            <Text 
                            ml={3} 
                            w={navSize  ? "40px" : "flex"} 
                            fontSize={navSize  ? "10px" : "flex"}
                            >{title}</Text>
                        </Flex>
                    </MenuButton>
                </Link>
               
            </Menu>
        </Flex>
    )

}
export default NavItems;