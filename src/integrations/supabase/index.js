import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const supabaseUrl = 'https://jdxgdremrrjjyrxvfpwq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpkeGdkcmVtcnJqanlyeHZmcHdxIiwicm9sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcwODQ5ODAsImV4cCI6MjAzMjY2MDk4MH0.CMVGMxu5kMH1z9KAxE7HH6hrUdsCYjTF11eSQuJDDk0';
const supabase = createClient(supabaseUrl, supabaseKey, {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  },
});

import React from "react";
export const queryClient = new QueryClient();
export function SupabaseProvider({ children }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/* supabase integration types

User // table: users
    id: uuid
    username: string
    email: string
    role: string
    password: string

Post // table: posts
    id: uuid
    user_id: uuid // foreign key to User
    title: string
    content: string
    created_at: timestamp

Comment // table: comments
    id: uuid
    post_id: uuid // foreign key to Post
    user_id: uuid // foreign key to User
    content: string
    created_at: timestamp

*/

// Hooks for User table
export const useUsers = () => useQuery({
    queryKey: ['users'],
    queryFn: () => fromSupabase(supabase.from('users').select('*')),
});

export const useAddUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newUser) => fromSupabase(supabase.from('users').insert([newUser])),
        onSuccess: () => {
            queryClient.invalidateQueries('users');
        },
    });
};

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedUser) => fromSupabase(supabase.from('users').update(updatedUser).eq('id', updatedUser.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('users');
        },
    });
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (userId) => fromSupabase(supabase.from('users').delete().eq('id', userId)),
        onSuccess: () => {
            queryClient.invalidateQueries('users');
        },
    });
};

// Hooks for Post table
export const usePosts = () => useQuery({
    queryKey: ['posts'],
    queryFn: () => fromSupabase(supabase.from('posts').select('*')),
});

export const useAddPost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newPost) => fromSupabase(supabase.from('posts').insert([newPost])),
        onSuccess: () => {
            queryClient.invalidateQueries('posts');
        },
    });
};

// Hooks for Comment table
export const useComments = () => useQuery({
    queryKey: ['comments'],
    queryFn: () => fromSupabase(supabase.from('comments').select('*')),
});

export const useAddComment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newComment) => fromSupabase(supabase.from('comments').insert([newComment])),
        onSuccess: () => {
            queryClient.invalidateQueries('comments');
        },
    });
};

// Function to add necessary users
export const addNecessaryUsers = async () => {
    const users = [
        { username: 'admin', email: 'admin@example.com', password: 'adminpassword', role_id: '29240' },
        { username: 'salesmanager', email: 'salesmanager@example.com', password: 'salesmanagerpassword', role_id: '29241' },
        { username: 'salesperson', email: 'salesperson@example.com', password: 'salespersonpassword', role_id: '29242' },
    ];

    for (const user of users) {
        try {
            // Check if the user already exists
            const { data: existingUser, error: fetchError } = await supabase
                .from('users')
                .select('*')
                .eq('username', user.username)
                .single();

            if (fetchError && fetchError.code !== 'PGRST116') {
                throw fetchError;
            }

            if (!existingUser) {
                // Create the user if they do not exist
                const { error: insertError } = await supabase.auth.signUp({
                    email: user.email,
                    password: user.password,
                });

                if (insertError) {
                    throw insertError;
                }

                // Insert user details into the users table
                const { error: userInsertError } = await supabase
                    .from('users')
                    .insert([{ username: user.username, email: user.email, role_id: user.role_id }]);

                if (userInsertError) {
                    throw userInsertError;
                }

                console.log(`User ${user.username} added successfully.`);
            } else {
                console.log(`User ${user.username} already exists.`);
            }
        } catch (error) {
            console.error(`Error adding user ${user.username}:`, error.message);
        }
    }
};

// Call the function to add necessary users
addNecessaryUsers();