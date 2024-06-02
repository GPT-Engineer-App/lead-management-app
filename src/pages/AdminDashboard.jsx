import { useState } from "react";
import { useUsers, useAddUser, useUpdateUser, useDeleteUser } from "../integrations/supabase/index.js";
import { Box, Flex, Heading, Text, VStack, HStack, Button, Avatar, IconButton, useColorModeValue, Menu, MenuButton, MenuList, MenuItem, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Select, Input } from "@chakra-ui/react";
import { FaBell, FaCalendarAlt, FaChartBar, FaClipboardList, FaHome, FaUser, FaUsers, FaSignOutAlt, FaCog } from "react-icons/fa";

const AdminDashboard = () => {
  const bg = useColorModeValue("gray.900", "gray.100");
  const color = useColorModeValue("white", "gray.800");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({ username: "", email: "", role: "Salesperson", password: "" });

  const openModal = (type, user = null) => {
    setModalType(type);
    setSelectedUser(user);
    setFormData(user ? { username: user.username, email: user.email, role: user.role, password: "" } : { username: "", email: "", role: "Salesperson", password: "" });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    setFormData({ username: "", email: "", role: "Salesperson", password: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const { data: users, isLoading, error } = useUsers();

  const addUser = useAddUser();
  const updateUser = useUpdateUser();
  const deleteUser = useDeleteUser();

  const handleAddUser = () => {
    addUser.mutate(formData, {
      onSuccess: () => {
        closeModal();
      },
    });
  };

  const handleUpdateUser = () => {
    updateUser.mutate({ ...selectedUser, ...formData }, {
      onSuccess: () => {
        closeModal();
      },
    });
  };

  const handleDeleteUser = (userId) => {
    deleteUser.mutate(userId);
  };

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
          <Menu>
            <MenuButton as={Button} variant="ghost" colorScheme="whiteAlpha">
              <Avatar name="Admin" src="/path-to-admin-avatar.png" />
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
          <Heading size="lg" mb={4}>Overview</Heading>
          <VStack spacing={4}>
            <Box bg="gray.800" p={4} rounded="md" shadow="md" width="full">
              <Heading size="md">Leads Summary</Heading>
              <Text>New: XX</Text>
              <Text>Active: XX</Text>
              <Text>Closed: XX</Text>
            </Box>
            <Box bg="gray.800" p={4} rounded="md" shadow="md" width="full">
              <Heading size="md">User Management</Heading>
              <Button colorScheme="blue" onClick={() => openModal("add")}>Add User</Button>
              {isLoading ? (
                <Text>Loading...</Text>
              ) : error ? (
                <Text>Error loading users</Text>
              ) : (
                <VStack spacing={4} mt={4}>
                  {users.map((user) => (
                    <Flex key={user.id} justifyContent="space-between" alignItems="center" width="full">
                      <Text>{user.username} ({user.role})</Text>
                      <HStack spacing={2}>
                        <Button size="sm" onClick={() => openModal("edit", user)}>Edit</Button>
                        <Button size="sm" colorScheme="red" onClick={() => handleDeleteUser(user.id)}>Delete</Button>
                      </HStack>
                    </Flex>
                  ))}
                </VStack>
              )}
            </Box>
            <Box bg="gray.800" p={4} rounded="md" shadow="md" width="full">
              <Heading size="md">RV Inventory Management</Heading>
              <Text>[Inventory List with Actions]</Text>
            </Box>
            <Box bg="gray.800" p={4} rounded="md" shadow="md" width="full">
              <Heading size="md">Sales Analytics and Reports</Heading>
              <Text>[Charts and Graphs]</Text>
            </Box>
            <Box bg="gray.800" p={4} rounded="md" shadow="md" width="full">
              <Heading size="md">Calendar</Heading>
              <Text>[Monthly View with Events and Deadlines]</Text>
            </Box>
            <Box bg="gray.800" p={4} rounded="md" shadow="md" width="full">
              <Heading size="md">Notification Center</Heading>
              <Text>[Recent Notifications]</Text>
            </Box>
          </VStack>
        </Box>
      </Flex>

      <Flex as="footer" bg="gray.800" color="white" p={4} justifyContent="space-between" alignItems="center">
        <HStack spacing={4}>
          <Button variant="link" colorScheme="whiteAlpha">Privacy Policy</Button>
          <Button variant="link" colorScheme="whiteAlpha">Terms of Service</Button>
          <Button variant="link" colorScheme="whiteAlpha">Contact Us</Button>
        </HStack>
        <Text>&copy; 2023 RV Dealership. All rights reserved.</Text>
      </Flex>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalType === "add" ? "Add User" : "Edit User"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input name="username" value={formData.username} onChange={handleInputChange} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input name="email" value={formData.email} onChange={handleInputChange} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input name="password" type="password" value={formData.password} onChange={handleInputChange} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Role</FormLabel>
              <Select name="role" value={formData.role} onChange={handleInputChange}>
                <option value="Administrator">Administrator</option>
                <option value="Sales Manager">Sales Manager</option>
                <option value="Salesperson">Salesperson</option>
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={modalType === "add" ? handleAddUser : handleUpdateUser}>
              {modalType === "add" ? "Add" : "Update"}
            </Button>
            <Button variant="ghost" onClick={closeModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AdminDashboard;