import React, { useState, useEffect } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Container,
  Heading,
  Button,
  IconButton,
} from '@chakra-ui/react';
import { AiFillDelete } from 'react-icons/Ai';
import axios from 'axios';
import { toast } from 'react-toastify';

// Sample data (you can replace this with your actual data)
const clientMessages = [
  {
    id: 1,
    email: 'client1@example.com',
    message: 'Hello, I have a question.',
  },
  {
    id: 2,
    email: 'client2@example.com',
    message: 'Can you help me with my issue?',
  },
  {
    id: 3,
    email: 'client3@example.com',
    message: 'I need assistance with my account.',
  },
];

const Message = () => {
  // State to store the client messages
  const [messages, setMessages] = useState([]);

  // Simulate fetching data from an API
  useEffect(() => {
    const getMessages = async()=>{
        try{
            const {data} = await axios.get('https://shope-server.onrender.com/contactUs/get');
            console.log(data.contact)
            setMessages(data.contact);

        }catch(error){
            console.log(error)
        }
    }
    getMessages()
 
  }, []);

  // Function to handle message deletion
  const handleDeleteMessage = async (id) => {
    // Create a new array of messages excluding the one with the specified id
    try{
        const {data} = await axios.delete(`https://shope-server.onrender.com/contactUs/delete/${id}`);
        console.log(data);
        if(data.success){
            const updatedMessages = messages.filter((message) => message._id !== id);
            setMessages(updatedMessages);
            toast.success(data.message,{
                autoClose:1000
            })

        }

    }catch(error){
        toast.error(error.message,{
            autoClose:1000
        })
    }
    // You can also make an API call to delete the message on the server
  };

  return (
    <Container mt={8} maxW="container.lg">
      <Heading mb={4}>Client Messages</Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Email</Th>
            <Th>Message</Th>
            <Th>Action</Th> {/* Add a new column for the delete button */}
          </Tr>
        </Thead>
        <Tbody>
          {messages.map((message) => (
            <Tr key={message._id}>
              <Td>{message.email}</Td>
              <Td>{message.message}</Td>
              <Td>
                {/* Delete button */}
                <AiFillDelete 
                fontSize={22}
                onClick={() => handleDeleteMessage(message._id)}
                />
           
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Container>
  );
};

export default Message;
