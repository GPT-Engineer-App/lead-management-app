import { Container, Flex, Heading, Text, Box, Link, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("supabase.auth.token");
    if (!token) {
      navigate("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("supabase.auth.token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  if (!isAuthenticated) {
    return null;
  }

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
};

export default Home;