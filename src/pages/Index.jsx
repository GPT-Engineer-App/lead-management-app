import { Container, Text, VStack, Button, Input, Box, Flex, Heading, Link } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("supabase.auth.token");
    if (token) {
      setIsAuthenticated(true);
      navigate("/home");
    }
  }, [navigate]);

  const handleLogin = async () => {
    const response = await fetch("https://jdxgdremrrjjyrxvfpwq.supabase.co/auth/v1/token?grant_type=password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpkeGdkcmVtcnJqanlyeHZmcHdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcwODQ5ODAsImV4cCI6MjAzMjY2MDk4MH0.CMVGMxu5kMH1z9KAxE7HH6hrUdsCYjTF11eSQuJDDk0"
      },
      body: JSON.stringify({
        email: username,
        password: password
      })
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("supabase.auth.token", data.access_token);
      setIsAuthenticated(true);
      navigate("/home");
    } else {
      alert("Invalid credentials");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("supabase.auth.token");
    setIsAuthenticated(false);
    navigate("/");
  };

  if (isAuthenticated) {
    return (
      <Container maxW="container.xl" p={0}>
        <Flex as="nav" bg="blue.600" color="white" p={4} justifyContent="space-between" alignItems="center">
          <Heading size="md">RV Dealership</Heading>
          <Box>
            <Link href="#" mx={2}>Home</Link>
            <Link href="#" mx={2}>About</Link>
            <Link href="#" mx={2}>Contact</Link>
            <Button onClick={handleLogout} colorScheme="red" ml={4}>
              Logout
            </Button>
          </Box>
        </Flex>
        <Flex direction="column" align="center" justify="center" height="80vh" bg="gray.100" p={4}>
          <Heading mb={4}>Welcome to RV Dealership Lead Management Tool</Heading>
        </Flex>
        <Flex as="footer" bg="blue.600" color="white" p={4} justifyContent="center" alignItems="center">
          <Text>&copy; 2023 RV Dealership. All rights reserved.</Text>
        </Flex>
      </Container>
    );
  }

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