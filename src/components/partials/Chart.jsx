import { Flex, Heading } from '@chakra-ui/react';
import {LineChart,Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
const Chart = ({title, data, dataKey, grid})=>{
    return(
        <Flex
            w="100%"
            p="20px"
            h="40vh"
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.07)"

        >
            <Heading as='h3' size='lg'>{title}</Heading>
            <ResponsiveContainer  width="100%" height="100%" aspect={4 / 1}>
                <LineChart data={data}>
                <XAxis dataKey="name" stroke='#5550bd'/>
                <Line type="monotone" dataKey={dataKey} stroke="#5550bd"/>
                <Tooltip/>
                {grid && <CartesianGrid stroke='#e0dfdf' strokeDasharray="5 5"/>}


                </LineChart>

            </ResponsiveContainer>
        </Flex>

    )
}

export default Chart;