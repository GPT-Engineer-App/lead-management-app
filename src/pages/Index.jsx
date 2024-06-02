import { Container, Text, VStack, Button, Input, Box, Flex, Heading, Link } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Handle login logic here
    console.log("Logging in with", { username, password });
    // Simulate successful login
    if (username === "admin" && password === "password") {
      navigate("/admin");
    } else if (username === "salesmanager" && password === "password123") {
      navigate("/sales-manager");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <Container maxW="container.xl" p={0}>
      <Flex as="nav" bg="blue.600" color="white" p={4} justifyContent="space-between" alignItems="center">
        <Heading size="md">RV Dealership</Heading>
        <Box>
          <Link href="#" mx={2}>Home</Link>
          <Link href="#" mx={2}>About</Link>
          <Link href="#" mx={2}>Contact</Link>
        </Box>
      </Flex>

      <Flex direction="column" align="center" justify="center" height="80vh" bg="gray.100" p={4}>
        <Heading mb={4}>Welcome to RV Dealership Lead Management Tool</Heading>
        <Box bg="white" p={6} rounded="md" shadow="md" width="100%" maxW="md">
          <VStack spacing={4}>
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={handleLogin} colorScheme="blue" width="full">
              Login
            </Button>
          </VStack>
        </Box>
      </Flex>

      <Flex as="footer" bg="blue.600" color="white" p={4} justifyContent="center" alignItems="center">
        <Text>&copy; 2023 RV Dealership. All rights reserved.</Text>
      </Flex>
    </Container>
  );
};

export default Index;