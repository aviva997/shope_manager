import {
    Heading,
    Divider,
    Container,
    HStack,
    Text,
    Box,
    Table,
    Tr,
    Th,
    Td,
    Tbody,
    Thead,
    Image,
    Select,
    Button,
    VStack,
    Spacer
  } from "@chakra-ui/react";
  import { useState } from "react";
  import {useNavigate} from "react-router-dom"

const OrderDetailsForm = ({order, changeStatus,deleteOrder}) => {
    const navigate = useNavigate();
    const [dataOrder, setDataOrder] = useState({ ...order });
  
    const total = dataOrder.products.reduce((total, product) => {
      return total + product.quantity * product.RTP;
    }, 0);


    return (
        <>
         <Container 
          maxW="container.xl" boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.10)" p={5}  margin="0" w="100%"
         >
        <Heading>Order Details : {dataOrder.order_number}</Heading>
        <Divider mb={5} mt={5} />
        <VStack 
            spacing={4}
            align='stretch'
        >
          <Heading size="sm">Customer Details :</Heading>

          <Box style={{ display: "flex", alignItems: "center" }}>
            <Heading size="sm">name : </Heading>
            <span> {dataOrder.customer_details.customer_name}</span>
          </Box>

          <Box style={{ display: "flex", alignItems: "center" }}>
            <Heading size="sm">phone : </Heading>
            <span> {dataOrder.customer_details.customer_phone}</span>
          </Box>
          <Box style={{ display: "flex", alignItems: "center" }}>
              <Heading size="sm"> address : </Heading>
                <span>{dataOrder.customer_details.customer_address.street}</span>
                <span>
                    {dataOrder.customer_details.customer_address.building}, 
                </span>
                <span>{dataOrder.customer_details.customer_address.city}</span>

          </Box>

        </VStack>
        <Divider mb={5} mt={5} />
        <Heading my={15} size="sm">
          Products :
        </Heading>
        <Divider />
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>name</Th>
              <Th>quantity</Th>
              <Th>unit price</Th>
              <Th>total price</Th>
              <Th>Image</Th>
            </Tr>
          </Thead>
          <Tbody>
            {dataOrder.products.map((product) => {
              return (
                <Tr key={product.product?._id}>
                  <Td>{product.product?.product_name}</Td>
                  <Td>{product.quantity}</Td>
                  <Td>{product.RTP}$</Td>
                  <Td>{product.quantity * product.RTP}$</Td>
                  <Td>
                    <Image
                      boxSize="50"
                      objectFit="cover"
                      src={product.product?.product_image}
                      alt={product.product?.product_name}
                    />
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
        <Divider />
        <Heading my={15} size="sm">
          Total : {total}$
        </Heading>
        <Divider />
        <Heading my={15} size="sm">
          Payment Details :
        </Heading>
        <Divider mb={2} mt={5} />
        <Box>
          <Text as="p">
            terminal number - {dataOrder.payment_details.terminal_number}
          </Text>
          <Text as="p">
            transaction_number - {dataOrder.payment_details.transaction_number}
          </Text>
          <Text as="p">
            transaction_date - {dataOrder.payment_details.transaction_date}
          </Text>
          <Text as="p">
            last_digits - XXXX-XXXX-XXXX-{dataOrder.payment_details.last_digits}
          </Text>
        </Box>
        <Divider />
        <Heading my={15} size="sm">
          Status :
        </Heading>
        <Divider mb={2} mt={5} />
        <HStack w="20%"  borderRadius={5} >
          <Select
            maxW="80%"
            value={dataOrder.status}
            bg={
              dataOrder.status === 1
                ? "yellow.100"
                : dataOrder.status === 2
                ? "purple.100"
                : dataOrder.status === 3
                ? "green.100"
                : "blackAlpha.100"
            }
            onChange={(e) => {
              const answer = confirm("are u sure ? ");
              if (answer) {
                changeStatus(dataOrder._id, e.target.value);
                setDataOrder((prev_order) => {
                  return { ...prev_order, status: parseInt(e.target.value) };
                });
              }
            }}
          >
            <option value="1">New</option>
            <option value="2">Processing</option>
            <option value="3">Done</option>
            <option value="4">Canceled</option>
          </Select>

        </HStack>
      </Container>
        
        </>
  )
}

export default OrderDetailsForm