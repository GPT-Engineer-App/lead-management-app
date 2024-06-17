import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { createContext, useContext, useState } from 'react';

const queryClient = new QueryClient();
const MockAuthContext = createContext();

const mockUsers = [
  { id: '1', username: 'admin', email: 'admin@example.com', role: 'Administrator', password: 'adminpassword' },
  { id: '2', username: 'salesmanager', email: 'salesmanager@example.com', role: 'Sales Manager', password: 'salesmanagerpassword' },
  { id: '3', username: 'salesperson', email: 'salesperson@example.com', role: 'Salesperson', password: 'salespersonpassword' },
];

const mockPosts = [];
const mockComments = [];

const MockAuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);

  const login = (username, password) => {
    const user = mockUsers.find((user) => user.username === username && user.password === password);
    if (user) {
      setSession(user);
      return user;
    }
    return null;
  };

  const logout = () => {
    setSession(null);
  };

  return (
    <MockAuthContext.Provider value={{ session, login, logout }}>
      {children}
    </MockAuthContext.Provider>
  );
};

const useMockAuth = () => {
  return useContext(MockAuthContext);
};

const fromMock = async (query) => {
  return query();
};

const useUsers = () => useQuery({
  queryKey: ['users'],
  queryFn: () => fromMock(() => mockUsers),
});

const useAddUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newUser) => fromMock(() => {
      mockUsers.push({ ...newUser, id: String(mockUsers.length + 1) });
      return newUser;
    }),
    onSuccess: () => {
      queryClient.invalidateQueries('users');
    },
  });
};

const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedUser) => fromMock(() => {
      const index = mockUsers.findIndex((user) => user.id === updatedUser.id);
      if (index !== -1) {
        mockUsers[index] = updatedUser;
      }
      return updatedUser;
    }),
    onSuccess: () => {
      queryClient.invalidateQueries('users');
    },
  });
};

const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId) => fromMock(() => {
      const index = mockUsers.findIndex((user) => user.id === userId);
      if (index !== -1) {
        mockUsers.splice(index, 1);
      }
      return userId;
    }),
    onSuccess: () => {
      queryClient.invalidateQueries('users');
    },
  });
};

const usePosts = () => useQuery({
  queryKey: ['posts'],
  queryFn: () => fromMock(() => mockPosts),
});

const useAddPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newPost) => fromMock(() => {
      mockPosts.push({ ...newPost, id: String(mockPosts.length + 1) });
      return newPost;
    }),
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
    },
  });
};

const useComments = () => useQuery({
  queryKey: ['comments'],
  queryFn: () => fromMock(() => mockComments),
});

const useAddComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newComment) => fromMock(() => {
      mockComments.push({ ...newComment, id: String(mockComments.length + 1) });
      return newComment;
    }),
    onSuccess: () => {
      queryClient.invalidateQueries('comments');
    },
  });
};

export {
  queryClient,
  MockAuthProvider,
  useMockAuth,
  useUsers,
  useAddUser,
  useUpdateUser,
  useDeleteUser,
  usePosts,
  useAddPost,
  useComments,
  useAddComment,
  QueryClientProvider,
};