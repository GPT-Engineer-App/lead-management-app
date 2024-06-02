import { Box, Flex, Heading, Text, VStack, HStack, Button, Avatar, IconButton, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { FaBell, FaCalendarAlt, FaChartBar, FaClipboardList, FaHome, FaUser, FaSignOutAlt, FaCog } from "react-icons/fa";

const SalesmanDashboard = () => {
  const bgGradient = "linear(to-r, gray.700, black)";
  const color = "white";
  const accentColorGreen = "neonGreen";
  const accentColorOrange = "neonOrange";

  return (
    <Box bgGradient={bgGradient} color={color} minH="100vh">
      <Flex as="header" bg={accentColorGreen} color="white" p={4} justifyContent="space-between" alignItems="center" boxShadow="md">
        <HStack spacing={4}>
          <Avatar name="RV Dealership" src="/path-to-logo.png" />
          <Heading size="md">RV Dealership</Heading>
        </HStack>
        <HStack spacing={4}>
          <Button leftIcon={<FaHome />} variant="ghost" colorScheme="whiteAlpha">Dashboard</Button>
          <Button leftIcon={<FaClipboardList />} variant="ghost" colorScheme="whiteAlpha">Leads</Button>
          <Button leftIcon={<FaChartBar />} variant="ghost" colorScheme="whiteAlpha">Metrics</Button>
          <Button leftIcon={<FaCalendarAlt />} variant="ghost" colorScheme="whiteAlpha">Calendar</Button>
          <IconButton icon={<FaBell />} variant="ghost" colorScheme="whiteAlpha" />
          <Menu>
            <MenuButton as={Button} variant="ghost" colorScheme="whiteAlpha">
              <Avatar name="Salesman" src="/path-to-admin-avatar.png" />
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
          <Heading size="lg" mb={4}>Personal Lead Management</Heading>
          <VStack spacing={4}>
            <Box bg={accentColorOrange} p={4} rounded="md" shadow="md" width="full">
              <Heading size="md">Lead List</Heading>
              <Text>[Lead List with Actions]</Text>
            </Box>
          </VStack>
        </Box>

        <Box flex="1" p={4}>
          <Heading size="lg" mb={4}>Sales Metrics and Performance Tracking</Heading>
          <VStack spacing={4}>
            <Box bg={accentColorOrange} p={4} rounded="md" shadow="md" width="full">
              <Heading size="md">Performance Metrics</Heading>
              <Text>[Charts and Graphs]</Text>
            </Box>
          </VStack>
        </Box>
      </Flex>

      <Flex direction={{ base: "column", md: "row" }} p={4}>
        <Box flex="1" p={4}>
          <Heading size="lg" mb={4}>Calendar</Heading>
          <VStack spacing={4}>
            <Box bg={accentColorOrange} p={4} rounded="md" shadow="md" width="full">
              <Heading size="md">Appointments and Tasks</Heading>
              <Text>[Monthly View]</Text>
            </Box>
          </VStack>
        </Box>

        <Box flex="1" p={4}>
          <Heading size="lg" mb={4}>New Lead Addition and Updating</Heading>
          <VStack spacing={4}>
            <Box bg={accentColorOrange} p={4} rounded="md" shadow="md" width="full">
              <Heading size="md">Lead Forms</Heading>
              <Text>[Forms for Adding/Updating Leads]</Text>
            </Box>
          </VStack>
        </Box>
      </Flex>

      <Flex direction={{ base: "column", md: "row" }} p={4}>
        <Box flex="1" p={4}>
          <Heading size="lg" mb={4}>Notification Center</Heading>
          <VStack spacing={4}>
            <Box bg={accentColorOrange} p={4} rounded="md" shadow="md" width="full">
              <Heading size="md">Recent Notifications</Heading>
              <Text>[Notifications]</Text>
            </Box>
          </VStack>
        </Box>
      </Flex>

      <Flex as="footer" bg={accentColorGreen} color="white" p={4} justifyContent="space-between" alignItems="center" boxShadow="md">
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

export default SalesmanDashboard;