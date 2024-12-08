IRCTC-API - Railway Management System
This is a railway management platform built using Node.js, Express.js, and MySQL. It simulates the IRCTC system for train booking, management, and user registration.

Features
User authentication and registration.
Train management (add, view available trains).
Train booking (reserve seats).
View booked tickets.
Prerequisites
Before you begin, ensure that you have the following installed:

Node.js (v12 or higher)
MySQL (or any other MySQL-compatible database)
Postman (for testing API endpoints)
Steps to Set Up the Application
Step 1: Clone the Repository
bash
Copy code
git clone <repository-url>
Step 2: Navigate to the Project Directory
bash
Copy code
cd Railway-management-API
Step 3: Install Dependencies
Run the following command to install the required dependencies:

bash
Copy code
npm install
Step 4: Configure MySQL Database
Open the .env file in the root directory of the project.
Enter your MySQL database connection details (host, user, password, and database name).
Step 5: Set Up the Database
Open MySQL Workbench (or any other MySQL client).
Import the database schema by running the SQL queries in the "SQL queries to run" file. This file is located in the repository.
The queries will create necessary tables such as users, trains, and bookings.
Step 6: Start the Application
Run the following command to start the server:

bash
Copy code
npm run start
Step 7: Test the API Endpoints
You can test the API using Postman. Import the provided Postman collection from the repository to get started with API testing.

API Endpoints
1. User Registration
POST /register

Request body: { username, password, role }
Registers a new user with a given username, password, and role.
2. User Login
POST /login

Request body: { username, password }
Logs in the user and returns a JWT token.
3. Add Train
POST /add_trains

Request body: { source, destination, total_seats }
Adds a new train to the system.
4. Check Available Trains
GET /check_trains?source={source}&destination={destination}

Checks for available trains between the source and destination.
5. Book Train Ticket
POST /booking-ticket

Request body: { train_id }
Books a seat on the specified train if available.
6. View Booked Tickets
GET /view_tickets

Fetches all tickets booked by the logged-in user.
Additional Notes
JWT Authentication: All protected routes require a valid JWT token in the Authorization header as Bearer <token>.
Ensure your database connection is properly set up before starting the app.
