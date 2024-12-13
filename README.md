## Installation

Follow these steps to set up and run the backend project locally.

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v16 or later) - [Download Node.js](https://nodejs.org/)
- **npm** (Node Package Manager) - comes bundled with Node.js
- **MongoDB** - You need a local or remote MongoDB instance. You can either install MongoDB locally or use a cloud service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

### Steps to Install

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/RobinTheRedLight/japify-backend.git
   ```

2. Navigate to the project directory:

   ```bash
   cd japify-backend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the server:

   ```bash
   npm run start:dev
   ```

5. The server should start and listen on port 5000

## Environment Variables

The backend project requires the following environment variables to be set:

- `PORT`: The port number on which the server will listen (default: 5000).
- `DATABASE_URL`: The connection string for your MongoDB database.
- `BCRYPT_SALT_ROUNDS`: The number of salt rounds to use for bcrypt hashing (default: 12).
- `JWT_ACCESS_SECRET`: The secret key used for JWT authentication.


Make sure to set these variables in your environment or in a `.env` file. 