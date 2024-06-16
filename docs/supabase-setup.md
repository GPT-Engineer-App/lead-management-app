# Supabase Setup Instructions

To set up the necessary tables and insert initial data into your Supabase database, follow these steps:

1. **Log in to Supabase:**
   - Go to [Supabase](https://supabase.io/) and log in to your account.

2. **Open the SQL Editor:**
   - Select your project.
   - In the left-hand menu, click on "SQL Editor".

3. **Run the SQL Script:**
   - Copy the following SQL script:

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

   - Paste the script into the SQL editor.
   - Click on the "RUN" button to execute the script.

4. **Verify the Tables and Data:**
   - Go to the "Table Editor" in the left-hand menu.
   - Verify that the `roles` and `users` tables have been created.
   - Check that the initial data has been inserted correctly.

You have now successfully set up your Supabase database with the necessary tables and initial data.