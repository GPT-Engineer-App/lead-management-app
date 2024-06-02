import { Container, Text, VStack, Button, Input } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useUsers, useAddUser, testSupabaseConnection } from "../integrations/supabase/index.js";

const Index = () => {
  const { data: users, isLoading, isError } = useUsers();
  const addUser = useAddUser();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const checkConnection = async () => {
      const connected = await testSupabaseConnection();
      setIsConnected(connected);
    };
    checkConnection();
  }, []);

  const handleAddUser = () => {
    addUser.mutate({ username, email });
    setUsername("");
    setEmail("");
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">User Management</Text>
        {isConnected ? (
          <>
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button onClick={handleAddUser} isLoading={addUser.isLoading}>
              Add User
            </Button>
            {isLoading && <Text>Loading...</Text>}
            {isError && <Text>Error loading users</Text>}
            {users && users.map((user) => (
              <Text key={user.id}>{user.username} - {user.email}</Text>
            ))}
          </>
        ) : (
          <Text color="red.500">Failed to connect to Supabase</Text>
        )}
      </VStack>
    </Container>
  );
};

export default Index;