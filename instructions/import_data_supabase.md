# Instructions to Import Data into Supabase

Follow these steps to create the necessary tables and insert initial data into your Supabase database.

## Step 1: Access Supabase SQL Editor

1. Log in to your Supabase account.
2. Select the project where you want to import the data.
3. Navigate to the "SQL Editor" from the left-hand menu.

## Step 2: Run the SQL Script

1. Copy the following SQL script:

```sql
-- Create roles table
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);

-- Create users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    phone TEXT,
    store_location TEXT,
    role_id INTEGER REFERENCES roles(id)
);

-- Insert initial data into roles table
INSERT INTO roles (name) VALUES
('Admin'),
('Salesperson'),
('Manager');

-- Insert initial data into users table
INSERT INTO users (first_name, last_name, email, password, phone, store_location, role_id) VALUES
('Mark', 'Williamson', 'mark@rvstation.com', '$2b$12$KIXn8dqzE8F91c29EboErOYZHziFz1lQrw1Xv/FV1Q/ykXk5aMROG', '5805795036', 'Colbert', 1);
```

2. Paste the copied SQL script into the SQL Editor.
3. Click on the "Run" button to execute the script.

## Step 3: Verify the Data

1. Navigate to the "Table Editor" from the left-hand menu.
2. Verify that the `roles` and `users` tables have been created.
3. Check that the initial data has been inserted correctly.

You have now successfully imported the necessary data into your Supabase database.