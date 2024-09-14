# Task Manager

⚠️ Before using: Make sure you read the full file and restore the provided `.sql` file into your PostgreSQL database.

## How to Use

### 1. Setup

**Install Dependencies**:

- Open a terminal and navigate to your project directory.
- Run `npm install` to install all necessary dependencies for both the client and server.

### 2. Start the Server

- Open a terminal.
- Navigate to the `server` directory: `cd server`
- Start the server: `nodemon server.js`

### 3. Start the Client

- Open another terminal.
- Navigate to the `client` directory: `cd client`
- Start the client: `npm start`

## Technologies Used

- **Backend**: JavaScript, NodeJS, ExpressJS
- **Frontend**: HTML, CSS, Bootstrap, ReactJS
- **Database**: PostgreSQL

### .env file should have the following structure:

DB_USER=[ your data ]

DB_HOST=[ your data ]

DB_NAME=task_management

DB_PASSWORD=[ your data ]

DB_PORT=5432

PORT=3001

SECRET_KEY=[ your data ]
