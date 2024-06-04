const { supabase } = require('../integrations/supabase/index.js');

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { data, error } = await supabase.from('users').insert([req.body]);
    if (error) throw error;
    res.status(201).json({ message: 'User created successfully', user: data[0] });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Retrieve all users
exports.getUsers = async (req, res) => {
  try {
    const { data, error } = await supabase.from('users').select('*');
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Retrieve a user by ID
exports.getUserById = async (req, res) => {
  try {
    const { data, error } = await supabase.from('users').select('*').eq('id', req.params.id).single();
    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'User not found' });
    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
  try {
    const { data, error } = await supabase.from('users').update(req.body).eq('id', req.params.id);
    if (error) throw error;
    if (!data.length) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User updated successfully', user: data[0] });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
  try {
    const { data, error } = await supabase.from('users').delete().eq('id', req.params.id);
    if (error) throw error;
    if (!data.length) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};