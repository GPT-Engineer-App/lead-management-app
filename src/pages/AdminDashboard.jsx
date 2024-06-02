import { Box, Flex, Heading, Text, VStack, HStack, Button, Avatar, IconButton, useColorModeValue } from "@chakra-ui/react";
import { FaBell, FaCalendarAlt, FaChartBar, FaClipboardList, FaHome, FaUser, FaUsers } from "react-icons/fa";

const AdminDashboard = () => {
  const bg = useColorModeValue("gray.100", "gray.900");
  const color = useColorModeValue("gray.800", "white");

  return (
    <Box bg={bg} color={color} minH="100vh">
      <Flex as="header" bg="gray.800" color="white" p={4} justifyContent="space-between" alignItems="center">
        <HStack spacing={4}>
          <Avatar name="RV Dealership" src="/path-to-logo.png" />
          <Heading size="md">RV Dealership</Heading>
        </HStack>
        <HStack spacing={4}>
          <Button leftIcon={<FaHome />} variant="ghost" colorScheme="whiteAlpha">Dashboard</Button>
          <Button leftIcon={<FaUsers />} variant="ghost" colorScheme="whiteAlpha">Users</Button>
          <Button leftIcon={<FaClipboardList />} variant="ghost" colorScheme="whiteAlpha">Inventory</Button>
          <Button leftIcon={<FaChartBar />} variant="ghost" colorScheme="whiteAlpha">Reports</Button>
          <Button leftIcon={<FaCalendarAlt />} variant="ghost" colorScheme="whiteAlpha">Calendar</Button>
          <IconButton icon={<FaBell />} variant="ghost" colorScheme="whiteAlpha" />
          <Avatar name="Admin" src="/path-to-admin-avatar.png" />
        </HStack>
      </Flex>

      <Flex direction={{ base: "column", md: "row" }} p={4}>
        <Box flex="1" p={4}>
          <Heading size="lg" mb={4}>Overview</Heading>
          <VStack spacing={4}>
            <Box bg="gray.700" p={4} rounded="md" shadow="md" width="full">
              <Heading size="md">Leads Summary</Heading>
              <Text>New: XX</Text>
              <Text>Active: XX</Text>
              <Text>Closed: XX</Text>
            </Box>
            <Box bg="gray.700" p={4} rounded="md" shadow="md" width="full">
              <Heading size="md">User Management</Heading>
              <Text>[User List with Actions]</Text>
            </Box>
            <Box bg="gray.700" p={4} rounded="md" shadow="md" width="full">
              <Heading size="md">RV Inventory Management</Heading>
              <Text>[Inventory List with Actions]</Text>
            </Box>
            <Box bg="gray.700" p={4} rounded="md" shadow="md" width="full">
              <Heading size="md">Sales Analytics and Reports</Heading>
              <Text>[Charts and Graphs]</Text>
            </Box>
            <Box bg="gray.700" p={4} rounded="md" shadow="md" width="full">
              <Heading size="md">Calendar</Heading>
              <Text>[Monthly View with Events and Deadlines]</Text>
            </Box>
            <Box bg="gray.700" p={4} rounded="md" shadow="md" width="full">
              <Heading size="md">Notification Center</Heading>
              <Text>[Recent Notifications]</Text>
            </Box>
          </VStack>
        </Box>
      </Flex>

      <Flex as="footer" bg="gray.800" color="white" p={4} justifyContent="center" alignItems="center">
        <Text>&copy; 2023 RV Dealership. All rights reserved.</Text>
      </Flex>
    </Box>
  );
};

export default AdminDashboard;