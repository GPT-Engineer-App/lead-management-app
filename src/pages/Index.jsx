import { Container, Text, VStack, Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useUsers, useAddUser } from "../integrations/supabase/index.js";

const Index = () => {
  const { data: users, isLoading, isError } = useUsers();
  const addUser = useAddUser();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const handleAddUser = () => {
    addUser.mutate({ username, email });
    setUsername("");
    setEmail("");
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">User Management</Text>
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
      </VStack>
    </Container>
  );
};

export default Index;