import { supabase } from './index.js';

const setupTables = async () => {
  try {
    // Create roles table
    await supabase.rpc('execute_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS roles (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL UNIQUE
        );
      `
    });

    // Create users table
    await supabase.rpc('execute_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          first_name TEXT,
          last_name TEXT,
          email TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL,
          phone TEXT,
          store_location TEXT,
          role_id INTEGER REFERENCES roles(id)
        );
      `
    });

    // Insert initial data into roles table
    await supabase.rpc('execute_sql', {
      sql: `
        INSERT INTO roles (name) VALUES
        ('Admin'),
        ('Salesperson'),
        ('Manager')
        ON CONFLICT (name) DO NOTHING;
      `
    });

    // Insert initial data into users table
    await supabase.rpc('execute_sql', {
      sql: `
        INSERT INTO users (first_name, last_name, email, password, phone, store_location, role_id) VALUES
        ('Mark', 'Williamson', 'mark@rvstation.com', '$2b$12$KIXn8dqzE8F91c29EboErOYZHziFz1lQrw1Xv/FV1Q/ykXk5aMROG', '5805795036', 'Colbert', 1)
        ON CONFLICT (email) DO NOTHING;
      `
    });

    console.log('Tables created and initial data inserted successfully.');
  } catch (error) {
    console.error('Error setting up tables:', error.message);
  }
};

setupTables();