# lead-management-app

here is the project url, project api and service role secrect key, also the jwt secret,

https://jdxgdremrrjjyrxvfpwq.supabase.co

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpkeGdkcmVtcnJqanlyeHZmcHdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcwODQ5ODAsImV4cCI6MjAzMjY2MDk4MH0.CMVGMxu5kMH1z9KAxE7HH6hrUdsCYjTF11eSQuJDDk0


eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpkeGdkcmVtcnJqanlyeHZmcHdxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNzA4NDk4MCwiZXhwIjoyMDMyNjYwOTgwfQ.Vypd-8r7mbsFlqcTGCcZVgV8H9m0LEfApBLgUL-xcrk


A06O90ftYuWS4g/p4G3NkZ1qzk2z8vn3k98XQhxuqFih4diDNFbM4GVEu/Tbzu2qrd7cvME10d2TqCdgxSIyAA==
postgres://postgres.jdxgdremrrjjyrxvfpwq:[YOUR-PASSWORD]@aws-0-us-west-1.pooler.supabase.com:6543/postgres
// src/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jdxgdremrrjjyrxvfpwq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiOiImpkeGdkcmVtcnJqanlyeHZmcHdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcwODQ5ODAsImV4cCI6MjAzMjY2MDk4MH0.CMVGMxu5kMH1z9KAxE7HH6hrUdsCYjTF11eSQuJDDk0';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
// src/actions/authActions.js
import supabase from '../supabase';

export const login = (credentials) => {
  return async dispatch => {
    const { username, password } = credentials;
    let { data: user, error } = await supabase
      .from('IndividualUsers')
      .select('*')
      .eq('Username', username)
      .single();

    if (error) {
      dispatch({ type: 'LOGIN_FAILURE' });
      return;
    }

    const { data: roles, error: roleError } = await supabase
      .from('UserRoles')
      .select('*')
      .eq('RoleID', user.RoleID)
      .single();

    if (roleError || user.PasswordHash !== password) {
      dispatch({ type: 'LOGIN_FAILURE' });
      return;
    }

    const userWithRole = {
      ...user,
      role: roles.Name,
    };

    dispatch({ type: 'LOGIN_SUCCESS', user: userWithRole });
  };
};

export const logout = () => {
  return { type: 'LOGOUT' };
};
// src/store.js
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { authReducer } from './reducers/authReducer';
import { leadReducer } from './reducers/leadReducer';
import { userReducer } from './reducers/userReducer';
import { uiReducer } from './reducers/uiReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  leads: leadReducer,
  users: userReducer,
  ui: uiReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
// src/actions/leadActions.js
import supabase from '../supabase';

export const fetchLeads = () => {
  return async dispatch => {
    const { data: leads, error } = await supabase
      .from('Leads')
      .select('*');

    if (error) {
      console.error('Error fetching leads:', error);
      return;
    }

    dispatch({ type: 'FETCH_LEADS_SUCCESS', leads });
  };
};
// src/actions/userActions.js
import supabase from '../supabase';

export const fetchUsers = () => {
  return async dispatch => {
    const { data: users, error } = await supabase
      .from('IndividualUsers')
      .select('*');

    if (error) {
      console.error('Error fetching users:', error);
      return;
    }

    dispatch({ type: 'FETCH_USERS_SUCCESS', users });
  };
};

export const addUser = (user) => {
  return async dispatch => {
    const { data, error } = await supabase
      .from('IndividualUsers')
      .insert([user]);

    if (error) {
      console.error('Error adding user:', error);
      return;
    }

    dispatch({ type: 'ADD_USER_SUCCESS', user: data[0] });
  };
};

export const updateUser = (user) => {
  return async dispatch => {
    const { data, error } = await supabase
      .from('IndividualUsers')
      .update(user)
      .eq('UserID', user.UserID);

    if (error) {
      console.error('Error updating user:', error);
      return;
    }

    dispatch({ type: 'UPDATE_USER_SUCCESS', user: data[0] });
  };
};

export const deleteUser = (userId) => {
  return async dispatch => {
    const { error } = await supabase
      .from('IndividualUsers')
      .delete()
      .eq('UserID', userId);

    if (error) {
      console.error('Error deleting user:', error);
      return;
    }

    dispatch({ type: 'DELETE_USER_SUCCESS', userId });
  };
};
// src/reducers/authReducer.js
const initialState = {
  user: null,
  isAuthenticated: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { ...state, user: action.user, isAuthenticated: true };
    case 'LOGIN_FAILURE':
    case 'LOGOUT':
      return { ...state, user: null, isAuthenticated: false };
    default:
      return state;
  }
};
// src/reducers/leadReducer.js
const initialState = {
  leads: [],
};

export const leadReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_LEADS_SUCCESS':
      return { ...state, leads: action.leads };
    default:
      return state;
  }
};
Login Page
Design:
Color Scheme: Bright vivid oranges, blacks, grays with neon accents.
Background: Immersive RV dealership imagery or scenic landscapes.
Features:
Welcome Message: A welcoming message like "Welcome to [Dealership Name] Lead Management Tool".
Login Form:
Username Field: Labelled and styled to fit the color scheme.
Password Field: With an eye icon for show/hide functionality.
Remember Me Checkbox: Positioned next to the login button.
Login Button: Bright neon accent color to stand out.
Forgot Password Link: Under the login form, in a contrasting color for visibility.
Footer: Small footer with links to privacy policy and terms of service.
Admin Dashboard
Design:
Color Scheme: Monochromatic with bright neon accents (primarily oranges and greens).
Features:
Header:
Logo: Company logo on the top left.
Navigation Menu: Horizontal or vertical with options like Dashboard, Users, Inventory, Reports, Calendar, Notifications.
Profile Dropdown: For account settings and logout.
Main Content:
Overview Section:
Leads Summary: New, active, and closed leads with metrics.
Quick Actions: Buttons for adding new leads, users, and inventory items.
User Management:
User List: Table with options to add, remove, and update users.
RV Inventory Management:
Inventory List: Table with RV details and options to manage inventory.
Sales Analytics and Reports:
Charts and Graphs: Visual representation of sales data and performance.
Calendar:
Events and Deadlines: Monthly view with highlighted important dates.
Notification Center:
Notifications List: Recent notifications with icons and timestamps.
Footer: Quick links and copyright information.
Sales Manager Dashboard
Design:
Color Scheme: Vivid blues and whites with neon accents.
Features:
Header:
Logo: Company logo on the top left.
Navigation Menu: Options like Dashboard, Leads, Performance, Pipeline, Calendar, Tasks, Notifications.
Profile Dropdown: For account settings and logout.
Main Content:
Lead Management:
Lead List: Table with leads and assignment options.
Performance Metrics:
Charts and Graphs: Showing team performance and targets.
Sales Pipeline Overview:
Pipeline Stages: Visual representation of lead stages.
Calendar:
Sales Meetings and Follow-ups: Monthly view with highlighted important dates.
Task Management and Reminders:
Task List: Upcoming tasks with options to mark complete or update.
Sales Targets and Achievements:
Progress Bars and Metrics: Showing current status against targets.
Footer: Quick links and copyright information.
Salesman Dashboard
Design:
Color Scheme: Bright whites with neon green and orange accents.
Features:
Header:
Logo: Company logo on the top left.
Navigation Menu: Options like Dashboard, Leads, Metrics, Calendar, Notifications.
Profile Dropdown: For account settings and logout.
Main Content:
Personal Lead Management:
Lead List: Table with options to view, update, and nurture leads.
Sales Metrics and Performance Tracking:
Charts and Graphs: Visual representation of individual performance.
Calendar:
Appointments and Tasks: Monthly view with highlighted important dates.
New Lead Addition and Updating:
Forms: For adding new leads and updating existing ones.
Notification Center:
Notifications List: Recent notifications with icons and timestamps.
Footer: Quick links and copyright information.
Common Features
Responsive Design: Ensuring usability on both mobile and desktop devices.
Consistent Navigation Menu: Easy access to different sections of the app.
High-Tech Widgets:
Glow Effects: For modern look, applied to buttons, notifications, and important metrics.
Interactive Widgets: For calendars, performance charts, and lead management tools.
Search Functionality: Universal search bar for quick access to leads, users, and inventory.

+----------------------------------------------------------+
|                                                          |
|    +-----------------------------------------------+     |
|    |          [ Immersive Background Image ]       |     |
|    +-----------------------------------------------+     |
|                                                          |
|    +-----------------------------------------------+     |
|    |          Welcome to [Dealership Name]         |     |
|    +-----------------------------------------------+     |
|                                                          |
|    +-----------------------------------------------+     |
|    |   Username:  [__________________________]     |     |
|    +-----------------------------------------------+     |
|    |   Password:  [__________________________]     |     |
|    |        [ Show/Hide Icon ]                     |     |
|    +-----------------------------------------------+     |
|    |   [ ] Remember Me       [ Login Button ]      |     |
|    +-----------------------------------------------+     |
|    |         [Forgot Password?]                    |     |
|    +-----------------------------------------------+     |
|                                                          |
|    +-----------------------------------------------+     |
|    | [ Footer: Privacy Policy | Terms of Service ] |     |
|    +-----------------------------------------------+     |
+----------------------------------------------------------+
+--------------------------------------------------------------+
| Logo           Dashboard   Users   Inventory   Reports   ... |
+--------------------------------------------------------------+
| Profile                                               Logout |
+--------------------------------------------------------------+
|                                                              |
| +---------------------------------+   +--------------------+ |
| |       Overview of All Leads     |   | Notification Center | |
| |  New: XX  Active: XX  Closed: XX|   | +----------------+  | |
| +---------------------------------+   | | [Notification] |  | |
|                                       | +----------------+  | |
| +---------------------------+         | | [Notification] |  | |
| |     User Management       |         | +----------------+  | |
| | +-----------------------+ |         +--------------------+ |
| | | [User List with Actions] |                             |
| | +-----------------------+ |                             |
| +---------------------------+                             |
|                                                              |
| +---------------------------+   +--------------------------+ |
| |  RV Inventory Management  |   |     Sales Analytics      | |
| | +-----------------------+ |   | +----------------------+ | |
| | | [Inventory List with   | |   | | [Charts and Graphs]  | | |
| | |  Actions]              | |   | +----------------------+ | |
| | +-----------------------+ |   +--------------------------+ |
| +---------------------------+                             |
|                                                              |
| +---------------------------+                             |
| |          Calendar          |                             |
| | +-----------------------+ |                             |
| | | [Monthly View with    | |                             |
| | |  Events and Deadlines] | |                             |
| | +-----------------------+ |                             |
| +---------------------------+                             |
|                                                              |
| +----------------------------------------------------------+ |
| | Footer: Quick Links | Copyright Information             | |
+--------------------------------------------------------------+
+--------------------------------------------------------------+
| Logo           Dashboard   Leads   Performance   Pipeline   ... |
+--------------------------------------------------------------+
| Profile                                               Logout |
+--------------------------------------------------------------+
|                                                              |
| +-----------------------------+   +------------------------+ |
| |        Lead Management       |   |      Notification      | |
| | +-------------------------+ |   | +--------------------+ | |
| | | [Lead List with Actions] | |   | | [Notification]    | | |
| | +-------------------------+ |   | +--------------------+ | |
| +-----------------------------+   +------------------------+ |
|                                                              |
| +-----------------------------+   +------------------------+ |
| |     Performance Metrics      |   |   Sales Pipeline       | |
| | +-------------------------+ |   | +--------------------+ | |
| | | [Charts and Graphs]      | |   | | [Pipeline Stages]  | | |
| | +-------------------------+ |   | +--------------------+ | |
| +-----------------------------+   +------------------------+ |
|                                                              |
| +-----------------------------+                             |
| |          Calendar            |                             |
| | +-------------------------+ |                             |
| | | [Monthly View with      | |                             |
| | |  Meetings and Follow-ups]| |                             |
| | +-------------------------+ |                             |
| +-----------------------------+                             |
|                                                              |
| +-----------------------------+                             |
| | Task Management and Reminders|                             |
| | +-------------------------+ |                             |
| | | [Task List]             | |                             |
| | +-------------------------+ |                             |
| +-----------------------------+                             |
|                                                              |
| +----------------------------------------------------------+ |
| | Footer: Quick Links | Copyright Information             | |
+--------------------------------------------------------------+
+--------------------------------------------------------------+
| Logo           Dashboard   Leads   Metrics   Calendar   ...  |
+--------------------------------------------------------------+
| Profile                                               Logout |
+--------------------------------------------------------------+
|                                                              |
| +-----------------------------+   +------------------------+ |
| |     Personal Lead Management |   |      Notification      | |
| | +-------------------------+ |   | +--------------------+ | |
| | | [Lead List with Actions] | |   | | [Notification]    | | |
| | +-------------------------+ |   | +--------------------+ | |
| +-----------------------------+   +------------------------+ |
|                                                              |
| +-----------------------------+   +------------------------+ |
| |     Sales Metrics and        |   |      Calendar           | |
| |      Performance Tracking    |   | +--------------------+ | |
| | +-------------------------+ |   | | [Monthly View]     | | |
| | | [Charts and Graphs]      | |   | +--------------------+ | |
| | +-------------------------+ |   +------------------------+ |
| +-----------------------------+                             |
|                                                              |
| +-----------------------------+                             |
| |   New Lead Addition and      |                             |
| |      Updating Existing Leads |                             |
| | +-------------------------+ |                             |
| | | [Forms for Adding/Updating]|                             |
| | +-------------------------+ |                             |
| +-----------------------------+                             |
|                                                              |
| +----------------------------------------------------------+ |
| | Footer: Quick Links | Copyright Information             | |
+--------------------------------------------------------------+
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <style>
        body {
            background: url('your-image-url.jpg') no-repeat center center fixed;
            background-size: cover;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            font-family: Arial, sans-serif;
        }
        .login-container {
            background: rgba(0, 0, 0, 0.7);
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            color: #fff;
        }
        .login-container h1 {
            color: #ffa500;
        }
        .login-container input {
            width: 100%;
            padding: 10px;
            margin: 10px 0;
            border-radius: 5px;
            border: none;
        }
        .login-container button {
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            background: #ffa500;
            color: #fff;
            cursor: pointer;
        }
        .login-container a {
            color: #ffa500;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="login-container">
        <h1>Welcome to Dealership</h1>
        <form>
            <input type="text" placeholder="Username" required>
            <input type="password" placeholder="Password" required>
            <div>
                <input type="checkbox" id="remember-me">
                <label for="remember-me">Remember Me</label>
            </div>
            <button type="submit">Login</button>
        </form>
        <a href="#">Forgot Password?</a>
    </div>
</body>
</html>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RV Dealership App</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }
        .login-page {
            background: url('your-image-url.jpg') no-repeat center center fixed;
            background-size: cover;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            color: #fff;
        }
        .login-container {
            background: rgba(0, 0, 0, 0.7);
            padding: 20px;
            border-radius: 10px;
            text-align: center;
        }
        .login-container h1 {
            color: #ffa500;
        }
        .login-container input {
            width: 100%;
            padding: 10px;
            margin: 10px 0;
            border-radius: 5px;
            border: none;
        }
        .login-container button {
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            background: #ffa500;
            color: #fff;
            cursor: pointer;
        }
        .login-container a {
            color: #ffa500;
            text-decoration: none;
        }
        .navbar {
            display: flex;
            justify-content: space-between;
            background-color: #444;
            padding: 10px;
            color: #fff;
        }
        .navbar a {
            color: #ffa500;
            text-decoration: none;
            margin: 0 10px;
        }
        .main-content {
            display: flex;
            padding: 20px;
        }
        .sidebar {
            width: 250px;
            background-color: #222;
            padding: 20px;
            color: #fff;
        }
        .content {
            flex: 1;
            padding: 20px;
        }
        .card {
            background-color: #555;
            padding: 20px;
            margin-bottom: 20px;
            border-radius: 10px;
        }
        /* High-tech Calendar Button */
        .calendar-button {
            padding: 15px 30px;
            background-color: #00ff00;
            color: #000;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            font-size: 16px;
            transition: background-color 0.3s;
            box-shadow: 0 0 10px #00ff00;
        }
        .calendar-button:hover {
            background-color: #00cc00;
            box-shadow: 0 0 20px #00cc00;
        }
        /* Calendar Modal */
        .calendar-modal {
            display: none;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #fff;
            color: #000;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            z-index: 1000;
        }
        .calendar-modal h2 {
            margin-top: 0;
        }
        .calendar-modal button {
            margin-top: 10px;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            background: #ffa500;
            color: #fff;
            cursor: pointer;
        }
        .modal-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 999;
        }
    </style>
</head>
<body>
    <!-- Login Page -->
    <div class="login-page">
        <div class="login-container">
            <h1>Welcome to Dealership</h1>
            <form>
                <input type="text" placeholder="Username" required>
                <input type="password" placeholder="Password" required>
                <div>
                    <input type="checkbox" id="remember-me">
                    <label for="remember-me">Remember Me</label>
                </div>
                <button type="submit">Login</button>
            </form>
            <a href="#">Forgot Password?</a>
        </div>
    </div>

    <!-- Admin Dashboard -->
    <div class="navbar">
        <div>
            <a href="#">Dashboard</a>
            <a href="#">Users</a>
            <a href="#">Inventory</a>
            <a href="#">Reports</a>
        </div>
        <div>
            <a href="#">Profile</a>
            <a href="#">Logout</a>
        </div>
    </div>
    <div class="main-content">
        <div class="sidebar">
            <div class="card">
                <h2>Leads Overview</h2>
                <p>New: XX</p>
                <p>Active: XX</p>
                <p>Closed: XX</p>
            </div>
        </div>
        <div class="content">
            <div class="card">
                <h2>User Management</h2>
                <p>[User List with Actions]</p>
            </div>
            <div class="card">
                <h2>RV Inventory Management</h2>
                <p>[Inventory List with Actions]</p>
            </div>
            <div class="card">
                <h2>Sales Analytics and Reports</h2>
                <p>[Charts and Graphs]</p>
            </div>
            <div class="card">
                <h2>Calendar</h2>
                <button class="calendar-button" onclick="openCalendar()">Open Calendar</button>
            </div>
            <div class="card">
                <h2>Notification Center</h2>
                <p>[Notifications]</p>
            </div>
        </div>
    </div>

    <!-- Calendar Modal -->
    <div class="modal-overlay" id="modal-overlay"></div>
    <div class="calendar-modal" id="calendar-modal">
        <h2>Calendar</h2>
        <div id="calendar"></div>
        <button onclick="saveCalendar()">Save</button>
        <button onclick="closeCalendar()">Close</button>
    </div>

    <script>
        function openCalendar() {
            document.getElementById('calendar-modal').style.display = 'block';
            document.getElementById('modal-overlay').style.display = 'block';
        }

        function closeCalendar() {
            document.getElementById('calendar-modal').style.display = 'none';
            document.getElementById('modal-overlay').style.display = 'none';
        }

        function saveCalendar() {
            // Add logic to save calendar events
            closeCalendar();
        }
    </script>
</body>
</html>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RV Dealership App</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }
        .login-page {
            background: url('your-image-url.jpg') no-repeat center center fixed;
            background-size: cover;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            color: #fff;
        }
        .login-container {
            background: rgba(0, 0, 0, 0.7);
            padding: 20px;
            border-radius: 10px;
            text-align: center;
        }
        .login-container h1 {
            color: #ffa500;
        }
        .login-container input {
            width: 100%;
            padding: 10px;
            margin: 10px 0;
            border-radius: 5px;
            border: none;
        }
        .login-container button {
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            background: #ffa500;
            color: #fff;
            cursor: pointer;
        }
        .login-container a {
            color: #ffa500;
            text-decoration: none;
        }
        .navbar {
            display: flex;
            justify-content: space-between;
            background-color: #444;
            padding: 10px;
            color: #fff;
        }
        .navbar a {
            color: #ffa500;
            text-decoration: none;
            margin: 0 10px;
        }
        .main-content {
            display: flex;
            padding: 20px;
        }
        .sidebar {
            width: 250px;
            background-color: #222;
            padding: 20px;
            color: #fff;
        }
        .content {
            flex: 1;
            padding: 20px;
        }
        .card {
            background-color: #555;
            padding: 20px;
            margin-bottom: 20px;
            border-radius: 10px;
        }
        /* High-tech Calendar Button */
        .calendar-button {
            padding: 15px 30px;
            background-color: #00ff00;
            color: #000;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            font-size: 16px;
            transition: background-color 0.3s;
            box-shadow: 0 0 10px #00ff00;
        }
        .calendar-button:hover {
            background-color: #00cc00;
            box-shadow: 0 0 20px #00cc00;
        }
        /* Calendar Modal */
        .calendar-modal {
            display: none;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #fff;
            color: #000;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
            z-index: 1000;
        }
        .calendar-modal h2 {
            margin-top: 0;
        }
        .calendar-modal button {
            margin-top: 10px;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            background: #ffa500;
            color: #fff;
            cursor: pointer;
        }
        .modal-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 999;
        }
    </style>
</head>
<body>
    <!-- Login Page -->
    <div class="login-page">
        <div class="login-container">
            <h1>Welcome to Dealership</h1>
            <form>
                <input type="text" placeholder="Username" required>
                <input type="password" placeholder="Password" required>
                <div>
                    <input type="checkbox" id="remember-me">
                    <label for="remember-me">Remember Me</label>
                </div>
                <button type="submit">Login</button>
            </form>
            <a href="#">Forgot Password?</a>
        </div>
    </div>

    <!-- Admin Dashboard -->
    <div class="navbar">
        <div>
            <a href="#">Dashboard</a>
            <a href="#">Users</a>
            <a href="#">Inventory</a>
            <a href="#">Reports</a>
        </div>
        <div>
            <a href="#">Profile</a>
            <a href="#">Logout</a>
        </div>
    </div>
    <div class="main-content">
        <div class="sidebar">
            <div class="card">
                <h2>Leads Overview</h2>
                <p>New: XX</p>
                <p>Active: XX</p>
                <p>Closed: XX</p>
            </div>
        </div>
        <div class="content">
            <div class="card">
                <h2>User Management</h2>
                <p>[User List with Actions]</p>
            </div>
            <div class="card">
                <h2>RV Inventory Management</h2>
                <p>[Inventory List with Actions]</p>
            </div>
            <div class="card">
                <h2>Sales Analytics and Reports</h2>
                <p>[Charts and Graphs]</p>
            </div>
            <div class="card">
                <h2>Calendar</h2>
                <button class="calendar-button" onclick="openCalendar()">Open Calendar</button>
            </div>
            <div class="card">
                <h2>Notification Center</h2>
                <p>[Notifications]</p>
            </div>
        </div>
    </div>

    <!-- Sales Manager Dashboard -->
    <div class="navbar">
        <div>
            <a href="#">Dashboard</a>
            <a href="#">Leads</a>
            <a href="#">Performance</a>
            <a href="#">Pipeline</a>
        </div>
        <div>
            <a href="#">Profile</a>
            <a href="#">Logout</a>
        </div>
    </div>
    <div class="main-content">
        <div class="sidebar">
            <div class="card">
                <h2>Lead Management</h2>
                <p>[Lead List with Actions]</p>
            </div>
        </div>
        <div class="content">
            <div class="card">
                <h2>Performance Metrics</h2>
                <p>[Charts and Graphs]</p>
            </div>
            <div class="card">
                <h2>Sales Pipeline</h2>
                <p>[Pipeline Stages]</p>
            </div>
            <div class="card">
                <h2>Calendar</h2>
                <button class="calendar-button" onclick="openCalendar()">Open Calendar</button>
            </div>
            <div class="card">
                <h2>Task Management and Reminders</h2>
                <p>[Task List]</p>
            </div>
            <div class="card">
                <h2>Sales Targets and Achievements</h2>
                <p>[Progress Bars and Metrics]</p>
            </div>
            <div class="card">
                <h2>Notification Center</h2>
                <p>[Notifications]</p>
            </div>
        </div>
    </div>

    <!-- Salesman Dashboard -->
    <div class="navbar">
        <div>
            <a href="#">Dashboard</a>
            <a href="#">Leads</a>
            <a href="#">Metrics</a>
            <a href="#">Calendar</a>
        </div>
        <div>
            <a href="#">Profile</a>
            <a href="#">Logout</a>
        </div>
    </div>
    <div class="main-content">
        <div class="sidebar">
            <div class="card">
                <h2>Personal Lead Management</h2>
                <p>[Lead List with Actions]</p>
            </div>
        </div>
        <div class="content">
            <div class="card">
                <h2>Sales Metrics and Performance Tracking</h2>
                <p>[Charts and Graphs]</p>
            </div>
            <div class="card">
                <h2>Calendar</h2>
                <button class="calendar-button" onclick="openCalendar()">Open Calendar</button>
            </div>
            <div class="card">
                <h2>New Lead Addition and Updating Existing Leads</h2>
                <p>[Forms for Adding/Updating]</p>
            </div>
            <div class="card">
                <h2>Notification Center</h2>
                <p>[Notifications]</p>
            </div>
        </div>
    </
    </div>
    <!-- Salesman Dashboard Continued -->
    <div class="content">
        <div class="card">
            <h2>Sales Metrics and Performance Tracking</h2>
            <p>[Charts and Graphs]</p>
        </div>
        <div class="card">
            <h2>Calendar</h2>
            <button class="calendar-button" onclick="openCalendar()">Open Calendar</button>
        </div>
        <div class="card">
            <h2>New Lead Addition and Updating Existing Leads</h2>
            <p>[Forms for Adding/Updating]</p>
        </div>
        <div class="card">
            <h2>Notification Center</h2>
            <p>[Notifications]</p>
        </div>
    </div>

    <!-- Calendar Modal -->
    <div class="modal-overlay" id="modal-overlay"></div>
    <div class="calendar-modal" id="calendar-modal">
        <h2>Calendar</h2>
        <div id="calendar"></div>
        <button onclick="saveCalendar()">Save</button>
        <button onclick="closeCalendar()">Close</button>
    </div>

    <script>
        function openCalendar() {
            document.getElementById('calendar-modal').style.display = 'block';
            document.getElementById('modal-overlay').style.display = 'block';
        }

        function closeCalendar() {
            document.getElementById('calendar-modal').style.display = 'none';
            document.getElementById('modal-overlay').style.display = 'none';
        }

        function saveCalendar() {
            // Add logic to save calendar events
            closeCalendar();
        }
    </script>
</body>
</html>
+------------------------------------------------------+
|                                                      |
|   [ Calendar Button ]                                |
|   +------------------------------------------------+ |
|   | +------------------+   +---------------------+ | |
|   | |  Mon  |  Tue  |  Wed  |  Thu  |  Fri  |  Sat  | | |
|   | +---------------------------------------------+ | |
|   | |   1   |   2   |   3   |   4   |   5   |   6   | | |
|   | +-------+-------+-------+-------+-------+-------+ | |
|   | |   7   |   8   |   9   |  10   |  11   |  12   | | |
|   | +-------+-------+-------+-------+-------+-------+ | |
|   | |  13   |  14   |  15   |  16   |  17   |  18   | | |
|   | +-------+-------+-------+-------+-------+-------+ | |
|   | |  19   |  20   |  21   |  22   |  23   |  24   | | |
|   | +-------+-------+-------+-------+-------+-------+ | |
|   | |  25   |  26   |  27   |  28   |  29   |  30   | | |
|   | +-------+-------+-------+-------+-------+-------+ | |
|   | [Save Button] [Close Button]                     | |
|   +------------------------------------------------+ |
|                                                      |
+------------------------------------------------------+
+------------------------------------------------------+
|                                                      |
|   Performance Metrics                                 |
|   +------------------------------------------------+ |
|   | +---------------------------+                   | |
|   | | Sales (Bar Chart)         |                   | |
|   | +---------------------------+                   | |
|   | +---------------------------+                   | |
|   | | Conversion Rate (Pie Chart)|                  | |
|   | +---------------------------+                   | |
|   | +---------------------------+                   | |
|   | | Lead Time (Line Graph)    |                   | |
|   | +---------------------------+                   | |
|                                                      |
+------------------------------------------------------+
+------------------------------------------------------+
|                                                      |
|   Notification Center                                 |
|   +------------------------------------------------+ |
|   | +---------------------------------------------+ | |
|   | |  [ Notification 1 ]                         | | |
|   | +---------------------------------------------+ | |
|   | +---------------------------------------------+ | |
|   | |  [ Notification 2 ]                         | | |
|   | +---------------------------------------------+ | |
|   | +---------------------------------------------+ | |
|   | |  [ Notification 3 ]                         | | |
|   | +---------------------------------------------+ | |
|   | +---------------------------------------------+ | |
|   | |  [ Notification 4 ]                         | | |
|   | +---------------------------------------------+ | |
|                                                      |
+------------------------------------------------------+
+------------------------------------------------------+
|                                                      |
|   Task Management and Reminders                      |
|   +------------------------------------------------+ |
|   | +---------------------------------------------+ | |
|   | | Task 1: [ Description ] [ Due Date ]        | | |
|   | | [Complete] [Edit] [Delete]                  | | |
|   | +---------------------------------------------+ | |
|   | +---------------------------------------------+ | |
|   | | Task 2: [ Description ] [ Due Date ]        | | |
|   | | [Complete] [Edit] [Delete]                  | | |
|   | +---------------------------------------------+ | |
|   | +---------------------------------------------+ | |
|   | | Task 3: [ Description ] [ Due Date ]        | | |
|   | | [Complete] [Edit] [Delete]                  | | |
|   | +---------------------------------------------+ | |
|   | +---------------------------------------------+ | |
|   | | Task 4: [ Description ] [ Due Date ]        | | |
|   | | [Complete] [Edit] [Delete]                  | | |
|   | +---------------------------------------------+ | |
|                                                      |
+------------------------------------------------------+
+------------------------------------------------------+
|                                                      |
|   Lead Management                                     |
|   +------------------------------------------------+ |
|   | +-------------------+  +-----------------------+| |
|   | |  Lead 1           |  |  [ Actions ]          | | |
|   | +-------------------+  +-----------------------+| |
|   | +-------------------+  +-----------------------+| |
|   | |  Lead 2           |  |  [ Actions ]          | | |
|   | +-------------------+  +-----------------------+| |
|   | +-------------------+  +-----------------------+| |
|   | |  Lead 3           |  |  [ Actions ]          | | |
|   | +-------------------+  +-----------------------+| |
|   | +-------------------+  +-----------------------+| |
|   | |  Lead 4           |  |  [ Actions ]          | | |
|   | +-------------------+  +-----------------------+| |
|                                                      |
+------------------------------------------------------+
+------------------------------------------------------+
|                                                      |
|   +----------------------------------------------+   |
|   | [ Lead List ]                                |   |
|   +----------------------------------------------+   |
|                                                      |
|   +----------------------------------------------+   |
|   | Lead 1                                         | |
|   | +------------------------------------------+ | |
|   | |  [Name: John Doe] [Contact Info]         | | |
|   | |  [Lead Status: Active]                   | | |
|   | +------------------------------------------+ | |
|   |                                              | |
|   |  +----------+  +-----------+  +-----------+  | |
|   |  | View Details | Edit Lead | Remove Lead |  | |
|   |  +----------+  +-----------+  +-----------+  | |
|   +----------------------------------------------+   |
|                                                      |
+------------------------------------------------------+
+------------------------------------------------------+
|                                                      |
|   +----------------------------------------------+   |
|   | [ Dashboard ]                               |   |
|   +----------------------------------------------+   |
|                                                      |
|   +----------------------------------------------+   |
|   | Calendar                                      | |
|   | +------------------------------------------+ | |
|   | | [Month: June 2024]                        | | |
|   | +------------------------------------------+ | |
|   | | +---------+ +---------+ +---------+      | | |
|   | | | Mon | Tue | Wed | Thu | Fri | Sat | Sun | | |
|   | | +-----+ +-----+ +-----+ +-----+ +-----+ +---+ | |
|   | | |  1  |  2  |  3  |  4  |  5  |  6  |  7  | 8 | |
|   | | +-----+ +-----+ +-----+ +-----+ +-----+ +---+ | |
|   | | |  9  | 10  | 11  | 12  | 13  | 14  | 15  | 16 | |
|   | | +-----+ +-----+ +-----+ +-----+ +-----+ +---+ | |
|   | | | 17  | 18  | 19  | 20  | 21  | 22  | 23  | 24 | |
|   | | +-----+ +-----+ +-----+ +-----+ +-----+ +---+ | |
|   | | | 25  | 26  | 27  | 28  | 29  | 30  | 31  |   | |
|   | +------------------------------------------+ | |
|   +----------------------------------------------+   |
|                                                      |
+------------------------------------------------------+
+------------------------------------------------------+
|                                                      |
|   +----------------------------------------------+   |
|   | [ Dashboard ]                               |   |
|   +----------------------------------------------+   |
|                                                      |
|   +----------------------------------------------+   |
|   | Performance Metrics                             | |
|   | +------------------------------------------+ | |
|   | | [Sales Bar Chart]                        | | |
|   | +------------------------------------------+ | |
|   | | [Conversion Rate Pie Chart]              | | |
|   | +------------------------------------------+ | |
|   | | [Lead Time Line Graph]                   | | |
|   | +------------------------------------------+ | |
|   +----------------------------------------------+   |
|                                                      |
+------------------------------------------------------+
+------------------------------------------------------+
|                                                      |
|   +----------------------------------------------+   |
|   | [ Dashboard ]                               |   |
|   +----------------------------------------------+   |
|                                                      |
|   +----------------------------------------------+   |
|   | Performance Metrics                             | |
|   | +------------------------------------------+ | |
|   | | [Sales Bar Chart]                        | | |
|   | +------------------------------------------+ | |
|   | | [Conversion Rate Pie Chart]              | | |
|   | +------------------------------------------+ | |
|   | | [Lead Time Line Graph]                   | | |
|   | +------------------------------------------+ | |
|   +----------------------------------------------+   |
|                                                      |
+------------------------------------------------------+
+------------------------------------------------------+
|                                                      |
|   +----------------------------------------------+   |
|   | [ Dashboard ]                               |   |
|   +----------------------------------------------+   |
|                                                      |
|   +----------------------------------------------+   |
|   | Performance Metrics                             | |
|   | +------------------------------------------+ | |
|   | | [Sales Bar Chart]                        | | |
|   | +------------------------------------------+ | |
|   | | [Conversion Rate Pie Chart]              | | |
|   | +------------------------------------------+ | |
|   | | [Lead Time Line Graph]                   | | |
|   | +------------------------------------------+ | |
|   +----------------------------------------------+   |
|                                                      |
+------------------------------------------------------+
+------------------------------------------------------+
|                                                      |
|   +----------------------------------------------+   |
|   | [ Dashboard ]                               |   |
|   +----------------------------------------------+   |
|                                                      |
|   +----------------------------------------------+   |
|   | Performance Metrics                             | |
|   | +------------------------------------------+ | |
|   | | [Sales Bar Chart]                        | | |
|   | +------------------------------------------+ | |
|   | | [Conversion Rate Pie Chart]              | | |
|   | +------------------------------------------+ | |
|   | | [Lead Time Line Graph]                   | | |
|   | +------------------------------------------+ | |
|   +----------------------------------------------+   |
|                                                      |
+------------------------------------------------------+
+------------------------------------------------------+
|                                                      |
|   +----------------------------------------------+   |
|   | [ Dashboard ]                               |   |
|   +----------------------------------------------+   |
|                                                      |
|   +----------------------------------------------+   |
|   | Notification Center                             | |
|   | +------------------------------------------+ | |
|   | | [ Notification 1 ]                        | | |
|   | +------------------------------------------+ | |
|   | +------------------------------------------+ | |
|   | | [ Notification 2 ]                        | | |
|   | +------------------------------------------+ | |
|   | +------------------------------------------+ | |
|   | | [ Notification 3 ]                        | | |
|   | +------------------------------------------+ | |
|   +----------------------------------------------+   |
|                                                      |
+------------------------------------------------------+
<!-- Modal for Detailed Lead View -->
<div id="leadModal" class="modal">
  <div class="modal-content">
    <span class="close">&times;</span>
    <h2>Lead Details</h2>
    <p>Name: John Doe</p>
    <p>Contact: johndoe@example.com</p>
    <p>Status: Active</p>
    <!-- Additional lead details here -->
  </div>
</div>
<!-- Slide-In Notification Panel -->
<div id="notificationPanel" class="slide-in-panel">
  <h2>Notifications</h2>
  <p>[Notification 1]</p>
  <p>[Notification 2]</p>
  <p>[Notification 3]</p>
</div>
<style>
  .modal {
    display: none;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.4);
    padding-top: 60px;
  }

  .modal-content {
    background-color: #fefefe;
    margin: 5% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
  }

  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }

  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }

  .slide-in-panel {
    position: fixed;
    right: -300px;
    top: 0;
    width: 300px;
    height: 100%;
    background-color: #111;
    color: #fff;
    overflow-y: auto;
    transition: right 0.3s;
  }

  .slide-in-panel.open {
    right: 0;
  }
</style>

<script>
  // Modal script
  var modal = document.getElementById("leadModal");
  var span = document.getElementsByClassName("close")[0];

  function openModal() {
    modal.style.display = "block";
  }

  span.onclick = function () {
    modal.style.display = "none";
  }

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  // Slide-in panel script
  function togglePanel() {
    var panel = document.getElementById("notificationPanel");
    panel.classList.toggle("open");
  }
</script>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RV Dealership App</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }
        .login-page {
            background: url('your-image-url.jpg') no-repeat center center fixed;
            background-size: cover;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            color: #fff;
        }
        .login-container {
            background: rgba(0, 0, 0, 0.7);
            padding: 20px;
            border-radius: 10px;
            text-align: center;
        }
        .login-container h1 {
            color: #ffa500;
        }
        .login-container input {
            width: 100%;
            padding: 10px;
            margin: 10px 0;
            border-radius: 5px;
            border: none;
        }
        .login-container button {
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            background: #ffa500;
            color: #fff;
            cursor: pointer;
        }
        .login-container a {
            color: #ffa500;
            text-decoration: none;
        }
        .navbar {
            display: flex;
            justify-content: space-between;
            background-color: #444;
            padding: 10px;
            color: #fff;
        }
        .navbar a {
            color: #ffa500;
            text-decoration: none;
            margin: 0 10px;
        }
        .main-content {
            display: flex;
            padding: 20px;
        }
        .sidebar {
            width: 250px;
            background-color: #222;
            padding: 20px;
            color: #fff;
        }
        .content {
            flex: 1;
            padding: 20px;
        }
        .card {
            background-color: #555;
            padding: 20px;
            margin-bottom: 20px;
            border-radius: 10px;
        }
        /* High-tech Calendar Button */
        .calendar-button {
            padding: 15px 30px;
            background-color: #00ff00;
            color: #000;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            font-size: 16px;
            transition: background-color 0.3s;
            box-shadow: 0 0 10px #00ff00;
        }
        .calendar-button:hover {
            background-color: #00cc00;
            box-shadow: 0 0 20px #00cc00;
        }
        /* Calendar Modal */
        .calendar-modal {
            display: none;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #fff;
            color: #000;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba
(0, 0, 0, 0.3);
            z-index: 1000;
        }
        .calendar-modal h2 {
            margin-top: 0;
        }
        .calendar-modal button {
            margin-top: 10px;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            background: #ffa500;
            color: #fff;
            cursor: pointer;
        }
        .modal-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 999;
        }
        /* Slide-in Panel */
        .slide-in-panel {
            position: fixed;
            right: -300px;
            top: 0;
            width: 300px;
            height: 100%;
            background-color: #111;
            color: #fff;
            overflow-y: auto;
            transition: right 0.3s;
        }
        .slide-in-panel.open {
            right: 0;
        }
    </style>
</head>
<body>
    <!-- Login Page -->
    <div class="login-page">
        <div class="login-container">
            <h1>Welcome to Dealership</h1>
            <form>
                <input type="text" placeholder="Username" required>
                <input type="password" placeholder="Password" required>
                <div>
                    <input type="checkbox" id="remember-me">
                    <label for="remember-me">Remember Me</label>
                </div>
                <button type="submit">Login</button>
            </form>
            <a href="#">Forgot Password?</a>
        </div>
    </div>

    <!-- Admin Dashboard -->
    <div class="navbar">
        <div>
            <a href="#">Dashboard</a>
            <a href="#">Users</a>
            <a href="#">Inventory</a>
            <a href="#">Reports</a>
        </div>
        <div>
            <a href="#">Profile</a>
            <a href="#">Logout</a>
        </div>
    </div>
    <div class="main-content">
        <div class="sidebar">
            <div class="card">
                <h2>Leads Overview</h2>
                <p>New: XX</p>
                <p>Active: XX</p>
                <p>Closed: XX</p>
            </div>
        </div>
        <div class="content">
            <div class="card">
                <h2>User Management</h2>
                <p>[User List with Actions]</p>
            </div>
            <div class="card">
                <h2>RV Inventory Management</h2>
                <p>[Inventory List with Actions]</p>
            </div>
            <div class="card">
                <h2>Sales Analytics and Reports</h2>
                <p>[Charts and Graphs]</p>
            </div>
            <div class="card">
                <h2>Calendar</h2>
                <button class="calendar-button" onclick="openCalendar()">Open Calendar</button>
            </div>
            <div class="card">
                <h2>Notification Center</h2>
                <p>[Notifications]</p>
            </div>
        </div>
    </div>

    <!-- Sales Manager Dashboard -->
    <div class="navbar">
        <div>
            <a href="#">Dashboard</a>
            <a href="#">Leads</a>
            <a href="#">Performance</a>
            <a href="#">Pipeline</a>
        </div>
        <div>
            <a href="#">Profile</a>
            <a href="#">Logout</a>
        </div>
    </div>
    <div class="main-content">
        <div class="sidebar">
            <div class="card">
                <h2>Lead Management</h2>
                <p>[Lead List with Actions]</p>
            </div>
        </div>
        <div class="content">
            <div class="card">
                <h2>Performance Metrics</h2>
                <p>[Charts and Graphs]</p>
            </div>
            <div class="card">
                <h2>Sales Pipeline</h2>
                <p>[Pipeline Stages]</p>
            </div>
            <div class="card">
                <h2>Calendar</h2>
                <button class="calendar-button" onclick="openCalendar()">Open Calendar</button>
            </div>
            <div class="card">
                <h2>Task Management and Reminders</h2>
                <p>[Task List]</p>
            </div>
            <div class="card">
                <h2>Sales Targets and Achievements</h2>
                <p>[Progress Bars and Metrics]</p>
            </div>
            <div class="card">
                <h2>Notification Center</h2>
                <p>[Notifications]</p>
            </div>
        </div>
    </div>

    <!-- Salesman Dashboard -->
    <div class="navbar">
        <div>
            <a href="#">Dashboard</a>
            <a href="#">Leads</a>
            <a href="#">Metrics</a>
            <a href="#">Calendar</a>
        </div>
        <div>
            <a href="#">Profile</a>
            <a href="#">Logout</a>
        </div>
    </div>
    <div class="main-content">
        <div class="sidebar">
            <div class="card">
                <h2>Personal Lead Management</h2>
                <p>[Lead List with Actions]</p>
            </div>
        </div>
        <div class="content">
            <div class="card">
                <h2>Sales Metrics and Performance Tracking</h2>
                <p>[Charts and Graphs]</p>
            </div>
            <div class="card">
                <h2>Calendar</h2>
                <button class="calendar-button" onclick="openCalendar()">Open Calendar</button>
            </div>
            <div class="card">
                <h2>New Lead Addition and Updating Existing Leads</h2>
                <p>[Forms for Adding/Updating]</p>
            </div>
            <div class="card">
                <h2>Notification Center</h2>
                <p>[Notifications]</p>
            </div>
        </div>
    </div>

    <!-- Calendar Modal -->
    <div class="modal-overlay" id="modal-overlay"></div>
    <div class="calendar-modal" id="calendar-modal">
        <h2>Calendar</h2>
        <div id="calendar"></div>
        <button onclick="saveCalendar()">Save</button>
        <button onclick="closeCalendar()">Close</button>
    </div>

    <script>
        function openCalendar() {
            document.getElementById('calendar-modal').style.display = 'block';
            document.getElementById('modal-overlay').style.display = 'block';
        }

        function closeCalendar() {
            document.getElementById('calendar-modal').style.display = 'none';
            document.getElementById('modal-overlay').style.display = 'none';
        }

        function saveCalendar() {
            // Add logic to save calendar events
            closeCalendar();
        }

        function togglePanel() {
            var panel = document.getElementById("notificationPanel");
            panel.classList.toggle("open");
        }
    </script>
</body>
</html>


## Collaborate with GPT Engineer

This is a [gptengineer.app](https://gptengineer.app)-synced repository 🌟🤖

Changes made via gptengineer.app will be committed to this repo.

If you clone this repo and push changes, you will have them reflected in the GPT Engineer UI.

## Tech stack

This project is built with React and Chakra UI.

- Vite
- React
- Chakra UI

## Setup

```sh
git clone https://github.com/GPT-Engineer-App/lead-management-app.git
cd lead-management-app
npm i
```

```sh
npm run dev
```

This will run a dev server with auto reloading and an instant preview.

## Requirements

- Node.js & npm - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
