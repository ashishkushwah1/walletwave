# WalletWave

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen.svg)](https://walletwave-frontend.vercel.app/signin)

**WalletWave** is a wallet management application that allows users to securely manage their accounts and transfer money. The app is built using the MERN stack (MongoDB, Express, React, Node.js) and features robust authentication, responsive design, and seamless functionality.

## Live Demo

Check out the live application: [WalletWave - Live App](https://walletwave-frontend.vercel.app/signin)

## Features

1. **User Authentication**: Secure sign-up, sign-in, and JWT-based authentication.
2. **Account Dashboard**: Users can view account balances and transaction history.
3. **Money Transfer**: Simple and intuitive money transfer feature between accounts.
4. **Mobile-Friendly**: Responsive design for a smooth experience across devices.
5. **Secure API**: Backend API with full JWT authentication and CORS support for secure communication.

### Built With:
- **Frontend**:
  - React.js (Hooks and Functional Components)
  - Tailwind CSS for styling
  - Recoil for state management
  - Axios for API requests
- **Backend**:
  - Node.js & Express.js
  - MongoDB & Mongoose for database
  - JWT for secure authentication
  - Bcrypt for password encryption
- **Deployment**:
  - Vercel for both frontend and backend

## Tech Stack

- **Frontend**:
  - React.js
  - Tailwind CSS
  - Recoil (for global state management)
  - Axios (for HTTP requests)
- **Backend**:
  - Node.js & Express.js
  - MongoDB & Mongoose
  - JWT (for authentication)
  - Bcrypt (for password hashing)
- **Deployment**:
  - Vercel (for deployment of both frontend and backend)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have the following installed:

- **Node.js**
- **MongoDB** (local installation or cloud-based using MongoDB Atlas)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/ashishkushwah1/walletwave.git
    cd walletwave
    ```

2. Install dependencies for both backend and frontend:

    - For the backend:
      ```bash
      cd backend
      npm install
      ```

    - For the frontend:
      ```bash
      cd ../frontend
      npm install
      ```

3. Set up environment variables for the backend. Create a `.env` file in the `backend` folder with the following content:

    ```bash
    PORT=5000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

4. Start the backend server:
    ```bash
    cd backend
    npm start
    ```

5. Start the frontend:
    ```bash
    cd ../frontend
    npm run dev
    ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app locally.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or raise an issue for any bugs or feature requests.

---

This should address any missing formatting, errors, and improve readability.
