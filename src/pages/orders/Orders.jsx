import { Flex, Spinner } from "@chakra-ui/react"
import OrderTable  from "../../components/partials/orders/OrderTable";
import useFetchGet from "../../hooks/useFetchGet";
import axios from "axios";
import { toast } from "react-toastify";

const orderUrl = `https://shope-server.onrender.com/orders/order/`;


const Orders = () => {

    const [data, loading, error] = useFetchGet(`${orderUrl}get-all-orders`);

    const changeStatus = async(id, value)=>{
        try{
            const res = await axios.put(`${orderUrl}update-status-order/${id}`,{status:value});
            toast.success(response.data.message, {
                position: "top-center",
                theme: "colored",
                autoClose: 1000
              });
        

        }catch(error){
            toast.error(error.response.data.error, {
                position: "top-center",
                theme: "colored",
                autoClose: 1000
              });
            
        }

    }



  return (
    <Flex
    style={{flex:5}}
    margin="2.5vh"
    w="100%"
    >
        {loading && <Spinner/>}
        {error &&<span>{error.message}</span>}
        {data && <OrderTable orders ={data.orders} changeStatus={changeStatus}/>}
    
    </Flex>
  )
}

export default Orders