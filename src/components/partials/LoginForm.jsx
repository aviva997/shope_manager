import { useState, useContext } from "react";
import {AuthContext} from "../../contexts/AuthContext"
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Container,
} from "@chakra-ui/react"
const LoginForm = () => {

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [values, setValues] = useState({
    manager_email: "",
    manager_password: "",
  });

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(() => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await login(
        values.manager_email,
        values.manager_password
      );

      if (!response.success) {
        throw new Error(response.message);
      }

      setData(response.message);
      navigate("/");

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };


  return (

    <Container>
    <Box as="form" padding={4} onSubmit={handleSubmit}>
      <FormControl id="manager_email" isRequired>
        <FormLabel htmlFor="manager_email">Email</FormLabel>
        <Input name="manager_email" aria-label="manager_email" onChange={handleChange} type="text" />
      </FormControl>

      <FormControl id="manager_password" isRequired marginTop={4}>
        <FormLabel htmlFor="manager_password">Password</FormLabel>
        <Input name="manager_password" aria-label="manager_password" onChange={handleChange} type="password" />
      </FormControl>

      <Button type="submit" marginTop={4} colorScheme="blue">
        Login
      </Button>
    </Box>
    {loading && <span>loading...</span>}
    {error && <span>{error}</span>}
    {data && <span>{data.message}</span>}
  </Container>
  )
}

export default LoginForm;
