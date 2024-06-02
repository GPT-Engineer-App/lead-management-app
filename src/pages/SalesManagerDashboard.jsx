import { Box, Flex, Heading, Text, VStack, HStack, Button, Avatar, IconButton, useColorModeValue, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { FaBell, FaCalendarAlt, FaChartBar, FaClipboardList, FaHome, FaUser, FaUsers, FaSignOutAlt, FaCog, FaTasks, FaBullseye } from "react-icons/fa";

const SalesManagerDashboard = () => {
  const bg = useColorModeValue("white", "gray.800");
  const color = useColorModeValue("gray.800", "white");
  const accentColor = useColorModeValue("blue.500", "blue.300");

  return (
    <Box bg={bg} color={color} minH="100vh">
      <Flex as="header" bg={accentColor} color="white" p={4} justifyContent="space-between" alignItems="center">
        <HStack spacing={4}>
          <Avatar name="RV Dealership" src="/path-to-logo.png" />
          <Heading size="md">RV Dealership</Heading>
        </HStack>
        <HStack spacing={4}>
          <Button leftIcon={<FaHome />} variant="ghost" colorScheme="whiteAlpha">Dashboard</Button>
          <Button leftIcon={<FaUsers />} variant="ghost" colorScheme="whiteAlpha">Leads</Button>
          <Button leftIcon={<FaChartBar />} variant="ghost" colorScheme="whiteAlpha">Performance</Button>
          <Button leftIcon={<FaClipboardList />} variant="ghost" colorScheme="whiteAlpha">Pipeline</Button>
          <Button leftIcon={<FaCalendarAlt />} variant="ghost" colorScheme="whiteAlpha">Calendar</Button>
          <Button leftIcon={<FaTasks />} variant="ghost" colorScheme="whiteAlpha">Tasks</Button>
          <IconButton icon={<FaBell />} variant="ghost" colorScheme="whiteAlpha" />
          <Menu>
            <MenuButton as={Button} variant="ghost" colorScheme="whiteAlpha">
              <Avatar name="Sales Manager" src="/path-to-admin-avatar.png" />
            </MenuButton>
            <MenuList>
              <MenuItem icon={<FaUser />}>Profile</MenuItem>
              <MenuItem icon={<FaCog />}>Settings</MenuItem>
              <MenuItem icon={<FaSignOutAlt />}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>

      <Flex direction={{ base: "column", md: "row" }} p={4}>
        <Box flex="1" p={4}>
          <Heading size="lg" mb={4}>Lead Management</Heading>
          <VStack spacing={4}>
            <Box bg={accentColor} p={4} rounded="md" shadow="md" width="full">
              <Heading size="md">Lead List</Heading>
              <Text>[Lead List with Actions]</Text>
            </Box>
          </VStack>
        </Box>

        <Box flex="1" p={4}>
          <Heading size="lg" mb={4}>Performance Metrics</Heading>
          <VStack spacing={4}>
            <Box bg={accentColor} p={4} rounded="md" shadow="md" width="full">
              <Heading size="md">Team Performance</Heading>
              <Text>[Charts and Graphs]</Text>
            </Box>
          </VStack>
        </Box>
      </Flex>

      <Flex direction={{ base: "column", md: "row" }} p={4}>
        <Box flex="1" p={4}>
          <Heading size="lg" mb={4}>Sales Pipeline</Heading>
          <VStack spacing={4}>
            <Box bg={accentColor} p={4} rounded="md" shadow="md" width="full">
              <Heading size="md">Pipeline Stages</Heading>
              <Text>[Visual Representation of Lead Stages]</Text>
            </Box>
          </VStack>
        </Box>

        <Box flex="1" p={4}>
          <Heading size="lg" mb={4}>Calendar</Heading>
          <VStack spacing={4}>
            <Box bg={accentColor} p={4} rounded="md" shadow="md" width="full">
              <Heading size="md">Sales Meetings and Follow-ups</Heading>
              <Text>[Monthly View]</Text>
            </Box>
          </VStack>
        </Box>
      </Flex>

      <Flex direction={{ base: "column", md: "row" }} p={4}>
        <Box flex="1" p={4}>
          <Heading size="lg" mb={4}>Task Management</Heading>
          <VStack spacing={4}>
            <Box bg={accentColor} p={4} rounded="md" shadow="md" width="full">
              <Heading size="md">Task List</Heading>
              <Text>[Upcoming Tasks]</Text>
            </Box>
          </VStack>
        </Box>

        <Box flex="1" p={4}>
          <Heading size="lg" mb={4}>Sales Targets and Achievements</Heading>
          <VStack spacing={4}>
            <Box bg={accentColor} p={4} rounded="md" shadow="md" width="full">
              <Heading size="md">Progress Bars and Metrics</Heading>
              <Text>[Current Status Against Targets]</Text>
            </Box>
          </VStack>
        </Box>
      </Flex>

      <Flex direction={{ base: "column", md: "row" }} p={4}>
        <Box flex="1" p={4}>
          <Heading size="lg" mb={4}>Notification Center</Heading>
          <VStack spacing={4}>
            <Box bg={accentColor} p={4} rounded="md" shadow="md" width="full">
              <Heading size="md">Recent Notifications</Heading>
              <Text>[Notifications]</Text>
            </Box>
          </VStack>
        </Box>
      </Flex>

      <Flex as="footer" bg={accentColor} color="white" p={4} justifyContent="space-between" alignItems="center">
        <HStack spacing={4}>
          <Button variant="link" colorScheme="whiteAlpha">Privacy Policy</Button>
          <Button variant="link" colorScheme="whiteAlpha">Terms of Service</Button>
          <Button variant="link" colorScheme="whiteAlpha">Contact Us</Button>
        </HStack>
        <Text>&copy; 2023 RV Dealership. All rights reserved.</Text>
      </Flex>
    </Box>
  );
};

export default SalesManagerDashboard;