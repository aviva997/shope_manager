import { useEffect, useState } from "react";
import {
  Container,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  Button,
  ButtonGroup,
  Heading,
  Text,
  Divider,
  Badge,
  Select,
  InputGroup,
  Input,
  InputRightElement,
  HStack
} from "@chakra-ui/react";

import { BsSearchHeart } from "react-icons/bs";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/Ai";
import {Link} from 'react-router-dom';



const OrderTable = ({ orders, changeStatus }) => {
    const [filterStatus, setFilterStatus] = useState(null);
    const [dataOrders, setDataOrders] = useState([...orders]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sort, setSort] = useState('ASC');
    const [sortIndex, setSortIndex] = useState(null);

    const onChangeHandle = (e) => {
        setSearchTerm(e.target.value);
      };

    
    useEffect(()=>{

        orders.map((o)=>o.order_number = o.order_number.toString());

        const searchRes = orders?.filter((o)=>
            o.order_number.includes(searchTerm)||
            o.customer_details.customer_name.toLowerCase().includes(searchTerm.toLowerCase())||
            o.customer_details.customer_phone.includes(searchTerm)
        )

        setDataOrders(searchRes)
    },[searchTerm])

    const sorting = (col) => {

        if (sort === "ASC") {
        const sorted = [...dataOrders].sort((a, b) =>

            a[col] > b[col] ? 1 : -1);
        setDataOrders(sorted);
        setSort("DESC")
        }

        if (sort === "DESC") {
        const sorted = [...dataOrders].sort((a, b) =>
            a[col] > b[col] ? -1 : 1);
        setDataOrders(sorted);
        setSort("ASC")
        }
    };

  const sortingNestedString = (col) => {

    if (sort === "ASC") {
      const sorted = [...dataOrders].sort((a, b) =>
        a.customer_details[col] > b.customer_details[col] ? 1 : -1);
      setDataOrders(sorted);
      setSort("DESC")
    }
    if (sort === "DESC") {
      const sorted = [...dataOrders].sort((a, b) =>
        a.customer_details[col] > b.customer_details[col] ? -1 : 1);
      setDataOrders(sorted);
      setSort("ASC")
    }
  };
  const formatDate = (dateString)=> {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
    }

  return (
    <>
        <Container 
        maxW="container.xl" boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.10)" p={5}  margin="0" w="100%"
        >
            <Heading mb={5}>Orders</Heading>
            <Text mb={2.5}>Total orders: {orders.length}</Text>

            <Divider mb={5}/>

            <HStack justifyContent={"space-between"}>

                <ButtonGroup>
                    <Button
                        variant={filterStatus === null ?"solid":"outline"}
                        onClick={()=>setFilterStatus(null)}
                        colorScheme="purple"
                    >All</Button>
                    <Button
                        variant={filterStatus === 1 ?"solid":"outline"}
                        onClick={()=>setFilterStatus(1)}
                        colorScheme="green"
                    
                    >New</Button>
                    <Button
                     variant={filterStatus === 2 ?"solid":"outline"}
                     onClick={()=>setFilterStatus(2)}
                     colorScheme="yellow"
                    >Process</Button>
                    <Button
                         variant={filterStatus === 3 ?"solid":"outline"}
                         onClick={()=>setFilterStatus(3)}
                         colorScheme="blackAlpha"
                    >Done</Button>
                    <Button
                    variant={filterStatus === 4 ?"solid":"outline"}
                    onClick={()=>setFilterStatus(4)}
                    colorScheme="red"
                    >Canceled</Button>
                </ButtonGroup>

                <InputGroup maxW={480}>
                <Input 
                placeholder="search by order number, customer name, customer phone"
                value={searchTerm}
                onChange={onChangeHandle}

                />
                 <InputRightElement>
                    <BsSearchHeart />
                </InputRightElement>
                </InputGroup>
            </HStack>
            <Divider mb={5} mt={5}/>

            <Table variant="striped">
                <Thead>
                    <Tr>
                        <Th>#</Th>
                        <Th
                        onClick={()=>{
                            sorting('order_number')
                            setSortIndex(1)
                        }}
                        >
                            <span>Order Number</span>
                            {sortIndex === 1 && sort==="ASC" && <AiOutlineArrowDown/>}
                            {sortIndex === 1 && sort==="DESC" && <AiOutlineArrowUp/>}
                        </Th>

                        <Th
                        onClick={()=>{
                            sorting('created_at')
                            setSortIndex(2)
                        }}
                        >
                            <span>Date</span>
                            {sortIndex === 2 && sort==="ASC" && <AiOutlineArrowDown/>}
                            {sortIndex === 2 && sort==="DESC" && <AiOutlineArrowUp/>}
                        </Th>
                        <Th
                        onClick={()=>{
                            sortingNestedString('customer_name')
                            setSortIndex(3)
                        }}
                        >
                            <span>Customer Name</span>
                            {sortIndex === 3 && sort==="ASC" && <AiOutlineArrowDown/>}
                            {sortIndex === 3 && sort==="DESC" && <AiOutlineArrowUp/>}
                        </Th>

                        <Th
                        onClick={()=>{
                            sortingNestedString('customer_phone')
                            setSortIndex(4)
                        }}
                        >
                            <span>Customer Phone</span>
                            {sortIndex === 4 && sort==="ASC" && <AiOutlineArrowDown/>}
                            {sortIndex === 4 && sort==="DESC" && <AiOutlineArrowUp/>}
                        </Th>

                        <Th
                        onClick={()=>{
                            sorting('total-price')
                            setSortIndex(5)
                        }}
                        >
                            <span>Total</span>
                            {sortIndex === 5 && sort==="ASC" && <AiOutlineArrowDown/>}
                            {sortIndex === 5 && sort==="DESC" && <AiOutlineArrowUp/>}
                        </Th>
                        <Th>Status</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {dataOrders.filter((order)=>{
                        if(filterStatus === null){
                            return order
                        }else if(filterStatus === 1){
                            return order.status === 1
                        }else if (filterStatus === 2){
                            return order.status ===2
                        }else if (filterStatus === 3){
                            return order.status ===3
                        }else if (filterStatus === 4){
                            return order.status ===4
                        }
                    }).map((order, index)=>(

                        <Tr key={order._id}>
                            <Td>{index + 1}</Td>
                            <Td>
                                <Link 
                                style={{textDecoration:'underline', color:'gray'}}
                                to={`order-details/${order._id}`}>
                                {order.order_number}
                                </Link>
                            </Td>
                            <Td>
                                {formatDate(order.createdAt)}
                            </Td>
                            <Td>
                                {order.customer_details?.customer_name}
                            </Td>
                            <Td>
                                {order.customer_details?.customer_phone}
                            </Td>
                            <Td>{order.total_price}</Td>
                            <Td>
                                <Select
                                value={order.status}
                                bg={
                                    order.status === 1?"green.100":
                                    order.status === 2?"yellow.100":
                                    order.status === 3?"blackAlpha.200":
                                    "red.100"
                                }
                                onChange={(e)=>{
                                    const answer = confirm('are u sure ?');
                                    if(answer){
                                        changeStatus(order._id, e.target.value);
                                        const updateOrder = dataOrders.map(o =>{
                                            if(order._id === o._id ){
                                                return {
                                                    ...o,
                                                    status:parseInt(e.target.value)
                                                }
                                            }
                                            return o;
                                        });
                                        setDataOrders(updateOrder)
                                    }
                                }}
                                >
                                    <option value="1">New</option>
                                    <option value="2">Processing</option>
                                    <option value="3">Done</option>
                                    <option value="4">Canceled</option>

                                </Select>
                            </Td>
                        </Tr>



                    ))
                    
                    
                    }
                </Tbody>

            </Table>
            
        </Container>
    </>
    
  )
}

export default OrderTable