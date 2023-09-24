import { Avatar, Divider, Flex, Heading,IconButton,Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {AiOutlineMenu, AiOutlineUser, AiOutlineUserAdd} from 'react-icons/Ai';
import { useState } from "react";
import NavItems from "./NavItems";
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const nav_styles = {
      display: [isOpen ? "flex" : "none", "flex"],
      gap: 3,
      p: 7,
      position:[isOpen ? "absolute" : "none"], 
      zIndex: 1000, 
      backgroundColor: "white",

      
    };

    const button_styles = {
        top: [2, 1],
        left: 5,
        display: ["inherit", "none"],
        zIndex: 1000, 
      };

    const changeOpen = () => {
    
        setIsOpen(!isOpen);
        
     
      };
      const closeNavbar = () => {
        setIsOpen(false);
      };

    return (
        <div style={{flex:1}} >
            <IconButton
                    onClick={changeOpen} sx={button_styles}
                    background="none"
                    mt={5}
                    _hover={{ background: 'none' }}
                    icon={<AiOutlineMenu />}
                  
                />

        <Flex direction={["column", "column"]} sx={nav_styles}
            pos="sticky"
            left="5"
            marginTop="2.5vh"
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.07)"
            borderRadius={isOpen ? "15px" : "30px"}
            w={isOpen ? "75px" : "200px"}
            flexDir="column"
            justifyContent="space-between"
            alignItems={isOpen ? "center" : "flex-start"}
            style={{flex:1}}


            
        >
            <Flex
                flexDir="column"
                w="100%"
                alignItems={isOpen ? "center" : "flex-start"}
                as="nav"
            >
                <Link to="/" onClick={closeNavbar}>
                <NavItems navSize={isOpen}  title='Home' active/>
                </Link>
                <Link to="/customers" onClick={closeNavbar}>
                <NavItems navSize={isOpen}  title='Customers'/>
                </Link>
                <Link to="/customers/add-customer" onClick={closeNavbar}>
                <NavItems navSize={isOpen}  title='Add Customer'/>
                </Link>

                <Link to="/products"  onClick={closeNavbar}>
                <NavItems navSize={isOpen}  title='Products'/>
                </Link>

                <Link to="/products/add-product"  onClick={closeNavbar}>
                <NavItems navSize={isOpen}  title='Add Product'/>
                </Link>
                <Link to="/category/add-category" onClick={closeNavbar}>
                <NavItems navSize={isOpen}  title='Add Categories'/>
                </Link>
                <Link to="/category" onClick={closeNavbar}>
                <NavItems navSize={isOpen}  title='Categories'/>
                </Link>
                <Link to="/orders" onClick={closeNavbar}>
                <NavItems navSize={isOpen}  title='Transactions'/>
                </Link>
                <Link to="/message" onClick={closeNavbar}>
                <NavItems navSize={isOpen}  title='Message'/>
                </Link>
                
            </Flex>

            <Flex
                pos='flex'
                p='3%'
                flexDir="column"
                w="100%"
                alignItems={isOpen ? "center" : "flex-start"}
                mb={4}
            >
                <Divider display={isOpen? "none" : "flex"} />
                <Flex mt={4} align="center">
                    <Avatar size="sm" src="https://fr-fr.learn.canva.com/wp-content/uploads/sites/14/2019/03/canva_photo_profil_reseaux_sociaux.jpg" />
                    <Flex flexDir="column" ml={4} display={isOpen ? "none" : "flex"}>
                        <Heading as="h3" size="sm"> Aviva Weller</Heading>
                        <Text color="gray">Admin</Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
        </div>
  )
}

export default Navbar