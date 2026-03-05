# Trakr Node.js Backend

This is the Node.js (Express) backend alternative for the **Trakr** application. It provides the same RESTful API endpoints for the front-end clients, implemented using modern JavaScript and MongoDB.

## Features ✨

- **User Authentication**: Secure JWT-based registration and login (using `bcryptjs` and `jsonwebtoken`).
- **REST API**: Built with Express.js for handling transactions, categories, and user data.
- **Database**: MongoDB integration via Mongoose ODM.
- **Security & Logging**: CORS enabled and request logging via Morgan.

## Tech Stack 🛠️

- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Environment**: Node.js
- **Utilities**: dotenv, bcryptjs, jsonwebtoken, cors, morgan

## Getting Started 🚀

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+)
- [MongoDB](https://www.mongodb.com/) running locally or via MongoDB Atlas

### Installation

1. Clone the repository and navigate to the `node-backend` directory:

   ```bash
   cd node-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Setup environment variables:
   Copy the provided `.env.example` to `.env` and adjust the values if necessary.

   ```bash
   cp .env.example .env
   ```

   **Required Variables:**
   - `PORT`: Server port (default: 5000)
   - `MONGO_URI`: MongoDB connection string
   - `JWT_SECRET`: Secret key for signing JWT tokens

### Running the Server

**Development Mode** (with Nodemon for auto-reloading):

```bash
npm run dev
```

**Production Mode**:

```bash
npm start
```

The server will start on `http://localhost:5000` (or your configured `PORT`).

## Project Structure 📂

```
src/
├── controllers/    # Route handlers bridging requests to business logic
├── middlewares/    # Custom middlewares (e.g., auth verification, error handling)
├── models/         # Mongoose schema definitions
├── routes/         # Express router configurations
├── utils/          # Helper functions (e.g., token generation)
├── app.js          # Express app setup and middleware configuration
└── server.js       # Entry point and database connection
```
