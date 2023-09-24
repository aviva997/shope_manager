import { Flex } from "@chakra-ui/react";
import Chart from "../components/partials/Chart";
import { useEffect, useMemo, useState } from "react";
import Profit from "../components/partials/Profit";
import NewCustomers from '../components/partials/NewCustomers'
import axios from "axios";

const Home = ()=>{
  const[status, setStatus] = useState([])
  const MONTH = useMemo(
        ()=>[
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec'
        ],
        []
    );
    
    useEffect(() => {
      const getStats = async () => {
          try {
              const { data } = await axios.get('https://shope-server.onrender.com/users/status');
              const list = data.sort((a, b) => a._id - b._id);
              const updatedStatus = list.map((i) => ({
                  name: MONTH[i._id - 1],
                  "Active User": i.total
              }));
              setStatus(updatedStatus);
          } catch (error) {
              console.log(error);
          }
      };
      getStats();
  }, []);
  
  
   
    const style_home = {
        bg: "red",
        flex: "4",
        p: "20px",
    }

    return(
        <Flex 
        style={{flex:5}}
        margin="2.5vh"
        w="80%"
        flexDir='column'
        gap="10"
        alignItems="center"
        justifyContent="space-between"
       
        >
            
        <Chart data={status} title='User Analytics' grid dataKey='Active User' />
        <Profit/>
        <NewCustomers/>
        </Flex>
    )

}
export default Home;