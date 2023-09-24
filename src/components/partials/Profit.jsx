import {Box, Heading, Text,Flex,Spacer} from '@chakra-ui/react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import {AiOutlineArrowUp, AiOutlineArrowDown} from 'react-icons/Ai'

const Profit = ()=>{
   
    const[profit, setProfit] = useState(0);
    const[income, setIncome] = useState([])
    useEffect(()=>{
        const getProfit = async()=>{
            try{
                const {data} = await axios.get('https://shope-server.onrender.com/orders/income')
                console.log(data)
                setProfit(data[1].total-data[0].total)
                setIncome(data)
            }catch(error){

            }
        }
        getProfit()

    },[ ])

    return(
        <Box>
            <Heading size='md'>Profit between month {income[income.length-1]?._id} and month {income[income.length-2]?._id}</Heading>
            <Flex display='flex' alignItems="center" bg='black' color='white' textAlign='center'mt='10px' >
               <Heading  display='flex' alignItems="center"w='50%' m='0 30%' p='20px' >
               {profit}
               {profit < 0 ? <AiOutlineArrowDown color='red' />:<AiOutlineArrowUp color='green' />} 
               </Heading> 
            </Flex>

        </Box>
        
    )

}
export default Profit